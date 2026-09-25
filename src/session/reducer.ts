import type { Catalog, Dimension } from '../content/types';
import type { State, Session, Action, Attempt } from './types';
import { key } from './types';
import { addDays,civilDay } from '../progress/calendar';
import { applyAttempt } from '../progress/schedule';
import { evaluateAnswer } from '../evaluation/evaluate';
import { expose,lastExposure } from './exposure';
import { selectReinforcements,eligibleReinforcement } from './reinforcement';
import { summarizeSession } from './result';
function introduce(st:State,s:Session,v:string,at:string,day:string){for(const d of ['text','reference'] as const){st.progress[key(v,d)]??={introducedAt:at,lastPresented:'',due:addDays(day,1),step:0,evaluations:0};expose(s,v,d,at,'reading')}}
export function reduceEvent(state:State,event:Action,c:Catalog):State {
 if(state.events.some(e=>e.id===event.id))return state;
 const original=state.sessions[event.sessionId];if(!original||['completed','archived'].includes(original.status))return state;
 const st=structuredClone(state),s=st.sessions[event.sessionId],i=s.instances[s.cursor],day=civilDay(event.at,st.profile.timezone,s.dayOffset);
 const log=(type:string,details?:string)=>st.events.push({id:type===event.type?event.id:`${event.id}:${type}`,type,sessionId:s.id,at:event.at,day,instanceId:i?.instanceId,details});
 if(event.type==='pause'||event.type==='archive'){s.status=event.type==='pause'?'paused':'archived';log(event.type);return st}
 if(event.type==='resume'){s.status='active';log('resume');return st}
 if(s.status!=='active')return state;
 if(!i){s.status='completed';s.result=summarizeSession(st,s);log('completed');return st}
 if(event.type==='tick'){if(event.ms&&event.ms>0)i.activeMs+=Math.min(event.ms,60000);return st}
 if(event.type==='present'){
  if(s.reading||i.presented)return state;
  const unread=i.verseIds.find(v=>s.newVerseIds.includes(v)&&!s.readDone.includes(v));
  if(unread){s.reading=unread;introduce(st,s,unread,event.at,day);log('present','reading:'+unread);return st}
  i.presented=true;
  for(const v of i.verseIds){for(const d of ['text','reference'] as const){const p=st.progress[key(v,d)];if(p)p.lastPresented=event.at}
   if(i.kind==='locate_reference'||i.kind==='match_pairs')expose(s,v,'text',event.at,'challenge');
   else if(i.dimension==='text')expose(s,v,'reference',event.at,'challenge');
  }log('present','challenge');return st;
 }
 if(event.type==='read'){if(!s.reading)return state;s.readDone.push(s.reading);s.reading=null;log('read');return st}
 if(event.type==='context'){
  const v=event.value;if(!v||(!s.reading&&!i.feedback))return state;
  for(const id of c.items[v]?.context_verse_ids??[])if(c.items[id])for(const d of ['text','reference'] as const)expose(s,id,d,event.at,'context');log('context',v);return st;
 }
 if(s.reading||!i.presented)return state;
 if(event.type==='type'){if(i.kind!=='type_verse'||i.feedback)return state;i.selection=[(event.value??'').slice(0,2000)];return st;}
 if(event.type==='select'){
  if(i.feedback||!event.value)return state;
  if(i.kind==='match_pairs'){if(!i.pairs.some(p=>p.verse_id===event.value)||i.closed.includes(event.value))return state;i.pairSelected=event.value}
  else if(['order_fragments','fill_blanks','initial_letters'].includes(i.kind)){if(!i.pieces.some(p=>p.id===event.value)||(!i.selection.includes(event.value)&&i.selection.length>=i.correctOrder.length))return state;i.selection=i.selection.includes(event.value)?i.selection.filter(x=>x!==event.value):[...i.selection,event.value]}
  else {if(!i.options.some(p=>p.id===event.value))return state;i.selection=[event.value]}
  log('select');return st;
 }
 if(event.type==='verify'||event.type==='pair'){
  if(i.feedback)return state;
  const answer=event.type==='pair'?[i.pairSelected??'',event.value??'']:i.selection;
  const correct=evaluateAnswer(i,answer);if(correct===null)return state;
  const verseId=i.kind==='match_pairs'?answer[0]:i.verseIds[0],dimension:Dimension=i.dimension;
  if(st.attempts.some(a=>a.instanceId===i.instanceId&&a.verseId===verseId))return state;
  const attempt:Attempt={id:`${i.instanceId}:${verseId}`,sessionId:s.id,instanceId:i.instanceId,verseId,dimension,answer:[...answer],correct,assisted:i.kind==='match_pairs'&&!correct,exposed:Boolean(lastExposure(s,verseId,dimension)),phase:i.phase,day,at:event.at,activeMs:i.activeMs};
  st.attempts.push(attempt);applyAttempt(st,attempt);
  if(!correct&&!s.queue.some(q=>q.verseId===verseId&&q.dimension===dimension))s.queue.push({verseId,dimension,order:st.attempts.length,isNew:s.newVerseIds.includes(verseId),served:i.phase==='reinforcement'});
  // Feedback displays the full text and its reference, after evaluating independence.
  expose(s,verseId,'text',event.at,'feedback');expose(s,verseId,'reference',event.at,'feedback');
  if(i.kind==='match_pairs'){i.closed.push(verseId);i.pairSelected=null}
  i.feedback={correct,verseId};log(event.type);log('feedback_shown');return st;
 }
 if(event.type==='continue'){
  if(!i.feedback)return state;
  if(i.kind==='match_pairs'&&i.closed.length<3){i.feedback=null;log('continue');return st}
  s.cursor++;
  if(s.cursor===s.baseCount&&s.instances.length===s.baseCount)s.instances.push(...selectReinforcements(s,c));
  while(s.cursor<s.instances.length&&s.instances[s.cursor].phase==='reinforcement'){
   const next=s.instances[s.cursor],q=s.queue.find(q=>q.verseId===next.verseIds[0]&&q.dimension===next.dimension);
   if(q&&eligibleReinforcement(s,q)){q.served=true;break}
   // A skipped reinforcement is not a completed challenge and cannot add spacing.
   s.instances.splice(s.cursor,1);
  }
  log('continue');if(s.cursor===s.instances.length){s.status='completed';s.result=summarizeSession(st,s);log('completed')}
  return st;
 }
 return state;
}

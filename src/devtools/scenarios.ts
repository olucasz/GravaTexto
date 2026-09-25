import { content } from '../content/adapt';
import { emptyState,key } from '../session/types';
import type { State } from '../session/types';
import type { Kind } from '../content/types';
import { createSession,instantiate } from '../session/create';
import { reduceEvent } from '../session/reducer';
import { civilDay,addDays } from '../progress/calendar';
export const scenarios=['Primeiro acesso','Revisões vencidas','Tudo em dia','Um único verso','Erro no começo','Erro no fim','Mesma falha repetida','Armazenamento indisponível'] as const;
export function makeScenario(name:string,at=new Date().toISOString()):State {
 let s=emptyState(crypto.randomUUID());s.mode='test';const today=civilDay(at,s.profile.timezone);
 if(name==='Primeiro acesso'||name==='Armazenamento indisponível')return s;
 const ids=name==='Um único verso'?content.journeys[0].verseIds.slice(0,1):content.journeys.flatMap(j=>j.verseIds);
 for(const v of ids)for(const d of ['text','reference'] as const)s.progress[key(v,d)]={introducedAt:at,lastPresented:'',due:addDays(today,name==='Tudo em dia'?7:-1),step:0,evaluations:0};
 if(name.startsWith('Erro')||name==='Mesma falha repetida'){
  const session=createSession(s,content,'first-verses','scenario-session',179,at);s.sessions[session.id]=session;
  const limit=name==='Erro no começo'?1:name==='Erro no fim'?8:6;
  let count=0;while(s.sessions[session.id].cursor<limit&&count++<100){const ss=s.sessions[session.id],i=ss.instances[ss.cursor];const run=(type:'present'|'read'|'select'|'pair'|'verify'|'continue',value?:string)=>{s=reduceEvent(s,{id:crypto.randomUUID(),at,sessionId:session.id,type,value},content)};
   if(ss.reading){run('read');continue}if(!i.presented){run('present');continue}if(i.feedback){if(ss.cursor===limit-1)break;run('continue');continue}
   const wrong=name==='Erro no começo'?ss.cursor===0:name==='Erro no fim'?ss.cursor===7:i.verseIds.includes(session.activeVerseIds[0]);
   if(i.kind==='match_pairs'){const v=i.pairs.find(p=>!i.closed.includes(p.verse_id))!.verse_id;run('select',v);run('pair',wrong?i.pairs.find(p=>!i.closed.includes(p.verse_id)&&p.verse_id!==v)?.verse_id??v:v)}
   else if(['order_fragments','fill_blanks','initial_letters'].includes(i.kind)){for(const id of wrong?[...i.correctOrder].reverse():i.correctOrder)run('select',id);run('verify')}
   else {run('select',wrong?i.options.find(o=>o.id!==i.correct)!.id:i.correct);run('verify')}
  }
 }
 return s;
}
export function makeGallery(kind:Kind,at=new Date().toISOString()):State {
 const st=makeScenario('Tudo em dia',at);st.mode='gallery';const p=content.puzzles.find(p=>p.kind===kind)!;
 const s=createSession(st,content,'first-verses','gallery-session',197,at);s.mode='gallery';s.activeVerseIds=[...p.verseIds];s.newVerseIds=[];s.instances=[instantiate(p,'gallery-instance',533)];s.baseCount=1;s.shortReason='Galeria isolada de uma família.';st.sessions[s.id]=s;return st;
}

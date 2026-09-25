import { content } from '../content/adapt';
import { civilDay } from '../progress/calendar';
import { dueDate,introduced } from '../session/create';
import { key,type State } from '../session/types';

export type JourneyNodeType='lesson'|'review'|'checkpoint'|'reward'|'final';
export type JourneyNodeStatus='locked'|'available'|'in-progress'|'completed'|'mastered'|'review-needed';
export interface JourneyNode {id:string;type:JourneyNodeType;verseId?:string;title:string;subtitle:string;status:JourneyNodeStatus;progress:number;position:'left'|'center'|'right'}
export interface JourneyUnit {id:string;title:string;description:string;theme:'sprout'|'shelter';nodes:JourneyNode[]}

const positions=['left','center','right','center'] as const;
export function journeyUnits(state:State,journeyId:string,at=new Date().toISOString()):JourneyUnit[]{
 const journey=content.journeys.find(j=>j.id===journeyId);if(!journey)return [];
 const today=civilDay(at,state.profile.timezone,state.dayOffset);
 const active=Object.values(state.sessions).find(s=>['active','paused'].includes(s.status)&&s.journeyId===journeyId);
 return [0,1].map(unit=>{
  const verses=journey.verseIds.slice(unit*3,unit*3+3),prior=journey.verseIds.slice(0,unit*3);
  const nodes:JourneyNode[]=verses.map((verseId,n)=>{
   const seen=introduced(state,verseId),previous=[...prior,...verses.slice(0,n)].every(v=>introduced(state,v));
   const due=seen&&dueDate(state,verseId)<=today,steps=['text','reference'].map(d=>state.progress[key(verseId,d as 'text'|'reference')]?.step??0);
   const mastered=seen&&steps.every(step=>step>=3),inProgress=active?.activeVerseIds.includes(verseId);
   return {id:`${journeyId}:${verseId}`,type:'lesson',verseId,title:content.items[verseId].reference,subtitle:seen?'Texto apresentado':'Nova leitura',status:inProgress?'in-progress':due?'review-needed':mastered?'mastered':seen?'completed':previous?'available':'locked',progress:seen?Math.round((steps.reduce((a,b)=>a+b,0)/8)*100):0,position:positions[(unit*3+n)%positions.length]};
  });
  const milestoneId=`${journeyId}:checkpoint:${unit+1}`,allSeen=verses.every(v=>introduced(state,v)),checkpointDone=state.milestones.includes(milestoneId);
  nodes.push({id:milestoneId,type:unit===1?'final':'checkpoint',title:unit===1?'Jornada percorrida':'Pausa para consolidar',subtitle:unit===1?'Os seis textos já fazem parte das revisões.':'Uma prática com os textos desta unidade.',status:checkpointDone?'completed':allSeen?'available':'locked',progress:checkpointDone?100:0,position:'center'});
  return {id:`${journeyId}:unit:${unit+1}`,title:unit===0?'Primeiros passos':'Voltar e fortalecer',description:unit===0?'Conheça três textos e suas referências.':'Reencontre, reconstrua e consolide.',theme:journeyId==='first-verses'?'sprout':'shelter',nodes};
 });
}

export function earnedXp(state:State){return state.attempts.reduce((sum,a)=>sum+(a.correct&&!a.assisted?(a.phase==='base'?10:5):0),0)}
export function practiceStreak(state:State){const days=[...new Set(Object.values(state.sessions).filter(s=>s.status==='completed').map(s=>s.createdAt.slice(0,10)))].sort().reverse();if(!days.length)return 0;let count=1;const date=new Date(days[0]+'T12:00:00Z');for(let n=1;n<days.length;n++){date.setUTCDate(date.getUTCDate()-1);if(days[n]!==date.toISOString().slice(0,10))break;count++}return count}

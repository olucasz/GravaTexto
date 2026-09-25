import type { Session, State, Result } from './types';
import { key } from './types';
export function summarizeSession(state:State,s:Session):Result {
 const attempts=state.attempts.filter(a=>a.sessionId===s.id),base=attempts.filter(a=>a.phase==='base'),reinforcement=attempts.filter(a=>a.phase==='reinforcement');
 const verseIds=[...new Set(attempts.map(a=>a.verseId))];
 return {baseTotal:base.length,baseCorrect:base.filter(a=>a.correct&&!a.assisted).length,assisted:base.filter(a=>a.assisted).length,reinforcementTotal:reinforcement.length,reinforcementCorrect:reinforcement.filter(a=>a.correct&&!a.assisted).length,verseIds,difficulties:attempts.filter(a=>!a.correct||a.assisted).filter((a,n,all)=>all.findIndex(b=>b.verseId===a.verseId&&b.dimension===a.dimension)===n).map(a=>({verseId:a.verseId,dimension:a.dimension})),reviews:verseIds.flatMap(v=>(['text','reference'] as const).map(d=>({verseId:v,dimension:d,due:state.progress[key(v,d)]?.due??''})))};
}

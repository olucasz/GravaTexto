import type { Catalog, Puzzle } from '../content/types';
import type { Instance, Session, State } from './types';
import { key } from './types';
import { civilDay } from '../progress/calendar';
import { rng,shuffle } from './random';
export function instantiate(p:Puzzle,id:string,seed:number,phase:Instance['phase']='base'):Instance {
 const random=rng(seed);const qualify=(s:string)=>`${id}::${s}`;
 return {...structuredClone(p),instanceId:id,phase,options:p.kind==='match_pairs'?shuffle(p.pairs.map(p=>({id:p.verse_id,label:p.reference})),random):shuffle(p.options.map(o=>({...o,id:qualify(o.id)})),random),correct:qualify(p.correct),pieces:shuffle(p.pieces.map(o=>({...o,id:qualify(o.id)})),random),correctOrder:p.correctOrder.map(qualify),pairs:shuffle(p.pairs,random),selection:[],pairSelected:null,closed:[],presented:false,feedback:null,activeMs:0};
}
export const introduced=(s:State,v:string)=>Boolean(s.progress[key(v,'text')]?.introducedAt);
export function dueDate(s:State,v:string){return [s.progress[key(v,'text')]?.due,s.progress[key(v,'reference')]?.due].filter(Boolean).sort()[0]??'9999-12-31'}
export function createSession(s:State,c:Catalog,journeyId:string,id:string,seed:number,at:string):Session {
 const active=Object.values(s.sessions).find(x=>['active','paused'].includes(x.status));if(active)return structuredClone(active);
 const j=c.journeys.find(j=>j.id===journeyId);if(!j)throw new Error('Jornada não encontrada.');
 const today=civilDay(at,s.profile.timezone,s.dayOffset),known=j.verseIds.filter(v=>introduced(s,v)),fresh=j.verseIds.filter(v=>!introduced(s,v));
 const due=known.filter(v=>dueDate(s,v)<=today).sort((a,b)=>dueDate(s,a).localeCompare(dueDate(s,b))||j.verseIds.indexOf(a)-j.verseIds.indexOf(b)).slice(0,2);
 const newIds=known.length===0?fresh.slice(0,2):fresh.slice(0,1);
 const ids=[...due,...newIds];if(known.length&&due.length===0)for(const v of [...known].sort((a,b)=>(s.progress[key(a,'text')]?.lastPresented??'').localeCompare(s.progress[key(b,'text')]?.lastPresented??'')||j.verseIds.indexOf(a)-j.verseIds.indexOf(b))){if(ids.length===3)break;if(!ids.includes(v))ids.push(v)}
 const random=rng(seed),eligible=c.puzzles.filter(p=>p.verseIds.every(v=>ids.includes(v))&&(p.kind!=='match_pairs'||p.verseIds.every(v=>introduced(s,v))));
 const instances:Instance[]=[],coverage=new Set<string>();
 const exposure=new Set<string>();
 const views=(p:Puzzle)=>Object.values(s.sessions).flatMap(x=>x.instances).filter(i=>i.id===p.id&&i.presented).length+instances.filter(i=>i.id===p.id).length;
 for(let n=0;n<8;n++){
  const prev=instances.at(-1);let pool=shuffle(eligible.filter(p=>p.kind!==prev?.kind && (p.kind!=='type_verse'||s.preferences.typingEnabled) && p.difficulty<=(n<2?1:n<4?2:Math.max(3,...p.verseIds.map(v=>Math.min(5,(s.progress[key(v,'text')]?.step??0)+3))))),random);if(!pool.length)break;
  if(prev){const other=pool.filter(p=>p.verseIds.every(v=>!prev.verseIds.includes(v)));if(other.length)pool=other}
  const coverageScore=(p:Puzzle)=>p.verseIds.reduce((sum,v)=>sum+(!coverage.has(key(v,p.dimension))&&(p.dimension==='text'||p.kind==='locate_reference')?1:0),0);
  pool.sort((a,b)=>coverageScore(b)-coverageScore(a)||Number(a.verseIds.some(v=>exposure.has(key(v,a.dimension))))-Number(b.verseIds.some(v=>exposure.has(key(v,b.dimension))))||views(a)-views(b));
  const p=pool[0];instances.push(instantiate(p,`${id}:base:${n}`,Math.floor(random()*4294967296)));
  for(const v of p.verseIds){if(p.dimension==='text'||p.kind==='locate_reference')coverage.add(key(v,p.dimension));exposure.add(key(v,'text'));exposure.add(key(v,'reference'))}
 }
 const missing=ids.some(v=>!coverage.has(key(v,'text'))||!coverage.has(key(v,'reference')));
 return {id,journeyId,contentVersion:c.version,seed,dayOffset:s.dayOffset,createdAt:at,mode:due.length?(newIds.length?'mixed':'review'):(newIds.length?'learning':'free'),activeVerseIds:ids,newVerseIds:newIds,baseCount:instances.length,instances,cursor:0,status:'active',reading:null,readDone:[],exposures:[],queue:[],shortReason:instances.length<8?'O conteúdo elegível não permite oito desafios alternados.':missing?'Alguma dimensão não tem questão elegível para cobertura.':null,result:null};
}

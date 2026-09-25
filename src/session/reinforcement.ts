import type { Catalog } from '../content/types';
import type { Session, QueueEntry } from './types';
import { lastExposure } from './exposure';
import { instantiate } from './create';
export function eligibleReinforcement(s:Session,q:QueueEntry){const last=lastExposure(s,q.verseId,q.dimension);return !q.served&&s.cursor-(last?.screen??s.cursor)-1>=2}
export function selectReinforcements(s:Session,c:Catalog){return s.queue.filter(q=>eligibleReinforcement(s,q)).sort((a,b)=>Number(b.isNew)-Number(a.isNew)||a.order-b.order).slice(0,3).flatMap((q,n)=>{const pool=c.puzzles.filter(p=>p.verseIds.length===1&&p.verseIds[0]===q.verseId&&(q.dimension==='reference'?p.kind==='locate_reference':p.dimension==='text'&&p.difficulty<=3));pool.sort((a,b)=>s.instances.filter(i=>i.id===a.id).length-s.instances.filter(i=>i.id===b.id).length);return pool.length?[instantiate(pool[0],`${s.id}:reinforcement:${n}`,s.seed+n+701,'reinforcement')]:[]})}

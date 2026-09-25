import type { State, Attempt } from '../session/types';
import { key } from '../session/types';
import { addDays } from './calendar';
export function applyAttempt(s:State,a:Attempt){
 const k=key(a.verseId,a.dimension),p=s.progress[k];if(!p)return;
 const dk=`${k}|${a.day}`,existing=s.daily[dk];
 const d=existing??{before:structuredClone(p),firstAttempt:a.id,failed:false,advanced:false};
 if(!a.correct||a.assisted){d.failed=true;p.step=0;p.due=addDays(a.day,1)}
 else if(!existing&&!a.exposed&&p.due<=a.day){p.step=Math.min(4,p.step+1);p.due=addDays(a.day,[1,3,7,14,30][p.step]);d.advanced=true}
 if(d.failed){p.step=0;p.due=addDays(a.day,1)}
 p.evaluations++;s.daily[dk]=d;
}

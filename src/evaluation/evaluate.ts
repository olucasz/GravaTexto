import { compareText } from './text';
import type { Instance } from '../session/types';
export function evaluateAnswer(i:Instance,answer:string[]):boolean|null {
 if(i.kind==='match_pairs'){const [left,right]=answer;if(!i.pairs.some(p=>p.verse_id===left)||!i.pairs.some(p=>p.verse_id===right)||i.closed.includes(left)||i.closed.includes(right))return null;return left===right}
 if(i.kind==='type_verse')return answer[0]?.trim()?compareText(i.expectedText,answer[0]).correct:null;
 if(['order_fragments','fill_blanks','initial_letters'].includes(i.kind)){if(answer.length!==i.correctOrder.length||new Set(answer).size!==answer.length||answer.some(id=>!i.pieces.some(p=>p.id===id)))return null;return i.kind==='initial_letters'?answer.map(id=>i.pieces.find(p=>p.id===id)!.text).join('')===i.correctOrder.map(id=>i.pieces.find(p=>p.id===id)!.text).join(''):answer.every((id,n)=>id===i.correctOrder[n])}
 if(answer.length!==1||!i.options.some(o=>o.id===answer[0]))return null;
 return answer[0]===i.correct;
}

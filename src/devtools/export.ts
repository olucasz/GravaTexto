import type { State } from '../session/types';
import { content } from '../content/adapt';
export function exportHistory(s:State){const data={...s,exported_at:new Date().toISOString(),content_version:content.version};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`gravatexto-history-${s.mode}-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}

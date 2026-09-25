import { describe,it,expect } from 'vitest';
import { content } from '../../src/content/adapt';
import { createSession } from '../../src/session/create';
import { emptyState,key } from '../../src/session/types';
import { reduceEvent } from '../../src/session/reducer';
import { addDays,civilDay } from '../../src/progress/calendar';
import { applyAttempt } from '../../src/progress/schedule';
import type { Attempt } from '../../src/session/types';
const at='2026-09-25T15:00:00.000Z';
describe('sessões e calendário',()=>{
 it('cria dois novos, oito telas alternadas, sem pares e com seed estável',()=>{const s=emptyState();const a=createSession(s,content,'first-verses','s1',43,at);expect(a).toEqual(createSession(s,content,'first-verses','s1',43,at));expect(a.activeVerseIds).toHaveLength(2);expect(a.instances).toHaveLength(8);expect(a.instances.some(i=>i.kind==='match_pairs')).toBe(false);for(let i=1;i<8;i++)expect(a.instances[i].kind).not.toBe(a.instances[i-1].kind)});
 it('avança dias civis através do horário de verão',()=>{expect(addDays('2026-03-07',1)).toBe('2026-03-08');expect(civilDay('2026-09-26T01:00:00Z','America/Sao_Paulo')).toBe('2026-09-25')});
 it('apresenta leitura antes da pergunta e eventos duplicados são neutros',()=>{let st=emptyState();st.sessions.s=createSession(st,content,'first-verses','s',2,at);const e={id:'p',sessionId:'s',type:'present' as const,at};st=reduceEvent(st,e,content);expect(st.sessions.s.reading).toBeTruthy();expect(reduceEvent(st,e,content)).toEqual(st);expect(st.attempts).toHaveLength(0)});
 it('erro prevalece sobre avanço e acertos adicionais no mesmo dia',()=>{const s=emptyState(),verse=content.journeys[0].verseIds[0],k=key(verse,'reference');s.progress[k]={introducedAt:at,lastPresented:at,due:'2026-09-25',step:0,evaluations:0};const a:Attempt={id:'a',sessionId:'s',instanceId:'i',verseId:verse,dimension:'reference',answer:['x'],correct:true,assisted:false,exposed:false,phase:'base',day:'2026-09-25',at,activeMs:0};applyAttempt(s,a);expect(s.progress[k].due).toBe('2026-09-28');applyAttempt(s,{...a,id:'b'});expect(s.progress[k].step).toBe(1);applyAttempt(s,{...a,id:'c',correct:false});expect(s.progress[k].due).toBe('2026-09-26');expect(s.progress[k].step).toBe(0);applyAttempt(s,{...a,id:'d'});expect(s.progress[k].step).toBe(0)});
});

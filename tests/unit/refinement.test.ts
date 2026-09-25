import { it,expect } from 'vitest';
import { content } from '../../src/content/adapt';
import { compareText } from '../../src/evaluation/text';
import { evaluateAnswer } from '../../src/evaluation/evaluate';
import { createSession,instantiate } from '../../src/session/create';
import { emptyState,key } from '../../src/session/types';
import { migrateState } from '../../src/storage/migrations';
it('compara palavras normalizadas e identifica omissões, trocas e repetições',()=>{
 expect(compareText('Confia no SENHOR; ele agirá.','  confia NO senhor ele agira!!').correct).toBe(true);
 expect(compareText('eu confiarei em ti','eu esperarei ti')).toEqual({correct:false,missing:['confiarei','em'],extra:['esperarei']});
 expect(compareText('ele nos amou','ele ele nos amou').extra).toEqual(['ele']);
});
it('todas as escolhas têm quatro opções distintas e uma resposta correta',()=>{
 for(const p of content.puzzles.filter(p=>p.options.length)){expect(p.options).toHaveLength(4);expect(new Set(p.options.map(o=>o.label)).size).toBe(4);expect(p.options.filter(o=>o.id===p.correct)).toHaveLength(1)}
});
it('montagem exige somente peças corretas, não todo o banco',()=>{
 for(const p of content.puzzles.filter(p=>p.kind==='order_fragments')){
  expect(p.correctOrder.length).toBeGreaterThanOrEqual(4);expect(p.correctOrder.length).toBeLessThanOrEqual(7);
  expect(p.pieces.length-p.correctOrder.length).toBe(2);
  const i=instantiate(p,'test',17);expect(evaluateAnswer(i,i.correctOrder)).toBe(true);
  const wrong=[...i.correctOrder];wrong[0]=i.pieces.find(x=>!i.correctOrder.includes(x.id))!.id;
  expect(evaluateAnswer(i,wrong)).toBe(false);expect(evaluateAnswer(i,i.pieces.map(p=>p.id))).toBeNull();
 }
});
it('lacunas e iniciais preservam toda a passagem; banco possui IDs por ocorrência',()=>{
 for(const p of content.puzzles.filter(p=>['fill_blanks','initial_letters'].includes(p.kind))){
  const correct=p.correctOrder.map(id=>p.pieces.find(x=>x.id===id)!.text);
  expect(p.kind==='fill_blanks'?p.segments.map((s,n)=>s+(correct[n]??'')).join(''):correct.join('')).toBe(content.items[p.verseIds[0]].text);
  expect(new Set(p.pieces.map(p=>p.id)).size).toBe(p.pieces.length);
 }
});
it('dificuldade é gradual e digitação depende da preferência',()=>{
 const st=emptyState(),at='2026-09-25T15:00:00.000Z';
 for(const v of content.journeys[1].verseIds)for(const d of ['text','reference'] as const)st.progress[key(v,d)]={introducedAt:at,lastPresented:'',due:'2026-09-25',step:4,evaluations:8};
 let typed=false;
 for(let seed=1;seed<31;seed++){
  const normal=createSession(st,content,'trust-and-care','s',seed,at);
  expect(normal.instances.some(i=>i.kind==='type_verse')).toBe(false);expect(normal.instances.slice(0,2).every(i=>i.difficulty===1)).toBe(true);
  const opt=createSession({...st,preferences:{typingEnabled:true}},content,'trust-and-care','s',seed,at);
  typed||=opt.instances.some(i=>i.kind==='type_verse');
 }
 expect(typed).toBe(true);
});
it('sessões antigas recebem novos metadados sem perder seleção',()=>{
 const st=emptyState();st.sessions.s=createSession(st,content,'first-verses','s',1,'2026-09-25T15:00:00.000Z');
 const old=JSON.parse(JSON.stringify(st));delete old.preferences;for(const i of old.sessions.s.instances){delete i.difficulty;delete i.segments;delete i.hint;delete i.expectedText}
 expect(migrateState(old).preferences.typingEnabled).toBe(false);
 expect(migrateState(old).sessions.s.instances[0].instanceId).toBe(st.sessions.s.instances[0].instanceId);
});
it('iniciais aceitam permutações de ocorrências visualmente idênticas',()=>{
 const p=content.puzzles.find(p=>p.kind==='initial_letters'&&p.verseIds[0].endsWith('1PE.5.7'))!,i=instantiate(p,'repeated',4),answer=[...i.correctOrder];
 const occurrences=answer.map((id,n)=>({n,text:i.pieces.find(p=>p.id===id)!.text})).filter(p=>p.text==='ele ');
 expect(occurrences).toHaveLength(2);
 [answer[occurrences[0].n],answer[occurrences[1].n]]=[answer[occurrences[1].n],answer[occurrences[0].n]];
 expect(evaluateAnswer(i,answer)).toBe(true);
});

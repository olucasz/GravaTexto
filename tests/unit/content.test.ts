import { describe, it, expect } from 'vitest';
import { content } from '../../src/content/adapt';
describe('conteúdo',()=>{
 it('tem somente duas jornadas, 12 textos e nove famílias',()=>{expect(content.journeys).toHaveLength(2);expect(Object.keys(content.items)).toHaveLength(12);expect(new Set(content.puzzles.map(p=>p.kind)).size).toBe(9)});
 it('preserva a reconstrução e o rascunho editorial',()=>{for(const p of content.puzzles){if(p.kind==='order_fragments')expect(p.correctOrder.map(id=>p.pieces.find(x=>x.id===id)!.text).join('')).toBe(content.items[p.verseIds[0]].text);expect(p.dimension).toBe(['locate_reference','identify_text','match_pairs'].includes(p.kind)?'reference':'text')}});
 it('oferece os contextos completos e não inventa questões curtas',()=>{expect(Object.keys(content.contexts)).toHaveLength(55);expect(content.puzzles.filter(p=>p.verseIds[0].endsWith('1TH.5.16')).some(p=>p.kind==='order_fragments')).toBe(false)});
});

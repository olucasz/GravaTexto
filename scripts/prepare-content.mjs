import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { refineExercises } from './refine-exercises.mjs';
const root = new URL('../', import.meta.url);
const read = path => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const base = 'gravatexto-base-v0.1/';
for (const entry of read(base + 'checksums.json')) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL(base + entry.path, root))).digest('hex'), entry.sha256, entry.path);
const bundle = read(base + 'data/mvp-bundle.json');
const verses = read(base + 'data/verses.json');
const overrides = read('src/content/editorial-overrides.json');
const contextIds = new Set(bundle.learning_items.flatMap(i=>i.context_verse_ids));
const contexts = Object.fromEntries(verses.filter(v=>contextIds.has(v.id)).map(v=>[v.id,v]));
assert.equal(Object.keys(contexts).length, contextIds.size);
const changes=[];
for (const item of bundle.learning_items) {
 const source=bundle.verses.find(v=>v.id===item.verse_id);
 assert.equal(crypto.createHash('sha256').update(source.text).digest('hex'),source.text_sha256);
 assert.equal(Array.from(source.text).slice(item.source_span.start,item.source_span.end).join('').replaceAll('[','').replaceAll(']','').replace(/\s+([,.;:!?])/g,'$1'),item.text);
}
for (const p of bundle.puzzles) {
 const item=bundle.learning_items.find(i=>i.id===p.learning_item_id), d=p.payload;
 if(d.options){assert.equal(new Set(d.options.map(o=>o.label.normalize('NFC').toLocaleLowerCase('pt-BR'))).size,d.options.length); assert.equal(d.options.filter(o=>o.id===d.correct_option_id).length,1);const c=d.options.find(o=>o.id===d.correct_option_id).label;
 if(p.kind==='fill_gap'){assert.equal(d.prefix+c+d.suffix,item.text);assert.equal(Array.from(item.text).slice(d.gap_span.start,d.gap_span.end).join(''),c)}
 if(p.kind==='choose_continuation')assert.equal(d.prefix+c,item.text);
 if(p.kind==='locate_reference')assert.equal(c,item.reference);
 if(p.kind==='identify_text')assert.equal(c,item.text);
 }
 if(d.pieces){assert.equal(d.pieces.map(x=>x.text).join(''),item.text);const boundaries=overrides[item.verse_id.split(':').at(-1)];
 if(boundaries){let remaining=item.text, offset=0;const pieces=[];for(const label of boundaries){const n=Array.from(label.normalize('NFD')).length; // source may contain decomposed accents; find the original boundary by normalized matching
 let end=0;const cp=Array.from(remaining);for(let k=1;k<=cp.length;k++){if(cp.slice(0,k).join('').normalize('NFC')===label.normalize('NFC')){end=k;break}}
 assert.ok(end, `Corte não encontrado: ${label} (${n})`);while(cp[end]===' ')end++;const text=cp.slice(0,end).join('');pieces.push({id:`piece-${pieces.length}`,text,display_label:text.trim(),span:{start:offset,end:offset+end}});remaining=cp.slice(end).join('');offset+=end;}
 pieces.push({id:`piece-${pieces.length}`,text:remaining,display_label:remaining.trim(),span:{start:offset,end:Array.from(item.text).length}});d.pieces=pieces;d.correct_order=pieces.map(x=>x.id);changes.push({puzzle_id:p.id,pieces:pieces.map(x=>x.span)});assert.equal(pieces.map(x=>x.text).join(''),item.text);
 }}
 if(d.pairs)for(const pair of d.pairs){const i=bundle.learning_items.find(x=>x.id===pair.learning_item_id);assert.equal(pair.text,i.text);assert.equal(pair.reference,i.reference)}
}
const output=refineExercises({...bundle,contexts,content_version:'blivre-tr-2018.2.0:prototype-1',editorial_changes:changes},read('src/content/exercise-curation.json'));
for(const p of output.puzzles){const d=p.payload,i=bundle.learning_items.find(i=>i.id===p.learning_item_id);if(d.options){assert.equal(new Set(d.options.map(o=>o.label.normalize('NFC'))).size,d.options.length);assert.ok(d.options.length>=3)}if(d.correct_order&&!d.segments)assert.equal(d.correct_order.map(id=>d.pieces.find(p=>p.id===id).text).join(''),i.text);}
if(!process.argv.includes('--check')){fs.mkdirSync(new URL('src/content/generated/',root),{recursive:true});fs.writeFileSync(new URL('src/content/generated/bundle.json',root),JSON.stringify(output));fs.copyFileSync(new URL(base+'licenses/BLIVRE-CC-BY-3.0-BR.md',root),new URL('public/licenses/BLIVRE-CC-BY-3.0-BR.md',root));}
console.log(`Conteúdo verificado: 26 checksums, ${bundle.learning_items.length} textos, ${bundle.puzzles.length} questões, ${contextIds.size} contextos, ${output.editorial_changes.length} ordenações refinadas.`);

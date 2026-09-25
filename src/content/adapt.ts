import raw from './generated/bundle.json' with {type:'json'};
import type { Catalog, Kind, Option, Piece, Pair } from './types';
interface RawPuzzle {id:string;kind:string;difficulty?:number;learning_item_id:string;payload:{segments?:string[];hint?:string;expected_text?:string;prompt:string;text?:string;reference?:string;prefix?:string;suffix?:string;options?:Option[];correct_option_id?:string;pieces?:Piece[];correct_order?:string[];pairs?:Pair[]}}
export function adaptContent():Catalog {
 const items=Object.fromEntries(raw.learning_items.map(i=>[i.verse_id,i]));
 const puzzles=(raw.puzzles as RawPuzzle[]).map(p=>{
  const item=raw.learning_items.find(i=>i.id===p.learning_item_id);if(!item)throw new Error(`Item ausente: ${p.id}`);
  const kind=(p.kind.startsWith('match_pairs')?'match_pairs':p.kind) as Kind;
  const d=p.payload;
  return {id:p.id,kind,difficulty:p.difficulty??1,segments:d.segments??[],hint:d.hint??'',expectedText:d.expected_text??'',dimension:(['locate_reference','identify_text','match_pairs'].includes(kind)?'reference':'text') as 'reference'|'text',verseIds:d.pairs?.map(x=>x.verse_id)??[item.verse_id],prompt:d.prompt,text:d.text??'',reference:d.reference??'',prefix:d.prefix??'',suffix:d.suffix??'',options:d.options??[],correct:d.correct_option_id??'',pieces:d.pieces??[],correctOrder:d.correct_order??[],pairs:d.pairs??[]};
 });
 const journeys=raw.journeys.filter(j=>['first-verses','trust-and-care'].includes(j.id)).sort((a,b)=>a.position-b.position).map(j=>({...j,verseIds:raw.units.filter(u=>u.journey_id===j.id).sort((a,b)=>a.position-b.position).flatMap(u=>raw.unit_verses.filter(v=>v.unit_id===u.id).sort((a,b)=>a.position-b.position).map(v=>v.verse_id))}));
 return {journeys,items,puzzles,contexts:raw.contexts,version:raw.content_version,attribution:raw.translation.attribution};
}
export const content=adaptContent();

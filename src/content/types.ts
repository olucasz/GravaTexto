export type Dimension = 'text' | 'reference';
export type Kind = 'locate_reference' | 'identify_text' | 'fill_gap' | 'choose_continuation' | 'order_fragments' | 'match_pairs' | 'fill_blanks' | 'initial_letters' | 'type_verse';
export interface Option { id: string; label: string }
export interface Piece { id: string; text: string; display_label: string }
export interface Pair { verse_id: string; text: string; reference: string }
export interface Puzzle { difficulty:number; segments:string[]; hint:string; expectedText:string; id: string; kind: Kind; dimension: Dimension; verseIds: string[]; prompt: string; text: string; reference: string; prefix: string; suffix: string; options: Option[]; correct: string; pieces: Piece[]; correctOrder: string[]; pairs: Pair[] }
export interface Item { id: string; verse_id: string; text: string; reference: string; context_note: string | null; context_verse_ids: string[]; display_transformations: {type:string;note?:string;excluded_text?:string}[]; editorial_status:string; production_ready:boolean }
export interface Journey { id: string; title:string; description:string; verseIds:string[] }
export interface Catalog { journeys:Journey[]; items:Record<string,Item>; puzzles:Puzzle[]; contexts:Record<string,{id:string;text:string;reference:string}>; version:string; attribution:string }

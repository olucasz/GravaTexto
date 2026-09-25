import type { Dimension } from '../content/types';
import type { Session } from './types';
export function expose(s:Session,verseId:string,dimension:Dimension,at:string,source:string){s.exposures.push({verseId,dimension,screen:s.cursor,at,source})}
export function lastExposure(s:Session,v:string,d:Dimension){return s.exposures.filter(x=>x.verseId===v&&x.dimension===d).at(-1)}

import type { Dimension, Puzzle } from '../content/types';
export interface Progress { introducedAt:string; lastPresented:string; due:string; step:number; evaluations:number }
export interface Daily { before:Progress; firstAttempt:string; failed:boolean; advanced:boolean }
export interface Attempt { id:string; sessionId:string; instanceId:string; verseId:string; dimension:Dimension; answer:string[]; correct:boolean; assisted:boolean; exposed:boolean; phase:'base'|'reinforcement'; day:string; at:string; activeMs:number }
export interface Exposure { verseId:string; dimension:Dimension; screen:number; at:string; source:string }
export interface QueueEntry { verseId:string; dimension:Dimension; order:number; isNew:boolean; served:boolean }
export interface Instance extends Puzzle { instanceId:string; phase:'base'|'reinforcement'; selection:string[]; pairSelected:string|null; closed:string[]; presented:boolean; feedback: {correct:boolean;verseId:string}|null; activeMs:number }
export interface Result { baseTotal:number; baseCorrect:number; assisted:number; reinforcementTotal:number; reinforcementCorrect:number; verseIds:string[]; difficulties:{verseId:string;dimension:Dimension}[]; reviews:{verseId:string;dimension:Dimension;due:string}[] }
export interface Session { id:string; journeyId:string; originNodeId?:string; contentVersion:string; seed:number; dayOffset:number; createdAt:string; mode:'learning'|'review'|'mixed'|'free'|'gallery'; activeVerseIds:string[]; newVerseIds:string[]; baseCount:number; instances:Instance[]; cursor:number; status:'active'|'paused'|'archived'|'completed'; reading:string|null; readDone:string[]; exposures:Exposure[]; queue:QueueEntry[]; shortReason:string|null; result:Result|null }
export interface EventLog { id:string;type:string;sessionId:string;at:string;day:string;instanceId?:string;details?:string }
export interface State { preferences:{typingEnabled:boolean}; milestones:string[]; schema_version:1; profile:{id:string;timezone:string}; mode:'normal'|'test'|'gallery'; dayOffset:number; progress:Record<string,Progress>; daily:Record<string,Daily>; sessions:Record<string,Session>; attempts:Attempt[]; events:EventLog[] }
export type Action = {id:string;at:string;sessionId:string;type:'present'|'read'|'type'|'select'|'pair'|'verify'|'continue'|'pause'|'resume'|'archive'|'context'|'tick';value?:string;ms?:number};
export const key=(verseId:string,dimension:Dimension)=>`${verseId}|${dimension}`;
export function emptyState(id='local',timezone='America/Sao_Paulo'):State { return {preferences:{typingEnabled:false},milestones:[],schema_version:1,profile:{id,timezone},mode:'normal',dayOffset:0,progress:{},daily:{},sessions:{},attempts:[],events:[]}; }

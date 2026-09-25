import { createContext,useContext,useEffect,useRef,useState } from 'react';
import type { ReactNode } from 'react';
import { content } from '../content/adapt';
import type { Action,State } from '../session/types';
import { createSession } from '../session/create';
import { reduceEvent } from '../session/reducer';
import { StorageAdapter } from '../storage/local';
const slot=(mode:State['mode'])=>mode==='normal'?'gravatexto:state':'gravatexto:test';
function port(){try{return window.localStorage}catch{return {getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}}}}
interface Store {state:State;warning:string;send:(a:Omit<Action,'at'|'id'>)=>void;start:(journey:string,originNodeId?:string)=>string;replace:(state:State)=>void;switchMode:(mode:State['mode'],value?:State,memory?:boolean)=>void;reset:()=>void}
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [initial]=useState(()=>{let mode:State['mode']='normal';try{mode=sessionStorage.getItem('gravatexto:mode')==='test'?'test':'normal'}catch{/* storage warning is shown by adapter */}const adapter=new StorageAdapter(port(),slot(mode));const value=adapter.load();value.mode=mode;return {adapter,value}});
 const adapter=useRef(initial.adapter),current=useRef(initial.value);const [state,setState]=useState(initial.value),[warning,setWarning]=useState(initial.adapter.warning);
 const replace=(next:State)=>{adapter.current.save(next);current.current=next;setState(next);setWarning(adapter.current.warning)};
 const send=(a:Omit<Action,'at'|'id'>)=>{const s=current.current.sessions[a.sessionId];const id=a.type==='present'?`${a.sessionId}:present:${s?.cursor}:${s?.readDone.length}`:crypto.randomUUID();const next=reduceEvent(current.current,{...a,id,at:new Date().toISOString()},content);if(next!==current.current)replace(next)};
 const start=(journey:string,originNodeId?:string)=>{const s=createSession(current.current,content,journey,crypto.randomUUID(),crypto.getRandomValues(new Uint32Array(1))[0],new Date().toISOString());s.originNodeId=originNodeId;const next=structuredClone(current.current);next.sessions[s.id]=s;replace(next);return s.id};
 const switchMode=(mode:State['mode'],value?:State,memory=false)=>{const nextAdapter=new StorageAdapter(port(),slot(mode));const stored=nextAdapter.load();adapter.current=nextAdapter;if(mode==='gallery'||memory)nextAdapter.disable(mode==='gallery'?'Galeria isolada: estas respostas não alteram seu progresso.':undefined);const next=value??stored;next.mode=mode;try{sessionStorage.setItem('gravatexto:mode',mode==='normal'?'normal':'test')}catch{/* optional preference */}replace(next)};
 const reset=()=>{try{localStorage.removeItem(slot(current.current.mode))}catch{/* load will report failure */}switchMode(current.current.mode==='normal'?'normal':'test')};
 useEffect(()=>{const onStorage=(e:StorageEvent)=>{if(e.key===slot(current.current.mode)){adapter.current.disable('O progresso mudou em outra aba. Recarregue para usar o estado salvo; esta aba está em memória.');setWarning(adapter.current.warning)}};window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage)},[]);
 return <Context.Provider value={{state,warning,send,start,replace,switchMode,reset}}>{children}</Context.Provider>;
}
export function useStore(){const value=useContext(Context);if(!value)throw Error('Store ausente');return value}

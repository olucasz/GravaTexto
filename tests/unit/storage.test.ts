import { describe,it,expect } from 'vitest';
import { StorageAdapter } from '../../src/storage/local';
import { emptyState } from '../../src/session/types';
class Memory {data=new Map<string,string>();getItem(k:string){return this.data.get(k)??null}setItem(k:string,v:string){this.data.set(k,v)}removeItem(k:string){this.data.delete(k)}}
describe('armazenamento',()=>{
 it('mantém conteúdo corrompido e usa memória',()=>{const m=new Memory();m.setItem('gravatexto:state','{invalid');const a=new StorageAdapter(m,'gravatexto:state');a.load();expect(a.warning).toBeTruthy();a.save(emptyState());expect(m.getItem('gravatexto:state')).toBe('{invalid')});
 it('rejeita versão futura sem apagar',()=>{const m=new Memory();m.setItem('gravatexto:state',JSON.stringify({...emptyState(),schema_version:99}));const a=new StorageAdapter(m,'gravatexto:state');a.load();a.save(emptyState());expect(m.getItem('gravatexto:state')).toContain('99')});
 it('detecta escrita de outra aba',()=>{const m=new Memory();const a=new StorageAdapter(m,'gravatexto:state');a.load();m.setItem('gravatexto:state',JSON.stringify(emptyState('other')));a.save(emptyState());expect(a.warning).toContain('outra aba')});
 it('quota e bloqueio não travam a sessão',()=>{const m={getItem(){throw Error('blocked')},setItem(){throw Error('quota')}};const a=new StorageAdapter(m,'gravatexto:state');expect(a.load().schema_version).toBe(1);expect(()=>a.save(emptyState())).not.toThrow()});
});

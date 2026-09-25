import type { State } from '../session/types';
import { emptyState } from '../session/types';
import { migrateState } from './migrations';
export interface StoragePort {getItem(key:string):string|null;setItem(key:string,value:string):void}
export class StorageAdapter {
 warning='';private previous:string|null=null;
 constructor(private port:StoragePort,private key:string){}
 load():State {try {this.previous=this.port.getItem(this.key);return this.previous?migrateState(JSON.parse(this.previous)):emptyState(crypto.randomUUID(),Intl.DateTimeFormat().resolvedOptions().timeZone||'America/Sao_Paulo')}catch{this.warning='O armazenamento está indisponível ou contém dados incompatíveis. Seu progresso ficará apenas nesta sessão.';return emptyState(crypto.randomUUID())}}
 save(state:State){if(this.warning)return;try{if(this.port.getItem(this.key)!==this.previous){this.warning='O progresso mudou em outra aba. Recarregue para usar o estado salvo; esta aba está em memória.';return}const value=JSON.stringify(state);this.port.setItem(this.key,value);this.previous=value}catch{this.warning='Seu progresso está disponível nesta sessão, mas não será salvo neste navegador.'}}
 disable(message='Armazenamento indisponível neste cenário. O progresso ficará apenas nesta sessão.'){this.warning=message}
}

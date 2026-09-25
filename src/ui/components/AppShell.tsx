import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Brand } from './Brand';
import { Icon,type IconName } from './Icon';

const destinations:{to:string;label:string;icon:IconName}[]=[{to:'/',label:'Hoje',icon:'home'},{to:'/path',label:'Jornada',icon:'path'},{to:'/explore',label:'Explorar',icon:'compass'},{to:'/profile',label:'Perfil',icon:'user'}];
export function AppShell({children}:{children:ReactNode}){
 return <div className="app-shell"><aside className="app-sidebar"><NavLink to="/" className="shell-brand" aria-label="GravaTexto, ir para Hoje"><Brand/></NavLink><nav aria-label="Navegação principal">{destinations.map(d=><NavLink key={d.to} to={d.to} end={d.to==='/'}><Icon name={d.icon}/><span>{d.label}</span></NavLink>)}</nav></aside><div className="app-stage">{children}</div><nav className="bottom-nav" aria-label="Navegação principal">{destinations.map(d=><NavLink key={d.to} to={d.to} end={d.to==='/'}><Icon name={d.icon}/><span>{d.label}</span></NavLink>)}</nav></div>;
}

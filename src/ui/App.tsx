import { Component,lazy,Suspense,useEffect,useState } from 'react';
import type { ErrorInfo,ReactNode } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { StoreProvider,useStore } from './store';
import { Session,Missing } from './pages/Session';
import { PwaStatus } from './components/PwaControls';
import { Brand } from './components/Brand';
const Home=lazy(()=>import('./pages/Home').then(m=>({default:m.Home})));
const Journeys=lazy(()=>import('./pages/Journeys').then(m=>({default:m.Journeys})));
const JourneyPath=lazy(()=>import('./pages/JourneyPath').then(m=>({default:m.JourneyPath})));
const Profile=lazy(()=>import('./pages/Profile').then(m=>({default:m.Profile})));
const Offline=lazy(()=>import('./pages/Offline').then(m=>({default:m.Offline})));
const Result=lazy(()=>import('./pages/Result').then(m=>({default:m.Result})));
const Panel=(import.meta.env.DEV||import.meta.env.VITE_ENABLE_DEVTOOLS==='true')?lazy(()=>import('../devtools/Panel')):null;
function useOnlineStatus(){const [online,setOnline]=useState(()=>navigator.onLine);useEffect(()=>{const update=()=>setOnline(navigator.onLine);addEventListener('online',update);addEventListener('offline',update);return()=>{removeEventListener('online',update);removeEventListener('offline',update)}},[]);return online}
function Shell(){const {warning,state}=useStore(),online=useOnlineStatus();return <><a className="skip-link" href="#main">Ir para o conteúdo</a>{state.mode!=='normal'&&<div className="test-banner">{state.mode==='gallery'?'Galeria de puzzles':'Cenário de teste'} · seu progresso normal está preservado</div>}{!online&&<div className="offline-banner" role="status">Sem conexão · sua prática local continua disponível.</div>}{warning&&<div className="storage-warning" role="status">{warning}{warning.includes('outra aba')&&<button onClick={()=>location.reload()}>Recarregar estado salvo</button>}</div>}<Suspense fallback={<div className="app-splash" role="status"><Brand/><span>Preparando sua prática…</span></div>}><Routes><Route path="/" element={<Home/>}/><Route path="/path" element={<JourneyPath/>}/><Route path="/journey/:id" element={<JourneyPath/>}/><Route path="/explore" element={<Journeys/>}/><Route path="/profile" element={<Profile/>}/><Route path="/offline" element={<Offline/>}/><Route path="/session/:id" element={<Session/>}/><Route path="/session/:id/result" element={<Result/>}/><Route path="*" element={<Missing/>}/></Routes></Suspense><PwaStatus/>{Panel&&<Suspense fallback={null}><Panel/></Suspense>}</>}
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}componentDidCatch(error:Error,_info:ErrorInfo){console.error('Falha recuperável do GravaTexto',error)}render(){return this.state.failed?<main className="simple-page"><h1>Não foi possível abrir esta prática.</h1><p>Seu progresso salvo não foi apagado.</p><a className="button" href="/">Voltar às jornadas</a></main>:this.props.children}}
export default function App(){return <Boundary><BrowserRouter><StoreProvider><Shell/></StoreProvider></BrowserRouter></Boundary>}

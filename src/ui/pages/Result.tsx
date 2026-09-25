import { Link,useNavigate,useParams } from 'react-router-dom';
import { useStore } from '../store';
import { content } from '../../content/adapt';
import { formatDay } from '../../progress/calendar';
import { Icon } from '../components/Icon';
import { Attribution } from '../components/Attribution';
import { Brand } from '../components/Brand';
import { Missing } from './Session';

export function Result(){
 const {id=''}=useParams(),navigate=useNavigate(),{state,replace}=useStore(),s=state.sessions[id],r=s?.result;
 if(!s)return <Missing/>;
 if(!r)return <main className="simple-page"><h1>Esta prática ainda não foi concluída.</h1><Link className="button" to={s.status==='archived'?'/':`/session/${id}`}>{s.status==='archived'?'Voltar para Hoje':'Retomar sessão'}</Link></main>;
 const xp=r.baseCorrect*10+r.reinforcementCorrect*5,accuracy=r.baseTotal?Math.round(r.baseCorrect/r.baseTotal*100):0;
 const continuePath=()=>{
  if(s.originNodeId?.includes(':checkpoint:')&&!state.milestones.includes(s.originNodeId))replace({...state,milestones:[...state.milestones,s.originNodeId]});
  sessionStorage.setItem('gravatexto:last-completed',s.journeyId);
  navigate(`/journey/${s.journeyId}`);
 };
 return <div className="result-page"><main id="main" className="result-main">
  <div className="result-brand"><Brand compact/></div><img className="result-art" src="/illustrations/pages.svg" alt=""/>
  <h1>Prática concluída.</h1><p className="result-intro">Um passo a mais na sua jornada.</p>
  <div className="xp-reward"><Icon name="spark"/><strong>+{xp} XP</strong><span>por respostas corretas independentes</span></div>
  <section className="result-summary"><div><Icon name="check"/><p><strong>{accuracy}%</strong><span>de acertos na primeira tentativa · {r.baseCorrect} de {r.baseTotal}</span></p></div>{r.reinforcementTotal>0&&<div><Icon name="leaf"/><p><strong>{r.reinforcementCorrect} de {r.reinforcementTotal} no reforço</strong><span>O primeiro resultado continua no histórico.</span></p></div>}{r.assisted>0&&<p>{r.assisted} {r.assisted===1?'associação assistida':'associações assistidas'}, fora dos acertos independentes.</p>}</section>
  <h2>Textos que passaram por aqui</h2><ul className="practiced-list">{r.verseIds.map(v=><li key={v}><span className="small-check"><Icon name="check" size={18}/></span><div><h3>{content.items[v].reference}</h3><p>{content.items[v].text}</p>{r.difficulties.filter(d=>d.verseId===v).length>0&&<span className="review-note">Rever {r.difficulties.filter(d=>d.verseId===v).map(d=>d.dimension==='text'?'texto':'referência').join(' e ')} com mais calma</span>}</div></li>)}</ul>
  <section className="review-section"><h2><Icon name="sun"/>Próximas revisões</h2>{r.reviews.map(v=><div className="review-row" key={v.verseId+v.dimension}><span>{content.items[v.verseId].reference}<small>{v.dimension==='text'?'Texto':'Referência'}</small></span><strong>{formatDay(v.due)}</strong></div>)}<p>Concluir é praticar. XP registra atividade; reconhecer com pistas não comprova recitação de memória.</p></section>
  <button className="button" onClick={continuePath}>Continuar na trilha<Icon name="arrow"/></button><Attribution/>
 </main></div>;
}

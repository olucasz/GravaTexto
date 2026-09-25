import { useEffect,useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import milestone from '../../assets/rewards/milestone.svg';
import { content } from '../../content/adapt';
import { journeyUnits,type JourneyNode } from '../../journey/model';
import { useStore } from '../store';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icon';

export function JourneyPath(){
 const params=useParams(),{state,start,send}=useStore(),navigate=useNavigate(),sessions=Object.values(state.sessions);
 const journeyId=params.id??sessions.find(s=>['active','paused'].includes(s.status))?.journeyId??[...sessions].sort((a,b)=>b.createdAt.localeCompare(a.createdAt))[0]?.journeyId??content.journeys[0].id;
 const journey=content.journeys.find(j=>j.id===journeyId)??content.journeys[0],units=journeyUnits(state,journey.id),active=sessions.find(s=>['active','paused'].includes(s.status));
 const [unlock]=useState(()=>sessionStorage.getItem('gravatexto:last-completed')===journey.id);
 useEffect(()=>{if(unlock)sessionStorage.removeItem('gravatexto:last-completed')},[unlock]);
 const open=(node:JourneyNode)=>{if(node.status==='locked')return;if(active){send({sessionId:active.id,type:'resume'});navigate(`/session/${active.id}`);return}const id=start(journey.id,node.id);navigate(`/session/${id}`)};
 return <AppShell><main id="main" className={`path-page path-${journey.id}`} data-unlock={unlock}>
  <header className="path-hero"><button className="icon-button" onClick={()=>navigate('/explore')} aria-label="Voltar para explorar"><Icon name="back"/></button><div><h1>{journey.title}</h1><span>{journey.description}</span></div><img src={journey.id==='first-verses'?'/illustrations/pages.svg':'/illustrations/tree.svg'} alt=""/></header>
  {units.map((unit,u)=><section className="journey-unit" key={unit.id}>
   <div className="unit-heading"><div><span>Unidade {u+1}</span><h2>{unit.title}</h2><p>{unit.description}</p></div><strong>{unit.nodes.filter(n=>['completed','mastered'].includes(n.status)).length} de {unit.nodes.length}</strong></div>
   <div className="journey-path">
    <svg className="journey-path-line path-line-wide" viewBox="0 0 100 472" preserveAspectRatio="none" aria-hidden="true"><path d="M20 59 C20 108 34 128 34 177 S52 246 52 295 S33 364 33 413"/></svg>
    <svg className="journey-path-line path-line-narrow" viewBox="0 0 100 472" preserveAspectRatio="none" aria-hidden="true"><path d="M11 59 C11 108 18 128 18 177 S27 246 27 295 S17 364 17 413"/></svg>
    {unit.nodes.map((node,n)=><div className={`path-step step-${node.position}`} key={node.id}><button className={`journey-node node-${node.type} is-${node.status}`} disabled={node.status==='locked'} onClick={()=>open(node)} aria-label={`${node.title}. ${labelStatus(node.status)}`}><span className="node-core">{node.status==='locked'?<Icon name="lock"/>:node.status==='completed'?<Icon name="check"/>:node.status==='mastered'?<Icon name="star"/>:node.type==='checkpoint'||node.type==='final'?<img src={milestone} alt=""/>:<strong>{u*3+n+1}</strong>}</span><span className="node-copy"><strong>{node.title}</strong><small>{node.subtitle}</small><em>{labelStatus(node.status)}</em></span></button></div>)}
   </div>
  </section>)}
 </main></AppShell>;
}
function labelStatus(status:JourneyNode['status']){return {locked:'Bloqueado',available:'Disponível','in-progress':'Em andamento',completed:'Concluído',mastered:'Muito praticado','review-needed':'Revisão disponível'}[status]}

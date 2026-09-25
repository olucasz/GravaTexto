import offline from '../../assets/illustrations/offline-path.svg';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
export function Offline(){return <main id="main" className="offline-page"><Brand/><img src={offline} alt=""/><h1>Você está sem conexão.</h1><p>O que já foi carregado continua disponível. Conecte-se novamente para buscar uma versão nova do aplicativo.</p><button className="button" onClick={()=>location.reload()}>Tentar novamente <Icon name="repeat"/></button></main>}

import mark from '../../assets/brand/mark.svg';

export function Brand({compact=false}:{compact?:boolean}){
 return <span className={`brand ${compact?'brand-compact':''}`}><img src={mark} alt=""/><span>GravaTexto<span className="brand-dot">.</span></span></span>;
}

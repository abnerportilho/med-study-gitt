const BASE=DADOS.map((d,i)=>Object.assign({id:"b"+i,meu:false,calc:null,rot:"",com:"",sin:"",classe:"",tipo:""},d));

const VIA_ORDEM=["Oral","Sublingual","Inalatório","Nasal","Tópico","Oftálmico","Vaginal","Retal","Subcutâneo","Intramuscular","Endovenoso"];
const VIA_AB={"Oral":"VO","Inalatório":"IN","Nasal":"NAS","Tópico":"TÓP","Oftálmico":"OFT","Vaginal":"VV","Retal":"VR","Intramuscular":"IM","Endovenoso":"EV","Subcutâneo":"SC","Sublingual":"SL"};
const CAT_COR={cli:"var(--blue)",gin:"var(--pink)",ped:"var(--yellow)",inj:"var(--red)"};
const norm=s=>(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

let estado={meus:[],modo:"ext",tema:"light",cab:{nome:"",crm:"",esp:"",end:""}};
let receita=[], sel=0, filtro="", peso=0;

// ---------- cálculo pediátrico ----------
function fmt(n){return String(n).replace(".",",");}
function calcPos(c,p){
  if(c.gtkg){
    const g=Math.min(Math.round(c.gtkg*p),c.maxgt);
    return `Dar ${g} gotas de ${c.h} em ${c.h} horas, ${c.cond} (calculado para ${fmt(p)} kg).`;
  }
  const doseMg=Math.min(c.mgkgdia*p/c.doses,c.maxmg);
  const ml=Math.max(0.5,Math.round(doseMg/c.conc*2)/2);
  const h=24/c.doses;
  const freq=c.doses===1?"1 vez ao dia":`de ${h} em ${h} horas`;
  return `Dar ${fmt(ml)} mL ${freq}, por ${c.dias} — ${c.mgkgdia} mg/kg/dia, calculado para ${fmt(p)} kg.`;
}
function posBruta(it){
  if(it.edit) return it.pos;
  if(it.calc && peso>0) return calcPos(it.calc,peso);
  return it.pos;
}

// ---------- abreviação ----------
function abrevUnid(s){
  return (s||"")
    .replace(/\bcomprimidos?\b/gi,"cp").replace(/\bcápsulas?\b/gi,"cáp")
    .replace(/\bfrascos?-ampolas?\b/gi,"FA").replace(/\bfrascos?\b/gi,"fr")
    .replace(/\bampolas?\b/gi,"amp").replace(/\bbisnagas?\b/gi,"bisn")
    .replace(/\benvelopes?\b/gi,"env").replace(/\bgotas?\b/gi,"gts")
    .replace(/\bsuspensão oral\b/gi,"susp.").replace(/\bsolução oral\b/gi,"sol. oral")
    .replace(/\bcápsula inalatória\b/gi,"cáp inal.").replace(/\bspray nasal\b/gi,"spray nas.")
    .replace(/\bcreme vaginal\b/gi,"cr. vag.").replace(/\bgel vaginal\b/gi,"gel vag.")
    .replace(/\bseringa preenchida\b/gi,"ser. preench.").replace(/\bcartelas?\b/gi,"cart");
}
function abreviar(t,via){
  let s=abrevUnid(t||"")
    .replace(/^(Tomar|Inalar|Aplicar|Dar|Oferecer)\s+/i,"").replace(/^Diluir\s+/i,"Diluir ")
    .replace(/de (\d+) em \1 horas/gi,"$1/$1h")
    .replace(/\b(\d+) vezes? (?:ao|por) dia\b/gi,"$1x/dia")
    .replace(/\b(?:1 vez )?ao dia\b/gi,"1x/dia")
    .replace(/\b(\d+) vezes? por semana\b/gi,"$1x/sem")
    .replace(/\b(?:1 vez )?por semana\b/gi,"1x/sem")
    .replace(/\bpor (\d+) dias?\b/gi,"$1d").replace(/\bpor (\d+) noites?\b/gi,"$1 noites")
    .replace(/\bpor (\d+) semanas?\b/gi,"$1sem").replace(/\bpor (\d+) meses?\b/gi,"$1 meses")
    .replace(/\bem dose única\b/gi,"dose única").replace(/\buso contínuo\b/gi,"uso cont.")
    .replace(/\bpela manhã\b/gi,"manhã").replace(/\bà noite\b/gi,"noite")
    .replace(/\bem jejum\b/gi,"jejum")
    .replace(/\bapós as refeições\b/gi,"após refeições").replace(/\bjunto às refeições\b/gi,"c/ refeições")
    .replace(/\bse dor ou febre\b/gi,"se dor/febre").replace(/\bse náusea ou vômito\b/gi,"se náusea/vômito")
    .replace(/\b30 minutos antes\b/gi,"30 min antes").replace(/\b(\d+) minutos\b/gi,"$1 min")
    .replace(/\b(\d+) horas\b/gi,"$1h")
    .replace(/\bvia intramuscular profunda\b/gi,"IM profunda").replace(/\bvia intramuscular\b/gi,"IM")
    .replace(/\bvia endovenosa lenta\b/gi,"EV lenta").replace(/\bvia endovenosa\b/gi,"EV")
    .replace(/\bvia subcutânea\b/gi,"SC")
    .replace(/\s+/g," ").trim();
  const ab=VIA_AB[via]||"";
  if(!ab) return s;
  if(new RegExp("\\b"+ab+"\\b").test(s)) return s;
  const m=s.match(/^(\d[^\s]*\s+\S+)\s+(.*)$/);
  if(m) return m[1]+" "+ab+" "+m[2];
  return ab+" "+s;
}
function posTexto(it){const b=posBruta(it);return (it.edit||estado.modo!=="abrev")?b:abreviar(b,it.via);}
function apresTexto(a){return estado.modo==="abrev"?abrevUnid(a):a;}
function nomeReceita(it){return it.nome+(it.com?" ("+it.com+")":"");}

// ---------- persistência ----------
async function carregar(){
  try{
    const r=localStorage.getItem("rx:v2");
    if(r){const d=JSON.parse(r);
      estado.meus=d.meus||[];estado.modo=d.modo||"ext";estado.tema=d.tema||"light";
      estado.cab=Object.assign(estado.cab,d.cab||{});return;}
  }catch(e){}
}
let tSave;
function salvar(){clearTimeout(tSave);tSave=setTimeout(()=>{try{localStorage.setItem("rx:v2",JSON.stringify(estado));}catch(e){}},400);}
const todos=()=>estado.meus.concat(BASE);

// ---------- busca ----------
function buscar(q){
  const n=norm(q).trim();
  let lista=todos();
  if(filtro==="meu") lista=lista.filter(m=>m.meu);
  else if(filtro) lista=lista.filter(m=>m.cat===filtro);
  if(!n) return lista.slice(0,14);
  const termos=n.split(/\s+/);
  return lista.map(m=>{
    const alvo=norm(m.nome+" "+m.com+" "+m.sin+" "+m.apres+" "+m.rot+" "+m.classe);
    let score=0;
    for(const t of termos){
      const i=alvo.indexOf(t);
      if(i<0) return null;
      score+=i===0?3:(alvo[i-1]===" "?2:1);
    }
    return {m,score:score+(m.meu?1:0)};
  }).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,50).map(x=>x.m);
}
function esc(s){return (s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
const elRes=document.getElementById("res"), elQ=document.getElementById("q");
function badge(m){
  let h="";
  if(m.tipo==="atb")h+='<span class="badge b-atb">ATB</span>';
  if(m.tipo==="c1")h+='<span class="badge b-c1">controle</span>';
  if(m.calc)h+='<span class="badge b-kg">mg/kg</span>';
  if(m.meu)h+='<span class="badge b-mine">meu</span>';
  return h;
}
function renderRes(){
  const lista=buscar(elQ.value);
  if(!lista.length){elRes.innerHTML='<li class="vazio">Nada encontrado. Cadastre em <strong>Minha base</strong>.</li>';return;}
  elRes.innerHTML=lista.map((m,i)=>{
    const posShow=(m.calc&&peso>0)?calcPos(m.calc,peso):m.pos;
    return `<li><button class="res ${i===sel?"on":""}" data-id="${m.id}">
      <div class="n"><span class="dot" style="background:${CAT_COR[m.cat]||"var(--ink-soft)"}"></span>
        ${esc(m.nome)}${m.com?` <span class="com">· ${esc(m.com)}</span>`:""}
        ${m.classe?`<span class="badge b-cls">${esc(m.classe)}</span>`:""}${m.rot?`<span class="badge b-rot">${esc(m.rot)}</span>`:""}${badge(m)}</div>
      <div class="a">${esc(apresTexto(m.apres))} · ${esc(estado.modo==="abrev"?VIA_AB[m.via]||m.via:"via "+m.via.toLowerCase())}</div>
      <div class="p">${esc(estado.modo==="abrev"?abreviar(posShow,m.via):posShow)}</div>
    </button></li>`;}).join("");
}
elQ.addEventListener("input",()=>{sel=0;renderRes();});
elQ.addEventListener("keydown",e=>{
  const n=elRes.querySelectorAll(".res").length;
  if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(sel+1,n-1);renderRes();scrollSel();}
  else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(sel-1,0);renderRes();scrollSel();}
  else if(e.key==="Enter"){e.preventDefault();const b=elRes.querySelectorAll(".res")[sel];if(b)addPorId(b.dataset.id);}
  else if(e.key==="Escape"){elQ.value="";sel=0;renderRes();}
});
function scrollSel(){const el=elRes.querySelectorAll(".res")[sel];if(el)el.scrollIntoView({block:"nearest"});}
elRes.addEventListener("click",e=>{const b=e.target.closest(".res");if(b)addPorId(b.dataset.id);});
function addPorId(id){
  const m=todos().find(x=>x.id===id);if(!m)return;
  receita.push({nome:m.nome,com:m.com,apres:m.apres,via:m.via,pos:m.pos,qtd:m.qtd,tipo:m.tipo,calc:m.calc});
  elQ.value="";sel=0;renderRes();renderPaper();elQ.focus();
}
document.getElementById("chips").addEventListener("click",e=>{
  const c=e.target.closest(".chip");if(!c)return;
  filtro=c.dataset.c;
  document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===c));
  sel=0;renderRes();
});
const elPeso=document.getElementById("peso");
elPeso.addEventListener("input",()=>{
  peso=parseFloat(elPeso.value)||0;
  document.getElementById("peso-ok").textContent=peso>0?`doses mg/kg calculadas para ${fmt(peso)} kg`:"";
  renderRes();renderPaper();
});

// ---------- papel ----------
const paper=document.getElementById("paper");
function hoje(){const d=new Date();return String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear();}
function renderPaper(){
  const c=estado.cab;
  let html=`<div class="ph">
      <div class="nome">${esc(c.nome)||'<span style="color:#A8A8C0">Seu nome — preencha em Cabeçalho</span>'}</div>
      <div class="meta">${[esc(c.esp),esc(c.crm)].filter(Boolean).join(" · ")}${c.end?"<br>"+esc(c.end):""}</div>
    </div>
    <div class="ptitle">Receituário</div>
    <div class="pac"><span>Paciente: <span contenteditable data-k="paciente" style="min-width:160px;display:inline-block">&nbsp;</span></span>
    <span>${peso>0?`Peso: ${fmt(peso)} kg · `:""}${hoje()}</span></div>`;
  if(!receita.length){
    html+=`<div class="pvazio">Busque um medicamento ao lado.<br>Os itens escolhidos aparecem aqui, prontos para copiar.</div>`;
  }else{
    const vias=[...new Set(receita.map(i=>i.via))].sort((a,b)=>VIA_ORDEM.indexOf(a)-VIA_ORDEM.indexOf(b));
    let n=0;
    for(const via of vias){
      html+=`<div class="via">${esc(estado.modo==="abrev"?(VIA_AB[via]||via):"Uso "+via.toLowerCase())}</div>`;
      receita.forEach((it,idx)=>{
        if(it.via!==via)return;
        n++;
        const semPeso=it.calc&&!(peso>0)&&!it.edit;
        html+=`<div class="item" data-idx="${idx}">
          <div class="num">${n})</div>
          <div class="body">
            <div class="l1"><span class="med" contenteditable data-f="nome" data-idx="${idx}">${esc(nomeReceita(it))}${it.apres?" — "+esc(apresTexto(it.apres)):""}</span>
              <span class="qtd" contenteditable data-f="qtd" data-idx="${idx}">${esc(apresTexto(it.qtd))}</span></div>
            <div class="l2" contenteditable data-f="pos" data-idx="${idx}">${esc(posTexto(it))}</div>
            ${semPeso?'<div class="l2 falta">⚠ dose por peso — informe o peso acima da busca</div>':""}
          </div>
          <div class="ctrls">
            <button title="Subir" data-mv="-1" data-idx="${idx}">↑</button>
            <button title="Descer" data-mv="1" data-idx="${idx}">↓</button>
            <button title="Remover" data-rm="${idx}">✕</button>
          </div>
        </div>`;
      });
    }
  }
  html+=`<div class="sign"><div class="rule"></div>${esc(c.nome)}${c.crm?" — "+esc(c.crm):""}</div>`;
  paper.innerHTML=html;
  const avisos=[];
  if(receita.some(i=>i.tipo==="atb"))avisos.push("Contém antimicrobiano: imprimir em receita própria, 2 vias (RDC 20/2011).");
  if(receita.some(i=>i.tipo==="c1"))avisos.push("Contém medicamento de controle especial: usar receituário próprio, 2 vias.");
  document.getElementById("nota-atb").textContent=avisos.join(" ");
}
paper.addEventListener("input",e=>{
  const t=e.target,f=t.dataset.f,i=+t.dataset.idx;
  if(f&&receita[i]){
    if(f==="nome"){receita[i].nome=t.textContent.trim();receita[i].com="";receita[i].apres="";}
    else{receita[i][f]=t.textContent.trim();if(f==="pos")receita[i].edit=true;}
  }
});
paper.addEventListener("click",e=>{
  const rm=e.target.dataset.rm,mv=e.target.dataset.mv;
  if(rm!==undefined){receita.splice(+rm,1);renderPaper();}
  else if(mv!==undefined){
    const i=+e.target.dataset.idx,j=i+ +mv;
    if(j>=0&&j<receita.length){[receita[i],receita[j]]=[receita[j],receita[i]];renderPaper();}
  }
});

// ---------- copiar ----------
function textoReceita(){
  const c=estado.cab,L=[];
  if(c.nome)L.push(c.nome);
  const l2=[c.esp,c.crm].filter(Boolean).join(" · ");if(l2)L.push(l2);
  if(c.end)L.push(c.end);
  L.push("","RECEITUÁRIO","");
  const pac=paper.querySelector('[data-k="paciente"]');
  L.push("Paciente: "+((pac&&pac.textContent.trim())||"________________________________"));
  if(peso>0)L.push("Peso: "+fmt(peso)+" kg");
  L.push("Data: "+hoje(),"");
  const vias=[...new Set(receita.map(i=>i.via))].sort((a,b)=>VIA_ORDEM.indexOf(a)-VIA_ORDEM.indexOf(b));
  let n=0;
  for(const via of vias){
    L.push(estado.modo==="abrev"?(VIA_AB[via]||via.toUpperCase()):"USO "+via.toUpperCase(),"");
    receita.filter(i=>i.via===via).forEach(it=>{
      n++;
      const cab=nomeReceita(it)+(it.apres?" — "+apresTexto(it.apres):"");
      L.push(n+") "+cab+(it.qtd?" ".repeat(Math.max(2,60-cab.length))+apresTexto(it.qtd):""));
      L.push("   "+posTexto(it),"");
    });
  }
  L.push("","______________________________");
  L.push([c.nome,c.crm].filter(Boolean).join(" — "));
  return L.join("\n");
}
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),1900);}
document.getElementById("copiar").onclick=async()=>{
  if(!receita.length){toast("A receita está vazia.");return;}
  if(receita.some(i=>i.calc&&!(peso>0)&&!i.edit)){toast("Há dose por peso sem peso informado.");return;}
  const txt=textoReceita();
  try{await navigator.clipboard.writeText(txt);toast("Receita copiada.");}
  catch(e){
    const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");toast("Receita copiada.");}catch(_){toast("Não consegui copiar — selecione o texto do papel.");}
    ta.remove();
  }
};
document.getElementById("imprimir").onclick=()=>window.print();
document.getElementById("limpar").onclick=()=>{if(receita.length&&confirm("Limpar todos os itens da receita?")){receita=[];renderPaper();}};
const btModo=document.getElementById("modo");
function rotuloModo(){btModo.textContent=estado.modo==="abrev"?"Por extenso":"Abreviar";}
btModo.onclick=()=>{
  estado.modo=estado.modo==="abrev"?"ext":"abrev";
  salvar();rotuloModo();renderRes();renderPaper();
  toast(estado.modo==="abrev"?"Modo abreviado: 1 cp VO 8/8h, 7d":"Modo por extenso");
};

// ---------- tema ----------
const btTema=document.getElementById("tema");
function aplicarTema(){
  document.body.dataset.theme=estado.tema;
  btTema.textContent=estado.tema==="light"?"🌙 Escuro":"☀️ Claro";
}
btTema.onclick=()=>{estado.tema=estado.tema==="light"?"dark":"light";salvar();aplicarTema();};

// ---------- abas ----------
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{
  document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected",x===t));
  ["rx","base","cab"].forEach(k=>document.getElementById("tab-"+k).hidden=(k!==t.dataset.tab));
});

// ---------- minha base ----------
function renderBase(){
  const ul=document.getElementById("lista-base");
  if(!estado.meus.length){ul.innerHTML='<li style="color:var(--ink-soft);border:0">Nenhum esquema seu ainda.</li>';return;}
  ul.innerHTML=estado.meus.map(m=>`<li><span><strong>${esc(m.nome)}</strong>${m.com?" ("+esc(m.com)+")":""} — ${esc(m.apres)}<small>${esc(m.pos)}</small></span>
    <button class="del" data-del="${m.id}">remover</button></li>`).join("");
}
document.getElementById("lista-base").addEventListener("click",e=>{
  const id=e.target.dataset.del;if(!id)return;
  estado.meus=estado.meus.filter(m=>m.id!==id);salvar();renderBase();renderRes();
});
document.getElementById("salvar-med").onclick=()=>{
  const g=id=>document.getElementById(id).value.trim();
  if(!g("f-nome")||!g("f-pos")){toast("Preencha ao menos o medicamento e a posologia.");return;}
  estado.meus.unshift({id:"m"+Date.now(),nome:g("f-nome"),com:g("f-com"),apres:g("f-apres"),via:g("f-via"),
    cat:document.getElementById("f-cat").value,classe:g("f-classe"),rot:"",pos:g("f-pos"),qtd:g("f-qtd"),
    tipo:document.getElementById("f-tipo").value,sin:g("f-sin"),calc:null,meu:true});
  ["f-nome","f-com","f-apres","f-qtd","f-pos","f-sin","f-classe"].forEach(i=>document.getElementById(i).value="");
  salvar();renderBase();renderRes();toast("Esquema salvo na sua base.");
};
document.getElementById("exportar").onclick=()=>{
  const b=new Blob([JSON.stringify(estado,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="minha-base-receitas.json";a.click();
};
document.getElementById("importar-btn").onclick=()=>document.getElementById("importar").click();
document.getElementById("importar").onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{try{
    const d=JSON.parse(r.result);
    if(Array.isArray(d.meus)){estado.meus=d.meus.concat(estado.meus);estado.cab=Object.assign(estado.cab,d.cab||{});
      salvar();renderBase();renderRes();preencherCab();renderPaper();toast("Base importada.");}
    else toast("Arquivo não reconhecido.");
  }catch(_){toast("Arquivo inválido.");}};
  r.readAsText(f);
};

// ---------- cabeçalho ----------
const mapCab={"c-nome":"nome","c-crm":"crm","c-esp":"esp","c-end":"end"};
Object.keys(mapCab).forEach(id=>document.getElementById(id).addEventListener("input",e=>{
  estado.cab[mapCab[id]]=e.target.value;salvar();renderPaper();
}));
function preencherCab(){Object.keys(mapCab).forEach(id=>document.getElementById(id).value=estado.cab[mapCab[id]]||"");}

// ---------- init ----------
(async()=>{await carregar();aplicarTema();preencherCab();rotuloModo();renderRes();renderPaper();renderBase();elQ.focus();})();

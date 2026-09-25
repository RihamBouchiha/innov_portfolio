"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const games = [
  { id: "bughunt", number: "01", title: "Bug Hunt", subtitle: "Repère l'erreur dans le code", icon: "grid", tone: "cyan" },
  { id: "binary", number: "02", title: "Binary Gate", subtitle: "Décode le signal binaire", icon: "xo", tone: "violet" },
  { id: "algorithm", number: "03", title: "Algo Flow", subtitle: "Analyse la logique algorithmique", icon: "cards", tone: "blue" },
  { id: "sql", number: "04", title: "SQL Quest", subtitle: "Interroge la base de données", icon: "pulse", tone: "coral" },
  { id: "console", number: "05", title: "Console", subtitle: "Prédit la sortie du programme", icon: "odd", tone: "lime" },
];

const beginnerGames = [
  { id: "tictactoe", number: "01", title: "Morpion", subtitle: "Aligne trois symboles", icon: "xo", tone: "violet" },
  { id: "memory", number: "02", title: "Mémoire", subtitle: "Retrouve toutes les paires", icon: "cards", tone: "blue" },
  { id: "flashcode", number: "03", title: "Code secret", subtitle: "Mémorise quatre chiffres", icon: "pulse", tone: "coral" },
  { id: "sudoku", number: "04", title: "Mini Sudoku", subtitle: "Complète avec 1, 2 et 3", icon: "grid", tone: "cyan" },
  { id: "oddone", number: "05", title: "L'intrus", subtitle: "Trouve la forme différente", icon: "odd", tone: "lime" },
];
const allGames = [...games, ...beginnerGames.filter(g=>!games.some(x=>x.id===g.id))];

const Icon = ({ name }) => {
  if (name === "grid") return <span className="grid-icon">{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>;
  if (name === "xo") return <span className="xo-icon"><b>×</b><i>○</i></span>;
  if (name === "pulse") return <span className="pulse-icon">428</span>;
  if (name === "odd") return <span className="odd-icon"><i>●</i><i>●</i><i>■</i></span>;
  return <span className="cards-icon"><i /><i /><i /></span>;
};

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "compact" : ""}`}>
      <span className="brand-mark" role="img" aria-label="Logo Innoverse" />
      <div><strong>INNOVERSE</strong><span>INNOVATION CLUB</span></div>
    </div>
  );
}

function Home({ onPlay, audience, setAudience }) {
  const carousel=useRef(null); const [slide,setSlide]=useState(0);
  const visibleGames=audience==="discovery"?beginnerGames:games;
  const go=(index)=>{const next=(index+visibleGames.length)%visibleGames.length;setSlide(next);const el=carousel.current;if(el)el.scrollTo({left:next*el.clientWidth,behavior:"smooth"})};
  useEffect(()=>{setSlide(0);carousel.current?.scrollTo({left:0})},[audience]);
  return (
    <main className="page-shell">
      <div className="orb orb-one" /><div className="orb orb-two" />
      <header><Logo /><button className="sound" aria-label="Son activé">⌁</button></header>
      <section className="hero">
        <div className="eyebrow"><span /> ACCÈS AU PORTFOLIO</div>
        <h1>Débloque<br />notre <em>univers.</em></h1>
        <p>Un esprit curieux mérite une entrée unique.<br />Relève un défi pour accéder à notre monde.</p>
      </section>
      <section className="game-section">
        <div className="level-switch" role="group" aria-label="Choisir son parcours"><button className={audience==="discovery"?"active":""} onClick={()=>setAudience("discovery")}><b>Découverte</b><small>Classe prépa</small></button><button className={audience==="engineer"?"active":""} onClick={()=>setAudience("engineer")}><b>Ingénieur</b><small>Cycle ingénieur</small></button></div>
        <div className="section-head"><span>CHOISIS TON JEU</span><i>Glisse pour explorer</i></div>
        <div className="challenge-route" aria-hidden="true"><span>START</span><i/><i/><i/><b>PORTFOLIO</b></div>
        <div className="arcade-console">
          <div className="console-top"><span><i/> INNOVERSE OS</span><b>{String(slide+1).padStart(2,"0")} / 05</b></div>
          <div className="game-list" ref={carousel} onScroll={e=>setSlide(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth))}>
            {visibleGames.map((game, index) => (
              <button className={`game-card ${game.tone}`} key={game.id} onClick={() => onPlay(game.id)}>
                <span className="game-number">{String(index+1).padStart(2,"0")}</span>
                <span className="icon-orbit"><Icon name={game.icon} /></span>
                <span className="game-copy"><strong>{game.title}</strong><small>{game.subtitle}</small></span>
                <span className="arrow">↗</span>
                <span className="play-label">JOUER</span>
                {index === 0 && <span className="recommended">RECOMMANDÉ</span>}
              </button>
            ))}
          </div>
          <div className="carousel-controls"><button onClick={()=>go(slide-1)} aria-label="Jeu précédent">←</button><div>{visibleGames.map((_,i)=><i className={i===slide?"active":""} key={i}/>)}</div><button onClick={()=>go(slide+1)} aria-label="Jeu suivant">→</button></div>
          <div className="console-speaker" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        </div>
      </section>
      <footer><span><i /> SYSTÈME PRÊT</span><span>INNOVERSE © 2026</span></footer>
    </main>
  );
}

const emptyBoard = Array(9).fill(null);

function TicTacToe({ onWin }) {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState("À toi de jouer");
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winner = (b) => lines.some(([a,c,d]) => b[a] && b[a] === b[c] && b[a] === b[d]);
  const move = (i) => {
    if (board[i] || status.includes("gagné")) return;
    const next = [...board]; next[i] = "X";
    if (winner(next)) { setBoard(next); setStatus("Tu as gagné !"); setTimeout(onWin, 650); return; }
    const free = next.map((v, j) => v ? -1 : j).filter(j => j >= 0);
    if (!free.length) { setBoard(next); setStatus("Égalité — recommence"); return; }
    const winMove = free.find(j => { const test=[...next]; test[j]="O"; return winner(test); });
    const blockMove = free.find(j => { const test=[...next]; test[j]="X"; return winner(test); });
    const bot = winMove ?? blockMove ?? free[Math.floor(Math.random()*free.length)];
    next[bot] = "O"; setBoard(next);
    if (winner(next)) setStatus("Presque ! Essaie encore");
  };
  const reset = () => { setBoard(emptyBoard); setStatus("À toi de jouer"); };
  useEffect(() => { if (status.includes("Presque") || status.includes("Égalité")) setTimeout(reset, 900); }, [status]);
  return <><div className="game-status"><b>{status}</b><span>Aligne trois symboles</span></div><div className="tic-board">{board.map((v,i)=><button onClick={()=>move(i)} key={i} className={v ? `marked ${v}` : ""}>{v}</button>)}</div><button className="text-button" onClick={reset}>↻ Recommencer</button></>;
}

const sudokuStart = [1,0,3, 0,3,0, 0,0,2];
const sudokuSolution = [1,2,3, 2,3,1, 3,1,2];
function Sudoku({ onWin }) {
  const [board, setBoard] = useState(sudokuStart);
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);
  const place = (n) => {
    if (selected === null || sudokuStart[selected]) return;
    if (sudokuSolution[selected] !== n) { setWrong(selected); setTimeout(()=>setWrong(null), 400); return; }
    const next=[...board]; next[selected]=n; setBoard(next);
    if(next.every((v,i)=>v===sudokuSolution[i])) setTimeout(onWin, 500);
  };
  return <><div className="game-status"><b>Mini Sudoku 3×3</b><span>Chaque ligne contient 1, 2 et 3</span></div><div className="sudoku-board">{board.map((v,i)=><button key={i} className={`${selected===i?"selected":""} ${wrong===i?"wrong":""} ${sudokuStart[i]?"fixed":""}`} onClick={()=>setSelected(i)}>{v || ""}</button>)}</div><div className="number-pad">{[1,2,3].map(n=><button key={n} onClick={()=>place(n)}>{n}</button>)}</div></>;
}

const symbols = ["</>","{ }","01","#_","</>","{ }","01","#_"];
function Memory({ onWin }) {
  const deck = useMemo(() => [...symbols].sort(()=>Math.random()-.5), []);
  const [open,setOpen]=useState([]); const [done,setDone]=useState([]);
  const flip=(i)=>{
    if(open.length===2 || open.includes(i) || done.includes(i)) return;
    const next=[...open,i]; setOpen(next);
    if(next.length===2) setTimeout(()=>{ if(deck[next[0]]===deck[next[1]]) { const matched=[...done,...next]; setDone(matched); if(matched.length===8)setTimeout(onWin,400); } setOpen([]); },550);
  };
  return <><div className="game-status"><b>Connecte les paires</b><span>{done.length/2} / 4 retrouvées</span></div><div className="memory-board">{deck.map((s,i)=><button key={i} onClick={()=>flip(i)} className={open.includes(i)||done.includes(i)?"flipped":""}><span>{s}</span></button>)}</div></>;
}

function FlashCode({ onWin }) {
  const makeCode = () => Array.from({length:4},()=>Math.floor(Math.random()*9)+1);
  const [code,setCode]=useState(makeCode); const [visible,setVisible]=useState(true); const [answer,setAnswer]=useState([]); const [message,setMessage]=useState("Mémorise ce code");
  useEffect(()=>{const timer=setTimeout(()=>{setVisible(false);setMessage("Recompose le code")},2200);return()=>clearTimeout(timer)},[code]);
  const press=(n)=>{if(visible||answer.length===4)return;const next=[...answer,n];setAnswer(next);if(next.length===4){if(next.join("")===code.join(""))setTimeout(onWin,450);else setTimeout(()=>{setCode(makeCode());setAnswer([]);setVisible(true);setMessage("Encore une fois !")},650)}};
  return <><div className="game-status"><b>{message}</b><span>4 chiffres, 2 secondes</span></div><div className={`flash-display ${visible?"visible":""}`}>{visible?code.map((n,i)=><span key={i}>{n}</span>):[0,1,2,3].map((_,i)=><span key={i}>{answer[i]??"·"}</span>)}</div><div className="flash-pad">{[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>press(n)}>{n}</button>)}</div></>;
}

const bugRounds=[
  {code:["const club = 'Innoverse';","console.log(club);","return true;"],bug:2},
  {code:["let score = 10;","score += 5;","console.log(scores);"],bug:2},
  {code:["if (ready) {","  launch();","// accolade manquante"],bug:2}
];
function BugHunt({onWin}){const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=i=>{if(i!==bugRounds[round].bug){setMiss(i);setTimeout(()=>setMiss(null),400);return}if(round===2)setTimeout(onWin,400);else setRound(round+1)};return <><div className="game-status"><b>Quel ligne contient le bug ?</b><span>Fichier {round+1} / 3</span></div><div className="code-window"><div><i/><i/><i/><span>main.js</span></div>{bugRounds[round].code.map((line,i)=><button className={miss===i?"line-miss":""} onClick={()=>pick(i)} key={line}><b>{i+1}</b><code>{line}</code></button>)}</div></>}

function BinaryGate({onWin}){const rounds=[{bits:"0101",value:5},{bits:"1001",value:9},{bits:"1110",value:14}];const[round,setRound]=useState(0);const[miss,setMiss]=useState(false);const choose=n=>{if(n!==rounds[round].value){setMiss(true);setTimeout(()=>setMiss(false),350);return}if(round===2)setTimeout(onWin,350);else setRound(round+1)};const answers=[rounds[round].value,rounds[round].value+2,Math.max(0,rounds[round].value-3)].sort((a,b)=>a-b);return <><div className="game-status"><b>Convertis en décimal</b><span>Signal {round+1} / 3</span></div><div className={`binary-signal ${miss?"miss":""}`}>{rounds[round].bits.split("").map((b,i)=><span key={i}>{b}</span>)}</div><div className="binary-options">{answers.map(n=><button onClick={()=>choose(n)} key={n}>{n}</button>)}</div></>}

const consoleRounds=[
  {code:"console.log(2 + 3 * 2)",answers:[10,8,7],correct:8},
  {code:"'code'.length",answers:[3,4,5],correct:4},
  {code:"Boolean(0)",answers:["true","false","null"],correct:"false"}
];
function ConsoleGame({onWin}){const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=a=>{if(a!==consoleRounds[round].correct){setMiss(a);setTimeout(()=>setMiss(null),350);return}if(round===2)setTimeout(onWin,350);else setRound(round+1)};return <><div className="game-status"><b>Que va afficher le programme ?</b><span>Commande {round+1} / 3</span></div><div className="console-box"><span>innoverse@lab:~$</span><code>{consoleRounds[round].code}</code><i>_</i></div><div className="console-options">{consoleRounds[round].answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}>{String(a)}</button>)}</div></>}

const algoRounds=[
  {title:"Recherche rapide",code:"Tableau trié de 1 000 éléments",answers:["Recherche linéaire","Recherche binaire","Parcours complet"],correct:"Recherche binaire"},
  {title:"Complexité",code:"Deux boucles imbriquées de taille n",answers:["O(n)","O(log n)","O(n²)"],correct:"O(n²)"},
  {title:"Structure adaptée",code:"Dernier élément entré, premier sorti",answers:["File","Pile","Arbre"],correct:"Pile"}
];
function AlgorithmGame({onWin}){const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=a=>{if(a!==algoRounds[round].correct){setMiss(a);setTimeout(()=>setMiss(null),400);return}if(round===algoRounds.length-1)setTimeout(onWin,400);else setRound(round+1)};const q=algoRounds[round];return <><div className="game-status"><b>{q.title}</b><span>Analyse {round+1} / {algoRounds.length}</span></div><div className="tech-terminal"><span>ALGORITHM.INPUT</span><code>{q.code}</code><i>Choisis la solution optimale</i></div><div className="tech-options">{q.answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}><small>OPTION</small><b>{a}</b></button>)}</div></>}

const sqlRounds=[
  {goal:"Afficher tous les membres",answers:["SELECT * FROM membres;","GET membres ALL;","SHOW * membres;"],correct:"SELECT * FROM membres;"},
  {goal:"Filtrer les scores supérieurs à 10",answers:["WHERE score > 10","FILTER score > 10","IF score > 10"],correct:"WHERE score > 10"},
  {goal:"Trier les résultats du plus grand au plus petit",answers:["ORDER BY score DESC","SORT score DOWN","GROUP BY score"],correct:"ORDER BY score DESC"}
];
function SQLGame({onWin}){const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=a=>{if(a!==sqlRounds[round].correct){setMiss(a);setTimeout(()=>setMiss(null),400);return}if(round===sqlRounds.length-1)setTimeout(onWin,400);else setRound(round+1)};const q=sqlRounds[round];return <><div className="game-status"><b>Construis la requête</b><span>Mission {round+1} / {sqlRounds.length}</span></div><div className="database-visual"><div className="db-disc"/><span>INNOVERSE_DB</span><b>{q.goal}</b></div><div className="tech-options sql-options">{q.answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}><small>QUERY</small><code>{a}</code></button>)}</div></>}

const advancedOdd=[
  {label:"Analyse le signal",top:"SIGNAL",normal:["1011","0110"],odd:["1011","0101"]},
  {label:"Inspecte la balise",top:"HTML",normal:["<section>","</section>"],odd:["<section>","<section/> "]},
  {label:"Compare la structure",top:"LOGIC",normal:["{ [ (", ") ] }"],odd:["{ [ )","( ] } "]},
  {label:"Vérifie l'identifiant",top:"HASH",normal:["#6A5F","E09C"],odd:["#6A5E","F09C"]}
];
function OddOne({onWin}){const[round,setRound]=useState(0);const[pos,setPos]=useState(()=>Math.floor(Math.random()*6));const[miss,setMiss]=useState(null);const choose=i=>{if(i!==pos){setMiss(i);setTimeout(()=>setMiss(null),420);return}if(round===advancedOdd.length-1)setTimeout(onWin,450);else{setRound(round+1);setPos(Math.floor(Math.random()*6));setMiss(null)}};const data=advancedOdd[round];return <><div className="game-status adult-status"><b>{data.label}</b><span>Détecte le seul paquet de données corrompu</span></div><div className="anomaly-console"><div className="scan-line"/><div className="anomaly-head"><span><i/> ANOMALY SCANNER</span><b>LIVE · 0{round+1}</b></div><div className="focus-meter"><i style={{width:`${(round+1)/advancedOdd.length*100}%`}}/></div><div className="packet-grid">{Array.from({length:6}).map((_,i)=>{const value=i===pos?data.odd:data.normal;return <button className={miss===i?"wrong-pick":""} onClick={()=>choose(i)} key={i}><span className="packet-top"><small>0{i+1}</small><i>{data.top}</i></span><code><b>{value[0]}</b><b>{value[1]}</b></code><span className="packet-bars"><i/><i/><i/></span></button>})}</div><div className="scan-footer"><span>6 NODES CONNECTÉS</span><span>NIVEAU {round+1}/{advancedOdd.length}</span></div></div></>}

function GameScreen({ gameId, onBack, onWin }) {
  const game=allGames.find(g=>g.id===gameId);
  return <main className="play-shell"><div className="orb orb-three"/><header><button className="back" onClick={onBack}>←</button><Logo compact/><span className="counter">{game.number}/05</span></header><section className="play-intro"><div className="eyebrow"><span/> MISSION EN COURS</div><h2>{game.title}</h2><p>{game.subtitle}</p></section><section className="game-zone">{gameId==="bughunt"&&<BugHunt onWin={onWin}/>} {gameId==="binary"&&<BinaryGate onWin={onWin}/>} {gameId==="algorithm"&&<AlgorithmGame onWin={onWin}/>} {gameId==="sql"&&<SQLGame onWin={onWin}/>} {gameId==="console"&&<ConsoleGame onWin={onWin}/>} {gameId==="memory"&&<Memory onWin={onWin}/>} {gameId==="flashcode"&&<FlashCode onWin={onWin}/>} {gameId==="tictactoe"&&<TicTacToe onWin={onWin}/>} {gameId==="sudoku"&&<Sudoku onWin={onWin}/>} {gameId==="oddone"&&<OddOne onWin={onWin}/>}</section></main>;
}

function Victory({ onEnter }) {
  return <div className="victory"><div className="victory-rays"/><div className="victory-mark">✓</div><div className="eyebrow"><span/> ACCÈS AUTORISÉ</div><h2>Bien joué,<br/><em>esprit brillant.</em></h2><p>Tu viens de débloquer l'accès<br/>à l'univers Innoverse.</p><button onClick={onEnter}>ENTRER DANS LE PORTFOLIO <span>→</span></button><small>Découvre l'équipe derrière Innoverse</small></div>;
}

const members = [
  { name: "Fahim Mariam", role: "Team Leader", photo: require("../images/image copy 14.png").default },
  { name: "Ferhan Abdelali", role: "Vice Team Leader", photo: require("../images/image copy 13.png").default },
  { name: "Bouchikha Riham", role: "Communication Responsable", photo: require("../images/image copy 12.png").default },
  { name: "Daba Siham", role: "Secretary General", photo: require("../images/image copy 11.png").default },
  { name: "El Fadili Abdelkoddouss", role: "Event Manager", photo: require("../images/image copy 10.png").default },
  { name: "Choukrani Salma", role: "Vice Event Manager", photo: require("../images/image copy 9.png").default },
  { name: "Halla Nezha", role: "Human Resources", photo: require("../images/image copy 8.png").default },
  { name: "Chouichou Bilal", role: "Sponsorship Responsable", photo: require("../images/image copy 7.png").default },
  { name: "Alloufi Yasser", role: "Vice Sponsorship Responsable", photo: require("../images/image copy 6.png").default },
  { name: "Elebar Ayoub", role: "Project Manager", photo: require("../images/image copy 5.png").default },
  { name: "Kejja Hiba", role: "Vice Project Manager", photo: require("../images/image copy 4.png").default },
  { name: "Zarioh Maysara", role: "Treasurer", photo: require("../images/image copy 3.png").default },
  { name: "El Fankari Mohamed", role: "Training Manager", photo: require("../images/image copy 2.png").default },
  { name: "El Ouazzani Mohamed Rayane", role: "Media Manager & Graphic Designer", photo: require("../images/image copy.png").default },
  { name: "Mihi Rida", role: "Consultant", photo: require("../images/image.png").default },
];

const teamPhoto = require("../images/image copy 15.png").default;

const eventMemories = [
  { type: "photo", photo: require("../images/IMG-20251009-WA0151.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0416.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0447.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0694.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0802.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0814.jpg").default },
  { type: "photo", photo: require("../images/IMG-20251009-WA0861.jpg").default },
  { type: "photo", photo: require("../images/IMG_20251009_191146.jpg").default },
  { type: "video", src: "/events/VID-20251009-WA0865.mp4", poster: require("../images/IMG-20251009-WA0151.jpg").default.src },
  { type: "video", src: "/events/VID-20251010-WA0025.mp4", poster: require("../images/IMG-20251009-WA0416.jpg").default.src },
];

const workshopMemories = [
  { photo: require("../images/10.png").default, topic: "ATELIER INNOVERSE" },
  { photo: require("../images/1742991207384.jpg").default, topic: "ATELIER INNOVERSE" },
  { photo: "/workshops/web-security.jpg", width: 1800, height: 2400, topic: "WEB SECURITY" },
  { photo: require("../images/WhatsApp Image 2025-09-13 à 21.44.14_cb47e00f.jpg").default, topic: "DESIGN WEB" },
  { photo: require("../images/WhatsApp Image 2025-09-13 à 21.44.24_ce62310d.jpg").default, topic: "TRAVAIL EN ÉQUIPE" },
  { photo: require("../images/WhatsApp Image 2025-09-14 à 19.04.53_2ac08bb5.jpg").default, topic: "AGILITÉ & COLLABORATION" },
  { photo: require("../images/Our third workshop was all about UI-UX design! ✨🖌️ Members gathered to explore the principles .webp").default, topic: "UI / UX DESIGN" },
  { photo: require("../images/🚀 Mastering Version Control with Git & GitHub! 🔥At InnoVerse, we believe in empowering our me (1).webp").default, topic: "GIT & GITHUB" },
];

const hackathonMemories = [
  { photo: require("../images/1777049694173.jpg").default, event: "ENIGMA VERSE" },
  { photo: require("../images/1777049625993.jpg").default, event: "ENIGMA VERSE" },
  { photo: require("../images/1776789193003.jpg").default, event: "HACKATHON INNOVERSE" },
  { photo: require("../images/1776789191858.jpg").default, event: "ENIGMA VERSE" },
  { photo: require("../images/1769462268158 (1).jpg").default, event: "TECH CONNECT" },
  { photo: require("../images/1769462269192.jpg").default, event: "TECH CONNECT" },
  { photo: require("../images/1769462268866.jpg").default, event: "TECH CONNECT" },
  { photo: require("../images/1769462268158.jpg").default, event: "TECH CONNECT" },
  { photo: require("../images/1769461821962.jpg").default, event: "TECH CONNECT" },
];

function Portfolio({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeMember = activeIndex === null ? null : members[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeIndex]);

  return (
    <main className="portfolio">
      <nav className="portfolio-nav"><Logo/><button onClick={onBack}>RETOUR AUX JEUX</button></nav>
      <section className="club-intro">
        <div className="club-copy">
          <div className="portfolio-kicker"><i/> CLUB D’INNOVATION · ENIAD</div>
          <h1>Les idées prennent vie <em>ensemble.</em></h1>
          <p>Innoverse est le club d’innovation de l’ENIAD. Une équipe étudiante aux talents complémentaires, réunie pour imaginer des projets et créer des expériences sur le campus.</p>
          <a className="linkedin-link" href="https://www.linkedin.com/company/innoverseeniad/posts/" target="_blank" rel="noreferrer">DÉCOUVRIR INNOVERSE SUR LINKEDIN <span>↗</span></a>
          <div className="club-count"><b>15</b><span>PORTRAITS<br/>DE L’ÉQUIPE</span></div>
        </div>
        <figure className="team-photo">
          <Image src={teamPhoto} alt="Photo de groupe de l’équipe Innoverse" width={800} height={800} priority sizes="(max-width: 760px) 100vw, 48vw" />
          <figcaption>INNOVERSE · ENIAD</figcaption>
        </figure>
      </section>
      <section className="team-section album-section">
        <div className="team-heading"><span>L’ÉQUIPE INNOVERSE</span><small>15 MEMBRES · 01 ALBUM</small></div>
        <div className="member-album">
          {members.map((member, index) => (
            <button className="album-item" key={member.name} onClick={() => setActiveIndex(index)} aria-label={`Agrandir la photo de ${member.name}`}>
              <span className="album-photo"><Image src={member.photo} alt={`Portrait de ${member.name}, ${member.role}`} width={800} height={1067} sizes="(max-width: 620px) 50vw, (max-width: 980px) 33vw, 25vw" /></span>
              <span className="album-caption"><b>{member.name}</b><small>{member.role}</small></span>
              <span className="album-zoom" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>
      <section className="events-section" aria-labelledby="events-title">
        <div className="events-heading">
          <div><span className="events-kicker">INNOVERSE · SUR LE TERRAIN</span><h2 id="events-title">Events</h2></div>
          <small>10 SOUVENIRS · OCT. 2025</small>
        </div>
        <section className="event-subsection" aria-labelledby="integration-title">
          <h3 id="integration-title">Journée d’intégration</h3>
        <div className="event-album" aria-label="Album horizontal de la journée d’intégration">
          {eventMemories.map((memory, index) => (
            <figure className={`event-memory ${memory.type}`} key={memory.type === "video" ? memory.src : memory.photo.src}>
              {memory.type === "video" ? (
                <video controls playsInline preload="metadata" poster={memory.poster} aria-label={`Vidéo souvenir ${index + 1} de la journée d’intégration`}>
                  <source src={memory.src} type="video/mp4" />
                </video>
              ) : (
                <Image src={memory.photo} alt={`Photo ${index + 1} de la journée d’intégration Innoverse`} width={memory.photo.width} height={memory.photo.height} sizes="(max-width: 620px) 75vw, 300px" />
              )}
              <figcaption><span>{memory.type === "video" ? "EN MOUVEMENT" : "JOURNÉE D’INTÉGRATION"}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
            </figure>
          ))}
        </div>
        </section>
        <section className="event-subsection workshop-subsection" aria-labelledby="workshops-title">
          <div className="workshop-intro">
            <span className="events-kicker">APPRENDRE · EXPÉRIMENTER · PARTAGER</span>
            <h3 id="workshops-title">Workshops</h3>
            <p>Nous avons organisé des ateliers pratiques autour de l’UI/UX, du design web, de la sécurité web, de l’Agile et de Git/GitHub pour apprendre ensemble en passant à l’action.</p>
          </div>
          <div className="event-album workshop-album" aria-label="Album horizontal des workshops Innoverse">
            {workshopMemories.map((memory, index) => (
              <figure className="event-memory workshop-memory" key={memory.photo.src ?? memory.photo}>
                <Image src={memory.photo} alt={`${memory.topic} : photo d’un workshop Innoverse`} width={memory.width ?? memory.photo.width} height={memory.height ?? memory.photo.height} sizes="(max-width: 620px) 76vw, 300px" />
                <figcaption><span>{memory.topic}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="event-subsection workshop-subsection hackathon-subsection" aria-labelledby="hackathons-title">
          <div className="workshop-intro">
            <span className="events-kicker">DÉFIS · IDÉES · ESPRIT D’ÉQUIPE</span>
            <h3 id="hackathons-title">Hackathons</h3>
          </div>
          <div className="event-album workshop-album" aria-label="Album horizontal des hackathons Innoverse">
            {hackathonMemories.map((memory, index) => (
              <figure className="event-memory workshop-memory" key={memory.photo.src}>
                <Image src={memory.photo} alt={`${memory.event} : photo d’un événement Innoverse`} width={memory.photo.width} height={memory.photo.height} sizes="(max-width: 620px) 76vw, 300px" />
                <figcaption><span>{memory.event}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
      <section className="join-us" aria-labelledby="join-us-title">
        <div>
          <span className="events-kicker">RESTONS CONNECTÉS</span>
          <h2 id="join-us-title">Join us<span>.</span></h2>
        </div>
        <nav aria-label="Réseaux sociaux Innoverse">
          <a href="https://www.instagram.com/innoverse.eniad?stkn=eXp2cGk2dTk2M3Fy" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/innoverse-eniad-club/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </nav>
      </section>
      <footer><span><i/> INNOVERSE TEAM</span><span>ENIAD</span></footer>
      {activeMember && (
        <div className="photo-viewer" role="dialog" aria-modal="true" aria-label={`Portrait de ${activeMember.name}`} onClick={() => setActiveIndex(null)}>
          <button className="viewer-close" onClick={() => setActiveIndex(null)} aria-label="Fermer">×</button>
          <button className="viewer-step viewer-prev" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + members.length - 1) % members.length); }} aria-label="Photo précédente">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={activeMember.photo} alt={`Portrait de ${activeMember.name}, ${activeMember.role}`} width={800} height={1067} sizes="90vw" />
            <figcaption><b>{activeMember.name}</b><span>{activeMember.role}</span></figcaption>
          </figure>
          <button className="viewer-step viewer-next" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % members.length); }} aria-label="Photo suivante">→</button>
        </div>
      )}
    </main>
  );
}

export default function Page() {
  const [game,setGame]=useState(null); const [won,setWon]=useState(false); const [portfolio,setPortfolio]=useState(false); const [audience,setAudience]=useState("discovery");
  if(portfolio) return <Portfolio onBack={()=>{setPortfolio(false);setWon(false);setGame(null)}}/>;
  if(won) return <Victory onEnter={()=>setPortfolio(true)}/>;
  return game ? <GameScreen gameId={game} onBack={()=>setGame(null)} onWin={()=>setWon(true)}/> : <Home onPlay={setGame} audience={audience} setAudience={setAudience}/>;
}

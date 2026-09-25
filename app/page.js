"use client";

import { useEffect, useMemo, useState } from "react";

const games = [
  { id: "bughunt", number: "01", title: "Bug Hunt", subtitle: "Repère l'erreur dans le code", icon: "grid", tone: "cyan" },
  { id: "binary", number: "02", title: "Binary Gate", subtitle: "Décode le signal binaire", icon: "xo", tone: "violet" },
  { id: "memory", number: "03", title: "Cache Match", subtitle: "Connecte les symboles du web", icon: "cards", tone: "blue" },
  { id: "flashcode", number: "04", title: "Access Key", subtitle: "Mémorise la clé système", icon: "pulse", tone: "coral" },
  { id: "console", number: "05", title: "Console", subtitle: "Prédit la sortie du programme", icon: "odd", tone: "lime" },
];

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

function Home({ onPlay }) {
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
        <div className="section-head"><span>CHOISIS TON DÉFI</span><i>1 victoire requise</i></div>
        <div className="challenge-route" aria-hidden="true"><span>START</span><i/><i/><i/><b>PORTFOLIO</b></div>
        <div className="game-list">
          {games.map((game, index) => (
            <button className={`game-card ${game.tone}`} key={game.id} onClick={() => onPlay(game.id)}>
              <span className="game-number">{game.number}</span>
              <Icon name={game.icon} />
              <span className="game-copy"><strong>{game.title}</strong><small>{game.subtitle}</small></span>
              <span className="arrow">↗</span>
              <span className="play-label">JOUER</span>
              {index === 0 && <span className="recommended">RECOMMANDÉ</span>}
            </button>
          ))}
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

function GameScreen({ gameId, onBack, onWin }) {
  const game=games.find(g=>g.id===gameId);
  return <main className="play-shell"><div className="orb orb-three"/><header><button className="back" onClick={onBack}>←</button><Logo compact/><span className="counter">{game.number}/05</span></header><section className="play-intro"><div className="eyebrow"><span/> MISSION EN COURS</div><h2>{game.title}</h2><p>{game.subtitle}</p></section><section className="game-zone">{gameId==="bughunt"&&<BugHunt onWin={onWin}/>} {gameId==="binary"&&<BinaryGate onWin={onWin}/>} {gameId==="memory"&&<Memory onWin={onWin}/>} {gameId==="flashcode"&&<FlashCode onWin={onWin}/>} {gameId==="console"&&<ConsoleGame onWin={onWin}/>}</section></main>;
}

function Victory({ onClose }) {
  return <div className="victory"><div className="victory-rays"/><div className="victory-mark">✓</div><div className="eyebrow"><span/> ACCÈS AUTORISÉ</div><h2>Bien joué,<br/><em>esprit brillant.</em></h2><p>Tu viens de débloquer l'accès<br/>à l'univers Innoverse.</p><button onClick={onClose}>ENTRER DANS LE PORTFOLIO <span>→</span></button><small>Le portfolio arrive dans la prochaine étape</small></div>;
}

export default function Page() {
  const [game,setGame]=useState(null); const [won,setWon]=useState(false);
  if(won) return <Victory onClose={()=>{setWon(false);setGame(null)}}/>;
  return game ? <GameScreen gameId={game} onBack={()=>setGame(null)} onWin={()=>setWon(true)}/> : <Home onPlay={setGame}/>;
}

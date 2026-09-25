"use client";

import { useEffect, useMemo, useState } from "react";

const games = [
  { id: "sudoku", number: "01", title: "Sudoku", subtitle: "Logique & précision", icon: "grid", tone: "cyan" },
  { id: "tictactoe", number: "02", title: "Morpion", subtitle: "Stratégie express", icon: "xo", tone: "violet" },
  { id: "memory", number: "03", title: "Mémoire", subtitle: "Focus & rapidité", icon: "cards", tone: "blue" },
];

const Icon = ({ name }) => {
  if (name === "grid") return <span className="grid-icon">{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>;
  if (name === "xo") return <span className="xo-icon"><b>×</b><i>○</i></span>;
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

const symbols = ["✦","◈","⌁","◎","✦","◈","⌁","◎"];
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

function GameScreen({ gameId, onBack, onWin }) {
  const game=games.find(g=>g.id===gameId);
  return <main className="play-shell"><div className="orb orb-three"/><header><button className="back" onClick={onBack}>←</button><Logo compact/><span className="counter">{game.number}/03</span></header><section className="play-intro"><div className="eyebrow"><span/> DÉFI EN COURS</div><h2>{game.title}</h2><p>{game.subtitle}</p></section><section className="game-zone">{gameId==="tictactoe"&&<TicTacToe onWin={onWin}/>} {gameId==="sudoku"&&<Sudoku onWin={onWin}/>} {gameId==="memory"&&<Memory onWin={onWin}/>}</section></main>;
}

function Victory({ onClose }) {
  return <div className="victory"><div className="victory-rays"/><div className="victory-mark">✓</div><div className="eyebrow"><span/> ACCÈS AUTORISÉ</div><h2>Bien joué,<br/><em>esprit brillant.</em></h2><p>Tu viens de débloquer l'accès<br/>à l'univers Innoverse.</p><button onClick={onClose}>ENTRER DANS LE PORTFOLIO <span>→</span></button><small>Le portfolio arrive dans la prochaine étape</small></div>;
}

export default function Page() {
  const [game,setGame]=useState(null); const [won,setWon]=useState(false);
  if(won) return <Victory onClose={()=>{setWon(false);setGame(null)}}/>;
  return game ? <GameScreen gameId={game} onBack={()=>setGame(null)} onWin={()=>setWon(true)}/> : <Home onPlay={setGame}/>;
}

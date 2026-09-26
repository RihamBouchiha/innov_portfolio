"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const messages = {
  fr: {
    chooseLanguage: "Choisis ta langue", languageHint: "Tu pourras changer de langue à tout moment.", french: "Français", english: "Anglais",
    navLabel: "Navigation principale", clubKicker: "CLUB D’INNOVATION · ENIAD", landingDescription: "Les idées prennent vie quand on les construit ensemble. Découvre une communauté qui imagine, apprend et crée autour de la technologie.", discoverClub: "DÉCOUVRIR LE CLUB", exploreGames: "EXPLORER LES JEUX", community: "COMMUNAUTÉ · CRÉATIVITÉ · TECHNOLOGIE", learnTogether: "APPRENDRE ENSEMBLE", createProjects: "CRÉER DES PROJETS", shareIdeas: "PARTAGER DES IDÉES", meetClub: "RENCONTRER LE CLUB", changeLanguage: "LANGUE",
    soundOff: "Désactiver le son", soundOn: "Activer le son", home: "ACCUEIL", portfolioAccess: "ACCÈS AU PORTFOLIO", homeTitle: "Débloque", homeTitleEm: "notre univers.", homeDescription: "Un esprit curieux mérite une entrée unique.", homeSubdescription: "Relève un défi pour accéder à notre monde.", directPortfolio: "ACCÉDER AU PORTFOLIO", playInvitation: "OU RELÈVE UN DÉFI POUR DÉCOUVRIR INNOVERSE", discovery: "Découverte", prepClass: "Classe prépa", engineer: "Ingénieur", engineeringCycle: "Cycle ingénieur", chooseGame: "CHOISIS TON JEU", swipeExplore: "Glisse pour explorer", start: "DÉPART", portfolio: "PORTFOLIO", play: "JOUER", recommended: "RECOMMANDÉ", systemReady: "SYSTÈME PRÊT", previousGame: "Jeu précédent", nextGame: "Jeu suivant",
    mission: "MISSION EN COURS", playAgain: "Recommencer", yourTurn: "À toi de jouer", youWon: "Tu as gagné !", tie: "Égalité — recommence", nearly: "Presque ! Essaie encore", align: "Aligne trois symboles", sudokuRules: "Chaque ligne contient 1, 2 et 3", pairs: "Connecte les paires", pairsFound: "retrouvées", rememberCode: "Mémorise ce code", rebuildCode: "Recompose le code", tryAgain: "Encore une fois !", digitsTwoSeconds: "4 chiffres, 2 secondes", findBug: "Quelle ligne contient le bug ?", file: "Fichier", convertDecimal: "Convertis en décimal", signal: "Signal", predictOutput: "Que va afficher le programme ?", command: "Commande", quickSearch: "Recherche rapide", complexity: "Complexité", suitableStructure: "Structure adaptée", sortedArray: "Tableau trié de 1 000 éléments", nestedLoops: "Deux boucles imbriquées de taille n", lifo: "Dernier élément entré, premier sorti", linearSearch: "Recherche linéaire", binarySearch: "Recherche binaire", fullScan: "Parcours complet", query: "Construis la requête", missionNumber: "Mission", showMembers: "Afficher tous les membres", filterScores: "Filtrer les scores supérieurs à 10", sortScores: "Trier les résultats du plus grand au plus petit", signalAnalysis: "Analyse le signal", inspectTag: "Inspecte la balise", compareStructure: "Compare la structure", checkIdentifier: "Vérifie l’identifiant", corruptedPacket: "Détecte le seul paquet de données corrompu", nodesConnected: "6 NODES CONNECTÉS", level: "NIVEAU",
    accessGranted: "ACCÈS AUTORISÉ", wellDone: "Bien joué,", brilliant: "esprit brillant.", unlockedPortfolio: "Tu viens de débloquer l'accès", innoverseWorld: "à l'univers Innoverse.", enterPortfolio: "ENTRER DANS LE PORTFOLIO", discoverTeam: "Découvre l'équipe derrière Innoverse",
    backToLanding: "RETOUR À L’ACCUEIL", clubIntroTitle: "Les idées prennent vie", together: "ensemble.", clubDescription: "Innoverse est le club d’innovation de l’ENIAD. Une équipe étudiante aux talents complémentaires, réunie pour imaginer des projets et créer des expériences sur le campus.", discoverOnLinkedIn: "DÉCOUVRIR INNOVERSE SUR LINKEDIN", portraits: "PORTRAITS", team: "DE L’ÉQUIPE", teamPhotoAlt: "Photo de groupe de l’équipe Innoverse", teamAlbum: "L’ÉQUIPE INNOVERSE", members: "MEMBRES", album: "ALBUM", enlargePhoto: "Agrandir la photo de", portraitOf: "Portrait de", close: "Fermer", previousPhoto: "Photo précédente", nextPhoto: "Photo suivante",
    events: "Events", memories: "SOUVENIRS", integrationDay: "Journée d’intégration", eventAlbum: "Album horizontal de la journée d’intégration", moving: "EN MOUVEMENT", integration: "JOURNÉE D’INTÉGRATION", eventPhotoAlt: "Photo de la journée d’intégration Innoverse", workshops: "Workshops", workshopKicker: "APPRENDRE · EXPÉRIMENTER · PARTAGER", workshopIntro: "Nous avons organisé des ateliers pratiques autour de l’UI/UX, du design web, de la sécurité web, de l’Agile et de Git/GitHub pour apprendre ensemble en passant à l’action.", workshopAlbum: "Album horizontal des workshops Innoverse", workshopPhotoAlt: "photo d’un workshop Innoverse", hackathons: "Hackathons", hackathonKicker: "DÉFIS · IDÉES · ESPRIT D’ÉQUIPE", hackathonAlbum: "Album horizontal des hackathons Innoverse", eventPhoto: "photo d’un événement Innoverse", stayConnected: "RESTONS CONNECTÉS", joinUs: "Join us", socialLinks: "Réseaux sociaux Innoverse", teamFooter: "INNOVERSE TEAM",
    previous: "Précédent", next: "Suivant", anomalyScanner: "DÉTECTEUR D’ANOMALIES", live: "EN DIRECT",
    gameTitles: { bughunt: "Bug Hunt", binary: "Binary Gate", algorithm: "Algo Flow", sql: "SQL Quest", console: "Console", tictactoe: "Morpion", memory: "Mémoire", flashcode: "Code secret", sudoku: "Mini Sudoku", oddone: "L’intrus" },
    gameSubtitles: { bughunt: "Repère l'erreur dans le code", binary: "Décode le signal binaire", algorithm: "Analyse la logique algorithmique", sql: "Interroge la base de données", console: "Prédit la sortie du programme", tictactoe: "Aligne trois symboles", memory: "Retrouve toutes les paires", flashcode: "Mémorise quatre chiffres", sudoku: "Complète avec 1, 2 et 3", oddone: "Trouve la forme différente" },
    roles: { "Team Leader": "Responsable d’équipe", "Vice Team Leader": "Adjoint à la direction", "Communication Responsable": "Responsable communication", "Secretary General": "Secrétaire général·e", "Event Manager": "Responsable événements", "Vice Event Manager": "Vice-responsable événements", "Human Resources": "Ressources humaines", "Sponsorship Responsable": "Responsable sponsoring", "Vice Sponsorship Responsable": "Vice-responsable sponsoring", "Project Manager": "Responsable projets", "Vice Project Manager": "Vice-responsable projets", "Treasurer": "Trésorier·ère", "Training Manager": "Responsable formation", "Media Manager & Graphic Designer": "Responsable média et graphisme", "Consultant": "Consultant·e" },
    topics: { "ATELIER INNOVERSE": "ATELIER INNOVERSE", "WEB SECURITY": "SÉCURITÉ WEB", "DESIGN WEB": "DESIGN WEB", "TRAVAIL EN ÉQUIPE": "TRAVAIL EN ÉQUIPE", "AGILITÉ & COLLABORATION": "AGILITÉ & COLLABORATION", "UI / UX DESIGN": "DESIGN UI / UX", "GIT & GITHUB": "GIT & GITHUB" },
    eventsLabels: { "ENIGMA VERSE": "ENIGMA VERSE", "HACKATHON INNOVERSE": "HACKATHON INNOVERSE", "TECH CONNECT": "TECH CONNECT" },
  },
  en: {
    chooseLanguage: "Choose your language", languageHint: "You can change your language at any time.", french: "French", english: "English",
    navLabel: "Main navigation", clubKicker: "INNOVATION CLUB · ENIAD", landingDescription: "Ideas come to life when we build them together. Meet a community that imagines, learns, and creates with technology.", discoverClub: "DISCOVER THE CLUB", exploreGames: "EXPLORE THE GAMES", community: "COMMUNITY · CREATIVITY · TECHNOLOGY", learnTogether: "LEARN TOGETHER", createProjects: "BUILD PROJECTS", shareIdeas: "SHARE IDEAS", meetClub: "MEET THE CLUB", changeLanguage: "LANGUAGE",
    soundOff: "Turn sound off", soundOn: "Turn sound on", home: "HOME", portfolioAccess: "PORTFOLIO ACCESS", homeTitle: "Unlock", homeTitleEm: "our universe.", homeDescription: "A curious mind deserves a unique entrance.", homeSubdescription: "Take a challenge to enter our world.", directPortfolio: "OPEN THE PORTFOLIO", playInvitation: "OR TAKE A CHALLENGE TO DISCOVER INNOVERSE", discovery: "Discovery", prepClass: "Preparatory class", engineer: "Engineering", engineeringCycle: "Engineering cycle", chooseGame: "CHOOSE YOUR GAME", swipeExplore: "Swipe to explore", start: "START", portfolio: "PORTFOLIO", play: "PLAY", recommended: "RECOMMENDED", systemReady: "SYSTEM READY", previousGame: "Previous game", nextGame: "Next game",
    mission: "MISSION IN PROGRESS", playAgain: "Play again", yourTurn: "Your turn", youWon: "You won!", tie: "It's a tie — try again", nearly: "Almost! Try again", align: "Get three in a row", sudokuRules: "Each row contains 1, 2, and 3", pairs: "Match the pairs", pairsFound: "matched", rememberCode: "Memorize this code", rebuildCode: "Rebuild the code", tryAgain: "Try again!", digitsTwoSeconds: "4 digits, 2 seconds", findBug: "Which line contains the bug?", file: "File", convertDecimal: "Convert to decimal", signal: "Signal", predictOutput: "What will the program output?", command: "Command", quickSearch: "Quick search", complexity: "Complexity", suitableStructure: "Suitable structure", sortedArray: "Sorted array of 1,000 elements", nestedLoops: "Two nested loops of size n", lifo: "Last in, first out", linearSearch: "Linear search", binarySearch: "Binary search", fullScan: "Full scan", query: "Build the query", missionNumber: "Mission", showMembers: "Show all members", filterScores: "Filter scores greater than 10", sortScores: "Sort results from highest to lowest", signalAnalysis: "Analyze the signal", inspectTag: "Inspect the tag", compareStructure: "Compare the structure", checkIdentifier: "Check the identifier", corruptedPacket: "Find the only corrupted data packet", nodesConnected: "6 NODES CONNECTED", level: "LEVEL",
    accessGranted: "ACCESS GRANTED", wellDone: "Well done,", brilliant: "brilliant mind.", unlockedPortfolio: "You have unlocked access", innoverseWorld: "to the Innoverse universe.", enterPortfolio: "ENTER THE PORTFOLIO", discoverTeam: "Meet the team behind Innoverse",
    backToLanding: "BACK TO HOME", clubIntroTitle: "Ideas come to life", together: "together.", clubDescription: "Innoverse is ENIAD’s innovation club. A student team with complementary talents, brought together to imagine projects and create experiences on campus.", discoverOnLinkedIn: "DISCOVER INNOVERSE ON LINKEDIN", portraits: "PORTRAITS", team: "OF THE TEAM", teamPhotoAlt: "Group photo of the Innoverse team", teamAlbum: "THE INNOVERSE TEAM", members: "MEMBERS", album: "ALBUM", enlargePhoto: "Enlarge photo of", portraitOf: "Portrait of", close: "Close", previousPhoto: "Previous photo", nextPhoto: "Next photo",
    events: "Events", memories: "MEMORIES", integrationDay: "Orientation day", eventAlbum: "Horizontal album of the orientation day", moving: "IN MOTION", integration: "ORIENTATION DAY", eventPhotoAlt: "Photo from the Innoverse orientation day", workshops: "Workshops", workshopKicker: "LEARN · EXPERIMENT · SHARE", workshopIntro: "We hosted hands-on workshops in UI/UX, web design, web security, Agile, and Git/GitHub, learning together by putting ideas into practice.", workshopAlbum: "Horizontal album of Innoverse workshops", workshopPhotoAlt: "photo from an Innoverse workshop", hackathons: "Hackathons", hackathonKicker: "CHALLENGES · IDEAS · TEAM SPIRIT", hackathonAlbum: "Horizontal album of Innoverse hackathons", eventPhoto: "photo from an Innoverse event", stayConnected: "STAY CONNECTED", joinUs: "Join us", socialLinks: "Innoverse social media", teamFooter: "INNOVERSE TEAM",
    previous: "Previous", next: "Next", anomalyScanner: "ANOMALY SCANNER", live: "LIVE",
    gameTitles: { bughunt: "Bug Hunt", binary: "Binary Gate", algorithm: "Algo Flow", sql: "SQL Quest", console: "Console", tictactoe: "Tic-Tac-Toe", memory: "Memory", flashcode: "Code Breaker", sudoku: "Mini Sudoku", oddone: "Odd One Out" },
    gameSubtitles: { bughunt: "Spot the bug in the code", binary: "Decode the binary signal", algorithm: "Analyze the algorithmic logic", sql: "Query the database", console: "Predict the program output", tictactoe: "Get three in a row", memory: "Find all matching pairs", flashcode: "Memorize four digits", sudoku: "Fill in 1, 2, and 3", oddone: "Find the different shape" },
    roles: { "Team Leader": "Team Leader", "Vice Team Leader": "Vice Team Leader", "Communication Responsable": "Communications Lead", "Secretary General": "Secretary General", "Event Manager": "Events Manager", "Vice Event Manager": "Deputy Events Manager", "Human Resources": "Human Resources", "Sponsorship Responsable": "Sponsorship Lead", "Vice Sponsorship Responsable": "Deputy Sponsorship Lead", "Project Manager": "Project Manager", "Vice Project Manager": "Deputy Project Manager", "Treasurer": "Treasurer", "Training Manager": "Training Manager", "Media Manager & Graphic Designer": "Media Manager & Graphic Designer", "Consultant": "Consultant" },
    topics: { "ATELIER INNOVERSE": "INNOVERSE WORKSHOP", "WEB SECURITY": "WEB SECURITY", "DESIGN WEB": "WEB DESIGN", "TRAVAIL EN ÉQUIPE": "TEAMWORK", "AGILITÉ & COLLABORATION": "AGILE & COLLABORATION", "UI / UX DESIGN": "UI / UX DESIGN", "GIT & GITHUB": "GIT & GITHUB" },
    eventsLabels: { "ENIGMA VERSE": "ENIGMA VERSE", "HACKATHON INNOVERSE": "INNOVERSE HACKATHON", "TECH CONNECT": "TECH CONNECT" },
  },
};

const textFor = (language) => messages[language] ?? messages.fr;

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

function LanguageSelect({ onSelect }) {
  return (
    <main className="language-screen">
      <div className="language-panel">
        <Logo />
        <span className="language-kicker">INNOVERSE · ENIAD</span>
        <h1>Choisis ta langue</h1>
        <p>Choose your language</p>
        <div className="language-options">
          <button onClick={() => onSelect("fr")}><span>FR</span><b>Français</b></button>
          <button onClick={() => onSelect("en")}><span>EN</span><b>English</b></button>
        </div>
      </div>
      <span className="language-foot">COMMUNITY · CREATIVITY · TECHNOLOGY</span>
    </main>
  );
}

function Home({ lang, onPlay, onEnterPortfolio, onBackLanding, onChangeLanguage, audience, setAudience, soundEnabled, setSoundEnabled }) {
  const t = textFor(lang);
  const carousel=useRef(null); const [slide,setSlide]=useState(0);
  const visibleGames=audience==="discovery"?beginnerGames:games;
  const go=(index)=>{const next=(index+visibleGames.length)%visibleGames.length;setSlide(next);const el=carousel.current;if(el)el.scrollTo({left:next*el.clientWidth,behavior:"smooth"})};
  useEffect(()=>{setSlide(0);carousel.current?.scrollTo({left:0})},[audience]);
  return (
    <main className="page-shell">
      <div className="orb orb-one" /><div className="orb orb-two" />
      <header><Logo /><div className="home-actions"><button className="language-switch" onClick={onChangeLanguage} aria-label={t.changeLanguage}>{lang.toUpperCase()}</button><button className="sound" onClick={() => setSoundEnabled(!soundEnabled)} aria-label={soundEnabled ? t.soundOff : t.soundOn} aria-pressed={soundEnabled}>{soundEnabled ? "⌁" : "×"}</button><button className="home-return" onClick={onBackLanding}>{t.home}</button></div></header>
      <section className="hero">
        <div className="eyebrow"><span /> {t.portfolioAccess}</div>
        <h1>{t.homeTitle}<br /><em>{t.homeTitleEm}</em></h1>
        <p>{t.homeDescription}<br />{t.homeSubdescription}</p>
        <button className="portfolio-entry" onClick={onEnterPortfolio}>{t.directPortfolio}</button>
        <div className="game-invitation">{t.playInvitation}</div>
      </section>
      <section className="game-section">
        <div className="level-switch" role="group" aria-label={t.chooseGame}><button className={audience==="discovery"?"active":""} onClick={()=>setAudience("discovery")}><b>{t.discovery}</b><small>{t.prepClass}</small></button><button className={audience==="engineer"?"active":""} onClick={()=>setAudience("engineer")}><b>{t.engineer}</b><small>{t.engineeringCycle}</small></button></div>
        <div className="section-head"><span>{t.chooseGame}</span><i>{t.swipeExplore}</i></div>
        <div className="challenge-route" aria-hidden="true"><span>{t.start}</span><i/><i/><i/><b>{t.portfolio}</b></div>
        <div className="arcade-console">
          <div className="console-top"><span><i/> INNOVERSE OS</span><b>{String(slide+1).padStart(2,"0")} / 05</b></div>
          <div className="game-list" ref={carousel} onScroll={e=>setSlide(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth))}>
            {visibleGames.map((game, index) => (
              <button className={`game-card ${game.tone}`} key={game.id} onClick={() => onPlay(game.id)}>
                <span className="game-number">{String(index+1).padStart(2,"0")}</span>
                <span className="icon-orbit"><Icon name={game.icon} /></span>
                <span className="game-copy"><strong>{t.gameTitles[game.id]}</strong><small>{t.gameSubtitles[game.id]}</small></span>
                <span className="game-start-label">{t.start}</span>
                <span className="play-label">{t.play}</span>
                {index === 0 && <span className="recommended">{t.recommended}</span>}
              </button>
            ))}
          </div>
          <div className="carousel-controls">{visibleGames.map((game,index)=><button onClick={()=>go(index)} aria-label={`${t.chooseGame} : ${t.gameTitles[game.id]}`} aria-pressed={index===slide} key={game.id}><i aria-hidden="true" className={index===slide?"active":""}/></button>)}</div>
          <div className="console-speaker" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        </div>
      </section>
      <footer><span><i /> {t.systemReady}</span><span>INNOVERSE © 2026</span></footer>
    </main>
  );
}

const emptyBoard = Array(9).fill(null);

function TicTacToe({ lang, onWin, onFail }) {
  const t = textFor(lang);
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState(t.yourTurn);
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winner = (b) => lines.some(([a,c,d]) => b[a] && b[a] === b[c] && b[a] === b[d]);
  const move = (i) => {
    if (board[i] || status === t.youWon) return;
    const next = [...board]; next[i] = "X";
    if (winner(next)) { setBoard(next); setStatus(t.youWon); setTimeout(onWin, 650); return; }
    const free = next.map((v, j) => v ? -1 : j).filter(j => j >= 0);
    if (!free.length) { setBoard(next); setStatus(t.tie); onFail(); return; }
    const winMove = free.find(j => { const test=[...next]; test[j]="O"; return winner(test); });
    const blockMove = free.find(j => { const test=[...next]; test[j]="X"; return winner(test); });
    const bot = winMove ?? blockMove ?? free[Math.floor(Math.random()*free.length)];
    next[bot] = "O"; setBoard(next);
    if (winner(next)) { setStatus(t.nearly); onFail(); }
  };
  const reset = () => { setBoard(emptyBoard); setStatus(t.yourTurn); };
  useEffect(() => { if (status === t.nearly || status === t.tie) setTimeout(reset, 900); }, [status, t.nearly, t.tie]);
  return <><div className="game-status"><b>{status}</b><span>{t.align}</span></div><div className="tic-board">{board.map((v,i)=><button onClick={()=>move(i)} key={i} className={`tic-cell ${v ? `marked ${v}` : ""}`} aria-label={v ? `${lang==="fr"?"Case":"Square"} ${v}` : lang==="fr"?"Jouer cette case":"Play this square"} disabled={Boolean(v)}><span className={v ? "tic-mark" : ""}>{v}</span></button>)}</div><button className="text-button" onClick={reset}>{t.playAgain}</button></>;
}

const sudokuStart = [1,0,3, 0,3,0, 0,0,2];
const sudokuSolution = [1,2,3, 2,3,1, 3,1,2];
function Sudoku({ lang, onWin, onFail }) {
  const t = textFor(lang);
  const [board, setBoard] = useState(sudokuStart);
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);
  const place = (n) => {
    if (selected === null || sudokuStart[selected]) return;
    if (sudokuSolution[selected] !== n) { setWrong(selected); onFail(); setTimeout(()=>setWrong(null), 400); return; }
    const next=[...board]; next[selected]=n; setBoard(next);
    if(next.every((v,i)=>v===sudokuSolution[i])) setTimeout(onWin, 500);
  };
  return <><div className="game-status"><b>{t.gameTitles.sudoku} 3×3</b><span>{t.sudokuRules}</span></div><div className="sudoku-board">{board.map((v,i)=><button key={i} className={`${selected===i?"selected":""} ${wrong===i?"wrong":""} ${sudokuStart[i]?"fixed":""}`} onClick={()=>setSelected(i)}>{v || ""}</button>)}</div><div className="number-pad">{[1,2,3].map(n=><button key={n} onClick={()=>place(n)}>{n}</button>)}</div></>;
}

const symbols = ["</>","{ }","01","#_","</>","{ }","01","#_"];
function Memory({ lang, onWin, onFail }) {
  const t = textFor(lang);
  const deck = useMemo(() => [...symbols].sort(()=>Math.random()-.5), []);
  const [open,setOpen]=useState([]); const [done,setDone]=useState([]);
  const flip=(i)=>{
    if(open.length===2 || open.includes(i) || done.includes(i)) return;
    const next=[...open,i]; setOpen(next);
    if(next.length===2) setTimeout(()=>{ if(deck[next[0]]===deck[next[1]]) { const matched=[...done,...next]; setDone(matched); if(matched.length===8)setTimeout(onWin,400); } else onFail(); setOpen([]); },550);
  };
  return <><div className="game-status"><b>{t.pairs}</b><span>{done.length/2} / 4 {t.pairsFound}</span></div><div className="memory-board">{deck.map((s,i)=><button key={i} onClick={()=>flip(i)} className={open.includes(i)||done.includes(i)?"flipped":""}><span>{s}</span></button>)}</div></>;
}

function FlashCode({ lang, onWin, onFail }) {
  const t = textFor(lang);
  const makeCode = () => Array.from({length:4},()=>Math.floor(Math.random()*9)+1);
  const [code,setCode]=useState(makeCode); const [visible,setVisible]=useState(true); const [answer,setAnswer]=useState([]); const [message,setMessage]=useState(t.rememberCode);
  useEffect(()=>{const timer=setTimeout(()=>{setVisible(false);setMessage(t.rebuildCode)},2200);return()=>clearTimeout(timer)},[code,lang]);
  const press=(n)=>{if(visible||answer.length===4)return;const next=[...answer,n];setAnswer(next);if(next.length===4){if(next.join("")===code.join(""))setTimeout(onWin,450);else {onFail();setTimeout(()=>{setCode(makeCode());setAnswer([]);setVisible(true);setMessage(t.tryAgain)},650)}}};
  return <><div className="game-status"><b>{message}</b><span>{t.digitsTwoSeconds}</span></div><div className={`flash-display ${visible?"visible":""}`}>{visible?code.map((n,i)=><span key={i}>{n}</span>):[0,1,2,3].map((_,i)=><span key={i}>{answer[i]??"·"}</span>)}</div><div className="flash-pad">{[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>press(n)}>{n}</button>)}</div></>;
}

const bugRounds=[
  {code:["const club = 'Innoverse';","console.log(club);","return true;"],bug:2},
  {code:["let score = 10;","score += 5;","console.log(scores);"],bug:2},
  {code:["if (ready) {","  launch();","// accolade manquante"],bug:2}
];
function BugHunt({lang,onWin,onFail}){const t=textFor(lang);const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=i=>{if(i!==bugRounds[round].bug){setMiss(i);onFail();setTimeout(()=>setMiss(null),400);return}if(round===2)setTimeout(onWin,400);else setRound(round+1)};const code=bugRounds[round].code.map(line=>line==="// accolade manquante"&&lang==="en"?"// missing closing brace":line);return <><div className="game-status"><b>{t.findBug}</b><span>{t.file} {round+1} / 3</span></div><div className="code-window"><div><i/><i/><i/><span>main.js</span></div>{code.map((line,i)=><button className={miss===i?"line-miss":""} onClick={()=>pick(i)} key={line}><b>{i+1}</b><code>{line}</code></button>)}</div></>}

function BinaryGate({lang,onWin,onFail}){const t=textFor(lang);const rounds=[{bits:"0101",value:5},{bits:"1001",value:9},{bits:"1110",value:14}];const[round,setRound]=useState(0);const[miss,setMiss]=useState(false);const choose=n=>{if(n!==rounds[round].value){setMiss(true);onFail();setTimeout(()=>setMiss(false),350);return}if(round===2)setTimeout(onWin,350);else setRound(round+1)};const answers=[rounds[round].value,rounds[round].value+2,Math.max(0,rounds[round].value-3)].sort((a,b)=>a-b);return <><div className="game-status"><b>{t.convertDecimal}</b><span>{t.signal} {round+1} / 3</span></div><div className={`binary-signal ${miss?"miss":""}`}>{rounds[round].bits.split("").map((b,i)=><span key={i}>{b}</span>)}</div><div className="binary-options">{answers.map(n=><button onClick={()=>choose(n)} key={n}>{n}</button>)}</div></>}

const consoleRounds=[
  {code:"console.log(2 + 3 * 2)",answers:[10,8,7],correct:8},
  {code:"'code'.length",answers:[3,4,5],correct:4},
  {code:"Boolean(0)",answers:["true","false","null"],correct:"false"}
];
function ConsoleGame({lang,onWin,onFail}){const t=textFor(lang);const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=a=>{if(a!==consoleRounds[round].correct){setMiss(a);onFail();setTimeout(()=>setMiss(null),350);return}if(round===2)setTimeout(onWin,350);else setRound(round+1)};return <><div className="game-status"><b>{t.predictOutput}</b><span>{t.command} {round+1} / 3</span></div><div className="console-box"><span>innoverse@lab:~$</span><code>{consoleRounds[round].code}</code><i>_</i></div><div className="console-options">{consoleRounds[round].answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}>{String(a)}</button>)}</div></>}

const algoRounds=[
  {title:"Recherche rapide",code:"Tableau trié de 1 000 éléments",answers:["Recherche linéaire","Recherche binaire","Parcours complet"],correct:"Recherche binaire"},
  {title:"Complexité",code:"Deux boucles imbriquées de taille n",answers:["O(n)","O(log n)","O(n²)"],correct:"O(n²)"},
  {title:"Structure adaptée",code:"Dernier élément entré, premier sorti",answers:["File","Pile","Arbre"],correct:"Pile"}
];
function AlgorithmGame({lang,onWin,onFail}){const t=textFor(lang);const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const pick=a=>{if(a!==rounds[round].correct){setMiss(a);onFail();setTimeout(()=>setMiss(null),400);return}if(round===rounds.length-1)setTimeout(onWin,400);else setRound(round+1)};const rounds=[{title:t.quickSearch,code:t.sortedArray,answers:[t.linearSearch,t.binarySearch,t.fullScan],correct:t.binarySearch},{title:t.complexity,code:t.nestedLoops,answers:["O(n)","O(log n)","O(n²)"],correct:"O(n²)"},{title:t.suitableStructure,code:t.lifo,answers:[lang==="fr"?"File":"Queue",lang==="fr"?"Pile":"Stack",lang==="fr"?"Arbre":"Tree"],correct:lang==="fr"?"Pile":"Stack"}];const q=rounds[round];return <><div className="game-status"><b>{q.title}</b><span>{lang==="fr"?"Analyse":"Analysis"} {round+1} / {rounds.length}</span></div><div className="tech-terminal"><span>ALGORITHM.INPUT</span><code>{q.code}</code><i>{lang==="fr"?"Choisis la solution optimale":"Choose the optimal solution"}</i></div><div className="tech-options">{q.answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}><small>{lang==="fr"?"OPTION":"OPTION"}</small><b>{a}</b></button>)}</div></>}

const sqlRounds=[
  {goal:"Afficher tous les membres",answers:["SELECT * FROM membres;","GET membres ALL;","SHOW * membres;"],correct:"SELECT * FROM membres;"},
  {goal:"Filtrer les scores supérieurs à 10",answers:["WHERE score > 10","FILTER score > 10","IF score > 10"],correct:"WHERE score > 10"},
  {goal:"Trier les résultats du plus grand au plus petit",answers:["ORDER BY score DESC","SORT score DOWN","GROUP BY score"],correct:"ORDER BY score DESC"}
];
function SQLGame({lang,onWin,onFail}){const t=textFor(lang);const[round,setRound]=useState(0);const[miss,setMiss]=useState(null);const table=lang==="fr"?"membres":"members";const rounds=[{goal:t.showMembers,answers:[`SELECT * FROM ${table};`,`GET ${table} ALL;`,`SHOW * ${table};`],correct:`SELECT * FROM ${table};`},{goal:t.filterScores,answers:["WHERE score > 10","FILTER score > 10","IF score > 10"],correct:"WHERE score > 10"},{goal:t.sortScores,answers:["ORDER BY score DESC","SORT score DOWN","GROUP BY score"],correct:"ORDER BY score DESC"}];const pick=a=>{if(a!==rounds[round].correct){setMiss(a);onFail();setTimeout(()=>setMiss(null),400);return}if(round===rounds.length-1)setTimeout(onWin,400);else setRound(round+1)};const q=rounds[round];return <><div className="game-status"><b>{t.query}</b><span>{t.missionNumber} {round+1} / {rounds.length}</span></div><div className="database-visual"><div className="db-disc"/><span>INNOVERSE_DB</span><b>{q.goal}</b></div><div className="tech-options sql-options">{q.answers.map(a=><button className={miss===a?"miss":""} onClick={()=>pick(a)} key={a}><small>QUERY</small><code>{a}</code></button>)}</div></>}

const advancedOdd=[
  {label:"Analyse le signal",top:"SIGNAL",normal:["1011","0110"],odd:["1011","0101"]},
  {label:"Inspecte la balise",top:"HTML",normal:["<section>","</section>"],odd:["<section>","<section/> "]},
  {label:"Compare la structure",top:"LOGIC",normal:["{ [ (", ") ] }"],odd:["{ [ )","( ] } "]},
  {label:"Vérifie l'identifiant",top:"HASH",normal:["#6A5F","E09C"],odd:["#6A5E","F09C"]}
];
function OddOne({lang,onWin,onFail}){const t=textFor(lang);const[round,setRound]=useState(0);const[pos,setPos]=useState(()=>Math.floor(Math.random()*6));const[miss,setMiss]=useState(null);const choose=i=>{if(i!==pos){setMiss(i);onFail();setTimeout(()=>setMiss(null),420);return}if(round===advancedOdd.length-1)setTimeout(onWin,450);else{setRound(round+1);setPos(Math.floor(Math.random()*6));setMiss(null)}};const labels=lang==="fr"?[t.signalAnalysis,t.inspectTag,t.compareStructure,t.checkIdentifier]:["Analyze the signal","Inspect the tag","Compare the structure","Check the identifier"];const data=advancedOdd[round];return <><div className="game-status adult-status"><b>{labels[round]}</b><span>{t.corruptedPacket}</span></div><div className="anomaly-console"><div className="scan-line"/><div className="anomaly-head"><span><i/> {t.anomalyScanner}</span><b>{t.live} · 0{round+1}</b></div><div className="focus-meter"><i style={{width:`${(round+1)/advancedOdd.length*100}%`}}/></div><div className="packet-grid">{Array.from({length:6}).map((_,i)=>{const value=i===pos?data.odd:data.normal;return <button className={miss===i?"wrong-pick":""} onClick={()=>choose(i)} key={i}><span className="packet-top"><small>0{i+1}</small><i>{data.top}</i></span><code><b>{value[0]}</b><b>{value[1]}</b></code><span className="packet-bars"><i/><i/><i/></span></button>})}</div><div className="scan-footer"><span>{t.nodesConnected}</span><span>{t.level} {round+1}/{advancedOdd.length}</span></div></div></>}

function GameScreen({ gameId, lang, onBack, onWin, soundEnabled }) {
  const t = textFor(lang);
  const audioContextRef = useRef(null);
  const game=allGames.find(g=>g.id===gameId);
  const getAudioContext = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContextRef.current) audioContextRef.current = new AudioContextClass();
    if (audioContextRef.current.state === "suspended") void audioContextRef.current.resume();
    return audioContextRef.current;
  };
  const playSound = (result) => {
    if (!soundEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    const notes = result === "win" ? [523.25, 659.25, 783.99, 1046.5] : [311.13, 233.08];
    const start = context.currentTime;
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      const noteStart = start + index * (result === "win" ? 0.105 : 0.14);
      const duration = result === "win" ? 0.3 : 0.38;
      oscillator.type = result === "win" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      volume.gain.setValueAtTime(0.0001, noteStart);
      volume.gain.exponentialRampToValueAtTime(result === "win" ? 0.48 : 0.42, noteStart + 0.025);
      volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + duration);
    });
  };
  const handleWin = () => { playSound("win"); onWin(); };
  const handleFail = () => playSound("fail");
  const unlockAudio = () => { if (soundEnabled) getAudioContext(); };
  return <main className="play-shell"><div className="orb orb-three"/><header><button className="back" onClick={onBack}>{t.backToLanding}</button><Logo compact/><span className="counter">{game.number}/05</span></header><section className="play-intro"><div className="eyebrow"><span/> {t.mission}</div><h2>{t.gameTitles[gameId]}</h2><p>{t.gameSubtitles[gameId]}</p></section><section className="game-zone" onPointerDownCapture={unlockAudio} onKeyDownCapture={unlockAudio}>{gameId==="bughunt"&&<BugHunt lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="binary"&&<BinaryGate lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="algorithm"&&<AlgorithmGame lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="sql"&&<SQLGame lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="console"&&<ConsoleGame lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="memory"&&<Memory lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="flashcode"&&<FlashCode lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="tictactoe"&&<TicTacToe lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="sudoku"&&<Sudoku lang={lang} onWin={handleWin} onFail={handleFail}/>} {gameId==="oddone"&&<OddOne lang={lang} onWin={handleWin} onFail={handleFail}/>}</section></main>;
}

function Victory({ lang, onEnter }) {
  const t = textFor(lang);
  return <div className="victory"><div className="victory-rays"/><div className="victory-mark">✓</div><div className="eyebrow"><span/> {t.accessGranted}</div><h2>{t.wellDone}<br/><em>{t.brilliant}</em></h2><p>{t.unlockedPortfolio}<br/>{t.innoverseWorld}</p><button onClick={onEnter}>{t.enterPortfolio}</button><small>{t.discoverTeam}</small></div>;
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
  { photo: "/workshops/atelier-innoverse.jpg", width: 1800, height: 1350, topic: "ATELIER INNOVERSE" },
  { photo: require("../images/1742991207384.jpg").default, topic: "ATELIER INNOVERSE" },
  { photo: "/workshops/web-security.jpg", width: 1800, height: 2400, topic: "WEB SECURITY" },
  { photo: require("../images/WhatsApp Image 2025-09-13 à 21.44.14_cb47e00f.jpg").default, topic: "DESIGN WEB" },
  { photo: require("../images/WhatsApp Image 2025-09-13 à 21.44.24_ce62310d.jpg").default, topic: "TRAVAIL EN ÉQUIPE" },
  { photo: require("../images/WhatsApp Image 2025-09-14 à 19.04.53_2ac08bb5.jpg").default, topic: "AGILITÉ & COLLABORATION" },
  { photo: "/workshops/ui-ux.webp", width: 1200, height: 900, topic: "UI / UX DESIGN" },
  { photo: "/workshops/git-github.webp", width: 1200, height: 900, topic: "GIT & GITHUB" },
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

function Landing({ lang, onEnterPortfolio, onExploreGames, onChangeLanguage }) {
  const t = textFor(lang);
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Logo />
        <nav aria-label={t.navLabel}>
          <a href="https://www.instagram.com/innoverse.eniad?stkn=eXp2cGk2dTk2M3Fy" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/innoverse-eniad-club/" target="_blank" rel="noreferrer">LinkedIn</a>
          <button className="landing-language" onClick={onChangeLanguage} aria-label={t.changeLanguage}>{lang.toUpperCase()}</button>
        </nav>
      </header>
      <section className="landing-hero">
        <Image className="landing-team-image" src={teamPhoto} alt={t.teamPhotoAlt} fill priority sizes="100vw" />
        <div className="landing-shade" />
        <div className="landing-content">
          <div className="landing-kicker"><i /> {t.clubKicker}</div>
          <h1>Innoverse</h1>
          <p>{t.landingDescription}</p>
          <div className="landing-actions">
            <button className="landing-primary" onClick={onEnterPortfolio}>{t.discoverClub}</button>
            <button className="landing-secondary" onClick={onExploreGames}>{t.exploreGames}</button>
          </div>
        </div>
        <div className="landing-photo-caption">INNOVERSE · ENIAD <span>{t.community}</span></div>
      </section>
      <section className="landing-signals" aria-label={t.navLabel}>
        <span><b>01</b> {t.learnTogether}</span>
        <span><b>02</b> {t.createProjects}</span>
        <span><b>03</b> {t.shareIdeas}</span>
        <button onClick={onEnterPortfolio}>{t.meetClub}</button>
      </section>
    </main>
  );
}

function Portfolio({ lang, onBack, onChangeLanguage }) {
  const t = textFor(lang);
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
      <nav className="portfolio-nav"><Logo/><div className="portfolio-nav-actions"><button className="language-switch" onClick={onChangeLanguage} aria-label={t.changeLanguage}>{lang.toUpperCase()}</button><button className="portfolio-home" onClick={onBack}>{t.backToLanding}</button></div></nav>
      <section className="club-intro">
        <div className="club-copy">
          <div className="portfolio-kicker"><i/> {t.clubKicker}</div>
          <h1>{t.clubIntroTitle} <em>{t.together}</em></h1>
          <p>{t.clubDescription}</p>
          <a className="linkedin-link" href="https://www.linkedin.com/company/innoverseeniad/posts/" target="_blank" rel="noreferrer">{t.discoverOnLinkedIn}</a>
          <div className="club-count"><b>15</b><span>{t.portraits}<br/>{t.team}</span></div>
        </div>
        <figure className="team-photo">
          <Image src={teamPhoto} alt={t.teamPhotoAlt} width={800} height={800} priority sizes="(max-width: 760px) 100vw, 48vw" />
          <figcaption>INNOVERSE · ENIAD</figcaption>
        </figure>
      </section>
      <section className="team-section album-section">
        <div className="team-heading"><span>{t.teamAlbum}</span><small>15 {t.members} · 01 {t.album}</small></div>
        <div className="member-album">
          {members.map((member, index) => (
            <button className="album-item" key={member.name} onClick={() => setActiveIndex(index)} aria-label={`${t.enlargePhoto} ${member.name}`}>
              <span className="album-photo"><Image src={member.photo} alt={`${t.portraitOf} ${member.name}, ${t.roles[member.role] ?? member.role}`} width={800} height={1067} sizes="(max-width: 620px) 50vw, (max-width: 980px) 33vw, 25vw" /></span>
              <span className="album-caption"><b>{member.name}</b><small>{t.roles[member.role] ?? member.role}</small></span>
            </button>
          ))}
        </div>
      </section>
      <section className="events-section" aria-labelledby="events-title">
        <div className="events-heading">
          <div><span className="events-kicker">INNOVERSE · {lang === "fr" ? "SUR LE TERRAIN" : "IN ACTION"}</span><h2 id="events-title">{t.events}</h2></div>
          <small>10 {t.memories} · OCT. 2025</small>
        </div>
        <section className="event-subsection" aria-labelledby="integration-title">
          <h3 id="integration-title">{t.integrationDay}</h3>
        <div className="event-album" aria-label={t.eventAlbum}>
          {eventMemories.map((memory, index) => (
            <figure className={`event-memory ${memory.type}`} key={memory.type === "video" ? memory.src : memory.photo.src}>
              {memory.type === "video" ? (
                <video controls playsInline preload="metadata" poster={memory.poster} aria-label={`${t.moving} ${index + 1}`}>
                  <source src={memory.src} type="video/mp4" />
                </video>
              ) : (
                <Image src={memory.photo} alt={`${t.eventPhoto} ${index + 1}`} width={memory.photo.width} height={memory.photo.height} sizes="(max-width: 620px) 75vw, 300px" />
              )}
              <figcaption><span>{memory.type === "video" ? t.moving : t.integration}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
            </figure>
          ))}
        </div>
        </section>
        <section className="event-subsection workshop-subsection" aria-labelledby="workshops-title">
          <div className="workshop-intro">
            <span className="events-kicker">{t.workshopKicker}</span>
            <h3 id="workshops-title">{t.workshops}</h3>
            <p>{t.workshopIntro}</p>
          </div>
          <div className="event-album workshop-album" aria-label={t.workshopAlbum}>
            {workshopMemories.map((memory, index) => (
              <figure className="event-memory workshop-memory" key={memory.photo.src ?? memory.photo}>
                <Image src={memory.photo} alt={`${t.topics[memory.topic] ?? memory.topic}: ${t.workshopPhotoAlt}`} width={memory.width ?? memory.photo.width} height={memory.height ?? memory.photo.height} sizes="(max-width: 620px) 76vw, 300px" />
                <figcaption><span>{t.topics[memory.topic] ?? memory.topic}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="event-subsection workshop-subsection hackathon-subsection" aria-labelledby="hackathons-title">
          <div className="workshop-intro">
            <span className="events-kicker">{t.hackathonKicker}</span>
            <h3 id="hackathons-title">{t.hackathons}</h3>
          </div>
          <div className="event-album workshop-album" aria-label={t.hackathonAlbum}>
            {hackathonMemories.map((memory, index) => (
              <figure className="event-memory workshop-memory" key={memory.photo.src}>
                <Image src={memory.photo} alt={`${t.eventsLabels[memory.event] ?? memory.event}: ${t.eventPhoto}`} width={memory.photo.width} height={memory.photo.height} sizes="(max-width: 620px) 76vw, 300px" />
                <figcaption><span>{t.eventsLabels[memory.event] ?? memory.event}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
      <section className="join-us" aria-labelledby="join-us-title">
        <div>
          <span className="events-kicker">{t.stayConnected}</span>
          <h2 id="join-us-title">{t.joinUs}<span>.</span></h2>
        </div>
        <nav aria-label={t.socialLinks}>
          <a href="https://www.instagram.com/innoverse.eniad?stkn=eXp2cGk2dTk2M3Fy" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/innoverse-eniad-club/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </section>
      <footer><span><i/> {t.teamFooter}</span><span>ENIAD</span></footer>
      {activeMember && (
        <div className="photo-viewer" role="dialog" aria-modal="true" aria-label={`${t.portraitOf} ${activeMember.name}`} onClick={() => setActiveIndex(null)}>
          <button className="viewer-close" onClick={() => setActiveIndex(null)} aria-label={t.close}>×</button>
          <button className="viewer-step viewer-prev" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + members.length - 1) % members.length); }} aria-label={t.previousPhoto}>{t.previous}</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={activeMember.photo} alt={`${t.portraitOf} ${activeMember.name}, ${t.roles[activeMember.role] ?? activeMember.role}`} width={800} height={1067} sizes="90vw" />
            <figcaption><b>{activeMember.name}</b><span>{t.roles[activeMember.role] ?? activeMember.role}</span></figcaption>
          </figure>
          <button className="viewer-step viewer-next" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % members.length); }} aria-label={t.nextPhoto}>{t.next}</button>
        </div>
      )}
    </main>
  );
}

export default function Page() {
  const [language,setLanguage]=useState(null); const [game,setGame]=useState(null); const [won,setWon]=useState(false); const [portfolio,setPortfolio]=useState(false); const [showGames,setShowGames]=useState(false); const [audience,setAudience]=useState("discovery"); const [soundEnabled,setSoundEnabled]=useState(true);
  useEffect(()=>{const saved=window.localStorage.getItem("innoverse-language");if(saved==="fr"||saved==="en")setLanguage(saved)},[]);
  useEffect(()=>{
    window.history.replaceState({...window.history.state,innoverse:true,view:"home"},"",window.location.href);
    const returnToHome=()=>{
      setGame(null);setWon(false);setPortfolio(false);setShowGames(false);
      window.history.replaceState({...window.history.state,innoverse:true,view:"home"},"",window.location.href);
    };
    window.addEventListener("popstate",returnToHome);
    return()=>window.removeEventListener("popstate",returnToHome);
  },[]);
  useEffect(()=>{if(language)document.documentElement.lang=language},[language]);
  const selectLanguage=(nextLanguage)=>{window.localStorage.setItem("innoverse-language",nextLanguage);setLanguage(nextLanguage)};
  const goHome=()=>{setGame(null);setWon(false);setPortfolio(false);setShowGames(false);window.history.replaceState({...window.history.state,innoverse:true,view:"home"},"",window.location.href)};
  const navigate=(view,update)=>{window.history.pushState({...window.history.state,innoverse:true,view},"",window.location.href);update()};
  if(!language) return <LanguageSelect onSelect={selectLanguage}/>;
  if(portfolio) return <Portfolio lang={language} onChangeLanguage={()=>setLanguage(null)} onBack={goHome}/>;
  if(won) return <Victory lang={language} onEnter={()=>navigate("portfolio",()=>setPortfolio(true))}/>;
  if(game) return <GameScreen gameId={game} lang={language} onBack={goHome} onWin={()=>navigate("victory",()=>setWon(true))} soundEnabled={soundEnabled}/>;
  if(showGames) return <Home lang={language} onPlay={(gameId)=>navigate("game",()=>setGame(gameId))} onEnterPortfolio={()=>navigate("portfolio",()=>setPortfolio(true))} onBackLanding={goHome} onChangeLanguage={()=>setLanguage(null)} audience={audience} setAudience={setAudience} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}/>;
  return <Landing lang={language} onChangeLanguage={()=>setLanguage(null)} onEnterPortfolio={()=>navigate("portfolio",()=>setPortfolio(true))} onExploreGames={()=>navigate("games",()=>setShowGames(true))}/>;
}

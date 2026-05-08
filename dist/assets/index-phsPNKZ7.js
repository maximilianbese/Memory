var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e((()=>{})),r,i=e((()=>{r={code:{name:`Code Vibes`,color:`#4ecdc4`,backIcon:`bi-display-code`,backLogo:`/card-back-logo.svg`,previewImage:`/coding-vibes-settings-preview.svg`,images:[`/git-card.svg`,`/typeScript-card.svg`,`/javascript-card.svg`,`/html-card.svg`,`/vsCode-card.svg`,`/css-card.svg`,`/django-card.svg`,`/angular-card.svg`,`/terminal-card.svg`,`/python-card.svg`,`/github-card.svg`,`/node.js-card.svg`,`/bootstrap-card.svg`,`/vue.js-card.svg`,`/react-card.svg`,`/sass-card.svg`,`/sql-card.svg`,`/firebase-card.svg`]},gaming:{name:`Gaming`,color:`#e91e8c`,backIcon:``,backLogo:`/logos/gaming-logo.png`,previewImage:`/gaming-theme-settings-preview.svg`,images:[`/circle-mask-card.svg`,`/square-mask-card.svg`,`/triangle-mask-card.svg`,`/maze-card.svg`,`/creeper-card.svg`,`/super-mushroom-card.svg`,`/dice-card.svg`,`/banana-card.svg`,`/controller-card.svg`,`/pac-man-ghost-card.svg`,`/coin-card.svg`,`/snake-card.svg`,`/level-up-card.svg`,`/pac-man-card.svg`,`/console-card.svg`,`/puzzle-card.svg`,`/playing-card.svg`,`/play-button-card.svg`]},da:{name:`DA Projects`,color:`#4a8db5`,backIcon:`bi-kanban`,backLogo:`/card-back-logo.svg`,previewImage:`/da-projects-settings-preview.svg`,images:[`/noodle-bowl-card.svg`,`/hot-soup-card.svg`,`/boiled-egg-card.svg`,`/cherry-blossom-card.svg`,`/join-card.svg`,`/chef-hat-card.svg`,`/linked-square-card.svg`,`/shopping-basket-card.svg`,`/poké-ball-card.svg`,`/tic-tac-toe-card.svg`,`/exploding-emoji-card.svg`,`/arrow-card.svg`,`/da-bubble-card.svg`,`/pollo-loco-card.svg`,`/tree-canopy-card.svg`,`/user-profile-card.svg`,`/sharky-card.svg`,`/curreny-exchange-card.svg`]},food:{name:`Foods`,color:`#f5832a`,backIcon:`bi-egg-fried`,backLogo:`/card-back-logo.svg`,previewImage:`/foods-theme-settings-preview.svg`,images:[`/french-fries-card.svg`,`/pizza-slice-card.svg`,`/sandwich-card.svg`,`/donut-card.svg`,`/sushi-roll-card.svg`,`/corn-dog-card.svg`,`/hamburger-card.svg`,`/pretzel-card.svg`,`/cupcake-card.svg`,`/chocolate-cake-card.svg`,`/pudding-card.svg`,`/chocolate-bar-card.svg`,`/fried-chicken-card.svg`,`/burrito-card.svg`,`/taco-card.svg`,`/ice-cream-card.svg`,`/salad-bowl-card.svg`,`/macarons-card.svg`]}}}));function a(e,t){return[{id:e*2,pairId:e,image:t,isFlipped:!1,isMatched:!1},{id:e*2+1,pairId:e,image:t,isFlipped:!1,isMatched:!1}]}function o(e){let t=r[e.theme],n=e.boardSize/2,i=t.images?.slice(0,n),o=[];return Array.from({length:n}).forEach((e,t)=>{o.push(...a(t,i?.[t]))}),s(o)}function s(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var c=e((()=>{i()})),l,u,d,f,p,m=e((()=>{l={code:`Code vibes theme`,gaming:`Gaming theme`,da:`DA Projects theme`,food:`Foods theme`},u={code:`'Red Rose', sans-serif`,gaming:`'Orbitron', sans-serif`,da:`'Figtree', sans-serif`,food:`'Klee One', cursive`},d={code:`/cvt-draw.svg`,gaming:`/gaming-draw.svg`,da:`/da-projects-draw.svg`,food:`/food-draw.svg`},f=[`#e74c3c`,`#f1c40f`,`#2ecc71`,`#3498db`,`#9b59b6`,`#e67e22`],p=[[`code`,`Code vibes theme`],[`gaming`,`Gaming theme`],[`da`,`DA Projects theme`],[`food`,`Foods theme`]]}));function h(){return`<button class="play-btn" id="btn-play">
          <img src="/little-controller.svg" alt="Play">
          <span>Play</span><span>→</span>
        </button>`}function g(){return`
    <div class="start-screen screen active">
      <span class="start-bg-icon"><img src="/big-controller.svg" alt="Play"></span>
      <div class="start-content">
        <p class="start-subtitle">It's play time.</p>
        <h1>Ready to play?</h1>
        ${h()}
      </div>
    </div>
  `}function ee(){return p.map(([e,t],n)=>`
    <label class="radio-option" data-theme-hover="${e}">
      <input type="radio" name="theme" value="${e}" ${n===0?`checked`:``}>
      ${t}
    </label>
  `).join(``)}function _(){return`<div class="settings-section">
      <div class="section-label"><img src="/palette.svg"> Game themes</div>
      <div class="radio-group" id="theme-group">${ee()}</div>
    </div>`}function v(){return`<div class="settings-section">
      <div class="section-label"><img src="/chess_pawn.svg"> Choose player</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="player" value="blue"> Blue</label>
        <label class="radio-option"><input type="radio" name="player" value="orange"> Orange</label>
      </div>
    </div>`}function y(){return`<div class="settings-section">
      <div class="section-label"><img src="/board-size.svg"> Board size</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="boardSize" value="16"> 16 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="24"> 24 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="36"> 36 cards</label>
      </div>
    </div>`}function b(){return`
    ${_()}
    ${v()}
    ${y()}
  `}function x(){return`
    <div class="settings-left">
      <h2 class="settings-title">Settings</h2>
      ${b()}
    </div>
  `}function S(){return`
    <div class="start-bar">
      <span class="bar-info" id="bar-theme">Code vibes theme</span>
      <span class="bar-info" id="bar-player">Select player</span>
      <span class="bar-info" id="bar-size">Select size</span>
      <button class="start-game-btn" id="btn-start" disabled title="Please select player and board size">
        <i class="bi bi-play-fill"></i> Start
      </button>
    </div>
  `}function C(e){return Array(8).fill(0).map(()=>`
    <div class="preview-card" style="background:${e.color}">
      ${e.backLogo?`<img src="${e.backLogo}" class="preview-logo" alt="logo">`:`<i class="bi ${e.backIcon}" style="color:rgba(255,255,255,0.35);font-size:0.7rem;"></i>`}
    </div>
  `).join(``)}function te(e){let t=r[e];return t?`
    <div class="theme-special-preview-container">
      ${t.previewImage?`<img src="${t.previewImage}" class="theme-special-img" alt="${t.name} Preview">`:`<div class="theme-special-placeholder" style="background-color:${t.color}"><i class="bi ${t.backIcon}"></i></div>`}
      <div class="theme-special-label">${t.name}</div>
    </div>
    <div class="preview-cards">${C(t)}</div>
  `:``}function w(){return`
    <div class="settings-right">
      <div class="theme-preview" id="theme-preview">
        ${te(`code`)}
      </div>
      ${S()}
    </div>
  `}function T(){return`
    <div class="settings-screen screen active">
      <div class="settings-container">
        ${x()}
        ${w()}
      </div>
    </div>
  `}function E(e,t){let n=r[t],i=`<i class="bi ${n.backIcon}" style="display:none"></i>`,a=n.backLogo?`<img src="${n.backLogo}" class="card-back-logo" alt="logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"> ${i}`:`<i class="bi ${n.backIcon}"></i>`;return`<div class="card-back ${e}" style="background:${n.color}">${a}</div>`}function D(e,t,n){let i=r[t],a=n?`<img src="${n}" class="card-front-img" alt="card" onerror="this.style.display='none'">`:``;return`<div class="card-front ${e}" style="background:${i.color}">${a}</div>`}function O(e,t,n){return`
    <div class="score-chip ${n===e?`active-${e}`:``}">
      <span class="dot ${e}"></span> ${e.charAt(0).toUpperCase()+e.slice(1)} ${t}
    </div>
  `}function k(e){return`
    <header class="game-header">
      <div class="scores">
        ${O(`blue`,e.scores.blue,e.currentPlayer)}
        ${O(`orange`,e.scores.orange,e.currentPlayer)}
      </div>
      <div class="current-player">
        Current player: <span class="player-dot ${e.currentPlayer}"></span>
      </div>
      <button class="exit-btn" id="btn-exit"><i class="bi bi-box-arrow-right"></i> Exit game</button>
    </header>
  `}function A(e){return`
    <div class="quit-overlay" id="quit-overlay" style="display:none;">
      <div class="quit-popup theme-${e}" id="quit-popup">
        <p class="quit-question">Are you sure you want to quit the game?</p>
        <div class="quit-buttons">
          <button class="quit-btn quit-btn--back" id="btn-quit-back">Back to game</button>
          <button class="quit-btn quit-btn--exit" id="btn-quit-exit">Exit game</button>
        </div>
      </div>
    </div>
  `}function j(e,t,n){return`
    <div class="memory-card ${t} ${e.isFlipped?`flipped`:``} ${e.isMatched?`matched`:``}" data-id="${e.id}">
      <div class="card-inner">
        ${E(t,n)}
        ${D(t,n,e.image)}
      </div>
    </div>
  `}function M(e){let t=`size-${e.settings.boardSize}`,n=e.cards.map(n=>j(n,t,e.settings.theme)).join(``);return`
    <div class="game-screen screen active">
      ${k(e)}
      ${A(e.settings.theme)}
      <div class="board-wrapper">
        <div class="board ${t}" id="board">${n}</div>
      </div>
    </div>
  `}var N=e((()=>{i(),m()}));function P(e){return`
    <div class="gameover-screen screen active">
      <h1 class="gameover-title">Game over</h1>
      <p class="final-score-label">Final score</p>
      <div class="final-scores">
        <div class="score-chip"><span class="dot blue"></span><span class="label-blue">Blue ${e.scores.blue}</span></div>
        <div class="score-chip"><span class="dot orange"></span><span class="label-orange">Orange ${e.scores.orange}</span></div>
      </div>
    </div>
  `}function F(e){return`
    <div class="draw-screen screen active">
      <p class="draw-label">It's a</p>
      <h1 class="draw-title">DRAW</h1>
      <div class="draw-icon">
        <img src="${d[e.settings.theme]}" alt="Draw" class="draw-img">
      </div>
      <button class="back-btn" id="btn-back">Back to start</button>
    </div>
  `}function I(){return Array(30).fill(0).map((e,t)=>`<div class="confetti-piece" style="left:${Math.random()*100}%;background:${f[t%f.length]};--dur:${1.5+Math.random()}s;--delay:${Math.random()*.8}s;--rot:${Math.random()*360}deg;width:${6+Math.random()*8}px;height:${8+Math.random()*12}px"></div>`).join(``)}function L(e,t){return`
    <div class="winner-screen screen active">
      <div class="confetti-area">${I()}</div>
      <p class="winner-label">The winner is</p>
      <h1 class="winner-name ${e}">${e.toUpperCase()} PLAYER</h1>
      <div class="winner-icon"><i class="bi bi-person-fill ${e}"></i></div>
      <button class="back-btn" id="btn-back">Back to start</button>
    </div>
  `}function R(e,t,n,r){e.innerHTML=`<span class="dot ${t}"></span> ${t.charAt(0).toUpperCase()+t.slice(1)} ${n}`,e.className=`score-chip ${r===t?`active-${t}`:``}`}function z(e){let t=document.querySelector(`.scores`);if(!t)return;let[n,r]=[t.children[0],t.children[1]];n&&R(n,`blue`,e.scores.blue,e.currentPlayer),r&&R(r,`orange`,e.scores.orange,e.currentPlayer);let i=document.querySelector(`.current-player .player-dot`);i&&(i.className=`player-dot ${e.currentPlayer}`)}var B=e((()=>{m()}));function V(e,t,n){e.style.transition=`opacity 0.15s ease`,e.style.opacity=`0`,setTimeout(()=>{e.src=t,e.alt=n,e.style.opacity=`1`},150)}function H(e){let t=document.getElementById(`theme-preview`);if(!t)return;let n=r[e];if(!n)return;let i=t.querySelector(`.theme-special-img`),a=t.querySelector(`.theme-special-label`);i&&n.previewImage&&V(i,n.previewImage,`${n.name} Preview`),a&&(a.textContent=n.name),t.querySelectorAll(`.preview-card`).forEach(e=>{e.style.background=n.color})}function U(e){return document.querySelector(`input[name="${e}"]:checked`)?.value??null}function W(){let e=U(`theme`),t=U(`player`),n=U(`boardSize`),r=document.getElementById(`bar-theme`),i=document.getElementById(`bar-player`),a=document.getElementById(`bar-size`);r&&(r.textContent=e?l[e]??e:`Select a theme`),i&&(i.textContent=t?t.charAt(0).toUpperCase()+t.slice(1):`Select player`),a&&(a.textContent=n?`${n} cards`:`Select size`)}function G(){let e=U(`theme`),t=U(`player`),n=U(`boardSize`),r=document.getElementById(`btn-start`);if(r){let i=!!(e&&t&&n);if(r.disabled=!i,i)r.title=`Start game`;else{let e=[];t||e.push(`player`),n||e.push(`board size`),r.title=`Please select: ${e.join(` & `)}`}}}function K(){return{theme:U(`theme`)||`code`,player:U(`player`)||`blue`,boardSize:Number(U(`boardSize`)||`16`)}}function q(){document.querySelectorAll(`input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target;t.name===`theme`&&H(t.value),W(),G()})}),document.querySelectorAll(`[data-theme-hover]`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.getAttribute(`data-theme-hover`);t&&H(t)}),e.addEventListener(`mouseleave`,()=>{let e=U(`theme`);e&&H(e)})})}function J(e){q(),G(),W(),document.getElementById(`btn-start`)?.addEventListener(`click`,()=>{e(K())})}function Y(e){document.body.style.fontFamily=u[e]??`'Nunito', sans-serif`,document.body.classList.remove(`theme-code`,`theme-gaming`,`theme-da`,`theme-food`),document.body.classList.add(`theme-${e}`)}var X=e((()=>{m(),i()}));function Z(e,t){return e.cards.find(e=>e.id===t)}function Q(e,t){let n=document.querySelector(`.memory-card[data-id="${e}"]`);t?n?.classList.add(`flipped`):n?.classList.remove(`flipped`)}function $(e){document.querySelector(`.memory-card[data-id="${e}"]`)?.classList.add(`matched`)}function ne(e,t,n,r){let i=Z(e,t),a=Z(e,n);i.isMatched=!0,a.isMatched=!0,$(t),$(n),e.scores[e.currentPlayer]++,e.flippedCards=[],e.isLocked=!1,z(e),e.cards.every(e=>e.isMatched)&&setTimeout(r,600)}function re(e,t,n,r){setTimeout(()=>ne(e,t,n,r),500)}function ie(e,t,n){setTimeout(()=>{let r=Z(e,t),i=Z(e,n);r.isFlipped=!1,i.isFlipped=!1,Q(t,!1),Q(n,!1),e.flippedCards=[],e.isLocked=!1,e.currentPlayer=e.currentPlayer===`blue`?`orange`:`blue`,z(e)},900)}function ae(e,t){let[n,r]=e.flippedCards,i=Z(e,n),a=Z(e,r);i.pairId===a.pairId?re(e,n,r,t):ie(e,n,r)}function oe(e,t){let n=Z(e,t);return!e.isLocked&&!!n&&!n.isFlipped&&!n.isMatched&&!e.flippedCards.includes(t)}function se(e,t,n){if(!oe(e,t))return;let r=Z(e,t);Q(t,!0),r.isFlipped=!0,e.flippedCards.push(t),e.flippedCards.length===2&&(e.isLocked=!0,ae(e,n))}var ce=e((()=>{B()}));t((()=>{n(),c(),N(),B(),X(),ce();var e=document.getElementById(`app`),t={settings:{theme:`code`,player:`blue`,boardSize:16},cards:[],scores:{blue:0,orange:0},currentPlayer:`blue`,flippedCards:[],isLocked:!1};function r(){document.body.style.fontFamily=`'Nunito', sans-serif`,e.innerHTML=g(),document.getElementById(`btn-play`)?.addEventListener(`click`,i)}function i(){e.innerHTML=T(),J(a)}function a(e){t={settings:e,cards:o(e),scores:{blue:0,orange:0},currentPlayer:e.player,flippedCards:[],isLocked:!1},Y(e.theme),s()}function s(){e.innerHTML=M(t),d(),u()}function l(e){document.getElementById(`btn-quit-back`)?.addEventListener(`click`,()=>{e&&(e.style.display=`none`)}),e?.addEventListener(`click`,t=>{t.target===e&&(e.style.display=`none`)}),document.getElementById(`btn-quit-exit`)?.addEventListener(`click`,r)}function u(){let e=document.getElementById(`quit-overlay`);document.getElementById(`btn-exit`)?.addEventListener(`click`,()=>{e&&(e.style.display=`flex`)}),l(e)}function d(){document.querySelectorAll(`.memory-card`).forEach(e=>{e.addEventListener(`click`,()=>{se(t,Number(e.dataset.id),f)})})}function f(){e.innerHTML=P(t),setTimeout(()=>p(),2200)}function p(){t.scores.blue===t.scores.orange?e.innerHTML=F(t):e.innerHTML=L(t.scores.blue>t.scores.orange?`blue`:`orange`,t),document.getElementById(`btn-back`)?.addEventListener(`click`,r)}r()}))();
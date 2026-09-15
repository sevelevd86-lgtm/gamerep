import {Save} from "./save.js";import {Game} from "./game.js";import {showScreen} from "./ui.js";import {LINKS} from "./config.js";
let state=Save.load(),game=null;
const $=id=>document.getElementById(id);
function startGame(){if(game)game.destroy();game=new Game($("gameCanvas"),state);showScreen("gameScreen");game.start();window.game=game;refreshQuests()}
function openPanel(html){if(game)game.paused=true;$("panelContent").innerHTML=html;$("panelScreen").classList.remove("hidden")}
function refreshQuests(){const q=document.getElementById("questHud");q.innerHTML="<div class='quest'><b>QUEST</b>"+(state.tracks.length?"<div class='done'>✓ Записать первый трек</div>":"<div>□ Записать первый трек</div>")+(state.money>=2500?"<div class='done'>✓ Заработать 2 500 ₽</div>":"<div>□ Заработать 2 500 ₽</div>")+(state.bossesDefeated.includes("mom")?"<div class='done'>✓ Победить Маму</div>":"<div>□ Победить Маму</div>")+"</div>"}
$("metButton").onclick=()=>{if(LINKS.MET200&&LINKS.MET200!=="PASTE_LINK_HERE")location.href=LINKS.MET200;else alert("Укажи ссылку MET200$ в js/config.js");};
$("menuButtons").onclick=e=>{const a=e.target.dataset.action;if(a==="new"){state=Save.fresh();$("nameInput").value="";showScreen("nameScreen");}if(a==="continue"){state=Save.load();if(!state.playerName){showScreen("nameScreen")}else startGame()}if(a==="collection")openPanel(`<h1>DISK COLLECTION</h1><div class="disc-grid">${Array.from({length:50},(_,i)=>{const d=state.discs.find(x=>x.id===i);return `<div class="card ${d?"":"locked"}"><div class="rarity">${d?.rarity||"UNKNOWN"}</div><h3>💿 ${d?.name||"???"}</h3><div class="stat">${d?"₽ "+d.value:"Не найден"}</div></div>`}).join("")}</div><button data-close-panel>ЗАКРЫТЬ</button>`);if(a==="settings")openPanel(`<h1>НАСТРОЙКИ</h1><p>Громкость музыки и эффектов сохраняется локально.</p><button data-reset>СБРОСИТЬ СОХРАНЕНИЕ</button><button data-close-panel>ЗАКРЫТЬ</button>`)}
$("nameContinue").onclick=()=>{const n=$("nameInput").value.trim();if(!n)return;$("nameInput").blur();state.playerName=n;Save.save(state);startGame();game.toast("Добро пожаловать, "+n+"!");};
document.addEventListener("click",e=>{const t=e.target;
if(t.dataset.pause){const a=t.dataset.pause;if(a==="resume"){$("pauseScreen").classList.add("hidden");game.paused=false}if(a==="inventory"){game.openInventory();$("pauseScreen").classList.add("hidden")}if(a==="apartment"){game.openApartment();$("pauseScreen").classList.add("hidden")}if(a==="map"){openPanel(`<h1>КАРТА</h1><p>🏠 Дом　🏙 Город　⬇️ Подвал　🏪 Магазин　🎖 Авангардиκ　🎵 Студия　🏢 Большая квартира　🎤 Концерт</p><button data-close-panel>ЗАКРЫТЬ</button>`);$("pauseScreen").classList.add("hidden")}if(a==="settings"){openPanel(`<h1>НАСТРОЙКИ</h1><p>Музыка: 70% • Эффекты: 80% • Качество: HIGH</p><button data-reset>СБРОСИТЬ СОХРАНЕНИЕ</button><button data-close-panel>ЗАКРЫТЬ</button>`);$("pauseScreen").classList.add("hidden")}if(a==="save"){game.autosave();game.toast("СОХРАНЕНО")}if(a==="menu"){game.autosave();showScreen("menu");$("pauseScreen").classList.add("hidden")}}
if(t.dataset.closePanel!==undefined){$("panelScreen").classList.add("hidden");if(game)game.paused=false}
if(t.dataset.retryBoss){$("panelScreen").classList.add("hidden");game.paused=false;game.startMom()}
if(t.dataset.dialogNext!==undefined)game.nextDialogue()
if(t.dataset.buyEquip){const [type,id]=t.dataset.buyEquip.split(":");game.buyEquip(type,id)}
if(t.dataset.buyCloth)game.buyCloth(t.dataset.buyCloth)
if(t.dataset.buyFurniture)game.buyFurniture(t.dataset.buyFurniture)
if(t.dataset.stream)game.doStream()
if(t.dataset.reset){Save.clear();location.reload()}
});
window.addEventListener("keydown",e=>{if(!game||game.paused)return;const k=e.key.toLowerCase();if(k==="j")game.attack(false);if(k==="k")game.attack(true);if(k==="e")game.interact();if(k==="q")game.special()});
refreshQuests();

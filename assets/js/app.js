const fleet = window.DCA_FLEET || [];
const locations = window.DCA_LOCATIONS || [];
const tools = window.DCA_TOOLS || [];
const missions = window.DCA_MISSIONS || {};
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
let activeRole = 'All';
let selectedShip = null;
function init(){
 $('#fleetCount').textContent = fleet.length;
 renderNavSpy(); renderRoleFilters(); renderFleet(); renderLocations(); renderTools(); renderMissions(); bindSearch(); bindQuickCards();
}
function renderNavSpy(){
 $$('.nav a').forEach(a=>a.addEventListener('click',()=>{$$('.nav a').forEach(x=>x.classList.remove('active'));a.classList.add('active');}));
}
function renderRoleFilters(){
 const roles=['All',...new Set(fleet.map(s=>s.lane))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b));
 $('#roleFilters').innerHTML=roles.map(r=>`<button class="chip ${r===activeRole?'active':''}" data-role="${r}">${r}</button>`).join('');
 $$('#roleFilters .chip').forEach(btn=>btn.addEventListener('click',()=>{activeRole=btn.dataset.role;renderRoleFilters();renderFleet();}));
}
function renderFleet(){
 const list=activeRole==='All'?fleet:fleet.filter(s=>s.lane===activeRole);
 $('#fleetGrid').innerHTML=list.map(s=>`<article class="fleet-card ${selectedShip?.name===s.name?'selected':''}" data-ship="${s.name}"><h3>${s.name}</h3><p>${s.notes}</p><span class="role">${s.lane} · ${s.role}</span></article>`).join('');
 $$('#fleetGrid .fleet-card').forEach(card=>card.addEventListener('click',()=>selectShip(card.dataset.ship)));
}
function selectShip(name){
 selectedShip=fleet.find(s=>s.name===name); renderFleet();
 $('#shipDetail').innerHTML=`<p class="eyebrow">${selectedShip.lane}</p><h3>${selectedShip.name}</h3><p>${selectedShip.notes}</p><ul class="detail-list"><li><strong>Role:</strong> ${selectedShip.role}</li><li><strong>Crew:</strong> ${selectedShip.crew}</li><li><strong>Mission Fit:</strong> ${selectedShip.missionFit || 'General operations and personal fleet planning.'}</li><li><strong>Checklist:</strong> Loadout, fuel, repair, med supplies, route, extraction plan.</li><li><strong>Next:</strong> Build dedicated ${selectedShip.name} operating page.</li></ul>`;
 $('#shipDetail').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function renderLocations(){
 $('#locationGrid').innerHTML=locations.map(l=>`<article class="location-card"><span class="role">${l.parent} · ${l.type}</span><h3>${l.name}</h3><p>${l.summary}</p><p>${l.tags.map(t=>'#'+t).join(' ')}</p></article>`).join('');
}
function renderTools(){
 $('#toolGrid').innerHTML=tools.map(t=>`<article class="tool-card"><h3>${t.icon} ${t.name}</h3><p>${t.summary}</p></article>`).join('');
}
function renderMissions(){
 $('#missionButtons').innerHTML=Object.keys(missions).map(m=>`<button class="chip" data-mission="${m}">${m}</button>`).join('');
 $$('#missionButtons .chip').forEach(btn=>btn.addEventListener('click',()=>showMission(btn.dataset.mission)));
 showMission('Salvage');
}
function showMission(name){
 $$('#missionButtons .chip').forEach(b=>b.classList.toggle('active',b.dataset.mission===name));
 const ships=missions[name]||[];
 $('#missionOutput').innerHTML=`<p class="eyebrow">Recommended Assets</p><h3>${name} Operation</h3><p>Start with: <strong>${ships.join(', ')}</strong>.</p><ul class="detail-list"><li>Pick ship based on crew size and risk.</li><li>Check repair, fuel, ammo, and medical prep before launch.</li><li>Next release will add routes, sale points, and checklist presets.</li></ul>`;
}
function bindSearch(){
 const input=$('#globalSearch');
 input.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase();
  if(!q){$('#searchResults').innerHTML='';return;}
  const shipHits=fleet.filter(s=>[s.name,s.role,s.lane,s.notes].join(' ').toLowerCase().includes(q)).map(s=>({kind:'Ship',title:s.name,body:`${s.lane} · ${s.role}`,action:()=>{location.hash='fleet';selectShip(s.name);}}));
  const locHits=locations.filter(l=>[l.name,l.parent,l.type,l.tags.join(' '),l.summary].join(' ').toLowerCase().includes(q)).map(l=>({kind:'Location',title:l.name,body:`${l.parent} · ${l.type}`,action:()=>{location.hash='atlas';}}));
  const toolHits=tools.filter(t=>[t.name,t.summary].join(' ').toLowerCase().includes(q)).map(t=>({kind:'Tool',title:t.name,body:t.summary,action:()=>{location.hash='tools';}}));
  const hits=[...shipHits,...locHits,...toolHits].slice(0,8);
  $('#searchResults').innerHTML=hits.length?hits.map((h,i)=>`<div class="result" data-hit="${i}"><strong>${h.kind}: ${h.title}</strong><br><span>${h.body}</span></div>`).join(''):'<div class="result">No match yet. Add it to the data files next.</div>';
  $$('#searchResults .result[data-hit]').forEach(el=>el.addEventListener('click',()=>hits[Number(el.dataset.hit)].action()));
 });
 $('#clearSearch').addEventListener('click',()=>{input.value='';$('#searchResults').innerHTML='';input.focus();});
}
function bindQuickCards(){
 $$('[data-jump]').forEach(card=>card.addEventListener('click',()=>{location.hash=card.dataset.jump;}));
}
init();

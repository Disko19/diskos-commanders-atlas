
(() => {
  const fleet = window.DCA_FLEET || [];
  const locations = window.DCA_LOCATIONS || [];
  const tools = window.DCA_TOOLS || [];
  const missions = window.DCA_MISSIONS || {};

  const byId = id => document.getElementById(id);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));

  byId("fleetCount").textContent = fleet.length;

  document.querySelectorAll("[data-jump]").forEach(el => {
    el.addEventListener("click", () => {
      const target = document.getElementById(el.dataset.jump);
      target?.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = navLinks.map(a => document.getElementById(a.dataset.nav)).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle("active", a.dataset.nav === entry.target.id));
    });
  }, {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(s => observer.observe(s));

  let activeRole = "All";
  const roles = ["All", ...new Set(fleet.map(ship => ship.role))];
  const roleFilters = byId("roleFilters");
  const fleetGrid = byId("fleetGrid");
  const shipDetail = byId("shipDetail");

  function renderRoleFilters(){
    roleFilters.innerHTML = roles.map(role => `<button class="${role===activeRole?"active":""}" data-role="${escapeHtml(role)}">${escapeHtml(role)}</button>`).join("");
    roleFilters.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
      activeRole = btn.dataset.role;
      renderRoleFilters();
      renderFleet();
    }));
  }

  function renderFleet(){
    const filtered = activeRole === "All" ? fleet : fleet.filter(s => s.role === activeRole);
    fleetGrid.innerHTML = filtered.map(ship => `
      <article class="card" tabindex="0" data-ship="${escapeHtml(ship.name)}">
        <div class="meta"><span>${escapeHtml(ship.role)}</span><span>${escapeHtml(ship.crew)}</span></div>
        <h3>${escapeHtml(ship.name)}</h3>
        <p>${escapeHtml(ship.lane)} · ${escapeHtml(ship.summary)}</p>
      </article>`).join("");
    fleetGrid.querySelectorAll("[data-ship]").forEach(card => {
      const open = () => showShip(card.dataset.ship);
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" "){e.preventDefault();open();}});
    });
  }

  function showShip(name){
    const ship = fleet.find(s => s.name === name);
    if(!ship) return;
    fleetGrid.querySelectorAll(".card").forEach(c => c.classList.toggle("selected", c.dataset.ship === name));
    shipDetail.innerHTML = `
      <p class="eyebrow">${escapeHtml(ship.role)} · ${escapeHtml(ship.lane)}</p>
      <h3>${escapeHtml(ship.name)}</h3>
      <p>${escapeHtml(ship.summary)}</p>
      <div class="detail-block"><strong>Crew</strong><p>${escapeHtml(ship.crew)}</p></div>
      <div class="detail-block"><strong>Mission fit</strong><ul>${ship.missions.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
      <div class="detail-block"><strong>Pre-flight</strong><ul>${ship.checklist.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></div>`;
  }

  renderRoleFilters();
  renderFleet();

  const locationGrid = byId("locationGrid");
  const locationDetail = byId("locationDetail");
  locationGrid.innerHTML = locations.map(loc => `
    <article class="card" tabindex="0" data-location="${escapeHtml(loc.name)}">
      <div class="meta"><span>${escapeHtml(loc.type)}</span><span>${escapeHtml(loc.parent)}</span></div>
      <h3>${escapeHtml(loc.name)}</h3>
      <p>${escapeHtml(loc.summary)}</p>
    </article>`).join("");
  locationGrid.querySelectorAll("[data-location]").forEach(card => {
    const open = () => showLocation(card.dataset.location);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" "){e.preventDefault();open();}});
  });

  function showLocation(name){
    const loc = locations.find(l => l.name === name);
    if(!loc) return;
    locationGrid.querySelectorAll(".card").forEach(c => c.classList.toggle("selected", c.dataset.location === name));
    locationDetail.innerHTML = `
      <p class="eyebrow">${escapeHtml(loc.type)} · ${escapeHtml(loc.parent)}</p>
      <h3>${escapeHtml(loc.name)}</h3>
      <p>${escapeHtml(loc.summary)}</p>
      <div class="detail-block"><strong>Services and uses</strong><ul>${loc.services.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
      <div class="detail-block"><strong>Navigation</strong><p>${escapeHtml(loc.navigation)}</p></div>
      <div class="detail-block"><strong>Atlas note</strong><p>${escapeHtml(loc.notes)}</p></div>`;
  }

  byId("toolGrid").innerHTML = tools.map(tool => `
    <article class="tool"><span class="status">${escapeHtml(tool.status)}</span><strong>${escapeHtml(tool.name)}</strong><p>${escapeHtml(tool.description)}</p></article>
  `).join("");

  const missionButtons = byId("missionButtons");
  const missionOutput = byId("missionOutput");
  missionButtons.innerHTML = Object.keys(missions).map((name,i) => `<button class="${i===0?"active":""}" data-mission="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
  missionButtons.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    missionButtons.querySelectorAll("button").forEach(b=>b.classList.toggle("active", b===btn));
    showMission(btn.dataset.mission);
  }));
  function showMission(name){
    const mission = missions[name];
    if(!mission) return;
    missionOutput.innerHTML = `<p class="eyebrow">${escapeHtml(name)}</p><h3>Recommended owned ships</h3>
      <div class="ship-pills">${mission.ships.map(s=>`<span>${escapeHtml(s)}</span>`).join("")}</div>
      <h3>Launch sequence</h3><ol>${mission.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ol>`;
  }
  showMission(Object.keys(missions)[0]);

  const searchInput = byId("globalSearch");
  const searchResults = byId("searchResults");
  const searchIndex = [
    ...fleet.map(x=>({type:"Ship",name:x.name,detail:`${x.role} · ${x.lane}`,target:"fleet",action:()=>showShip(x.name),text:JSON.stringify(x)})),
    ...locations.map(x=>({type:"Location",name:x.name,detail:`${x.type} · ${x.parent}`,target:"atlas",action:()=>showLocation(x.name),text:JSON.stringify(x)})),
    ...tools.map(x=>({type:"Tool",name:x.name,detail:x.status,target:"tools",action:()=>{},text:JSON.stringify(x)}))
  ];

  function runSearch(){
    const q = searchInput.value.trim().toLowerCase();
    if(!q){searchResults.innerHTML="";return;}
    const matches = searchIndex.filter(item => item.text.toLowerCase().includes(q)).slice(0,8);
    searchResults.innerHTML = matches.length ? matches.map((item,i)=>`
      <div class="search-result" tabindex="0" data-result="${i}">
        <div><strong>${escapeHtml(item.name)}</strong><br><small>${escapeHtml(item.type)} · ${escapeHtml(item.detail)}</small></div>
        <span>Open →</span>
      </div>`).join("") : `<div class="search-result"><small>No result yet. This tells us what data to add next.</small></div>`;
    searchResults.querySelectorAll("[data-result]").forEach(el => {
      const open = () => {
        const item = matches[Number(el.dataset.result)];
        document.getElementById(item.target)?.scrollIntoView({behavior:"smooth"});
        setTimeout(item.action, 350);
      };
      el.addEventListener("click", open);
      el.addEventListener("keydown", e => {if(e.key==="Enter"){open();}});
    });
  }
  searchInput.addEventListener("input", runSearch);
  byId("clearSearch").addEventListener("click", () => {searchInput.value="";searchResults.innerHTML="";searchInput.focus();});
})();

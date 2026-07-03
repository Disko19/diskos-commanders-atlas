const fleet = [
  { name:"A1 Spirit", group:"Combat", role:"Bomber / strike platform", priority:"Strike", checklist:"Bombing runs, fast strike work, and precision pressure." },
  { name:"Asgard", group:"Combat", role:"Dropship", priority:"Dropship", checklist:"Troop movement, hot insertions, and heavy landing operations." },
  { name:"ATLS", group:"Utility", role:"Cargo support exosuit", priority:"Utility", checklist:"Move freight, support hangar work, speed up loading." },
  { name:"Ares Inferno", group:"Combat", role:"Heavy ballistic fighter", priority:"Anti-large", checklist:"Bring the big gun when something large needs regretting its choices." },
  { name:"Arrow", group:"Combat", role:"Light fighter", priority:"Interceptor", checklist:"Fast response, dogfighting practice, light patrol." },
  { name:"C8R Pisces", group:"Medical", role:"Medical shuttle", priority:"Rescue", checklist:"Fast medical response, bunker recovery, quick transport." },
  { name:"Corsair", group:"Exploration", role:"Armed explorer", priority:"Daily flagship", checklist:"Explore with teeth. Good when the route may get ugly." },
  { name:"Cutter", group:"Utility", role:"Starter utility ship", priority:"Daily", checklist:"Short hops, errands, low-pressure movement." },
  { name:"Cutlass Black", group:"Utility", role:"Multi-role workhorse", priority:"Workhorse", checklist:"Bunkers, boxes, light cargo, vehicle hauling, backup fighter." },
  { name:"Dragonfly Black", group:"Utility", role:"Grav-lev bike", priority:"Ground", checklist:"Surface scouting and fast local movement." },
  { name:"F7C-M Super Hornet", group:"Combat", role:"Heavy fighter", priority:"Dogfight", checklist:"Combat patrol and hard-nosed fighting." },
  { name:"Golem OX", group:"Industry", role:"Industrial support", priority:"Industrial", checklist:"Industrial work lane. Details to verify and expand." },
  { name:"Guardian MX", group:"Combat", role:"Heavy fighter", priority:"Favorite", checklist:"Primary combat platform. Loadout page comes first." },
  { name:"Hermes", group:"Cargo", role:"Cargo hauler", priority:"Hauler", checklist:"Cargo hauling lane. Kept under Cargo Haulers." },
  { name:"Hull B", group:"Cargo", role:"Medium cargo hauler", priority:"Trade", checklist:"Mid-size hauling and trade routes." },
  { name:"Hull C", group:"Cargo", role:"Large cargo hauler", priority:"Bulk", checklist:"Big freight, station-to-station work, serious hauling." },
  { name:"Ironclad", group:"Cargo", role:"Heavy cargo / assault transport", priority:"Heavy", checklist:"Large cargo, vehicle transport, high-value runs." },
  { name:"Moth", group:"Industry", role:"Industrial salvage ship", priority:"Salvage", checklist:"Industrial salvage lane. Kept under salvage." },
  { name:"Prowler Utility", group:"Cargo", role:"Cargo hauler", priority:"Utility Cargo", checklist:"Cargo utility lane. Kept under Cargo Haulers." },
  { name:"PTV", group:"Utility", role:"Ground vehicle", priority:"Ground", checklist:"Hangar fun, local movement, ground support." },
  { name:"Railen", group:"Cargo", role:"Alien cargo hauler", priority:"Trade", checklist:"Cargo runs with style. Dedicated trade page later." },
  { name:"Reclaimer", group:"Industry", role:"Heavy salvage", priority:"Crew Salvage", checklist:"Crew salvage operations and large recovery loops." },
  { name:"ROC", group:"Industry", role:"Ground mining vehicle", priority:"Mining", checklist:"Gem mining, surface operations, vehicle support." },
  { name:"Sabre", group:"Combat", role:"Stealth fighter", priority:"Stealth", checklist:"Low-signature combat and patrol." },
  { name:"Starfarer Gemini", group:"Support", role:"Fuel / military support", priority:"Support", checklist:"Refueling support, fleet operations, heavy logistics." },
  { name:"Ursa Medivac", group:"Medical", role:"Ground medical rover", priority:"Ground Rescue", checklist:"Ground-side recovery and bunker support." },
  { name:"Vulture", group:"Industry", role:"Solo salvage", priority:"Solo Salvage", checklist:"Solo salvage loop and fast cleanup jobs." },
  { name:"Zeus Mk II ES", group:"Exploration", role:"Expedition ship", priority:"Explorer", checklist:"Exploration, scouting, and future route planning." }
];

const slug = name => name.replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"");
const fleetGrid = document.getElementById("fleetGrid");
const fleetCount = document.getElementById("fleetCount");
fleetCount.textContent = fleet.length;

function renderFleet(filter = "All") {
  fleetGrid.innerHTML = "";
  const ships = filter === "All" ? fleet : fleet.filter(ship => ship.group === filter);
  ships.forEach(ship => {
    const card = document.createElement("article");
    card.className = "ship-card";
    card.id = `ship-${slug(ship.name)}`;
    card.innerHTML = `
      <div class="ship-topline"><small>${ship.group}</small><em>${ship.priority}</em></div>
      <strong>${ship.name}</strong>
      <span>${ship.role}</span>
      <p>${ship.checklist}</p>
    `;
    fleetGrid.appendChild(card);
  });
}
renderFleet();

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderFleet(btn.dataset.filter);
  });
});

const searchIndex = [
  ...fleet.map(s => ({ title: s.name, meta: `${s.role} • ${s.group} • ${s.checklist}`, target: `#ship-${slug(s.name)}` })),
  { title:"Quick Board", meta:"One-click command board for common tasks", target:"#quick-board" },
  { title:"Combat Patrol", meta:"Guardian MX, Super Hornet, Sabre, Arrow, Ares Inferno", target:"#fleet-command" },
  { title:"Cargo Run", meta:"Hull C, Ironclad, Hull B, Railen, Hermes, Prowler Utility", target:"#fleet-command" },
  { title:"Salvage Loop", meta:"Vulture, Reclaimer, Moth", target:"#toolbox" },
  { title:"Medical Rescue", meta:"C8R Pisces, Ursa Medivac", target:"#toolbox" },
  { title:"Wala", meta:"Stanton → ArcCorp moon • next detailed build", target:"#arccorp-details" },
  { title:"Baijini Point", meta:"ArcCorp orbital station • next detailed build", target:"#arccorp-details" },
  { title:"Area18", meta:"ArcCorp landing zone • next detailed build", target:"#arccorp-details" },
  { title:"Lyria", meta:"ArcCorp moon • next detailed build", target:"#arccorp-details" },
  { title:"Everus Harbor", meta:"Hurston orbital station placeholder", target:"#stanton" },
  { title:"Seraphim Station", meta:"Crusader orbital station placeholder", target:"#stanton" },
  { title:"Stanton", meta:"Primary Atlas system build", target:"#stanton" },
  { title:"Hospital Finder", meta:"Commander's Toolbox", target:"#toolbox" },
  { title:"Refinery Finder", meta:"Commander's Toolbox", target:"#toolbox" },
  { title:"AD5B", meta:"Weapon lookup placeholder", target:"#toolbox" },
  { title:"Salvage Planner", meta:"Vulture, Reclaimer, Moth planning", target:"#toolbox" }
];

const search = document.getElementById("search");
const results = document.getElementById("results");

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  results.innerHTML = "";
  if (!q) { results.classList.remove("open"); return; }
  const matches = searchIndex.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 10);
  if (!matches.length) {
    results.innerHTML = `<div class="result"><strong>No match yet</strong><span>Add this to the next build list.</span></div>`;
  } else {
    matches.forEach(item => {
      const a = document.createElement("a");
      a.href = item.target;
      a.className = "result";
      a.innerHTML = `<strong>${item.title}</strong><span>${item.meta}</span>`;
      a.addEventListener("click", () => { search.value = ""; results.classList.remove("open"); });
      results.appendChild(a);
    });
  }
  results.classList.add("open");
});

document.addEventListener("click", event => {
  if (!event.target.closest(".search-box")) results.classList.remove("open");
});

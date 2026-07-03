const fleet = [
  { name: "A1 Spirit", role: "Bomber / strike support", group: "Combat", priority: "Specialized", checklist: "Confirm target, arm payload, keep exit vector ready." },
  { name: "Asgard", role: "Dropship", group: "Combat", priority: "Team", checklist: "Load troops, mark LZ, keep engines hot." },
  { name: "Ares Inferno", role: "Heavy gunship / anti-large", group: "Combat", priority: "Heavy hitter", checklist: "Check ammo, pick big targets, avoid knife fights." },
  { name: "Arrow", role: "Light fighter", group: "Combat", priority: "Interceptor", checklist: "Use speed, stay unpredictable, don't trade armor." },
  { name: "F7CC-M Super Hornet", role: "Medium fighter", group: "Combat", priority: "Workhorse", checklist: "Balanced loadout, protect wingmen, pressure targets." },
  { name: "Guardian MX", role: "Heavy fighter", group: "Combat", priority: "Favorite", checklist: "Verify weapons, shields, quantum fuel, mission type." },
  { name: "Sabre", role: "Stealth fighter", group: "Combat", priority: "Specialist", checklist: "Low signature approach, strike first, reset often." },
  { name: "Hermes", role: "Cargo hauler", group: "Cargo", priority: "Hauler", checklist: "Check route risk, cargo value, station services." },
  { name: "Hull B", role: "Cargo hauler", group: "Cargo", priority: "Medium freight", checklist: "Confirm cargo grid, sell point, escort need." },
  { name: "Hull C", role: "Heavy cargo", group: "Cargo", priority: "Big freight", checklist: "Docking route, cargo terminals, protection plan." },
  { name: "Ironclad", role: "Heavy freight / armored transport", group: "Cargo", priority: "Armored logistics", checklist: "Crew plan, cargo plan, ground transfer plan." },
  { name: "Prowler Utility", role: "Cargo hauler", group: "Cargo", priority: "Utility cargo", checklist: "Confirm cargo role and route before launch." },
  { name: "Railen", role: "Alien cargo", group: "Cargo", priority: "Xi'an freight", checklist: "Route planning and terminal compatibility notes." },
  { name: "Moth", role: "Industrial salvage", group: "Industry", priority: "Industrial salvage", checklist: "Salvage target, cargo transfer, sell destination." },
  { name: "Reclaimer", role: "Heavy salvage", group: "Industry", priority: "Crew money", checklist: "Crew roles, boxes, risk zone, unload plan." },
  { name: "ROC", role: "Ground mining", group: "Industry", priority: "Surface mining", checklist: "Load vehicle, scan moon, watch weather and pirates." },
  { name: "Vulture", role: "Solo salvage", group: "Industry", priority: "Solo earner", checklist: "Empty grid, safe target, sell before greed wins." },
  { name: "Golem OX", role: "Industrial / utility", group: "Industry", priority: "Utility industrial", checklist: "Assign role after spec verification." },
  { name: "Corsair", role: "Explorer / gunship", group: "Exploration", priority: "Armed explorer", checklist: "Long range route, crew seats, guns, supplies." },
  { name: "Zeus Mk II ES", role: "Explorer", group: "Exploration", priority: "Explorer", checklist: "Survey plan, fuel, supplies, quiet route." },
  { name: "C8R Pisces", role: "Medical shuttle", group: "Medical", priority: "Fast rescue", checklist: "Med supplies, pickup marker, safe landing zone." },
  { name: "Ursa Medivac", role: "Ground medical", group: "Medical", priority: "Surface rescue", checklist: "Load into carrier, plan ground approach, extract casualty." },
  { name: "Cutter", role: "Daily driver", group: "Utility", priority: "Convenience", checklist: "Quick claim, small run, simple errands." },
  { name: "Cutlass Black", role: "Multi-role utility", group: "Utility", priority: "Classic daily", checklist: "Cargo, combat, vehicle, or rescue—pick the job first." },
  { name: "ATLS", role: "Cargo loader", group: "Utility", priority: "Cargo support", checklist: "Use for loading, moving, and hangar workflow." },
  { name: "Dragonfly Black", role: "Grav-lev scout", group: "Utility", priority: "Mobility", checklist: "Pack for surface scouting and quick movement." },
  { name: "PTV", role: "Ground runabout", group: "Utility", priority: "Local transport", checklist: "For hangars, bases, and unserious greatness." },
  { name: "Starfarer Gemini", role: "Refueling / military tanker", group: "Support", priority: "Fuel support", checklist: "Fuel plan, escort plan, rendezvous point." }
];

const fleetGrid = document.getElementById("fleetGrid");
const fleetCount = document.getElementById("fleetCount");
fleetCount.textContent = fleet.length;

function slug(name) {
  return name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

function renderFleet(filter = "All") {
  fleetGrid.innerHTML = "";
  const ships = filter === "All" ? fleet : fleet.filter(ship => ship.group === filter);
  ships.forEach(ship => {
    const card = document.createElement("article");
    card.className = "ship-card";
    card.dataset.group = ship.group;
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
  { title: "Combat Patrol", meta: "Guardian MX, Super Hornet, Sabre, Arrow, Ares Inferno", target: "#mission-roles" },
  { title: "Cargo Run", meta: "Hull C, Ironclad, Hull B, Railen, Hermes, Prowler Utility", target: "#mission-roles" },
  { title: "Salvage Loop", meta: "Vulture, Reclaimer, Moth", target: "#mission-roles" },
  { title: "Medical Rescue", meta: "C8R Pisces, Ursa Medivac", target: "#mission-roles" },
  { title: "Wala", meta: "Stanton → ArcCorp moon • next detailed build", target: "#arccorp-details" },
  { title: "Baijini Point", meta: "ArcCorp orbital station • next detailed build", target: "#arccorp-details" },
  { title: "Area18", meta: "ArcCorp landing zone • next detailed build", target: "#arccorp-details" },
  { title: "Everus Harbor", meta: "Hurston orbital station placeholder", target: "#stanton" },
  { title: "Seraphim Station", meta: "Crusader orbital station placeholder", target: "#stanton" },
  { title: "Stanton", meta: "Primary Atlas system build", target: "#stanton" },
  { title: "Hospital Finder", meta: "Commander's Toolbox", target: "#toolbox" },
  { title: "Refinery Finder", meta: "Commander's Toolbox", target: "#toolbox" },
  { title: "AD5B", meta: "Weapon lookup placeholder", target: "#toolbox" },
  { title: "Salvage Planner", meta: "Vulture, Reclaimer, Moth planning", target: "#toolbox" }
];

const search = document.getElementById("search");
const results = document.getElementById("results");

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  results.innerHTML = "";
  if (!q) { results.classList.remove("open"); return; }
  const matches = searchIndex.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 10);
  if (!matches.length) {
    results.innerHTML = `<div class="result"><strong>No match yet</strong><span>Good target for the next build list.</span></div>`;
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

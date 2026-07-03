const fleet = [
  { name: "A1 Spirit", role: "Bomber / strike support", group: "Combat", note: "Precision strike platform." },
  { name: "Asgard", role: "Dropship", group: "Combat", note: "Troop movement and combat insertion." },
  { name: "Ares Inferno", role: "Heavy gunship / anti-large", group: "Combat", note: "Bring the big gun when subtle has left the building." },
  { name: "Arrow", role: "Light fighter", group: "Combat", note: "Fast, agile, unforgiving." },
  { name: "F7CC-M Super Hornet", role: "Medium fighter", group: "Combat", note: "Front-line fighter workhorse." },
  { name: "Guardian MX", role: "Heavy fighter", group: "Combat", note: "Primary combat focus page candidate." },
  { name: "Sabre", role: "Stealth fighter", group: "Combat", note: "Quiet entry, hard exit." },
  { name: "Hermes", role: "Cargo hauler", group: "Cargo", note: "Hauling lane candidate." },
  { name: "Hull B", role: "Cargo hauler", group: "Cargo", note: "Mid-sized trade runs." },
  { name: "Hull C", role: "Heavy cargo", group: "Cargo", note: "Big freight planning." },
  { name: "Ironclad", role: "Heavy freight / armored transport", group: "Cargo", note: "Armored logistics backbone." },
  { name: "Prowler Utility", role: "Cargo hauler", group: "Cargo", note: "Kept under cargo per Disko." },
  { name: "Railen", role: "Alien cargo", group: "Cargo", note: "Xi'an freight flavor." },
  { name: "Moth", role: "Industrial salvage", group: "Industry", note: "Industrial salvage ship." },
  { name: "Reclaimer", role: "Heavy salvage", group: "Industry", note: "Crew salvage operation." },
  { name: "ROC", role: "Ground mining", group: "Industry", note: "Surface mining workhorse." },
  { name: "Vulture", role: "Solo salvage", group: "Industry", note: "Solo money printer when conditions behave." },
  { name: "Golem OX", role: "Industrial / utility", group: "Industry", note: "Utility industrial asset." },
  { name: "Corsair", role: "Explorer / gunship", group: "Exploration", note: "Long-range troublemaker." },
  { name: "Zeus Mk II ES", role: "Explorer", group: "Exploration", note: "Exploration daily-driver candidate." },
  { name: "C8R Pisces", role: "Medical shuttle", group: "Medical", note: "Fast med support and recovery." },
  { name: "Ursa Medivac", role: "Ground medical", group: "Medical", note: "Surface rescue asset." },
  { name: "Cutter", role: "Daily driver", group: "Utility", note: "Small ship convenience." },
  { name: "Cutlass Black", role: "Multi-role utility", group: "Utility", note: "Do-everything classic." },
  { name: "ATLS", role: "Cargo loader", group: "Utility", note: "Cargo handling support." },
  { name: "Dragonfly Black", role: "Grav-lev scout", group: "Utility", note: "Ground / low-alt mobility." },
  { name: "PTV", role: "Ground runabout", group: "Utility", note: "Hangar comedy and local transport." },
  { name: "Starfarer Gemini", role: "Refueling / military tanker", group: "Support", note: "Fuel support and heavy logistics." }
];

const fleetGrid = document.getElementById("fleetGrid");
const fleetCount = document.getElementById("fleetCount");
fleetCount.textContent = fleet.length;

function renderFleet(filter = "All") {
  fleetGrid.innerHTML = "";
  const ships = filter === "All" ? fleet : fleet.filter(ship => ship.group === filter);
  ships.forEach(ship => {
    const card = document.createElement("article");
    card.className = "ship-card";
    card.dataset.group = ship.group;
    card.innerHTML = `<strong>${ship.name}</strong><span>${ship.role}</span><small>${ship.group}</small>`;
    card.title = ship.note;
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
  ...fleet.map(s => ({ title: s.name, meta: `${s.role} • ${s.group}`, target: "#fleet-command" })),
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
  const matches = searchIndex.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 9);
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

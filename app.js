const fleet = [
  { name: "A1 Spirit", role: "Bomber / strike support", group: "Combat" },
  { name: "Asgard", role: "Dropship", group: "Combat" },
  { name: "Ares Inferno", role: "Heavy gunship / anti-large", group: "Combat" },
  { name: "Arrow", role: "Light fighter", group: "Combat" },
  { name: "F7CC-M Super Hornet", role: "Medium fighter", group: "Combat" },
  { name: "Guardian MX", role: "Heavy fighter", group: "Combat" },
  { name: "Sabre", role: "Stealth fighter", group: "Combat" },
  { name: "Corsair", role: "Explorer / gunship", group: "Exploration" },
  { name: "Zeus Mk II ES", role: "Explorer", group: "Exploration" },
  { name: "C8R Pisces", role: "Medical shuttle", group: "Medical" },
  { name: "Ursa Medivac", role: "Ground medical", group: "Medical" },
  { name: "Cutter", role: "Daily driver", group: "Utility" },
  { name: "Cutlass Black", role: "Multi-role utility", group: "Utility" },
  { name: "ATLS", role: "Cargo loader", group: "Utility" },
  { name: "Dragonfly Black", role: "Grav-lev scout", group: "Utility" },
  { name: "PTV", role: "Ground runabout", group: "Utility" },
  { name: "Hermes", role: "Cargo hauler", group: "Cargo" },
  { name: "Hull B", role: "Cargo hauler", group: "Cargo" },
  { name: "Hull C", role: "Heavy cargo", group: "Cargo" },
  { name: "Ironclad", role: "Heavy freight / armored transport", group: "Cargo" },
  { name: "Prowler Utility", role: "Cargo hauler", group: "Cargo" },
  { name: "Railen", role: "Alien cargo", group: "Cargo" },
  { name: "Moth", role: "Industrial salvage", group: "Industry" },
  { name: "Reclaimer", role: "Heavy salvage", group: "Industry" },
  { name: "ROC", role: "Ground mining", group: "Industry" },
  { name: "Vulture", role: "Solo salvage", group: "Industry" },
  { name: "Golem OX", role: "Industrial / utility", group: "Industry" },
  { name: "Starfarer Gemini", role: "Refueling / military tanker", group: "Support" }
];

const groupOrder = ["Combat", "Cargo", "Industry", "Exploration", "Medical", "Utility", "Support"];
const fleetGrid = document.getElementById("fleetGrid");

groupOrder.forEach(group => {
  const ships = fleet.filter(s => s.group === group);
  if (!ships.length) return;
  const section = document.createElement("section");
  section.className = "fleet-group";
  section.innerHTML = `<h3>${group}</h3><div class="ship-list"></div>`;
  const list = section.querySelector(".ship-list");
  ships.forEach(ship => {
    const card = document.createElement("article");
    card.className = "ship-card";
    card.innerHTML = `<strong>${ship.name}</strong><span>${ship.role}</span>`;
    list.appendChild(card);
  });
  fleetGrid.appendChild(section);
});

const searchIndex = [
  ...fleet.map(s => ({ title: s.name, meta: `${s.role} • ${s.group}`, target: "#fleet-command" })),
  { title: "Wala", meta: "Stanton → ArcCorp moon", target: "#wala" },
  { title: "ArcCorp", meta: "Area18, Baijini Point, Wala, Lyria", target: "#arccorp" },
  { title: "Stanton", meta: "Primary Atlas build target", target: "#stanton" },
  { title: "Everus Harbor", meta: "Hurston orbital station placeholder", target: "#hurston" },
  { title: "Seraphim Station", meta: "Crusader orbital station placeholder", target: "#crusader" },
  { title: "Hospital Finder", meta: "Toolbox shell", target: "#toolbox" },
  { title: "Refinery Finder", meta: "Toolbox shell", target: "#toolbox" },
  { title: "AD5B", meta: "Weapon lookup placeholder", target: "#toolbox" }
];

const search = document.getElementById("search");
const results = document.getElementById("results");

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  results.innerHTML = "";
  if (!q) { results.classList.remove("open"); return; }
  const matches = searchIndex.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 8);
  if (!matches.length) {
    results.innerHTML = `<div class="result empty">No match yet. Add it to the build list.</div>`;
  } else {
    matches.forEach(item => {
      const a = document.createElement("a");
      a.href = item.target;
      a.className = "result";
      a.innerHTML = `<strong>${item.title}</strong><span>${item.meta}</span>`;
      a.addEventListener("click", () => { results.classList.remove("open"); search.value = ""; });
      results.appendChild(a);
    });
  }
  results.classList.add("open");
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-box")) results.classList.remove("open");
});

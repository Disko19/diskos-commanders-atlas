window.DCA_LOCATIONS = [
  {
    "name": "ArcCorp",
    "type": "Planet",
    "parent": "Stanton",
    "summary": "City-covered corporate planet and the center of Mission 002.",
    "services": [
      "Major landing zone",
      "Orbital station access",
      "Trade",
      "Shopping",
      "Medical"
    ],
    "navigation": "Use Area18 for the primary landing zone and Baijini Point for orbital staging.",
    "notes": "Mission 002 template location."
  },
  {
    "name": "Area18",
    "type": "Landing Zone",
    "parent": "ArcCorp",
    "summary": "Primary ArcCorp landing zone and major shopping, medical, and trade hub.",
    "services": [
      "Medical",
      "Habitation",
      "Ship retrieval",
      "Shopping",
      "Trade terminals",
      "Transit"
    ],
    "navigation": "Approach the ArcCorp city marker, request landing, then use local transit.",
    "notes": "Build detailed shop and service listings after patch verification."
  },
  {
    "name": "Baijini Point",
    "type": "Orbital Station",
    "parent": "ArcCorp",
    "summary": "Orbital staging point above ArcCorp for ship services and local operations.",
    "services": [
      "Ship retrieval",
      "Repair",
      "Refuel",
      "Rearm",
      "Medical",
      "Cargo access"
    ],
    "navigation": "Best fast staging point before ArcCorp, Wala, or Lyria operations.",
    "notes": "Verify individual shops and clinic tier against current live patch."
  },
  {
    "name": "Wala",
    "type": "Moon",
    "parent": "ArcCorp",
    "summary": "ArcCorp moon used for mining, cargo, missions, and surface outpost operations.",
    "services": [
      "Surface outposts",
      "Mining regions",
      "Cargo opportunities",
      "Ground operations"
    ],
    "navigation": "Stage from Baijini Point or Area18, then quantum to the selected surface marker.",
    "notes": "Detailed outpost cards are the next content layer."
  },
  {
    "name": "Lyria",
    "type": "Moon",
    "parent": "ArcCorp",
    "summary": "Cold ArcCorp moon supporting mining, cargo, and surface missions.",
    "services": [
      "Surface outposts",
      "Mining regions",
      "Cargo opportunities",
      "Ground operations"
    ],
    "navigation": "Stage from Baijini Point and verify suit protection before landing.",
    "notes": "Add exact outpost and commodity data only after live-patch verification."
  }
];

window.DCA_TOOLS = [
  {
    "name": "Medical Finder",
    "description": "Find the nearest known medical or respawn option.",
    "status": "Framework"
  },
  {
    "name": "Vehicle Spawn Finder",
    "description": "Locate ground-vehicle spawning support.",
    "status": "Framework"
  },
  {
    "name": "Cargo Route Board",
    "description": "Match owned haulers to route size and risk.",
    "status": "Framework"
  },
  {
    "name": "Salvage Launch Board",
    "description": "Choose Vulture, Reclaimer, or Moth by session type.",
    "status": "Operational"
  },
  {
    "name": "Fleet Role Picker",
    "description": "Filter Disko's owned fleet by mission lane.",
    "status": "Operational"
  },
  {
    "name": "Universal Search",
    "description": "Search ships, ArcCorp locations, and tools.",
    "status": "Operational"
  }
];

window.DCA_MISSIONS = {
  "Solo Combat": {
    "ships": [
      "Guardian MX",
      "Arrow",
      "Sabre",
      "Ares Inferno"
    ],
    "steps": [
      "Pick a nearby staging station",
      "Set repair and rearm fallback",
      "Run one contract tier below your limit for the first pass"
    ]
  },
  "Cargo": {
    "ships": [
      "Cutlass Black",
      "Hull B",
      "Hull C",
      "Ironclad",
      "Railen",
      "Hermes"
    ],
    "steps": [
      "Choose cargo volume",
      "Confirm both terminals",
      "Keep a reserve for losses and fees"
    ]
  },
  "Salvage": {
    "ships": [
      "Vulture",
      "Reclaimer",
      "Moth"
    ],
    "steps": [
      "Choose solo or crewed",
      "Confirm storage and processing plan",
      "Mark the sell location before launch"
    ]
  },
  "Medical": {
    "ships": [
      "C8R Pisces",
      "Ursa Medivac"
    ],
    "steps": [
      "Restock medical gear",
      "Confirm rescue coordinates",
      "Plan extraction before entering the site"
    ]
  },
  "Exploration": {
    "ships": [
      "Corsair",
      "Zeus Mk II ES"
    ],
    "steps": [
      "Check quantum range",
      "Load supplies",
      "Set a return fuel minimum"
    ]
  },
  "Ground Mining": {
    "ships": [
      "ROC",
      "Golem OX",
      "Cutlass Black"
    ],
    "steps": [
      "Choose carrier and moon",
      "Check environmental protection",
      "Confirm sale location"
    ]
  }
};

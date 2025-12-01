// ===============================
// DATA: PHASES + Q&A
// ===============================
const phaseData = [
  {
    name: "PRE-COVID",
    tag: "STABLE ERA",
    phaseClass: "phase-pre",
    title: "Pre-Covid — slow and predictable cycles",
    image: "textures/earth-day.jpg",
    theme: "theme-day",
    tabs: [
      `
      From the 1970s up to 2020, commodity prices moved in <b>long, relatively smooth cycles</b>. 
      Energy, metals and agricultural goods rose when world GDP expanded and fell during recessions.
      Classic shocks – like the oil crises or the rise of China – were strong but still embedded in a
      <i>recognisable, slow rhythm</i>.
      `,
      `
      In <b>International Economics</b>, this regime is crucial because commodities lie at the core of 
      global production. They shape <b>production costs</b>, international competitiveness and 
      countries’ <b>terms of trade</b>. With slow, predictable cycles, exporters and importers could 
      plan with reasonable certainty.
      `,
      `
      Demand for raw materials closely followed world output; supply reacted with lags determined by 
      investment in mines, fields and infrastructure. Typical cycles lasted <b>8–10 years</b>, and many 
      developing economies derived <b>60–80% of export revenues</b> from a handful of commodities.
      `,
      `
      The pre-Covid world was built on <b>slow commodity cycles</b> that supported macroeconomic 
      stability and long-term planning.
      `
    ],
    metrics: [
      {
        value: "~90 months",
        label: "average cycle length",
        note: "Historical average 1970–2020"
      },
      {
        value: "60–80%",
        label: "export revenues from commodities in many EMEs",
        note: "Typical share for resource-dependent economies"
      }
    ]
  },
  {
    name: "COVID",
    tag: "BREAKING POINT",
    phaseClass: "phase-covid",
    title: "Covid — the breaking point of the global system",
    image: "textures/earth-night.jpg",
    theme: "theme-night",
    tabs: [
      `
      In 2020, the pandemic triggered one of the most <b>sudden and synchronised shocks</b> 
      in modern history. Production, trade and transport stopped almost everywhere, causing a 
      <b>collapse in demand</b> for energy and industrial commodities. Prices plunged, then 
      rebounded violently in 2021 when economies reopened.
      `,
      `
      This sequence broke the assumptions of many standard trade models. Instead of shocks spreading 
      gradually along value chains, Covid produced a <i>simultaneous global breakdown</i>. 
      Comparative advantage turned into <b>systemic vulnerability</b> for highly specialised economies.
      `,
      `
      Commodity markets experienced a full cycle – collapse, boom, slowdown – in roughly 
      <b>24 months</b>, the <b>fastest cycle on record</b>. Terms of trade flipped rapidly: importers and 
      exporters struggled to adjust budgets and external balances.
      `,
      `
      Covid marks the <b>break between the old and the new regime</b>: it exposed how fragile 
      global interdependence can be when everything is hit at once.
      `
    ],
    metrics: [
      {
        value: "~24 months",
        label: "full collapse–boom–slowdown cycle",
        note: "Fastest commodity cycle observed in the sample"
      },
      {
        value: "global & sudden",
        label: "nature of the Covid shock",
        note: "Production, trade and transport disrupted simultaneously"
      }
    ]
  },
  {
    name: "POST-COVID",
    tag: "NEW VOLATILE REGIME",
    phaseClass: "phase-post",
    title: "Post-Covid — a new era of fast, shock-driven cycles",
    image: "textures/earth-grey.jpg",
    theme: "theme-day",
    tabs: [
      `
      After 2020, commodity markets did <b>not</b> return to business as usual. Cycles became 
      <b>shorter and more intense</b>: average duration fell from about <b>90 months to 45</b>, and turning 
      points almost doubled. Energy, metals and agricultural prices started to move 
      <i>in sync</i>, reacting to common global shocks.
      `,
      `
      A mix of <b>repeated shocks</b> – Covid aftershocks, war in Ukraine, rapid monetary tightening, 
      extreme weather – combines with deep <b>structural forces</b>. The green transition boosts demand 
      for critical minerals, while geo-economic fragmentation makes supply chains more fragile and more political.
      `,
      `
      Demand for “green” metals grows at double-digit rates, but new mines take years and are concentrated 
      in a few countries. This increases the risk that local disruptions or political decisions create 
      <b>global price spikes</b>, especially for import-dependent regions such as Europe.
      `,
      `
      The post-Covid era is defined by <b>structurally faster, more fragile and more geopolitical</b> 
      commodity markets. Importers must rethink energy policy, industrial strategy and risk management.
      `
    ],
    metrics: [
      {
        value: "~45 months",
        label: "average cycle length after 2020",
        note: "Commodity cycles roughly halved in duration"
      },
      {
        value: "≈2×",
        label: "increase in number of turning points",
        note: "More frequent peaks and troughs in prices"
      }
    ]
  }
];

const qaData = [
  "Commodity prices drive production costs, competitiveness, terms of trade and the way global shocks spread.",
  "The study is led by Mirco Balatti and the World Bank commodity team, the main global reference on these markets.",
  "Core question: have commodity cycles structurally changed after Covid, becoming faster, stronger and more synchronised?",
  "IMF, IEA, OECD and many economists agree: since 2020 cycles are shorter, more volatile and more tightly connected.",
  "Limits: very short post-Covid sample, non-causal methods and aggregated data that hide regional differences.",
  "Key policies: build strategic reserves, diversify suppliers, strengthen macro-stability and, for Europe, secure access to energy and critical minerals."
];

// ===============================
// DOM elements
// ===============================
const bodyEl = document.body;
const phaseLabel = document.getElementById("phaseLabel");
const phaseTag = document.getElementById("phaseTag");
const cardPhaseTitle = document.getElementById("cardPhaseTitle");
const tabPanel = document.getElementById("tabPanel");
const tabButtons = document.querySelectorAll(".tab-btn");
const globeImage = document.getElementById("globeImage");
const metricsStrip = document.getElementById("metricsStrip");
const chips = document.querySelectorAll(".chip");
const answerBox = document.getElementById("answerBox");
const phaseDots = document.querySelectorAll(".phase-dot");
const phaseCurtain = document.getElementById("phaseCurtain");

// ===============================
// PHASE + TABS LOGIC
// ===============================
let currentPhaseIndex = 0;
let currentTabIndex = 0;

function renderPhase() {
  const phase = phaseData[currentPhaseIndex];

  // reset theme + phase classes
  bodyEl.classList.remove(
    "theme-day",
    "theme-night",
    "phase-pre",
    "phase-covid",
    "phase-post"
  );
  bodyEl.classList.add(phase.theme, phase.phaseClass);

  // update curtain
  phaseCurtain.classList.remove(
    "curtain-pre",
    "curtain-covid",
    "curtain-post"
  );
  if (phase.phaseClass === "phase-pre") {
    phaseCurtain.classList.add("curtain-pre");
  } else if (phase.phaseClass === "phase-covid") {
    phaseCurtain.classList.add("curtain-covid");
  } else if (phase.phaseClass === "phase-post") {
    phaseCurtain.classList.add("curtain-post");
  }

  // label & tag
  phaseLabel.textContent = phase.name;
  phaseTag.textContent = phase.tag;

  // title – split in main / sub for Apple-style typography
  const parts = phase.title.split("—");
  if (parts.length === 2) {
    const main = parts[0].trim().toUpperCase();
    const sub = parts[1].trim();
    cardPhaseTitle.innerHTML = `
      <span class="phase-title-main">${main}</span>
      <span class="phase-title-sub">${sub}</span>
    `;
  } else {
    cardPhaseTitle.innerHTML = `
      <span class="phase-title-main">${phase.title}</span>
    `;
  }

  // globe image
  globeImage.src = phase.image;

  // metrics
  metricsStrip.innerHTML = phase.metrics
    .map(
      (m) => `
      <div class="metric-pill">
        <div class="metric-top">
          <span class="metric-value">${m.value}</span>
          <span class="metric-label">${m.label}</span>
        </div>
        <span class="metric-note">${m.note}</span>
      </div>
    `
    )
    .join("");

  // dots
  phaseDots.forEach((dot, idx) => {
    dot.classList.toggle("phase-dot-active", idx === currentPhaseIndex);
  });

  // tabs reset + first content
  currentTabIndex = 0;
  tabButtons.forEach((btn, i) => {
    btn.classList.toggle("tab-active", i === 0);
  });
  updateTabContent();
}

function updateTabContent() {
  const phase = phaseData[currentPhaseIndex];
  tabPanel.classList.remove("visible");
  setTimeout(() => {
    tabPanel.innerHTML = phase.tabs[currentTabIndex];
    tabPanel.classList.add("visible");
  }, 40);
}

// tab click
tabButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currentTabIndex = idx;
    tabButtons.forEach((b) => b.classList.remove("tab-active"));
    btn.classList.add("tab-active");
    updateTabContent();
  });
});

// keyboard navigation for phases
document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowRight") {
    currentPhaseIndex = (currentPhaseIndex + 1) % phaseData.length;
    renderPhase();
  }
  if (ev.key === "ArrowLeft") {
    currentPhaseIndex =
      (currentPhaseIndex - 1 + phaseData.length) % phaseData.length;
    renderPhase();
  }
});

// phase dots click navigation
phaseDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = Number(dot.dataset.phase);
    currentPhaseIndex = idx;
    renderPhase();
  });
});

// ===============================
// Q&A CHIPS
// ===============================
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const index = Number(chip.dataset.answer);
    const questionTitles = [
      "Q1 – Why is this topic relevant?",
      "Q2 – Who are the authors?",
      "Q3 – What is the main research question?",
      "Q4 – Are there other contributions?",
      "Q5 – What are the main limitations?",
      "Q6 – What are the policy implications?"
    ];
    answerBox.innerHTML = `
      <strong>${questionTitles[index]}</strong><br/>
      ${qaData[index]}
    `;
    answerBox.style.display = "block";
  });
});

// ===============================
// PARALLAX ON SCROLL (globe)
// ===============================
window.addEventListener("scroll", () => {
  const ratio = window.scrollY / window.innerHeight;
  const offset = -ratio * 20; // max ~ -20px
  document.documentElement.style.setProperty(
    "--scroll-parallax",
    `${offset}px`
  );
});

// ===============================
// INIT
// ===============================
window.addEventListener("load", () => {
  renderPhase();
});

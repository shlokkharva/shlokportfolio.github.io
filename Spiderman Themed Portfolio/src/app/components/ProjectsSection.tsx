import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 1,
    title: "Disease Prediction System",
    category: "Machine Learning",
    description: "Web-based disease prediction platform analyzing 5,000+ health records. Built with predictive healthcare insights and optimized ML models.",
    tech: ["Python", "Flask", "Bootstrap"],
    color: "#cc1f1f",
    accent: "#e8c547",
    year: "2026",
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Vibgyor Maple",
    category: "Full Stack",
    description: "Deployed a responsive business website with dynamic pages and lead-generation workflows, improving load times by 40%.",
    tech: ["Node.js", "Vercel", "HTML/CSS"],
    color: "#4a72ff", // Brighter blue
    accent: "#60a5fa",
    year: "2026",
    link: "#",
    liveUrl: "https://vibgyormaple.vercel.app/",
    featured: true,
    freelance: true,
  },
  {
    id: 3,
    title: "Aurbient Technologies",
    category: "Corporate Web App",
    description: "Corporate website with 10+ responsive pages, integrated automated email notifications, and streamlined client inquiry workflows.",
    tech: ["Node.js", "HTML/CSS", "JavaScript"],
    color: "#7c3aed",
    accent: "#a78bfa",
    year: "2025",
    link: "#",
    liveUrl: "https://aurbient.com",
    featured: false,
    freelance: true,
  },
  {
    id: 4,
    title: "Cloudburst Prediction System",
    category: "Machine Learning",
    description: "Led a team to build an ML-based prediction system using 10,000+ weather records, featuring an interactive dashboard.",
    tech: ["Python", "Flask", "ML Models"],
    color: "#0d9488",
    accent: "#2dd4bf",
    year: "2024",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Restaurant Management System",
    category: "Full Stack",
    description: "Full-stack system streamlining operations with 15+ CRUD modules for menu, order processing, and inventory.",
    tech: ["PHP", "MySQL", "JavaScript"],
    color: "#dc7c2a",
    accent: "#fb923c",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Parking Management System",
    category: "Web App",
    description: "Efficient parking management platform featuring real-time tracking and database administration.",
    tech: ["PHP", "SQL", "HTML/CSS"],
    color: "#16a34a",
    accent: "#4ade80",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Simple Tour Packages System",
    category: "Mobile App",
    description: "An intuitive Android application designed for booking simple tour packages with complete database connectivity.",
    tech: ["Java", "XML", "Android Studio"],
    color: "#e11d48",
    accent: "#fb7185",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 8,
    title: "CRUD E-Commerce Website",
    category: "Full Stack",
    description: "A functional Python-based e-commerce platform incorporating MongoDB for seamless product inventory CRUD operations.",
    tech: ["Python", "MongoDB", "HTML/CSS"],
    color: "#0284c7",
    accent: "#38bdf8",
    year: "2024",
    link: "#",
    featured: false,
  },
  {
    id: 9,
    title: "Pet Registration System",
    category: "Web App",
    description: "A web-based system for pet registration with a clean interface for data entry and tracking.",
    tech: ["HTML", "CSS"],
    color: "#d97706",
    accent: "#fbbf24",
    year: "2022",
    link: "#",
    featured: false,
  },
  {
    id: 10,
    title: "Hotel Management System",
    category: "Full Stack",
    description: "Comprehensive hotel management system with booking, billing, and room management features.",
    tech: ["JavaScript", "PHP", "SQL"],
    color: "#4f46e5",
    accent: "#818cf8",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 11,
    title: "Quiz System",
    category: "Web App",
    description: "Interactive quiz platform for online examinations with scoring and result tracking.",
    tech: ["PHP", "MySQL"],
    color: "#0891b2",
    accent: "#22d3ee",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 12,
    title: "Tourism Management System",
    category: "Full Stack",
    description: "Platform for managing tourism packages, bookings, and customer information.",
    tech: ["PHP", "SQL"],
    color: "#059669",
    accent: "#34d399",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 13,
    title: "Employee Task Management System",
    category: "Full Stack",
    description: "System for assigning, tracking employee tasks and project management.",
    tech: ["PHP", "MySQL"],
    color: "#65a30d",
    accent: "#a3e635",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 14,
    title: "GoodGrocery Online Store",
    category: "Mobile App",
    description: "Simple grocery online store Android application with product listings.",
    tech: ["Java", "Android"],
    color: "#db2777",
    accent: "#f472b6",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: 15,
    title: "Blog Platform",
    category: "Full Stack",
    description: "Blogging platform with content management and user authentication.",
    tech: ["Python", "MongoDB"],
    color: "#9333ea",
    accent: "#c084fc",
    year: "2024",
    link: "#",
    featured: false,
  }
];

function getInteractiveMockup(project: typeof projects[0]) {
  const baseCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap');
    :root {
      --bg: #050505;
      --surface: rgba(255, 255, 255, 0.03);
      --surface-hover: rgba(255, 255, 255, 0.08);
      --border: rgba(255, 255, 255, 0.08);
      --text: #f0e6ff;
      --text-muted: #8b9bb4;
      --primary: ${project.color};
      --accent: ${project.accent};
    }
    * { box-sizing: border-box; }
    body { 
      margin: 0; font-family: 'Inter', sans-serif; 
      background: var(--bg); color: var(--text); 
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(204, 31, 31, 0.08), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(74, 114, 255, 0.08), transparent 25%);
      min-height: 100vh; overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

    .navbar { 
      background: rgba(5, 5, 5, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border); padding: 20px 40px; 
      display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;
    }
    .navbar h2 { 
      margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 1.8rem; font-weight: 700; 
      text-transform: uppercase; letter-spacing: 2px; color: #fff; 
      display: flex; align-items: center; gap: 12px;
    }
    .navbar h2::before { content: ''; display: block; width: 12px; height: 12px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 15px var(--primary); }

    .container { padding: 40px; max-width: 1400px; margin: 0 auto; }

    .card { 
      background: var(--surface); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border); border-radius: 16px; padding: 30px; 
      box-shadow: 0 10px 40px rgba(0,0,0,0.5); position: relative; overflow: hidden;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s;
    }
    .card::before {
      content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      opacity: 0; transition: opacity 0.4s;
    }
    .card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-5px); }
    .card:hover::before { opacity: 1; }

    h3 { font-family: 'Rajdhani', sans-serif; font-size: 1.5rem; margin-top: 0; margin-bottom: 20px; color: #fff; letter-spacing: 1px; }
    p { line-height: 1.6; color: var(--text-muted); }

    .btn { 
      background: linear-gradient(135deg, var(--primary), var(--accent)); 
      color: white; border: none; padding: 14px 28px; border-radius: 8px; 
      cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.1rem; 
      text-transform: uppercase; letter-spacing: 1.5px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: all 0.3s ease; position: relative; overflow: hidden;
    }
    .btn::after { content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:rgba(255,255,255,0.2); transform:rotate(45deg) translateY(100%); transition:transform 0.6s cubic-bezier(0.4,0,0.2,1); pointer-events:none; }
    .btn:hover::after { transform:rotate(45deg) translateY(-100%); }
    .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px var(--primary)80; }
    .btn:active { transform: translateY(1px); }
    
    .btn-outline { background: transparent; border: 1px solid var(--border); box-shadow: none; }
    .btn-outline:hover { background: var(--surface-hover); border-color: var(--primary); box-shadow: 0 0 20px var(--primary)40; }

    .input { 
      background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: #fff;
      padding: 16px; border-radius: 8px; width: 100%; font-family: 'Inter', sans-serif; margin-bottom: 20px;
      transition: all 0.3s; font-size: 1rem; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
    }
    .input:focus { outline: none; border-color: var(--primary); background: rgba(0,0,0,0.5); box-shadow: inset 0 2px 5px rgba(0,0,0,0.5), 0 0 15px var(--primary)40; }
    select.input option { background: #111; color: #fff; padding: 10px; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
    .flex-between { display: flex; justify-content: space-between; align-items: center; }

    .badge { display:inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid var(--border); }
    .badge.success { background: rgba(16, 185, 129, 0.1); color: #34d399; border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 0 10px rgba(16,185,129,0.2); }
    .badge.danger { background: rgba(239, 68, 68, 0.1); color: #f87171; border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 10px rgba(239,68,68,0.2); }
    .badge.warn { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); box-shadow: 0 0 10px rgba(245,158,11,0.2); }

    table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; }
    th { text-align: left; padding: 0 20px 10px; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
    td { background: rgba(255,255,255,0.02); padding: 20px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background 0.3s; }
    td:first-child { border-left: 1px solid var(--border); border-top-left-radius: 8px; border-bottom-left-radius: 8px; font-family: 'Share Tech Mono', monospace; color: var(--accent); }
    td:last-child { border-right: 1px solid var(--border); border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
    tr:hover td { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); }

    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .anim { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .d1 { animation-delay: 0.1s; } .d2 { animation-delay: 0.2s; } .d3 { animation-delay: 0.3s; }
    
    .glow-text { color: #fff; text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary); }
  `;

  switch (project.id) {
    case 1: // Disease Prediction
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--primary); box-shadow: 0 0 15px var(--primary); opacity: 0; }
        @keyframes scan { 0% { top: 0; opacity: 1; } 100% { top: 100%; opacity: 0; } }
        </style></head><body>
          <div class="navbar"><h2>Disease Prediction AI Core</h2><div class="badge success">System Online</div></div>
          <div class="container grid">
            <div class="card anim d1">
              <h3>Patient Data Input</h3>
              <select class="input" id="sym1"><option value="">[Select Primary Vector]</option><option>High Grade Fever</option><option>Severe Cough</option><option>Chronic Fatigue</option></select>
              <select class="input" id="sym2"><option value="">[Select Secondary Vector]</option><option>Migraine</option><option>Nausea</option><option>Respiratory Distress</option></select>
              <div style="display:flex;gap:15px;"><input type="number" class="input" placeholder="Patient Age" value="45"><input type="number" class="input" placeholder="Heart Rate (BPM)" value="88"></div>
              <button class="btn" style="width:100%" onclick="simulate()">Execute Neural Analysis</button>
            </div>
            <div id="res" class="card anim d2" style="display:none; border-left:4px solid var(--primary);">
              <div class="scan-line" id="scanner"></div>
              <h3 style="color:var(--text-muted)">Analysis Results</h3>
              <div style="font-size:3rem; font-weight:800; font-family:'Rajdhani'; line-height:1; margin-bottom:10px;" class="glow-text">VIRAL INFECTION</div>
              <div style="margin-bottom:30px; font-family:'Share Tech Mono'; color:var(--accent); font-size:1.2rem;">CONFIDENCE: 94.28%</div>
              <div class="grid" style="grid-template-columns:1fr 1fr; gap:15px;">
                <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px;"><strong>Action:</strong> Isolate & Test</div>
                <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px;"><strong>Severity:</strong> Moderate</div>
              </div>
            </div>
          </div>
          <script>
            function simulate() {
              if(!document.getElementById('sym1').value) return alert("Select primary vector!");
              const res = document.getElementById('res');
              res.style.display = 'block';
              document.getElementById('scanner').style.animation = 'scan 1.5s ease-in-out';
            }
          </script>
        </body></html>
      `;
      
    case 4: // Cloudburst
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .radar { width: 150px; height: 150px; border-radius: 50%; border: 2px solid var(--primary); position: relative; overflow: hidden; background: rgba(0,0,0,0.5); box-shadow: 0 0 30px rgba(0,150,255,0.2); }
        .sweep { position: absolute; top: 0; left: 50%; width: 50%; height: 50%; background: linear-gradient(90deg, transparent, var(--primary)); transform-origin: bottom left; animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        </style></head><body>
          <div class="navbar"><h2>Meteorological Cloudburst Predictor</h2><div class="badge warn">Awaiting Scan</div></div>
          <div class="container grid">
            <div class="card anim d1" style="grid-column: span 2;">
              <div class="flex-between" style="margin-bottom: 20px;">
                <h3>Atmospheric Parameters</h3>
                <div class="radar"><div class="sweep"></div></div>
              </div>
              <div class="grid" style="grid-template-columns: repeat(4, 1fr); gap:15px;">
                <div><label style="color:var(--text-muted);font-size:0.9rem;text-transform:uppercase;">Temp (°C)</label><input type="number" class="input" value="34.5"></div>
                <div><label style="color:var(--text-muted);font-size:0.9rem;text-transform:uppercase;">Humidity (%)</label><input type="number" class="input" value="92.0"></div>
                <div><label style="color:var(--text-muted);font-size:0.9rem;text-transform:uppercase;">Wind (km/h)</label><input type="number" class="input" value="28.4"></div>
                <div><label style="color:var(--text-muted);font-size:0.9rem;text-transform:uppercase;">Pressure (hPa)</label><input type="number" class="input" value="998.2"></div>
              </div>
              <button class="btn" style="width:100%; margin-top:10px;" onclick="calc()">Initialize Doppler Analysis</button>
            </div>
            <div id="alert" class="card anim d2" style="display:none; grid-column: span 2; background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.5); box-shadow: inset 0 0 50px rgba(239, 68, 68, 0.1), 0 10px 40px rgba(239,68,68,0.2);">
              <h3 style="color:#f87171; display:flex; align-items:center; gap:10px;">
                <span style="font-size:2rem; animation: pulse 1s infinite;">⚠️</span> CRITICAL: CLOUDBURST IMMINENT
              </h3>
              <p style="font-size:1.1rem; color:#fca5a5;">Predictive models indicate a <strong>94.7% probability</strong> of severe localized precipitation within the next 45 minutes.</p>
              <div style="width:100%; height:8px; background:rgba(0,0,0,0.5); border-radius:4px; margin-top:20px; overflow:hidden;"><div style="width:94.7%; height:100%; background:#ef4444; box-shadow: 0 0 10px #ef4444;"></div></div>
            </div>
          </div>
          <script>function calc() { document.getElementById('alert').style.display='block'; }</script>
        </body></html>
      `;

    case 5: // Restaurant
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .menu-item { display:flex; padding:20px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border); transition:all 0.3s; }
        .menu-item:hover { background:rgba(255,255,255,0.05); transform:translateX(5px); border-color:var(--primary); }
        .price-tag { font-family:'Share Tech Mono'; font-size:1.4rem; color:var(--accent); font-weight:bold; }
        </style></head><body>
          <div class="navbar"><h2>Gourmet POS System</h2><div class="badge success" style="font-size:1rem;">Table #12</div></div>
          <div class="container grid" style="grid-template-columns: 2fr 1fr;">
            <div class="card anim d1">
              <h3>Digital Menu</h3>
              <div style="display:flex; flex-direction:column; gap:15px;">
                <div class="menu-item flex-between">
                  <div><div style="font-size:1.2rem;font-weight:600;color:#fff;">Truffle Risotto</div><p style="margin:5px 0 0 0;font-size:0.9rem;">Wild mushrooms, parmesan crisp</p></div>
                  <div style="display:flex; align-items:center; gap:20px;"><div class="price-tag">$24.00</div><button class="btn btn-outline" onclick="add('Truffle Risotto', 24.00)">+ ADD</button></div>
                </div>
                <div class="menu-item flex-between">
                  <div><div style="font-size:1.2rem;font-weight:600;color:#fff;">Wagyu Beef Burger</div><p style="margin:5px 0 0 0;font-size:0.9rem;">Caramelized onions, brioche bun</p></div>
                  <div style="display:flex; align-items:center; gap:20px;"><div class="price-tag">$18.50</div><button class="btn btn-outline" onclick="add('Wagyu Beef Burger', 18.50)">+ ADD</button></div>
                </div>
                <div class="menu-item flex-between">
                  <div><div style="font-size:1.2rem;font-weight:600;color:#fff;">Matcha Lava Cake</div><p style="margin:5px 0 0 0;font-size:0.9rem;">Vanilla bean ice cream</p></div>
                  <div style="display:flex; align-items:center; gap:20px;"><div class="price-tag">$12.00</div><button class="btn btn-outline" onclick="add('Matcha Lava Cake', 12.00)">+ ADD</button></div>
                </div>
              </div>
            </div>
            <div class="card anim d2" style="display:flex; flex-direction:column;">
              <h3>Current Ticket</h3>
              <div id="orderList" style="flex:1; overflow-y:auto; padding-right:10px; margin-bottom:20px;">
                <div style="color:var(--text-muted); text-align:center; padding:40px 0; font-style:italic;">Ticket is empty</div>
              </div>
              <div style="border-top:1px solid var(--border); padding-top:20px;">
                <div class="flex-between" style="font-size:1.2rem; margin-bottom:10px;"><span>Subtotal</span><span style="font-family:'Share Tech Mono'">$<span id="sub">0.00</span></span></div>
                <div class="flex-between" style="font-size:1.6rem; font-weight:bold; color:#fff; margin-bottom:20px;"><span>Total</span><span style="color:var(--primary); font-family:'Share Tech Mono'">$<span id="total">0.00</span></span></div>
                <button class="btn" style="width:100%; font-size:1.2rem; padding:18px;">Fire Order</button>
              </div>
            </div>
          </div>
          <script>
            let total = 0; let empty = true;
            function add(name, price) {
              if(empty) { document.getElementById('orderList').innerHTML = ''; empty = false; }
              total += price;
              document.getElementById('sub').innerText = total.toFixed(2);
              document.getElementById('total').innerText = total.toFixed(2);
              const div = document.createElement('div');
              div.style = "display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:10px;";
              div.innerHTML = \`<span style="color:#fff">\${name}</span><span style="font-family:'Share Tech Mono'; color:var(--accent);">$\${price.toFixed(2)}</span>\`;
              document.getElementById('orderList').appendChild(div);
            }
          </script>
        </body></html>
      `;

    case 6: // Parking
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .slot { height: 180px; border: 2px dashed rgba(255,255,255,0.2); border-radius: 12px; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; background:rgba(0,0,0,0.2); transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position:relative; overflow:hidden;}
        .slot:hover { border-color:var(--primary); background:rgba(255,255,255,0.05); }
        .slot span { font-family:'Share Tech Mono'; margin-bottom:10px; opacity:0.5; }
        .car-icon { font-size: 4rem; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) translateY(100px); opacity:0; transition:all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .occupied { border-color: #ef4444; border-style:solid; background:rgba(239, 68, 68, 0.05); }
        .occupied .car-icon { transform:translate(-50%,-50%); opacity:1; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); }
        .occupied span { color: #f87171; opacity:1; }
        .free span { color: #34d399; opacity:1; }
        </style></head><body>
          <div class="navbar"><h2>Valet Core Infrastructure</h2><div style="font-family:'Share Tech Mono'; font-size:1.2rem; color:var(--accent);">CAPACITY: <span id="av">12</span>/12</div></div>
          <div class="container">
            <div class="card anim d1" style="padding:40px;">
              <div class="grid" style="grid-template-columns: repeat(6, 1fr); gap:20px;">
                \${[1,2,3,4,5,6,7,8,9,10,11,12].map(i => \`
                  <div class="slot free" onclick="toggle(this)">
                    <span>ZONE-\${i.toString().padStart(2,'0')}</span>
                    <div class="car-icon">🏎️</div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>
          <script>
            let av = 12;
            function toggle(el) {
              if(el.classList.contains('free')) { el.classList.remove('free'); el.classList.add('occupied'); av--; }
              else { el.classList.remove('occupied'); el.classList.add('free'); av++; }
              document.getElementById('av').innerText = av;
            }
          </script>
        </body></html>
      `;

    case 7: // Tour Packages
    case 12: 
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .tour-img { height:200px; background:linear-gradient(45deg, #1a1a2e, #16213e); border-top-left-radius:15px; border-top-right-radius:15px; display:flex; align-items:center; justify-content:center; font-size:5rem; position:relative;}
        .tour-img::after { content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
        .tour-info { padding:25px; }
        </style></head><body>
          <div class="navbar"><h2>Global Explorer CMS</h2><button class="btn btn-outline" onclick="add()">+ Add Expedition</button></div>
          <div class="container grid" id="pkgGrid">
            <div class="card anim d1" style="padding:0; display:flex; flex-direction:column;">
              <div class="tour-img">🗻</div>
              <div class="tour-info">
                <div class="badge warn" style="margin-bottom:15px;">Trending</div>
                <h3>Mount Fuji Summit</h3>
                <p>Guided 7-day expedition to the iconic peak. Includes luxury basecamp accommodations.</p>
                <div class="flex-between" style="margin-top:20px; border-top:1px solid var(--border); padding-top:20px;">
                  <span style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold;">$3,450</span>
                  <button class="btn btn-outline" style="padding:8px 16px; border-color:#ef4444; color:#ef4444;" onclick="this.parentElement.parentElement.parentElement.remove()">Delete</button>
                </div>
              </div>
            </div>
            <div class="card anim d2" style="padding:0; display:flex; flex-direction:column;">
              <div class="tour-img">🏝️</div>
              <div class="tour-info">
                <div class="badge success" style="margin-bottom:15px;">Available</div>
                <h3>Bora Bora Retreat</h3>
                <p>10 days in an overwater bungalow. Private chef and scuba diving sessions included.</p>
                <div class="flex-between" style="margin-top:20px; border-top:1px solid var(--border); padding-top:20px;">
                  <span style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold;">$8,200</span>
                  <button class="btn btn-outline" style="padding:8px 16px; border-color:#ef4444; color:#ef4444;" onclick="this.parentElement.parentElement.parentElement.remove()">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <script>
            function add() {
              const div = document.createElement('div');
              div.className = "card anim"; div.style = "padding:0; display:flex; flex-direction:column;";
              div.innerHTML = \`<div class="tour-img">🗺️</div><div class="tour-info"><div class="badge" style="margin-bottom:15px;">Draft</div><h3>Custom Expedition</h3><p>Newly generated package schema. Awaiting content population and media assets.</p><div class="flex-between" style="margin-top:20px; border-top:1px solid var(--border); padding-top:20px;"><span style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold;">$0.00</span><button class="btn btn-outline" style="padding:8px 16px; border-color:#ef4444; color:#ef4444;" onclick="this.parentElement.parentElement.parentElement.remove()">Delete</button></div></div>\`;
              document.getElementById('pkgGrid').appendChild(div);
            }
          </script>
        </body></html>
      `;

    case 8: // CRUD E-Commerce Website
      return `
        <!DOCTYPE html><html><head><style>${baseCss}</style></head><body>
          <div class="navbar"><h2>OmniCommerce Admin Dashboard</h2><div class="badge success">Connected to DB</div></div>
          <div class="container">
            <div class="card anim d1 flex-between" style="margin-bottom:30px; background:rgba(255,255,255,0.02);">
              <div style="flex:1; margin-right:20px;"><label style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">Product Title</label><input type="text" id="pname" class="input" style="margin:0; width:100%;" placeholder="e.g. Mechanical Keyboard"></div>
              <div style="width:200px; margin-right:20px;"><label style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">Unit Price (USD)</label><input type="number" id="pprice" class="input" style="margin:0; width:100%;" placeholder="149.99"></div>
              <div style="width:150px; margin-right:20px;"><label style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">Stock</label><input type="number" id="pstock" class="input" style="margin:0; width:100%;" value="50"></div>
              <button class="btn" style="height:50px; align-self:flex-end;" onclick="add()">+ INJECT RECORD</button>
            </div>
            <div class="card anim d2" style="padding:0;">
              <table>
                <thead><tr><th>SKU / ID</th><th>Product Details</th><th>Price</th><th>Stock</th><th style="text-align:right;">Operations</th></tr></thead>
                <tbody id="tbody">
                  <tr><td>PRD-0001</td><td style="font-weight:600;color:#fff;">Razer DeathAdder V3</td><td style="font-family:'Share Tech Mono'">$69.99</td><td><span class="badge success">142</span></td><td style="text-align:right;"><button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem;">Edit</button> <button class="btn" style="padding:6px 12px; font-size:0.8rem; background:rgba(239, 68, 68, 0.2); color:#f87171;" onclick="this.parentElement.parentElement.remove()">Del</button></td></tr>
                  <tr><td>PRD-0002</td><td style="font-weight:600;color:#fff;">Sony WH-1000XM5</td><td style="font-family:'Share Tech Mono'">$348.00</td><td><span class="badge warn">12</span></td><td style="text-align:right;"><button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem;">Edit</button> <button class="btn" style="padding:6px 12px; font-size:0.8rem; background:rgba(239, 68, 68, 0.2); color:#f87171;" onclick="this.parentElement.parentElement.remove()">Del</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <script>
            let id = 3;
            function add() {
              const n = document.getElementById('pname').value || 'Generic Item';
              const p = document.getElementById('pprice').value || '0.00';
              const s = document.getElementById('pstock').value || '0';
              document.getElementById('tbody').innerHTML += \`<tr><td>PRD-000\${id++}</td><td style="font-weight:600;color:#fff;">\${n}</td><td style="font-family:'Share Tech Mono'">$\${parseFloat(p).toFixed(2)}</td><td><span class="badge success">\${s}</span></td><td style="text-align:right;"><button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem;">Edit</button> <button class="btn" style="padding:6px 12px; font-size:0.8rem; background:rgba(239, 68, 68, 0.2); color:#f87171;" onclick="this.parentElement.parentElement.remove()">Del</button></td></tr>\`;
            }
          </script>
        </body></html>
      `;

    case 9: // Pet Registration
      return `
        <!DOCTYPE html><html><head><style>${baseCss}</style></head><body>
          <div class="navbar"><h2>Bio-Tag Pet Portal</h2></div>
          <div class="container" style="max-width:450px; margin-top:50px;">
            <div class="card anim" id="loginForm" style="padding:40px;">
              <div style="text-align:center; font-size:3rem; margin-bottom:20px;">🐕</div>
              <h3 style="text-align:center; font-size:1.8rem;">Owner Authentication</h3>
              <input type="text" class="input" placeholder="Owner ID / Email" style="margin-top:20px;">
              <input type="password" class="input" placeholder="Security PIN">
              <button class="btn" style="width:100%; margin-top:10px;" onclick="document.getElementById('loginForm').style.display='none'; document.getElementById('regForm').style.display='block'">Initiate Login</button>
              <div style="text-align:center; margin-top:25px; color:var(--text-muted); font-size:0.9rem;">New subject? <span style="color:var(--primary); cursor:pointer; font-weight:bold;" onclick="document.getElementById('loginForm').style.display='none'; document.getElementById('regForm').style.display='block'">Register Bio-Tag</span></div>
            </div>
            
            <div class="card" id="regForm" style="display:none; padding:40px;">
              <h3 style="margin-bottom:30px;">New Subject Registration</h3>
              <input type="text" class="input" placeholder="Subject Name">
              <select class="input"><option>Canine (Dog)</option><option>Feline (Cat)</option><option>Avian (Bird)</option><option>Exotic</option></select>
              <div style="display:flex; gap:15px;">
                <input type="text" class="input" placeholder="Breed/Species">
                <input type="number" class="input" placeholder="Age (Yrs)" style="width:100px;">
              </div>
              <button class="btn" style="width:100%; margin-top:20px;" onclick="document.getElementById('regForm').style.display='none'; document.getElementById('dash').style.display='block'">Encode Bio-Tag & Register</button>
            </div>
            
            <div class="card" id="dash" style="display:none; text-align:center; padding:50px;">
              <div style="font-size:5rem; margin-bottom:20px; animation: fadeInUp 0.5s;">✅</div>
              <h3 style="color:var(--primary); font-size:2rem;">Registration Complete</h3>
              <p style="font-size:1.1rem;">Subject data has been securely written to the central database. The physical Bio-Tag will be dispatched shortly.</p>
              <div class="badge success" style="margin-top:20px; font-size:1rem; padding:10px 20px;">ID: SUB-99482A</div>
            </div>
          </div>
        </body></html>
      `;

    case 10: // Hotel Management
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .room { border:1px solid var(--border); border-radius:12px; padding:25px; text-align:center; background:rgba(0,0,0,0.2); transition:all 0.3s; position:relative; overflow:hidden;}
        .room::before { content:''; position:absolute; top:0; left:0; width:100%; height:4px; transition:all 0.3s;}
        .room h3 { font-size:1.8rem; margin:0 0 5px 0; color:#fff; }
        .r-free::before { background:#10b981; box-shadow: 0 0 15px #10b981; }
        .r-occ::before { background:#ef4444; box-shadow: 0 0 15px #ef4444; }
        .r-occ { background:rgba(239, 68, 68, 0.05); border-color:rgba(239, 68, 68, 0.2); }
        </style></head><body>
          <div class="navbar"><h2>Grand Horizon Suite Manager</h2><div style="display:flex;gap:15px;"><div class="badge success">2 Available</div><div class="badge danger">1 Occupied</div></div></div>
          <div class="container grid">
            <div class="card anim d1 room r-free" id="r101">
              <h3>Suite 101</h3><p style="color:#34d399; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Status: Vacant</p>
              <div style="margin:20px 0; color:var(--text-muted); font-size:0.9rem;">King Bed • Ocean View</div>
              <button class="btn" style="width:100%; background:rgba(16,185,129,0.2); color:#34d399; box-shadow:none; border:1px solid rgba(16,185,129,0.5);" onclick="checkin('r101')">Process Check-in</button>
            </div>
            <div class="card anim d2 room r-occ" id="r102">
              <h3>Suite 102</h3><p style="color:#f87171; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Status: Occupied</p>
              <div style="margin:20px 0; color:var(--text-muted); font-size:0.9rem;">Queen Bed • City View</div>
              <button class="btn" style="width:100%; background:rgba(239,68,68,0.2); color:#f87171; box-shadow:none; border:1px solid rgba(239,68,68,0.5);" onclick="checkout('r102')">Process Check-out</button>
            </div>
            <div class="card anim d3 room r-free" id="r103">
              <h3>Suite 103</h3><p style="color:#34d399; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Status: Vacant</p>
              <div style="margin:20px 0; color:var(--text-muted); font-size:0.9rem;">Penthouse • Panoramic</div>
              <button class="btn" style="width:100%; background:rgba(16,185,129,0.2); color:#34d399; box-shadow:none; border:1px solid rgba(16,185,129,0.5);" onclick="checkin('r103')">Process Check-in</button>
            </div>
          </div>
          <script>
            function checkin(id) {
              const r = document.getElementById(id);
              r.className = 'card room r-occ';
              r.querySelector('p').style.color = '#f87171'; r.querySelector('p').innerText = 'STATUS: OCCUPIED';
              r.querySelector('button').outerHTML = '<button class="btn" style="width:100%; background:rgba(239,68,68,0.2); color:#f87171; box-shadow:none; border:1px solid rgba(239,68,68,0.5);" onclick="checkout(\\''+id+'\\')">Process Check-out</button>';
            }
            function checkout(id) {
              const r = document.getElementById(id);
              r.className = 'card room r-free';
              r.querySelector('p').style.color = '#34d399'; r.querySelector('p').innerText = 'STATUS: VACANT';
              r.querySelector('button').outerHTML = '<button class="btn" style="width:100%; background:rgba(16,185,129,0.2); color:#34d399; box-shadow:none; border:1px solid rgba(16,185,129,0.5);" onclick="checkin(\\''+id+'\\')">Process Check-in</button>';
            }
          </script>
        </body></html>
      `;

    case 11: // Quiz System
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .opt { display:block; padding:20px 25px; margin:15px 0; border:1px solid var(--border); border-radius:12px; cursor:pointer; background:rgba(0,0,0,0.3); font-size:1.1rem; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position:relative; overflow:hidden;}
        .opt:hover { border-color:var(--primary); background:rgba(255,255,255,0.05); transform:translateX(10px); }
        .opt::before { content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--primary); opacity:0; transition:opacity 0.3s; }
        .opt:hover::before { opacity:1; }
        </style></head><body>
          <div class="navbar"><h2>🕸️ Multiverse Trivia Interface</h2><div class="badge" style="background:#cc1f1f; border-color:#ff4d4d; color:#fff;">Score: 0/1</div></div>
          <div class="container" style="max-width:800px; margin-top:40px;">
            <div class="card anim" id="qbox" style="padding:50px;">
              <div style="font-family:'Share Tech Mono'; color:var(--primary); margin-bottom:15px; letter-spacing:2px;">QUESTION 01</div>
              <h3 style="font-size:2rem; line-height:1.4; margin-bottom:40px;">What is the true civilian identity of the hero known as Spider-Man?</h3>
              <div class="opt d1 anim" onclick="ans(false)">A) Bruce Wayne</div>
              <div class="opt d2 anim" onclick="ans(true)">B) Peter Parker</div>
              <div class="opt d3 anim" onclick="ans(false)">C) Clark Kent</div>
              <div class="opt anim" style="animation-delay:0.4s" onclick="ans(false)">D) Tony Stark</div>
            </div>
          </div>
          <script>
            function ans(correct) {
              const qbox = document.getElementById('qbox');
              if(correct) {
                qbox.innerHTML = "<div style='text-align:center; padding:40px 0;'><div style='font-size:6rem; margin-bottom:20px; animation:fadeInUp 0.5s;'>🎯</div><h3 style='color:#34d399; font-size:2.5rem;' class='glow-text'>CORRECT OVERRIDE</h3><p style='font-size:1.2rem; color:var(--text-muted); margin-bottom:40px;'>Identity confirmed. Welcome to the Spider-Verse.</p><button class='btn' onclick='location.reload()'>Initialize Next Sequence</button></div>";
                document.querySelector('.badge').innerText = 'Score: 1/1';
              } else {
                qbox.style.animation = 'none'; qbox.offsetHeight; /* trigger reflow */ 
                qbox.style.border = '1px solid #ef4444'; qbox.style.boxShadow = '0 0 30px rgba(239,68,68,0.3)';
                setTimeout(() => alert("ACCESS DENIED: Incorrect entry."), 100);
              }
            }
          </script>
        </body></html>
      `;

    case 13: // Employee Task Management System
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .task { border-left:4px solid var(--primary); padding:20px 25px; background:rgba(255,255,255,0.02); margin-bottom:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); border-right:1px solid var(--border); border-bottom:1px solid var(--border); transition:all 0.4s; }
        .task:hover { background:rgba(255,255,255,0.05); transform:translateX(5px); }
        .done { border-left-color: rgba(255,255,255,0.1); opacity:0.4; }
        .done .task-title { text-decoration:line-through; }
        .avatar { width:40px; height:40px; border-radius:50%; background:var(--surface-hover); display:flex; align-items:center; justify-content:center; font-weight:bold; color:#fff; margin-right:15px; border:1px solid var(--border);}
        </style></head><body>
          <div class="navbar"><h2>Corporate Task Matrix</h2></div>
          <div class="container">
            <div class="card anim d1" style="display:flex; gap:20px; background:rgba(0,0,0,0.4); border:none; box-shadow:inset 0 0 20px rgba(0,0,0,1);">
              <input type="text" id="tname" class="input" style="margin:0; flex:2;" placeholder="Define objective directive...">
              <select id="emp" class="input" style="margin:0; flex:1;">
                <option value="A">Alice (Frontend)</option>
                <option value="B">Bob (Backend)</option>
                <option value="C">Charlie (DevOps)</option>
              </select>
              <button class="btn" style="flex:1;" onclick="assign()">+ Delegate</button>
            </div>
            
            <h3 style="margin-top:40px; margin-bottom:20px; color:var(--text-muted); font-size:1.1rem; text-transform:uppercase; letter-spacing:2px;">Active Directives</h3>
            <div id="tlist">
              <div class="task anim d2">
                <div style="display:flex; align-items:center;">
                  <div class="avatar">A</div>
                  <div><strong class="task-title" style="font-size:1.2rem; color:#fff;">Optimize React Render Cycles</strong><br/><span style="font-family:'Share Tech Mono'; color:var(--text-muted); font-size:0.9rem;">Assigned: Alice</span></div>
                </div>
                <button class="btn btn-outline" style="border-color:#34d399; color:#34d399;" onclick="this.parentElement.classList.add('done'); this.innerText='VERIFIED'; this.disabled=true;">Resolve</button>
              </div>
              <div class="task anim d3">
                <div style="display:flex; align-items:center;">
                  <div class="avatar">C</div>
                  <div><strong class="task-title" style="font-size:1.2rem; color:#fff;">Configure Kubernetes Cluster</strong><br/><span style="font-family:'Share Tech Mono'; color:var(--text-muted); font-size:0.9rem;">Assigned: Charlie</span></div>
                </div>
                <button class="btn btn-outline" style="border-color:#34d399; color:#34d399;" onclick="this.parentElement.classList.add('done'); this.innerText='VERIFIED'; this.disabled=true;">Resolve</button>
              </div>
            </div>
          </div>
          <script>
            function assign() {
              const t = document.getElementById('tname').value || 'Unspecified Objective';
              const s = document.getElementById('emp');
              const name = s.options[s.selectedIndex].text.split(' ')[0];
              const letter = s.value;
              const html = \`<div class="task anim"><div style="display:flex; align-items:center;"><div class="avatar">\${letter}</div><div><strong class="task-title" style="font-size:1.2rem; color:#fff;">\${t}</strong><br/><span style="font-family:'Share Tech Mono'; color:var(--text-muted); font-size:0.9rem;">Assigned: \${name}</span></div></div><button class="btn btn-outline" style="border-color:#34d399; color:#34d399;" onclick="this.parentElement.classList.add('done'); this.innerText='VERIFIED'; this.disabled=true;">Resolve</button></div>\`;
              document.getElementById('tlist').insertAdjacentHTML('afterbegin', html);
              document.getElementById('tname').value = '';
            }
          </script>
        </body></html>
      `;

    case 14: // GoodGrocery
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .g-card { text-align:center; padding:30px 20px; border-radius:16px; background:linear-gradient(to bottom, rgba(255,255,255,0.05), transparent); border:1px solid var(--border); transition:transform 0.3s; }
        .g-card:hover { transform:translateY(-10px); border-color:var(--primary); box-shadow:0 15px 30px rgba(0,0,0,0.4); }
        .g-img { font-size:5rem; margin-bottom:20px; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); transition:transform 0.3s;}
        .g-card:hover .g-img { transform:scale(1.1); }
        </style></head><body>
          <div class="navbar"><h2>GrocerFast Network</h2>
            <div style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); padding:10px 20px; border-radius:30px; font-weight:bold; display:flex; align-items:center; gap:10px;">
              🛒 <span style="font-family:'Share Tech Mono'; font-size:1.2rem; color:#fff;" id="cart">₹0.00</span>
            </div>
          </div>
          <div class="container grid">
            <div class="g-card anim d1"><div class="g-img">🍎</div><h4 style="font-size:1.2rem; margin:0 0 5px 0;">Organic Apples</h4><p style="color:var(--text-muted); margin:0 0 20px 0;">1kg Premium Pack</p><div style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold; margin-bottom:20px;">₹180</div><button class="btn" style="width:100%" onclick="add(180)">+ Add to Cart</button></div>
            <div class="g-card anim d2"><div class="g-img">🍞</div><h4 style="font-size:1.2rem; margin:0 0 5px 0;">Whole Wheat Bread</h4><p style="color:var(--text-muted); margin:0 0 20px 0;">Freshly Baked, 400g</p><div style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold; margin-bottom:20px;">₹55</div><button class="btn" style="width:100%" onclick="add(55)">+ Add to Cart</button></div>
            <div class="g-card anim d3"><div class="g-img">🥛</div><h4 style="font-size:1.2rem; margin:0 0 5px 0;">Farm Milk</h4><p style="color:var(--text-muted); margin:0 0 20px 0;">1 Liter Tetrapack</p><div style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold; margin-bottom:20px;">₹72</div><button class="btn" style="width:100%" onclick="add(72)">+ Add to Cart</button></div>
            <div class="g-card anim" style="animation-delay:0.4s"><div class="g-img">🥚</div><h4 style="font-size:1.2rem; margin:0 0 5px 0;">Free Range Eggs</h4><p style="color:var(--text-muted); margin:0 0 20px 0;">Pack of 6</p><div style="font-family:'Share Tech Mono'; font-size:1.5rem; color:#fff; font-weight:bold; margin-bottom:20px;">₹90</div><button class="btn" style="width:100%" onclick="add(90)">+ Add to Cart</button></div>
          </div>
          <script>
            let total = 0;
            function add(p) { 
              total+=p; 
              const cart = document.getElementById('cart');
              cart.innerText = '₹' + total.toFixed(2); 
              cart.style.color = 'var(--primary)';
              setTimeout(()=>cart.style.color='#fff', 200);
            }
          </script>
        </body></html>
      `;

    case 15: // Blog Platform
      return `
        <!DOCTYPE html><html><head><style>${baseCss}
        .blog-post { padding: 30px; border-bottom: 1px solid var(--border); transition:background 0.3s;}
        .blog-post:hover { background:rgba(255,255,255,0.02); }
        .blog-post h3 { font-size:1.8rem; color: #fff; cursor: pointer; transition:color 0.2s; margin-bottom:10px; line-height:1.3;}
        .blog-post h3:hover { color: var(--primary); text-decoration: none; }
        </style></head><body>
          <div class="navbar"><h2>Neuro-Link Publishing</h2><div class="badge success">Writer Access Granted</div></div>
          <div class="container grid" style="grid-template-columns: 1fr 2fr; gap:40px;">
            <div style="position:sticky; top:120px; height:max-content;">
              <h3 style="margin-bottom:20px; color:var(--text-muted); text-transform:uppercase; font-size:1rem; letter-spacing:2px;">Compose Transmission</h3>
              <input type="text" id="btitle" class="input" placeholder="Enter Headline..." style="font-size:1.2rem; font-weight:bold; padding:20px;">
              <textarea id="bcontent" class="input" style="height:200px; resize:none; font-family:'Inter'; line-height:1.6;" placeholder="Start writing the content of your transmission..."></textarea>
              <button class="btn" style="width:100%; padding:18px; font-size:1.2rem;" onclick="post()">Publish to Network</button>
            </div>
            <div class="card anim d2" id="feed" style="padding:0; overflow:hidden;">
              <div class="blog-post">
                <div style="font-family:'Share Tech Mono'; color:var(--primary); margin-bottom:10px;">AUTHOR: ADMIN_PRIME // TIME: T-MINUS 2 HOURS</div>
                <h3 onclick="alert('Decrypting full article transmission...')">10 Optimizations for Next-Gen Neural Interfaces</h3>
                <p style="font-size:1.1rem; color:var(--text-muted); line-height:1.8; margin-bottom:0;">The integration of organic code into artificial frameworks has always been challenging. In this log, we explore the top ten efficiency improvements...</p>
              </div>
            </div>
          </div>
          <script>
            function post() {
              const t = document.getElementById('btitle').value || 'Encrypted File Log';
              const c = document.getElementById('bcontent').value || 'No content found in transmission stream...';
              const html = \`<div class="blog-post anim"><div style="font-family:'Share Tech Mono'; color:var(--accent); margin-bottom:10px;">AUTHOR: GUEST_USER // TIME: JUST NOW</div><h3 onclick="alert('Decrypting full article transmission...')">\${t}</h3><p style="font-size:1.1rem; color:var(--text-muted); line-height:1.8; margin-bottom:0;">\${c}</p></div>\`;
              document.getElementById('feed').insertAdjacentHTML('afterbegin', html);
              document.getElementById('btitle').value = ''; document.getElementById('bcontent').value = '';
            }
          </script>
        </body></html>
      `;

    default: // Generic Fallback
      return `
        <!DOCTYPE html><html><head><style>${baseCss}</style></head><body style="display:flex; justify-content:center; align-items:center;">
          <div class="card anim" style="text-align:center; padding:60px; max-width:600px;">
            <div style="font-size:4rem; margin-bottom:20px; color:var(--primary);">🚧</div>
            <h2 style="font-family:'Rajdhani'; font-size:2.5rem; margin-top:0; text-transform:uppercase;">Simulation Offline</h2>
            <p style="font-size:1.2rem; line-height:1.6;">This sector is currently undergoing neural recalibration. The interactive environment will be restored in the next deployment cycle.</p>
            <div style="width:100%; height:4px; background:rgba(255,255,255,0.1); margin-top:40px; position:relative; overflow:hidden;">
              <div style="position:absolute; top:0; left:0; height:100%; width:30%; background:var(--primary); animation: load 2s infinite ease-in-out;"></div>
            </div>
          </div>
          <style>@keyframes load { 0% { left:-30%; } 100% { left:100%; } }</style>
        </body></html>
      `;
  }
}

function ProjectCard({ project, index, inView, setActiveProject }: {
  project: typeof projects[0]; index: number; inView: boolean; setActiveProject: (p: any) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, shine: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: -(y - 0.5) * 15, y: (x - 0.5) * 15, glareX: x * 100, glareY: y * 100, shine: 0.25 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, shine: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          background: "transparent",
          padding: "32px 28px",
          position: "relative",
          overflow: "visible", // change to visible to allow webs to spill
          transition: "box-shadow 0.3s ease",
          boxShadow: hovered ? `0 20px 60px ${project.color}15` : "none",
          height: "100%",
        }}
      >
        {/* Top accent line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${project.color}, ${project.accent})`,
            transformOrigin: "left",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,${tilt.shine}), transparent 60%)`,
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 10,
          }}
        />

        {/* Project Card Internal Tech Grid & Glow */}
        <div 
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-20%",
            width: "60%",
            height: "60%",
            background: `radial-gradient(circle, ${project.color}15 0%, transparent 60%)`,
            border: `1px solid ${project.color}30`,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "scale(1.5)",
            filter: "blur(20px)",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.4s ease",
          }}
        />
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundSize: "20px 20px",
            backgroundImage: `linear-gradient(${project.color}0A 1px, transparent 1px), linear-gradient(90deg, ${project.color}0A 1px, transparent 1px)`,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}20, transparent 70%)`,
            pointerEvents: "none",
            transition: "opacity 0.3s ease",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            {('freelance' in project && project.freelance) && (
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                color: "#10b981",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "3px 8px",
                borderRadius: 12,
                display: "inline-block",
                marginBottom: 8,
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}>
                ✦ Freelance Project
              </span>
            )}
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              color: project.color,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}>
              {project.category} · {project.year}
            </span>
            <h3 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#f0e6ff",
              letterSpacing: "0.03em",
            }}>
              {project.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            style={{ color: project.color, fontSize: "1.2rem", transition: "color 0.3s" }}
          >
            ↗
          </motion.div>
        </div>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.875rem",
          color: "rgba(240,230,255,0.6)",
          lineHeight: 1.75,
          marginBottom: 24,
        }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                color: project.accent,
                background: `${project.color}15`,
                border: `1px solid ${project.color}25`,
                borderRadius: 4,
                padding: "3px 10px",
                letterSpacing: "0.05em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons with Micro Interactions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", gap: 12, marginTop: "auto" }}
        >
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveProject(project); }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 16px",
              background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
              borderRadius: 8,
              color: "#fff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: `0 4px 15px ${project.color}40`,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Live Demo
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid rgba(255,255,255,0.1)`,
              borderRadius: 8,
              color: "#f0e6ff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = project.color;
              (e.currentTarget as HTMLElement).style.background = `${project.color}20`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            }}
          >
            Contact to get info
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const categories = ["All", "Machine Learning", "Full Stack", "Web App", "Corporate Web App", "Mobile App"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  const visibleProjects = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
      >
        <div style={{ width: 40, height: 1, background: "#cc1f1f" }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#cc1f1f", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          04 / PROJECTS
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#f0e6ff",
          marginBottom: 40,
        }}
      >
        Recent{" "}
        <span style={{
          background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Missions
        </span>
      </motion.h2>

      {/* Floating Glowing Spider Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
        animate={inView ? { opacity: 0.2, scale: 1, rotateZ: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "400px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img src="/images/glowing_spider.png" alt="Glowing Spider Emblem" style={{ width: "100%", height: "auto", mixBlendMode: "screen" }} />
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setShowAll(false); }}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "7px 16px",
              background: filter === cat ? "#cc1f1f" : "rgba(204,31,31,0.08)",
              border: `1px solid ${filter === cat ? "#cc1f1f" : "rgba(204,31,31,0.2)"}`,
              borderRadius: 4,
              color: filter === cat ? "#fff" : "rgba(240,230,255,0.6)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} setActiveProject={setActiveProject} />
          ))}
        </AnimatePresence>
      </div>

      {/* View More / Less Button */}
      {filtered.length > 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 48 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: "12px 32px",
              background: "transparent",
              border: "1px solid #cc1f1f",
              borderRadius: "8px",
              color: "#f0e6ff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: showAll ? "0 0 15px rgba(204,31,31,0.2)" : "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(204,31,31,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(204,31,31,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = showAll ? "0 0 15px rgba(204,31,31,0.2)" : "none";
            }}
          >
            {showAll ? "View Less Missions" : "View All Missions"}
          </button>
        </motion.div>
      )}

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 800,
                background: "rgba(20,0,30,0.9)",
                border: `1px solid ${activeProject.color}40`,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: `0 20px 60px ${activeProject.color}30`,
              }}
            >
              <div style={{
                background: `linear-gradient(90deg, ${activeProject.color}20, transparent)`,
                padding: "16px 24px",
                borderBottom: `1px solid ${activeProject.color}30`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#f0e6ff",
                  margin: 0,
                }}>
                  {activeProject.title} <span style={{ color: activeProject.color, fontSize: "1rem" }}>/ Interactive Demo</span>
                </h3>
                <button
                  onClick={() => setActiveProject(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
              {/* If project has a liveUrl, render an iframe. Otherwise, show the spinner. */}
              {/* Note: In TypeScript, we check if liveUrl exists. The initial type of projects doesn't mandate liveUrl, so we cast or optionally chain. */}
              {'liveUrl' in activeProject && typeof activeProject.liveUrl === 'string' ? (
                <div style={{ width: "100%", height: "500px", background: "#000", position: "relative" }}>
                  <iframe 
                    src={activeProject.liveUrl} 
                    style={{ width: "100%", height: "100%", border: "none" }} 
                    title={activeProject.title} 
                  />
                </div>
              ) : (
                <div style={{ width: "100%", height: "500px", background: "#f4f7f6", position: "relative" }}>
                  <iframe 
                    srcDoc={getInteractiveMockup(activeProject)}
                    style={{ width: "100%", height: "100%", border: "none" }} 
                    title={`${activeProject.title} Simulation`} 
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

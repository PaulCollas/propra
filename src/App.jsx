import { useState, useEffect, useRef, useCallback } from "react";
import logoSrc from "./assets/logo-propra.png";

/* ─── ReactBits-inspired animations (inline implementations) ─── */

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
}

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

function SparkLine({ data, color = "#2dd4bf", height = 48 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarBorder({ children, color = "#2dd4bf", speed = "4s" }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", borderRadius: 10, overflow: "hidden", padding: "1px" }}>
      <style>{`
        @keyframes borderSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .star-inner { position: relative; z-index: 1; border-radius: 9px; }
        .star-bg { position: absolute; inset: 0; border-radius: 10px; }
        .star-spin { position: absolute; inset: -50%; animation: borderSpin ${speed} linear infinite;
          background: conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg); border-radius: 50%; }
        .star-mask { position: absolute; inset: 1px; border-radius: 9px; background: #0f172a; z-index: 0; }
      `}</style>
      <div className="star-bg"><div className="star-spin" /></div>
      <div className="star-mask" />
      <div className="star-inner">{children}</div>
    </div>
  );
}

function ClickSpark({ children, sparkColor = "#f97316" }) {
  const ref = useRef(null);
  const handleClick = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement("span");
      const angle = (i / 8) * Math.PI * 2;
      const dist = 28 + Math.random() * 16;
      spark.style.cssText = `position:absolute;width:5px;height:5px;border-radius:50%;background:${sparkColor};left:${x}px;top:${y}px;pointer-events:none;z-index:99;transition:all 0.4s ease-out;`;
      ref.current.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px)`;
        spark.style.opacity = "0";
      });
      setTimeout(() => spark.remove(), 450);
    }
  }, [sparkColor]);
  return <div ref={ref} style={{ position: "relative", display: "inline-block" }} onClick={handleClick}>{children}</div>;
}

function ShimmerText({ text, color = "#2dd4bf" }) {
  return (
    <>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:200% center} 50%{background-position:-200% center} }
        .shimmer-txt { background: linear-gradient(90deg, ${color} 0%, #fff 40%, ${color} 80%);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: shimmer 3s linear infinite; }
      `}</style>
      <span className="shimmer-txt">{text}</span>
    </>
  );
}

function AuroraBackground() {
  return (
    <>
      <style>{`
        @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.1)} }
        @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.15)} }
        @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,20px) scale(0.95)} }
        .aurora-blob { position:absolute; border-radius:50%; filter:blur(80px); opacity:0.18; }
      `}</style>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div className="aurora-blob" style={{ width: 500, height: 400, background: "#2dd4bf", top: -100, left: -100, animation: "aurora1 8s ease-in-out infinite" }} />
        <div className="aurora-blob" style={{ width: 400, height: 500, background: "#0ea5e9", top: 100, right: -80, animation: "aurora2 10s ease-in-out infinite" }} />
        <div className="aurora-blob" style={{ width: 350, height: 350, background: "#f97316", bottom: 50, left: "40%", animation: "aurora3 12s ease-in-out infinite" }} />
      </div>
    </>
  );
}

/* ─── Data ─── */
const PROPERTIES = [
  { id: 1, name: "Résidence Les Tilleuls", type: "Appartement", address: "12 rue du Moulin, Paris 15e", tenants: 3, rent: 3450, status: "ok", img: "🏢", sparkData: [3200, 3300, 3250, 3400, 3450, 3450, 3450] },
  { id: 2, name: "Villa Soleil", type: "Maison", address: "8 allée des Pins, Biarritz", tenants: 1, rent: 1850, status: "alert", img: "🏠", sparkData: [1800, 1800, 1750, 1850, 0, 1850, 1850] },
  { id: 3, name: "Bureaux Montmartre", type: "Commercial", address: "45 rue Lepic, Paris 18e", tenants: 2, rent: 4200, status: "ok", img: "🏗️", sparkData: [4000, 4100, 4200, 4200, 4200, 4200, 4200] },
  { id: 4, name: "Studio Gambetta", type: "Appartement", address: "3 rue des Pyrénées, Paris 20e", tenants: 1, rent: 790, status: "ok", img: "🏘️", sparkData: [750, 760, 780, 790, 790, 790, 790] },
];

const TENANTS = [
  { id: 1, name: "Marie Dupont", property: "Résidence Les Tilleuls — Apt. 4B", rent: 1150, status: "ok", avatar: "MD", since: "Jan 2023" },
  { id: 2, name: "Jean-Pierre Moreau", property: "Villa Soleil", rent: 1850, status: "late", avatar: "JM", since: "Mar 2022" },
  { id: 3, name: "Société TECLAB", property: "Bureaux Montmartre — Bureau A", rent: 2100, status: "ok", avatar: "TL", since: "Sep 2021" },
  { id: 4, name: "Léa Fontaine", property: "Studio Gambetta", rent: 790, status: "ok", avatar: "LF", since: "Jun 2024" },
];

const TASKS = [
  { id: 1, title: "Changer joint robinet", property: "Villa Soleil", priority: "high", due: "Demain", icon: "🔧" },
  { id: 2, title: "Révision chaudière", property: "Résidence Les Tilleuls", priority: "mid", due: "15 avr.", icon: "🔥" },
  { id: 3, title: "Peinture cage escalier", property: "Bureaux Montmartre", priority: "low", due: "30 avr.", icon: "🎨" },
  { id: 4, title: "Contrôle détecteurs fumée", property: "Studio Gambetta", priority: "mid", due: "20 avr.", icon: "🚨" },
];

/* ─── Sub-components ─── */
const ACCENT = "#2dd4bf";
const ORANGE = "#f97316";

function Sidebar({ active, setActive }) {
  const nav = [
    { id: "dashboard", icon: "⬡", label: "Tableau de bord" },
    { id: "properties", icon: "🏢", label: "Biens" },
    { id: "tenants", icon: "👥", label: "Locataires" },
    { id: "finance", icon: "💰", label: "Finances" },
    { id: "tasks", icon: "✓", label: "Tâches" },
  ];
  return (
    <aside style={{ width: 220, background: "#0a0f1e", borderRight: "1px solid #1e2a3a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
      <div style={{ padding: "0 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logoSrc} alt="Propra logo" style={{ width: 100, objectFit: "cover" }} />
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        {nav.map(({ id, icon, label }) => (
          <button key={id} onClick={() => setActive(id)} style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 20px",
            background: active === id ? "rgba(45,212,191,0.1)" : "transparent",
            border: "none", borderLeft: active === id ? `3px solid ${ACCENT}` : "3px solid transparent",
            color: active === id ? ACCENT : "#6b7a8f", cursor: "pointer", fontSize: 14,
            transition: "all 0.2s", textAlign: "left", fontFamily: "'Poppins', sans-serif"
          }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: "1px solid #1e2a3a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>AC</div>
          <div>
            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>Alexandre C.</div>
            <div style={{ fontSize: 11, color: "#4b5563" }}>Propriétaire</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, suffix = "", icon, color, delay, spark }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "#6b7a8f", marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>
            <AnimatedCounter value={value} suffix={suffix} />
          </div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
      </div>
      {spark && <SparkLine data={spark} color={color} height={40} />}
    </div>
  );
}

function Dashboard() {
  const h1 = useFadeIn(0);
  return (
    <div style={{ padding: "32px 36px", overflow: "auto", flex: 1 }}>
      <div ref={h1} style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", margin: 0 }}>
          Bonjour, <ShimmerText text="Alexandre" color={ACCENT} /> 👋
        </h1>
        <p style={{ color: "#6b7a8f", margin: "6px 0 0", fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Voici un aperçu de votre portefeuille immobilier.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Biens gérés" value={4} icon="🏢" color={ACCENT} delay={60} spark={[3,3,4,4,4,4,4]} />
        <StatCard label="Loyers / mois" value={10290} suffix=" €" icon="💶" color="#0ea5e9" delay={120} spark={[9800,9900,10100,10200,10290,10290,10290]} />
        <StatCard label="Locataires actifs" value={7} icon="👥" color="#a78bfa" delay={180} spark={[5,6,6,7,7,7,7]} />
        <StatCard label="Tâches en cours" value={4} icon="🔧" color={ORANGE} delay={240} spark={[2,3,3,5,4,4,4]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        <div style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "22px 24px" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 18, fontFamily: "'Montserrat', sans-serif" }}>Biens récents</div>
          {PROPERTIES.slice(0, 3).map((p, i) => {
            const ref = useFadeIn(300 + i * 80);
            return (
              <div key={p.id} ref={ref} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 2 ? "1px solid #1e2a3a" : "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "#131f34", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#4b5563" }}>{p.address}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT, fontFamily: "'Montserrat', sans-serif" }}>{p.rent.toLocaleString()} €</div>
                  <div style={{ fontSize: 11, color: p.status === "ok" ? "#22c55e" : ORANGE }}>{p.status === "ok" ? "✓ OK" : "⚠ Alerte"}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "22px 24px" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 18, fontFamily: "'Montserrat', sans-serif" }}>Tâches urgentes</div>
          {TASKS.filter(t => t.priority !== "low").map((t, i) => {
            const ref = useFadeIn(350 + i * 80);
            return (
              <div key={t.id} ref={ref} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 1 ? "1px solid #1e2a3a" : "none" }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "'Poppins', sans-serif" }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: "#4b5563" }}>{t.property}</div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                  background: t.priority === "high" ? "#ef444422" : "#f9731622",
                  color: t.priority === "high" ? "#ef4444" : ORANGE
                }}>{t.due}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Properties() {
  const [selected, setSelected] = useState(null);
  const h = useFadeIn(0);
  return (
    <div style={{ padding: "32px 36px", overflow: "auto", flex: 1 }}>
      <div ref={h} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Mes biens</h1>
          <p style={{ color: "#6b7a8f", margin: "4px 0 0", fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>{PROPERTIES.length} propriétés dans votre portefeuille</p>
        </div>
        <ClickSpark sparkColor={ACCENT}>
          <StarBorder color={ACCENT} speed="3s">
            <button style={{ background: "transparent", border: "none", color: ACCENT, fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, padding: "10px 20px", cursor: "pointer" }}>+ Ajouter un bien</button>
          </StarBorder>
        </ClickSpark>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
        {PROPERTIES.map((p, i) => {
          const ref = useFadeIn(i * 80);
          return (
            <div key={p.id} ref={ref} onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{ background: "#0d1526", border: `1px solid ${selected === p.id ? ACCENT : "#1e2a3a"}`, borderRadius: 16, padding: "22px 24px", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", transform: selected === p.id ? "scale(1.01)" : "scale(1)" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "#131f34", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{p.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#4b5563", margin: "3px 0" }}>{p.address}</div>
                  <span style={{ fontSize: 11, background: "#1e2a3a", color: ACCENT, padding: "2px 8px", borderRadius: 5 }}>{p.type}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: ACCENT, fontFamily: "'Montserrat', sans-serif" }}>{p.rent.toLocaleString()} €</div>
                  <div style={{ fontSize: 11, color: "#6b7a8f" }}>/mois</div>
                </div>
              </div>
              {selected === p.id && (
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #1e2a3a", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#6b7a8f", marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>Locataires</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{p.tenants}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#6b7a8f", marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>Statut</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: p.status === "ok" ? "#22c55e" : ORANGE }}>{p.status === "ok" ? "✓ OK" : "⚠ Alerte"}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#6b7a8f", marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>Annuel</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa" }}>{(p.rent * 12).toLocaleString()} €</div>
                  </div>
                  <div style={{ gridColumn: "span 3" }}>
                    <div style={{ fontSize: 11, color: "#6b7a8f", marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>Tendance des loyers</div>
                    <SparkLine data={p.sparkData} color={ACCENT} height={44} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tenants() {
  const h = useFadeIn(0);
  return (
    <div style={{ padding: "32px 36px", overflow: "auto", flex: 1 }}>
      <div ref={h} style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Locataires</h1>
        <p style={{ color: "#6b7a8f", margin: "4px 0 0", fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>{TENANTS.length} locataires actifs</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TENANTS.map((t, i) => {
          const ref = useFadeIn(i * 80);
          const colors = ["#2dd4bf", "#0ea5e9", "#a78bfa", "#f97316"];
          return (
            <div key={t.id} ref={ref} style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${colors[i]}22`, border: `2px solid ${colors[i]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: colors[i], flexShrink: 0, fontFamily: "'Montserrat', sans-serif" }}>{t.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", fontFamily: "'Poppins', sans-serif" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#4b5563" }}>{t.property}</div>
                <div style={{ fontSize: 11, color: "#374151", marginTop: 2 }}>Locataire depuis {t.since}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT, fontFamily: "'Montserrat', sans-serif" }}>{t.rent.toLocaleString()} €</div>
                <div style={{ fontSize: 11, marginTop: 4, padding: "2px 10px", borderRadius: 6, display: "inline-block", background: t.status === "ok" ? "#22c55e22" : "#f9731622", color: t.status === "ok" ? "#22c55e" : ORANGE, fontWeight: 600 }}>
                  {t.status === "ok" ? "✓ À jour" : "⚠ Retard"}
                </div>
              </div>
              <button style={{ marginLeft: 8, background: "#131f34", border: "1px solid #1e2a3a", color: "#6b7a8f", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontFamily: "'Poppins', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = ACCENT} onMouseLeave={e => e.currentTarget.style.color = "#6b7a8f"}>
                Contacter
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Finance() {
  const h = useFadeIn(0);
  const months = ["Oct", "Nov", "Déc", "Jan", "Fév", "Mar"];
  const data = [9200, 9500, 9800, 10100, 10200, 10290];
  const max = Math.max(...data);
  return (
    <div style={{ padding: "32px 36px", overflow: "auto", flex: 1 }}>
      <div ref={h} style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Finances</h1>
        <p style={{ color: "#6b7a8f", margin: "4px 0 0", fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>Vue d'ensemble des revenus locatifs</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Revenus mars", value: "10 290 €", color: ACCENT, icon: "📈" },
          { label: "Charges totales", value: "1 340 €", color: "#ef4444", icon: "📉" },
          { label: "Solde net", value: "8 950 €", color: "#22c55e", icon: "💰" },
        ].map((c, i) => {
          const ref = useFadeIn(i * 80);
          return (
            <div key={c.label} ref={ref} style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#6b7a8f", fontFamily: "'Poppins', sans-serif" }}>{c.label}</span>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: c.color, fontFamily: "'Montserrat', sans-serif" }}>{c.value}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#0d1526", border: "1px solid #1e2a3a", borderRadius: 14, padding: "24px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>Évolution des loyers (6 mois)</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 180 }}>
          {data.map((v, i) => {
            const barH = (v / max) * 150;
            const ref = useFadeIn(i * 60);
            return (
              <div key={i} ref={ref} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: ACCENT, fontFamily: "'Poppins', sans-serif" }}>{(v / 1000).toFixed(1)}k</span>
                <div style={{ width: "100%", height: barH, background: `linear-gradient(to top, ${ACCENT}, ${ACCENT}44)`, borderRadius: "6px 6px 0 0", transition: "height 0.6s ease" }} />
                <span style={{ fontSize: 11, color: "#4b5563", fontFamily: "'Poppins', sans-serif" }}>{months[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState(TASKS.map(t => ({ ...t, done: false })));
  const h = useFadeIn(0);
  const toggle = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const priColor = { high: "#ef4444", mid: ORANGE, low: "#22c55e" };
  const priLabel = { high: "Urgent", mid: "Moyen", low: "Faible" };
  return (
    <div style={{ padding: "32px 36px", overflow: "auto", flex: 1 }}>
      <div ref={h} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Tâches & maintenance</h1>
          <p style={{ color: "#6b7a8f", margin: "4px 0 0", fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>{tasks.filter(t => !t.done).length} tâches en attente</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tasks.map((t, i) => {
          const ref = useFadeIn(i * 70);
          return (
            <div key={t.id} ref={ref} style={{ background: "#0d1526", border: `1px solid ${t.done ? "#1e2a3a" : "#1e2a3a"}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, opacity: t.done ? 0.5 : 1, transition: "opacity 0.3s" }}>
              <ClickSpark sparkColor={ACCENT}>
                <button onClick={() => toggle(t.id)} style={{
                  width: 24, height: 24, borderRadius: "50%", border: `2px solid ${t.done ? ACCENT : "#374151"}`,
                  background: t.done ? ACCENT : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#0a0f1e", transition: "all 0.2s"
                }}>{t.done ? "✓" : ""}</button>
              </ClickSpark>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: t.done ? "#4b5563" : "#e2e8f0", fontWeight: 500, textDecoration: t.done ? "line-through" : "none", fontFamily: "'Poppins', sans-serif" }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#374151" }}>{t.property}</div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 6, background: `${priColor[t.priority]}22`, color: priColor[t.priority] }}>{priLabel[t.priority]}</span>
                <span style={{ fontSize: 12, color: "#6b7a8f", fontFamily: "'Poppins', sans-serif" }}>{t.due}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── App root ─── */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const pages = { dashboard: <Dashboard />, properties: <Properties />, tenants: <Tenants />, finance: <Finance />, tasks: <Tasks /> };
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", height: "100vh", background: "#070d1a", fontFamily: "'Poppins', sans-serif", overflow: "hidden", position: "relative" }}>
        <AuroraBackground />
        <Sidebar active={page} setActive={setPage} />
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          <header style={{ padding: "16px 36px", borderBottom: "1px solid #1e2a3a", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(7,13,26,0.85)", backdropFilter: "blur(10px)" }}>
            <div style={{ fontSize: 13, color: "#4b5563" }}>
              <span style={{ color: ACCENT }}>Propra</span> / {page.charAt(0).toUpperCase() + page.slice(1)}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#4b5563" }}>Synced</span>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1e2a3a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>🔔</div>
            </div>
          </header>
          {pages[page]}
        </main>
      </div>
    </>
  );
}

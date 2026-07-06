import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── 代購連線管理系統 ── 業者後台 ────────────────────────────────
const APP_NAME = "Muulie Studio";
const LOGO_SRC = "data:image/png;base64,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";

// ─── 奶茶色系 Korean Milk Tea ────────────────────────────────────
// ─── 莫蘭迪粉色主題 ─────────────────────────────────────────
const C = {
  // 背景層
  bg:        "#faf2ee",  // 主背景:奶杏白
  bgDeep:    "#f4ebe5",  // 第二層:霧粉米
  bgCard:    "#ffffff",  // 卡片底:純白
  bgDark:    "#3d2e2a",
  surface:   "#fdf7f3",
  // 邊框
  border:    "#eed8d2",
  borderSoft:"#f4e0dc",
  borderDeep:"#d8c2c0",
  // 文字
  text:      "#4a3a38",  // 主文字:暖深棕
  textMid:   "#7a6258",  // 副文字
  muted:     "#a89890",  // 提示
  faint:     "#c4a8a4",  // 最淡:留白裝飾
  // 強調色 (奶咖啡)
  accent:    "#a8847e",
  accentDark:"#8b6258",
  accentLight:"#c4a094",
  accentBg:  "#fdf5f2",  // 強調區塊底
  // 狀態色 (莫蘭迪低飽和)
  green:     "#9eb098",  greenBg:  "#e0eadc",  greenDark:"#7d9576",  // 已採買/利潤
  yellow:    "#c4a878",  yellowBg: "#f6ecd8",
  red:       "#c47a78",  redBg:    "#f6dcd8",
  pink:      "#d49890",  pinkBg:   "#fdebe6",  pinkDark: "#b87166",  // 待採買
  blue:      "#8a9fa8",  blueBg:   "#e0e8eb",
  purple:    "#a89098",  purpleBg: "#ede4e8",                        // 待審核(灰紫)
  orange:    "#c4937e",  orangeBg: "#f6e4dc",
  teal:      "#8aa8a8",  tealBg:   "#dceaea",
  shadow:    "0 2px 16px rgba(170,140,140,0.08)",
  shadowMd:  "0 4px 24px rgba(170,140,140,0.12)",
  shadowLg:  "0 8px 36px rgba(170,140,140,0.16)",
  // 圓角
  rXs: 8, rSm: 12, rMd: 16, rLg: 20, rPill: 99,
};

// ─── 響應式工具 ─────────────────────────────────────────────
const BREAKPOINTS = { mobile: 640, tablet: 1024 };
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < BREAKPOINTS.mobile) return "mobile";
    if (w < BREAKPOINTS.tablet) return "tablet";
    return "desktop";
  });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w < BREAKPOINTS.mobile ? "mobile" : w < BREAKPOINTS.tablet ? "tablet" : "desktop");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
}
const isMobile = (bp) => bp === "mobile";

const ORDER_STATUS = {
  pending_review: { label: "待審核",   color: "#7a6e80", bg: C.purpleBg, icon: "clipboard-list" },
  pending:        { label: "待採買",   color: C.pinkDark,bg: C.pinkBg,   icon: "clock-hour-4" },
  bought:         { label: "已採買",   color: C.greenDark,bg: C.greenBg, icon: "check" },
  arrived:        { label: "已到台",   color: C.accentDark,bg: C.accentBg,icon: "package" },
  shipped:        { label: "已寄出",   color: "#8a7fa8", bg: "#ebe4f0",  icon: "truck-delivery" },
  cancelled:      { label: "已取消",   color: C.red,    bg: C.redBg,    icon: "x" },
};

const uid = () => Math.random().toString(36).slice(2, 9);
const fmtMoney = (n) => `NT$${Number(n || 0).toLocaleString()}`;
const today = () => new Date().toLocaleDateString("zh-TW");

const INIT_DATA = {
  rate: 0.26,
  customers: [
    { id: "c1", name: "曉曉", phone: "0912-345-678", address: "台北市", level: "黃金" },
    { id: "c2", name: "Mina", phone: "0923-456-789", address: "新北市", level: "鑽石" },
    { id: "c3", name: "小雨", phone: "0934-567-890", address: "台中市", level: "白銀" },
  ],
  products: [
    { id: "p1", name: "高島屋土產代購", price: 0, image: "", status: "on", category: "土產/大型" },
    { id: "p2", name: "無印良品代購",   price: 0, image: "", status: "on", category: "生活" },
    { id: "p3", name: "藥妝代購",       price: 0, image: "", status: "on", category: "藥妝" },
    { id: "p4", name: "🇯🇵 7-11代購",   price: 0, image: "", status: "on", category: "便利商店" },
    { id: "p5", name: "吉伊卡哇手遊",   price: 0, image: "", status: "on", category: "玩具" },
  ],
  inStock: [
    { id: "s1", name: "Hello Kitty 鑰匙圈 草莓款", price: 350, image: "🎀", status: "on" },
    { id: "s2", name: "Sanrio 吊飾 新款",          price: 280, image: "⭐", status: "on" },
  ],
  orders: [
    { id: "o1", no: "7346", customerId: "c1", customerName: "曉曉", status: "cancelled",     items: [{ name: "🇯🇵 7-11代購",   cost: 32,   price: 39,   qty: 1, note: "" }], total: 39,   profit: 7,   createdAt: "2026-04-16" },
    { id: "o2", no: "7301", customerId: "c2", customerName: "Mina", status: "bought",        items: [{ name: "資生堂防曬乳",   cost: 560,  price: 728,  qty: 1, note: "" }], total: 728,  profit: 168, createdAt: "2026-04-14" },
    { id: "o3", no: "7298", customerId: "c3", customerName: "小雨", status: "pending_review",items: [{ name: "Nike Air Max 2024", cost: 3120, price: 3800, qty: 1, note: "白色 25cm" }], total: 3800, profit: 680, createdAt: "2026-04-13" },
  ],
  wishlist: [
    { id: "w1", customerId: "c1", customerName: "曉曉", name: "限定版茶杯組",   note: "京都限定款", status: "searching" },
    { id: "w2", customerId: "c2", customerName: "Mina", name: "Sanrio 吊飾 新款", note: "",         status: "found" },
  ],
  announcements: [
    { id: "an1", title: "第一天（4/21）行程公告", content: "🍒 藥妝 711 吉伊卡哇手遊 高島屋土產\n✨ 08:00 SUGI藥妝（美妝為主）\n大國藥妝（藥品為主）\n── 停留1小時 ──\n✨ 09:10 7-11（拍拍零食）\n── 停留30分鐘 ──\n✨ 09:45 唐吉軻德（拍照+採買）\n── 停留1小時 ──\n✨ 11:00 難波丸井百貨\n── 停留2.5小時 ──\n✨ 21:00 自由活動" }
  ],
};

// ─── Styles ──────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("ad-styles")) return;
  // Tabler Icons CDN
  if (!document.getElementById("tabler-icons")) {
    const lk = document.createElement("link");
    lk.id = "tabler-icons";
    lk.rel = "stylesheet";
    lk.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.14.0/dist/tabler-icons.min.css";
    document.head.appendChild(lk);
  }
  const s = document.createElement("style");
  s.id = "ad-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${C.bg};color:${C.text};font-family:'Noto Sans TC',sans-serif;min-height:100vh;-webkit-text-size-adjust:100%}
    ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-thumb{background:${C.faint};border-radius:99px}
    input,select,textarea,button{font-family:inherit;outline:none;font-size:14px;box-sizing:border-box;max-width:100%}
    /* 手機上 iOS 自動放大避免:input 字至少 16px */
    @media (max-width:640px) {
      input,select,textarea{font-size:16px!important}
    }
    .fade{animation:fadeUp .3s cubic-bezier(.16,1,.3,1) both}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    .tab-ul{display:flex;overflow-x:auto;scrollbar-width:none;gap:6px}
    .tab-ul::-webkit-scrollbar{display:none}
    .tab-btn{padding:6px 14px;border:0.5px solid ${C.borderDeep};background:transparent;color:${C.text};font-weight:500;font-size:13px;white-space:nowrap;cursor:pointer;border-radius:99px;transition:all .15s}
    .tab-btn.active{color:#fff;background:${C.accent};border-color:${C.accent}}
    .pill{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:99px;font-size:11px;font-weight:500}
    .pill i{font-size:12px}
    .row-hover{transition:background .15s} .row-hover:hover{background:${C.bgDeep}}
    .ti{font-style:normal}
    /* 底部分頁 */
    .bottom-nav{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:0.5px solid ${C.border};display:flex;justify-content:space-around;padding:10px 0 max(16px, env(safe-area-inset-bottom));z-index:90}
    .nav-item{background:none;border:none;display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 14px;cursor:pointer;color:${C.borderDeep};transition:color .15s}
    .nav-item.active{color:${C.accent}}
    .nav-item i{font-size:22px} .nav-item span{font-size:10px}
    .nav-item.active span{font-weight:500}
    /* 卡片 */
    .card{background:${C.bgCard};border-radius:${C.rMd}px;border:0.5px solid ${C.border};padding:14px 16px}
    .card-tappable{cursor:pointer;transition:transform .12s,box-shadow .15s}
    .card-tappable:active{transform:scale(.99)}
    @keyframes shakeX{0%,100%{transform:none}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    /* Modal/Sheet 底部抽屜 */
    .sheet-backdrop{position:fixed;inset:0;background:rgba(74,58,56,.45);z-index:100;display:flex;align-items:flex-end;animation:fadeIn .2s ease}
    .sheet-content{background:#fff;width:100%;max-height:90vh;border-radius:24px 24px 0 0;overflow:hidden;display:flex;flex-direction:column;animation:slideUp .25s cubic-bezier(.16,1,.3,1)}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideUp{from{transform:translateY(100%)}to{transform:none}}
    .sheet-handle{width:36px;height:4px;background:${C.border};border-radius:99px;margin:10px auto 6px}
  `;
  document.head.appendChild(s);
};

// ─── Atoms ───────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color, style: sx }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: size, color, lineHeight: 1, ...sx }} aria-hidden="true" />
);

const StatusBadge = ({ status, sm }) => {
  const s = ORDER_STATUS[status] || ORDER_STATUS.pending;
  return <span className="pill" style={{ background: s.bg, color: s.color, fontSize: sm ? 10 : 11, padding: sm ? "3px 8px" : "4px 10px" }}>
    <Icon name={s.icon} size={sm ? 11 : 12} /> {s.label}
  </span>;
};

const Btn = ({ children, onClick, variant = "primary", sm, style: sx, disabled, icon }) => {
  const v = {
    primary: { background: C.accent, color: "#fff", border: "none" },
    soft:    { background: C.accentBg, color: C.accentDark, border: `0.5px solid ${C.border}` },
    ghost:   { background: "transparent", color: C.textMid, border: `0.5px solid ${C.borderDeep}` },
    danger:  { background: C.redBg, color: C.red, border: `0.5px solid ${C.red}40` },
    success: { background: C.green, color: "#fff", border: "none" },
    pinkSoft:{ background: C.pinkBg, color: C.pinkDark, border: `0.5px solid ${C.pink}40` },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: sm ? "7px 14px" : "11px 20px", borderRadius: sm ? 10 : 12, fontWeight: 500, fontSize: sm ? 12 : 13, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all .15s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, ...v[variant], ...sx }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = ".88"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = disabled ? ".5" : "1"; }}
    >
      {icon && <Icon name={icon} size={sm ? 13 : 15} />}
      {children}
    </button>
  );
};

const Card = ({ children, style: sx }) => (
  <div className="fade" style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: 18, boxShadow: C.shadow, ...sx }}>{children}</div>
);

const Input = ({ label, value, onChange, type = "text", placeholder, style: sx }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5, ...sx }}>
    {label && <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>{label}</label>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14 }}
      onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(58,46,36,.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}
    onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="fade" style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 22, boxShadow: C.shadowLg, width: "100%", maxWidth: wide ? 680 : 480, maxHeight: "92vh", overflow: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display',serif", color: C.accentDark }}>{title}</h3>
        <button onClick={onClose} style={{ background: C.bgDeep, border: "none", color: C.muted, width: 30, height: 30, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: C.accentDark, color: "#fff", padding: "12px 24px", borderRadius: 14, fontWeight: 600, fontSize: 14, boxShadow: C.shadowMd, zIndex: 2000, animation: "fadeUp .2s ease", whiteSpace: "nowrap" }}>✓ {msg}</div>
  );
};

// ─── Security Layer ───────────────────────────────────────────────
// Crypto-grade UID using Web Crypto API
const secureUid = () => {
  const arr = new Uint8Array(9);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(36).padStart(2, "0")).join("").slice(0, 12);
};

// Hash password with SHA-256 (async, returns hex string)
const hashPassword = async (pw) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
};

// Simple XSS sanitizer — strips HTML tags from user input
const sanitize = (str) => String(str).replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();

// Validate allowed status values to prevent injection
const ALLOWED_STATUSES = new Set(["pending_review","pending","bought","shipped","arrived","cancelled"]);
const safeStatus = (s) => ALLOWED_STATUSES.has(s) ? s : "pending_review";

// Rate limiter — tracks failed attempts per session
const createRateLimiter = (maxAttempts = 5, lockoutMs = 5 * 60 * 1000) => {
  let attempts = 0;
  let lockedUntil = 0;
  let warningShown = false;
  return {
    check() {
      if (Date.now() < lockedUntil) {
        const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
        return { ok: false, locked: true, remaining, attempts };
      }
      return { ok: true, locked: false, remaining: 0, attempts };
    },
    fail() {
      attempts++;
      if (attempts >= maxAttempts) {
        lockedUntil = Date.now() + lockoutMs;
        attempts = 0; // reset after lockout
        return { locked: true, remaining: Math.ceil(lockoutMs / 1000) };
      }
      return { locked: false, remaining: 0, attemptsLeft: maxAttempts - attempts };
    },
    succeed() { attempts = 0; lockedUntil = 0; },
  };
};

// Session timeout — auto logout after 30 minutes of inactivity
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
let sessionTimer = null;
const resetSessionTimer = (onExpire) => {
  clearTimeout(sessionTimer);
  sessionTimer = setTimeout(() => { clearTimeout(sessionTimer); onExpire(); }, SESSION_TIMEOUT_MS);
};

// Audit log — records sensitive actions in memory
const auditLog = [];
const logAction = (action, detail = "") => {
  auditLog.unshift({
    id: Math.random().toString(36).slice(2),
    action, detail,
    time: new Date().toLocaleString("zh-TW"),
    ts: Date.now(),
  });
  if (auditLog.length > 100) auditLog.pop(); // cap at 100 entries
};

// Global rate limiter instance
const loginLimiter = createRateLimiter(5, 5 * 60 * 1000);

// ─── Export CSV ───────────────────────────────────────────────────
function exportCSV(orders, filename) {
  const header = [
    "訂單號","訂單日期","社群名稱","商品","規格","數量","成本","售價","利潤",
    "國際運費","收款日期","出貨日期","付款方式","後五碼","是否已收款","狀態"
  ];
  // 每個品項分一行
  const rows = [];
  orders.forEach(o => {
    const name = o.community_name || o.customer_name || o.customerName || "";
    const date = o.created_at ? new Date(o.created_at).toLocaleDateString("zh-TW") : (o.createdAt || "");
    const items = o.items || [];
    if (items.length === 0) {
      rows.push(["#"+sanitize(o.no), date, sanitize(name), "", "", 0, 0, o.total||0, o.profit||0, "", o.payment_date||"", o.ship_date||"", o.payment_method||"", o.bank_code||"", o.paid?"是":"否", ORDER_STATUS[o.status]?.label||o.status]);
    } else {
      items.forEach((it, idx) => {
        rows.push([
          idx === 0 ? "#"+sanitize(o.no) : "",
          idx === 0 ? date : "",
          idx === 0 ? sanitize(name) : "",
          sanitize((it.name||"").split(" / ")[0] || ""),
          sanitize((it.name||"").split(" / ").slice(1).join(" / ") || it.spec || it.note || ""),
          it.qty || 1,
          (it.cost || 0) * (it.qty || 1),
          (it.price || 0) * (it.qty || 1),
          ((it.price || 0) - (it.cost || 0)) * (it.qty || 1),
          idx === 0 ? (o.shipping_fee || "") : "",
          idx === 0 ? (o.payment_date || "") : "",
          idx === 0 ? (o.ship_date || "") : "",
          idx === 0 ? (o.payment_method === "transfer" ? "匯款" : o.payment_method === "cod" ? "貨到付款" : "") : "",
          idx === 0 ? (o.bank_code || "") : "",
          idx === 0 ? (o.paid ? "是" : "否") : "",
          idx === 0 ? (ORDER_STATUS[o.status]?.label || o.status) : "",
        ]);
      });
    }
  });
  const q = '"';
  const csv = [header, ...rows].map(r => r.map(v => (q+String(v||"").replace(new RegExp(q,"g"),q+q)+q)).join(",")).join("\n");
  const blob = new Blob(["\uFEFF"+csv], {type:"text/csv;charset=utf-8;"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename || ("訂單匯出_"+new Date().toLocaleDateString("zh-TW").replace(/\//g,"-")+".csv");
  a.click();
  logAction("匯出CSV", "匯出 "+orders.length+" 筆訂單");
}

// ─── Login ────────────────────────────────────────────────────────
function LoginPage({ credentials, onSuccess }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [lockInfo, setLockInfo] = useState({ locked: false, remaining: 0, attemptsLeft: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = loginLimiter.check();
      if (s.locked) { setLockInfo({ locked: true, remaining: s.remaining, attemptsLeft: 0 }); }
      else if (lockInfo.locked) { setLockInfo(prev => ({ ...prev, locked: false })); setError(""); }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockInfo.locked]);

  const login = async () => {
    if (loading) return;
    const check = loginLimiter.check();
    if (check.locked) { setError(`帳號已鎖定，請等待 ${check.remaining} 秒後再試`); return; }
    const cleanAccount = sanitize(account);
    if (!cleanAccount || !password) { setError("請填寫帳號與密碼"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200));
    const pwHash = await hashPassword(password);
    const expectedHash = await hashPassword(credentials.password);
    if (cleanAccount === credentials.account && pwHash === expectedHash) {
      loginLimiter.succeed(); logAction("登入成功", `帳號：${cleanAccount}`);
      setLoading(false); onSuccess();
    } else {
      const result = loginLimiter.fail(); logAction("登入失敗", `帳號嘗試：${cleanAccount}`);
      setShake(true); setTimeout(() => setShake(false), 500);
      if (result.locked) { setError("嘗試次數過多，帳號已鎖定 5 分鐘"); setLockInfo({ locked: true, remaining: 300, attemptsLeft: 0 }); }
      else { setError(`帳號或密碼錯誤（剩餘 ${result.attemptsLeft} 次機會）`); setLockInfo(prev => ({ ...prev, attemptsLeft: result.attemptsLeft })); }
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", top:-80, right:-80, width:260, height:260, borderRadius:"50%", background:`${C.accentLight}25`, pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:-60, left:-60, width:200, height:200, borderRadius:"50%", background:`${C.yellow}15`, pointerEvents:"none" }} />

      <div className="fade" style={{ width:"100%", maxWidth:400, background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:24, boxShadow:C.shadowLg, overflow:"hidden", animation:shake?"shakeX .4s ease":undefined }}>
        <div style={{ background:`linear-gradient(135deg, ${C.accentDark}, ${C.accent})`, padding:"32px 28px 28px", textAlign:"center" }}>
          <img src={LOGO_SRC} alt="Muulie Studio" style={{ width:90, height:90, objectFit:"contain", marginBottom:10, filter:"brightness(0) invert(1)", opacity:.92 }} />
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#fff", fontWeight:700 }}>{APP_NAME}</div>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13, marginTop:4 }}>業者管理後台</div>
        </div>
        <div style={{ padding:"28px 28px 24px", display:"flex", flexDirection:"column", gap:16 }}>
          {lockInfo.locked && (
            <div style={{ background:"#fff0f0", border:`1.5px solid ${C.red}`, borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ fontSize:22 }}>🔒</div>
              <div>
                <div style={{ fontWeight:700, color:C.red, fontSize:14 }}>帳號暫時鎖定</div>
                <div style={{ fontSize:13, color:C.red, marginTop:2 }}>{lockInfo.remaining > 0 ? `請等待 ${lockInfo.remaining} 秒後再試` : "正在計算…"}</div>
              </div>
            </div>
          )}
          {!lockInfo.locked && lockInfo.attemptsLeft < 5 && lockInfo.attemptsLeft > 0 && (
            <div style={{ background:C.yellowBg, border:`1.5px solid ${C.yellow}30`, borderRadius:10, padding:"10px 14px", fontSize:13, color:C.yellow, fontWeight:600 }}>
              ⚠️ 剩餘 {lockInfo.attemptsLeft} 次登入機會
            </div>
          )}
          <Input label="帳號" value={account} onChange={v => { setAccount(sanitize(v)); setError(""); }} placeholder="輸入管理員帳號" />
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <label style={{ fontSize:12, color:C.muted, fontWeight:700, letterSpacing:.5, textTransform:"uppercase" }}>密碼</label>
            <div style={{ position:"relative" }}>
              <input type={showPw?"text":"password"} value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key==="Enter" && !lockInfo.locked && login()}
                placeholder="輸入密碼" disabled={lockInfo.locked||loading} maxLength={128} autoComplete="current-password"
                style={{ width:"100%", background:lockInfo.locked?C.bgDeep:C.bg, border:`1.5px solid ${error?C.red:C.border}`, borderRadius:10, padding:"9px 40px 9px 13px", color:C.text, fontSize:14, cursor:lockInfo.locked?"not-allowed":"text" }}
                onFocus={e => { if (!error) { e.target.style.borderColor=C.accent; e.target.style.boxShadow=`0 0 0 3px ${C.accent}15`; } }}
                onBlur={e => { e.target.style.borderColor=error?C.red:C.border; e.target.style.boxShadow="none"; }}
              />
              <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:C.muted, fontSize:16, cursor:"pointer" }}>{showPw?"🙈":"👁"}</button>
            </div>
          </div>
          {error && <div style={{ background:C.redBg, border:`1.5px solid ${C.red}30`, borderRadius:10, padding:"10px 14px", fontSize:13, color:C.red, fontWeight:600 }}>⚠️ {error}</div>}
          <Btn onClick={login} disabled={lockInfo.locked||loading} style={{ width:"100%", display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:4 }}>
            {loading ? <><span style={{ animation:"spin 1s linear infinite", display:"inline-block" }}>⟳</span> 驗證中…</> : lockInfo.locked ? "🔒 已鎖定" : "登入後台"}
          </Btn>
          <div style={{ fontSize:11, color:C.muted, textAlign:"center", lineHeight:1.6, marginTop:4, padding:"10px 0 0", borderTop:`1px solid ${C.border}` }}>
            🛡️ 連續錯誤 5 次將鎖定 5 分鐘<br/>登入後 30 分鐘無操作將自動登出
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────
function AdminDashboard({ data, setData, credentials, setCredentials, onLogout }) {
  const [tab, setTab] = useState("orders");
  const [toast, setToast] = useState(null);
  const showToast = useCallback(msg => setToast(msg), []);

  // ── Session timeout ──────────────────────────────────────────
  const [sessionWarning, setSessionWarning] = useState(false);
  const WARNING_MS = 25 * 60 * 1000; // warn at 25 min
  const TIMEOUT_MS = 30 * 60 * 1000; // logout at 30 min

  useEffect(() => {
    let warnTimer = setTimeout(() => setSessionWarning(true), WARNING_MS);
    let logoutTimer = setTimeout(() => {
      logAction("Session 逾時自動登出");
      onLogout();
    }, TIMEOUT_MS);

    const reset = () => {
      clearTimeout(warnTimer); clearTimeout(logoutTimer);
      setSessionWarning(false);
      warnTimer   = setTimeout(() => setSessionWarning(true), WARNING_MS);
      logoutTimer = setTimeout(() => { logAction("Session 逾時自動登出"); onLogout(); }, TIMEOUT_MS);
    };

    const events = ["click", "keydown", "mousemove", "touchstart"];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    logAction("登入後台");

    return () => {
      clearTimeout(warnTimer); clearTimeout(logoutTimer);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, []);

  // 把載入邏輯抽成可重用函式
  const reloadData = useCallback(() => {
    return Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("in_stock").select("*").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("wishlist").select("*").order("created_at", { ascending: false }),
      supabase.from("members").select("*"),
    ]).then(([o, p, s, a, w, m]) => {
      if (o.error) console.error("orders 載入失敗:", o.error);
      if (p.error) console.error("products 載入失敗:", p.error);
      if (s.error) console.error("in_stock 載入失敗:", s.error);
      if (a.error) console.error("announcements 載入失敗:", a.error);
      if (w.error) console.error("wishlist 載入失敗:", w.error);
      if (m.error) {
        console.error("members 載入失敗:", m.error);
        showToast(`⚠️ 客人資料載入失敗:${m.error.message || "權限不足"}`);
      }
      setData(d => ({
        ...d,
        orders:        o.data || [],
        products:      p.data || [],
        inStock:       s.data || [],
        announcements: a.data || [],
        wishlist:      w.data || [],
        members:       m.data || [],
      }));
      console.log(`📊 已載入: 訂單 ${(o.data||[]).length}, 商品 ${(p.data||[]).length}, 現貨 ${(s.data||[]).length}, 會員 ${(m.data||[]).length}, 許願 ${(w.data||[]).length}`);
    }).catch(err => console.error("Supabase 載入失敗", err));
  }, []);

  // 切換分頁時自動重新拉資料
  useEffect(() => {
    if (["orders", "catalog", "customers", "instock", "wishlist", "archive"].includes(tab)) {
      reloadData();
    }
  }, [tab, reloadData]);

  // ── 從 Supabase 載入資料 + 即時訂閱 ─────────────────────────
  useEffect(() => {
    reloadData();


    // 即時訂閱新訂單
    const sub = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, payload => {
        setData(d => ({ ...d, orders: [payload.new, ...d.orders] }));
        showToast(`🔔 新訂單！${payload.new.customer_name} #${payload.new.no}`);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, payload => {
        setData(d => ({ ...d, orders: d.orders.map(o => o.id === payload.new.id ? { ...o, ...payload.new } : o) }));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishlist" }, payload => {
        setData(d => ({ ...d, wishlist: [payload.new, ...d.wishlist] }));
        showToast(`⭐ ${payload.new.customer_name} 許願了「${payload.new.name}」`);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "wishlist" }, payload => {
        setData(d => ({ ...d, wishlist: d.wishlist.map(w => w.id === payload.new.id ? payload.new : w) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "wishlist" }, payload => {
        setData(d => ({ ...d, wishlist: d.wishlist.filter(w => w.id !== payload.old.id) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "orders" }, payload => {
        setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== payload.old.id) }));
      })
      // ── 商品 products 即時同步 ─────────
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "products" }, payload => {
        setData(d => d.products.find(p => p.id === payload.new.id)
          ? d
          : ({ ...d, products: [payload.new, ...d.products] }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "products" }, payload => {
        setData(d => ({ ...d, products: d.products.map(p => p.id === payload.new.id ? payload.new : p) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "products" }, payload => {
        setData(d => ({ ...d, products: d.products.filter(p => p.id !== payload.old.id) }));
      })
      // ── 現貨 in_stock 即時同步 ─────────
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "in_stock" }, payload => {
        setData(d => d.inStock.find(p => p.id === payload.new.id)
          ? d
          : ({ ...d, inStock: [payload.new, ...d.inStock] }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "in_stock" }, payload => {
        setData(d => ({ ...d, inStock: d.inStock.map(p => p.id === payload.new.id ? payload.new : p) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "in_stock" }, payload => {
        setData(d => ({ ...d, inStock: d.inStock.filter(p => p.id !== payload.old.id) }));
      })
      // ── 會員 members 即時同步 ─────────
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "members" }, payload => {
        setData(d => d.members.find(m => m.line_user_id === payload.new.line_user_id)
          ? d
          : ({ ...d, members: [payload.new, ...d.members] }));
        showToast(`新客人加入:${payload.new.line_name || payload.new.community_name || "未命名"}`);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "members" }, payload => {
        setData(d => ({ ...d, members: d.members.map(m => m.line_user_id === payload.new.line_user_id ? payload.new : m) }));
      })
      // ── 公告 announcements 即時同步 ────
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "announcements" }, payload => {
        setData(d => d.announcements.find(a => a.id === payload.new.id)
          ? d
          : ({ ...d, announcements: [payload.new, ...d.announcements] }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "announcements" }, payload => {
        setData(d => ({ ...d, announcements: d.announcements.map(a => a.id === payload.new.id ? payload.new : a) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "announcements" }, payload => {
        setData(d => ({ ...d, announcements: d.announcements.filter(a => a.id !== payload.old.id) }));
      })
      .subscribe((status) => {
        console.log("📡 Realtime status:", status);
        if (status === "SUBSCRIBED") {
          console.log("✅ Realtime 訂閱成功,將即時收到新訂單/客人/商品變更");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("❌ Realtime 訂閱失敗,將仰賴 30 秒輪詢備援");
        }
      });

    // 心跳輪詢備援:每 30 秒重拉一次,防止 Realtime 漏接
    const heartbeat = setInterval(() => {
      reloadData();
    }, 30000);

    return () => {
      sub.unsubscribe();
      clearInterval(heartbeat);
    };
  }, [reloadData]);

  // ── LINE 推播通知 ───────────────────────────────────────────
  const sendLineNotify = async (lineUserIds, message) => {
    if (!lineUserIds || lineUserIds.length === 0) { showToast("找不到客人 LINE ID"); return; }
    if (!message.trim()) { showToast("請填寫通知內容"); return; }
    try {
      const res = await fetch(
        `https://pdvoxaluahzjnhvtirdi.supabase.co/functions/v1/send-line`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ to: lineUserIds, message }),
        }
      );
      const result = await res.json();
      const success = result.results?.filter(r => r.ok).length || 0;
      const fail = result.results?.filter(r => !r.ok).length || 0;
      showToast(`✅ 已發送 ${success} 人${fail > 0 ? `，${fail} 人失敗` : ""}`);
    } catch (e) {
      console.error(e);
      showToast("發送失敗，請確認 Edge Function 設定");
    }
  };

  const totalOrders = data.orders.length;
  const pendingBuy  = data.orders.filter(o => o.status === "pending").length;
  const bought      = data.orders.filter(o => o.status === "bought").length;
  const profit      = data.orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + (o.profit||0), 0);

  // ── 統計卡片點擊篩選 ─────────────────────────────────────────
  const [orderFilter, setOrderFilter] = useState("all");
  const goFilter = (status) => {
    setOrderFilter(status);
    setTab("orders");
  };

  const TABS_PRIMARY = [
    { id: "orders",    label: "訂單",   icon: "clipboard-list" },
    { id: "catalog",   label: "賣場",   icon: "shopping-bag" },
    { id: "customers", label: "客人",   icon: "users" },
    { id: "more",      label: "更多",   icon: "grid-dots" },
  ];
  const TABS_MORE = [
    { id: "purchase",  label: "採購清單",   icon: "clipboard-list" },
    { id: "inbound",   label: "入庫配貨",   icon: "package-import" },
    { id: "instock",   label: "現貨/庫存",  icon: "package" },
    { id: "wishlist",  label: "許願清單",   icon: "star" },
    { id: "revenue",   label: "營收報表",   icon: "chart-bar" },
    { id: "archive",   label: "封存區",     icon: "archive" },
    { id: "auditlog",  label: "操作日誌",   icon: "shield" },
    { id: "settings",  label: "帳號設定",   icon: "settings" },
  ];

  const bp = useBreakpoint();
  const mobile = isMobile(bp);

  // 取得目前頁的標題(顯示在頂部)
  const allTabs = [...TABS_PRIMARY, ...TABS_MORE];
  const currentTab = allTabs.find(t => t.id === tab) || TABS_PRIMARY[0];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: mobile ? 78 : 0, maxWidth: mobile ? 540 : "none", margin: "0 auto" }}>
      {/* Session warning banner */}
      {sessionWarning && (
        <div style={{ background: C.yellow, color: "#fff", padding: "10px 20px", textAlign: "center", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          已閒置 25 分鐘，5 分鐘後將自動登出
          <button onClick={() => { setSessionWarning(false); }} style={{ background: "rgba(255,255,255,.3)", border: "none", color: "#fff", padding: "4px 12px", borderRadius: 99, fontWeight: 500, cursor: "pointer", fontSize: 12 }}>繼續工作</button>
        </div>
      )}

      {/* Top bar — 手機版簡潔 */}
      <div style={{ background: C.bg, padding: mobile ? "14px 18px 12px" : "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: sessionWarning ? 41 : 0, zIndex: 50, borderBottom: mobile ? "none" : `0.5px solid ${C.border}` }}>
        <div>
          <div style={{ fontSize: 9, color: C.faint, letterSpacing: 2.5, fontWeight: 500 }}>MUULIE STUDIO</div>
          <div style={{ fontSize: mobile ? 22 : 18, fontWeight: 400, color: C.text, marginTop: 3, letterSpacing: .5 }}>
            {currentTab.label}{tab === "more" ? "" : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!mobile && <div style={{ fontSize: 11, color: C.muted, marginRight: 8 }}>登入：{credentials.account}</div>}
          <button onClick={() => { logAction("手動登出"); onLogout(); }}
            style={{ width: 36, height: 36, borderRadius: "50%", background: C.bgDeep, border: "none", color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="logout" size={17} />
          </button>
        </div>
      </div>

      {/* 桌面版才顯示的橫向 tabs */}
      {!mobile && (
        <div className="tab-ul" style={{ padding: "10px 16px", background: C.bg, position: "sticky", top: sessionWarning ? 102 : 61, zIndex: 40, borderBottom: `0.5px solid ${C.border}` }}>
          {[...TABS_PRIMARY.filter(t => t.id !== "more"), ...TABS_MORE].map(t =>
            <button key={t.id} className={`tab-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          )}
        </div>
      )}

      {/* 桌面版的統計卡(手機收起來,訂單頁裡會有自己的篩選方塊) */}
      {!mobile && (
        <div style={{ padding: "16px 16px 8px", display: "flex", gap: 10 }}>
          {[
            { icon: "clipboard-list", val: totalOrders, label: "總訂單", filter: "all", color: C.text },
            { icon: "clock-hour-4",   val: pendingBuy,  label: "待採買", filter: "pending", color: C.pinkDark },
            { icon: "check",          val: bought,      label: "已採買", filter: "bought",  color: C.greenDark },
            { icon: "coin",           val: `NT$${profit.toLocaleString()}`, label: "預估利潤", filter: null, color: C.accent },
          ].map((s, i) => {
            const isActive = s.filter && tab === "orders" && orderFilter === s.filter;
            return (
              <div key={i} onClick={() => s.filter && goFilter(s.filter)}
                style={{ flex: 1, background: isActive ? C.accent : C.bgCard, color: isActive ? "#fff" : C.text, border: `0.5px solid ${isActive ? C.accent : C.border}`, borderRadius: 14, padding: "13px 8px", textAlign: "center", cursor: s.filter ? "pointer" : "default", transition: "all .15s" }}>
                <Icon name={s.icon} size={18} color={isActive ? "#fff" : s.color} />
                <div style={{ fontWeight: 500, fontSize: 16, color: isActive ? "#fff" : s.color, marginTop: 4 }}>{s.val}</div>
                <div style={{ fontSize: 10, marginTop: 2, opacity: isActive ? .85 : .6 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Page content */}
      <div style={{ padding: mobile ? "0" : "8px 16px 60px" }}>
        {tab === "orders"        && <OrdersPage        data={data} setData={setData} toast={showToast} initialFilter={orderFilter} onFilterChange={setOrderFilter} mobile={mobile} />}
        {tab === "review"        && <ReviewPage        data={data} setData={setData} toast={showToast} />}
        {tab === "catalog"       && <CatalogPage       data={data} setData={setData} toast={showToast} mobile={mobile} />}
        {tab === "instock"       && <InStockPage       data={data} setData={setData} toast={showToast} />}
        {tab === "purchase"      && <PurchasePage      data={data} setData={setData} toast={showToast} setTab={setTab} />}
        {tab === "inbound"       && <InboundPage       data={data} setData={setData} toast={showToast} setTab={setTab} />}
        {tab === "revenue"       && <RevenuePage       data={data} />}
        {tab === "wishlist"      && <WishlistPage      data={data} setData={setData} toast={showToast} />}
        {tab === "customers"     && <CustomersPage     data={data} setData={setData} toast={showToast} sendLineNotify={sendLineNotify} />}
        {tab === "settings"      && <SettingsPage      credentials={credentials} setCredentials={setCredentials} toast={showToast} onLogout={onLogout} />}
        {tab === "archive"       && <ArchivePage       data={data} setData={setData} toast={showToast} />}
        {tab === "auditlog"      && <AuditLogPage />}
        {tab === "more"          && <MorePage tabs={TABS_MORE} onSelect={setTab} onLogout={onLogout} credentials={credentials} reloadData={reloadData} toast={showToast} />}
      </div>

      {/* 手機底部分頁 */}
      {mobile && (
        <div className="bottom-nav">
          {TABS_PRIMARY.map(t => {
            const active = t.id === "more"
              ? ["more", ...TABS_MORE.map(x => x.id)].includes(tab)
              : tab === t.id;
            return (
              <button key={t.id} className={`nav-item${active ? " active" : ""}`} onClick={() => setTab(t.id)}>
                <Icon name={t.icon} size={22} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

// ─── More Page (手機版「更多」抽屜式選單) ────────────────────
function MorePage({ tabs, onSelect, onLogout, credentials, reloadData, toast }) {
  const [refreshing, setRefreshing] = useState(false);
  const doRefresh = async () => {
    setRefreshing(true);
    try { await reloadData(); toast?.("✅ 資料已重新載入"); } catch (e) { toast?.("重新整理失敗"); }
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <div style={{ padding: "8px 16px 24px" }}>
      {/* 重新整理按鈕 */}
      <button onClick={doRefresh} disabled={refreshing}
        style={{ width: "100%", marginBottom: 16, padding: "12px", background: C.accentBg, color: C.accent, border: `0.5px solid ${C.accent}40`, borderRadius: 14, fontSize: 13, fontWeight: 500, cursor: refreshing?"wait":"pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Icon name="refresh" size={15} style={{ animation: refreshing?"spin 1s linear infinite":"none" }} />
        {refreshing ? "重新載入中..." : "重新整理所有資料"}
      </button>

      <div style={{ fontSize: 10, color: C.faint, letterSpacing: 1.5, padding: "8px 4px 12px" }}>更多功能</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => onSelect(t.id)}
            className="row-hover"
            style={{ background: C.bgCard, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: C.text, textAlign: "left" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: C.bgDeep, display: "flex", alignItems: "center", justifyContent: "center", color: C.accent }}>
              <Icon name={t.icon} size={18} />
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.label}</div>
            <Icon name="chevron-right" size={16} color={C.faint} />
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, color: C.faint, letterSpacing: 1.5, padding: "20px 4px 12px" }}>帳號</div>
      <div style={{ background: C.bgCard, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: "12px 16px" }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>目前登入</div>
        <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{credentials.account}</div>
      </div>

      <button onClick={() => { logAction("手動登出"); onLogout(); }}
        style={{ width: "100%", marginTop: 16, padding: "13px", background: C.redBg, color: C.red, border: `0.5px solid ${C.red}40`, borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="logout" size={16} /> 登出
      </button>
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────
function OrdersPage({ data, setData, toast, initialFilter = "all", onFilterChange, mobile }) {
  const [filter, setFilter] = useState(initialFilter);
  const [showAdd, setShowAdd] = useState(false);
  const STATUS_KEYS = ["all","pending_review","pending","bought","shipped","arrived","cancelled"];
  const uniqueOrders = Array.from(new Map(data.orders.map(o => [o.id, o])).values());
  const filtered = uniqueOrders.filter(o => !o.archived).filter(o => filter === "all" || o.status === filter);

  // 同步外部篩選（統計卡片點擊）
  useEffect(() => { setFilter(initialFilter); }, [initialFilter]);

  const changeFilter = (s) => {
    setFilter(s);
    if (onFilterChange) onFilterChange(s);
  };

  // 統計數字
  const totalCount = data.orders.filter(o => !o.archived).length;
  const pendingCount = data.orders.filter(o => !o.archived && o.status === "pending").length;
  const boughtCount = data.orders.filter(o => !o.archived && o.status === "bought").length;

  const updateStatus = async (id, status) => {
    const safeS = safeStatus(status);
    const o = data.orders.find(x => x.id === id);
    if (!o) return;

    // 特殊處理:已採買 → 待採買 = 還原採買/配貨紀錄,已配的貨還回庫存
    if (o.status === "bought" && safeS === "pending") {
      const stockedItems = (o.items || []).filter(it => it.stocked);
      const returnCount = stockedItems.reduce((s, it) => s + (Number(it.qty) || 1), 0);

      if (returnCount > 0) {
        if (!window.confirm(`此訂單有 ${stockedItems.length} 個品項已配貨(共 ${returnCount} 件),還原後將:\n· 清除品項採買/配貨標籤\n· 已配貨的貨還回庫存 (庫存 +${returnCount})\n\n確定?`)) return;
      }

      // 還原品項狀態
      const now = new Date().toISOString();
      const newItems = (o.items || []).map(it => {
        if (!it.purchased && !it.stocked && !it.stocked_qty) return it;
        const cleaned = { ...it };
        delete cleaned.purchased;
        delete cleaned.purchased_at;
        delete cleaned.stocked;
        delete cleaned.stocked_at;
        delete cleaned.stocked_qty;
        return cleaned;
      });

      // 已配貨的貨還回 stock (庫存)
      // 依款式聚合 qty
      const groupByName = new Map();
      for (const it of stockedItems) {
        const parts = String(it.name).split(" / ");
        const productName = parts[0] || it.name;
        const variantName = parts.slice(1).join(" / ");
        const displayName = variantName ? `${productName} / ${variantName}` : productName;
        groupByName.set(displayName, (groupByName.get(displayName) || 0) + (Number(it.qty) || 1));
      }
      for (const [displayName, qty] of groupByName.entries()) {
        try {
          const { data: existing } = await supabase.from("in_stock")
            .select("*").eq("name", displayName).maybeSingle();
          if (existing) {
            const newStock = (Number(existing.stock) || 0) + qty;
            await supabase.from("in_stock").update({
              stock: newStock,
              updated_at: now
            }).eq("id", existing.id);
          } else {
            // 如果 in_stock 沒紀錄,建立一筆
            await supabase.from("in_stock").insert([{
              id: secureUid(), name: displayName, price: 0, stock: qty,
              total_purchased: qty, image: "", status: "off", created_at: now,
            }]);
          }
        } catch (e) { console.warn("還原庫存失敗:", e); }
      }

      // 更新訂單:狀態改回 pending + 清 items + 清 stocked 旗標
      const { error } = await supabase.from("orders").update({
        status: safeS, items: newItems, stocked: false, stocked_at: null, updated_at: now
      }).eq("id", id);
      if (error) { toast(`更新失敗:${error.message}`); return; }

      // 重新拉庫存
      const inStockRes = await supabase.from("in_stock").select("*").order("created_at", { ascending: false });
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === id ? { ...x, status: safeS, items: newItems, stocked: false } : x),
        inStock: inStockRes.data || d.inStock,
      }));
      logAction("還原採買/配貨", `#${o.no} · 還回庫存 ${returnCount} 件`);
      toast(`✅ 已還原${returnCount > 0 ? ` · ${returnCount} 件還回庫存` : ""}`);
      return;
    }

    // 特殊處理:任何狀態 → 已寄出 = 貨真的送出了,從 stock 扣掉
    if (safeS === "shipped" && o.status !== "shipped") {
      // 用 stocked_qty(舊資料 stocked=true 視為全部)判斷實際配到的量
      const shippedItems = (o.items || []).filter(it => {
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        return sq > 0;
      });
      // 依款式聚合實際配到的 stocked_qty
      const groupByName = new Map();
      for (const it of shippedItems) {
        const parts = String(it.name).split(" / ");
        const productName = parts[0] || it.name;
        const variantName = parts.slice(1).join(" / ");
        const displayName = variantName ? `${productName} / ${variantName}` : productName;
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        groupByName.set(displayName, (groupByName.get(displayName) || 0) + sq);
      }
      // 從 in_stock 扣掉 stock(貨真的離開了業者手上)
      for (const [displayName, qty] of groupByName.entries()) {
        try {
          const { data: existing } = await supabase.from("in_stock")
            .select("*").eq("name", displayName).maybeSingle();
          if (existing) {
            const newStock = Math.max(0, (Number(existing.stock) || 0) - qty);
            await supabase.from("in_stock").update({
              stock: newStock,
              updated_at: new Date().toISOString()
            }).eq("id", existing.id);
          }
        } catch (e) { console.warn("扣庫存失敗:", e); }
      }
      // 更新訂單狀態
      const { error } = await supabase.from("orders").update({ status: safeS, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) { toast("更新失敗"); return; }
      // 重新拉 in_stock
      const inStockRes = await supabase.from("in_stock").select("*").order("created_at", { ascending: false });
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === id ? { ...x, status: safeS } : x),
        inStock: inStockRes.data || d.inStock,
      }));
      const totalDeducted = Array.from(groupByName.values()).reduce((a, b) => a + b, 0);
      logAction("訂單已寄出", `#${o.no} · 扣庫存 ${totalDeducted} 件`);
      toast(`✅ 已寄出${totalDeducted > 0 ? ` · 從庫存扣除 ${totalDeducted} 件` : ""}`);
      return;
    }

    // 一般狀態更新
    const { error } = await supabase.from("orders").update({ status: safeS, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.map(o => o.id === id ? { ...o, status: safeS } : o) }));
    logAction("更新訂單狀態", `#${o?.no} → ${ORDER_STATUS[safeS]?.label}`);
    toast("狀態已更新");
  };
  const del = async (id) => {
    if (!window.confirm("確定刪除？")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== id) }));
    toast("已刪除");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: mobile ? "0 16px" : 0 }}>
      {/* 手機版頂部:可點統計方塊(3 個) */}
      {mobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
          {[
            { val: totalCount, label: "全部", filter: "all", color: C.text },
            { val: pendingCount, label: "待採買", filter: "pending", color: C.pinkDark },
            { val: boughtCount, label: "已採買", filter: "bought", color: C.greenDark },
          ].map(s => {
            const active = filter === s.filter;
            return (
              <button key={s.filter} onClick={() => changeFilter(s.filter)}
                style={{ padding: "13px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer", transition: "all .15s", background: active ? C.accent : C.bgCard, color: active ? "#fff" : C.text, border: `0.5px solid ${active ? C.accent : C.border}` }}>
                <div style={{ fontSize: 20, fontWeight: 500, color: active ? "#fff" : s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, marginTop: 2, opacity: active ? .85 : .65 }}>{s.label}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* 篩選按鈕列(其他細部狀態) */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
        {STATUS_KEYS.filter(s => mobile ? !["all","pending","bought"].includes(s) : true).map(s => {
          const count = s === "all" ? data.orders.length : data.orders.filter(o => o.status === s).length;
          const isActive = filter === s;
          return (
            <button key={s} onClick={() => changeFilter(s)} className={`tab-btn${isActive ? " active" : ""}`}>
              {s === "all" ? "全部" : ORDER_STATUS[s]?.label}
              <span style={{ marginLeft: 4, fontSize: 11, opacity: .7 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* 操作列 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 11, color: C.muted }}>
          顯示 <span style={{ color: C.text, fontWeight: 500 }}>{filtered.length}</span> 筆
          {filter !== "all" && ` · ${ORDER_STATUS[filter]?.label}`}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {!mobile && <Btn sm variant="ghost" icon="file-export" onClick={() => { exportCSV(data.orders); toast("CSV 已匯出"); }}>匯出</Btn>}
          <Btn sm icon="plus" onClick={() => setShowAdd(true)}>新增訂單</Btn>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 24px", color: C.muted, background: C.bgCard, borderRadius: 16, border: `0.5px solid ${C.border}` }}>
          <Icon name="package-off" size={32} color={C.faint} />
          <div style={{ marginTop: 8, fontSize: 13 }}>此狀態沒有訂單</div>
          <Btn sm variant="ghost" style={{ marginTop: 12 }} onClick={() => changeFilter("all")}>顯示全部</Btn>
        </div>
      )}
      {filtered.map(o => <OrderCard key={o.id} o={o} updateStatus={updateStatus} del={del} setData={setData} toast={toast} members={data.members||[]} />)}
      {showAdd && <AddOrderModal data={data} setData={setData} onClose={() => setShowAdd(false)} toast={toast} />}
    </div>
  );
}

// ─── 訂單卡片元件 ────────────────────────────────────────────────
function OrderCard({ o, updateStatus, del, setData, toast, members = [] }) {
  // 找出這位客人的會員資料 (用 line_user_id 或 customer_line_id 比對)
  const memberInfo = members.find(m =>
    (o.customer_line_id && m.line_user_id === o.customer_line_id) ||
    (o.customerId && m.line_user_id === o.customerId)
  );
  // 主顯示 = 社群名,副 = LINE 名
  const displayName = memberInfo?.community_name || o.customer_name || o.customerName || "未命名";
  const displayLineName = memberInfo?.line_name || "";
  const [expanded, setExpanded] = useState(false);

  const cost = (o.items||[]).reduce((s,it)=>s+(it.cost||0)*(it.qty||1),0);
  const total = o.total || 0;
  const deposit = Number(o.deposit) || Number(o.deposit_amount) || 0;
  const shippingFee = Number(o.shipping_fee) || 0;
  const finalPayment = Math.max(0, total + shippingFee - deposit);
  const totalPaid = (o.deposit_paid ? deposit : 0) + (o.final_paid ? finalPayment : 0);
  const totalUnpaid = total + shippingFee - totalPaid;
  const orderDate = o.created_at ? new Date(o.created_at).toLocaleDateString("zh-TW") : (o.createdAt||"");

  // 付款狀態標籤
  const payStatus = () => {
    if (o.final_paid) return { label:"尾款已付", color:C.green, bg:C.greenBg };
    if (o.deposit_paid) return { label:"已付訂金", color:C.accent, bg:C.accentBg };
    return { label:"未付款", color:C.pinkDark, bg:C.pinkBg };
  };
  const ps = payStatus();

  return (
    <div style={{ background:C.surface, borderRadius:16, border:`1.5px solid ${C.border}`, overflow:"hidden", boxShadow:C.shadow }}>
      {/* ── 訂單頭部（點擊展開） ── */}
      <div style={{ padding:"13px 14px", cursor:"pointer" }} onClick={()=>setExpanded(v=>!v)}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              <span style={{ fontSize:11, color:C.muted }}>#{o.no}</span>
              <span style={{ fontSize:11, color:C.muted }}>·</span>
              <span style={{ fontSize:11, color:C.muted }}>{orderDate}</span>
            </div>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4, display:"flex", alignItems:"baseline", gap:6, flexWrap:"wrap" }}>
              <span>{displayName}</span>
              {displayLineName && displayLineName !== displayName && (
                <span style={{ fontSize:11, color:C.accent, fontWeight:500 }}>@{displayLineName}</span>
              )}
            </div>
            <div style={{ fontSize:12, color:C.muted }}>
              {(o.items||[])[0]?.name}{(o.items||[]).length > 1 ? ` 等 ${(o.items||[]).length} 件` : ""}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
            <StatusBadge status={o.status}/>
            <span style={{ fontSize:11, padding:"2px 8px", borderRadius:99, background:ps.bg, color:ps.color, fontWeight:600 }}>{ps.label}</span>
            <span style={{ fontSize:14, fontWeight:700, color:C.accentDark }}>{fmtMoney(total)}</span>
          </div>
        </div>
        {/* 展開箭頭 */}
        <div style={{ textAlign:"center", marginTop:4, fontSize:11, color:C.faint }}>
          {expanded ? "▲ 收起" : "▼ 展開詳情"}
        </div>
      </div>

      {/* ── 展開詳情 ── */}
      {expanded && (
        <div style={{ borderTop:`1px solid ${C.border}` }}>

          {/* 待審核訂單:接受 / 拒絕 快速鈕 */}
          {o.status === "pending_review" && (
            <div style={{ padding:"14px", background:C.purpleBg, display:"flex", gap:8, borderBottom:`1px solid ${C.border}` }}>
              <button onClick={async e => {
                e.stopPropagation();
                if (!window.confirm("確定接受此訂單?")) return;
                const { error } = await supabase.from("orders").update({ status: "pending", updated_at: new Date().toISOString() }).eq("id", o.id);
                if (error) { toast?.("更新失敗"); return; }
                setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, status: "pending" } : x) }));
                logAction("接受訂單", `#${o.no} → 待採買`);
                toast?.("✅ 已接受訂單,轉為待採買");
              }}
                style={{ flex:1, padding:"11px", background:C.green, color:"#fff", border:"none", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Icon name="check" size={15} /> 接受訂單
              </button>
              <button onClick={async e => {
                e.stopPropagation();
                const reason = window.prompt("拒絕原因(可選):", "");
                if (reason === null) return;  // 客人按取消
                const { error } = await supabase.from("orders").update({
                  status: "cancelled",
                  updated_at: new Date().toISOString(),
                  cancel_reason: reason || "業者拒絕付款"
                }).eq("id", o.id);
                if (error) {
                  // fallback:沒 cancel_reason 欄位
                  const { error: e2 } = await supabase.from("orders").update({ status: "cancelled", updated_at: new Date().toISOString() }).eq("id", o.id);
                  if (e2) { toast?.("更新失敗"); return; }
                }
                setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, status: "cancelled", cancel_reason: reason || "業者拒絕付款" } : x) }));
                logAction("拒絕訂單", `#${o.no} · ${reason || "無理由"}`);
                toast?.("已拒絕訂單");
              }}
                style={{ flex:1, padding:"11px", background:C.red, color:"#fff", border:"none", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Icon name="x" size={15} /> 拒絕付款
              </button>
            </div>
          )}

          {/* 區塊一:訂單概覽 */}
          <div style={{ padding:"14px 14px 10px", background:C.bgDeep }}>
            <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:10, letterSpacing:.5 }}>訂單概覽</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                { label:"訂單編號", value:`#${o.no}` },
                { label:"客人", value: displayLineName && displayLineName !== displayName
                    ? <span>{displayName} <span style={{ color:C.accent, fontSize:11 }}>@{displayLineName}</span></span>
                    : displayName },
                { label:"訂單狀態", value:<StatusBadge status={o.status}/> },
                { label:"付款狀態", value:<span style={{ fontSize:11, padding:"2px 8px", borderRadius:99, background:ps.bg, color:ps.color, fontWeight:600 }}>{ps.label}</span> },
                { label:"總金額", value:fmtMoney(total+shippingFee), bold:true },
                { label:"已付款", value:fmtMoney(totalPaid), color:C.green },
                { label:"未付款", value:fmtMoney(Math.max(0,totalUnpaid)), color:totalUnpaid>0?C.red:C.green },
                { label:"下單日期", value:orderDate },
              ].map(item=>(
                <div key={item.label} style={{ display:"flex", flexDirection:"column", gap:2 }}>
                  <span style={{ fontSize:10, color:C.faint }}>{item.label}</span>
                  <span style={{ fontSize:13, fontWeight:item.bold?700:500, color:item.color||C.text }}>{item.value}</span>
                </div>
              ))}
            </div>
            {/* 狀態更改 */}
            <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:11, color:C.muted }}>更改狀態：</span>
              <select value={o.status} onChange={e=>{ e.stopPropagation(); updateStatus(o.id, e.target.value); }}
                style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"5px 8px", fontSize:12, cursor:"pointer" }}>
                {Object.entries(ORDER_STATUS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {/* 區塊二:商品明細 */}
          <div style={{ padding:"14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontSize:11, color:C.muted, fontWeight:600, letterSpacing:.5 }}>商品明細</div>
              <div style={{ fontSize:10, color:C.faint }}>點「成本」修改 · × 刪除</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {(o.items||[]).map((it,idx)=>(
                <div key={idx} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:C.bgDeep, borderRadius:10 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:C.surface, flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                    {it.image?.startsWith("data:")||it.image?.startsWith("http")
                      ?<img src={it.image} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
                      :it.image||"🛒"}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:500, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      {(() => {
                        const qty = Number(it.qty) || 1;
                        const stockedQty = Number(it.stocked_qty) || (it.stocked ? qty : 0);
                        if (stockedQty >= qty) {
                          return <span style={{ background:C.green, color:"#fff", padding:"1px 6px", borderRadius:4, fontSize:9, fontWeight:600, flexShrink:0 }}>✓ 已配貨</span>;
                        } else if (stockedQty > 0) {
                          return <span style={{ background:C.pinkDark, color:"#fff", padding:"1px 6px", borderRadius:4, fontSize:9, fontWeight:600, flexShrink:0 }}>部分配貨 {stockedQty}/{qty}</span>;
                        } else if (it.purchased) {
                          return <span style={{ background:C.accent, color:"#fff", padding:"1px 6px", borderRadius:4, fontSize:9, fontWeight:600, flexShrink:0 }}>已採買待配貨</span>;
                        }
                        return null;
                      })()}
                      <span>{it.name}</span>
                    </div>
                    <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>×{it.qty}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.accentDark }}>{fmtMoney((it.price||0)*(it.qty||1))}</div>
                    <button onClick={async e => {
                      e.stopPropagation();
                      const currentCost = it.cost || 0;
                      const input = window.prompt(`請輸入「${it.name}」的單價成本 NT$(目前:${currentCost})`, String(currentCost));
                      if (input === null) return;
                      const newCost = Math.max(0, Number(input) || 0);
                      const newItems = (o.items||[]).map((x, i) => i === idx ? { ...x, cost: newCost } : x);
                      const newTotal  = newItems.reduce((s, x) => s + (Number(x.price)||0) * (Number(x.qty)||1), 0);
                      const newCostSum = newItems.reduce((s, x) => s + (Number(x.cost)||0) * (Number(x.qty)||1), 0);
                      const newProfit = newTotal - newCostSum;
                      const { error } = await supabase.from("orders")
                        .update({ items: newItems, total: newTotal, profit: newProfit, updated_at: new Date().toISOString() })
                        .eq("id", o.id);
                      if (error) { toast(`更新失敗:${error.message||"未知錯誤"}`); return; }
                      setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, items: newItems, total: newTotal, profit: newProfit } : x) }));
                      logAction("修改品項成本", `#${o.no} · ${it.name} · ${currentCost} → ${newCost}`);
                      toast("已更新成本");
                    }}
                      title="點擊修改成本"
                      style={{ background:"none", border:"none", fontSize:11, color:C.muted, cursor:"pointer", padding:"1px 4px", textDecoration:"underline dotted", textUnderlineOffset:2 }}>
                      成本 {fmtMoney((it.cost||0)*(it.qty||1))}
                    </button>
                  </div>
                  <button onClick={async () => {
                    if (!window.confirm(`確定刪除「${it.name}」?`)) return;
                    const newItems = (o.items||[]).filter((_, i) => i !== idx);
                    if (newItems.length === 0) {
                      if (!window.confirm("這是訂單最後一個品項,刪除後訂單將沒有商品。確定?")) return;
                    }
                    // 重新計算總金額與利潤
                    const newTotal  = newItems.reduce((s, x) => s + (Number(x.price)||0) * (Number(x.qty)||1), 0);
                    const newCost   = newItems.reduce((s, x) => s + (Number(x.cost)||0)  * (Number(x.qty)||1), 0);
                    const newProfit = newTotal - newCost;
                    const { error } = await supabase
                      .from("orders")
                      .update({ items: newItems, total: newTotal, profit: newProfit, updated_at: new Date().toISOString() })
                      .eq("id", o.id);
                    if (error) { toast(`刪除失敗:${error.message||"未知錯誤"}`); return; }
                    setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, items: newItems, total: newTotal, profit: newProfit } : x) }));
                    logAction("刪除訂單品項", `#${o.no} · ${it.name}`);
                    toast("已刪除品項");
                  }}
                    title="刪除此品項"
                    style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:18, lineHeight:1, padding:"4px 8px", flexShrink:0, opacity:.6, transition:"opacity .15s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = .6}>×</button>
                </div>
              ))}
            </div>
            {/* 小計 */}
            <div style={{ marginTop:10, padding:"10px 12px", background:C.bgDeep, borderRadius:10, display:"flex", flexDirection:"column", gap:4 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted }}>
                <span>商品小計</span><span>{fmtMoney(total)}</span>
              </div>
              {shippingFee>0&&<div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted }}>
                <span>國際運費</span><span>{fmtMoney(shippingFee)}</span>
              </div>}
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted }}>
                <span>成本</span><span>{fmtMoney(cost)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700, color:C.green, borderTop:`1px solid ${C.border}`, paddingTop:6, marginTop:2 }}>
                <span>利潤</span><span>{fmtMoney(o.profit||0)}</span>
              </div>
            </div>
          </div>

          {/* 區塊三：付款紀錄 */}
          <div style={{ padding:"0 14px 14px" }}>
            <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:10, letterSpacing:.5 }}>付款紀錄</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {/* 訂金紀錄 */}
              {deposit > 0 && (
                <div style={{ padding:"10px 12px", background: o.deposit_paid?C.greenBg:C.pinkBg, borderRadius:10, border:`1px solid ${o.deposit_paid?C.green:C.pinkDark}30` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:o.deposit_paid?C.green:C.pinkDark }}>
                        {o.deposit_paid?"✓ 訂金已收":"○ 訂金待收"}
                      </div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>
                        {o.deposit_bank ? o.deposit_bank : (o.payment_method==="transfer"?"匯款":o.payment_method==="cod"?"貨到付款":"")}
                        {o.bank_code?` (${o.bank_code})`:""}
                        {o.deposit_last5?` · 末5碼:${o.deposit_last5}`:""}
                        {o.payment_date?` · ${o.payment_date}`:""}
                      </div>
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:o.deposit_paid?C.green:C.pinkDark }}>{fmtMoney(deposit)}</div>
                  </div>
                  {!o.deposit_paid && (
                    <button onClick={async (e) => {
                      e.stopPropagation();
                      const beforePurchase = !o.status || ["pending_review", "cancelled"].includes(o.status);
                      const updateData = { deposit_paid: true };
                      if (beforePurchase) updateData.status = "pending";
                      const { error } = await supabase.from("orders").update(updateData).eq("id", o.id);
                      if (error) { if (toast) toast("更新失敗"); return; }
                      setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, ...updateData } : x) }));
                      if (toast) toast(updateData.status === "pending" ? "✅ 已收訂金，訂單轉為「待採買」" : "✅ 已標記為訂金已收");
                    }}
                      style={{ marginTop:10, width:"100%", padding:"7px 12px", background:C.green, color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>
                      ✓ 標記訂金已收
                    </button>
                  )}
                </div>
              )}
              {/* 尾款紀錄 */}
              {(shippingFee>0||deposit>0) && (
                <div style={{ padding:"10px 12px", background: o.final_paid?C.greenBg:C.blueBg, borderRadius:10, border:`1px solid ${o.final_paid?C.green:C.blue}30` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:o.final_paid?C.green:C.blue }}>
                        {o.final_paid?"✓ 尾款已收":"○ 尾款待收"}
                      </div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>
                        商品 {fmtMoney(total)} + 運費 {fmtMoney(shippingFee)} - 訂金 {fmtMoney(deposit)}
                      </div>
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:o.final_paid?C.green:C.blue }}>{fmtMoney(finalPayment)}</div>
                  </div>
                </div>
              )}
              {/* 若無訂金/尾款，顯示一般收款狀態 */}
              {deposit===0 && shippingFee===0 && (
                <div style={{ padding:"10px 12px", background:o.paid?C.greenBg:C.pinkBg, borderRadius:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:o.paid?C.green:C.pinkDark }}>{o.paid?"✓ 已收款":"○ 未收款"}</div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>
                        {o.payment_method==="transfer"?"匯款":o.payment_method==="cod"?"貨到付款":""}
                        {o.bank_code?` (${o.bank_code})`:""}
                        {o.payment_date?` · ${o.payment_date}`:""}
                      </div>
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:o.paid?C.green:C.pinkDark }}>{fmtMoney(total)}</div>
                  </div>
                </div>
              )}
            </div>
            {/* 付款編輯 */}
            <div style={{ marginTop:10 }}>
              <PaymentFields order={o} setData={setData} toast={toast}/>
            </div>
          </div>

          {/* 操作列 */}
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:C.bgDeep }}>
            <div style={{ fontSize:12 }}>
              <span style={{ color:C.muted }}>成本 {fmtMoney(cost)}</span>
              <span style={{ margin:"0 6px", color:C.faint }}>·</span>
              <span style={{ color:C.green, fontWeight:700 }}>利潤 {fmtMoney(o.profit||0)}</span>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {o.status==="shipped"&&(
                <button onClick={async()=>{
                  if(!window.confirm(`確定封存訂單 #${o.no}？`))return;
                  const now=new Date().toISOString();
                  const{data:updated,error}=await supabase.from("orders").update({archived:true,archived_at:now}).eq("id",o.id).select();
                  if(error){
                    console.error("封存失敗:",error);
                    toast(`封存失敗:${error.message || "資料庫可能缺 archived 欄位"}`);
                    return;
                  }
                  if(!updated || updated.length === 0){
                    toast("封存失敗:資料未更新,請檢查 Supabase 的 archived 欄位是否存在");
                    return;
                  }
                  setData(d=>({...d,orders:d.orders.map(x=>x.id===o.id?{...x,archived:true,archived_at:now}:x)}));
                  toast("已封存 📦");
                }} style={{ background:"#eaede8",border:"none",color:"#3d4a3e",padding:"0 10px",height:30,borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:600 }}>📦 封存</button>
              )}
              <button onClick={()=>del(o.id)} style={{ background:C.redBg,border:"none",color:C.red,width:30,height:30,borderRadius:8,fontSize:15,cursor:"pointer" }}>🗑</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddOrderModal({ data, setData, onClose, toast }) {
  // 1. 從 members 撈會員清單(每位會員的 line_user_id 是唯一 key)
  const memberList = (data.members || []).map(m => ({
    id: m.line_user_id || m.id,
    name: m.community_name || m.line_name || m.recipient_name || "未命名",  // 主顯示 = 社群名
    lineName: m.line_name || "",  // 副 = LINE 名
    communityName: m.community_name || "",
    phone: m.phone || "",
    isMember: true,
    source: "會員",
  }));

  // 2. 從訂單聚合「曾下過單但不在 members 表的客人」
  const orderCustomers = [];
  const seen = new Set(memberList.map(m => m.id));
  data.orders.forEach(o => {
    const key = o.customer_line_id || o.customerId;
    const cname = o.customer_name || o.customerName;
    if (cname) {
      // 用 line_id 為主,沒有就用名字當 key(避免空 ID 重複)
      const fallbackKey = key || `name:${cname}`;
      if (!seen.has(fallbackKey)) {
        seen.add(fallbackKey);
        orderCustomers.push({ id: fallbackKey, name: cname, communityName: "", phone: "", isMember: false, source: "歷史訂單" });
      }
    }
  });

  // 3. 從許願清單聚合「許過願但還沒下單也不在 members 表的客人」
  (data.wishlist || []).forEach(w => {
    const key = w.customer_line_id || w.line_user_id || w.customerId;
    const cname = w.customer_name || w.customerName;
    if (cname) {
      const fallbackKey = key || `name:${cname}`;
      if (!seen.has(fallbackKey)) {
        seen.add(fallbackKey);
        orderCustomers.push({ id: fallbackKey, name: cname, communityName: "", phone: "", isMember: false, source: "許願清單" });
      }
    }
  });

  const allCustomers = [...memberList, ...orderCustomers];

  const [customerId, setCustomerId] = useState(allCustomers[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [items, setItems] = useState([
    { id: secureUid(), name: "", cost: "", price: "", qty: "1", spec: "", variant: "", image: "" }
  ]);

  // 圖片壓縮+轉 base64
  const handleImagePick = (itId, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("圖片不能超過 2MB"); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        // 壓縮成最長邊 600px
        const canvas = document.createElement("canvas");
        const max = 600;
        let w = img.width, h = img.height;
        if (w > h && w > max) { h = h * max / w; w = max; }
        else if (h > max) { w = w * max / h; h = max; }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const data = canvas.toDataURL("image/jpeg", 0.82);
        updateItem(itId, "image", data);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  // 搜尋過濾
  const filteredCustomers = searchTerm
    ? allCustomers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.communityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.lineName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      )
    : allCustomers;

  const selectedCustomer = allCustomers.find(c => c.id === customerId);

  const useNewCustomer = () => {
    const n = sanitize(newCustomerName, 50);
    if (!n) { alert("請填寫客人姓名"); return; }
    const tempId = `temp:${n}:${Date.now()}`;
    setCustomerId(tempId);
    // 把新客人塞進列表(暫時)
    allCustomers.push({ id: tempId, name: n, communityName: "", phone: "", isMember: false });
    setShowNewCustomer(false);
    setNewCustomerName("");
    setSearchTerm("");
  };

  const updateItem = (id, key, val) => setItems(p => p.map(it => it.id === id ? { ...it, [key]: val } : it));
  const addItem = () => setItems(p => [...p, { id: secureUid(), name: "", cost: "", price: "", qty: "1", spec: "", variant: "", image: "" }]);
  const removeItem = id => setItems(p => p.filter(it => it.id !== id));

  const save = async () => {
    // 取得最新的 selected (可能是剛新增的臨時客人)
    let c = allCustomers.find(x => x.id === customerId);
    // 臨時新增的客人在重新計算時會丟失,所以從 newCustomerName/customerId 重建
    if (!c && customerId && customerId.startsWith("temp:")) {
      const parts = customerId.split(":");
      c = { id: customerId, name: parts[1] || "臨時客人", isMember: false };
    }
    if (!c) return alert("請選擇客人");
    const validItems = items.filter(it => it.name.trim());
    if (!validItems.length) return alert("請至少填寫一項商品名稱");

    const builtItems = validItems.map(it => {
      const priceNum = Math.max(0, Number(it.price) || 0);
      const costNum  = Math.max(0, Number(it.cost)  || 0);
      const qtyNum   = Math.max(1, Math.min(999, Number(it.qty) || 1));
      const fullName = [sanitize(it.name, 100), it.spec && sanitize(it.spec, 50), it.variant && sanitize(it.variant, 50)].filter(Boolean).join(" / ");
      return { name: fullName, cost: costNum, price: priceNum, qty: qtyNum, note: "", image: it.image || "" };
    });

    const total  = builtItems.reduce((s, it) => s + it.price * it.qty, 0);
    const profit = builtItems.reduce((s, it) => s + (it.price - it.cost) * it.qty, 0);
    const no = String(100000 + Math.floor(Math.random() * 900000));

    const orderData = {
      id: secureUid(), no,
      customer_line_id: c.id,
      customer_name: sanitize(c.name, 50),
      status: "pending",
      items: builtItems,
      total, profit,
      created_at: new Date().toISOString(),
    };

    try {
      const { data: saved, error } = await supabase.from("orders").insert([orderData]).select().single();
      if (error) throw error;
      setData(d => ({ ...d, orders: [saved, ...d.orders] }));
      logAction("手動新增訂單", `${c.name} · ${builtItems.length} 項`);
      toast("訂單已新增 ✨");
      onClose();
    } catch (e) {
      console.error(e);
      alert("新增失敗，請稍後再試");
    }
  };

  // 計算合計
  const totalAmount = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);
  const itemCount = items.filter(it => it.name.trim()).length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(58,46,36,.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, overflow: "hidden" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="fade" style={{ background: C.bg, width: "100%", maxWidth: 540, height: "100dvh", maxHeight: "100dvh", display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "hidden" }}>

        {/* Header (固定) */}
        <div style={{ padding: "14px 16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: `0.5px solid ${C.border}`, background: C.bgCard, flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: "50%", background: C.bgDeep, border: "none", color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="arrow-left" size={17} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: C.faint, letterSpacing: 1.5, fontWeight: 500 }}>新增訂單</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: C.text, marginTop: 1 }}>
              {selectedCustomer ? selectedCustomer.name : "選擇客人"}
            </div>
          </div>
        </div>

        {/* Body (滾動) */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 16px", minWidth: 0 }}>

          {/* 客人區塊(摺疊版) */}
          {selectedCustomer && !showNewCustomer ? (
            <div style={{ background: C.bgCard, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accentBg, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
                {selectedCustomer.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 500, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                  <span>{selectedCustomer.name}</span>
                  {selectedCustomer.lineName && selectedCustomer.lineName !== selectedCustomer.name && (
                    <span style={{ fontSize: 11, color: C.accent, fontWeight: 500 }}>@{selectedCustomer.lineName}</span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                  {selectedCustomer.source || (selectedCustomer.isMember ? "會員" : selectedCustomer.id?.startsWith("temp:") ? "臨時客人" : "歷史訂單")}
                  {selectedCustomer.phone && ` · ${selectedCustomer.phone}`}
                </div>
              </div>
              <button onClick={() => setCustomerId("")} style={{ background: "none", border: "none", color: C.accent, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>更換</button>
            </div>
          ) : (
            // 沒選客人 → 展開客人選擇區
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, letterSpacing: 1, fontWeight: 600 }}>選擇客人 *</div>

              {!showNewCustomer ? (
                <>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      placeholder="搜尋姓名 / 社群 / 電話"
                      style={{ flex: 1, background: C.bgCard, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", color: C.text }}/>
                    <button onClick={() => setShowNewCustomer(true)}
                      style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "9px 14px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="plus" size={14} /> 新增
                    </button>
                  </div>
                  <div style={{ maxHeight: 240, overflowY: "auto", border: `0.5px solid ${C.border}`, borderRadius: 10, background: C.bgCard }}>
                    {filteredCustomers.length === 0 && (
                      <div style={{ padding: "24px 14px", textAlign: "center", fontSize: 12, color: C.muted }}>
                        {searchTerm ? `找不到「${searchTerm}」` : "尚無客人,請按「+ 新增」"}
                      </div>
                    )}
                    {filteredCustomers.map(c => (
                      <button key={c.id} onClick={() => { setCustomerId(c.id); setSearchTerm(""); }}
                        className="row-hover"
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "none", border: "none", borderBottom: `0.5px solid ${C.border}`, cursor: "pointer", textAlign: "left", color: C.text }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.bgDeep, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
                          {c.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: C.text, fontWeight: 500, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                            <span>{c.name}</span>
                            {c.lineName && c.lineName !== c.name && (
                              <span style={{ fontSize: 11, color: C.accent, fontWeight: 500 }}>@{c.lineName}</span>
                            )}
                          </div>
                          <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                            {c.source || (c.isMember ? "會員" : "歷史訂單")}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ background: C.bgCard, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 500, marginBottom: 8 }}>新增臨時客人</div>
                  <input value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)}
                    placeholder="客人姓名(例如:張小姐)" autoFocus
                    onKeyDown={e => e.key === "Enter" && useNewCustomer()}
                    style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", color: C.text, marginBottom: 8 }}/>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={useNewCustomer}
                      style={{ flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                      使用此客人
                    </button>
                    <button onClick={() => { setShowNewCustomer(false); setNewCustomerName(""); }}
                      style={{ background: "none", color: C.muted, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer" }}>
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 商品品項區 */}
          {selectedCustomer && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, fontWeight: 600 }}>商品 · {items.length} 項</div>
                <button onClick={addItem} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: C.accent, background: C.accentBg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontWeight: 500 }}>
                  <Icon name="plus" size={12} /> 加品項
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((it, idx) => (
                  <div key={it.id} style={{ background: C.bgCard, borderRadius: 12, padding: 12, border: `0.5px solid ${C.border}`, position: "relative" }}>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(it.id)}
                        style={{ position: "absolute", top: 8, right: 8, background: C.bgDeep, border: "none", color: C.muted, width: 24, height: 24, borderRadius: "50%", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="x" size={12} />
                      </button>
                    )}
                    <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
                      {/* 圖片上傳 */}
                      <label style={{ width: 64, height: 64, flexShrink: 0, background: C.bgDeep, border: `1px dashed ${C.borderDeep}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", position: "relative" }}>
                        {it.image ? (
                          <>
                            <img src={it.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button onClick={e => { e.preventDefault(); updateItem(it.id, "image", ""); }}
                              style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, background: "rgba(0,0,0,.55)", color: "#fff", border: "none", borderRadius: "50%", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon name="x" size={10} />
                            </button>
                          </>
                        ) : (
                          <div style={{ textAlign: "center", color: C.muted }}>
                            <Icon name="camera" size={18} />
                            <div style={{ fontSize: 9, marginTop: 2 }}>圖片</div>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={e => handleImagePick(it.id, e.target.files?.[0])} style={{ display: "none" }} />
                      </label>

                      {/* 右側欄位 */}
                      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                        <input value={it.name} onChange={e => updateItem(it.id, "name", e.target.value)}
                          placeholder={`品項 ${idx + 1} 名稱 *`}
                          style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "7px 10px", color: C.text, fontWeight: 500, boxSizing: "border-box", minWidth: 0 }} />
                        <input value={it.variant} onChange={e => updateItem(it.id, "variant", e.target.value)}
                          placeholder="規格 / 款式(例如:草莓 50ml)"
                          style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", color: C.text, fontSize: 12, boxSizing: "border-box", minWidth: 0 }} />
                      </div>
                    </div>

                    {/* 第二行:售價 / 成本 / 數量 */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8, minWidth: 0 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, fontWeight: 600 }}>售價 NT$ *</div>
                        <input type="number" inputMode="numeric" value={it.price} onChange={e => updateItem(it.id, "price", e.target.value)} placeholder="0"
                          style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "6px 8px", color: C.text, boxSizing: "border-box", minWidth: 0 }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, fontWeight: 600 }}>成本 NT$</div>
                        <input type="number" inputMode="numeric" value={it.cost} onChange={e => updateItem(it.id, "cost", e.target.value)} placeholder="0"
                          style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "6px 8px", color: C.text, boxSizing: "border-box", minWidth: 0 }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, fontWeight: 600 }}>數量</div>
                        <input type="number" inputMode="numeric" value={it.qty} onChange={e => updateItem(it.id, "qty", e.target.value)} placeholder="1"
                          style={{ width: "100%", background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "6px 8px", color: C.text, textAlign: "center", boxSizing: "border-box", minWidth: 0 }} />
                      </div>
                    </div>

                    {it.price && Number(it.price) > 0 && (
                      <div style={{ fontSize: 10, color: it.cost && Number(it.cost) > 0 ? C.green : C.muted, marginTop: 6, textAlign: "right" }}>
                        {it.cost && Number(it.cost) > 0
                          ? `小計 NT$${(Number(it.price) * Number(it.qty || 1)).toLocaleString()} · 利潤 NT$${((Number(it.price) - Number(it.cost)) * Number(it.qty || 1)).toLocaleString()}`
                          : `小計 NT$${(Number(it.price) * Number(it.qty || 1)).toLocaleString()}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer (固定) */}
        <div style={{ padding: "10px 16px 14px", borderTop: `0.5px solid ${C.border}`, background: C.bgCard, flexShrink: 0, paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.muted }}>{itemCount} 項商品</div>
              <div style={{ fontSize: 19, fontWeight: 500, color: C.text }}>NT${totalAmount.toLocaleString()}</div>
            </div>
            <Btn onClick={save} icon="check" disabled={!selectedCustomer || itemCount === 0}>建立訂單</Btn>
          </div>
        </div>

      </div>
    </div>
  );
}

function ReviewPage({ data, setData, toast }) {
  const pending = data.orders.filter(o => o.status === "pending_review");
  const approve = async id => {
    const o = data.orders.find(x => x.id === id);
    const { error } = await supabase.from("orders").update({ status: "pending" }).eq("id", id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.map(o => o.id===id?{...o,status:"pending"}:o) }));
    logAction("審核通過", `訂單 #${o?.no} · ${o?.customer_name||o?.customerName}`);
    toast("已審核通過 ✅");
  };
  const reject = async id => {
    const o = data.orders.find(x => x.id === id);
    if (!window.confirm(`確定拒絕並刪除訂單 #${o?.no}？此操作無法復原。`)) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== id) }));
    logAction("拒絕並刪除訂單", `訂單 #${o?.no} · ${o?.customerName}`);
    toast("已拒絕並刪除訂單");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>待審核 ({pending.length})</div>
      {!pending.length && <Card style={{ textAlign: "center", color: C.muted }}>✨ 沒有待審核訂單</Card>}
      {pending.map(o => (
        <Card key={o.id}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{o.customerName} · #{o.no}</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>{o.items.map(it=>`${it.name} ×${it.qty}`).join("・")}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn sm variant="success" onClick={() => approve(o.id)}>✅ 審核通過</Btn>
            <Btn sm variant="danger"  onClick={() => reject(o.id)}>❌ 拒絕</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

function CatalogPage({ data, setData, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const toggle = async (id) => {
    const p = data.products.find(x => x.id === id);
    if (!p) return;
    const newStatus = p.status === "on" ? "off" : "on";
    const { error } = await supabase.from("products").update({ status: newStatus }).eq("id", id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, products: d.products.map(x => x.id===id ? {...x, status:newStatus} : x) }));
    toast(newStatus === "on" ? "已上架" : "已下架");
  };

  const del = async (id) => {
    if (!window.confirm("確定刪除？")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, products: d.products.filter(p => p.id !== id) }));
    toast("已刪除");
  };

  const saveNew = async (prod) => {
    let { data: saved, error } = await supabase.from("products").insert([{ ...prod, created_at: new Date().toISOString() }]).select().single();
    // Fallback: 若 Supabase 沒有 rate 欄位,把 rate 拿掉重試
    if (error && /rate/i.test(error.message || "")) {
      const { rate, ...rest } = prod;
      ({ data: saved, error } = await supabase.from("products").insert([{ ...rest, created_at: new Date().toISOString() }]).select().single());
      if (!error) toast("商品已新增(rate 欄位未存,建議至 Supabase 加 rate 欄位)");
    }
    if (error) {
      console.error("新增失敗:", error);
      toast(`新增失敗:${error.message || "未知錯誤"}`);
      return;
    }
    setData(d => ({ ...d, products: [saved, ...d.products] }));
    if (!/rate/i.test(error?.message || "")) toast("商品已新增");
    setShowAdd(false);
  };

  const saveEdit = async (prod) => {
    let { error } = await supabase.from("products").update(prod).eq("id", prod.id);
    // Fallback: 若 Supabase 沒有 rate 欄位,把 rate 拿掉重試
    if (error && /rate/i.test(error.message || "")) {
      const { rate, ...rest } = prod;
      ({ error } = await supabase.from("products").update(rest).eq("id", prod.id));
      if (!error) toast("已儲存(rate 欄位未存,建議至 Supabase 加 rate 欄位)");
    }
    if (error) {
      console.error("儲存失敗:", error);
      toast(`儲存失敗:${error.message || "未知錯誤"}`);
      return;
    }
    setData(d => ({ ...d, products: d.products.map(p => p.id===prod.id ? prod : p) }));
    if (!/rate/i.test(error?.message || "")) toast("已儲存");
    setEditing(null);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>賣場管理</div>
        <Btn sm onClick={() => setShowAdd(true)}>＋ 新增商品</Btn>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {data.products.length === 0 && (
          <div style={{ padding:"40px 20px", textAlign:"center", color:C.muted, background:C.bgCard, borderRadius:14, border:`0.5px solid ${C.border}` }}>
            尚無商品,點右上「+ 新增商品」開始
          </div>
        )}
        {data.products.map(p => {
          // 計算售價範圍
          const prices = (p.variants || []).map(v => Number(v.price) || 0).filter(x => x > 0);
          const minP = prices.length ? Math.min(...prices) : 0;
          const maxP = prices.length ? Math.max(...prices) : 0;
          return (
            <div key={p.id} style={{ background:C.bgCard, border:`0.5px solid ${C.border}`, borderRadius:14, overflow:"hidden", boxShadow:C.shadow }}>
              <div style={{ display:"flex", gap:12, padding:"12px 14px" }}>
                {/* 左側商品圖 */}
                <div style={{ width:72, height:72, flexShrink:0, background:C.bgDeep, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  {p.image && p.image.startsWith("data:") ? (
                    <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  ) : (
                    <Icon name="photo" size={28} color={C.faint} />
                  )}
                </div>
                {/* 右側資訊 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:6 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, color:C.faint, letterSpacing:.5, marginBottom:2 }}>{p.category || "未分類"}</div>
                      <div style={{ fontSize:14, fontWeight:500, color:C.text, lineHeight:1.3, wordBreak:"break-word" }}>{p.name}</div>
                    </div>
                    <span className="pill" style={{ background: p.status==="on"?C.greenBg:C.redBg, color: p.status==="on"?C.greenDark:C.red, flexShrink:0 }}>
                      <Icon name={p.status==="on"?"check":"x"} size={10} />
                      {p.status==="on"?"販售中":"已下架"}
                    </span>
                  </div>
                  {/* 售價 */}
                  {minP > 0 && (
                    <div style={{ fontSize:13, color:C.accentDark, fontWeight:500, marginTop:4 }}>
                      {minP === maxP ? `NT$${minP}` : `$${minP} - $${maxP}`}
                    </div>
                  )}
                  {/* 款式 */}
                  {p.variants && p.variants.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:6 }}>
                      {p.variants.slice(0,4).map(v => (
                        <span key={v.id} style={{ fontSize:10, color:C.textMid, background:C.bgDeep, padding:"2px 8px", borderRadius:99 }}>{v.name}</span>
                      ))}
                      {p.variants.length > 4 && <span style={{ fontSize:10, color:C.muted, padding:"2px 4px" }}>+{p.variants.length-4}</span>}
                    </div>
                  )}
                </div>
              </div>
              {/* 底部操作列 */}
              <div style={{ display:"flex", gap:6, padding:"8px 14px 12px", borderTop:`0.5px dashed ${C.border}` }}>
                <Btn sm variant="soft" icon="edit" onClick={() => setEditing(p)} style={{ flex:1 }}>編輯</Btn>
                <Btn sm variant="ghost" icon={p.status==="on"?"eye-off":"eye"} onClick={() => toggle(p.id)} style={{ flex:1 }}>{p.status==="on"?"下架":"上架"}</Btn>
                <button onClick={() => del(p.id)}
                  style={{ background:"none", border:`0.5px solid ${C.border}`, borderRadius:10, padding:"7px 12px", cursor:"pointer", color:C.red, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && <ProductModal onSave={saveNew} onClose={() => setShowAdd(false)} rate={data.rate} />}
      {editing && <ProductModal product={editing} onSave={saveEdit} onClose={() => setEditing(null)} rate={data.rate} />}
    </div>
  );
}

function ProductModal({ product, onSave, onClose, rate = 0 }) {
  const isEdit = !!product;
  // 客人端 LIFF URL(改成你自己的)
  const CUSTOMER_LIFF_URL = "https://liff.line.me/2009872512-JJAaJ7Bi";

  const shareProduct = async () => {
    if (!product) return;
    const shareData = {
      title: product.name || "分享商品",
      text: `🛍 ${product.name}\n\n點連結加入我的購物車!`,
      url: `${CUSTOMER_LIFF_URL}?product=${encodeURIComponent(product.id)}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // fallback:複製到剪貼簿
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert("✅ 分享連結已複製到剪貼簿");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        // 用戶取消分享不算錯
        console.error(e);
        // 最後 fallback:提示手動複製
        window.prompt("請複製此連結分享:", `${shareData.text}\n${shareData.url}`);
      }
    }
  };

  const [name, setName]         = useState(product?.name || "");
  const [cat, setCat]           = useState(product?.category || "");
  const [productRate, setProductRate] = useState(product?.rate ? String(product.rate) : String(rate || ""));
  const [image, setImage]       = useState(product?.image || ""); // emoji or base64
  const [deadline, setDeadline] = useState(product?.deadline || "");
  const [expectedArrival, setExpectedArrival] = useState(product?.expected_arrival || "");
  const [paymentType, setPaymentType] = useState(product?.payment_type || "full"); // full=付全款, deposit=先付訂金, cod=貨到付款
  const [variants, setVariants] = useState(() => {
    const initRate = Number(product?.rate) || rate || 0;
    return (product?.variants || []).map(v => ({
      ...v,
      cost: v.cost != null ? v.cost : Math.round((Number(v.costJpy)||0) * initRate),
    }));
  });
  const [vName, setVName]       = useState("");
  const [vPrice, setVPrice]     = useState("");
  const [vCostJpy, setVCostJpy] = useState("");
  const [vCostTwd, setVCostTwd] = useState("");
  const [costMode, setCostMode] = useState("twd"); // "twd"=直填台幣, "jpy"=日幣×匯率自動算
  const [uploading, setUploading] = useState(false);

  // 本商品匯率(留空時用 0)
  const effectiveRate = Number(productRate) || 0;

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("圖片不能超過 2MB"); return; }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result); // base64 data URL
      setImgMode("file");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const addVariant = () => {
    const n = sanitize(vName, 50); if (!n) return;
    let jpy = 0, cost = 0;
    if (costMode === "jpy") {
      jpy = Number(vCostJpy) || 0;
      cost = Math.round(jpy * effectiveRate);
    } else {
      // 直填台幣
      cost = Number(vCostTwd) || 0;
      jpy = effectiveRate > 0 ? Math.round(cost / effectiveRate) : 0;
    }
    setVariants(vs => [...vs, { id:secureUid(), name:n, price:Number(vPrice)||0, costJpy:jpy, cost }]);
    setVName(""); setVPrice(""); setVCostJpy(""); setVCostTwd("");
  };
  const removeVariant = id => setVariants(vs => vs.filter(v => v.id !== id));

  const save = () => {
    const cleanName = sanitize(name, 100);
    if (!cleanName) return alert("請填寫商品名稱");
    onSave({
      id: product?.id || secureUid(),
      name: cleanName,
      category: sanitize(cat, 50),
      price: 0,   // 已棄用,以 variants[].price 為主
      rate: Number(productRate) || 0,
      image: image,
      deadline: deadline || null,
      expected_arrival: expectedArrival || null,
      payment_type: paymentType || "full",
      status: product?.status || "on",
      variants,
    });
  };

  return (
    <Modal title={isEdit ? "編輯商品" : "新增賣場商品"} onClose={onClose} wide>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {/* 分享區 (只在編輯已存在商品時顯示) */}
        {isEdit && (
          <div style={{ background: `linear-gradient(135deg, ${C.accentBg} 0%, ${C.pinkBg} 100%)`, borderRadius: 12, padding: "14px 16px", border: `1px dashed ${C.accent}60` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: 12, color: C.accentDark, fontWeight: 700, marginBottom: 3 }}>🔗 分享商品連結</div>
                <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5 }}>分享到 LINE / IG / FB,客人點連結直接進購物頁</div>
              </div>
              <button type="button" onClick={shareProduct}
                style={{ background: C.accent, color: "#fff", border: "none", padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                <Icon name="share" size={14} /> 分享連結
              </button>
            </div>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Input label="商品名稱 *" value={name} onChange={setName} placeholder="資生堂防曬乳" />
          <Input label="分類" value={cat} onChange={setCat} placeholder="藥妝" />
        </div>
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display:"block", marginBottom:5 }}>💱 匯率 ¥1 = NT$</label>
          <input type="number" step="0.001" value={productRate}
            onChange={e => {
              const newStr = e.target.value;
              setProductRate(newStr);
              const newRate = Number(newStr) || 0;
              setVariants(vs => vs.map(v => ({
                ...v,
                cost: Math.round((Number(v.costJpy)||0) * newRate),
              })));
            }}
            placeholder="例如 0.23"
            style={{ width:"100%", maxWidth:200, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing:"border-box" }} />
          <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>影響本商品所有款式的成本計算</div>
        </div>

        {/* 結單時間 + 預計到貨 */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>時間設定(選填)</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div>
              <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display:"block", marginBottom:5 }}>⏰ 結單日期</label>
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                style={{ width:"100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing:"border-box" }}/>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>客人下單截止日</div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display:"block", marginBottom:5 }}>📦 預計到貨</label>
              <input type="date" value={expectedArrival} onChange={e => setExpectedArrival(e.target.value)}
                style={{ width:"100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing:"border-box" }}/>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>顯示給客人參考</div>
            </div>
          </div>
        </div>

        {/* 付款方式設定 */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>💰 付款方式</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { val:"full",    label:"付全款",    desc:"客人下單時付清全額" },
              { val:"deposit", label:"先付訂金",  desc:"客人先付訂金,尾款到台後在賣貨便付" },
              { val:"cod",     label:"貨到付款",  desc:"客人不需先付,到貨時付款" },
            ].map(opt => (
              <label key={opt.val}
                style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"11px 13px", borderRadius:10, cursor:"pointer",
                  background: paymentType===opt.val ? C.accentBg : C.bg,
                  border: `1.5px solid ${paymentType===opt.val ? C.accent : C.border}` }}>
                <input type="radio" name="payment_type" checked={paymentType===opt.val} onChange={()=>setPaymentType(opt.val)}
                  style={{ marginTop:2, accentColor:C.accent, cursor:"pointer" }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:500, color: paymentType===opt.val ? C.accentDark : C.text }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {paymentType === "deposit" && (
            <div style={{ marginTop:12, padding:"12px", background:C.accentBg, borderRadius:10, border:`1px dashed ${C.accent}50` }}>
              <div style={{ fontSize:12, color:C.accentDark, fontWeight:600, marginBottom:4 }}>💡 各款式訂金請至下方「款式設定」個別填寫</div>
              <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>每個款式可以有不同的訂金金額,例如「兔兔」訂金 NT$300,「小八」訂金 NT$500</div>
            </div>
          )}
        </div>

        {/* Image upload section */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>商品圖片</div>
          <div style={{ display:"flex", gap:8, marginBottom:12 }}>

          </div>

          {false ? (
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <Input label="Emoji 圖示" value={image} onChange={v => setImage(v.slice(0,4))} placeholder="💊 🎀 🛍" style={{ flex:1 }} />
              <div style={{ width:56, height:56, background:C.bgDeep, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, border:`1.5px solid ${C.border}`, flexShrink:0 }}>
                {image || "🛒"}
              </div>
            </div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1 }}>
                <label style={{ display:"block", cursor:"pointer" }}>
                  <div style={{ border:`2px dashed ${C.accent}`, borderRadius:12, padding:"16px 20px", textAlign:"center", background:C.accentBg, cursor:"pointer" }}>
                    {uploading ? (
                      <div style={{ color:C.muted, fontSize:13 }}>上傳中…</div>
                    ) : (
                      <>
                        <div style={{ fontSize:24, marginBottom:6 }}>📷</div>
                        <div style={{ fontSize:12, color:C.accentDark, fontWeight:600 }}>點擊選擇圖片</div>
                        <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>JPG / PNG，最大 2MB</div>
                      </>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageFile} style={{ display:"none" }} />
                </label>
              </div>
              {/* Preview */}
              <div style={{ width:80, height:80, background:C.bgDeep, borderRadius:12, overflow:"hidden", border:`1.5px solid ${C.border}`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {image && image.startsWith("data:") ? (
                  <img src={image} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                ) : (
                  <span style={{ fontSize:11, color:C.muted }}>預覽</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Variants */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:6 }}>款式設定</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:8, lineHeight:1.7 }}>
            例如:顏色(紅色、藍色)、尺寸(S / M / L)<br/>客人下單時可從中選擇
          </div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:12, padding:"6px 10px", background:C.accentBg, borderRadius:6, border:`1px solid ${C.border}` }}>
            💱 成本預設=日幣 × 匯率(目前 ¥1 = NT${effectiveRate || "?"}),也可直接修改下方成本欄位
          </div>
          {variants.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:12 }}>
              {variants.map(v => (
                <div key={v.id} style={{ padding:"12px 14px", background:C.bgDeep, borderRadius:10, border:`1px solid ${C.border}`, position:"relative" }}>
                  {/* 款式名稱 + 刪除按鈕 */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{v.name}</div>
                    <button onClick={() => removeVariant(v.id)}
                      style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:18, lineHeight:1, padding:"0 4px" }}>×</button>
                  </div>
                  {/* 上下堆疊:售價 → 匯率 → 日幣 → 成本 */}
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    <div>
                      <div style={{ fontSize:10, color:C.muted, marginBottom:3, fontWeight:500 }}>售價 NT$</div>
                      <input type="number" inputMode="numeric" value={v.price||0}
                        onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, price:Number(e.target.value)||0} : x))}
                        style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", fontSize:14, boxSizing:"border-box", minWidth:0 }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:10, color:C.muted, marginBottom:3, fontWeight:500 }}>💱 匯率 ¥1 = NT$</div>
                      <input type="number" step="0.001" inputMode="decimal" value={v.rate != null ? v.rate : effectiveRate}
                        onChange={e => {
                          const newRate = Number(e.target.value) || 0;
                          setVariants(vs => vs.map(x => x.id===v.id
                            ? { ...x, rate: newRate, cost: Math.round((Number(x.costJpy)||0) * newRate) }
                            : x));
                        }}
                        placeholder="0.21"
                        style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", fontSize:14, boxSizing:"border-box", minWidth:0 }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:10, color:C.muted, marginBottom:3, fontWeight:500 }}>日幣價格 ¥</div>
                      <input type="number" inputMode="numeric" value={v.costJpy||0}
                        onChange={e => {
                          const newJpy = Number(e.target.value) || 0;
                          const useRate = v.rate != null ? v.rate : effectiveRate;
                          setVariants(vs => vs.map(x => x.id===v.id
                            ? { ...x, costJpy: newJpy, cost: Math.round(newJpy * useRate) }
                            : x));
                        }}
                        style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", fontSize:14, boxSizing:"border-box", minWidth:0 }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:10, color:C.muted, marginBottom:3, fontWeight:500 }}>成本 NT$ <span style={{ color:C.faint }}>(可手動覆寫)</span></div>
                      <input type="number" inputMode="numeric" value={v.cost||0}
                        onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, cost:Number(e.target.value)||0} : x))}
                        style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", fontSize:14, color:C.red, fontWeight:600, boxSizing:"border-box", minWidth:0 }}/>
                    </div>
                    {/* 訂金欄位:只在商品付款方式為「先付訂金」時顯示 */}
                    {paymentType === "deposit" && (
                      <div>
                        <div style={{ fontSize:10, color:C.accent, marginBottom:3, fontWeight:600 }}>💰 訂金 NT$</div>
                        <input type="number" inputMode="numeric" value={v.deposit_amount||0}
                          onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, deposit_amount:Number(e.target.value)||0} : x))}
                          placeholder="0"
                          style={{ width:"100%", background:C.accentBg, border:`1px solid ${C.accent}40`, borderRadius:8, padding:"8px 10px", fontSize:14, color:C.accentDark, fontWeight:600, boxSizing:"border-box", minWidth:0 }}/>
                        <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>剩餘 NT${Math.max(0, (Number(v.price)||0) - (Number(v.deposit_amount)||0))} 於取貨時付</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* 新增款式表單 */}
          <div style={{ padding:"12px 14px", background:C.accentBg, borderRadius:10, border:`1px dashed ${C.accent}50` }}>
            <div style={{ fontSize:11, color:C.muted, marginBottom:8, fontWeight:600 }}>+ 新增款式</div>
            <Input label="款式名稱" value={vName} onChange={setVName} placeholder="紅色 / M號 / 草莓" style={{ marginBottom:8 }} />
            <Input label="售價 NT$" type="number" value={vPrice} onChange={setVPrice} placeholder="0" style={{ marginBottom:8 }} />

            {/* 成本模式切換 */}
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:11, color:C.muted, marginBottom:5, fontWeight:600 }}>成本填寫方式</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                <button onClick={() => setCostMode("twd")} type="button"
                  style={{ padding:"7px 8px", border:`1.5px solid ${costMode==="twd"?C.accent:C.border}`, background: costMode==="twd"?C.accent:"transparent", color: costMode==="twd"?"#fff":C.textMid, borderRadius:8, fontSize:12, fontWeight:500, cursor:"pointer" }}>
                  直接填台幣
                </button>
                <button onClick={() => setCostMode("jpy")} type="button"
                  style={{ padding:"7px 8px", border:`1.5px solid ${costMode==="jpy"?C.accent:C.border}`, background: costMode==="jpy"?C.accent:"transparent", color: costMode==="jpy"?"#fff":C.textMid, borderRadius:8, fontSize:12, fontWeight:500, cursor:"pointer" }}>
                  日幣 × 匯率
                </button>
              </div>
            </div>

            {/* 依模式顯示對應欄位 */}
            {costMode === "twd" ? (
              <Input label="成本 NT$" type="number" value={vCostTwd} onChange={setVCostTwd} placeholder="0" style={{ marginBottom:10 }} />
            ) : (
              <>
                <Input label="日幣價格 ¥" type="number" value={vCostJpy} onChange={setVCostJpy} placeholder="0" style={{ marginBottom:6 }} />
                <div style={{ fontSize:11, color:C.muted, marginBottom:10, padding:"4px 10px" }}>
                  自動換算: ¥{vCostJpy||0} × {effectiveRate||0} = <span style={{ color:C.red, fontWeight:600 }}>NT${Math.round((Number(vCostJpy)||0) * effectiveRate)}</span>
                </div>
              </>
            )}

            <Btn sm onClick={addVariant} style={{ width:"100%" }}>新增此款式</Btn>
          </div>
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:8, borderTop:`1px solid ${C.border}` }}>
          <Btn variant="ghost" onClick={onClose}>取消</Btn>
          <Btn onClick={save}>{isEdit ? "儲存" : "新增商品"}</Btn>
        </div>
      </div>
    </Modal>
  );
}

// 品項聚合 helper:把所有 pending 訂單的 items(排除已配完的品項)聚合
// 支援部分配貨:每個品項可能有 stocked_qty(已配數量),未配的數量 = qty - stocked_qty
function aggregatePendingItems(orders) {
  const pendingOrders = orders.filter(o => o.status === "pending" && !o.archived);
  const groups = new Map();
  pendingOrders.forEach(o => {
    (o.items || []).forEach((it, itemIdx) => {
      // 已配完的不列(舊資料 stocked=true 視為全配完)
      if (it.stocked === true) return;
      const stockedQty = Number(it.stocked_qty) || 0;
      const qty = Number(it.qty) || 1;
      const need = qty - stockedQty;
      if (need <= 0) return;
      // 未採買也不列在採購清單 → 對!採購清單只列採買前的
      if (it.purchased) return;
      const parts = String(it.name).split(" / ");
      const productName = parts[0] || it.name;
      const variantName = parts.slice(1).join(" / ") || "(單一款式)";
      const key = `${productName}|||${variantName}`;
      if (!groups.has(key)) {
        groups.set(key, { productName, variantName, count: 0, orderRefs: [] });
      }
      const g = groups.get(key);
      g.count += need;
      g.orderRefs.push({
        orderId: o.id,
        orderNo: o.no,
        customer: o.customer_name || "未名",
        qty: need,
        image: it.image,
        itemIdx,
      });
    });
  });
  const byProduct = new Map();
  Array.from(groups.values()).forEach(g => {
    if (!byProduct.has(g.productName)) byProduct.set(g.productName, []);
    byProduct.get(g.productName).push(g);
  });
  return Array.from(byProduct.entries());
}

function PurchasePage({ data, setData, toast, setTab }) {
  const grouped = aggregatePendingItems(data.orders);
  const totalItems = grouped.reduce((s, [, vs]) => s + vs.reduce((ss, v) => ss + v.count, 0), 0);
  const totalOrders = new Set(
    data.orders.filter(o => o.status === "pending" && !o.archived).map(o => o.id)
  ).size;

  // 勾選狀態:key = `productName|||variantName`
  const [selected, setSelected] = useState(new Set());

  // 所有款式的 key
  const allKeys = grouped.flatMap(([pn, vs]) => vs.map(v => `${pn}|||${v.variantName}`));
  const allSelected = allKeys.length > 0 && allKeys.every(k => selected.has(k));

  const toggleKey = (key) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allKeys));
  };

  const markVariantBought = async (productName, variantName) => {
    // 找出這款式在哪些訂單有 (訂單 → 該款式的品項 index)
    const affectedOrders = [];
    data.orders.filter(o => o.status === "pending" && !o.archived).forEach(o => {
      const idxes = [];
      (o.items || []).forEach((it, i) => {
        if (it.purchased) return;
        const parts = String(it.name).split(" / ");
        const p = parts[0] || it.name;
        const v = parts.slice(1).join(" / ") || "(單一款式)";
        if (p === productName && v === variantName) idxes.push(i);
      });
      if (idxes.length > 0) affectedOrders.push({ order: o, idxes });
    });
    if (affectedOrders.length === 0) { toast("找不到相關品項"); return; }

    if (!window.confirm(`此款式共出現在 ${affectedOrders.length} 筆訂單,全部標記為「已採買」?`)) return;

    let purchasedItemCount = 0;
    const now = new Date().toISOString();
    for (const { order, idxes } of affectedOrders) {
      const newItems = (order.items || []).map((it, i) =>
        idxes.includes(i) ? { ...it, purchased: true, purchased_at: now } : it
      );
      purchasedItemCount += idxes.length;

      // 品項採買不改訂單狀態(訂單狀態改為 bought 由入庫完成時決定)
      const patch = { items: newItems, updated_at: now };

      const { error } = await supabase.from("orders").update(patch).eq("id", order.id);
      if (error) { toast(`訂單 #${order.no} 更新失敗:${error.message}`); continue; }
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === order.id ? { ...x, items: newItems } : x)
      }));
    }

    logAction("採買品項", `${productName} · ${variantName} · ${purchasedItemCount} 件`);
    toast(`✅ 已採買 ${purchasedItemCount} 件`);
  };

  // 批次標記已採買(用勾選的款式)
  const batchMarkBought = async () => {
    if (selected.size === 0) { toast("請先勾選要標記的款式"); return; }

    // 找出所有勾選款式對應的品項 (訂單 → 品項 idx 陣列)
    const affectedOrders = [];
    data.orders.filter(o => o.status === "pending" && !o.archived).forEach(o => {
      const idxes = [];
      (o.items || []).forEach((it, i) => {
        if (it.purchased) return;
        const parts = String(it.name).split(" / ");
        const p = parts[0] || it.name;
        const v = parts.slice(1).join(" / ") || "(單一款式)";
        if (selected.has(`${p}|||${v}`)) idxes.push(i);
      });
      if (idxes.length > 0) affectedOrders.push({ order: o, idxes });
    });
    if (affectedOrders.length === 0) { toast("找不到相關品項"); return; }

    if (!window.confirm(`已勾選 ${selected.size} 款,涉及 ${affectedOrders.length} 筆訂單,全部標記為「已採買」?`)) return;

    let purchasedItemCount = 0;
    const now = new Date().toISOString();
    for (const { order, idxes } of affectedOrders) {
      const newItems = (order.items || []).map((it, i) =>
        idxes.includes(i) ? { ...it, purchased: true, purchased_at: now } : it
      );
      purchasedItemCount += idxes.length;

      // 品項採買不改訂單狀態
      const patch = { items: newItems, updated_at: now };

      const { error } = await supabase.from("orders").update(patch).eq("id", order.id);
      if (error) { toast(`訂單 #${order.no} 更新失敗:${error.message}`); continue; }
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === order.id ? { ...x, items: newItems } : x)
      }));
    }

    logAction("批次採買品項", `${selected.size} 款 · ${purchasedItemCount} 件`);
    toast(`✅ 已採買 ${purchasedItemCount} 件`);
    setSelected(new Set());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: selected.size > 0 ? 80 : 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📋 採購清單</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
            {grouped.length} 個商品 · 共 {totalItems} 件 · {totalOrders} 筆訂單
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {allKeys.length > 0 && (
            <button onClick={toggleAll}
              style={{ background: allSelected ? C.accent : "transparent", color: allSelected ? "#fff" : C.accent, border: `1.5px solid ${C.accent}`, padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              {allSelected ? "☑ 取消全選" : "☐ 全選"}
            </button>
          )}
          <button onClick={() => setTab("inbound")}
            style={{ background: C.accent, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            入庫配貨 →
          </button>
        </div>
      </div>

      {grouped.length === 0 ? (
        <Card style={{ padding: "48px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
          <div style={{ fontSize: 14, color: C.muted }}>目前沒有待採買的訂單</div>
        </Card>
      ) : (
        grouped.map(([productName, variants]) => (
          <Card key={productName} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", background: C.accentBg, borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.accentDark }}>{productName}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{variants.length} 款 · 共 {variants.reduce((s, v) => s + v.count, 0)} 件</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {variants.map((v, i) => {
                const key = `${productName}|||${v.variantName}`;
                const isSelected = selected.has(key);
                return (
                  <div key={i} style={{ padding: "12px 16px", borderTop: i > 0 ? `1px dashed ${C.borderLight}` : "none", background: isSelected ? C.accentBg : "transparent", transition: "background .15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleKey(key)}
                        style={{ width: 18, height: 18, accentColor: C.accent, cursor: "pointer", flexShrink: 0 }}/>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v.variantName}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>需 {v.count} 件</div>
                      </div>
                      <button onClick={() => markVariantBought(productName, v.variantName)}
                        style={{ background: C.green, color: "#fff", border: "none", padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        ✓ 已採買
                      </button>
                    </div>
                    <div style={{ paddingLeft: 28, marginTop: 8 }}>
                      {v.orderRefs.map((r, ri) => (
                        <div key={ri} style={{ fontSize: 11, color: C.textMid, padding: "2px 0" }}>
                          · #{r.orderNo} · {r.customer} × {r.qty}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))
      )}

      {/* 底部浮動:批次操作條 */}
      {selected.size > 0 && (
        <div style={{ position: "fixed", bottom: 12, left: 12, right: 12, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,.15)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, border: `1.5px solid ${C.accent}`, zIndex: 100 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark }}>已勾選 {selected.size} 款</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>點下方一鍵全部標記已採買</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setSelected(new Set())}
              style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: "8px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
              清除
            </button>
            <button onClick={batchMarkBought}
              style={{ background: C.green, color: "#fff", border: "none", padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              ✓ 標記已採買
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 入庫配貨:列出「已採買」但尚未入庫的品項聚合,讓業者登記買到多少
function InboundPage({ data, setData, toast, setTab }) {
  // 從所有未封存/未取消訂單的 items 掃描:purchased=true 且未配完的品項
  const validOrders = data.orders.filter(o => !o.archived && o.status !== "cancelled");
  const groups = new Map();
  validOrders.forEach(o => {
    (o.items || []).forEach((it, itemIdx) => {
      if (!it.purchased) return;             // 未採買不列
      if (it.stocked === true) return;       // 舊資料:整批配完
      const stockedQty = Number(it.stocked_qty) || 0;
      const qty = Number(it.qty) || 1;
      const need = qty - stockedQty;
      if (need <= 0) return;                 // 已配完
      const parts = String(it.name).split(" / ");
      const productName = parts[0] || it.name;
      const variantName = parts.slice(1).join(" / ") || "(單一款式)";
      const key = `${productName}|||${variantName}`;
      if (!groups.has(key)) groups.set(key, { productName, variantName, needed: 0, orderRefs: [] });
      const g = groups.get(key);
      g.needed += need;
      g.orderRefs.push({
        orderId: o.id,
        orderNo: o.no,
        customer: o.customer_name || "未名",
        qty: need,           // 只算未配的數量
        itemIdx,
        alreadyStockedQty: stockedQty,
      });
    });
  });
  const groupList = Array.from(groups.values());

  // 每個款式業者要輸入「實際買到」
  const [bought, setBought] = useState({});
  const setB = (key, val) => setBought(prev => ({ ...prev, [key]: val }));

  const doInboundAll = async () => {
    if (groupList.length === 0) { toast("沒有可入庫的款式"); return; }

    // 過濾出「實際買到 > 0」的款式,數量 0 直接跳過
    const activeGroups = groupList.filter(g => {
      const key = `${g.productName}|||${g.variantName}`;
      const actualCount = Number(bought[key] ?? g.needed);
      return actualCount > 0;
    });
    const skippedCount = groupList.length - activeGroups.length;

    if (activeGroups.length === 0) {
      toast("所有款式都填 0,沒有可入庫的項目");
      return;
    }

    const confirmMsg = skippedCount > 0
      ? `確定入庫 ${activeGroups.length} 個款式?(${skippedCount} 個因數量 0 跳過)\n\n按訂單先來後到順序配貨,數量不足的品項留在配貨清單。\n實際買到的總量會全部記入現貨/庫存,方便追蹤採買紀錄。`
      : `確定入庫 ${activeGroups.length} 個款式?\n\n按訂單先來後到順序配貨,數量不足的品項留在配貨清單。\n實際買到的總量會全部記入現貨/庫存,方便追蹤採買紀錄。`;
    if (!window.confirm(confirmMsg)) return;

    let stockCount = 0;
    let processedCount = 0;
    let allocatedItemCount = 0;   // 有配到貨的品項數(有增量的)
    let allocatedUnitsCount = 0;  // 配到的貨物總件數
    let unallocatedUnitsCount = 0; // 沒配到的貨物件數(缺量)

    // 收集:每筆訂單要更新的品項 idx → 新的 stocked_qty (原有 + 新配)
    const itemsToUpdate = new Map(); // orderId → Map(itemIdx → newStockedQty)
    const setNewStockedQty = (orderId, itemIdx, newQty) => {
      if (!itemsToUpdate.has(orderId)) itemsToUpdate.set(orderId, new Map());
      itemsToUpdate.get(orderId).set(itemIdx, newQty);
    };

    for (const g of activeGroups) {
      const key = `${g.productName}|||${g.variantName}`;
      const actualBought = Number(bought[key] ?? g.needed);
      let remaining = actualBought;
      const displayName = `${g.productName}${g.variantName !== "(單一款式)" ? ` / ${g.variantName}` : ""}`;

      // 按 orderRefs 順序配貨(先來後到)
      const sortedRefs = [...g.orderRefs].sort((a, b) => String(a.orderNo).localeCompare(String(b.orderNo)));

      for (const r of sortedRefs) {
        if (remaining <= 0) {
          unallocatedUnitsCount += r.qty;
          continue;
        }
        const need = Number(r.qty) || 1;
        const alloc = Math.min(remaining, need);   // 配到多少(能配多少配多少)
        if (alloc > 0) {
          const alreadyStocked = Number(r.alreadyStockedQty) || 0;
          setNewStockedQty(r.orderId, r.itemIdx, alreadyStocked + alloc);
          remaining -= alloc;
          allocatedUnitsCount += alloc;
          allocatedItemCount++;
        }
        if (alloc < need) {
          unallocatedUnitsCount += (need - alloc);
        }
      }

      // in_stock 記錄兩個數字 (加錯誤處理讓失敗直接告訴業者)
      try {
        const { data: existing, error: selErr } = await supabase.from("in_stock")
          .select("*").eq("name", displayName).maybeSingle();
        if (selErr) {
          console.error("in_stock 查詢失敗:", selErr);
          alert(`⚠️ in_stock 查詢失敗:\n${selErr.message}`);
        }

        if (existing) {
          const newTotal = (Number(existing.total_purchased) || 0) + actualBought;
          const newStock = (Number(existing.stock) || 0) + actualBought;   // 全部加,配貨不減庫存
          const { error: updErr } = await supabase.from("in_stock").update({
            total_purchased: newTotal,
            stock: newStock,
            updated_at: new Date().toISOString()
          }).eq("id", existing.id);
          if (updErr) {
            console.error("in_stock 更新失敗:", updErr);
            if (updErr.message && /total_purchased/.test(updErr.message)) {
              const retry = await supabase.from("in_stock").update({
                stock: newStock, updated_at: new Date().toISOString()
              }).eq("id", existing.id);
              if (retry.error) alert(`⚠️ in_stock 更新失敗:\n${retry.error.message}`);
              else console.warn("total_purchased 欄位不存在,僅更新 stock");
            } else {
              alert(`⚠️ in_stock 更新失敗:\n${updErr.message}`);
            }
          }
        } else {
          const newItem = {
            id: secureUid(),
            name: displayName,
            price: 0,
            stock: actualBought,           // 全部進庫存
            total_purchased: actualBought,
            image: "",
            status: "off",
            created_at: new Date().toISOString(),
          };
          console.log("嘗試建立 in_stock:", newItem);
          const { error: insErr, data: insData } = await supabase.from("in_stock").insert([newItem]).select();
          if (insErr) {
            console.error("in_stock 建立失敗:", insErr);
            // fallback:沒 total_purchased 欄位就拿掉
            if (insErr.message && /total_purchased/.test(insErr.message)) {
              const retry = await supabase.from("in_stock").insert([{
                id: secureUid(), name: displayName, price: 0, stock: actualBought,
                image: "", status: "off", created_at: new Date().toISOString(),
              }]).select();
              if (retry.error) alert(`⚠️ in_stock 建立失敗:\n${retry.error.message}`);
              else console.warn("total_purchased 欄位不存在,僅存 stock");
            } else {
              alert(`⚠️ in_stock 建立失敗:\n${insErr.message}\n\n可能原因:\n1. in_stock 表 RLS 阻擋 insert\n2. 欄位型別不符\n3. 必填欄位缺失`);
            }
          } else {
            console.log("✅ in_stock 建立成功:", insData);
          }
        }
      } catch (e) {
        console.error("in_stock 例外:", e);
        alert(`⚠️ in_stock 例外:\n${e.message || e}`);
      }
      stockCount += remaining;
      processedCount++;
    }

    // 應用品項 stocked_qty 到訂單
    const now = new Date().toISOString();
    let allStockedCount = 0;   // 全部品項都配完的訂單數
    for (const [orderId, itemIdxToNewQty] of itemsToUpdate.entries()) {
      const order = data.orders.find(o => o.id === orderId);
      if (!order) continue;
      const newItems = (order.items || []).map((it, i) => {
        if (!itemIdxToNewQty.has(i)) return it;
        const newStockedQty = itemIdxToNewQty.get(i);
        const qty = Number(it.qty) || 1;
        return {
          ...it,
          stocked_qty: newStockedQty,
          stocked: newStockedQty >= qty,       // 相容舊格式
          stocked_at: now,
        };
      });
      // 判斷所有品項都配完 (舊格式 stocked===true 或新格式 stocked_qty >= qty)
      const allStocked = newItems.every(it => {
        const q = Number(it.qty) || 1;
        const sq = Number(it.stocked_qty) || (it.stocked ? q : 0);
        return sq >= q;
      });
      const patch = { items: newItems, updated_at: now };
      if (allStocked && order.status === "pending") {
        patch.status = "bought";
        patch.stocked = true;
        patch.stocked_at = now;
        allStockedCount++;
      }
      let { error } = await supabase.from("orders").update(patch).eq("id", orderId);
      if (error) {
        console.warn(`訂單 #${order.no} 更新失敗:`, error.message);
        if (error.message && /stocked/.test(error.message)) {
          const { stocked, stocked_at, ...patchNoStocked } = patch;
          const retry = await supabase.from("orders").update(patchNoStocked).eq("id", orderId);
          if (retry.error) { console.warn("retry 也失敗:", retry.error); continue; }
          console.warn("orders 沒 stocked 欄位,已改用不含 stocked 的 patch");
        } else {
          continue;
        }
      }
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === orderId ? {
          ...x, items: newItems,
          ...(patch.status ? { status: patch.status } : {}),
          ...(patch.stocked ? { stocked: true, stocked_at: now } : {})
        } : x)
      }));
    }

    // 重新拉現貨資料
    const inStockRes = await supabase.from("in_stock").select("*").order("created_at", { ascending: false });
    setData(d => ({ ...d, inStock: inStockRes.data || d.inStock }));

    logAction("批次入庫", `${processedCount} 款 · 配 ${allocatedUnitsCount} 件${stockCount > 0 ? ` · 入庫 ${stockCount}` : ""}${skippedCount > 0 ? ` · 跳過 ${skippedCount}`:""}`);
    toast(`✅ 已配貨 ${allocatedUnitsCount} 件${stockCount > 0 ? ` · ${stockCount} 件記入庫存` : ""}${allStockedCount > 0 ? ` · ${allStockedCount} 筆訂單完成` : ""}${unallocatedUnitsCount > 0 ? ` · ⚠️ ${unallocatedUnitsCount} 件缺量待補` : ""}`);
    setBought({});
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📦 入庫配貨</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
            填「實際買到」數量,一鍵配貨並自動入庫
          </div>
        </div>
      </div>

      {groupList.length === 0 ? (
        <Card style={{ padding: "48px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 14, color: C.muted, marginBottom: 4 }}>沒有已採買的商品可入庫</div>
          <div style={{ fontSize: 11, color: C.faint }}>先去採購清單標記「已採買」</div>
          <button onClick={() => setTab("purchase")}
            style={{ marginTop: 16, background: C.accent, color: "#fff", border: "none", padding: "9px 16px", borderRadius: 10, fontSize: 13, cursor: "pointer" }}>
            前往採購清單
          </button>
        </Card>
      ) : (
        <>
          {groupList.map((g, i) => {
            const key = `${g.productName}|||${g.variantName}`;
            const actual = bought[key] ?? g.needed;
            const extra = Number(actual) - g.needed;
            return (
              <Card key={i} style={{ padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{g.productName}</div>
                <div style={{ fontSize: 12, color: C.accent, marginTop: 2, fontWeight: 500 }}>{g.variantName}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, padding: "10px", background: C.bgDeep, borderRadius: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: C.muted }}>需求</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.textMid }}>{g.needed} 件</div>
                  </div>
                  <div style={{ fontSize: 16, color: C.faint }}>→</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: C.muted }}>實際買到</div>
                    <input type="number" inputMode="numeric" min="0" value={actual}
                      onChange={e => setB(key, e.target.value)}
                      style={{ width: "100%", padding: "5px 8px", fontSize: 16, fontWeight: 700, color: C.accentDark, border: `1.5px solid ${C.accent}`, borderRadius: 6, background: "#fff", boxSizing: "border-box" }}/>
                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    {Number(actual) === 0 ? (
                      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>⊘ 跳過</div>
                    ) : extra > 0 ? (
                      <div style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✨ +{extra} 入庫</div>
                    ) : extra < 0 ? (
                      <div style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>⚠️ 缺 {-extra}</div>
                    ) : (
                      <div style={{ fontSize: 11, color: C.muted }}>剛好</div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: C.faint, marginTop: 6 }}>
                  {g.orderRefs.map(r => `#${r.orderNo} ${r.customer}×${r.qty}`).join(" · ")}
                </div>
              </Card>
            );
          })}
          <button onClick={doInboundAll}
            style={{ background: C.green, color: "#fff", border: "none", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", position: "sticky", bottom: 12 }}>
            ✓ 確認入庫並配貨
          </button>
        </>
      )}
    </div>
  );
}

// 營收報表:全部歷史合計 + 時間篩選 + 趨勢圖 + 排行 + 匯出
function RevenuePage({ data }) {
  const [range, setRange] = useState("all"); // today / week / month / all / custom
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // === 時間篩選 ===
  const now = new Date();
  const getStartOfToday = () => { const d=new Date(now); d.setHours(0,0,0,0); return d; };
  const getStartOfWeek = () => { const d=getStartOfToday(); const day=d.getDay()||7; d.setDate(d.getDate()-day+1); return d; };
  const getStartOfMonth = () => { const d=new Date(now.getFullYear(),now.getMonth(),1); return d; };

  const inRange = (o) => {
    if (!o.created_at) return range === "all";
    const t = new Date(o.created_at).getTime();
    if (range === "today")  return t >= getStartOfToday().getTime();
    if (range === "week")   return t >= getStartOfWeek().getTime();
    if (range === "month")  return t >= getStartOfMonth().getTime();
    if (range === "custom") {
      const s = customStart ? new Date(customStart).getTime() : -Infinity;
      const e = customEnd ? new Date(customEnd+"T23:59:59").getTime() : Infinity;
      return t >= s && t <= e;
    }
    return true; // all
  };

  const allOrders = (data.orders || []).filter(inRange);

  // === 總體統計 ===
  const totalRevenue = allOrders.reduce((s, o) => s + (Number(o.total) || 0), 0);
  const totalCost = allOrders.reduce((s, o) => {
    const itemsCost = (o.items || []).reduce((ss, it) => ss + (Number(it.cost) || 0) * (Number(it.qty) || 1), 0);
    return s + itemsCost;
  }, 0);
  const totalProfit = allOrders.reduce((s, o) => s + (Number(o.profit) || 0), 0);
  const orderCount = allOrders.length;
  const validOrderCount = allOrders.filter(o => o.status !== "cancelled").length;
  const avgOrder = validOrderCount > 0 ? Math.round(totalRevenue / validOrderCount) : 0;

  // === 訂單狀態統計 ===
  const statusCount = {
    pending_review: allOrders.filter(o => o.status === "pending_review").length,
    pending:        allOrders.filter(o => o.status === "pending").length,
    bought:         allOrders.filter(o => o.status === "bought").length,
    arrived:        allOrders.filter(o => o.status === "arrived").length,
    shipped:        allOrders.filter(o => o.status === "shipped").length,
    cancelled:      allOrders.filter(o => o.status === "cancelled").length,
  };

  // === 付款狀態統計 ===
  const depositReceived = allOrders.filter(o => o.deposit_paid).length;
  const finalReceived = allOrders.filter(o => o.final_paid).length;
  const totalDepositAmount = allOrders.reduce((s, o) => s + (o.deposit_paid ? (Number(o.deposit) || Number(o.deposit_amount) || 0) : 0), 0);

  // === 商品銷量+利潤率排行 ===
  const productSales = new Map();
  allOrders.filter(o => o.status !== "cancelled").forEach(o => {
    (o.items || []).forEach(it => {
      const productName = String(it.name).split(" / ")[0] || it.name;
      if (!productSales.has(productName)) productSales.set(productName, { count: 0, revenue: 0, cost: 0 });
      const p = productSales.get(productName);
      p.count += Number(it.qty) || 1;
      p.revenue += (Number(it.price) || 0) * (Number(it.qty) || 1);
      p.cost += (Number(it.cost) || 0) * (Number(it.qty) || 1);
    });
  });
  const productList = Array.from(productSales.entries()).map(([name, s]) => ({
    name, ...s,
    profit: s.revenue - s.cost,
    profitRate: s.revenue > 0 ? Math.round((s.revenue - s.cost) / s.revenue * 100) : 0
  }));
  const topByRevenue = [...productList].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  const topByProfitRate = [...productList].filter(p => p.revenue > 0).sort((a, b) => b.profitRate - a.profitRate).slice(0, 10);

  // === 客人購買排行 ===
  const customerSales = new Map();
  allOrders.filter(o => o.status !== "cancelled").forEach(o => {
    const key = o.customer_line_id || o.customerId || o.customer_name || "匿名";
    const name = o.customer_name || o.customerName || "匿名";
    if (!customerSales.has(key)) customerSales.set(key, { name, count: 0, revenue: 0 });
    const c = customerSales.get(key);
    c.count += 1;
    c.revenue += Number(o.total) || 0;
  });
  const topCustomers = Array.from(customerSales.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 10);

  // === 月度趨勢(近 12 個月) ===
  const monthlyData = new Map();
  (data.orders || []).filter(o => o.status !== "cancelled").forEach(o => {
    if (!o.created_at) return;
    const d = new Date(o.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    if (!monthlyData.has(key)) monthlyData.set(key, { month: key, revenue: 0, profit: 0, orders: 0 });
    const m = monthlyData.get(key);
    m.revenue += Number(o.total) || 0;
    m.profit += Number(o.profit) || 0;
    m.orders += 1;
  });
  const monthly12 = Array.from(monthlyData.values()).sort((a, b) => a.month.localeCompare(b.month)).slice(-12);
  const maxMonthlyRev = Math.max(1, ...monthly12.map(m => m.revenue));

  // === CSV 匯出 ===
  const exportCSV = () => {
    const rows = [
      ["#訂單號", "日期", "客人", "狀態", "商品", "營收 NT$", "成本 NT$", "利潤 NT$", "已付訂金", "已付尾款"],
    ];
    allOrders.forEach(o => {
      const date = o.created_at ? new Date(o.created_at).toLocaleDateString("zh-TW") : "";
      const items = (o.items || []).map(it => `${it.name} ×${it.qty}`).join(" | ");
      const cost = (o.items || []).reduce((s, it) => s + (Number(it.cost) || 0) * (Number(it.qty) || 1), 0);
      const status = ORDER_STATUS[o.status]?.label || o.status;
      rows.push([
        "#" + (o.no || ""),
        date,
        o.customer_name || o.customerName || "",
        status,
        items,
        Number(o.total) || 0,
        cost,
        Number(o.profit) || 0,
        o.deposit_paid ? "是" : "否",
        o.final_paid ? "是" : "否",
      ]);
    });
    // 加合計列
    rows.push([]);
    rows.push(["合計", "", "", "", "", totalRevenue, totalCost, totalProfit, `${depositReceived} 筆`, `${finalReceived} 筆`]);

    const csvContent = "\uFEFF" + rows.map(r => r.map(cell => {
      const s = String(cell);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(",")).join("\n");

    const rangeLabel = { today: "今日", week: "本週", month: "本月", all: "全部歷史", custom: `${customStart}_${customEnd}` }[range] || "報表";
    const filename = `營收報表_${rangeLabel}_${new Date().toLocaleDateString("zh-TW").replace(/\//g,"-")}.csv`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const rangeLabels = { today: "今日", week: "本週", month: "本月", all: "全部歷史", custom: "自訂" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📊 營收報表</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{rangeLabels[range]} · 共 {orderCount} 筆訂單</div>
        </div>
        <button onClick={exportCSV}
          style={{ background: C.green, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          📥 匯出 CSV
        </button>
      </div>

      {/* 時間範圍篩選 */}
      <Card style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, letterSpacing: .5, fontWeight: 600 }}>📅 時間範圍</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["today","今日"],["week","本週"],["month","本月"],["all","全部"],["custom","自訂"]].map(([v, l]) => (
            <button key={v} onClick={() => setRange(v)}
              style={{ padding: "6px 14px", borderRadius: 99, border: `1.5px solid ${range===v?C.accent:C.border}`, background: range===v?C.accent:"transparent", color: range===v?"#fff":C.textMid, fontSize: 12, fontWeight: range===v?600:400, cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>
        {range === "custom" && (
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 3 }}>起始日</div>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, boxSizing: "border-box" }}/>
            </div>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 3 }}>結束日</div>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, boxSizing: "border-box" }}/>
            </div>
          </div>
        )}
      </Card>

      {/* 三大指標 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        <Card style={{ padding: "16px", background: `linear-gradient(135deg, ${C.accentBg} 0%, ${C.surface} 100%)` }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: .5 }}>💰 總營收</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.accentDark }}>{fmtMoney(totalRevenue)}</div>
        </Card>
        <Card style={{ padding: "16px", background: `linear-gradient(135deg, ${C.redBg} 0%, ${C.surface} 100%)` }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: .5 }}>📦 總成本</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.red }}>{fmtMoney(totalCost)}</div>
        </Card>
        <Card style={{ padding: "16px", background: `linear-gradient(135deg, ${C.greenBg} 0%, ${C.surface} 100%)` }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: .5 }}>✨ 總利潤</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>{fmtMoney(totalProfit)}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>利潤率 {totalRevenue > 0 ? Math.round(totalProfit / totalRevenue * 100) : 0}%</div>
        </Card>
      </div>

      {/* 訂單/客單價 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        <Card style={{ padding: "14px" }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>📝 有效訂單</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{validOrderCount}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>總 {orderCount} 筆(不含取消)</div>
        </Card>
        <Card style={{ padding: "14px" }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>💵 客單價</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{fmtMoney(avgOrder)}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>平均每筆訂單</div>
        </Card>
      </div>

      {/* 月度趨勢圖 (橫向長條) */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>📈 月度營收趨勢 (近 12 月)</div>
        {monthly12.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", fontSize: 12, color: C.muted }}>目前沒有訂單資料</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {monthly12.map((m, i) => {
              const revPct = (m.revenue / maxMonthlyRev) * 100;
              const profPct = maxMonthlyRev > 0 ? (m.profit / maxMonthlyRev) * 100 : 0;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 56, fontSize: 11, color: C.textMid, fontWeight: 500, flexShrink: 0 }}>{m.month}</div>
                  <div style={{ flex: 1, position: "relative", height: 22, background: C.bgDeep, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${revPct}%`, background: C.accentBg }}/>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${profPct}%`, background: `${C.green}40` }}/>
                    <div style={{ position: "absolute", top: 0, right: 6, height: "100%", display: "flex", alignItems: "center", fontSize: 10, color: C.text, fontWeight: 600 }}>
                      {fmtMoney(m.revenue)}
                    </div>
                  </div>
                  <div style={{ width: 40, fontSize: 10, color: C.muted, textAlign: "right", flexShrink: 0 }}>{m.orders} 筆</div>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 10, color: C.muted, justifyContent: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 12, height: 12, background: C.accentBg, borderRadius: 2 }}/>營收
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 12, height: 12, background: `${C.green}40`, borderRadius: 2 }}/>利潤
          </span>
        </div>
      </Card>

      {/* 訂單狀態統計 */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>📋 訂單狀態</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8 }}>
          {[
            ["待審核", statusCount.pending_review, C.purple, C.purpleBg],
            ["待採買", statusCount.pending,        C.accent, C.accentBg],
            ["已採買", statusCount.bought,         C.pinkDark, C.pinkBg],
            ["已到台", statusCount.arrived,        C.green, C.greenBg],
            ["已寄出", statusCount.shipped,        C.textMid, C.bgDeep],
            ["已取消", statusCount.cancelled,      C.red, C.redBg],
          ].map(([label, n, color, bg]) => (
            <div key={label} style={{ padding: "10px 8px", background: bg, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color }}>{n}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 付款狀態 */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>💳 付款狀態</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ padding: "12px", background: C.greenBg, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>✓ 已收訂金</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.green }}>{depositReceived} 筆</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>共 {fmtMoney(totalDepositAmount)}</div>
          </div>
          <div style={{ padding: "12px", background: C.accentBg, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>✓ 已收尾款</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>{finalReceived} 筆</div>
          </div>
        </div>
      </Card>

      {/* 商品銷量排行 */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>🏆 商品營收排行 Top 10</div>
        {topByRevenue.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", fontSize: 12, color: C.muted }}>目前沒有銷售資料</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {topByRevenue.map((p, i) => {
              const maxRev = topByRevenue[0].revenue;
              const pct = maxRev > 0 ? (p.revenue / maxRev) * 100 : 0;
              return (
                <div key={i} style={{ padding: "10px 12px", background: C.bgDeep, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: C.accentBg, opacity: .5, zIndex: 0 }}/>
                  <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>#{i+1}</div>
                      <div style={{ fontSize: 13, color: C.text, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark }}>{fmtMoney(p.revenue)}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{p.count} 件</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* 商品利潤率排行 */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>🎯 商品利潤率排行 Top 10</div>
        {topByProfitRate.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", fontSize: 12, color: C.muted }}>目前沒有資料(需先填成本)</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {topByProfitRate.map((p, i) => (
              <div key={i} style={{ padding: "10px 12px", background: C.bgDeep, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${Math.max(0, Math.min(100, p.profitRate))}%`, background: `${C.green}30`, zIndex: 0 }}/>
                <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>#{i+1}</div>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.green }}>{p.profitRate}%</div>
                    <div style={{ fontSize: 10, color: C.muted }}>賺 {fmtMoney(p.profit)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 客人購買排行 */}
      <Card style={{ padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.accentDark, marginBottom: 12 }}>👥 客人購買排行 Top 10</div>
        {topCustomers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", fontSize: 12, color: C.muted }}>目前沒有客人資料</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {topCustomers.map((c, i) => {
              const maxRev = topCustomers[0].revenue;
              const pct = maxRev > 0 ? (c.revenue / maxRev) * 100 : 0;
              return (
                <div key={i} style={{ padding: "10px 12px", background: C.bgDeep, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: C.pinkBg, opacity: .5, zIndex: 0 }}/>
                  <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>#{i+1}</div>
                      <div style={{ fontSize: 13, color: C.text, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.pinkDark }}>{fmtMoney(c.revenue)}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{c.count} 筆訂單</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <div style={{ fontSize: 10, color: C.faint, textAlign: "center", padding: "8px 0 40px" }}>
        報表包含所有訂單(含未完成 · 不含取消) · 月度趨勢用全部歷史
      </div>
    </div>
  );
}

function InStockPage({ data, setData, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const del = async (id) => {
    if (!window.confirm("確定刪除？")) return;
    const { error } = await supabase.from("in_stock").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, inStock: d.inStock.filter(x => x.id !== id) }));
    toast("已刪除");
  };

  const saveNew = async (item) => {
    const { data: saved, error } = await supabase.from("in_stock").insert([{ ...item, created_at: new Date().toISOString() }]).select().single();
    if (error) { toast("新增失敗"); return; }
    setData(d => ({ ...d, inStock: [saved, ...d.inStock] }));
    toast("現貨已新增");
    setShowAdd(false);
  };

  const saveEdit = async (item) => {
    const { error } = await supabase.from("in_stock").update(item).eq("id", item.id);
    if (error) { toast("儲存失敗"); return; }
    setData(d => ({ ...d, inStock: d.inStock.map(x => x.id===item.id ? item : x) }));
    toast("已儲存");
    setEditing(null);
  };

  // 進貨:填數量 → 系統自動配貨到待配貨訂單,剩餘進庫存
  const restock = async (item) => {
    const input = window.prompt(`「${item.name}」這次採買數量?\n\n系統會自動配給待配貨的訂單(已採買但未配貨),剩餘進庫存。`, "");
    if (input === null) return;
    const qty = Math.max(0, Math.floor(Number(input) || 0));
    if (qty <= 0) { toast("請輸入 > 0 的數量"); return; }

    let remaining = qty;
    let allocatedCount = 0;
    let completedOrders = 0;

    // 找出這款式所有 purchased=true 且 stocked !== true 的品項(依訂單先來後到)
    const targetRefs = [];
    (data.orders || []).filter(o => !o.archived && o.status !== "cancelled").forEach(o => {
      (o.items || []).forEach((it, idx) => {
        if (!it.purchased || it.stocked) return;
        const parts = String(it.name).split(" / ");
        const displayName = parts.slice(1).join(" / ")
          ? `${parts[0]} / ${parts.slice(1).join(" / ")}`
          : parts[0];
        if (displayName === item.name) {
          targetRefs.push({ order: o, itemIdx: idx, qty: Number(it.qty) || 1 });
        }
      });
    });
    targetRefs.sort((a, b) => String(a.order.no).localeCompare(String(b.order.no)));

    // 配貨
    const now = new Date().toISOString();
    const orderPatches = new Map(); // orderId → itemIdxes
    for (const r of targetRefs) {
      if (remaining >= r.qty) {
        if (!orderPatches.has(r.order.id)) orderPatches.set(r.order.id, new Set());
        orderPatches.get(r.order.id).add(r.itemIdx);
        remaining -= r.qty;
        allocatedCount += r.qty;
      }
    }

    // 更新訂單品項 stocked
    for (const [orderId, idxes] of orderPatches.entries()) {
      const order = data.orders.find(o => o.id === orderId);
      if (!order) continue;
      const newItems = (order.items || []).map((it, i) =>
        idxes.has(i) ? { ...it, stocked: true, stocked_at: now } : it
      );
      const allStocked = newItems.every(it => it.stocked);
      const patch = { items: newItems, updated_at: now };
      if (allStocked && order.status === "pending") {
        patch.status = "bought";
        patch.stocked = true;
        patch.stocked_at = now;
        completedOrders++;
      }
      const { error } = await supabase.from("orders").update(patch).eq("id", orderId);
      if (error) { console.warn("訂單更新失敗:", error); continue; }
      setData(d => ({
        ...d,
        orders: d.orders.map(x => x.id === orderId ? {
          ...x, items: newItems,
          ...(patch.status ? { status: patch.status } : {}),
          ...(patch.stocked ? { stocked: true, stocked_at: now } : {})
        } : x)
      }));
    }

    // 全部進庫存 + 更新總進貨量(配貨不減 stock)
    const newStock = (Number(item.stock) || 0) + qty;
    const newTotal = (Number(item.total_purchased) || 0) + qty;
    await supabase.from("in_stock").update({
      stock: newStock,
      total_purchased: newTotal,
      updated_at: now
    }).eq("id", item.id);
    setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, stock: newStock, total_purchased: newTotal } : x) }));

    logAction("進貨", `${item.name} · 採買 ${qty} 件 · 配貨 ${allocatedCount} · 入庫 ${remaining}`);
    toast(`✅ 進貨 ${qty} 件 · 配貨 ${allocatedCount}${completedOrders > 0 ? ` · ${completedOrders} 筆訂單完成`: ""}${remaining > 0 ? ` · ${remaining} 件入庫` : ""}`);
  };

  // 上下架切換
  const toggleStatus = async (item) => {
    const newStatus = item.status === "on" ? "off" : "on";
    const { error } = await supabase.from("in_stock").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", item.id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, status: newStatus } : x) }));
    toast(newStatus === "on" ? "✅ 已上架轉現貨販售" : "已下架");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>🏪 現貨管理</div>
        <Btn sm onClick={() => setShowAdd(true)}>＋ 新增現貨</Btn>
      </div>

      {(!data.inStock || data.inStock.length === 0) && (
        <Card style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 13, color: C.muted }}>還沒有現貨/庫存紀錄</div>
          <div style={{ fontSize: 11, color: C.faint, marginTop: 8 }}>入庫配貨完成後會自動出現,或按上方「+ 新增現貨」手動新增</div>
        </Card>
      )}
      {(data.inStock || []).map(item => (
        <div key={item.id} style={{ background:C.surface, border:`1.5px solid ${C.border}`, boxShadow:C.shadow, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding:"13px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap: 10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, flex: 1, minWidth: 0 }}>
              <div style={{ fontSize:24, flexShrink: 0 }}>{item.image?.startsWith("data:")||item.image?.startsWith("http")?<img src={item.image} style={{width:32,height:32,borderRadius:6,objectFit:"cover"}}/>:(item.image||"🎁")}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <div style={{ fontWeight:700, fontSize: 13 }}>{item.name}</div>
                  {item.status === "on"
                    ? <span style={{ fontSize:9, background:C.green, color:"#fff", padding:"1px 6px", borderRadius:4, fontWeight:600 }}>✓ 現貨販售中</span>
                    : <span style={{ fontSize:9, background:C.faint, color:"#fff", padding:"1px 6px", borderRadius:4, fontWeight:600 }}>後台專用</span>}
                </div>
                {item.price > 0 && <div style={{ fontSize:13, color:C.green, fontWeight:700, marginTop: 2 }}>{fmtMoney(item.price)}</div>}
                {item.variants && item.variants.length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:6 }}>
                    {item.variants.map(v => (
                      <span key={v.id} style={{ fontSize:10, color:C.muted, border:`1px solid ${C.border}`, padding:"1px 7px", borderRadius: 4 }}>{v.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display:"flex", gap:6, flexShrink: 0 }}>
              <Btn sm variant="soft" onClick={() => setEditing(item)}>✏️</Btn>
              <button onClick={() => del(item.id)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:15 }}>🗑</button>
            </div>
          </div>
          {/* 庫存快速編輯 */}
          <div style={{ padding: "10px 14px", background: C.bgDeep, borderTop: `1px dashed ${C.borderLight}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>📊 總進貨</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={async () => {
                  const newTotal = Math.max(0, (Number(item.total_purchased) || 0) - 1);
                  const { error } = await supabase.from("in_stock").update({ total_purchased: newTotal, updated_at: new Date().toISOString() }).eq("id", item.id);
                  if (error) { toast("更新失敗"); return; }
                  setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, total_purchased: newTotal } : x) }));
                }} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 14, color: C.muted }}>−</button>
                <input type="number" inputMode="numeric" value={Number(item.total_purchased) || 0}
                  onChange={e => {
                    const newTotal = Math.max(0, Number(e.target.value) || 0);
                    setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, total_purchased: newTotal } : x) }));
                  }}
                  onBlur={async e => {
                    const newTotal = Math.max(0, Number(e.target.value) || 0);
                    const { error } = await supabase.from("in_stock").update({ total_purchased: newTotal, updated_at: new Date().toISOString() }).eq("id", item.id);
                    if (error) toast("儲存失敗");
                  }}
                  style={{ width: 56, textAlign: "center", padding: "5px 4px", border: `1.5px solid ${C.textMid}30`, borderRadius: 6, fontSize: 14, fontWeight: 700, color: C.textMid, background: "#fff" }}/>
                <button onClick={async () => {
                  const newTotal = (Number(item.total_purchased) || 0) + 1;
                  const { error } = await supabase.from("in_stock").update({ total_purchased: newTotal, updated_at: new Date().toISOString() }).eq("id", item.id);
                  if (error) { toast("更新失敗"); return; }
                  setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, total_purchased: newTotal } : x) }));
                }} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 14, color: C.textMid }}>+</button>
                <span style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>件</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>📦 剩餘庫存</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={async () => {
                const newStock = Math.max(0, (Number(item.stock) || 0) - 1);
                const { error } = await supabase.from("in_stock").update({ stock: newStock, updated_at: new Date().toISOString() }).eq("id", item.id);
                if (error) { toast("更新失敗"); return; }
                setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, stock: newStock } : x) }));
              }} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 14, color: C.muted }}>−</button>
              <input type="number" inputMode="numeric" value={Number(item.stock) || 0}
                onChange={e => {
                  const newStock = Math.max(0, Number(e.target.value) || 0);
                  setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, stock: newStock } : x) }));
                }}
                onBlur={async e => {
                  const newStock = Math.max(0, Number(e.target.value) || 0);
                  const { error } = await supabase.from("in_stock").update({ stock: newStock, updated_at: new Date().toISOString() }).eq("id", item.id);
                  if (error) toast("儲存失敗");
                }}
                style={{ width: 56, textAlign: "center", padding: "5px 4px", border: `1.5px solid ${C.accent}30`, borderRadius: 6, fontSize: 15, fontWeight: 700, color: C.accentDark, background: "#fff" }}/>
              <button onClick={async () => {
                const newStock = (Number(item.stock) || 0) + 1;
                const { error } = await supabase.from("in_stock").update({ stock: newStock, updated_at: new Date().toISOString() }).eq("id", item.id);
                if (error) { toast("更新失敗"); return; }
                setData(d => ({ ...d, inStock: d.inStock.map(x => x.id === item.id ? { ...x, stock: newStock } : x) }));
              }} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 14, color: C.accent }}>+</button>
              <span style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>件</span>
            </div>
            </div>
          </div>
          {/* 操作區:進貨 + 上下架 */}
          <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: "#fff", borderTop: `1px solid ${C.borderLight}` }}>
            <button onClick={() => restock(item)}
              style={{ flex: 1, background: C.accentBg, color: C.accentDark, border: `1.5px solid ${C.accent}`, padding: "9px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              📥 + 進貨 (自動配貨)
            </button>
            <button onClick={() => toggleStatus(item)}
              style={{ flex: 1, background: item.status === "on" ? C.pinkBg : C.greenBg, color: item.status === "on" ? C.pinkDark : C.green, border: `1.5px solid ${item.status === "on" ? C.pinkDark : C.green}`, padding: "9px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {item.status === "on" ? "🔒 下架" : "🛒 轉現貨販售"}
            </button>
          </div>
        </div>
      ))}

      {showAdd  && <StockModal onSave={saveNew}  onClose={() => setShowAdd(false)} />}
      {editing  && <StockModal product={editing} onSave={saveEdit} onClose={() => setEditing(null)} />}
    </div>
  );
}

function StockModal({ product, onSave, onClose }) {
  const isEdit = !!product;
  const [name, setName]     = useState(product?.name || "");
  const [price, setPrice]   = useState(String(product?.price || ""));
  const [image, setImage]   = useState(product?.image || "");
  const [variants, setVariants] = useState(product?.variants || []);
  const [vName, setVName]   = useState("");
  const [vPrice, setVPrice] = useState("");

  const addVariant = () => {
    const n = sanitize(vName, 50); if (!n) return;
    setVariants(vs => [...vs, { id:secureUid(), name:n, price:Number(vPrice)||0 }]);
    setVName(""); setVPrice("");
  };
  const removeVariant = id => setVariants(vs => vs.filter(v => v.id !== id));

  const save = () => {
    const cleanName = sanitize(name, 100);
    if (!cleanName || !price) return alert("請填寫名稱與價格");
    onSave({ id:product?.id||secureUid(), name:cleanName, price:Math.max(0,Number(price)||0), image:sanitize(image,10)||"🎁", status:"on", variants });
  };

  return (
    <Modal title={isEdit ? "編輯現貨" : "新增現貨"} onClose={onClose} wide>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:10 }}>
          <Input label="商品名稱 *" value={name}  onChange={setName}  placeholder="Hello Kitty 鑰匙圈" />
          <Input label="價格 NT$ *" type="number" value={price} onChange={setPrice} placeholder="350" />
          <Input label="圖示 Emoji" value={image} onChange={setImage} placeholder="🎀" />
        </div>

        {/* Variants */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>款式設定</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>例如：草莓款、藍色、M號… 客人下單時可選擇</div>

          {variants.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
              {variants.map(v => (
                <div key={v.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:C.bgDeep, border:`1px solid ${C.border}` }}>
                  <div style={{ flex:1 }}>
                    <span style={{ fontSize:13, fontWeight:600 }}>{v.name}</span>
                    {v.price > 0 && <span style={{ fontSize:11, color:C.muted, marginLeft:8 }}>+NT${v.price}</span>}
                    {v.cost > 0 && <span style={{ fontSize:11, color:C.red, marginLeft:8 }}>成本 NT${v.cost}</span>}
                  </div>
                  <button onClick={() => removeVariant(v.id)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:16 }}>×</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
            <Input label="款式名稱" value={vName} onChange={setVName} placeholder="草莓款 / 紅色" style={{ flex:2 }} />
            <Input label="加價 NT$" type="number" value={vPrice} onChange={setVPrice} placeholder="0" style={{ flex:1 }} />
            <Btn sm variant="soft" onClick={addVariant} style={{ marginBottom:1 }}>+ 新增</Btn>
          </div>
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:8, borderTop:`1px solid ${C.border}` }}>
          <Btn variant="ghost" onClick={onClose}>取消</Btn>
          <Btn onClick={save}>{isEdit ? "儲存" : "新增現貨"}</Btn>
        </div>
      </div>
    </Modal>
  );
}

function WishlistPage({ data, setData, toast }) {
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editNote, setEditNote] = useState("");

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from("wishlist").update({ status }).eq("id", id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, wishlist: d.wishlist.map(w => w.id===id ? {...w,status} : w) }));
    if (status === "found") {
      setEditingId(id);
      const w = data.wishlist.find(x => x.id === id);
      setEditPrice(w?.price ? String(w.price) : "");
      setEditNote(w?.found_note || "");
    }
    toast("已更新");
  };

  const deleteWish = async (w) => {
    if (!confirm(`確定要刪除 ${w.customer_name || w.customerName} 的許願「${w.name}」嗎？\n刪除後無法復原。`)) return;
    const { error } = await supabase.from("wishlist").delete().eq("id", w.id);
    if (error) { toast(`刪除失敗：${error.message || "未知錯誤"}`); return; }
    setData(d => ({ ...d, wishlist: d.wishlist.filter(x => x.id !== w.id) }));
    toast("已刪除許願");
  };

  const saveQuote = async (id) => {
    const price = Math.max(0, Number(editPrice) || 0);
    const found_note = editNote.trim().slice(0, 200);
    const { error } = await supabase.from("wishlist").update({ price, found_note }).eq("id", id);
    if (error) { toast("儲存失敗"); return; }
    setData(d => ({ ...d, wishlist: d.wishlist.map(w => w.id===id ? {...w, price, found_note} : w) }));
    setEditingId(null); setEditPrice(""); setEditNote("");
    toast("報價已通知客人 ✅");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>許願清單 ({data.wishlist.length})</div>
      {!data.wishlist.length && <Card style={{ textAlign:"center" }}><div style={{ fontSize:40 }}>⭐</div><div style={{ color:C.muted, marginTop:8 }}>還沒有客人許願</div></Card>}
      {data.wishlist.map(w => {
        const isFound = w.status === "found";
        const isEditing = editingId === w.id;
        return (
          <Card key={w.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isFound ? 12 : 0 }}>
              <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
                <div style={{ fontWeight: 700 }}>{w.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>客人：{w.customer_name || w.customerName}</div>
                {w.note && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>✏️ {w.note}</div>}
                {w.link && <a href={w.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: C.accent, display:"block", marginTop:4, wordBreak:"break-all" }}>🔗 {w.link}</a>}
                {w.img_url && <img src={w.img_url} alt="參考圖" onError={e=>e.target.style.display="none"} style={{ width:"100%", maxHeight:140, objectFit:"cover", borderRadius:8, marginTop:8, border:`1px solid ${C.border}` }}/>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink: 0 }}>
                <select value={w.status} onChange={e => updateStatus(w.id, e.target.value)}
                  style={{ background: C.bgDeep, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}>
                  <option value="searching">⭐ 許願中</option>
                  <option value="found">✅ 找到了</option>
                </select>
                <button onClick={() => deleteWish(w)} title="刪除許願"
                  style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 14, cursor: "pointer", color: C.red, lineHeight: 1 }}>
                  🗑
                </button>
              </div>
            </div>

            {/* 已找到：顯示報價區 */}
            {isFound && (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                {isEditing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>回填報價給客人</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>報價 NT$</div>
                        <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)}
                          placeholder="0"
                          style={{ width: "100%", background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, color: C.text, outline: "none" }}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.border}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>備註（可選）</div>
                      <input value={editNote} onChange={e => setEditNote(e.target.value)}
                        placeholder="例：京都限定款，數量有限"
                        style={{ width: "100%", background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: C.text, outline: "none" }}
                        onFocus={e => e.target.style.borderColor = C.accent}
                        onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => saveQuote(w.id)}
                        style={{ flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        儲存並通知客人
                      </button>
                      <button onClick={() => setEditingId(null)}
                        style={{ background: C.bgDeep, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 16px", fontSize: 13, cursor: "pointer" }}>
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      {w.price > 0
                        ? <><div style={{ fontSize: 13, color: C.muted }}>已回填報價</div><div style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>NT$ {Number(w.price).toLocaleString()}</div></>
                        : <div style={{ fontSize: 13, color: C.muted }}>尚未回填報價</div>
                      }
                      {w.found_note && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{w.found_note}</div>}
                    </div>
                    <button onClick={() => { setEditingId(w.id); setEditPrice(w.price ? String(w.price) : ""); setEditNote(w.found_note || ""); }}
                      style={{ background: C.bgDeep, color: C.textMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer" }}>
                      {w.price > 0 ? "修改報價" : "填入報價"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function AnnouncementsPage({ data, setData, toast }) {
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const startEdit = (ann) => { setEditing(ann.id); setTitle(ann.title); setContent(ann.content); };
  const startNew  = () => { setEditing("new"); setTitle(""); setContent(""); };
  const cancel    = () => { setEditing(null); setTitle(""); setContent(""); };

  const save = async () => {
    if (!title.trim() || !content.trim()) return alert("請填寫標題和內容");
    if (editing === "new") {
      const newAnn = { id: secureUid(), title: title.trim(), content: content.trim(), created_at: new Date().toISOString() };
      const { data: saved, error } = await supabase.from("announcements").insert([newAnn]).select().single();
      if (error) { toast("新增失敗"); return; }
      setData(d => ({ ...d, announcements: [saved, ...d.announcements] }));
      toast("公告已新增 📢");
    } else {
      const { error } = await supabase.from("announcements").update({ title: title.trim(), content: content.trim() }).eq("id", editing);
      if (error) { toast("更新失敗"); return; }
      setData(d => ({ ...d, announcements: d.announcements.map(a => a.id === editing ? { ...a, title: title.trim(), content: content.trim() } : a) }));
      toast("公告已更新 ✅");
    }
    cancel();
  };

  const del = async (id) => {
    if (!window.confirm("確定刪除此公告？")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, announcements: d.announcements.filter(a => a.id !== id) }));
    toast("公告已刪除");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📢 公告管理</div>
        {editing === null && <Btn sm onClick={startNew}>＋ 新增公告</Btn>}
      </div>

      {/* Editor */}
      {editing !== null && (
        <div className="fade" style={{ background: C.surface, border: `2px solid ${C.accent}`, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.accentDark }}>
            {editing === "new" ? "✏️ 新增公告" : "✏️ 編輯公告"}
          </div>
          <Input label="標題 *" value={title} onChange={setTitle} placeholder="例：第一天（4/21）行程公告" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>內容 *</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={"✨ 08:00 SUGI藥妝\n── 停留1小時 ──\n✨ 09:10 7-11"}
              rows={10}
              style={{
                background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10,
                padding: "10px 13px", color: C.text, fontSize: 13,
                lineHeight: 1.8, resize: "vertical", fontFamily: "'Noto Sans TC', sans-serif",
                transition: "border .15s",
              }}
              onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`; }}
              onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
            />
            <div style={{ fontSize: 11, color: C.muted }}>可用換行和 emoji，客人端會原樣顯示</div>
          </div>

          {/* Preview */}
          {(title || content) && (
            <div style={{ background: C.yellowBg, borderLeft: `4px solid ${C.yellow}`, borderRadius: "0 10px 10px 0", padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700, marginBottom: 6 }}>預覽（客人端顯示效果）</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title || "（標題）"}</div>
              <pre style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "'Noto Sans TC', sans-serif" }}>{content || "（內容）"}</pre>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={cancel}>取消</Btn>
            <Btn onClick={save}>{editing === "new" ? "發布公告" : "儲存修改"}</Btn>
          </div>
        </div>
      )}

      {/* List */}
      {data.announcements.length === 0 && editing === null && (
        <Card style={{ textAlign: "center", color: C.muted, padding: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📢</div>
          <div>還沒有公告，點上方按鈕新增</div>
        </Card>
      )}

      {data.announcements.map(ann => (
        <div key={ann.id} style={{
          background: C.surface, border: `1.5px solid ${editing === ann.id ? C.accent : C.border}`,
          borderRadius: 16, overflow: "hidden", boxShadow: C.shadow,
          opacity: editing !== null && editing !== ann.id ? 0.5 : 1,
          transition: "opacity .2s",
        }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.accentDark, marginBottom: 4 }}>📢 {ann.title}</div>
                <div style={{ fontSize: 11, color: C.muted }}>發布：{ann.createdAt}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <Btn sm variant="soft" onClick={() => startEdit(ann)} disabled={editing !== null}>✏️ 編輯</Btn>
                <Btn sm variant="danger" onClick={() => del(ann.id)} disabled={editing !== null}>刪除</Btn>
              </div>
            </div>
          </div>
          <div style={{ padding: "12px 16px", background: C.bgDeep }}>
            <pre style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "'Noto Sans TC', sans-serif", maxHeight: 120, overflow: "hidden" }}>
              {ann.content.length > 200 ? ann.content.slice(0, 200) + "…" : ann.content}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomersPage({ data, setData, toast, sendLineNotify }) {
  const [expandedId, setExpandedId]   = useState(null);
  const [detailFilter, setDetailFilter] = useState("all");
  const [search, setSearch]           = useState("");
  const [editingId, setEditingId]     = useState(null);
  const [noteInput, setNoteInput]     = useState("");
  const [notifyTargets, setNotifyTargets] = useState(null);

  // ── 從訂單動態彙整客人清單 ──────────────────────────────────
  // 不依賴 data.customers，直接從 data.orders 聚合
  // key = customer_line_id(Supabase)或 customerId(本機)
  // 過濾掉封存訂單
  const uniqueCustomerOrders = Array.from(new Map(
    data.orders.filter(o => !o.archived).map(o => [o.id, o])
  ).values());
  const customerMap = {};
  uniqueCustomerOrders.forEach(o => {
    const key   = o.customer_line_id || o.customerId || o.customerName;
    const name  = o.customer_name    || o.customerName || "未知";
    if (!customerMap[key]) {
      const memberInfo = (data.members || []).find(m => m.line_user_id === key);
      customerMap[key] = {
        id:            key,
        name,
        lineId:        o.customer_line_id || o.customerId || "",
        communityName: memberInfo?.community_name || "",
        phone:         memberInfo?.phone || "",
        recipientName: memberInfo?.recipient_name || "",
        igLink:        memberInfo?.ig_threads || "",
        sevenStore:    memberInfo?.seven_store || "",
        lineId2:       memberInfo?.line_id || "",
        note:          data.customerNotes?.[key] || "",
        orders:        [],
      };
    }
    customerMap[key].orders.push(o);
  });
  const allCustomers = Object.values(customerMap).sort((a, b) => {
    // 最近有訂單的排前面
    const aLast = Math.max(...a.orders.map(o => new Date(o.created_at || o.createdAt || 0).getTime()));
    const bLast = Math.max(...b.orders.map(o => new Date(o.created_at || o.createdAt || 0).getTime()));
    return bLast - aLast;
  });

  // 搜尋
  const filtered = allCustomers.filter(c =>
    !search.trim() ||
    c.name.includes(search.trim()) ||
    c.lineId.includes(search.trim()) ||
    c.note.includes(search.trim())
  );

  // 儲存備註
  const saveNote = (customerId) => {
    setData(d => ({
      ...d,
      customerNotes: { ...(d.customerNotes || {}), [customerId]: sanitize(noteInput, 200) }
    }));
    setEditingId(null);
    toast("備註已儲存");
  };

  // 狀態更新（直接在這頁也能改）
  const updateStatus = async (orderId, status) => {
    const safe = ["pending_review","pending","bought","shipped","arrived","cancelled"].includes(status) ? status : "pending_review";
    const { error } = await supabase.from("orders").update({ status: safe, updated_at: new Date().toISOString() }).eq("id", orderId);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.map(o => o.id === orderId ? { ...o, status: safe } : o) }));
    toast("狀態已更新");
  };

  if (data.orders.length === 0) {
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>客人管理</div>
        <Card style={{ textAlign:"center", padding:40, color:C.muted }}>
          <div style={{ fontSize:36, marginBottom:12 }}>📋</div>
          <div style={{ fontWeight:600, marginBottom:6 }}>還沒有任何訂單</div>
          <div style={{ fontSize:13 }}>客人透過下單系統送出訂單後，<br/>會自動在這裡出現</div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {notifyTargets && (
        <LineNotifyModal
          targets={notifyTargets}
          onSend={sendLineNotify}
          onClose={() => setNotifyTargets(null)}
        />
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>
          客人管理（{allCustomers.length} 位）
        </div>
        <button onClick={() => setNotifyTargets(allCustomers.map(c => ({ name: c.name, lineUserId: c.lineId })))}
          style={{ fontSize:12, background:"#3d4a3e", color:"#fff", border:"none", borderRadius:99, padding:"7px 16px", cursor:"pointer", fontWeight:600 }}>
          📨 全體通知
        </button>
      </div>

      {/* 搜尋 */}
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, color:C.muted, pointerEvents:"none" }}>🔍</span>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setExpandedId(null); }}
          placeholder="搜尋客人名稱、LINE ID、備註…"
          style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"9px 14px 9px 36px", color:C.text, fontSize:14 }}
          onFocus={e => { e.target.style.borderColor=C.accent; e.target.style.boxShadow=`0 0 0 3px ${C.accent}15`; }}
          onBlur={e => { e.target.style.borderColor=C.border; e.target.style.boxShadow="none"; }}
        />
        {search && (
          <button onClick={() => { setSearch(""); setExpandedId(null); }} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:C.faint, border:"none", color:C.muted, width:20, height:20, borderRadius:"50%", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        )}
      </div>

      {search && <div style={{ fontSize:13, color:C.muted }}>找到 {filtered.length} 位客人</div>}
      {search && filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"32px 0", color:C.muted, fontSize:14 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>找不到「{search}」
        </div>
      )}

      {/* 客人卡片清單 */}
      {filtered.map(c => {
        const orders     = c.orders;
        const total      = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
        const isOpen     = expandedId === c.id;
        const isEditing  = editingId === c.id;
        const statusCounts = Object.keys(ORDER_STATUS).reduce((acc, s) => {
          acc[s] = orders.filter(o => o.status === s).length;
          return acc;
        }, {});
        const filteredOrders = detailFilter === "all" ? orders : orders.filter(o => o.status === detailFilter);

        return (
          <div key={c.id} style={{ background:C.surface, border:`1.5px solid ${isOpen ? C.accent : C.border}`, borderRadius:18, overflow:"hidden", boxShadow:isOpen ? C.shadowMd : C.shadow, transition:"all .2s" }}>

            {/* 客人行 — 點擊展開 */}
            <div
              onClick={() => { setExpandedId(isOpen ? null : c.id); setDetailFilter("all"); setEditingId(null); }}
              style={{ padding:"16px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", background:isOpen ? C.accentBg : "transparent", transition:"background .15s" }}
            >
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                {/* 頭像 */}
                <div style={{ width:46, height:46, borderRadius:"50%", background:C.accentBg, border:`2px solid ${C.accentLight}40`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.accent, fontSize:19, flexShrink:0 }}>
                  {c.name?.[0] || "?"}
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15 }}>{c.name}</div>
                  {c.note
                    ? <div style={{ fontSize:11, color:C.accent, marginTop:2 }}>📝 {c.note}</div>
                    : <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>LINE：{c.lineId ? c.lineId.slice(0,12)+"…" : "—"}</div>
                  }
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:C.muted }}>訂單 / 消費</div>
                  <div style={{ fontWeight:700, color:C.accentDark }}>{orders.length} 筆 / {fmtMoney(total)}</div>
                </div>
                <div style={{ fontSize:20, color:C.muted, transform:isOpen?"rotate(90deg)":"none", transition:"transform .2s" }}>›</div>
              </div>
            </div>

            {/* 展開內容 */}
            {isOpen && (
              <div className="fade" style={{ borderTop:`1.5px solid ${C.border}` }}>

                {/* 備註列 */}
                <div style={{ padding:"12px 18px", background:C.bgDeep, display:"flex", alignItems:"center", gap:10 }}>
                  {isEditing ? (
                    <>
                      <input
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                        placeholder="輸入備註（電話、地址、VIP 等）"
                        maxLength={200}
                        style={{ flex:1, background:C.bg, border:`1.5px solid ${C.accent}`, borderRadius:8, padding:"7px 12px", fontSize:13, color:C.text }}
                        autoFocus
                        onKeyDown={e => { if (e.key==="Enter") saveNote(c.id); if (e.key==="Escape") setEditingId(null); }}
                      />
                      <Btn sm onClick={() => saveNote(c.id)}>儲存</Btn>
                      <Btn sm variant="ghost" onClick={() => setEditingId(null)}>取消</Btn>
                    </>
                  ) : (
                    <>
                      <div style={{ flex:1, fontSize:13, color:c.note ? C.text : C.muted }}>
                        📝 {c.note || "尚無備註（可記電話、地址、VIP 備注）"}
                      </div>
                      <button onClick={e => { e.stopPropagation(); setNotifyTargets([{ name: c.name, lineUserId: c.lineId }]); }}
                        style={{ fontSize:11, background:"#3d4a3e", color:"#fff", border:"none", borderRadius:99, padding:"5px 12px", cursor:"pointer", whiteSpace:"nowrap", fontWeight:600 }}>
                        📨 通知
                      </button>
                      <Btn sm variant="ghost" onClick={e => { e.stopPropagation(); setNoteInput(c.note||""); setEditingId(c.id); }}>✏️ 編輯</Btn>
                    </>
                  )}
                </div>

                {/* 客人個資 */}
                <div style={{ margin:"0 18px 12px", padding:"12px 14px", background:C.bgDeep, borderRadius:10, fontSize:12, color:C.textMid }}>
                  <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:8, letterSpacing:.5 }}>客人資料</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 16px" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      <span style={{ fontSize:10, color:C.faint }}>社群名稱</span>
                      <span style={{ fontWeight:500, color:c.communityName?C.text:C.faint }}>{c.communityName||"未填寫"}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      <span style={{ fontSize:10, color:C.faint }}>收件人</span>
                      <span style={{ fontWeight:500, color:c.recipientName?C.text:C.faint }}>{c.recipientName||"未填寫"}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      <span style={{ fontSize:10, color:C.faint }}>電話</span>
                      <span style={{ fontWeight:500, color:c.phone?C.text:C.faint }}>{c.phone||"未填寫"}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      <span style={{ fontSize:10, color:C.faint }}>7-11 門市</span>
                      <span style={{ color:c.sevenStore?C.text:C.faint }}>{c.sevenStore||"未填寫"}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      <span style={{ fontSize:10, color:C.faint }}>LINE ID</span>
                      <span style={{ color:c.lineId2?C.text:C.faint }}>{c.lineId2||"未填寫"}</span>
                    </div>
                    {c.igLink && (
                      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                        <span style={{ fontSize:10, color:C.faint }}>IG / FB</span>
                        <a href={c.igLink} target="_blank" rel="noreferrer" style={{ color:C.accent, wordBreak:"break-all", fontSize:11 }}>{c.igLink}</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 狀態篩選列 */}
                <div style={{ padding:"12px 18px 8px", background:C.bgDeep, display:"flex", gap:8, overflowX:"auto" }}>
                  {[
                    { label:"全部", value:orders.length, key:"all", color:C.text },
                    ...Object.entries(ORDER_STATUS).map(([k,v]) => ({ label:v.label, value:statusCounts[k], key:k, color:v.color, icon:v.icon }))
                  ].filter(s => s.value > 0 || s.key === "all").map(s => (
                    <button key={s.key} onClick={() => setDetailFilter(s.key)} style={{
                      flexShrink:0, background:detailFilter===s.key ? C.surface : "transparent",
                      border:`1.5px solid ${detailFilter===s.key ? C.accent : C.border}`,
                      borderRadius:10, padding:"6px 12px", cursor:"pointer", textAlign:"center", transition:"all .15s",
                    }}>
                      <div style={{ fontSize:16, fontWeight:700, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>{s.icon||""} {s.label}</div>
                    </button>
                  ))}
                </div>

                {/* 訂單明細 */}
                <div style={{ padding:"10px 18px 16px", display:"flex", flexDirection:"column", gap:10 }}>
                  {filteredOrders.length === 0 && (
                    <div style={{ textAlign:"center", padding:24, color:C.muted, fontSize:14 }}>此狀態沒有訂單</div>
                  )}
                  {filteredOrders.map(o => {
                    const createdDate = o.created_at
                      ? new Date(o.created_at).toLocaleDateString("zh-TW")
                      : (o.createdAt || "—");
                    return (
                      <div key={o.id} style={{ background:C.bg, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
                        {/* 訂單 header */}
                        <div style={{ padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                          <div>
                            <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>#{o.no} · {createdDate}</div>
                            <div style={{ fontWeight:700, fontSize:14 }}>
                              {o.items?.[0]?.name}{(o.items?.length||0) > 1 ? ` 等 ${o.items.length} 件` : ""}
                            </div>
                          </div>
                          {/* 可直接改狀態 */}
                          <select
                            value={o.status}
                            onChange={e => updateStatus(o.id, e.target.value)}
                            onClick={e => e.stopPropagation()}
                            style={{ background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"4px 8px", fontSize:12, cursor:"pointer", color:C.text }}
                          >
                            {Object.entries(ORDER_STATUS).map(([k,v]) => (
                              <option key={k} value={k}>{v.icon} {v.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* 商品明細 */}
                        <div style={{ margin:"0 14px", background:C.surface, borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}` }}>
                          {(o.items||[]).map((it, i) => {
                            return (
                            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 13px", borderBottom: i < (o.items.length-1) ? `1px solid ${C.borderSoft}` : "none", gap:10 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
                                <div style={{ width:40, height:40, borderRadius:8, background:C.bgDeep, flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                                  {it.image?.startsWith("data:")||it.image?.startsWith("http")
                                    ? <img src={it.image} alt={it.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
                                    : it.image
                                      ? <span>{it.image}</span>
                                      : <span style={{ fontSize:16, color:C.faint }}>🛒</span>
                                  }
                                </div>
                                <div style={{ minWidth:0 }}>
                                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{it.name}</div>
                                  {it.note && <div style={{ fontSize:11, color:C.muted }}>備註：{it.note}</div>}
                                </div>
                              </div>
                              <div style={{ textAlign:"right", fontSize:13, flexShrink:0 }}>
                                <div style={{ color:C.muted }}>×{it.qty}</div>
                                <div style={{ fontWeight:700 }}>{fmtMoney((it.price||0) * (it.qty||1))}</div>
                              </div>
                            </div>
                            );
                          })}
                        </div>

                        {/* 訂單 footer */}
                        <div style={{ padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <div style={{ fontSize:12, color:C.muted }}>
                            {o.profit > 0 && <span style={{ color:C.green, fontWeight:600 }}>利潤 {fmtMoney(o.profit)}</span>}
                          </div>
                          <div style={{ fontWeight:700, color:C.accentDark }}>{fmtMoney(o.total)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 小計 */}
                <div style={{ margin:"0 18px 12px", background:C.accentBg, borderRadius:12, padding:"12px 16px", display:"flex", justifyContent:"space-between", border:`1.5px solid ${C.accentLight}40` }}>
                  <div style={{ fontSize:13, color:C.accentDark, fontWeight:600 }}>💰 消費總計（不含取消）</div>
                  <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>{fmtMoney(total)}</div>
                </div>

                {/* 合併訂單按鈕 */}
                {orders.filter(o => o.status !== "cancelled").length > 1 && (
                  <div style={{ margin:"0 18px 16px" }}>
                    <MergeOrdersButton
                      orders={orders.filter(o => o.status !== "cancelled")}
                      customer={c}
                      setData={setData}
                      toast={toast}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MergeOrdersButton({ orders, customer, setData, toast }) {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState([]);
  const [merging, setMerging] = useState(false);

  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const merge = async () => {
    if (selected.length < 2) { toast("請至少選擇 2 筆訂單合併"); return; }
    setMerging(true);
    const toMerge = orders.filter(o => selected.includes(o.id));
    const allItems = toMerge.flatMap(o => o.items || []);
    const total = allItems.reduce((s, it) => s + (it.price||0) * (it.qty||1), 0);
    const profit = toMerge.reduce((s, o) => s + (o.profit||0), 0);
    const no = String(100000 + Math.floor(Math.random() * 900000));
    const mergedOrder = {
      id: crypto.randomUUID().replace(/-/g,"").slice(0,12),
      no,
      customer_line_id: customer.lineId,
      customer_name: customer.name,
      status: toMerge[0].status,
      items: allItems,
      total, profit,
      created_at: new Date().toISOString(),
    };
    try {
      // 建立合併後訂單
      const { data: saved, error } = await supabase.from("orders").insert([mergedOrder]).select().single();
      if (error) throw error;
      // 刪除原訂單
      await supabase.from("orders").delete().in("id", selected);
      setData(d => ({
        ...d,
        orders: [saved, ...d.orders.filter(o => !selected.includes(o.id))]
      }));
      toast(`✅ 已合併 ${selected.length} 筆訂單`);
      setSelecting(false);
      setSelected([]);
    } catch(e) {
      console.error(e);
      toast("合併失敗，請稍後再試");
    }
    setMerging(false);
  };

  if (!selecting) return (
    <button onClick={() => { setSelecting(true); setSelected([]); }}
      style={{ width:"100%", background:C.bgDeep, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"9px", fontSize:12, color:C.textMid, cursor:"pointer", fontWeight:500 }}>
      🔗 合併訂單
    </button>
  );

  return (
    <div style={{ background:C.bgDeep, borderRadius:12, padding:"14px", border:`1.5px solid ${C.accent}40` }}>
      <div style={{ fontSize:12, color:C.accent, fontWeight:600, marginBottom:10 }}>選擇要合併的訂單（至少 2 筆）</div>
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
        {orders.map(o => (
          <label key={o.id} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", padding:"6px 8px", borderRadius:8, background: selected.includes(o.id) ? C.accentBg : "transparent", border: `1px solid ${selected.includes(o.id) ? C.accent : C.border}` }}>
            <input type="checkbox" checked={selected.includes(o.id)} onChange={() => toggle(o.id)} style={{ accentColor: C.accent }} />
            <span style={{ fontSize:12, flex:1 }}>#{o.no} · {o.items?.[0]?.name}{(o.items?.length||0)>1?` 等${o.items.length}件`:""}</span>
            <span style={{ fontSize:12, fontWeight:600, color:C.accent }}>{fmtMoney(o.total)}</span>
          </label>
        ))}
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={merge} disabled={merging || selected.length < 2}
          style={{ flex:1, background: selected.length < 2 ? C.faint : C.accent, color:"#fff", border:"none", borderRadius:8, padding:"9px", fontSize:12, cursor: selected.length < 2 ? "not-allowed" : "pointer", fontWeight:600 }}>
          {merging ? "合併中..." : `合併 ${selected.length} 筆`}
        </button>
        <button onClick={() => { setSelecting(false); setSelected([]); }}
          style={{ background:C.bgDeep, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 16px", fontSize:12, cursor:"pointer", color:C.muted }}>
          取消
        </button>
      </div>
    </div>
  );
}

const DEFAULT_TEMPLATES = [
  "您好！您的訂單已採購完成，請留意後續寄送通知 📦",
  "您好！您的商品已從日本寄出，請稍候等待到台通知 ✈️",
  "您好！您的商品已到台灣，我們會盡快安排出貨，請確認收件資訊 🎁",
  "您好！您有一筆訂單待付款，請盡快完成付款，謝謝 💳",
];

function LineNotifyModal({ targets, onSend, onClose }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [templates, setTemplates] = useState(() => {
    try { return JSON.parse(localStorage.getItem("line_templates") || "null") || DEFAULT_TEMPLATES; }
    catch { return DEFAULT_TEMPLATES; }
  });
  const [editingTpl, setEditingTpl] = useState(null);
  const [tplInput, setTplInput] = useState("");

  const saveTemplates = (t) => {
    setTemplates(t);
    try { localStorage.setItem("line_templates", JSON.stringify(t)); } catch {}
  };

  const send = async () => {
    if (!message.trim()) return;
    setSending(true);
    const ids = targets.map(t => t.lineUserId).filter(Boolean);
    await onSend(ids, message);
    setSending(false);
    onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000 }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.45)", backdropFilter:"blur(4px)" }} onClick={onClose}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"#fff", borderRadius:20, padding:24, width:"min(480px, 94vw)", boxShadow:"0 8px 40px rgba(0,0,0,.18)", maxHeight:"90vh", overflow:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:16, fontWeight:700 }}>📨 傳送 LINE 通知</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#aaa" }}>×</button>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, color:"#888", marginBottom:6, fontWeight:600 }}>收件人（{targets.length} 人）</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {targets.map((t,i)=>(
              <span key={i} style={{ fontSize:12, background:"#eaede8", color:"#3d4a3e", padding:"3px 10px", borderRadius:99 }}>{t.name}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontSize:12, color:"#888", fontWeight:600 }}>快速範本（可編輯）</div>
            <button onClick={()=>{ setTemplates([...templates,"新範本"]); saveTemplates([...templates,"新範本"]); }}
              style={{ fontSize:11, background:"#eaede8", border:"none", borderRadius:99, padding:"3px 10px", cursor:"pointer", color:"#3d4a3e" }}>+ 新增</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {templates.map((t,i)=>(
              <div key={i} style={{ display:"flex", gap:6 }}>
                {editingTpl===i
                  ?<div style={{ flex:1, display:"flex", gap:6 }}>
                    <input value={tplInput} onChange={e=>setTplInput(e.target.value)} style={{ flex:1, background:"#f5f3ef", border:"1.5px solid #a0614a", borderRadius:8, padding:"6px 10px", fontSize:12, outline:"none" }}/>
                    <button onClick={()=>{ const t2=[...templates];t2[i]=tplInput;saveTemplates(t2);setEditingTpl(null); }} style={{ background:"#a0614a", color:"#fff", border:"none", borderRadius:8, padding:"0 10px", fontSize:12, cursor:"pointer" }}>儲存</button>
                    <button onClick={()=>setEditingTpl(null)} style={{ background:"#f5f3ef", border:"none", borderRadius:8, padding:"0 8px", fontSize:12, cursor:"pointer", color:"#888" }}>取消</button>
                  </div>
                  :<><button onClick={()=>setMessage(t)} style={{ flex:1, textAlign:"left", background:"#f5f3ef", border:"1.5px solid #e2dbd2", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#4a4438", cursor:"pointer", lineHeight:1.5 }}>{t}</button>
                    <button onClick={()=>{ setTplInput(t);setEditingTpl(i); }} style={{ background:"none", border:"1px solid #e2dbd2", borderRadius:8, padding:"0 8px", fontSize:12, cursor:"pointer", color:"#888" }}>✏️</button>
                    <button onClick={()=>{ const t2=templates.filter((_,j)=>j!==i);saveTemplates(t2); }} style={{ background:"none", border:"none", fontSize:14, cursor:"pointer", color:"#ccc" }}>×</button>
                  </>
                }
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, color:"#888", marginBottom:6, fontWeight:600 }}>自訂訊息 *</div>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5}
            placeholder="輸入要傳送給客人的 LINE 訊息內容..."
            style={{ width:"100%", background:"#fdfaf7", border:"1.5px solid #e2dbd2", borderRadius:12, padding:"11px 14px", fontSize:13, color:"#1e1a14", resize:"vertical", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
            onFocus={e=>e.target.style.borderColor="#8b5e3c"} onBlur={e=>e.target.style.borderColor="#e2dbd2"}
          />
          <div style={{ fontSize:11, color:"#c0b8ac", marginTop:4 }}>{message.length} 字</div>
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ background:"transparent", border:"1.5px solid #e2dbd2", borderRadius:99, padding:"9px 20px", fontSize:13, cursor:"pointer", color:"#8a8070" }}>取消</button>
          <button onClick={send} disabled={sending||!message.trim()}
            style={{ background:sending||!message.trim()?"#c0b8ac":"#8b5e3c", color:"#fff", border:"none", borderRadius:99, padding:"9px 24px", fontSize:13, fontWeight:600, cursor:sending||!message.trim()?"not-allowed":"pointer" }}>
            {sending?"發送中...":`發送給 ${targets.length} 人`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 付款欄位元件 ────────────────────────────────────────────────
function PaymentFields({ order: o, setData, toast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    payment_method: o.payment_method || "",
    bank_code:      o.bank_code || "",
    payment_date:   o.payment_date || "",
    ship_date:      o.ship_date || "",
    shipping_fee:   String(o.shipping_fee || ""),
    deposit:        String(o.deposit || ""),
    deposit_paid:   o.deposit_paid || false,
    final_paid:     o.final_paid || false,
  });

  const total = o.total || 0;
  const liveShipping = Number(form.shipping_fee) || 0;
  const liveDeposit  = Number(form.deposit) || 0;
  const liveFinal    = Math.max(0, total + liveShipping - liveDeposit);

  const save = async () => {
    const updateData = {
      ...form,
      shipping_fee:   Number(form.shipping_fee) || 0,
      deposit:        Number(form.deposit) || 0,
      final_payment:  Math.max(0, total + (Number(form.shipping_fee)||0) - (Number(form.deposit)||0)),
    };
    // 訂金/尾款已收 → 自動跳到「待採買」(若狀態還在採買前)
    const beforePurchase = !o.status || ["pending_review", "cancelled"].includes(o.status);
    if ((form.deposit_paid || form.final_paid) && beforePurchase) {
      updateData.status = "pending";
    }
    const { error } = await supabase.from("orders").update(updateData).eq("id", o.id);
    if (!error) {
      setData(d => ({ ...d, orders: d.orders.map(x => x.id === o.id ? { ...x, ...updateData } : x) }));
      setEditing(false);
      if (updateData.status === "pending" && toast) toast("✅ 款項已收，訂單更新為「待採買」");
    } else {
      if (toast) toast("儲存失敗，請稍後再試");
    }
  };

  // 顯示模式
  if (!editing) return (
    <button onClick={() => { setForm({ payment_method:o.payment_method||"", bank_code:o.bank_code||"", payment_date:o.payment_date||"", ship_date:o.ship_date||"", shipping_fee:String(o.shipping_fee||""), deposit:String(o.deposit||""), deposit_paid:o.deposit_paid||false, final_paid:o.final_paid||false }); setEditing(true); }}
      style={{ fontSize:11, background:"none", border:`1px solid ${C.border}`, borderRadius:99, padding:"3px 12px", cursor:"pointer", color:C.muted, display:"block" }}>
      ✏️ 編輯付款資訊
    </button>
  );

  return (
    <div style={{ background:C.surface, borderRadius:12, padding:"14px", display:"flex", flexDirection:"column", gap:10, border:`1px solid ${C.border}` }}>
      <div style={{ fontSize:12, fontWeight:600, color:C.textMid }}>編輯付款資訊</div>

      {/* 付款方式 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>付款方式</div>
          <select value={form.payment_method} onChange={e => setForm(p => ({ ...p, payment_method: e.target.value, bank_code: e.target.value !== "transfer" ? "" : p.bank_code }))}
            style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}>
            <option value="">請選擇</option>
            <option value="transfer">匯款</option>
            <option value="cod">貨到付款</option>
          </select>
        </div>
        {form.payment_method === "transfer" && (
          <div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>後五碼</div>
            <input value={form.bank_code} onChange={e => setForm(p => ({ ...p, bank_code: e.target.value.slice(0,5) }))} placeholder="12345" maxLength={5}
              style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}/>
          </div>
        )}
        <div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>收款日期</div>
          <input type="date" value={form.payment_date} onChange={e => setForm(p => ({ ...p, payment_date: e.target.value }))}
            style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}/>
        </div>
        <div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>出貨日期</div>
          <input type="date" value={form.ship_date} onChange={e => setForm(p => ({ ...p, ship_date: e.target.value }))}
            style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}/>
        </div>
      </div>

      {/* 訂金 / 運費 / 尾款 */}
      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
        <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:8 }}>訂金 / 尾款</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
          <div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>訂金 NT$</div>
            <input type="number" value={form.deposit} onChange={e => setForm(p => ({ ...p, deposit: e.target.value }))} placeholder="0"
              style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}/>
          </div>
          <div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>國際運費 NT$</div>
            <input type="number" value={form.shipping_fee} onChange={e => setForm(p => ({ ...p, shipping_fee: e.target.value }))} placeholder="0"
              style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 8px", fontSize:12 }}/>
          </div>
        </div>

        {/* 尾款計算 */}
        {(liveDeposit > 0 || liveShipping > 0) && (
          <div style={{ background:C.bgDeep, borderRadius:8, padding:"10px 12px", fontSize:12, marginBottom:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", color:C.muted, marginBottom:2 }}><span>商品總額</span><span>{fmtMoney(total)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", color:C.muted, marginBottom:2 }}><span>運費</span><span>+{fmtMoney(liveShipping)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", color:C.muted, marginBottom:6 }}><span>訂金</span><span>-{fmtMoney(liveDeposit)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, color:C.accentDark, borderTop:`1px solid ${C.border}`, paddingTop:5 }}>
              <span>尾款</span><span>{fmtMoney(liveFinal)}</span>
            </div>
          </div>
        )}

        {/* 訂金/尾款 checkbox */}
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <input type="checkbox" checked={form.deposit_paid} onChange={e => setForm(p => ({ ...p, deposit_paid: e.target.checked }))} style={{ width:16, height:16, accentColor:C.green }}/>
            <span style={{ fontSize:12 }}>✅ 訂金已收到</span>
            {form.deposit_paid && liveDeposit > 0 && <span style={{ fontSize:11, color:C.green }}>{fmtMoney(liveDeposit)}</span>}
          </label>
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <input type="checkbox" checked={form.final_paid} onChange={e => setForm(p => ({ ...p, final_paid: e.target.checked }))} style={{ width:16, height:16, accentColor:C.accent }}/>
            <span style={{ fontSize:12 }}>✅ 尾款已收到</span>
            {form.final_paid && <span style={{ fontSize:11, color:C.accent }}>{fmtMoney(liveFinal)} → 自動更新待採買</span>}
          </label>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, paddingTop:4 }}>
        <button onClick={save} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:8, padding:"7px 18px", fontSize:12, fontWeight:600, cursor:"pointer" }}>儲存</button>
        <button onClick={() => setEditing(false)} style={{ background:C.bgDeep, border:`1px solid ${C.border}`, borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer", color:C.muted }}>取消</button>
      </div>
    </div>
  );
}

// ─── 封存頁面 ─────────────────────────────────────────────────────
// ─── 配貨頁面 ────────────────────────────────────────────────────
// ─── 配貨頁面（重新設計）────────────────────────────────────────
// ─── 配貨頁面 ─────────────────────────────────────────────────────
function ArchivePage({ data, setData, toast }) {
  const [filter, setFilter] = useState("all");
  const archived = Array.from(new Map(data.orders.map(o=>[o.id,o])).values()).filter(o => o.archived);
  const filtered = archived.filter(o => filter === "all" || o.status === filter);

  const unarchive = async (id) => {
    const { error } = await supabase.from("orders").update({ archived: false, archived_at: null }).eq("id", id);
    if (!error) { setData(d => ({ ...d, orders: d.orders.map(o => o.id === id ? { ...o, archived: false, archived_at: null } : o) })); toast("已取消封存"); }
  };

  const deleteOne = async (id) => {
    if (!window.confirm("確定永久刪除？此操作無法復原。")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (!error) { setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== id) })); toast("已刪除"); }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>📦 封存訂單（{archived.length} 筆）</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>{
            if(!archived.length){toast("沒有封存訂單");return;}
            exportCSV(archived, `封存訂單_${new Date().toLocaleDateString("zh-TW").replace(/\//g,"-")}.csv`);
            toast("已匯出 📊");
          }} style={{ background:C.green, color:"#fff", border:"none", borderRadius:99, padding:"7px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>📊 匯出</button>
          {archived.length > 0 && (
            <button onClick={async()=>{
              if(!window.confirm(`確定永久刪除全部 ${archived.length} 筆？`))return;
              const ids=archived.map(o=>o.id);
              await supabase.from("orders").delete().in("id",ids);
              setData(d=>({...d,orders:d.orders.filter(o=>!ids.includes(o.id))}));
              toast("已全部清除");
            }} style={{ background:C.redBg, color:C.red, border:`1px solid ${C.red}40`, borderRadius:99, padding:"7px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>全部刪除</button>
          )}
        </div>
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {["all",...Object.keys(ORDER_STATUS)].map(s=>{
          const count=s==="all"?archived.length:archived.filter(o=>o.status===s).length;
          if(count===0&&s!=="all")return null;
          return <button key={s} onClick={()=>setFilter(s)} style={{ padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:600, cursor:"pointer", border:`1.5px solid ${filter===s?C.accent:C.border}`, background:filter===s?C.accentBg:"transparent", color:filter===s?C.accentDark:C.muted }}>{s==="all"?"全部":ORDER_STATUS[s]?.label}（{count}）</button>;
        })}
      </div>
      {!filtered.length
        ?<Card style={{ textAlign:"center", padding:"40px 0" }}><div style={{ fontSize:32, marginBottom:8 }}>📭</div><div style={{ color:C.muted }}>沒有封存訂單</div></Card>
        :filtered.map(o=>(
          <Card key={o.id} style={{ opacity:.9 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:12, color:C.muted }}>#{o.no}</span>
                  <StatusBadge status={o.status}/>
                  {o.archived_at&&<span style={{ fontSize:11, color:C.faint }}>封存於 {new Date(o.archived_at).toLocaleDateString("zh-TW")}</span>}
                </div>
                <div style={{ fontWeight:600 }}>{o.customer_name||o.customerName}</div>
                <div style={{ marginTop:6, display:"flex", flexWrap:"wrap", gap:4 }}>
                  {(o.items||[]).map((it,idx)=>(
                    <div key={idx} style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:24, height:24, borderRadius:5, background:C.bgDeep, flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>
                        {it.image?.startsWith("data:")||it.image?.startsWith("http")
                          ?<img src={it.image} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
                          :it.image||"🛒"}
                      </div>
                      <span style={{ fontSize:11, color:C.muted }}>{it.name} ×{it.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontWeight:700, color:C.accentDark }}>{fmtMoney(o.total)}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
              <button onClick={()=>unarchive(o.id)} style={{ fontSize:12, background:C.bgDeep, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 14px", cursor:"pointer", color:C.textMid }}>↩ 取消封存</button>
              <button onClick={()=>deleteOne(o.id)} style={{ fontSize:12, background:C.redBg, border:"none", borderRadius:8, padding:"6px 14px", cursor:"pointer", color:C.red, fontWeight:600 }}>🗑 刪除</button>
            </div>
          </Card>
        ))
      }
    </div>
  );
}

// ─── ERP 訂單流程頁 ──────────────────────────────────────────────
function AuditLogPage() {
  const ACTION_ICON = {
    "登入成功": "✅", "登入失敗": "❌", "手動登出": "🚪",
    "Session 逾時自動登出": "⏰", "匯出CSV": "📊",
    "登入後台": "🔓", "帳號密碼已更新": "🔐",
  };
  const getIcon = (action) => {
    for (const [key, icon] of Object.entries(ACTION_ICON)) {
      if (action.includes(key)) return icon;
    }
    return "📝";
  };
  const isAlert = (action) => action.includes("失敗") || action.includes("逾時") || action.includes("鎖定");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>🛡️ 操作日誌</div>
        <span style={{ fontSize: 12, color: C.muted, background: C.bgDeep, padding: "4px 12px", borderRadius: 99 }}>最近 {auditLog.length} 筆</span>
      </div>

      <div style={{ background: C.yellowBg, border: `1.5px solid ${C.yellow}30`, borderRadius: 12, padding: "11px 14px", fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
        ⚠️ 日誌僅保存於本次 Session，登出後清除。正式部署請串接後端 logging 系統。
      </div>

      {auditLog.length === 0 && (
        <div style={{ textAlign: "center", padding: 32, color: C.muted }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
          還沒有操作記錄
        </div>
      )}

      {auditLog.map(log => (
        <div key={log.id} style={{
          background: isAlert(log.action) ? C.redBg : C.surface,
          border: `1.5px solid ${isAlert(log.action) ? C.red + "40" : C.border}`,
          borderRadius: 12, padding: "12px 16px",
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <div style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{getIcon(log.action)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: isAlert(log.action) ? C.red : C.text }}>{log.action}</div>
            {log.detail && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{log.detail}</div>}
          </div>
          <div style={{ fontSize: 11, color: C.muted, flexShrink: 0, textAlign: "right" }}>{log.time}</div>
        </div>
      ))}
    </div>
  );
}

function SettingsPage({ credentials, setCredentials, toast, onLogout }) {
  const [account, setAccount] = useState(credentials.account);
  const [oldPw, setOldPw] = useState(""); const [newPw, setNewPw] = useState(""); const [confirmPw, setConfirmPw] = useState("");
  const [showOld, setShowOld] = useState(false); const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0); // 0-4

  // 賣貨便連結 state
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [shopeeLoading, setShopeeLoading] = useState(true);
  const [shopeeSaving, setShopeeSaving] = useState(false);

  // 取消訂單逾期時數
  const [autoCancelHours, setAutoCancelHours] = useState("36");
  const [cancelSaving, setCancelSaving] = useState(false);

  // 載入目前設定
  useEffect(() => {
    Promise.all([
      supabase.from("settings").select("*").eq("key", "shopee_ship_url").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "auto_cancel_hours").maybeSingle(),
    ]).then(([shopee, cancel]) => {
      if (shopee.data?.value) setShopeeUrl(shopee.data.value);
      if (cancel.data?.value) setAutoCancelHours(cancel.data.value);
      setShopeeLoading(false);
    }).catch(() => setShopeeLoading(false));
  }, []);

  const saveAutoCancel = async () => {
    setCancelSaving(true);
    const hours = Math.max(1, Math.min(720, Number(autoCancelHours) || 36));
    try {
      const { error } = await supabase.from("settings").upsert([
        { key: "auto_cancel_hours", value: String(hours), updated_at: new Date().toISOString() }
      ], { onConflict: "key" });
      if (error) throw error;
      logAction("更新逾期取消時數", `${hours} 小時`);
      toast(`已設定 ${hours} 小時後自動取消 ✅`);
    } catch (e) {
      console.error(e);
      toast(`儲存失敗:${e.message || "未知錯誤"}`);
    }
    setCancelSaving(false);
  };

  const saveShopeeUrl = async () => {
    setShopeeSaving(true);
    const url = sanitize(shopeeUrl, 500);
    try {
      const { error } = await supabase.from("settings").upsert([
        { key: "shopee_ship_url", value: url, updated_at: new Date().toISOString() }
      ], { onConflict: "key" });
      if (error) throw error;
      logAction("更新賣貨便連結", url);
      toast("賣貨便連結已儲存 ✅");
    } catch (e) {
      console.error(e);
      toast(`儲存失敗:${e.message || "請檢查 settings 表存在"}`);
    }
    setShopeeSaving(false);
  };

  // Password strength checker
  const checkStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  };

  const STRENGTH_LABEL = ["", "弱", "普通", "強", "非常強"];
  const STRENGTH_COLOR = ["", C.red, C.yellow, C.blue, C.green];

  const save = async () => {
    setError("");
    const cleanAccount = sanitize(account, 50);
    if (!cleanAccount)                     return setError("帳號不可為空或含特殊字元");
    if (cleanAccount.length < 3)           return setError("帳號至少 3 個字元");
    if (newPw.length < 8)                  return setError("新密碼至少 8 個字元");
    if (!/[A-Za-z]/.test(newPw))          return setError("新密碼必須包含英文字母");
    if (!/[0-9]/.test(newPw))             return setError("新密碼必須包含數字");
    if (newPw !== confirmPw)               return setError("新密碼與確認密碼不一致");
    if (newPw === oldPw)                   return setError("新密碼不可與目前密碼相同");

    // [FIX] Hash-based comparison — never compare plaintext passwords
    const [oldHash, storedHash] = await Promise.all([
      hashPassword(oldPw),
      hashPassword(credentials.password),
    ]);
    if (oldHash !== storedHash) return setError("目前密碼錯誤");

    logAction("帳號密碼已更新", `帳號變更為：${cleanAccount}`);
    setCredentials({ account: cleanAccount, password: newPw });
    setOldPw(""); setNewPw(""); setConfirmPw(""); setStrength(0);
    toast("帳號密碼已更新，請重新登入 🔐");
    setTimeout(onLogout, 1500);
  };

  const PwRow = ({ label, value, onChange, show, toggle, onChangeExtra }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input type={show ? "text" : "password"} value={value}
          onChange={e => { onChange(e.target.value); if (onChangeExtra) onChangeExtra(e.target.value); setError(""); }}
          maxLength={128}
          style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 40px 9px 13px", color: C.text, fontSize: 14 }}
          onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`; }}
          onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
        <button onClick={toggle} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, fontSize: 15, cursor: "pointer" }}>{show ? "🙈" : "👁"}</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* 賣貨便連結設定 */}
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📦 出貨設定</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
          這個連結會出現在客人「出貨頁」的「下一步至賣貨便結單」按鈕,客人點下去會開啟此網址。
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>賣貨便商店連結</label>
            <input value={shopeeUrl} onChange={e => setShopeeUrl(e.target.value)}
              placeholder="https://shopee.tw/m/你的賣貨便網址" disabled={shopeeLoading}
              style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing: "border-box" }} />
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>留空則客人看不到結單按鈕</div>
          </div>
          <Btn onClick={saveShopeeUrl} disabled={shopeeSaving||shopeeLoading}>
            {shopeeSaving ? "儲存中..." : shopeeLoading ? "載入中..." : "儲存連結"}
          </Btn>
        </div>
      </Card>

      {/* 訂單自動取消設定 */}
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark, marginTop: 4 }}>⏰ 訂單自動取消</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
          設定客人下單後,若未在此時間內完成匯款通知,訂單將自動取消。
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>逾期取消時數</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="number" inputMode="numeric" min="1" max="720"
                value={autoCancelHours} onChange={e => setAutoCancelHours(e.target.value)}
                disabled={shopeeLoading}
                style={{ flex: 1, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing: "border-box" }} />
              <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>小時</span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>建議 24-72 小時,最短 1 小時,最長 30 天 (720 小時)</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[12, 24, 36, 48, 72].map(h => (
              <button key={h} onClick={() => setAutoCancelHours(String(h))}
                style={{ padding: "5px 12px", borderRadius: 99, border: `1px solid ${autoCancelHours===String(h)?C.accent:C.border}`, background: autoCancelHours===String(h)?C.accent:"transparent", color: autoCancelHours===String(h)?"#fff":C.textMid, fontSize: 12, cursor: "pointer" }}>
                {h}h
              </button>
            ))}
          </div>
          <Btn onClick={saveAutoCancel} disabled={cancelSaving||shopeeLoading}>
            {cancelSaving ? "儲存中..." : "儲存時數"}
          </Btn>
        </div>
      </Card>

      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark, marginTop: 4 }}>🔐 帳號密碼設定</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, padding: "10px 14px", background: C.yellowBg, borderRadius: 10, borderLeft: `3px solid ${C.yellow}` }}>⚠️ 修改後將自動登出，需重新輸入新密碼</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="帳號（至少 3 字元）" value={account} onChange={v => { setAccount(sanitize(v)); setError(""); }} placeholder="輸入新帳號" />
          <PwRow label="目前密碼" value={oldPw} onChange={setOldPw} show={showOld} toggle={() => setShowOld(p => !p)} />
          <div>
            <PwRow label="新密碼（至少 8 字元，含英文+數字）" value={newPw} onChange={setNewPw} show={showNew} toggle={() => setShowNew(p => !p)}
              onChangeExtra={v => setStrength(checkStrength(v))} />
            {newPw && (
              <div style={{ marginTop: 8, display: "flex", gap: 4, alignItems: "center" }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= strength ? STRENGTH_COLOR[strength] : C.faint, transition: "background .2s" }} />
                ))}
                <span style={{ fontSize: 11, color: STRENGTH_COLOR[strength], fontWeight: 700, marginLeft: 6 }}>{STRENGTH_LABEL[strength]}</span>
              </div>
            )}
          </div>
          <PwRow label="確認新密碼" value={confirmPw} onChange={setConfirmPw} show={showNew} toggle={() => setShowNew(p => !p)} />
          {error && <div style={{ background: C.redBg, border: `1.5px solid ${C.red}30`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.red, fontWeight: 600 }}>⚠️ {error}</div>}
          <Btn onClick={save} disabled={strength < 2 && newPw.length > 0}>儲存設定</Btn>
          {strength < 2 && newPw.length > 0 && <div style={{ fontSize: 12, color: C.muted, textAlign: "center" }}>密碼強度不足，請加長或增加複雜度</div>}
        </div>
      </Card>
      <Card style={{ background: C.bgDeep }}>
        <div style={{ fontWeight: 700, marginBottom: 10, color: C.accentDark }}>目前帳號資訊</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>帳號</span><span style={{ fontWeight: 600 }}>{credentials.account}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>密碼</span><span style={{ fontWeight: 600, letterSpacing: 3 }}>{"●".repeat(Math.min(credentials.password.length, 12))}</span></div>
        </div>
      </Card>
      {/* Security tips */}
      <Card style={{ background: C.blueBg, border: `1.5px solid ${C.blue}30` }}>
        <div style={{ fontWeight: 700, marginBottom: 10, color: C.blue }}>🛡️ 密碼安全建議</div>
        <div style={{ fontSize: 12, color: C.textMid, lineHeight: 2 }}>
          ✅ 至少 12 個字元<br/>
          ✅ 混合大小寫英文<br/>
          ✅ 包含數字和特殊符號（如 !@#$）<br/>
          ❌ 避免使用生日、電話、常用詞
        </div>
      </Card>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function AdminRoot() {
  injectStyles();
  const [data, setData] = useState(() => {
    let savedRate = INIT_DATA.rate;
    try {
      const v = localStorage.getItem("exchange_rate_jpy");
      if (v && !isNaN(Number(v))) savedRate = Number(v);
    } catch(e) {}
    return { ...INIT_DATA, rate: savedRate };
  });
  const [credentials, setCredentials] = useState({ account: "admin", password: "1234" });
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginPage credentials={credentials} onSuccess={() => setLoggedIn(true)} />;
  return <AdminDashboard data={data} setData={setData} credentials={credentials} setCredentials={setCredentials} onLogout={() => setLoggedIn(false)} />;
}

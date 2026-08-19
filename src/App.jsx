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

// 客人端 LIFF URL(全域)
const CUSTOMER_LIFF_URL = "https://liff.line.me/2009872512-JJAaJ7Bi";

// INIT_DATA:僅供離線 fallback 用,實際資料由 Supabase 提供
const INIT_DATA = {
  rate: 0.26,
  customers: [],
  products: [],
  inStock: [],
  orders: [],
  wishlist: [],
  announcements: [],
  members: [],
  purchases: [],
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

// ─── 圖片壓縮 + 上傳到 Supabase Storage ─────────────────
// 傳 File 進來,回傳 public URL(不再存 base64,大幅省 Egress)
const compressAndUploadImage = async (file, maxDim = 800) => {
  if (!file) throw new Error("no file");
  if (file.size > 5 * 1024 * 1024) throw new Error("圖片太大,請小於 5MB");

  // Step 1: 壓縮
  const compressedBlob = await new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = ev => { img.src = ev.target.result; };
    reader.onerror = () => reject(new Error("讀檔失敗"));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = maxDim / Math.max(width, height);
        width *= ratio; height *= ratio;
      }
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("壓縮失敗")), "image/jpeg", 0.82);
    };
    img.onerror = () => reject(new Error("圖檔損壞"));
    reader.readAsDataURL(file);
  });

  // Step 2: 上傳到 Supabase Storage
  const fileName = `${Date.now()}_${secureUid()}.jpg`;
  const { error: upErr } = await supabase.storage
    .from("product-images")
    .upload(fileName, compressedBlob, {
      contentType: "image/jpeg",
      upsert: false,
    });
  if (upErr) throw new Error(`上傳失敗:${upErr.message}`);

  // Step 3: 取得 public URL
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
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
    "訂單號","訂單日期","社群名稱","批發客","批發編號","商品","規格","數量","成本","售價","利潤",
    "取貨方式","門市名稱","門市代碼","收件電話",
    "國際運費","收款日期","出貨日期","付款方式","匯款銀行","後五碼","訂金金額","是否已收款","狀態"
  ];
  const deliveryLabel = m => m === "shopee" ? "賣貨便" : m === "meetup" ? "面交" : m === "delivery" ? "宅配" : (m || "");
  // 每個品項分一行
  const rows = [];
  orders.forEach(o => {
    const name = o.community_name || o.customer_name || o.customerName || "";
    const date = o.created_at ? new Date(o.created_at).toLocaleDateString("zh-TW") : (o.createdAt || "");
    const items = o.items || [];
    const isW = o.is_wholesale ? "💎批發" : "";
    const wNo = o.wholesale_no || "";
    if (items.length === 0) {
      rows.push(["#"+sanitize(o.no), date, sanitize(name), isW, wNo, "", "", 0, 0, o.total||0, o.profit||0, deliveryLabel(o.delivery_method), o.store_name||"", o.store_code||"", o.recipient_phone||"", "", o.payment_date||"", o.ship_date||"", o.payment_method||"", o.deposit_bank||"", o.deposit_last5||o.bank_code||"", o.deposit_amount||"", o.paid?"是":"否", ORDER_STATUS[o.status]?.label||o.status]);
    } else {
      items.forEach((it, idx) => {
        rows.push([
          idx === 0 ? "#"+sanitize(o.no) : "",
          idx === 0 ? date : "",
          idx === 0 ? sanitize(name) : "",
          idx === 0 ? isW : "",
          idx === 0 ? wNo : "",
          sanitize((it.name||"").split(" / ")[0] || ""),
          sanitize((it.name||"").split(" / ").slice(1).join(" / ") || it.spec || it.note || ""),
          it.qty || 1,
          (it.cost || 0) * (it.qty || 1),
          (it.price || 0) * (it.qty || 1),
          ((it.price || 0) - (it.cost || 0)) * (it.qty || 1),
          idx === 0 ? deliveryLabel(o.delivery_method) : "",
          idx === 0 ? (o.store_name || "") : "",
          idx === 0 ? (o.store_code || "") : "",
          idx === 0 ? (o.recipient_phone || "") : "",
          idx === 0 ? (o.shipping_fee || "") : "",
          idx === 0 ? (o.payment_date || "") : "",
          idx === 0 ? (o.ship_date || "") : "",
          idx === 0 ? (o.payment_method === "transfer" ? "匯款" : o.payment_method === "cod" ? "貨到付款" : "") : "",
          idx === 0 ? (o.deposit_bank || "") : "",
          idx === 0 ? (o.deposit_last5 || o.bank_code || "") : "",
          idx === 0 ? (o.deposit_amount || "") : "",
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
      supabase.from("purchases").select("*").order("purchased_at", { ascending: false }),
    ]).then(([o, p, s, a, w, m, pu]) => {
      if (o.error) console.error("orders 載入失敗:", o.error);
      if (p.error) console.error("products 載入失敗:", p.error);
      if (s.error) console.error("in_stock 載入失敗:", s.error);
      if (a.error) console.error("announcements 載入失敗:", a.error);
      if (w.error) console.error("wishlist 載入失敗:", w.error);
      if (m.error) {
        console.error("members 載入失敗:", m.error);
        showToast(`⚠️ 客人資料載入失敗:${m.error.message || "權限不足"}`);
      }
      if (pu.error) console.warn("purchases 載入失敗:", pu.error);   // 靜默(可能表還沒建)
      setData(d => ({
        ...d,
        orders:        o.data || [],
        products:      p.data || [],
        inStock:       s.data || [],
        announcements: a.data || [],
        wishlist:      w.data || [],
        members:       m.data || [],
        purchases:     pu.data || [],
      }));
      console.log(`📊 已載入: 訂單 ${(o.data||[]).length}, 商品 ${(p.data||[]).length}, 現貨 ${(s.data||[]).length}, 會員 ${(m.data||[]).length}, 許願 ${(w.data||[]).length}, 進項 ${(pu.data||[]).length}`);
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
      // ── 進項 purchases 即時同步 ────
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "purchases" }, payload => {
        setData(d => (d.purchases || []).find(p => p.id === payload.new.id)
          ? d
          : ({ ...d, purchases: [payload.new, ...(d.purchases || [])] }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "purchases" }, payload => {
        setData(d => ({ ...d, purchases: (d.purchases || []).map(p => p.id === payload.new.id ? payload.new : p) }));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "purchases" }, payload => {
        setData(d => ({ ...d, purchases: (d.purchases || []).filter(p => p.id !== payload.old.id) }));
      })
      .subscribe((status) => {
        console.log("📡 Realtime status:", status);
        if (status === "SUBSCRIBED") {
          console.log("✅ Realtime 訂閱成功,將即時收到新訂單/客人/商品變更");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("❌ Realtime 訂閱失敗,將仰賴 30 秒輪詢備援");
        }
      });

    // 心跳輪詢備援:每 90 秒重拉一次,防止 Realtime 漏接(降低頻率省 Egress)
    const heartbeat = setInterval(() => {
      reloadData();
    }, 90000);

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

  const activeOrders = data.orders.filter(o => !o.archived);
  const totalOrders = activeOrders.length;
  const pendingBuy  = activeOrders.filter(o => o.status === "pending").length;
  const bought      = activeOrders.filter(o => o.status === "bought").length;
  const profit      = activeOrders.filter(o => o.status !== "cancelled").reduce((s, o) => s + (o.profit||0), 0);

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
    { id: "purchases", label: "進項紀錄",   icon: "receipt" },
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
        {tab === "purchases"     && <PurchasesPage     data={data} setData={setData} toast={showToast} />}
        {tab === "revenue"       && <RevenuePage       data={data} />}
        {tab === "wishlist"      && <WishlistPage      data={data} setData={setData} toast={showToast} />}
        {tab === "customers"     && <CustomersPage     data={data} setData={setData} toast={showToast} sendLineNotify={sendLineNotify} />}
        {tab === "settings"      && <SettingsPage      credentials={credentials} setCredentials={setCredentials} toast={showToast} onLogout={onLogout} data={data} setData={setData} />}
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
      // 用 stocked_qty(舊資料 stocked=true 視為全配完)
      const stockedItems = (o.items || []).filter(it => {
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        return sq > 0;
      });
      const returnCount = stockedItems.reduce((s, it) => {
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        return s + sq;
      }, 0);

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

      // 已配貨的貨還回 stock(用 stocked_qty)
      const groupByName = new Map();
      for (const it of stockedItems) {
        const parts = String(it.name).split(" / ");
        const productName = parts[0] || it.name;
        const variantName = parts.slice(1).join(" / ");
        const displayName = variantName ? `${productName} / ${variantName}` : productName;
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        groupByName.set(displayName, (groupByName.get(displayName) || 0) + sq);
      }
      for (const [displayName, qty] of groupByName.entries()) {
        try {
          const { data: existing } = await supabase.from("in_stock").select("*").eq("name", displayName).maybeSingle();
          if (existing) {
            const newStock = (Number(existing.stock) || 0) + qty;
            await supabase.from("in_stock").update({ stock: newStock, updated_at: now }).eq("id", existing.id);
          }
        } catch (e) { console.warn("庫存還原失敗:", e); }
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

    // 特殊處理:任何狀態 → 已取消,且原本已配過貨(未寄出)= 把已配的貨還回庫存
    if (safeS === "cancelled" && o.status !== "shipped" && o.status !== "cancelled") {
      const stockedItems = (o.items || []).filter(it => {
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        return sq > 0;
      });
      const returnCount = stockedItems.reduce((s, it) => {
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        return s + sq;
      }, 0);

      // 現貨商品(products 表)已扣的庫存,取消時也要還回去
      const instockItems = (o.items || []).filter(it => it.supply_type === "instock" && it.product_id && (it.variant_ids || []).length);
      const instockReturnCount = instockItems.reduce((s, it) => s + (Number(it.qty) || 1), 0);

      if (returnCount > 0 || instockReturnCount > 0) {
        const totalReturn = returnCount + instockReturnCount;
        if (!window.confirm(`此訂單有已配貨/現貨扣庫存的品項(共 ${totalReturn} 件),取消後將把這些貨還回庫存。\n\n確定取消?`)) return;

        const now = new Date().toISOString();

        // 1) 預購配貨部分(in_stock 表)
        const groupByName = new Map();
        for (const it of stockedItems) {
          const parts = String(it.name).split(" / ");
          const productName = parts[0] || it.name;
          const variantName = parts.slice(1).join(" / ");
          const displayName = variantName ? `${productName} / ${variantName}` : productName;
          const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
          groupByName.set(displayName, (groupByName.get(displayName) || 0) + sq);
        }
        for (const [displayName, qty] of groupByName.entries()) {
          try {
            const { data: existing } = await supabase.from("in_stock").select("*").eq("name", displayName).maybeSingle();
            if (existing) {
              const newStock = (Number(existing.stock) || 0) + qty;
              await supabase.from("in_stock").update({ stock: newStock, updated_at: now }).eq("id", existing.id);
            }
          } catch (e) { console.warn("取消訂單還原庫存失敗:", e); }
        }

        // 2) 現貨部分(products 表 variants[].stock)
        for (const it of instockItems) {
          try {
            const { data: prod } = await supabase.from("products").select("id, variants").eq("id", it.product_id).maybeSingle();
            if (!prod) continue;
            const newVariants = (prod.variants || []).map(v =>
              (it.variant_ids || []).includes(v.id) ? { ...v, stock: (Number(v.stock) || 0) + (Number(it.qty) || 1) } : v
            );
            await supabase.from("products").update({ variants: newVariants }).eq("id", it.product_id);
          } catch (e) { console.warn("取消訂單還原現貨庫存失敗:", e); }
        }

        const { error } = await supabase.from("orders").update({ status: safeS, updated_at: now }).eq("id", id);
        if (error) { toast(`更新失敗:${error.message}`); return; }

        const [inStockRes, productsRes] = await Promise.all([
          supabase.from("in_stock").select("*").order("created_at", { ascending: false }),
          supabase.from("products").select("*").order("created_at", { ascending: false }),
        ]);
        setData(d => ({
          ...d,
          orders: d.orders.map(x => x.id === id ? { ...x, status: safeS } : x),
          inStock: inStockRes.data || d.inStock,
          products: productsRes.data || d.products,
        }));
        logAction("取消訂單並還原庫存", `#${o.no} · 還回庫存 ${totalReturn} 件`);
        toast(`✅ 已取消 · ${totalReturn} 件還回庫存`);
        return;
      }
      // 沒有已配貨/現貨扣庫存的品項,走一般流程即可(不用特別處理庫存)
    }

    // 一般狀態更新
    const { error } = await supabase.from("orders").update({ status: safeS, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast("更新失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.map(o => o.id === id ? { ...o, status: safeS } : o) }));
    logAction("更新訂單狀態", `#${o?.no} → ${ORDER_STATUS[safeS]?.label}`);
    toast("狀態已更新");
  };
  const del = async (id) => {
    const o = data.orders.find(x => x.id === id);
    if (!o) return;

    // 檢查是否有已配貨的品項,若有需先還庫存
    const stockedItems = (o.items || []).filter(it => {
      const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
      return sq > 0;
    });
    const returnCount = stockedItems.reduce((s, it) => {
      const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
      return s + sq;
    }, 0);

    let confirmMsg = `確定刪除訂單 #${o.no}?`;
    if (returnCount > 0 && o.status !== "shipped") {
      confirmMsg = `⚠️ 訂單 #${o.no} 有 ${returnCount} 件已配貨的貨(未寄出)\n\n刪除訂單前將:\n· 已配貨的貨還回庫存 (庫存 +${returnCount})\n· 永久刪除訂單\n\n確定?`;
    }
    if (!window.confirm(confirmMsg)) return;

    // 若有已配貨的品項(且尚未寄出)→ 還回庫存
    const now = new Date().toISOString();
    if (returnCount > 0 && o.status !== "shipped") {
      const groupByName = new Map();
      for (const it of stockedItems) {
        const parts = String(it.name).split(" / ");
        const productName = parts[0] || it.name;
        const variantName = parts.slice(1).join(" / ");
        const displayName = variantName ? `${productName} / ${variantName}` : productName;
        const sq = Number(it.stocked_qty) || (it.stocked ? (Number(it.qty) || 1) : 0);
        groupByName.set(displayName, (groupByName.get(displayName) || 0) + sq);
      }
      for (const [displayName, qty] of groupByName.entries()) {
        try {
          const { data: existing } = await supabase.from("in_stock").select("*").eq("name", displayName).maybeSingle();
          if (existing) {
            const newStock = (Number(existing.stock) || 0) + qty;
            await supabase.from("in_stock").update({ stock: newStock, updated_at: now }).eq("id", existing.id);
          }
        } catch (e) { console.warn("刪除時還原庫存失敗:", e); }
      }
      const inStockRes = await supabase.from("in_stock").select("*").order("created_at", { ascending: false });
      setData(d => ({ ...d, inStock: inStockRes.data || d.inStock }));
    }

    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) { toast("刪除失敗"); return; }
    setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== id) }));
    logAction("刪除訂單", `#${o.no}${returnCount > 0 ? ` · 還回庫存 ${returnCount} 件` : ""}`);
    toast(`✅ 已刪除${returnCount > 0 && o.status !== "shipped" ? ` · 還回 ${returnCount} 件` : ""}`);
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
// ─── 請款單(單筆訂單 / 客人多筆訂單合併結算)────────────────
function BillingStatementModal({ mode, order, customerName, customerOrders, onClose }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchLabel, setBatchLabel] = useState(""); // 團名/批次名稱(選填,例如:韓國親飛)
  const [extraFee, setExtraFee] = useState(""); // 附加費(例如賣貨便手續費),每次請款單各自填
  const [shopName, setShopName] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("settings").select("*").eq("key", "billing_shop_name").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "billing_bank_info").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "billing_note").maybeSingle(),
    ]).then(([shopNameRes, bankRes, noteRes]) => {
      if (shopNameRes.data?.value) setShopName(shopNameRes.data.value);
      if (bankRes.data?.value) setBankInfo(bankRes.data.value);
      if (noteRes.data?.value) setNoteText(noteRes.data.value);
    }).catch(() => {});
  }, []);

  const ordersToShow = mode === "single" ? [order] : (customerOrders || []).filter(o => {
    if (!o.created_at) return true;
    const t = new Date(o.created_at).getTime();
    if (startDate && t < new Date(startDate).getTime()) return false;
    if (endDate && t > new Date(endDate + "T23:59:59").getTime()) return false;
    return true;
  });

  const calcOrder = (o) => {
    const deposit = Number(o.deposit) || Number(o.deposit_amount) || 0;
    const shippingFee = Number(o.shipping_fee) || 0;
    const total = Number(o.total) || 0;
    const finalPayment = Math.max(0, total + shippingFee - deposit);
    const paid = (o.deposit_paid ? deposit : 0) + (o.final_paid ? finalPayment : 0);
    const grand = total + shippingFee;
    const unpaid = Math.max(0, grand - paid);
    return { total, shippingFee, grand, paid, unpaid };
  };

  // 收款核對用的彙總數字(商品總額 / 已購買 / 未購買 / 運費 / 已匯款)
  let itemsTotal = 0, purchasedAmt = 0, shippingFeeSum = 0, paidAmt = 0;
  ordersToShow.forEach(o => {
    (o.items || []).forEach(it => {
      const amt = (Number(it.price) || 0) * (Number(it.qty) || 1);
      itemsTotal += amt;
      if (it.purchased) purchasedAmt += amt;
    });
    const c = calcOrder(o);
    shippingFeeSum += c.shippingFee;
    paidAmt += c.paid;
  });
  const unpurchasedAmt = Math.max(0, itemsTotal - purchasedAmt);
  const extraFeeNum = Number(extraFee) || 0;
  const billTotal = itemsTotal + shippingFeeSum + extraFeeNum;
  const unpaid = Math.max(0, billTotal - paidAmt);

  const displayName = mode === "single" ? (order?.customer_name || "") : customerName;
  const periodText = mode === "single"
    ? (order?.created_at ? new Date(order.created_at).toLocaleDateString("zh-TW") : "")
    : `${startDate || "最早"} ~ ${endDate || "至今"}`;
  const codeLabel = mode === "single" ? `#${order?.no || ""}` : "";

  const Row = ({ label, value, bold, color }) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 400, color: color || C.text, padding: "6px 0" }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(58,46,36,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #billing-print-area, #billing-print-area * { visibility: visible; }
          #billing-print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div style={{ background: "#fff", borderRadius: 16, maxWidth: 480, width: "100%", maxHeight: "92vh", overflow: "auto", boxShadow: C.shadowLg }}>
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.accentDark }}>📄 請款單</div>
          <button onClick={onClose} style={{ background: C.bgDeep, border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16, color: C.muted }}>×</button>
        </div>

        {/* 開單前的填寫欄位(不會印出) */}
        <div className="no-print" style={{ padding: "14px 20px", background: C.bgDeep, display: "flex", flexDirection: "column", gap: 10 }}>
          {mode === "batch" && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>起</div>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  style={{ padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }}/>
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>迄</div>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  style={{ padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }}/>
              </div>
              <div style={{ fontSize: 11, color: C.faint, alignSelf: "center" }}>留空 = 全部訂單</div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>團名 / 批次名稱(選填)</div>
              <input value={batchLabel} onChange={e => setBatchLabel(e.target.value)} placeholder="例如:韓國親飛"
                style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, boxSizing: "border-box" }}/>
            </div>
            <div style={{ width: 120 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>附加費</div>
              <input type="number" inputMode="numeric" value={extraFee} onChange={e => setExtraFee(e.target.value)} placeholder="0"
                style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, boxSizing: "border-box" }}/>
            </div>
          </div>
        </div>

        <div id="billing-print-area">
          {/* 深色標題區 */}
          <div style={{ background: C.accentDark, color: "#fff", padding: "22px 22px 18px" }}>
            <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{shopName ? `${shopName} ` : ""}請款單</div>
            <div style={{ fontSize: 12, opacity: .85, lineHeight: 1.7 }}>
              {batchLabel ? `${batchLabel} | ` : ""}{periodText}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>
              {codeLabel ? `[${codeLabel}] ` : ""}{displayName}
            </div>
          </div>

          <div style={{ padding: "20px 22px" }}>
            {/* 每筆訂單明細 */}
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>── 訂單明細 ──</div>
            {ordersToShow.map(o => {
              const c = calcOrder(o);
              return (
                <div key={o.id} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: `1px dashed ${C.borderLight}` }}>
                  {mode === "batch" && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 6 }}>
                      <span>#{o.no} · {o.created_at ? new Date(o.created_at).toLocaleDateString("zh-TW") : ""}</span>
                      <span>{ORDER_STATUS[o.status]?.label || o.status}</span>
                    </div>
                  )}
                  {(o.items || []).map((it, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "3px 0" }}>
                      <span>{it.name} × {it.qty}</span>
                      <span>{fmtMoney((it.price || 0) * (it.qty || 1))}</span>
                    </div>
                  ))}
                  {c.shippingFee > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, padding: "3px 0" }}>
                      <span>運費</span><span>{fmtMoney(c.shippingFee)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                    <span>小計</span><span>{fmtMoney(c.grand)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.green, marginTop: 2 }}>
                    <span>已付</span><span>{fmtMoney(c.paid)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.unpaid > 0 ? C.red : C.green }}>
                    <span>未付</span><span>{fmtMoney(c.unpaid)}</span>
                  </div>
                </div>
              );
            })}
            {ordersToShow.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0", color: C.muted, fontSize: 13 }}>此區間沒有符合的訂單</div>
            )}

            {/* 收款核對 */}
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "18px 0 8px" }}>收款核對</div>
            <Row label="商品總額" value={fmtMoney(itemsTotal)} />
            <Row label="未購買金額" value={fmtMoney(unpurchasedAmt)} />
            <Row label="已購買金額" value={fmtMoney(purchasedAmt)} />
            <div style={{ borderTop: `1px solid ${C.borderLight}`, margin: "8px 0" }} />
            <Row label="國際運費" value={fmtMoney(shippingFeeSum)} />
            <Row label="附加費" value={fmtMoney(extraFeeNum)} />

            <div style={{ background: C.bgDeep, borderRadius: 10, padding: "12px 14px", margin: "12px 0" }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>帳單總額</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.text, textAlign: "right" }}>{fmtMoney(billTotal)}</div>
            </div>

            <Row label="累計已匯款" value={fmtMoney(paidAmt)} />

            <div style={{ background: unpaid > 0 ? C.redBg : C.greenBg, borderRadius: 10, padding: "12px 14px", margin: "10px 0" }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>尚未匯款</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: unpaid > 0 ? C.red : C.green, textAlign: "right" }}>{fmtMoney(unpaid)}</div>
            </div>

            {bankInfo && (
              <div style={{ fontSize: 13, color: C.textMid, marginTop: 14, lineHeight: 1.7 }}>
                匯款帳號:{bankInfo}
              </div>
            )}
            {noteText && (
              <div style={{ fontSize: 12, color: C.muted, marginTop: 10, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {noteText}
              </div>
            )}
          </div>
        </div>

        <div className="no-print" style={{ display: "flex", gap: 10, padding: "14px 20px", borderTop: `1px solid ${C.border}` }}>
          <Btn variant="ghost" onClick={onClose} style={{ flex: 1 }}>關閉</Btn>
          <Btn onClick={() => window.print()} style={{ flex: 2 }}>🖨 列印 / 存成 PDF</Btn>
        </div>
      </div>
    </div>
  );
}

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
  const [showBilling, setShowBilling] = useState(false);

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
              {(o.is_wholesale || memberInfo?.is_wholesale) && (
                <span style={{ fontSize:9, padding:"1px 6px", background:C.pinkDark, color:"#fff", borderRadius:4, fontWeight:600 }}>💎 批發</span>
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

          {/* 寄件資訊(客人結帳時填的) */}
          {(o.delivery_method || o.recipient_phone || o.store_name) && (
            <div style={{ padding:"12px 14px", background:C.accentBg, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.muted, fontWeight:600, letterSpacing:.5, marginBottom:6 }}>📦 寄件資訊</div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:12, marginBottom: o.store_name ? 6 : 0 }}>
                {o.delivery_method && (
                  <div>
                    <span style={{ color:C.muted, marginRight:4 }}>取貨:</span>
                    <span style={{ color:C.text, fontWeight:500 }}>
                      {o.delivery_method === "shopee" ? "賣貨便" :
                       o.delivery_method === "meetup" ? "面交" :
                       o.delivery_method === "delivery" ? "宅配" : o.delivery_method}
                    </span>
                  </div>
                )}
                {o.recipient_phone && (
                  <div>
                    <span style={{ color:C.muted, marginRight:4 }}>電話:</span>
                    <span style={{ color:C.text, fontWeight:500 }}>{o.recipient_phone}</span>
                  </div>
                )}
              </div>
              {o.store_name && (
                <div style={{ fontSize:12, background:"#fff", padding:"6px 10px", borderRadius:6, border:`1px solid ${C.borderLight}` }}>
                  <div style={{ fontWeight:600, color:C.accentDark }}>
                    🏪 {o.store_name}
                    {o.store_code && <span style={{ fontSize:10, color:C.muted, marginLeft:6, fontWeight:400 }}>#{o.store_code}</span>}
                  </div>
                  {o.store_address && (
                    <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{o.store_address}</div>
                  )}
                </div>
              )}
            </div>
          )}

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
              <button onClick={()=>setShowBilling(true)} style={{ background:C.accentBg,border:`1px solid ${C.accent}40`,color:C.accentDark,padding:"0 10px",height:30,borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:600 }}>📄 請款單</button>
              <button onClick={()=>del(o.id)} style={{ background:C.redBg,border:"none",color:C.red,width:30,height:30,borderRadius:8,fontSize:15,cursor:"pointer" }}>🗑</button>
            </div>
          </div>
        </div>
      )}
      {showBilling && <BillingStatementModal mode="single" order={o} onClose={()=>setShowBilling(false)} />}
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

  // tempCustomers state (要在 allCustomers 之前宣告,不然 TDZ)
  const [tempCustomers, setTempCustomers] = useState([]);

  const allCustomers = [...memberList, ...orderCustomers, ...tempCustomers];

  const [customerId, setCustomerId] = useState(allCustomers[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [items, setItems] = useState([
    { id: secureUid(), name: "", cost: "", price: "", qty: "1", spec: "", variant: "", image: "" }
  ]);

  // 圖片壓縮+轉 base64
  const handleImagePick = async (itId, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("圖片不能超過 2MB"); return; }
    try {
      const url = await compressAndUploadImage(file, 600);
      updateItem(itId, "image", url);
    } catch (err) {
      alert(err.message || "圖片上傳失敗");
    }
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
    const newTemp = { id: tempId, name: n, communityName: "", phone: "", isMember: false, source: "臨時客人" };
    setTempCustomers(prev => [...prev, newTemp]);
    setCustomerId(tempId);
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
                      style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "9px 14px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                      <Icon name="plus" size={14} /> 新增臨時客人
                    </button>
                  </div>
                  <div style={{ maxHeight: 240, overflowY: "auto", border: `0.5px solid ${C.border}`, borderRadius: 10, background: C.bgCard }}>
                    {filteredCustomers.length === 0 && (
                      <div style={{ padding: "24px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>
                          {searchTerm ? `找不到「${searchTerm}」` : "尚無客人"}
                        </div>
                        <button onClick={() => {
                          setShowNewCustomer(true);
                          if (searchTerm) setNewCustomerName(searchTerm);
                        }}
                          style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          + 新增臨時客人{searchTerm ? `「${searchTerm}」` : ""}
                        </button>
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

// ─── 分享商品 Modal(含 QR Code、多種文案) ─────────────────────
function ShareProductModal({ product, onClose, toast }) {
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [messageMode, setMessageMode] = useState("full"); // full / simple / justLink
  const [copied, setCopied] = useState(false);

  const variants = product?.variants || [];
  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  // 生成 URL
  const buildUrl = () => {
    let url = `${CUSTOMER_LIFF_URL}?product=${encodeURIComponent(product.id)}`;
    if (selectedVariantId) url += `&variant=${encodeURIComponent(selectedVariantId)}`;
    return url;
  };

  const url = buildUrl();

  // 商品最低價
  const variantPrices = variants.map(v => Number(v.price) || 0).filter(x => x > 0);
  const minPrice = variantPrices.length ? Math.min(...variantPrices) : 0;
  const maxPrice = variantPrices.length ? Math.max(...variantPrices) : 0;
  const priceLabel = selectedVariant
    ? `NT$ ${Number(selectedVariant.price) || 0}`
    : minPrice === maxPrice ? `NT$ ${minPrice}` : `NT$ ${minPrice} ~ ${maxPrice}`;

  // 產生文案
  const buildMessage = () => {
    const name = product.name || "商品";
    const vName = selectedVariant ? ` / ${selectedVariant.name}` : "";
    if (messageMode === "justLink") {
      return url;
    }
    if (messageMode === "simple") {
      return `🛍 ${name}${vName}\n${url}`;
    }
    // full
    let msg = `🛍 ${name}${vName}\n\n💰 ${priceLabel}`;
    if (product.deadline) msg += `\n📅 結單:${product.deadline}`;
    if (product.expected_arrival) msg += `\n🚚 預計到貨:${product.expected_arrival}`;
    msg += `\n\n👇 點連結加入購物車\n${url}`;
    return msg;
  };

  const message = buildMessage();

  // QR Code URL(用免費 API)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(url)}&color=8a6d63&bgcolor=faf2ee&margin=8`;

  // 複製
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast?.("✅ 已複製");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.prompt("請手動複製:", message);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast?.("✅ 網址已複製");
    } catch (e) {
      window.prompt("請手動複製網址:", url);
    }
  };

  // LINE 分享(若在 LIFF/LINE 內)
  const shareToLine = () => {
    const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    window.open(lineShareUrl, "_blank");
  };

  // Native share
  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: message,
          url,
        });
      } else {
        copyMessage();
      }
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    }
  };

  return (
    <Modal title="🔗 分享商品" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* 商品資訊卡 */}
        <div style={{ display: "flex", gap: 10, padding: "10px 12px", background: C.bgDeep, borderRadius: 10 }}>
          {product.image?.startsWith("data:") || product.image?.startsWith("http") ? (
            <img src={product.image} alt={product.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}/>
          ) : (
            <div style={{ width: 60, height: 60, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{product.image || "🛒"}</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>{product.name}</div>
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>{priceLabel}</div>
          </div>
        </div>

        {/* 選擇款式(如有多款) */}
        {variants.length > 0 && (
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>
              📌 指定款式 <span style={{ color: C.faint, fontWeight: 400 }}>(可選,不選則分享全部)</span>
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => setSelectedVariantId("")}
                style={{ padding: "6px 12px", borderRadius: 99, border: `1.5px solid ${selectedVariantId === "" ? C.accent : C.border}`, background: selectedVariantId === "" ? C.accentBg : "#fff", color: selectedVariantId === "" ? C.accent : C.textMid, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                全部款式
              </button>
              {variants.map(v => (
                <button key={v.id} onClick={() => setSelectedVariantId(v.id === selectedVariantId ? "" : v.id)}
                  style={{ padding: "6px 12px", borderRadius: 99, border: `1.5px solid ${selectedVariantId === v.id ? C.accent : C.border}`, background: selectedVariantId === v.id ? C.accentBg : "#fff", color: selectedVariantId === v.id ? C.accent : C.textMid, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 文案模式 */}
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>📝 文案模式</label>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { key: "full", label: "完整" },
              { key: "simple", label: "精簡" },
              { key: "justLink", label: "純網址" },
            ].map(opt => (
              <button key={opt.key} onClick={() => setMessageMode(opt.key)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${messageMode === opt.key ? C.accent : C.border}`, background: messageMode === opt.key ? C.accentBg : "#fff", color: messageMode === opt.key ? C.accent : C.textMid, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 預覽文案 */}
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>👁 預覽</label>
          <textarea readOnly value={message} rows={6}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, background: C.bgDeep, color: C.text, boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}/>
        </div>

        {/* QR Code(可折疊) */}
        <details style={{ background: C.bgDeep, borderRadius: 8, padding: "10px 12px" }}>
          <summary style={{ fontSize: 12, color: C.accent, fontWeight: 600, cursor: "pointer" }}>📱 顯示 QR Code(給實體印刷)</summary>
          <div style={{ marginTop: 10, textAlign: "center", padding: "10px 0" }}>
            <img src={qrUrl} alt="QR Code" style={{ maxWidth: 280, borderRadius: 8, background: "#fff", padding: 8 }}/>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>掃描此 QR 碼開啟商品</div>
            <a href={qrUrl} download={`qr-${product.name}.png`}
              style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: C.accent, textDecoration: "none", padding: "4px 12px", border: `1px solid ${C.accent}`, borderRadius: 99 }}>
              📥 下載 QR 圖檔
            </a>
          </div>
        </details>

        {/* 主要行動按鈕 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button onClick={copyMessage}
            style={{ padding: "12px", background: copied ? C.green : C.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✅ 已複製" : "📋 複製文案"}
          </button>
          <button onClick={shareToLine}
            style={{ padding: "12px", background: "#06C755", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            📤 分享到 LINE
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button onClick={copyUrl}
            style={{ padding: "10px", background: "#fff", color: C.textMid, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            🔗 僅複製網址
          </button>
          <button onClick={nativeShare}
            style={{ padding: "10px", background: "#fff", color: C.textMid, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            📱 系統分享
          </button>
        </div>

        <div style={{ fontSize: 10, color: C.faint, textAlign: "center", padding: "4px 0", lineHeight: 1.6 }}>
          💡 客人點連結會自動打開商品並可加入購物車<br/>
          分享到 LINE 官方群組會顯示連結預覽
        </div>
      </div>
    </Modal>
  );
}

// ─── 快速上架 Modal ─────────────────────────────────────────
// 讓業者拍完照片 + 貼一段文字資料 → 系統自動解析 → 一鍵上架
function QuickAddModal({ onClose, onSave, defaultRate = 0, toast }) {
  const [pasteText, setPasteText] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [jpyPrice, setJpyPrice] = useState("");   // 日幣原價
  const [krwPrice, setKrwPrice] = useState("");   // 韓幣原價
  const [rate, setRate] = useState(String(defaultRate || ""));
  const [rateType, setRateType] = useState("jpy"); // jpy | krw
  const [colors, setColors] = useState("");   // 顏色,逗號分隔
  const [sizes, setSizes] = useState("");     // 尺寸,逗號分隔
  const [deadline, setDeadline] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 貼上文字自動解析
  const parsePasteText = () => {
    if (!pasteText.trim()) { alert("請先貼上文字"); return; }
    const t = pasteText;
    // 解析各欄位(支援全形冒號)
    const grab = (key) => {
      const re = new RegExp(`${key}[::]\\s*([^\\n]+)`, "i");
      const m = t.match(re);
      return m ? m[1].trim() : "";
    };
    const parsed = {
      name: grab("名稱") || grab("品名") || grab("商品"),
      retail: grab("零售價") || grab("售價") || grab("價格"),
      jpy: grab("日幣") || grab("日圓") || grab("¥"),
      krw: grab("韓幣") || grab("韓元") || grab("₩"),
      rate: grab("匯率") || grab("成本匯率"),
      category: grab("分類"),
      colors: grab("顏色") || grab("色系"),
      sizes: grab("尺寸") || grab("大小") || grab("規格"),
      deadline: grab("限時") || grab("收單") || grab("結單") || grab("截止"),
    };
    let count = 0;
    if (parsed.name) { setName(parsed.name); count++; }
    if (parsed.retail) { setRetailPrice(parsed.retail.replace(/[^\d.]/g, "")); count++; }
    if (parsed.jpy) { setJpyPrice(parsed.jpy.replace(/[^\d.]/g, "")); count++; }
    if (parsed.krw) { setKrwPrice(parsed.krw.replace(/[^\d.]/g, "")); count++; }
    if (parsed.rate) { setRate(parsed.rate.replace(/[^\d.]/g, "")); count++; }
    if (parsed.category) { setCategory(parsed.category); count++; }
    if (parsed.colors) { setColors(parsed.colors); count++; }
    if (parsed.sizes) { setSizes(parsed.sizes); count++; }
    if (parsed.deadline) { setDeadline(parsed.deadline); count++; }
    toast?.(count > 0 ? `✅ 已解析 ${count} 個欄位` : "⚠️ 沒解析到任何欄位,請確認格式");
  };

  // 上傳圖片
  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await compressAndUploadImage(file, 800);
      setImage(url);
    } catch (err) {
      alert(err.message || "圖片上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  // 計算成本
  const rateNum = Number(rate) || 0;
  const jpyNum = Number(jpyPrice) || 0;
  const krwNum = Number(krwPrice) || 0;
  const computedCost = rateType === "jpy" ? Math.round(jpyNum * rateNum) : Math.round(krwNum * rateNum);
  const retailNum = Number(retailPrice) || 0;
  const profit = Math.max(0, retailNum - computedCost);

  // 建立款式(顏色 × 尺寸的組合)
  const buildVariants = () => {
    const colorList = colors.split(/[,,、\s]+/).map(s => s.trim()).filter(Boolean);
    const sizeList = sizes.split(/[,,、\s]+/).map(s => s.trim()).filter(Boolean);
    if (colorList.length === 0 && sizeList.length === 0) {
      // 無規格,建一個單一 variant
      return [{
        id: secureUid(),
        name: name || "商品",
        price: retailNum,
        cost: computedCost,
        costJpy: rateType === "jpy" ? jpyNum : 0,
      }];
    }
    if (colorList.length === 0) colorList.push("");
    if (sizeList.length === 0) sizeList.push("");
    const variants = [];
    colorList.forEach(c => {
      sizeList.forEach(s => {
        const vName = [c, s].filter(x => x).join(" / ");
        variants.push({
          id: secureUid(),
          name: vName || "單一款式",
          price: retailNum,
          cost: computedCost,
          costJpy: rateType === "jpy" ? jpyNum : 0,
        });
      });
    });
    return variants;
  };

  const doSave = async () => {
    if (!name.trim()) { alert("請填品名"); return; }
    if (retailNum <= 0) { alert("請填零售價"); return; }
    setSaving(true);
    try {
      const variants = buildVariants();
      const product = {
        id: secureUid(),
        name: name.trim(),
        category: category.trim() || "快速上架",
        image: image || "🛒",
        status: "on",
        variants,
        rate: rateNum,
        deadline: deadline || null,
        payment_type: "full",
      };
      await onSave(product);
      toast?.(`✅ 已上架「${name}」· ${variants.length} 個款式`);
      onClose();
    } catch (e) {
      alert(`上架失敗:${e.message || e}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="⚡ 快速上架" onClose={onClose} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* 貼上文字自動解析區 */}
        <details style={{ background: C.pinkBg, borderRadius: 10, padding: "12px 14px", border: `1.5px dashed ${C.pinkDark}` }}>
          <summary style={{ fontSize: 13, fontWeight: 700, color: C.pinkDark, cursor: "pointer" }}>📋 貼上文字自動填入(可選)</summary>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: C.textMid, marginBottom: 6, lineHeight: 1.6 }}>
              把 LINE 群組的商品文字貼進來,系統會自動填入欄位。
              支援格式:名稱、價格/零售價、日幣、韓幣、匯率、顏色、尺寸、收單/限時、分類
            </div>
            <textarea value={pasteText} onChange={e => setPasteText(e.target.value)} rows={5}
              placeholder={"範例:\n名稱:CUPID 天使愛心擺飾\n零售價:1000\n日幣:2500\n匯率:0.22\n顏色:米色, 白色, 紫色\n尺寸:大, 中, 小\n收單:4/20 17:00"}
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, boxSizing: "border-box", background: "#fff", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}/>
            <button onClick={parsePasteText}
              style={{ marginTop: 8, padding: "8px 16px", background: C.pinkDark, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              🔍 解析並填入
            </button>
          </div>
        </details>

        {/* 商品照 */}
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>📷 商品照</label>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 100, height: 100, background: C.bgDeep, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `1px dashed ${C.border}`, flexShrink: 0 }}>
              {image ? (
                image.startsWith("data:") || image.startsWith("http")
                  ? <img src={image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                  : <span style={{ fontSize: 32 }}>{image}</span>
              ) : (
                <span style={{ fontSize: 32, opacity: 0.4 }}>📷</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "inline-block", padding: "8px 16px", background: C.accent, color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {uploading ? "壓縮中..." : image ? "🔄 更換" : "📤 上傳照片"}
                <input type="file" accept="image/*" onChange={onUpload} style={{ display: "none" }}/>
              </label>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>或輸入 emoji:</div>
              <input type="text" value={image?.startsWith("data:") || image?.startsWith("http") ? "" : image}
                onChange={e => setImage(e.target.value)}
                placeholder="🛒 🎀 💎"
                maxLength={4}
                style={{ marginTop: 4, width: 80, padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 16, boxSizing: "border-box", textAlign: "center" }}/>
            </div>
          </div>
        </div>

        {/* 品名 + 分類 */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>品名 *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="CUPID 天使愛心擺飾"
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>分類</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)}
              placeholder="居家擺飾"
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
          </div>
        </div>

        {/* 價格區 */}
        <div style={{ background: C.bgDeep, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 10 }}>💰 價格資訊</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>零售價 NT$ *</label>
              <input type="number" inputMode="numeric" value={retailPrice} onChange={e => setRetailPrice(e.target.value)}
                placeholder="1000"
                style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>成本 NT$ <span style={{ color: C.faint, fontWeight: 400 }}>(自動)</span></label>
              <div style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#f5efec", color: C.green, fontWeight: 700 }}>
                NT$ {computedCost.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>💴 日幣原價 ¥</label>
              <input type="number" inputMode="numeric" value={jpyPrice} onChange={e => { setJpyPrice(e.target.value); setRateType("jpy"); }}
                placeholder="2500"
                style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${rateType === "jpy" && jpyNum > 0 ? C.accent : C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>💵 韓幣原價 ₩</label>
              <input type="number" inputMode="numeric" value={krwPrice} onChange={e => { setKrwPrice(e.target.value); setRateType("krw"); }}
                placeholder="30000"
                style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${rateType === "krw" && krwNum > 0 ? C.accent : C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>💱 成本匯率 (× {rateType === "jpy" ? "¥1" : "₩1"} = NT$)</label>
            <input type="number" step="0.001" value={rate} onChange={e => setRate(e.target.value)}
              placeholder="0.22"
              style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
          </div>

          {retailNum > 0 && computedCost > 0 && (
            <div style={{ marginTop: 10, padding: "8px 12px", background: profit > 0 ? C.greenBg : C.redBg, borderRadius: 6, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: C.muted }}>預估利潤(單件)</span>
              <span style={{ color: profit > 0 ? C.greenDark : C.red, fontWeight: 700 }}>{profit > 0 ? "+" : ""} NT$ {profit.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* 規格 */}
        <div style={{ background: C.bgDeep, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 8 }}>📐 規格 <span style={{ color: C.faint, fontWeight: 400 }}>(留空=單一款式)</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>顏色 <span style={{ color: C.faint, fontWeight: 400 }}>(逗號分隔)</span></label>
              <input type="text" value={colors} onChange={e => setColors(e.target.value)}
                placeholder="米色, 白色, 紫色"
                style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontWeight: 500, display: "block", marginBottom: 4 }}>尺寸 <span style={{ color: C.faint, fontWeight: 400 }}>(逗號分隔)</span></label>
              <input type="text" value={sizes} onChange={e => setSizes(e.target.value)}
                placeholder="大, 中, 小"
                style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff" }}/>
            </div>
          </div>
          {(() => {
            const colorList = colors.split(/[,,、\s]+/).map(s => s.trim()).filter(Boolean);
            const sizeList = sizes.split(/[,,、\s]+/).map(s => s.trim()).filter(Boolean);
            const total = Math.max(1, colorList.length || 1) * Math.max(1, sizeList.length || 1);
            if (total > 1) return (
              <div style={{ marginTop: 8, fontSize: 11, color: C.muted, padding: "6px 10px", background: "#fff", borderRadius: 6 }}>
                💡 將建立 <strong style={{ color: C.accent }}>{total}</strong> 個款式組合
              </div>
            );
            return null;
          })()}
        </div>

        {/* 收單時間 */}
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>⏰ 收單時間 <span style={{ color: C.faint, fontWeight: 400 }}>(可選,例:4/20 17:00)</span></label>
          <input type="text" value={deadline} onChange={e => setDeadline(e.target.value)}
            placeholder="4/20 17:00 或 2026-04-20"
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
        </div>

        {/* 動作按鈕 */}
        <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
          <Btn variant="ghost" onClick={onClose} style={{ flex: 1 }}>取消</Btn>
          <button onClick={doSave} disabled={saving || !name.trim() || retailNum <= 0}
            style={{ flex: 2, padding: "12px 20px", background: (saving || !name.trim() || retailNum <= 0) ? C.faint : `linear-gradient(135deg, ${C.pinkDark} 0%, ${C.accent} 100%)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: (saving || !name.trim() || retailNum <= 0) ? "not-allowed" : "pointer" }}>
            {saving ? "上架中..." : "⚡ 立即上架"}
          </button>
        </div>

        <div style={{ fontSize: 10, color: C.faint, textAlign: "center", lineHeight: 1.6 }}>
          上架後可到「賣場管理」按「編輯」補充更多細節<br/>
          分享商品可用商品卡的「🔗 分享」按鈕
        </div>
      </div>
    </Modal>
  );
}

function CatalogPage({ data, setData, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [sharing, setSharing] = useState(null); // 要分享的商品
  const [showQuickAdd, setShowQuickAdd] = useState(false); // 快速上架

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
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={() => setShowQuickAdd(true)}
            style={{ background:`linear-gradient(135deg, ${C.pinkDark} 0%, ${C.accent} 100%)`, color:"#fff", border:"none", padding:"8px 14px", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 2px 6px rgba(168,132,126,.3)" }}>
            ⚡ 快速上架
          </button>
          <Btn sm onClick={() => setShowAdd(true)}>＋ 新增商品</Btn>
        </div>
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
                      <div style={{ fontSize:9, color:C.faint, letterSpacing:.5, marginBottom:2, display:"flex", alignItems:"center", gap:6 }}>
                        <span>{p.category || "未分類"}</span>
                        <span style={{ fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:4, background: p.supply_type==="instock"?C.blueBg:C.accentBg, color: p.supply_type==="instock"?C.blue:C.accentDark }}>
                          {p.supply_type==="instock"?"現貨":"預購"}
                        </span>
                      </div>
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
                <button onClick={() => setSharing(p)}
                  style={{ background:C.accentBg, border:`1px solid ${C.accent}`, borderRadius:10, padding:"7px 12px", cursor:"pointer", color:C.accent, display:"flex", alignItems:"center", justifyContent:"center", gap:4, fontSize:12, fontWeight:600 }}>
                  🔗 分享
                </button>
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
      {sharing && <ShareProductModal product={sharing} onClose={() => setSharing(null)} toast={toast} />}
      {showQuickAdd && <QuickAddModal onClose={() => setShowQuickAdd(false)} onSave={saveNew} defaultRate={data.rate} toast={toast} />}
    </div>
  );
}

function ProductModal({ product, onSave, onClose, rate = 0 }) {
  const isEdit = !!product;
  const [showShare, setShowShare] = useState(false);


  const [name, setName]         = useState(product?.name || "");
  const [cat, setCat]           = useState(product?.category || "");
  const [shortCode, setShortCode] = useState(product?.short_code || "");
  const [supplier, setSupplier] = useState(product?.supplier || "");
  const [productRate, setProductRate] = useState(product?.rate ? String(product.rate) : String(rate || ""));
  const [image, setImage]       = useState(product?.image || ""); // emoji or base64
  const [deadline, setDeadline] = useState(product?.deadline || "");
  const [expectedArrival, setExpectedArrival] = useState(product?.expected_arrival || "");
  const [paymentType, setPaymentType] = useState(product?.payment_type || "full"); // full=付全款, deposit=先付訂金, cod=貨到付款
  const [supplyType, setSupplyType] = useState(product?.supply_type || "presale"); // presale=預購, instock=現貨
  const [variants, setVariants] = useState(() => {
    const initRate = Number(product?.rate) || rate || 0;
    return (product?.variants || []).map(v => ({
      ...v,
      cost: v.cost != null ? v.cost : Math.round((Number(v.costJpy)||0) * initRate),
    }));
  });
  const [vGroup, setVGroup]     = useState(""); // 所屬款式/群組(選填,例如:舒壓玩偶)
  const [vName, setVName]       = useState("");
  const [vPrice, setVPrice]     = useState("");
  const [vWholesalePrice, setVWholesalePrice] = useState("");
  const [vCostJpy, setVCostJpy] = useState("");
  const [vCostTwd, setVCostTwd] = useState("");
  const [costMode, setCostMode] = useState("twd"); // "twd"=直填台幣, "jpy"=日幣×匯率自動算
  const [uploading, setUploading] = useState(false);

  // 本商品匯率(留空時用 0)
  const effectiveRate = Number(productRate) || 0;

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await compressAndUploadImage(file, 800);
      setImage(url);
      setImgMode("file");
    } catch (err) {
      alert(err.message || "圖片上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  const [vStock, setVStock]     = useState("");
  const addVariant = () => {
    const rawInput = sanitize(vName, 500); if (!rawInput) return;
    const group = sanitize(vGroup, 30);
    // 支援批次輸入:用 / 、,或、頓號分隔,一次拆成多個獨立選項(例如「Kitty/美樂蒂/布丁狗」→ 3 個選項)
    const names = rawInput.split(/[\/,，、]+/).map(s => s.trim()).filter(Boolean);
    if (names.length === 0) return;

    let jpy = 0, cost = 0;
    if (costMode === "jpy") {
      jpy = Number(vCostJpy) || 0;
      cost = Math.round(jpy * effectiveRate);
    } else {
      // 直填台幣
      cost = Number(vCostTwd) || 0;
      jpy = effectiveRate > 0 ? Math.round(cost / effectiveRate) : 0;
    }

    const newOnes = names.map(rawName => {
      const n = group ? `${group}:${rawName}` : rawName; // 有填「所屬款式」就組成「群組:選項」,客人端會自動排成分組按鈕
      return { id:secureUid(), name:n, price:Number(vPrice)||0, wholesale_price:Number(vWholesalePrice)||0, costJpy:jpy, cost, stock: Number(vStock)||0 };
    });
    setVariants(vs => [...vs, ...newOnes]);
    setVName(""); setVPrice(""); setVWholesalePrice(""); setVCostJpy(""); setVCostTwd(""); setVStock("");
    // vGroup 刻意不清空,方便連續新增同一款式底下的多個細項(例如連續加 Kitty、美樂蒂、布丁狗)
  };
  const removeVariant = id => setVariants(vs => vs.filter(v => v.id !== id));

  const save = () => {
    const cleanName = sanitize(name, 100);
    if (!cleanName) return alert("請填寫商品名稱");
    onSave({
      id: product?.id || secureUid(),
      name: cleanName,
      category: sanitize(cat, 50),
      short_code: shortCode.trim() ? sanitize(shortCode.trim(), 10) : null,
      supplier: sanitize(supplier, 100),
      price: 0,   // 已棄用,以 variants[].price 為主
      rate: Number(productRate) || 0,
      image: image,
      deadline: deadline || null,
      expected_arrival: expectedArrival || null,
      payment_type: paymentType || "full",
      supply_type: supplyType || "presale",
      status: product?.status || "on",
      variants,
    });
  };

  const [tab, setTab] = useState("basic"); // basic | variants | timing

  const TABS = [
    { id: "basic", label: "基本資訊" },
    { id: "variants", label: "款式規格" },
    { id: "timing", label: "時間付款" },
  ];

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
              <button type="button" onClick={() => setShowShare(true)}
                style={{ background: C.accent, color: "#fff", border: "none", padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                <Icon name="share" size={14} /> 完整分享
              </button>
            </div>
          </div>
        )}

        {/* 分頁籤 */}
        <div style={{ display:"flex", gap:6, borderBottom:`1.5px solid ${C.border}`, paddingBottom:0 }}>
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              style={{
                padding:"10px 16px", border:"none", background:"none", cursor:"pointer",
                fontSize:13, fontWeight: tab===t.id ? 700 : 500,
                color: tab===t.id ? C.accent : C.muted,
                borderBottom: tab===t.id ? `2.5px solid ${C.accent}` : "2.5px solid transparent",
                marginBottom:-1.5, transition:"all .15s",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 分頁一:基本資訊(名稱/分類/短編號/圖片) ────────────── */}
        {tab === "basic" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>📦 供貨方式</div>
              <div style={{ display:"flex", gap:8 }}>
                {[
                  { val:"presale", label:"預購", desc:"先收單、再統一採購" },
                  { val:"instock", label:"現貨", desc:"款式各自有庫存,賣完即止" },
                ].map(opt => (
                  <label key={opt.val}
                    style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"11px 13px", borderRadius:10, cursor:"pointer",
                      background: supplyType===opt.val ? C.accentBg : C.bg,
                      border: `1.5px solid ${supplyType===opt.val ? C.accent : C.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <input type="radio" name="supply_type" checked={supplyType===opt.val} onChange={()=>setSupplyType(opt.val)}
                        style={{ accentColor:C.accent, cursor:"pointer" }}/>
                      <span style={{ fontSize:13, fontWeight:600, color: supplyType===opt.val ? C.accentDark : C.text }}>{opt.label}</span>
                    </div>
                    <div style={{ fontSize:10, color:C.muted, marginLeft:22 }}>{opt.desc}</div>
                  </label>
                ))}
              </div>
              <div style={{ marginTop:10, padding:"10px 12px", background:C.accentBg, borderRadius:8, fontSize:11, color:C.accentDark, lineHeight:1.6 }}>
                {supplyType === "instock"
                  ? "💡 現貨商品的庫存數量,請到「款式規格」分頁,每個款式各自設定,客人下單會即時扣減"
                  : "💡 預購商品也可以在「款式規格」分頁填寫目前手邊庫存,但這個數字僅供你自己參考,採購清單仍以「庫存管理」頁面的資料為準"}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <Input label="商品名稱 *" value={name} onChange={setName} placeholder="資生堂防曬乳" />
              <Input label="分類" value={cat} onChange={setCat} placeholder="藥妝" />
              <Input label="短編號(LINE +1 用)" value={shortCode} onChange={v => setShortCode(v.toUpperCase().slice(0, 10))} placeholder="A1" />
              <Input label="供應商(選填,純記錄)" value={supplier} onChange={setSupplier} placeholder="例:王老闆 0912-345-678" />
            </div>

            <div>
              <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>商品圖片</div>
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
                <div style={{ width:80, height:80, background:C.bgDeep, borderRadius:12, overflow:"hidden", border:`1.5px solid ${C.border}`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {image && image.startsWith("data:") ? (
                    <img src={image} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  ) : (
                    <span style={{ fontSize:11, color:C.muted }}>預覽</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 分頁二:款式規格(匯率/款式列表/新增款式) ────────────── */}
        {tab === "variants" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
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

            <div>
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
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                        <div style={{ fontSize:14, fontWeight:600, color:C.text }}>
                          {v.name.includes(":") ? (
                            <>
                              <span style={{ fontSize:10, fontWeight:500, color:C.muted, background:C.accentBg, padding:"1px 6px", borderRadius:4, marginRight:6 }}>{v.name.split(":")[0]}</span>
                              {v.name.split(":").slice(1).join(":")}
                            </>
                          ) : v.name}
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:11, fontWeight:700, color: (Number(v.stock)||0) > 0 ? C.green : C.faint, background: (Number(v.stock)||0) > 0 ? C.greenBg : C.bgDeep, padding:"2px 8px", borderRadius:6 }}>
                            {supplyType === "instock" ? `庫存 ${Number(v.stock)||0}` : `參考庫存 ${Number(v.stock)||0}`}
                          </span>
                          <button onClick={() => removeVariant(v.id)}
                            style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:18, lineHeight:1, padding:"0 4px" }}>×</button>
                        </div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        <div>
                          <div style={{ fontSize:10, color:C.muted, marginBottom:3, fontWeight:500 }}>售價 NT$</div>
                          <input type="number" inputMode="numeric" value={v.price||0}
                            onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, price:Number(e.target.value)||0} : x))}
                            style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", fontSize:14, boxSizing:"border-box", minWidth:0 }}/>
                        </div>
                        <div>
                          <div style={{ fontSize:10, color:C.accentDark, marginBottom:3, fontWeight:600 }}>
                            {supplyType === "instock" ? "📦 庫存數量(下單即扣)" : "📦 目前手邊庫存(選填,僅供參考)"}
                          </div>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <button type="button" onClick={() => setVariants(vs => vs.map(x => x.id===v.id ? {...x, stock: Math.max(0, (Number(x.stock)||0) - 1)} : x))}
                                style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:"#fff", cursor:"pointer", fontSize:16, color:C.muted, flexShrink:0 }}>−</button>
                              <input type="number" inputMode="numeric" value={v.stock||0}
                                onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, stock:Math.max(0, Number(e.target.value)||0)} : x))}
                                style={{ flex:1, textAlign:"center", background:C.surface, border:`1px solid ${C.accent}40`, borderRadius:8, padding:"8px 10px", fontSize:14, fontWeight:700, color:C.accentDark, boxSizing:"border-box", minWidth:0 }}/>
                              <button type="button" onClick={() => setVariants(vs => vs.map(x => x.id===v.id ? {...x, stock:(Number(x.stock)||0) + 1} : x))}
                                style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:"#fff", cursor:"pointer", fontSize:16, color:C.accent, flexShrink:0 }}>+</button>
                            </div>
                          </div>
                        <div>
                          <div style={{ fontSize:10, color:C.pinkDark, marginBottom:3, fontWeight:500 }}>💎 批發價 NT$ <span style={{ color:C.faint, fontWeight:400 }}>(0=同零售)</span></div>
                          <input type="number" inputMode="numeric" value={v.wholesale_price||0}
                            onChange={e => setVariants(vs => vs.map(x => x.id===v.id ? {...x, wholesale_price:Number(e.target.value)||0} : x))}
                            placeholder="0"
                            style={{ width:"100%", background:C.pinkBg, border:`1px solid ${C.pinkDark}30`, borderRadius:8, padding:"8px 10px", fontSize:14, color:C.pinkDark, fontWeight:600, boxSizing:"border-box", minWidth:0 }}/>
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
              <div style={{ padding:"12px 14px", background:C.accentBg, borderRadius:10, border:`1px dashed ${C.accent}50` }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:8, fontWeight:600 }}>+ 新增款式</div>
                <div style={{ marginBottom:8, padding:"10px 12px", background:"#fff", borderRadius:8, border:`1px solid ${C.border}` }}>
                  <Input label="所屬款式(選填,兩層式規格用)" value={vGroup} onChange={setVGroup} placeholder="例如:舒壓玩偶" style={{ marginBottom:6 }} />
                  <div style={{ fontSize:10, color:C.muted, lineHeight:1.6 }}>
                    填了這個,客人端會先讓客人選「款式」,再選下面的「款式名稱」當細項(例如款式=舒壓玩偶,細項=Kitty/美樂蒂...)。不填就是單層,直接列出選項。
                  </div>
                </div>
                <Input label={vGroup ? "細項名稱(例如:Kitty)" : "款式名稱"} value={vName} onChange={setVName} placeholder={vGroup ? "Kitty / 美樂蒂 / 布丁狗" : "紅色 / M號 / 草莓"} style={{ marginBottom:4 }} />
                <div style={{ fontSize:10, color:C.accent, marginBottom:8, lineHeight:1.6 }}>
                  💡 可以用「/」或「,」一次輸入多個,例如「Kitty/美樂蒂/布丁狗」按下方按鈕會一次新增 3 個獨立選項
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:8 }}>
                  <Input label="零售價 NT$" type="number" value={vPrice} onChange={setVPrice} placeholder="0" />
                  <Input label="💎 批發價 NT$" type="number" value={vWholesalePrice} onChange={setVWholesalePrice} placeholder="0 (不填=同零售價)" />
                  <Input label={supplyType === "instock" ? "📦 庫存數量" : "📦 目前手邊庫存(選填)"} type="number" value={vStock} onChange={setVStock} placeholder="0" />
                </div>

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
          </div>
        )}

        {/* ── 分頁三:時間付款(結單/到貨/付款方式) ────────────── */}
        {tab === "timing" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>時間設定(選填)</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
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

            <div>
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
                  <div style={{ fontSize:12, color:C.accentDark, fontWeight:600, marginBottom:4 }}>💡 各款式訂金請至「款式規格」分頁個別填寫</div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>每個款式可以有不同的訂金金額,例如「兔兔」訂金 NT$300,「小八」訂金 NT$500</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:8, borderTop:`1px solid ${C.border}` }}>
          <Btn variant="ghost" onClick={onClose}>取消</Btn>
          <Btn onClick={save}>{isEdit ? "儲存" : "新增商品"}</Btn>
        </div>
      </div>
      {showShare && product && <ShareProductModal product={product} onClose={() => setShowShare(false)} toast={t => alert(t)} />}
    </Modal>
  );
}


// 品項聚合 helper:列出所有 pending 訂單未配完的品項(不管有無 purchased 標記)
// 支援部分配貨:每個品項可能有 stocked_qty(已配數量),未配的數量 = qty - stocked_qty
function aggregatePendingItems(orders) {
  const pendingOrders = orders.filter(o => o.status === "pending" && !o.archived);
  const groups = new Map();
  pendingOrders.forEach(o => {
    (o.items || []).forEach((it, itemIdx) => {
      if (it.stocked === true) return;  // 舊資料:全部配完
      const stockedQty = Number(it.stocked_qty) || 0;
      const qty = Number(it.qty) || 1;
      const need = qty - stockedQty;
      if (need <= 0) return;  // 已配完
      const parts = String(it.name).split(" / ");
      const productName = parts[0] || it.name;
      const variantName = parts.slice(1).join(" / ") || "(單一款式)";
      const key = `${productName}|||${variantName}`;
      if (!groups.has(key)) {
        groups.set(key, { productName, variantName, count: 0, orderRefs: [], purchasedRefs: 0 });
      }
      const g = groups.get(key);
      g.count += need;
      if (it.purchased) g.purchasedRefs += 1;   // 記錄有幾筆已按過已採買
      g.orderRefs.push({
        orderId: o.id,
        orderNo: o.no,
        createdAt: o.created_at || o.createdAt || null,
        customer: o.customer_name || "未名",
        qty: need,
        image: it.image,
        itemIdx,
        purchased: !!it.purchased,
        stockedQty,
        origQty: qty,
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

  // 「進貨這款」按鈕開的 Modal(預填完整款式名)
  const [purchaseFor, setPurchaseFor] = useState(null);

  // 找出款式在 in_stock 的 stock (可用庫存)
  const getStock = (productName, variantName) => {
    const displayName = variantName && variantName !== "(單一款式)" ? `${productName} / ${variantName}` : productName;
    const item = (data.inStock || []).find(x => x.name === displayName);
    return item ? (Number(item.stock) || 0) : 0;
  };

  // 手動用庫存配貨
  const allocateFromStock = async (productName, variantName, orderRefs) => {
    const displayName = variantName && variantName !== "(單一款式)" ? `${productName} / ${variantName}` : productName;
    const stockItem = (data.inStock || []).find(x => x.name === displayName);
    const available = stockItem ? (Number(stockItem.stock) || 0) : 0;
    if (available <= 0) { toast("庫存不足"); return; }

    const totalNeed = orderRefs.reduce((s, r) => s + r.qty, 0);
    if (!window.confirm(`從庫存配貨:\n\n款式:${variantName}\n可用庫存:${available} 件\n需求:${totalNeed} 件\n\n依訂單先來後到分配,能配多少配多少。`)) return;

    let remaining = available;
    const sortedRefs = [...orderRefs].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : Infinity;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : Infinity;
      return ta - tb;
    });
    const orderPatches = new Map();
    let allocated = 0;
    const now = new Date().toISOString();

    for (const r of sortedRefs) {
      if (remaining <= 0) break;
      const alloc = Math.min(remaining, r.qty);
      if (alloc > 0) {
        if (!orderPatches.has(r.orderId)) orderPatches.set(r.orderId, new Map());
        // 取原本的 stocked_qty
        const order = data.orders.find(o => o.id === r.orderId);
        const item = order?.items?.[r.itemIdx];
        const sq = Number(item?.stocked_qty) || 0;
        orderPatches.get(r.orderId).set(r.itemIdx, sq + alloc);
        remaining -= alloc;
        allocated += alloc;
      }
    }

    for (const [orderId, idxToNewSq] of orderPatches.entries()) {
      const order = data.orders.find(o => o.id === orderId);
      if (!order) continue;
      const newItems = (order.items || []).map((it, i) => {
        if (!idxToNewSq.has(i)) return it;
        const newSq = idxToNewSq.get(i);
        const q = Number(it.qty) || 1;
        return { ...it, stocked_qty: newSq, stocked: newSq >= q, stocked_at: now };
      });
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
      }
      const { error } = await supabase.from("orders").update(patch).eq("id", orderId);
      if (error && /stocked/.test(error.message)) {
        const { stocked, stocked_at, ...noStocked } = patch;
        await supabase.from("orders").update(noStocked).eq("id", orderId);
      }
    }

    // 扣 stock
    if (allocated > 0) {
      const newStock = Math.max(0, available - allocated);
      await supabase.from("in_stock").update({ stock: newStock, updated_at: now }).eq("id", stockItem.id);
    }

    // 重拉
    const [ordersRes, inStockRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("in_stock").select("*").order("created_at", { ascending: false }),
    ]);
    setData(d => ({ ...d, orders: ordersRes.data || d.orders, inStock: inStockRes.data || d.inStock }));

    logAction("庫存配貨", `${displayName} · ${allocated} 件`);
    toast(`✅ 從庫存配貨 ${allocated} 件`);
  };

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
          <button onClick={() => setTab("purchases")}
            style={{ background: C.accent, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            📥 新增進貨
          </button>
        </div>
      </div>

      {/* 統計總覽:總需求 / 待採買款數 / 建議叫貨總數 */}
      {(() => {
        let purchasedDone = 0, purchasedPartial = 0, purchasedNone = 0, suggestOrderTotal = 0;
        grouped.forEach(([productName, variants]) => {
          variants.forEach(v => {
            const stock = getStock(productName, v.variantName);
            const need = Math.max(0, v.count - stock);
            suggestOrderTotal += need;
            if (v.purchasedRefs >= v.orderRefs.length) purchasedDone++;
            else if (v.purchasedRefs > 0) purchasedPartial++;
            else purchasedNone++;
          });
        });
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <div style={{ background: C.redBg, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.red }}>{suggestOrderTotal}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>建議叫貨(件)</div>
            </div>
            <div style={{ background: C.amberBg || C.accentBg, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.amber || C.accentDark }}>{purchasedNone + purchasedPartial}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>待採買(款)</div>
            </div>
            <div style={{ background: C.greenBg, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>{purchasedDone}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>已完成採買(款)</div>
            </div>
          </div>
        );
      })()}

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
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 5 }}>{v.variantName}</div>
                        {(() => {
                          const stock = getStock(productName, v.variantName);
                          const suggestOrder = Math.max(0, v.count - stock);
                          const fullyPurchased = v.purchasedRefs > 0 && v.purchasedRefs === v.orderRefs.length;
                          const partialPurchased = v.purchasedRefs > 0 && v.purchasedRefs < v.orderRefs.length;
                          return (
                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: C.bgDeep, color: C.textMid }}>需求 {v.count}</span>
                              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: stock > 0 ? C.greenBg : C.bgDeep, color: stock > 0 ? C.green : C.faint }}>庫存 {stock}</span>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: suggestOrder > 0 ? C.redBg : C.greenBg, color: suggestOrder > 0 ? C.red : C.green }}>
                                {suggestOrder > 0 ? `建議叫貨 ${suggestOrder}` : "庫存足夠"}
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: fullyPurchased ? C.accentBg : partialPurchased ? (C.amberBg||C.bgDeep) : C.redBg, color: fullyPurchased ? C.accentDark : partialPurchased ? (C.amber||C.textMid) : C.red }}>
                                {fullyPurchased ? "✓ 已採買" : partialPurchased ? `部分採買 ${v.purchasedRefs}/${v.orderRefs.length}` : "尚未採買"}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
                        {(() => {
                          const stock = getStock(productName, v.variantName);
                          if (stock > 0) return (
                            <button onClick={() => allocateFromStock(productName, v.variantName, v.orderRefs)}
                              style={{ background: C.pinkBg, color: C.pinkDark, border: `1.5px solid ${C.pinkDark}`, padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                              📦 用庫存配
                            </button>
                          );
                          return null;
                        })()}
                        <button onClick={() => {
                          const displayName = v.variantName && v.variantName !== "(單一款式)" ? `${productName} / ${v.variantName}` : productName;
                          setPurchaseFor({ name: displayName });
                        }}
                          style={{ background: C.accentBg, color: C.accent, border: `1.5px solid ${C.accent}`, padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                          📥 進貨配貨
                        </button>
                        {v.purchasedRefs < v.orderRefs.length && (
                          <button onClick={() => markVariantBought(productName, v.variantName)}
                            style={{ background: C.green, color: "#fff", border: "none", padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                            ✓ 已採買
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ paddingLeft: 28, marginTop: 8 }}>
                      {v.orderRefs.map((r, ri) => (
                        <div key={ri} style={{ fontSize: 11, color: C.textMid, padding: "2px 0", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <span>· #{r.orderNo} · {r.customer} × {r.qty}</span>
                          {r.stockedQty > 0 && r.stockedQty < r.origQty && (
                            <span style={{ fontSize: 9, padding: "1px 5px", background: C.pinkBg, color: C.pinkDark, borderRadius: 4, fontWeight: 600 }}>已配 {r.stockedQty}/{r.origQty}</span>
                          )}
                          {r.purchased && (
                            <span style={{ fontSize: 9, padding: "1px 5px", background: C.accentBg, color: C.accent, borderRadius: 4, fontWeight: 600 }}>✓ 已採買</span>
                          )}
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
      {purchaseFor && <PurchaseModal prefillName={purchaseFor.name} onClose={() => setPurchaseFor(null)} data={data} setData={setData} toast={toast} />}
    </div>
  );
}
function PurchasesPage({ data, setData, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const purchases = data.purchases || [];
  const totalQty = purchases.reduce((s, p) => s + (Number(p.qty) || 0), 0);
  const totalCost = purchases.reduce((s, p) => s + (Number(p.total_cost) || 0), 0);

  const del = async (p) => {
    if (!window.confirm(`確定刪除「${p.product_name}」× ${p.qty} 件的進貨紀錄?\n\n⚠️ 這只會刪除歷史紀錄,不會扣掉 in_stock 已加的庫存(需手動調整)。`)) return;
    const { error } = await supabase.from("purchases").delete().eq("id", p.id);
    if (error) { toast(`刪除失敗:${error.message}`); return; }
    setData(d => ({ ...d, purchases: (d.purchases||[]).filter(x => x.id !== p.id) }));
    logAction("刪除進項", `${p.product_name} × ${p.qty}`);
    toast("已刪除進項紀錄");
  };

  const exportCSV = () => {
    const rows = [["日期", "款式", "數量", "單價", "總成本", "自動配貨", "備註"]];
    purchases.forEach(p => {
      rows.push([
        p.purchased_at || "",
        p.product_name || "",
        Number(p.qty) || 0,
        Number(p.unit_cost) || 0,
        Number(p.total_cost) || 0,
        Number(p.auto_allocated) || 0,
        p.note || "",
      ]);
    });
    rows.push([]);
    rows.push(["合計", "", totalQty, "", totalCost, "", ""]);
    const csv = "\uFEFF" + rows.map(r => r.map(c => {
      const s = String(c);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `進項紀錄_${new Date().toLocaleDateString("zh-TW").replace(/\//g,"-")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>📥 進項紀錄</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>共 {purchases.length} 筆進貨 · 累計 {totalQty} 件 · 成本 {fmtMoney(totalCost)}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={exportCSV} style={{ background: C.green, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>📥 CSV</button>
          <Btn sm onClick={() => setShowAdd(true)}>＋ 新增進貨</Btn>
        </div>
      </div>

      {purchases.length === 0 ? (
        <Card style={{ padding: "48px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📥</div>
          <div style={{ fontSize: 14, color: C.muted, marginBottom: 4 }}>還沒有進貨紀錄</div>
          <div style={{ fontSize: 11, color: C.faint }}>按上方「+ 新增進貨」開始</div>
        </Card>
      ) : (
        purchases.map(p => (
          <Card key={p.id} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.product_name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.purchased_at || "未指定日期"}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => setEditing(p)} style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accent}30`, padding: "5px 9px", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>✏️</button>
                <button onClick={() => del(p)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 14 }}>🗑</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12 }}>
              <div><span style={{ color: C.muted }}>數量 </span><span style={{ fontWeight: 700, color: C.accentDark }}>{Number(p.qty) || 0}</span></div>
              <div><span style={{ color: C.muted }}>單價 </span><span style={{ color: C.text }}>{fmtMoney(Number(p.unit_cost) || 0)}</span></div>
              <div><span style={{ color: C.muted }}>總成本 </span><span style={{ fontWeight: 700, color: C.green }}>{fmtMoney(Number(p.total_cost) || 0)}</span></div>
              {Number(p.auto_allocated) > 0 && (
                <div style={{ background: C.pinkBg, color: C.pinkDark, padding: "1px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>✓ 自動配貨 {p.auto_allocated}</div>
              )}
            </div>
            {p.note && <div style={{ fontSize: 11, color: C.muted, marginTop: 6, padding: "4px 8px", background: C.bgDeep, borderRadius: 4 }}>📝 {p.note}</div>}
          </Card>
        ))
      )}

      {showAdd && <PurchaseModal onClose={() => setShowAdd(false)} data={data} setData={setData} toast={toast} />}
      {editing && <PurchaseModal purchase={editing} onClose={() => setEditing(null)} data={data} setData={setData} toast={toast} />}
    </div>
  );
}

// 新增/編輯進貨 Modal
function PurchaseModal({ purchase, prefillName, onClose, data, setData, toast }) {
  const isEdit = !!purchase;
  const [productName, setProductName] = useState(purchase?.product_name || prefillName || "");
  useEffect(() => {
    if (prefillName && !purchase) setProductName(prefillName);
  }, [prefillName, purchase]);
  const [qty, setQty] = useState(purchase?.qty || "");
  const [unitCost, setUnitCost] = useState(purchase?.unit_cost || "");
  const [purchasedAt, setPurchasedAt] = useState(purchase?.purchased_at || new Date().toISOString().slice(0,10));
  const [note, setNote] = useState(purchase?.note || "");
  const [autoAllocate, setAutoAllocate] = useState(!isEdit); // 編輯時預設不自動配

  // 建議清單:in_stock 已有的款式 + 所有待配貨訂單品項的完整名稱
  const suggestOptions = (() => {
    const set = new Set((data.inStock || []).map(x => x.name));
    (data.orders || []).forEach(o => {
      if (o.archived || o.status === "cancelled") return;
      (o.items || []).forEach(it => {
        if (it.stocked === true) return;
        const sq = Number(it.stocked_qty) || 0;
        const q = Number(it.qty) || 1;
        if (sq >= q) return; // 已配完
        set.add(String(it.name));
      });
    });
    return Array.from(set);
  })();

  const totalCost = (Number(qty) || 0) * (Number(unitCost) || 0);

  // 顯示這款式待配貨的訂單數
  const pendingCount = (() => {
    if (!productName) return 0;
    let count = 0;
    (data.orders || []).forEach(o => {
      if (o.archived || o.status !== "pending") return;
      (o.items || []).forEach(it => {
        if (it.stocked === true) return;
        const parts = String(it.name).split(" / ");
        const p = parts[0] || it.name;
        const v = parts.slice(1).join(" / ");
        const name = v ? `${p} / ${v}` : p;
        if (name !== productName) return;
        const sq = Number(it.stocked_qty) || 0;
        const need = (Number(it.qty) || 1) - sq;
        if (need > 0) count += need;
      });
    });
    return count;
  })();

  const save = async () => {
    if (!productName.trim()) { toast("請填品項名稱"); return; }
    if (!qty || Number(qty) <= 0) { toast("請填數量"); return; }
    const now = new Date().toISOString();
    const record = {
      id: purchase?.id || secureUid(),
      product_name: productName.trim(),
      qty: Number(qty),
      unit_cost: Number(unitCost) || 0,
      total_cost: totalCost,
      purchased_at: purchasedAt,
      note: note.trim(),
      created_at: purchase?.created_at || now,
    };

    if (isEdit) {
      // 編輯:先扣掉原來 qty,加回新 qty(避免庫存亂)
      const oldQty = Number(purchase.qty) || 0;
      const diff = record.qty - oldQty;
      const { error } = await supabase.from("purchases").update(record).eq("id", record.id);
      if (error) { toast(`更新失敗:${error.message}`); return; }
      // 調整 in_stock
      try {
        const { data: existing } = await supabase.from("in_stock").select("*").eq("name", record.product_name).maybeSingle();
        if (existing) {
          const newTotal = Math.max(0, (Number(existing.total_purchased) || 0) + diff);
          const newStock = Math.max(0, (Number(existing.stock) || 0) + diff);
          await supabase.from("in_stock").update({ total_purchased: newTotal, stock: newStock, updated_at: now }).eq("id", existing.id);
        }
      } catch (e) { console.warn("in_stock 調整失敗:", e); }
      setData(d => ({ ...d, purchases: (d.purchases||[]).map(x => x.id === record.id ? record : x) }));
      logAction("編輯進項", `${record.product_name} × ${record.qty}`);
      toast("已更新進項紀錄");
      onClose();
      return;
    }

    // 新增進貨
    let autoAllocatedCount = 0;
    try {
      // 1. 建立 purchases 紀錄
      const { error: pErr } = await supabase.from("purchases").insert([record]);
      if (pErr) { toast(`新增失敗:${pErr.message}`); return; }

      // 2. 更新 in_stock:total_purchased += qty, stock += qty
      const { data: existing } = await supabase.from("in_stock").select("*").eq("name", record.product_name).maybeSingle();
      if (existing) {
        const newTotal = (Number(existing.total_purchased) || 0) + record.qty;
        const newStock = (Number(existing.stock) || 0) + record.qty;
        await supabase.from("in_stock").update({ total_purchased: newTotal, stock: newStock, updated_at: now }).eq("id", existing.id);
      } else {
        await supabase.from("in_stock").insert([{
          id: secureUid(),
          name: record.product_name,
          price: 0,
          stock: record.qty,
          total_purchased: record.qty,
          image: "",
          status: "off",
          created_at: now,
        }]);
      }

      // 3. 若勾選自動配貨,掃描待配貨訂單依先來後到分配
      if (autoAllocate) {
        let remaining = record.qty;
        // 找出這款式所有待配的訂單品項(狀態是待採買 pending 就可配,不必先按已採買)
        const targets = [];
        (data.orders || []).filter(o => !o.archived && o.status === "pending").forEach(o => {
          (o.items || []).forEach((it, idx) => {
            if (it.stocked === true) return;
            const parts = String(it.name).split(" / ");
            const p = parts[0] || it.name;
            const v = parts.slice(1).join(" / ");
            const name = v ? `${p} / ${v}` : p;
            if (name !== record.product_name) return;
            const sq = Number(it.stocked_qty) || 0;
            const need = (Number(it.qty) || 1) - sq;
            if (need > 0) targets.push({ order: o, itemIdx: idx, need, sq });
          });
        });
        // 排序:下單時間早的先(不能用 no,因為 no 是隨機碼,不代表下單先後)
        targets.sort((a, b) => {
          const ta = a.order.created_at ? new Date(a.order.created_at).getTime() : Infinity;
          const tb = b.order.created_at ? new Date(b.order.created_at).getTime() : Infinity;
          return ta - tb;
        });

        // 配貨
        const orderPatches = new Map(); // orderId → { idxToNewSq }
        for (const t of targets) {
          if (remaining <= 0) break;
          const alloc = Math.min(remaining, t.need);
          if (alloc > 0) {
            if (!orderPatches.has(t.order.id)) orderPatches.set(t.order.id, new Map());
            orderPatches.get(t.order.id).set(t.itemIdx, t.sq + alloc);
            remaining -= alloc;
            autoAllocatedCount += alloc;
          }
        }

        // 應用到訂單
        for (const [orderId, idxToNewSq] of orderPatches.entries()) {
          const order = data.orders.find(o => o.id === orderId);
          if (!order) continue;
          const newItems = (order.items || []).map((it, i) => {
            if (!idxToNewSq.has(i)) return it;
            const newSq = idxToNewSq.get(i);
            const q = Number(it.qty) || 1;
            return { ...it, stocked_qty: newSq, stocked: newSq >= q, stocked_at: now };
          });
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
          }
          const { error: ordErr } = await supabase.from("orders").update(patch).eq("id", orderId);
          if (ordErr && /stocked/.test(ordErr.message)) {
            const { stocked, stocked_at, ...noStocked } = patch;
            await supabase.from("orders").update(noStocked).eq("id", orderId);
          }
        }

        // 自動配貨消耗掉的量從 stock 扣掉
        if (autoAllocatedCount > 0) {
          const { data: cur } = await supabase.from("in_stock").select("*").eq("name", record.product_name).maybeSingle();
          if (cur) {
            const newStock = Math.max(0, (Number(cur.stock) || 0) - autoAllocatedCount);
            await supabase.from("in_stock").update({ stock: newStock, updated_at: now }).eq("id", cur.id);
          }
        }

        // 更新 purchases.auto_allocated
        if (autoAllocatedCount > 0) {
          await supabase.from("purchases").update({ auto_allocated: autoAllocatedCount }).eq("id", record.id);
          record.auto_allocated = autoAllocatedCount;
        }
      }
    } catch (e) {
      console.error("進貨失敗:", e);
      toast(`錯誤:${e.message || e}`);
      return;
    }

    // 重新拉資料
    const [ordersRes, inStockRes, purchasesRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("in_stock").select("*").order("created_at", { ascending: false }),
      supabase.from("purchases").select("*").order("purchased_at", { ascending: false }),
    ]);
    setData(d => ({
      ...d,
      orders: ordersRes.data || d.orders,
      inStock: inStockRes.data || d.inStock,
      purchases: purchasesRes.data || d.purchases,
    }));

    logAction("新增進項", `${record.product_name} × ${record.qty} · 成本 ${totalCost}${autoAllocatedCount > 0 ? ` · 自動配 ${autoAllocatedCount}` : ""}`);

    // 若勾了自動配貨但配到 0 件 → 提示業者
    if (autoAllocate && autoAllocatedCount === 0) {
      // 找找看有沒有名稱相近的訂單品項(前綴匹配)
      const similar = [];
      (data.orders || []).forEach(o => {
        if (o.archived || o.status !== "pending") return;
        (o.items || []).forEach(it => {
          if (it.stocked === true) return;
          const sq = Number(it.stocked_qty) || 0;
          const q = Number(it.qty) || 1;
          if (sq >= q) return;
          // 檢查商品名(第一層)是否與進貨名相符或包含
          const parts = String(it.name).split(" / ");
          const productBase = parts[0];
          const purchaseBase = record.product_name.split(" / ")[0];
          if (productBase === purchaseBase && it.name !== record.product_name) {
            similar.push(String(it.name));
          }
        });
      });
      if (similar.length > 0) {
        alert(`⚠️ 進貨成功,但沒有自動配到任何訂單。\n\n進貨款式名:「${record.product_name}」\n\n訂單需要的款式(名稱不完全相符):\n${[...new Set(similar)].slice(0,5).map(n => `• ${n}`).join("\n")}\n\n💡 建議:回採購清單按「進貨這款」,款式名會自動預填完整名稱。`);
      } else {
        alert(`⚠️ 進貨成功,但沒有自動配到任何訂單。\n\n可能原因:目前沒有訂單需要「${record.product_name}」這個款式。\n\n進貨紀錄已建立,庫存也已加。`);
      }
    }

    toast(`✅ 已新增進項${autoAllocatedCount > 0 ? ` · 自動配貨 ${autoAllocatedCount} 件` : ""}`);
    onClose();
  };

  return (
    <Modal title={isEdit ? "編輯進項" : "新增進貨"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>品項名稱 *</label>
          <input type="text" value={productName} onChange={e => setProductName(e.target.value)}
            list="stock-options"
            placeholder="例:蛤蜊風味 或 東京圭美 / 蛤蜊風味"
            style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
          <datalist id="stock-options">
            {suggestOptions.map(n => <option key={n} value={n} />)}
          </datalist>
          {pendingCount > 0 && productName && (
            <div style={{ fontSize: 11, color: C.accent, marginTop: 4 }}>💡 此款式有 {pendingCount} 件待配貨訂單</div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>數量 *</label>
            <input type="number" inputMode="numeric" value={qty} onChange={e => setQty(e.target.value)} min="1"
              style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>單價成本 NT$</label>
            <input type="number" inputMode="numeric" value={unitCost} onChange={e => setUnitCost(e.target.value)} min="0"
              style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
          </div>
        </div>

        <div style={{ padding: "10px 12px", background: C.accentBg, borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: C.muted }}>總成本</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.green }}>{fmtMoney(totalCost)}</span>
        </div>

        <div>
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>採買日期</label>
          <input type="date" value={purchasedAt} onChange={e => setPurchasedAt(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}/>
        </div>

        <div>
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>備註</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            placeholder="例:日本代購,匯率 0.22"
            style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}/>
        </div>

        {!isEdit && (
          <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: autoAllocate ? C.greenBg : C.bgDeep, borderRadius: 8, cursor: "pointer", border: `1.5px solid ${autoAllocate ? C.green : C.border}` }}>
            <input type="checkbox" checked={autoAllocate} onChange={e => setAutoAllocate(e.target.checked)} style={{ width: 18, height: 18, accentColor: C.green }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: autoAllocate ? C.green : C.text }}>🎯 進貨後自動配貨</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>依訂單先來後到分配,配完自動升訂單狀態</div>
            </div>
          </label>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", border: `1px solid ${C.border}`, background: "#fff", borderRadius: 8, cursor: "pointer" }}>取消</button>
          <button onClick={save} style={{ flex: 2, padding: "10px", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            {isEdit ? "儲存編輯" : "確認新增進貨"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// 入庫配貨:列出「已採買」但尚未入庫的品項聚合,讓業者登記買到多少
// InboundPage 已廢除,配貨改由「進項紀錄」的 PurchaseModal 處理

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

  const allOrders = (data.orders || []).filter(o => !o.archived).filter(inRange);

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
  const [purchaseFor, setPurchaseFor] = useState(null);  // 開 PurchaseModal 時的預填款式

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
  // 「+ 進貨」按鈕:打開 PurchaseModal,預填此款式(和進項紀錄頁共用同一個 Modal)
  const openPurchase = (item) => {
    setPurchaseFor(item);
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
            <button onClick={() => openPurchase(item)}
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
      {purchaseFor && <PurchaseModal prefillName={purchaseFor.name} onClose={() => setPurchaseFor(null)} data={data} setData={setData} toast={toast} />}
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
  const [billingTarget, setBillingTarget] = useState(null); // { customerName, orders }

  // 生成批發客編號 W + YYMMDD + 3位序號
  const generateWholesaleNo = () => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth()+1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const prefix = `W${yy}${mm}${dd}`;
    const todayNos = (data.members || [])
      .filter(m => m.wholesale_no && String(m.wholesale_no).startsWith(prefix))
      .map(m => Number(String(m.wholesale_no).slice(prefix.length)) || 0);
    const nextSeq = Math.max(0, ...todayNos) + 1;
    return `${prefix}${String(nextSeq).padStart(3, "0")}`;
  };

  // 切換批發客身分
  const toggleWholesale = async (customer) => {
    const memberInfo = (data.members || []).find(m => m.line_user_id === customer.lineId);
    if (!memberInfo) { toast("此客人尚未註冊,無法設為批發客"); return; }

    const newIsWholesale = !memberInfo.is_wholesale;
    const now = new Date().toISOString();
    let newNo = memberInfo.wholesale_no || "";

    if (newIsWholesale) {
      // 開啟批發客 → 若無編號則生成
      if (!newNo) newNo = generateWholesaleNo();
      if (!window.confirm(`將「${customer.name}」設為批發客?\n\n會員編號:${newNo}\n\n之後客人端會看到批發價。`)) return;
    } else {
      if (!window.confirm(`取消「${customer.name}」的批發客身分?\n(會員編號保留但停用)`)) return;
    }

    const patch = { is_wholesale: newIsWholesale };
    if (newIsWholesale && newNo !== memberInfo.wholesale_no) {
      patch.wholesale_no = newNo;
      patch.wholesale_since = now;
    }

    const { error } = await supabase.from("members").update(patch).eq("id", memberInfo.id);
    if (error) { toast(`更新失敗:${error.message}`); return; }
    setData(d => ({
      ...d,
      members: (d.members || []).map(m => m.id === memberInfo.id ? { ...m, ...patch } : m),
    }));
    logAction(newIsWholesale ? "設為批發客" : "取消批發客", `${customer.name} · ${newNo}`);
    toast(newIsWholesale ? `✅ 已設為批發客 · 編號 ${newNo}` : "已取消批發客身分");
  };

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
        isWholesale:   !!memberInfo?.is_wholesale,
        wholesaleNo:   memberInfo?.wholesale_no || "",
        memberId:      memberInfo?.id || null,
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
      {billingTarget && (
        <BillingStatementModal
          mode="batch"
          customerName={billingTarget.customerName}
          customerOrders={billingTarget.orders}
          onClose={() => setBillingTarget(null)}
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
                  <div style={{ fontWeight:700, fontSize:15, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                    <span>{c.name}</span>
                    {c.isWholesale && (
                      <span style={{ fontSize:9, padding:"2px 6px", background:C.pinkDark, color:"#fff", borderRadius:4, fontWeight:600 }}>💎 批發客 {c.wholesaleNo}</span>
                    )}
                  </div>
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
                      <button onClick={e => { e.stopPropagation(); toggleWholesale(c); }}
                        style={{ fontSize:11, background:c.isWholesale?C.pinkDark:"#fff", color:c.isWholesale?"#fff":C.pinkDark, border:`1.5px solid ${C.pinkDark}`, borderRadius:99, padding:"5px 12px", cursor:"pointer", whiteSpace:"nowrap", fontWeight:600 }}>
                        {c.isWholesale ? "💎 取消批發" : "💎 設為批發客"}
                      </button>
                      <button onClick={e => { e.stopPropagation(); setNotifyTargets([{ name: c.name, lineUserId: c.lineId }]); }}
                        style={{ fontSize:11, background:"#3d4a3e", color:"#fff", border:"none", borderRadius:99, padding:"5px 12px", cursor:"pointer", whiteSpace:"nowrap", fontWeight:600 }}>
                        📨 通知
                      </button>
                      <button onClick={e => { e.stopPropagation(); setBillingTarget({ customerName: c.name, orders: orders.filter(o => o.status !== "cancelled") }); }}
                        style={{ fontSize:11, background:C.accentBg, color:C.accentDark, border:`1px solid ${C.accent}40`, borderRadius:99, padding:"5px 12px", cursor:"pointer", whiteSpace:"nowrap", fontWeight:600 }}>
                        📄 請款單
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
      // 付款/匯款資訊 —— 加總訂金、只要有任一筆未收訂金就標記未收、延用第一筆的匯款/收件資訊
      deposit_amount: toMerge.reduce((s, o) => s + (Number(o.deposit_amount) || Number(o.deposit) || 0), 0),
      deposit_paid: toMerge.every(o => {
        const dep = Number(o.deposit_amount) || Number(o.deposit) || 0;
        return dep <= 0 || !!o.deposit_paid;
      }),
      deposit_bank: (toMerge.find(o => o.deposit_bank)?.deposit_bank) || "",
      deposit_last5: (toMerge.find(o => o.deposit_last5)?.deposit_last5) || "",
      payment_method: (toMerge.find(o => o.payment_method)?.payment_method) || "",
      shipping_fee: toMerge.reduce((s, o) => s + (Number(o.shipping_fee) || 0), 0),
      final_paid: toMerge.every(o => !!o.final_paid),
      paid: toMerge.every(o => !!o.paid),
      recipient_phone: (toMerge.find(o => o.recipient_phone)?.recipient_phone) || "",
      delivery_method: (toMerge.find(o => o.delivery_method)?.delivery_method) || "",
      store_code: (toMerge.find(o => o.store_code)?.store_code) || "",
      store_name: (toMerge.find(o => o.store_name)?.store_name) || "",
      store_address: (toMerge.find(o => o.store_address)?.store_address) || "",
      is_wholesale: toMerge.some(o => !!o.is_wholesale),
      wholesale_no: (toMerge.find(o => o.wholesale_no)?.wholesale_no) || "",
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

function SettingsPage({ credentials, setCredentials, toast, onLogout, data, setData }) {
  const [account, setAccount] = useState(credentials.account);
  const [oldPw, setOldPw] = useState(""); const [newPw, setNewPw] = useState(""); const [confirmPw, setConfirmPw] = useState("");
  const [showOld, setShowOld] = useState(false); const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0); // 0-4

  // 圖片遷移狀態
  const [migrating, setMigrating] = useState(false);
  const [migrateProgress, setMigrateProgress] = useState({ current: 0, total: 0, done: 0, failed: 0, skipped: 0 });
  const [migrateLog, setMigrateLog] = useState([]);

  // 統計 base64 圖片
  const base64Products = (data?.products || []).filter(p => p.image?.startsWith("data:"));
  const base64InStock = (data?.inStock || []).filter(x => x.image?.startsWith("data:"));
  const totalBase64Count = base64Products.length + base64InStock.length;
  const base64Size = (() => {
    let bytes = 0;
    [...base64Products, ...base64InStock].forEach(p => { bytes += (p.image?.length || 0); });
    return (bytes / 1024 / 1024).toFixed(1);
  })();

  // 一鍵遷移
  const migrateImages = async () => {
    if (totalBase64Count === 0) { toast("沒有需要遷移的圖片"); return; }
    if (!window.confirm(`將把 ${totalBase64Count} 張 base64 圖片轉存到 Supabase Storage,\n\n預計省 ${base64Size} MB 的 Egress。\n\n這會花幾分鐘,途中請不要關頁面。確定?`)) return;

    setMigrating(true);
    setMigrateLog([]);
    const items = [
      ...base64Products.map(p => ({ ...p, _table: "products" })),
      ...base64InStock.map(p => ({ ...p, _table: "in_stock" })),
    ];
    setMigrateProgress({ current: 0, total: items.length, done: 0, failed: 0, skipped: 0 });

    let done = 0, failed = 0, skipped = 0;
    const logLines = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setMigrateProgress(p => ({ ...p, current: i + 1 }));
      try {
        // 1. base64 → Blob
        const dataUrl = item.image;
        const [meta, b64] = dataUrl.split(",");
        const mime = meta.match(/data:([^;]+)/)?.[1] || "image/jpeg";
        const bytes = atob(b64);
        const arr = new Uint8Array(bytes.length);
        for (let j = 0; j < bytes.length; j++) arr[j] = bytes.charCodeAt(j);
        const blob = new Blob([arr], { type: mime });

        if (blob.size > 5 * 1024 * 1024) {
          skipped++;
          logLines.push(`⏭ 跳過 ${item.name} (超過 5MB)`);
          setMigrateLog([...logLines]);
          continue;
        }

        // 2. 上傳到 Storage
        const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
        const fileName = `migrated_${Date.now()}_${secureUid()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("product-images")
          .upload(fileName, blob, { contentType: mime, upsert: false });

        if (upErr) {
          failed++;
          logLines.push(`❌ ${item.name}: ${upErr.message}`);
          setMigrateLog([...logLines]);
          continue;
        }

        // 3. 拿 URL
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        // 4. 更新資料庫
        const { error: dbErr } = await supabase.from(item._table)
          .update({ image: publicUrl })
          .eq("id", item.id);

        if (dbErr) {
          failed++;
          logLines.push(`❌ ${item.name}: 更新失敗 ${dbErr.message}`);
          setMigrateLog([...logLines]);
          continue;
        }

        // 5. 更新本地 state
        setData(d => ({
          ...d,
          [item._table === "products" ? "products" : "inStock"]:
            (d[item._table === "products" ? "products" : "inStock"] || [])
              .map(x => x.id === item.id ? { ...x, image: publicUrl } : x),
        }));

        done++;
        setMigrateProgress(p => ({ ...p, done }));
        logLines.push(`✅ ${item.name}`);
        setMigrateLog([...logLines]);
      } catch (e) {
        failed++;
        logLines.push(`❌ ${item.name}: ${e.message || e}`);
        setMigrateLog([...logLines]);
      }
    }

    setMigrateProgress(p => ({ ...p, done, failed, skipped }));
    setMigrating(false);
    logAction("圖片遷移", `完成 ${done} · 失敗 ${failed} · 跳過 ${skipped}`);
    toast(`✅ 遷移完成 · 成功 ${done}${failed > 0 ? ` · 失敗 ${failed}` : ""}${skipped > 0 ? ` · 跳過 ${skipped}` : ""}`);
  };

  // ── 訂單明細圖片遷移(常是 Egress 爆量的主因,獨立跑) ──────
  const [migratingOrders, setMigratingOrders] = useState(false);
  const [migrateOrdersProgress, setMigrateOrdersProgress] = useState({ current: 0, total: 0, done: 0, failed: 0, skipped: 0 });
  const [migrateOrdersLog, setMigrateOrdersLog] = useState([]);

  // 統計:哪些訂單裡有 base64 圖片(可能不只封存訂單,含所有狀態)
  const ordersWithBase64Images = (data?.orders || []).filter(o =>
    (o.items || []).some(it => it.image?.startsWith("data:"))
  );
  const base64ImageItemCount = ordersWithBase64Images.reduce(
    (s, o) => s + (o.items || []).filter(it => it.image?.startsWith("data:")).length, 0
  );
  const orderBase64Size = (() => {
    let bytes = 0;
    ordersWithBase64Images.forEach(o => {
      (o.items || []).forEach(it => { if (it.image?.startsWith("data:")) bytes += (it.image.length || 0); });
    });
    return (bytes / 1024 / 1024).toFixed(1);
  })();

  const migrateOrderImages = async () => {
    if (ordersWithBase64Images.length === 0) { toast("沒有需要遷移的訂單圖片"); return; }
    if (!window.confirm(`將把 ${ordersWithBase64Images.length} 筆訂單、共 ${base64ImageItemCount} 張 base64 圖片轉存到 Supabase Storage,\n\n預計省 ${orderBase64Size} MB 的 Egress(通常是最大的省流量來源)。\n\n這會花幾分鐘,途中請不要關頁面。確定?`)) return;

    setMigratingOrders(true);
    setMigrateOrdersLog([]);
    setMigrateOrdersProgress({ current: 0, total: ordersWithBase64Images.length, done: 0, failed: 0, skipped: 0 });

    let done = 0, failed = 0, skipped = 0;
    const logLines = [];

    for (let i = 0; i < ordersWithBase64Images.length; i++) {
      const order = ordersWithBase64Images[i];
      setMigrateOrdersProgress(p => ({ ...p, current: i + 1 }));
      try {
        let orderFailed = false;
        const newItems = await Promise.all((order.items || []).map(async (it) => {
          if (!it.image?.startsWith("data:")) return it;
          try {
            const dataUrl = it.image;
            const [meta, b64] = dataUrl.split(",");
            const mime = meta.match(/data:([^;]+)/)?.[1] || "image/jpeg";
            const bytes = atob(b64);
            const arr = new Uint8Array(bytes.length);
            for (let j = 0; j < bytes.length; j++) arr[j] = bytes.charCodeAt(j);
            const blob = new Blob([arr], { type: mime });

            if (blob.size > 5 * 1024 * 1024) {
              skipped++;
              logLines.push(`⏭ #${order.no} · ${it.name} (超過 5MB)`);
              setMigrateOrdersLog([...logLines]);
              return it; // 保留原樣,不處理
            }

            const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
            const fileName = `order_migrated_${Date.now()}_${secureUid()}.${ext}`;
            const { error: upErr } = await supabase.storage
              .from("product-images")
              .upload(fileName, blob, { contentType: mime, upsert: false });
            if (upErr) { orderFailed = true; logLines.push(`❌ #${order.no} · ${it.name}: ${upErr.message}`); setMigrateOrdersLog([...logLines]); return it; }

            const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
            return { ...it, image: urlData.publicUrl };
          } catch (e) {
            orderFailed = true;
            logLines.push(`❌ #${order.no} · ${it.name}: ${e.message || e}`);
            setMigrateOrdersLog([...logLines]);
            return it;
          }
        }));

        const { error: dbErr } = await supabase.from("orders").update({ items: newItems }).eq("id", order.id);
        if (dbErr) {
          failed++;
          logLines.push(`❌ #${order.no}: 更新失敗 ${dbErr.message}`);
          setMigrateOrdersLog([...logLines]);
          continue;
        }

        setData(d => ({ ...d, orders: d.orders.map(o => o.id === order.id ? { ...o, items: newItems } : o) }));

        if (orderFailed) { failed++; } else { done++; logLines.push(`✅ #${order.no}`); }
        setMigrateOrdersProgress(p => ({ ...p, done, failed }));
        setMigrateOrdersLog([...logLines]);
      } catch (e) {
        failed++;
        logLines.push(`❌ #${order.no}: ${e.message || e}`);
        setMigrateOrdersLog([...logLines]);
      }
    }

    setMigrateOrdersProgress(p => ({ ...p, done, failed, skipped }));
    setMigratingOrders(false);
    logAction("訂單圖片遷移", `完成 ${done} 筆訂單 · 失敗 ${failed} · 跳過 ${skipped}`);
    toast(`✅ 訂單圖片遷移完成 · 成功 ${done} 筆${failed > 0 ? ` · 失敗 ${failed}` : ""}${skipped > 0 ? ` · 跳過 ${skipped}` : ""}`);
  };

  // 賣貨便連結 state
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [shopeeLoading, setShopeeLoading] = useState(true);
  const [shopeeSaving, setShopeeSaving] = useState(false);

  // 取消訂單逾期時數
  const [autoCancelHours, setAutoCancelHours] = useState("36");
  const [cancelSaving, setCancelSaving] = useState(false);

  // 請款單設定:店名、匯款帳戶資訊、備註文字
  const [billingShopName, setBillingShopName] = useState("");
  const [billingBankInfo, setBillingBankInfo] = useState("");
  const [billingNote, setBillingNote] = useState("");
  const [billingSaving, setBillingSaving] = useState(false);

  // 載入目前設定
  useEffect(() => {
    Promise.all([
      supabase.from("settings").select("*").eq("key", "shopee_ship_url").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "auto_cancel_hours").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "billing_shop_name").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "billing_bank_info").maybeSingle(),
      supabase.from("settings").select("*").eq("key", "billing_note").maybeSingle(),
    ]).then(([shopee, cancel, shopName, bankInfo, note]) => {
      if (shopee.data?.value) setShopeeUrl(shopee.data.value);
      if (cancel.data?.value) setAutoCancelHours(cancel.data.value);
      if (shopName.data?.value) setBillingShopName(shopName.data.value);
      if (bankInfo.data?.value) setBillingBankInfo(bankInfo.data.value);
      if (note.data?.value) setBillingNote(note.data.value);
      setShopeeLoading(false);
    }).catch(() => setShopeeLoading(false));
  }, []);

  const saveBillingSettings = async () => {
    setBillingSaving(true);
    try {
      const now = new Date().toISOString();
      const { error } = await supabase.from("settings").upsert([
        { key: "billing_shop_name", value: sanitize(billingShopName, 100), updated_at: now },
        { key: "billing_bank_info", value: sanitize(billingBankInfo, 200), updated_at: now },
        { key: "billing_note", value: sanitize(billingNote, 500), updated_at: now },
      ], { onConflict: "key" });
      if (error) throw error;
      logAction("更新請款單設定", billingShopName);
      toast("請款單設定已儲存 ✅");
    } catch (e) {
      console.error(e);
      toast(`儲存失敗:${e.message || "未知錯誤"}`);
    }
    setBillingSaving(false);
  };

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

      {/* 📄 請款單設定 */}
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark, marginTop: 4 }}>📄 請款單設定</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
          設定一次,之後每張請款單(訂單頁 / 客人管理裡的「請款單」按鈕)都會自動帶入這些內容。
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>店名 / 代購名稱</label>
            <input value={billingShopName} onChange={e => setBillingShopName(e.target.value)}
              placeholder="例如:FUKUGI 代購" disabled={shopeeLoading}
              style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing: "border-box" }} />
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>會顯示在請款單標題,例如「FUKUGI 代購請款單」</div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>匯款帳戶資訊</label>
            <input value={billingBankInfo} onChange={e => setBillingBankInfo(e.target.value)}
              placeholder="例如:國泰 | 013 | 043700009565 | 呂宗倫" disabled={shopeeLoading}
              style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>請款單備註文字</label>
            <textarea value={billingNote} onChange={e => setBillingNote(e.target.value)} rows={3}
              placeholder={"產品會將再付款完畢後,抵台 1~3 個工作天內發貨。\n如有其他問題請在七日內提出。\n可以接受 LINE PAY"}
              disabled={shopeeLoading}
              style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14, boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
          </div>
          <Btn onClick={saveBillingSettings} disabled={billingSaving||shopeeLoading}>
            {billingSaving ? "儲存中..." : "儲存請款單設定"}
          </Btn>
        </div>
      </Card>

      {/* 🖼 圖片遷移工具 */}
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark, marginTop: 4 }}>🖼 圖片遷移工具</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
          把舊的商品圖(存在資料庫的 base64)轉移到 Supabase Storage,大幅降低 Egress 流量消耗。
        </div>

        {totalBase64Count === 0 && !migrating ? (
          <div style={{ padding: "20px", background: C.greenBg, borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>✅</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark }}>所有圖片都已使用 Storage</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>不需要遷移</div>
          </div>
        ) : (
          <>
            {/* 統計 */}
            {!migrating && (
              <div style={{ padding: "14px 16px", background: C.pinkBg, borderRadius: 10, marginBottom: 12, border: `1.5px solid ${C.pinkDark}40` }}>
                <div style={{ fontSize: 12, color: C.pinkDark, fontWeight: 700, marginBottom: 8 }}>📊 待遷移統計</div>
                <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.textMid, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ color: C.muted }}>商品圖:</span>
                    <span style={{ fontWeight: 700, color: C.pinkDark, marginLeft: 4 }}>{base64Products.length} 張</span>
                  </div>
                  <div>
                    <span style={{ color: C.muted }}>現貨圖:</span>
                    <span style={{ fontWeight: 700, color: C.pinkDark, marginLeft: 4 }}>{base64InStock.length} 張</span>
                  </div>
                  <div>
                    <span style={{ color: C.muted }}>總大小:</span>
                    <span style={{ fontWeight: 700, color: C.pinkDark, marginLeft: 4 }}>{base64Size} MB</span>
                  </div>
                </div>
              </div>
            )}

            {/* 進度 */}
            {migrating && (
              <div style={{ padding: "14px 16px", background: C.accentBg, borderRadius: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.accentDark }}>
                    處理中 {migrateProgress.current} / {migrateProgress.total}
                  </span>
                  <span style={{ fontSize: 11, color: C.muted }}>
                    ✅ {migrateProgress.done}  ❌ {migrateProgress.failed}  ⏭ {migrateProgress.skipped}
                  </span>
                </div>
                <div style={{ height: 8, background: "#fff", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${(migrateProgress.current / Math.max(migrateProgress.total, 1)) * 100}%`, height: "100%", background: C.accent, transition: "width .3s" }}></div>
                </div>
              </div>
            )}

            {/* 遷移日誌(限高 200px) */}
            {migrateLog.length > 0 && (
              <details style={{ marginBottom: 12 }} open={migrating}>
                <summary style={{ fontSize: 12, color: C.muted, cursor: "pointer", padding: "6px 0" }}>
                  📋 詳細日誌 ({migrateLog.length} 條)
                </summary>
                <div style={{ maxHeight: 200, overflowY: "auto", padding: "10px 12px", background: C.bgDeep, borderRadius: 8, fontSize: 11, lineHeight: 1.7, fontFamily: "monospace" }}>
                  {migrateLog.slice(-50).map((l, i) => (
                    <div key={i} style={{ color: l.startsWith("❌") ? C.red : l.startsWith("⏭") ? C.muted : C.greenDark }}>{l}</div>
                  ))}
                </div>
              </details>
            )}

            <button onClick={migrateImages} disabled={migrating || totalBase64Count === 0}
              style={{ width: "100%", padding: "12px", background: migrating ? C.faint : `linear-gradient(135deg, ${C.pinkDark} 0%, ${C.accent} 100%)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: migrating ? "not-allowed" : "pointer", letterSpacing: .5 }}>
              {migrating ? "遷移中..." : `⚡ 開始遷移 ${totalBase64Count} 張圖片`}
            </button>

            <div style={{ fontSize: 10, color: C.faint, textAlign: "center", marginTop: 10, lineHeight: 1.7 }}>
              💡 過程中請不要關頁面或重整<br/>
              建議在網路穩定時使用
            </div>
          </>
        )}
      </Card>

      {/* 🖼 訂單圖片遷移工具(通常是 Egress 主因) */}
      <div style={{ fontWeight: 700, fontSize: 16, color: C.red, marginTop: 4 }}>📦 訂單圖片遷移工具 <span style={{ fontSize: 11, color: C.muted, fontWeight: 400 }}>(通常是流量爆量的主因)</span></div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
          客人加入購物車時,商品圖會被整包複製存進那筆訂單裡。如果複製當下商品圖還是 base64,這張圖就會卡在訂單裡——而訂單被讀取的頻率遠比商品高,通常才是流量爆量的真正原因。這個工具會把「已經存在的訂單」裡卡住的 base64 圖片,轉存到 Storage。
        </div>

        {ordersWithBase64Images.length === 0 && !migratingOrders ? (
          <div style={{ padding: "20px", background: C.greenBg, borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>✅</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark }}>訂單裡沒有 base64 圖片了</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>不需要遷移</div>
          </div>
        ) : (
          <>
            {!migratingOrders && (
              <div style={{ padding: "14px 16px", background: C.redBg, borderRadius: 10, marginBottom: 12, border: `1.5px solid ${C.red}40` }}>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 700, marginBottom: 8 }}>📊 待遷移統計</div>
                <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.textMid, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ color: C.muted }}>受影響訂單:</span>
                    <span style={{ fontWeight: 700, color: C.red, marginLeft: 4 }}>{ordersWithBase64Images.length} 筆</span>
                  </div>
                  <div>
                    <span style={{ color: C.muted }}>圖片張數:</span>
                    <span style={{ fontWeight: 700, color: C.red, marginLeft: 4 }}>{base64ImageItemCount} 張</span>
                  </div>
                  <div>
                    <span style={{ color: C.muted }}>總大小:</span>
                    <span style={{ fontWeight: 700, color: C.red, marginLeft: 4 }}>{orderBase64Size} MB</span>
                  </div>
                </div>
              </div>
            )}

            {migratingOrders && (
              <div style={{ padding: "14px 16px", background: C.accentBg, borderRadius: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.accentDark }}>
                    處理中 {migrateOrdersProgress.current} / {migrateOrdersProgress.total} 筆訂單
                  </span>
                  <span style={{ fontSize: 11, color: C.muted }}>
                    ✅ {migrateOrdersProgress.done}  ❌ {migrateOrdersProgress.failed}  ⏭ {migrateOrdersProgress.skipped}
                  </span>
                </div>
                <div style={{ height: 8, background: "#fff", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${(migrateOrdersProgress.current / Math.max(migrateOrdersProgress.total, 1)) * 100}%`, height: "100%", background: C.accent, transition: "width .3s" }}></div>
                </div>
              </div>
            )}

            {migrateOrdersLog.length > 0 && (
              <details style={{ marginBottom: 12 }} open={migratingOrders}>
                <summary style={{ fontSize: 12, color: C.muted, cursor: "pointer", padding: "6px 0" }}>
                  📋 詳細日誌 ({migrateOrdersLog.length} 條)
                </summary>
                <div style={{ maxHeight: 200, overflowY: "auto", padding: "10px 12px", background: C.bgDeep, borderRadius: 8, fontSize: 11, lineHeight: 1.7, fontFamily: "monospace" }}>
                  {migrateOrdersLog.slice(-50).map((l, i) => (
                    <div key={i} style={{ color: l.startsWith("❌") ? C.red : l.startsWith("⏭") ? C.muted : C.greenDark }}>{l}</div>
                  ))}
                </div>
              </details>
            )}

            <button onClick={migrateOrderImages} disabled={migratingOrders || ordersWithBase64Images.length === 0}
              style={{ width: "100%", padding: "12px", background: migratingOrders ? C.faint : `linear-gradient(135deg, ${C.red} 0%, ${C.pinkDark} 100%)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: migratingOrders ? "not-allowed" : "pointer", letterSpacing: .5 }}>
              {migratingOrders ? "遷移中..." : `⚡ 開始遷移 ${ordersWithBase64Images.length} 筆訂單`}
            </button>

            <div style={{ fontSize: 10, color: C.faint, textAlign: "center", marginTop: 10, lineHeight: 1.7 }}>
              💡 過程中請不要關頁面或重整<br/>
              建議先跑上面的「商品/現貨圖片遷移」,再跑這個
            </div>
          </>
        )}
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

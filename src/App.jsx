import { useState, useCallback, useEffect } from "react";
import {
  isConfigured,
  fetchOrders, fetchProducts, fetchInStock, fetchAnnouncements, fetchWishlist, fetchMembers, fetchSettings,
  createOrder,
  updateOrderStatus, updateOrderItems, deleteOrder,
  upsertProduct, deleteProduct,
  upsertInStock, deleteInStock,
  upsertAnnouncement, deleteAnnouncement,
  updateWishStatus,
  updateSetting,
  subscribeToOrders, subscribeToWishlist,
} from './supabase.js';

// ─── 代購連線管理系統 ── 業者後台 ────────────────────────────────
const APP_NAME = "代購連線管理系統";

const C = {
  bg: "#faf6f1", bgDeep: "#f3ede4", surface: "#fffdf9",
  border: "#e8ddd0", borderSoft: "#ede5d8",
  text: "#3a2e24", textMid: "#7a6555", muted: "#b0998a", faint: "#d5c8ba",
  accent: "#b5836a", accentDark: "#8f5f47", accentLight: "#d4a98a", accentBg: "#f5ece3",
  green: "#5a9e72", greenBg: "#edf5f0", greenDark: "#3d7a54",
  yellow: "#c49a3c", yellowBg: "#fdf6e3",
  red: "#c06060", redBg: "#fdf0f0",
  blue: "#6a8caf", blueBg: "#eef3f9",
  purple: "#9b7fb6", purpleBg: "#f5f0f9",
  orange: "#d4894a", orangeBg: "#fdf3eb",
  shadow: "0 2px 16px rgba(90,60,30,0.08)",
  shadowMd: "0 4px 28px rgba(90,60,30,0.12)",
  shadowLg: "0 8px 40px rgba(90,60,30,0.16)",
};

const ORDER_STATUS = {
  pending_review: { label: "待審核", color: C.blue,   bg: C.blueBg,   icon: "📋" },
  pending:        { label: "待購買", color: C.orange,  bg: C.orangeBg, icon: "⏳" },
  bought:         { label: "已買到", color: C.green,   bg: C.greenBg,  icon: "✅" },
  shipped:        { label: "已寄出", color: C.purple,  bg: C.purpleBg, icon: "🚚" },
  arrived:        { label: "已到台灣",color: C.accent, bg: C.accentBg, icon: "📦" },
  cancelled:      { label: "已取消", color: C.red,     bg: C.redBg,    icon: "❌" },
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
    { id: "s1", name: "Hello Kitty 扭蛋 草莓款", price: 350, image: "🎀", status: "on" },
    { id: "s2", name: "Sanrio 扭蛋 新款",         price: 280, image: "⭐", status: "on" },
  ],
  orders: [
    { id: "o1", no: "7346", customerId: "c1", customerName: "曉曉", status: "cancelled",     items: [{ name: "🇯🇵 7-11代購",   cost: 32,   price: 39,   qty: 1, note: "" }], total: 39,   profit: 7,   createdAt: "2026-04-16" },
    { id: "o2", no: "7301", customerId: "c2", customerName: "Mina", status: "bought",        items: [{ name: "資生堂防曬乳",   cost: 560,  price: 728,  qty: 1, note: "" }], total: 728,  profit: 168, createdAt: "2026-04-14" },
    { id: "o3", no: "7298", customerId: "c3", customerName: "小雨", status: "pending_review",items: [{ name: "Nike Air Max 2024", cost: 3120, price: 3800, qty: 1, note: "白色 25cm" }], total: 3800, profit: 680, createdAt: "2026-04-13" },
  ],
  wishlist: [
    { id: "w1", customerId: "c1", customerName: "曉曉", name: "限定版茶杯組",   note: "京都限定款", status: "searching" },
    { id: "w2", customerId: "c2", customerName: "Mina", name: "Sanrio 扭蛋 新款", note: "",         status: "found" },
  ],
  announcements: [
    { id: "an1", title: "第一天（4/21）行程公告", content: "🍒 藥妝 711 吉伊卡哇手遊 高島屋土產\n✨ 08:00 SUGI藥妝（美妝為主）\n大國藥妝（藥品為主）\n── 停留1小時 ──\n✨ 09:10 7-11（拍拍零食）\n── 停留30分鐘 ──\n✨ 09:45 唐吉軻德（拍照+採買）\n── 停留1小時 ──\n✨ 11:00 難波丸井百貨\n── 停留2.5小時 ──\n✨ 21:00 扭蛋店開扭（會扭到關門23:00）" }
  ],
};

// ─── Styles ──────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("ad-styles")) return;
  const s = document.createElement("style");
  s.id = "ad-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;900&family=DM+Serif+Display:ital@0;1&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${C.bg};color:${C.text};font-family:'Noto Sans TC',sans-serif;min-height:100vh}
    ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:${C.faint};border-radius:99px}
    input,select,textarea,button{font-family:inherit;outline:none}
    .fade{animation:fadeUp .3s cubic-bezier(.16,1,.3,1) both}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    .tab-ul{border-bottom:2px solid ${C.border};display:flex;overflow-x:auto;scrollbar-width:none}
    .tab-ul::-webkit-scrollbar{display:none}
    .tab-btn{padding:10px 16px;border:none;background:transparent;color:${C.muted};font-weight:600;font-size:14px;white-space:nowrap;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .18s}
    .tab-btn.active{color:${C.accentDark};border-bottom-color:${C.accent}}
    .pill{display:inline-flex;align-items:center;gap:4px;padding:3px 11px;border-radius:99px;font-size:12px;font-weight:700}
    .row-hover:hover{background:${C.bgDeep}!important}
    @keyframes shakeX{0%,100%{transform:none}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
  `;
  document.head.appendChild(s);
};

// ─── Atoms ───────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const s = ORDER_STATUS[status] || ORDER_STATUS.pending;
  return <span className="pill" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}25` }}>{s.icon} {s.label}</span>;
};

const Btn = ({ children, onClick, variant = "primary", sm, style: sx, disabled }) => {
  const v = {
    primary: { background: C.accent, color: "#fff", border: "none", boxShadow: `0 2px 8px ${C.accent}40` },
    soft:    { background: C.accentBg, color: C.accentDark, border: `1.5px solid ${C.accentLight}50` },
    ghost:   { background: "transparent", color: C.muted, border: `1.5px solid ${C.border}` },
    danger:  { background: C.redBg, color: C.red, border: `1.5px solid ${C.red}30` },
    success: { background: C.greenBg, color: C.greenDark, border: `1.5px solid ${C.green}30` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: sm ? "6px 14px" : "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: sm ? 13 : 14, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all .16s", ...v[variant], ...sx }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.opacity = ".82"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
      onMouseLeave={e => { e.currentTarget.style.opacity = disabled ? ".5" : "1"; e.currentTarget.style.transform = "none"; }}
    >{children}</button>
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
        <button onClick={onClose} style={{ background: C.bgDeep, border: "none", color: C.muted, width: 30, height: 30, borderRadius: "50%", fontSize: 18 }}>×</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Toast = ({ msg, onDone }) => {
  useState(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); });
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
function exportCSV(orders) {
  const header = ["訂單號","客人","商品","數量","成本","售價","利潤","狀態","日期"];
  const rows = orders.map(o => [
    "#" + sanitize(o.no),
    sanitize(o.customerName),
    o.items.map(i => sanitize(i.name)).join("／"),
    o.items.reduce((s,i)=>s+i.qty,0),
    o.items.reduce((s,i)=>s+(i.cost||0)*i.qty,0),
    o.total, o.profit,
    ORDER_STATUS[o.status]?.label || o.status,
    sanitize(o.createdAt),
  ]);
  const csv = [header,...rows].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF"+csv], {type:"text/csv;charset=utf-8;"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `訂單匯出_${new Date().toLocaleDateString("zh-TW").replace(/\//g,"-")}.csv`;
  a.click();
  logAction("匯出CSV", `匯出 ${orders.length} 筆訂單`);
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

  // Countdown timer for lockout display
  useState(() => {
    const interval = setInterval(() => {
      const s = loginLimiter.check();
      if (s.locked) {
        setLockInfo({ locked: true, remaining: s.remaining, attemptsLeft: 0 });
      } else if (lockInfo.locked) {
        setLockInfo(prev => ({ ...prev, locked: false }));
        setError("");
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const login = async () => {
    if (loading) return;
    const check = loginLimiter.check();
    if (check.locked) {
      setError(`帳號已鎖定，請等待 ${check.remaining} 秒後再試`);
      return;
    }

    const cleanAccount = sanitize(account);
    if (!cleanAccount || !password) { setError("請填寫帳號與密碼"); return; }

    setLoading(true);

    // Simulate async hash comparison (real app would call backend)
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200)); // timing randomization

    const pwHash = await hashPassword(password);
    const expectedHash = await hashPassword(credentials.password);
    const accountMatch = cleanAccount === credentials.account;
    const passwordMatch = pwHash === expectedHash;

    if (accountMatch && passwordMatch) {
      loginLimiter.succeed();
      logAction("登入成功", `帳號：${cleanAccount}`);
      setLoading(false);
      onSuccess();
    } else {
      const result = loginLimiter.fail();
      logAction("登入失敗", `帳號嘗試：${cleanAccount}`);
      setShake(true); setTimeout(() => setShake(false), 500);
      if (result.locked) {
        setError(`嘗試次數過多，帳號已鎖定 5 分鐘`);
        setLockInfo({ locked: true, remaining: 300, attemptsLeft: 0 });
      } else {
        setError(`帳號或密碼錯誤（剩餘 ${result.attemptsLeft} 次機會）`);
        setLockInfo(prev => ({ ...prev, attemptsLeft: result.attemptsLeft }));
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: `${C.accentLight}25`, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `${C.yellow}15`, pointerEvents: "none" }} />

      <div className="fade" style={{ width: "100%", maxWidth: 400, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 24, boxShadow: C.shadowLg, overflow: "hidden", animation: shake ? "shakeX .4s ease" : undefined }}>
        <div style={{ background: `linear-gradient(135deg, ${C.accentDark}, ${C.accent})`, padding: "36px 28px 30px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 10, userSelect: "none" }}>👑</div>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: "#fff", fontWeight: 700 }}>{APP_NAME}</div>
          <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13, marginTop: 6 }}>業者管理後台</div>
        </div>

        <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Lockout warning bar */}
          {lockInfo.locked && (
            <div style={{ background: "#fff0f0", border: `1.5px solid ${C.red}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 22 }}>🔒</div>
              <div>
                <div style={{ fontWeight: 700, color: C.red, fontSize: 14 }}>帳號暫時鎖定</div>
                <div style={{ fontSize: 13, color: C.red, marginTop: 2 }}>
                  {lockInfo.remaining > 0 ? `請等待 ${lockInfo.remaining} 秒後再試` : "正在計算…"}
                </div>
              </div>
            </div>
          )}

          {/* Attempt counter */}
          {!lockInfo.locked && lockInfo.attemptsLeft < 5 && lockInfo.attemptsLeft > 0 && (
            <div style={{ background: C.yellowBg, border: `1.5px solid ${C.yellow}30`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.yellow, fontWeight: 600 }}>
              ⚠️ 剩餘 {lockInfo.attemptsLeft} 次登入機會
            </div>
          )}

          <Input label="帳號" value={account} onChange={v => { setAccount(sanitize(v)); setError(""); }} placeholder="輸入管理員帳號" />

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>密碼</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && !lockInfo.locked && login()}
                placeholder="輸入密碼"
                disabled={lockInfo.locked || loading}
                maxLength={128}
                autoComplete="current-password"
                style={{ width: "100%", background: lockInfo.locked ? C.bgDeep : C.bg, border: `1.5px solid ${error ? C.red : C.border}`, borderRadius: 10, padding: "9px 40px 9px 13px", color: C.text, fontSize: 14, cursor: lockInfo.locked ? "not-allowed" : "text" }}
                onFocus={e => { if (!error) { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`; } }}
                onBlur={e => { e.target.style.borderColor = error ? C.red : C.border; e.target.style.boxShadow = "none"; }}
              />
              <button onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, fontSize: 16, cursor: "pointer" }}>{showPw ? "🙈" : "👁"}</button>
            </div>
          </div>

          {error && <div style={{ background: C.redBg, border: `1.5px solid ${C.red}30`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.red, fontWeight: 600 }}>⚠️ {error}</div>}

          <Btn
            onClick={login}
            disabled={lockInfo.locked || loading}
            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 4 }}
          >
            {loading
              ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> 驗證中…</>
              : lockInfo.locked ? "🔒 已鎖定" : "登入後台"}
          </Btn>

          {/* Security notice */}
          <div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1.6, marginTop: 4, padding: "10px 0 0", borderTop: `1px solid ${C.border}` }}>
            🛡️ 連續錯誤 5 次將鎖定 5 分鐘<br/>
            登入後 30 分鐘無操作將自動登出
          </div>

          {/* Default credentials hint */}
          <div style={{ background: C.yellowBg, border: `1.5px solid ${C.yellow}40`, borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.yellow, fontWeight: 700, marginBottom: 6 }}>預設帳號資訊</div>
            <div style={{ fontSize: 13, color: C.textMid, display: "flex", justifyContent: "center", gap: 20 }}>
              <span>帳號：<strong>admin</strong></span>
              <span>密碼：<strong>1234</strong></span>
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>登入後請至「帳號設定」修改密碼</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────
// Normalize Supabase order row to admin's expected format
const normOrder = o => ({
  ...o,
  customerId:   o.customer_line_id || o.customerId || "",
  customerName: o.customer_name    || o.customerName || "",
  createdAt:    (o.created_at || o.createdAt || "").split("T")[0],
});

function AdminDashboard({ data, setData, credentials, setCredentials, onLogout }) {
  const [tab, setTab] = useState("orders");
  const [toast, setToast] = useState(null);
  const showToast = useCallback(msg => setToast(msg), []);

  // ── 載入 Supabase 資料 ───────────────────────────────────────
  useEffect(() => {
    if (!isConfigured) return; // 使用展示資料
    async function load() {
      try {
        const [orders, products, inStock, announcements, wishlist, members, settings] = await Promise.all([
          fetchOrders(), fetchProducts(), fetchInStock(),
          fetchAnnouncements(), fetchWishlist(), fetchMembers(), fetchSettings(),
        ]);
        const customers = (members||[]).map(m => ({
          id: m.line_user_id, name: m.name||"", phone: m.phone||"",
          address: "", level: "白銀",
        }));
        setData(d => ({
          ...d,
          rate: Number(settings?.value || d.rate),
          orders: orders.map(normOrder),
          products, inStock, announcements, wishlist, customers,
        }));
      } catch(e) { console.error("後台載入失敗:", e); }
    }
    load();

    // 即時訂閱新訂單
    const orderSub = subscribeToOrders(payload => {
      if (payload.eventType === "INSERT") {
        setData(d => ({ ...d, orders: [normOrder(payload.new), ...d.orders] }));
        setToast("🔔 收到新訂單！");
      }
      if (payload.eventType === "UPDATE") {
        setData(d => ({ ...d, orders: d.orders.map(o => o.id === payload.new.id ? normOrder(payload.new) : o) }));
      }
      if (payload.eventType === "DELETE") {
        setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== payload.old.id) }));
      }
    });
    const wishSub = subscribeToWishlist(payload => {
      if (payload.eventType === "INSERT") {
        setData(d => ({ ...d, wishlist: [payload.new, ...d.wishlist] }));
        setToast("⭐ 新許願！");
      }
    });
    return () => { orderSub.unsubscribe(); wishSub.unsubscribe(); };
  }, []);

  // ── Session timeout ──────────────────────────────────────────
  const [sessionWarning, setSessionWarning] = useState(false);
  const WARNING_MS = 25 * 60 * 1000; // warn at 25 min
  const TIMEOUT_MS = 30 * 60 * 1000; // logout at 30 min

  useState(() => {
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
  });

  const totalOrders = data.orders.length;
  const pendingBuy  = data.orders.filter(o => o.status === "pending").length;
  const bought      = data.orders.filter(o => o.status === "bought").length;
  const profit      = data.orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.profit, 0);

  const TABS = [
    { id: "orders",        label: "訂單管理" },
    { id: "review",        label: "審核" },
    { id: "catalog",       label: "賣場管理" },
    { id: "instock",       label: "🏪 現貨" },
    { id: "wishlist",      label: "許願清單" },
    { id: "announcements", label: "📢 公告管理" },
    { id: "rate",          label: "匯率設定" },
    { id: "customers",     label: "客人管理" },
    { id: "settings",      label: "🔐 帳號設定" },
    { id: "auditlog",      label: "🛡️ 操作日誌" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {/* Session warning banner */}
      {sessionWarning && (
        <div style={{ background: C.yellow, color: "#fff", padding: "10px 20px", textAlign: "center", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          ⏰ 已閒置 25 分鐘，5 分鐘後將自動登出
          <button onClick={() => { setSessionWarning(false); }} style={{ background: "rgba(255,255,255,.3)", border: "none", color: "#fff", padding: "4px 12px", borderRadius: 99, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>繼續工作</button>
        </div>
      )}

      {/* Top bar */}
      <div style={{ background: C.surface, borderBottom: `1.5px solid ${C.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: sessionWarning ? 45 : 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.yellowBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👑</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.accentDark, fontFamily: "'DM Serif Display',serif" }}>{APP_NAME}</div>
            <div style={{ fontSize: 11, color: C.muted }}>登入：{credentials.account}</div>
          </div>
        </div>
        <Btn sm variant="danger" onClick={() => { logAction("手動登出"); onLogout(); }}>登出</Btn>
      </div>

      {/* Tabs */}
      <div className="tab-ul" style={{ padding: "0 16px", background: C.surface, position: "sticky", top: sessionWarning ? 114 : 69, zIndex: 40 }}>
        {TABS.map(t => <button key={t.id} className={`tab-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {/* Stats */}
      <div style={{ padding: "16px 16px 8px", display: "flex", gap: 10 }}>
        {[
          { icon: "📋", val: totalOrders, label: "總訂單" },
          { icon: "⏳", val: pendingBuy,  label: "待購買",  color: C.orange },
          { icon: "✅", val: bought,      label: "已買到",  color: C.green  },
          { icon: "💰", val: `$${profit}`, label: "預估利潤", color: C.accent },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "12px 10px", textAlign: "center", boxShadow: C.shadow }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: s.color || C.text, fontFamily: "'DM Serif Display',serif" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Page content */}
      <div style={{ padding: "8px 16px 60px" }}>
        {tab === "orders"        && <OrdersPage        data={data} setData={setData} toast={showToast} />}
        {tab === "review"        && <ReviewPage        data={data} setData={setData} toast={showToast} />}
        {tab === "catalog"       && <CatalogPage       data={data} setData={setData} toast={showToast} />}
        {tab === "instock"       && <InStockPage       data={data} setData={setData} toast={showToast} />}
        {tab === "wishlist"      && <WishlistPage      data={data} setData={setData} toast={showToast} />}
        {tab === "announcements" && <AnnouncementsPage data={data} setData={setData} toast={showToast} />}
        {tab === "rate"          && <RatePage          data={data} setData={setData} toast={showToast} />}
        {tab === "customers"     && <CustomersPage     data={data} />}
        {tab === "settings"      && <SettingsPage      credentials={credentials} setCredentials={setCredentials} toast={showToast} onLogout={onLogout} />}
        {tab === "auditlog"      && <AuditLogPage />}
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────
function OrdersPage({ data, setData, toast }) {
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const STATUS_KEYS = ["all","pending_review","pending","bought","shipped","arrived","cancelled"];
  const filtered = data.orders.filter(o => filter === "all" || o.status === filter);

  const updateStatus = async (id, status) => {
    const safeS = safeStatus(status);
    const o = data.orders.find(x => x.id === id);
    setData(d => ({ ...d, orders: d.orders.map(o => o.id === id ? { ...o, status: safeS } : o) }));
    logAction("更新訂單狀態", `#${o?.no} → ${ORDER_STATUS[safeS]?.label}`);
    if (isConfigured) { try { await updateOrderStatus(id, safeS); } catch(e) { toast("⚠️ 狀態同步失敗"); } }
    toast("狀態已更新");
  };
  const del = async (id) => {
    if (!window.confirm("確定刪除？")) return;
    setData(d => ({ ...d, orders: d.orders.filter(o => o.id !== id) }));
    if (isConfigured) { try { await deleteOrder(id); } catch(e) { toast("⚠️ 刪除同步失敗"); } }
    toast("已刪除");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>訂單管理</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn sm variant="success" onClick={() => { exportCSV(data.orders); toast("CSV 已匯出 📊"); }}>📊 匯出 CSV</Btn>
          <Btn sm onClick={() => setShowAdd(true)}>＋ 新增訂單</Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {STATUS_KEYS.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: "5px 12px", borderRadius: 99, border: `1.5px solid ${filter===s?C.accent:C.border}`, background: filter===s?C.accentBg:"transparent", color: filter===s?C.accentDark:C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {s === "all" ? "全部" : ORDER_STATUS[s]?.label}
          </button>
        ))}
      </div>
      {filtered.map(o => (
        <div key={o.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, overflow: "hidden", boxShadow: C.shadow }}>
          <div style={{ padding: "13px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>#{o.no} · {o.customerName}</div>
                <div style={{ fontWeight: 700 }}>{o.items[0]?.name}{o.items.length > 1 ? ` 等${o.items.length}件` : ""}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <StatusBadge status={o.status} />
                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ background: C.bgDeep, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 12, color: C.text, cursor: "pointer" }}>
                  {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.muted }}>{o.items.map(it => `${it.name} ×${it.qty}${it.note?`（${it.note}）`:""}`).join("・")}</div>
          </div>
          <div style={{ background: C.bgDeep, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13 }}>
              <span style={{ color: C.muted }}>成本 {fmtMoney(o.items.reduce((s,it)=>s+it.cost*it.qty,0))}</span>
              <span style={{ margin: "0 8px", color: C.faint }}>·</span>
              <span>售 {fmtMoney(o.total)}</span>
              <span style={{ margin: "0 8px", color: C.faint }}>·</span>
              <span style={{ color: C.green, fontWeight: 700 }}>↑ {fmtMoney(o.profit)}</span>
            </div>
            <button onClick={() => del(o.id)} style={{ background: C.redBg, border: "none", color: C.red, width: 30, height: 30, borderRadius: 8, fontSize: 15, cursor: "pointer" }}>🗑</button>
          </div>
          <div style={{ padding: "4px 14px 10px", fontSize: 11, color: C.muted }}>更新：{o.createdAt}</div>
        </div>
      ))}
      {showAdd && <AddOrderModal data={data} setData={setData} onClose={() => setShowAdd(false)} toast={toast} />}
    </div>
  );
}

function AddOrderModal({ data, setData, onClose, toast }) {
  const [customerId, setCustomerId] = useState(data.customers[0]?.id || "");
  const [name, setName] = useState(""); const [cost, setCost] = useState(""); const [price, setPrice] = useState(""); const [qty, setQty] = useState("1"); const [note, setNote] = useState("");
  const save = async () => {
    const cleanName = sanitize(name);
    const cleanNote = sanitize(note);
    if (!cleanName || !price) return alert("請填寫商品名稱和售價");
    const costNum = Math.max(0, Number(cost) || 0);
    const priceNum = Math.max(0, Number(price) || 0);
    const qtyNum = Math.max(1, Math.min(999, Number(qty) || 1));
    const c = data.customers.find(x => x.id === customerId);
    if (!c) return alert("請選擇有效客人");
    const newId = secureUid();
    const newNo = String(Math.floor(Math.random() * 9000) + 1000);
    const items = [{ name: cleanName, cost: costNum, price: priceNum, qty: qtyNum, note: cleanNote }];
    const o = {
      id: newId, no: newNo,
      customer_line_id: customerId, customer_name: sanitize(c.name),
      customerId, customerName: sanitize(c.name),
      status: "pending", items,
      total: priceNum * qtyNum, profit: (priceNum - costNum) * qtyNum,
      createdAt: today(),
    };
    if (isConfigured) {
      try {
        const saved = await createOrder({ id: newId, no: newNo, customer_line_id: customerId, customer_name: sanitize(c.name), status: "pending", items, total: priceNum * qtyNum, profit: (priceNum - costNum) * qtyNum });
        setData(d => ({ ...d, orders: [normOrder(saved), ...d.orders] }));
      } catch(e) { toast("⚠️ 新增失敗"); return; }
    } else {
      setData(d => ({ ...d, orders: [o, ...d.orders] }));
    }
    logAction("新增訂單", `${c.name} · ${cleanName}`);
    toast("訂單已新增 ✨"); onClose();
  };
  return (
    <Modal title="新增訂單" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>客人</label>
          <select value={customerId} onChange={e => setCustomerId(e.target.value)} style={{ width: "100%", marginTop: 5, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", color: C.text, fontSize: 14 }}>
            {data.customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <Input label="商品名稱 *" value={name} onChange={setName} placeholder="資生堂防曬乳 SPF50" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Input label="成本"   type="number" value={cost}  onChange={setCost}  placeholder="560" />
          <Input label="售價 *" type="number" value={price} onChange={setPrice} placeholder="728" />
          <Input label="數量"   type="number" value={qty}   onChange={setQty} />
        </div>
        <Input label="備註" value={note} onChange={setNote} placeholder="顏色、尺寸…" />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={onClose}>取消</Btn>
          <Btn onClick={save}>建立訂單</Btn>
        </div>
      </div>
    </Modal>
  );
}

function ReviewPage({ data, setData, toast }) {
  const pending = data.orders.filter(o => o.status === "pending_review");
  const approve = id => {
    const o = data.orders.find(x => x.id === id);
    setData(d => ({ ...d, orders: d.orders.map(o => o.id===id?{...o,status:"pending"}:o) }));
    logAction("審核通過", `訂單 #${o?.no} · ${o?.customerName}`);
    toast("已審核通過 ✅");
  };
  const reject = id => {
    const o = data.orders.find(x => x.id === id);
    setData(d => ({ ...d, orders: d.orders.map(o => o.id===id?{...o,status:"cancelled"}:o) }));
    logAction("拒絕訂單", `訂單 #${o?.no} · ${o?.customerName}`);
    toast("已拒絕");
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
  const [editing, setEditing] = useState(null); // product being edited

  const toggle = async id => {
    const p = data.products.find(x => x.id === id);
    const next = { ...p, status: p.status === "on" ? "off" : "on" };
    setData(d => ({ ...d, products: d.products.map(x => x.id===id ? next : x) }));
    if (isConfigured) { try { await upsertProduct(next); } catch(e) { toast("⚠️ 同步失敗"); } }
  };
  const del = async id => {
    if (!window.confirm("確定刪除？")) return;
    setData(d => ({ ...d, products: d.products.filter(p=>p.id!==id) }));
    if (isConfigured) { try { await deleteProduct(id); } catch(e) { toast("⚠️ 刪除同步失敗"); } }
    toast("已刪除");
  };
  const saveNew = async (prod) => {
    setData(d => ({ ...d, products: [prod, ...d.products] }));
    if (isConfigured) { try { await upsertProduct(prod); } catch(e) { toast("⚠️ 新增同步失敗"); } }
    toast("商品已新增"); setShowAdd(false);
  };
  const saveEdit = async (prod) => {
    setData(d => ({ ...d, products: d.products.map(p => p.id===prod.id ? prod : p) }));
    if (isConfigured) { try { await upsertProduct(prod); } catch(e) { toast("⚠️ 儲存同步失敗"); } }
    toast("已儲存"); setEditing(null);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>賣場管理</div>
        <Btn sm onClick={() => setShowAdd(true)}>＋ 新增商品</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {data.products.map(p => (
          <div key={p.id} style={{ background:C.surface, border:`1.5px solid ${C.border}`, overflow:"hidden", boxShadow:C.shadow }}>
            <div style={{ background:C.bgDeep, padding:"24px 16px 12px", textAlign:"center", position:"relative" }}>
              {p.status==="on" && <span className="pill" style={{ position:"absolute", top:8, left:8, background:C.greenBg, color:C.green, fontSize:11 }}>販售中</span>}
              {p.status==="off"&& <span className="pill" style={{ position:"absolute", top:8, left:8, background:C.redBg,  color:C.red,   fontSize:11 }}>已下架</span>}
              <div style={{ fontSize:28 }}>{p.image || "🛒"}</div>
            </div>
            <div style={{ padding:"10px 12px" }}>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{p.name}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>{p.category}</div>
              {/* Variants preview */}
              {p.variants && p.variants.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
                  {p.variants.map(v => (
                    <span key={v.id} style={{ fontSize:10, color:C.muted, border:`1px solid ${C.border}`, padding:"1px 7px", letterSpacing:.3 }}>{v.name}</span>
                  ))}
                </div>
              )}
              <div style={{ display:"flex", gap:6, marginTop:8 }}>
                <Btn sm variant="soft" onClick={() => setEditing(p)}>✏️ 編輯</Btn>
                <Btn sm variant="ghost" onClick={() => toggle(p.id)}>{p.status==="on"?"下架":"上架"}</Btn>
                <button onClick={() => del(p.id)} style={{ background:"none", border:"none", fontSize:15, cursor:"pointer", color:C.red }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <ProductModal onSave={saveNew} onClose={() => setShowAdd(false)} />}
      {editing && <ProductModal product={editing} onSave={saveEdit} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ProductModal({ product, onSave, onClose }) {
  const isEdit = !!product;
  const [name, setName]       = useState(product?.name || "");
  const [cat, setCat]         = useState(product?.category || "");
  const [price, setPrice]     = useState(String(product?.price || ""));
  const [image, setImage]     = useState(product?.image || "");
  const [variants, setVariants] = useState(product?.variants || []);
  const [vName, setVName]     = useState("");
  const [vPrice, setVPrice]   = useState("");

  const addVariant = () => {
    const n = sanitize(vName, 50); if (!n) return;
    setVariants(vs => [...vs, { id:secureUid(), name:n, price:Number(vPrice)||0 }]);
    setVName(""); setVPrice("");
  };
  const removeVariant = id => setVariants(vs => vs.filter(v => v.id !== id));

  const save = () => {
    const cleanName = sanitize(name, 100);
    if (!cleanName) return alert("請填寫商品名稱");
    const prod = {
      id: product?.id || secureUid(),
      name: cleanName,
      category: sanitize(cat, 50),
      price: Math.max(0, Number(price)||0),
      image: sanitize(image, 10),
      status: product?.status || "on",
      variants,
    };
    onSave(prod);
  };

  return (
    <Modal title={isEdit ? "編輯商品" : "新增賣場商品"} onClose={onClose} wide>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Input label="商品名稱 *" value={name} onChange={setName} placeholder="資生堂防曬乳" />
          <Input label="分類" value={cat} onChange={setCat} placeholder="藥妝" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Input label="定價 NT$（選填）" type="number" value={price} onChange={setPrice} placeholder="0 = 洽詢" />
          <Input label="圖示 Emoji" value={image} onChange={setImage} placeholder="💊" />
        </div>

        {/* Variants */}
        <div style={{ borderTop:`1.5px solid ${C.border}`, paddingTop:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:C.accentDark, marginBottom:10 }}>款式設定</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:12, lineHeight:1.7 }}>
            例如：顏色（紅色、藍色）、尺寸（S / M / L）、口味…等<br/>
            客人下單時可從中選擇
          </div>

          {/* Existing variants */}
          {variants.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
              {variants.map(v => (
                <div key={v.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:C.bgDeep, border:`1px solid ${C.border}` }}>
                  <div style={{ flex:1 }}>
                    <span style={{ fontSize:13, fontWeight:600 }}>{v.name}</span>
                    {v.price > 0 && <span style={{ fontSize:11, color:C.muted, marginLeft:8 }}>+NT${v.price}</span>}
                  </div>
                  <button onClick={() => removeVariant(v.id)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:16 }}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Add variant form */}
          <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
            <Input label="款式名稱" value={vName} onChange={setVName} placeholder="紅色 / M號 / 草莓" style={{ flex:2 }} />
            <Input label="加價 NT$（選填）" type="number" value={vPrice} onChange={setVPrice} placeholder="0" style={{ flex:1 }} />
            <Btn sm variant="soft" onClick={addVariant} style={{ marginBottom:1 }}>+ 新增</Btn>
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

function InStockPage({ data, setData, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const del = async id => {
    setData(d => ({ ...d, inStock: d.inStock.filter(x=>x.id!==id) }));
    if (isConfigured) { try { await deleteInStock(id); } catch(e) { toast("⚠️ 刪除同步失敗"); } }
    toast("已刪除");
  };
  const saveNew = async item => {
    setData(d => ({ ...d, inStock: [item, ...d.inStock] }));
    if (isConfigured) { try { await upsertInStock(item); } catch(e) { toast("⚠️ 新增同步失敗"); } }
    toast("現貨已新增"); setShowAdd(false);
  };
  const saveEdit = async item => {
    setData(d => ({ ...d, inStock: d.inStock.map(x => x.id===item.id ? item : x) }));
    if (isConfigured) { try { await upsertInStock(item); } catch(e) { toast("⚠️ 儲存同步失敗"); } }
    toast("已儲存"); setEditing(null);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div style={{ fontWeight:700, fontSize:16, color:C.accentDark }}>🏪 現貨管理</div>
        <Btn sm onClick={() => setShowAdd(true)}>＋ 新增現貨</Btn>
      </div>

      {data.inStock.map(item => (
        <div key={item.id} style={{ background:C.surface, border:`1.5px solid ${C.border}`, boxShadow:C.shadow }}>
          <div style={{ padding:"13px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:24 }}>{item.image||"🎁"}</div>
              <div>
                <div style={{ fontWeight:700 }}>{item.name}</div>
                <div style={{ fontSize:13, color:C.green, fontWeight:700 }}>{fmtMoney(item.price)}</div>
                {item.variants && item.variants.length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:6 }}>
                    {item.variants.map(v => (
                      <span key={v.id} style={{ fontSize:10, color:C.muted, border:`1px solid ${C.border}`, padding:"1px 7px" }}>{v.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <Btn sm variant="soft" onClick={() => setEditing(item)}>✏️</Btn>
              <button onClick={() => del(item.id)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:15 }}>🗑</button>
            </div>
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
          <Input label="商品名稱 *" value={name}  onChange={setName}  placeholder="Hello Kitty 扭蛋" />
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
  const updateStatus = async (id, status) => {
    setData(d => ({ ...d, wishlist: d.wishlist.map(w => w.id===id ? {...w,status} : w) }));
    if (isConfigured) { try { await updateWishStatus(id, status); } catch(e) { toast("⚠️ 同步失敗"); } }
    toast("已更新");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>許願清單 ({data.wishlist.length})</div>
      {!data.wishlist.length && <Card style={{ textAlign:"center" }}><div style={{ fontSize:40 }}>⭐</div><div style={{ color:C.muted, marginTop:8 }}>還沒有客人許願</div></Card>}
      {data.wishlist.map(w => (
        <Card key={w.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{w.name}</div>
              <div style={{ fontSize: 13, color: C.muted }}>客人：{w.customerName}</div>
              {w.note && <div style={{ fontSize: 12, color: C.muted }}>✏️ {w.note}</div>}
            </div>
            <select value={w.status} onChange={e => updateStatus(w.id, e.target.value)} style={{ background: C.bgDeep, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}>
              <option value="searching">⭐ 許願中</option>
              <option value="found">✅ 找到了</option>
            </select>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AnnouncementsPage({ data, setData, toast }) {
  const [editing, setEditing] = useState(null); // { id, title, content } or "new"
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const startEdit = (ann) => { setEditing(ann.id); setTitle(ann.title); setContent(ann.content); };
  const startNew  = () => { setEditing("new"); setTitle(""); setContent(""); };
  const cancel    = () => { setEditing(null); setTitle(""); setContent(""); };

  const save = async () => {
    if (!title.trim() || !content.trim()) return alert("請填寫標題和內容");
    if (editing === "new") {
      const ann = { id: uid(), title: title.trim(), content: content.trim(), createdAt: today() };
      setData(d => ({ ...d, announcements: [ann, ...d.announcements] }));
      if (isConfigured) { try { await upsertAnnouncement(ann); } catch(e) { toast("⚠️ 新增同步失敗"); } }
      toast("公告已新增 📢");
    } else {
      setData(d => ({ ...d, announcements: d.announcements.map(a => a.id === editing ? { ...a, title: title.trim(), content: content.trim() } : a) }));
      if (isConfigured) {
        try {
          const a = data.announcements.find(x => x.id === editing);
          await upsertAnnouncement({ ...a, title: title.trim(), content: content.trim() });
        } catch(e) { toast("⚠️ 儲存同步失敗"); }
      }
      toast("公告已更新 ✅");
    }
    cancel();
  };

  const del = async (id) => {
    if (!window.confirm("確定刪除此公告？")) return;
    setData(d => ({ ...d, announcements: d.announcements.filter(a => a.id !== id) }));
    if (isConfigured) { try { await deleteAnnouncement(id); } catch(e) { toast("⚠️ 刪除同步失敗"); } }
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

function RatePage({ data, setData, toast }) {
  const [jpy, setJpy] = useState(String(data.rate));
  const [krw, setKrw] = useState("0.024");
  const [usd, setUsd] = useState("32");
  const GACHA = [{ jpy:200, ntd:60 },{ jpy:300, ntd:80 },{ jpy:400, ntd:110 },{ jpy:500, ntd:140 }];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>匯率設定</div>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["🇯🇵 JPY 日幣", jpy, setJpy],["🇰🇷 KRW 韓幣", krw, setKrw],["🇺🇸 USD 美金", usd, setUsd]].map(([label, val, setter]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.muted, fontSize: 13 }}>1 = NT$</span>
                <input type="number" value={val} onChange={e => setter(e.target.value)} style={{ width: 90, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "7px 10px", color: C.text, fontSize: 14 }} />
              </div>
            </div>
          ))}
          <Btn onClick={async () => {
            setData(d => ({ ...d, rate: Number(jpy) }));
            if (isConfigured) { try { await updateSetting("jpy_rate", jpy); } catch(e) { toast("⚠️ 儲存同步失敗"); return; } }
            toast("匯率已儲存 💱");
          }}>儲存匯率</Btn>
        </div>
      </Card>
      <div style={{ fontWeight: 700, fontSize: 15, color: C.accentDark }}>🎰 扭蛋優惠定價</div>
      <Card>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>所有人都享有扭蛋連線優惠價（留蛋殼另加 NT$5）：</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {GACHA.map(g => (
            <div key={g.jpy} style={{ background: C.purpleBg, border: `1.5px solid ${C.purple}25`, borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.purple }}>¥{g.jpy}</div>
              <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4 }}>NT${g.ntd}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CustomersPage({ data }) {
  const [expandedId, setExpandedId] = useState(null);
  const [detailFilter, setDetailFilter] = useState("all");
  const [search, setSearch] = useState("");
  const LEVEL_COLOR = { 鑽石: C.blue, 黃金: C.yellow, 白銀: C.muted };
  const LEVEL_ICON  = { 鑽石: "💎", 黃金: "🥇", 白銀: "🥈" };

  const filtered = data.customers.filter(c =>
    !search.trim() || c.name.includes(search.trim()) || c.phone.includes(search.trim())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>客人管理 ({data.customers.length})</div>

      {/* Search bar */}
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: C.muted, pointerEvents: "none" }}>🔍</span>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setExpandedId(null); }}
          placeholder="搜尋客人姓名或電話…"
          style={{
            width: "100%", background: C.bg, border: `1.5px solid ${C.border}`,
            borderRadius: 10, padding: "9px 14px 9px 36px", color: C.text, fontSize: 14,
            transition: "border .15s",
          }}
          onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`; }}
          onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
        />
        {search && (
          <button onClick={() => { setSearch(""); setExpandedId(null); }} style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: C.faint, border: "none", color: C.muted, width: 20, height: 20,
            borderRadius: "50%", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px 0", color: C.muted, fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          找不到「{search}」相關客人
        </div>
      )}

      <div style={{ fontSize: 13, color: C.muted }}>
        {search ? `找到 ${filtered.length} 位客人` : "點擊客人卡片可展開完整下單明細 👆"}
      </div>

      {filtered.map(c => {
        const orders = data.orders.filter(o => o.customerId === c.id);
        const total  = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
        const col    = LEVEL_COLOR[c.level] || C.muted;
        const isOpen = expandedId === c.id;

        const filteredOrders = detailFilter === "all"
          ? orders
          : orders.filter(o => o.status === detailFilter);

        // Stats for this customer
        const statuses = Object.keys(ORDER_STATUS);
        const statusCounts = statuses.reduce((acc, s) => {
          acc[s] = orders.filter(o => o.status === s).length;
          return acc;
        }, {});

        return (
          <div key={c.id} style={{ background: C.surface, border: `1.5px solid ${isOpen ? C.accent : C.border}`, borderRadius: 18, overflow: "hidden", boxShadow: isOpen ? C.shadowMd : C.shadow, transition: "all .2s" }}>
            {/* Customer header row — clickable */}
            <div
              onClick={() => { setExpandedId(isOpen ? null : c.id); setDetailFilter("all"); }}
              style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? C.accentBg : "transparent", transition: "background .15s" }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${col}20`, border: `2px solid ${col}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: col, fontSize: 19, flexShrink: 0 }}>{c.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{c.phone}</div>
                  <span className="pill" style={{ background: `${col}15`, color: col, fontSize: 11, marginTop: 3 }}>{LEVEL_ICON[c.level]} {c.level}會員</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.muted }}>訂單 / 消費</div>
                  <div style={{ fontWeight: 700, color: C.accentDark }}>{orders.length} 筆 / {fmtMoney(total)}</div>
                </div>
                <div style={{ fontSize: 20, color: C.muted, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}>›</div>
              </div>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div className="fade" style={{ borderTop: `1.5px solid ${C.border}` }}>
                {/* Summary stats bar */}
                <div style={{ padding: "14px 18px", background: C.bgDeep, display: "flex", gap: 8, overflowX: "auto" }}>
                  {[
                    { label: "全部", value: orders.length, key: "all", color: C.text },
                    ...Object.entries(ORDER_STATUS).map(([k, v]) => ({ label: v.label, value: statusCounts[k], key: k, color: v.color, icon: v.icon }))
                  ].filter(s => s.value > 0 || s.key === "all").map(s => (
                    <button key={s.key} onClick={() => setDetailFilter(s.key)} style={{
                      flexShrink: 0, background: detailFilter === s.key ? C.surface : "transparent",
                      border: `1.5px solid ${detailFilter === s.key ? C.accent : C.border}`,
                      borderRadius: 10, padding: "6px 12px", cursor: "pointer", textAlign: "center", transition: "all .15s",
                    }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{s.icon ? `${s.icon} ` : ""}{s.label}</div>
                    </button>
                  ))}
                </div>

                {/* Orders list */}
                <div style={{ padding: "12px 18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {filteredOrders.length === 0 && (
                    <div style={{ textAlign: "center", padding: 24, color: C.muted, fontSize: 14 }}>此狀態沒有訂單</div>
                  )}
                  {filteredOrders.map(o => (
                    <div key={o.id} style={{ background: C.bg, borderRadius: 14, border: `1.5px solid ${C.border}`, overflow: "hidden" }}>
                      {/* Order header */}
                      <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>#{o.no} · {o.createdAt}</div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>
                            {o.items[0]?.name}{o.items.length > 1 ? ` 等 ${o.items.length} 件` : ""}
                          </div>
                        </div>
                        <StatusBadge status={o.status} />
                      </div>

                      {/* Item breakdown */}
                      <div style={{ margin: "0 14px", background: C.surface, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
                        {o.items.map((it, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 13px", borderBottom: i < o.items.length - 1 ? `1px solid ${C.borderSoft}` : "none" }}>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</div>
                              {it.note && <div style={{ fontSize: 11, color: C.muted }}>備註：{it.note}</div>}
                            </div>
                            <div style={{ textAlign: "right", fontSize: 13 }}>
                              <div style={{ color: C.muted }}>×{it.qty}</div>
                              <div style={{ fontWeight: 700 }}>{fmtMoney(it.price * it.qty)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 12, color: C.muted }}>
                          成本 {fmtMoney(o.items.reduce((s,it)=>s+(it.cost||0)*it.qty,0))}
                          <span style={{ margin: "0 6px", color: C.faint }}>·</span>
                          <span style={{ color: C.green, fontWeight: 600 }}>利潤 {fmtMoney(o.profit||0)}</span>
                        </div>
                        <div style={{ fontWeight: 700, color: C.accentDark }}>{fmtMoney(o.total)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer total summary */}
                <div style={{ margin: "0 18px 16px", background: C.accentBg, borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", border: `1.5px solid ${C.accentLight}40` }}>
                  <div style={{ fontSize: 13, color: C.accentDark, fontWeight: 600 }}>💰 消費總計（不含取消）</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark, fontFamily: "'DM Serif Display',serif" }}>{fmtMoney(total)}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
      <div style={{ fontWeight: 700, fontSize: 16, color: C.accentDark }}>🔐 帳號密碼設定</div>
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
  const [data, setData] = useState(INIT_DATA);
  const [credentials, setCredentials] = useState({ account: "admin", password: "1234" });
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginPage credentials={credentials} onSuccess={() => setLoggedIn(true)} />;
  return <AdminDashboard data={data} setData={setData} credentials={credentials} setCredentials={setCredentials} onLogout={() => setLoggedIn(false)} />;
}

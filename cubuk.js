/* duo-cubuk e255e146 2026-11-27T13:24 */
(function () {
var C = {"kapali":false,"sure":4000,"bg":"#ffffff","fg":"#1a1a1a","vurgu":"#1a1a1a","kenar":"#ebebeb","buyukHarf":true,"oklar":false,"yapiskan":true,"mesajlar":[{"m":"**Efsane Cuma** [[· %50'ye varan ]]· {sayac}","l":"/outlet","bas":"","bit":"2026-11-30T23:59:00+03:00"},{"m":"Peşin fiyatına 4 taksit","l":"","bas":"","bit":""},{"m":"4.500 ₺ ve üzeri ücretsiz teslimat","l":"","bas":"","bit":""}]};
if (C.kapali || window.__dcb) return; window.__dcb = 1;
var simdi = Date.now(), L = C.mesajlar.filter(function (x) {
if (!x.m) return false; if (x.bas && simdi < Date.parse(x.bas)) return false; if (x.bit && simdi > Date.parse(x.bit)) return false; return true; });
if (!L.length) return;
function ek(ad, v) { try { (window.dataLayer = window.dataLayer || []).push({ event: ad, duyuru_metni: String(v).replace(/\*\*|\[\[|\]\]/g, '').replace(/\s*\{sayac\}/g, '') }); } catch (e) {} }
var sayaclar = [], p2 = function (n) { return (n < 10 ? '0' : '') + n; }, ETK = ['GÜN', 'SA', 'DK', 'SN'];
function yaz(e, m, bit) { m.split('**').forEach(function (p, k) { if (!p) return; var h = e; if (k % 2) { h = document.createElement('b'); e.appendChild(h); }
p.split('{sayac}').forEach(function (q, j) { if (j && bit) { var s = document.createElement('span'); s.className = 'dcb-say'; s.setAttribute('data-bit', bit);
s.n = ETK.map(function (x, z) { var g = document.createElement('i'), r = document.createElement('span'), t = document.createElement('small'); g.className = 'dcb-g dcb-g' + z; r.className = 'dcb-r'; t.textContent = x; g.appendChild(r); g.appendChild(t); s.appendChild(g); return r; });
h.appendChild(s); sayaclar.push(s); } if (q) q.split(/\[\[|\]\]/).forEach(function (u, w) { if (!u) return; if (w % 2) { var z = document.createElement('span'); z.className = 'dcb-uz'; z.textContent = u; h.appendChild(z); } else h.appendChild(document.createTextNode(u)); }); }); }); }
function say() { var n = Date.now(); sayaclar.forEach(function (s) { var t = Math.max(0, Date.parse(s.getAttribute('data-bit')) - n), v = [Math.floor(t / 864e5), Math.floor(t / 36e5) % 24, Math.floor(t / 6e4) % 60, Math.floor(t / 1e3) % 60];
s.n[0].parentNode.style.display = v[0] ? '' : 'none'; v.forEach(function (x, z) { var y = z ? p2(x) : String(x); if (s.n[z].textContent !== y) s.n[z].textContent = y; }); }); }
function kur() {
if (document.getElementById('dcb')) return;
var st = document.createElement('style'); st.id = 'dcb-st';
var Y = C.yapiskan !== false;
st.textContent = (Y ? '#dcb-yer{height:34px}@media (max-width:480px){#dcb-yer{height:32px}}@media (min-width:768px){.detaySticky.fixed{top:34px!important}}' : '') + '#dcb{' + (Y ? 'position:fixed;top:0;left:0;right:0;z-index:1001;' : 'position:relative;z-index:1;') + 'background:' + C.bg + ';color:' + C.fg + ';height:34px;display:flex;align-items:center;justify-content:center;font-family:inherit;font-size:11px;font-weight:400;line-height:1;letter-spacing:.16em;' + (C.buyukHarf ? 'text-transform:uppercase;' : '') + 'overflow:hidden;contain:layout paint style;border-bottom:1px solid ' + C.kenar + ';box-sizing:border-box}' +
'#dcb .dcb-m{position:absolute;left:16px;right:16px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:0;transition:opacity .6s ease;pointer-events:none;color:inherit;text-decoration:none}' +
'#dcb .dcb-m.on{opacity:1;pointer-events:auto}#dcb.ok .dcb-m{left:44px;right:44px}#dcb .dcb-m b{font-weight:500;color:' + C.vurgu + '}' +
'#dcb button{position:absolute;top:0;bottom:0;width:40px;border:0;background:transparent;color:inherit;cursor:pointer;opacity:.4;padding:0}' +
'#dcb button::before{content:"";position:absolute;top:50%;left:50%;width:5px;height:5px;border:solid currentColor;border-width:0 0 1px 1px}' +
'#dcb .dcb-p::before{transform:translate(-30%,-50%) rotate(45deg)}#dcb .dcb-n::before{transform:translate(-70%,-50%) rotate(-135deg)}' +
'#dcb button:hover,#dcb button:focus-visible{opacity:.9}#dcb .dcb-p{left:0}#dcb .dcb-n{right:0}' +
'#dcb .dcb-say{display:inline-flex;align-items:baseline;gap:9px;margin-left:2px}#dcb .dcb-g{font-style:normal;display:inline-flex;align-items:baseline;gap:3px}#dcb .dcb-r{color:' + (C.sayacRenk || '#c8302c') + ';font-weight:600;font-size:12.5px;letter-spacing:.04em;font-variant-numeric:tabular-nums}#dcb .dcb-g small{font-size:8px;letter-spacing:.14em;opacity:.6}' +
'#dcb a.dcb-m:hover{text-decoration:underline;text-underline-offset:3px}#dcb button:focus-visible{outline:1px solid ' + C.fg + ';outline-offset:-4px}' +
'@media (max-width:480px){#dcb{height:32px;font-size:10.5px;letter-spacing:.12em}#dcb .dcb-m{left:14px;right:14px}#dcb.ok .dcb-m{left:30px;right:30px}#dcb button{width:30px}#dcb .dcb-uz{display:none}#dcb .dcb-say{gap:6px}#dcb .dcb-r{font-size:11.5px}#dcb .dcb-g small{font-size:7.5px}}' +
'@media (prefers-reduced-motion:reduce){#dcb .dcb-m{transition:none}}';
document.head.appendChild(st);
var b = document.createElement('div'); b.id = 'dcb'; b.lang = 'tr'; b.setAttribute('role', 'region'); b.setAttribute('aria-label', 'Duyuru');
var els = L.map(function (x) { var e = document.createElement(x.l ? 'a' : 'span'); e.className = 'dcb-m'; yaz(e, x.m, x.bit); if (x.l) { e.href = x.l; e.addEventListener('click', function () { ek('duyuru_cubugu_tik', x.m); }); } b.appendChild(e); return e; });
var i = 0, dur = false;
function goster(n) { i = (n + els.length) % els.length; els.forEach(function (e, k) { e.classList.toggle('on', k === i); }); }
if (els.length > 1) {
if (C.oklar) { b.className = 'ok'; ['p', 'n'].forEach(function (t) { var d = document.createElement('button'); d.type = 'button'; d.className = 'dcb-' + t; d.setAttribute('aria-label', t === 'p' ? 'Önceki duyuru' : 'Sonraki duyuru'); d.addEventListener('click', function () { goster(i + (t === 'p' ? -1 : 1)); }); b.appendChild(d); }); }
setInterval(function () { if (!dur && !document.hidden) goster(i + 1); }, C.sure || 5000);
['mouseenter', 'focusin'].forEach(function (o) { b.addEventListener(o, function () { dur = true; }); }); ['mouseleave', 'focusout'].forEach(function (o) { b.addEventListener(o, function () { dur = false; }); });
}
if (sayaclar.length) { say(); setInterval(function () { if (!document.hidden) say(); }, 1000); }
goster(0); if (Y) { var yer = document.createElement('div'); yer.id = 'dcb-yer'; yer.setAttribute('aria-hidden', 'true'); document.body.insertBefore(yer, document.body.firstChild); } document.body.insertBefore(b, document.body.firstChild); ek('duyuru_cubugu_goster', L[0].m);
var h = document.querySelector('header#headerNew') || document.querySelector('header'), dar = window.matchMedia && matchMedia('(max-width:480px)'), bh = dar && dar.matches ? 32 : 34, sabit = !!h && getComputedStyle(h).position === 'fixed', bekle = false, son = -1;
function ayar() { bekle = false; if (!h) return; var f = getComputedStyle(h).position === 'fixed', v = !f ? '' : (Y ? bh : Math.max(0, bh - (window.pageYOffset || 0))) + 'px'; if (h.style.top !== v) h.style.top = v; } // tema da top yazıyor: önbellek değil gerçek değerle karşılaştır
function planla() { if (!bekle) { bekle = true; requestAnimationFrame(ayar); } }
addEventListener('scroll', planla, { passive: true });
addEventListener('resize', function () { bh = dar && dar.matches ? 32 : 34; son = -1; planla(); });
ayar(); setTimeout(function () { sabit = !!h && getComputedStyle(h).position === 'fixed'; son = -1; ayar(); }, 800);
}
if (document.body) kur(); else document.addEventListener('DOMContentLoaded', kur);
})();

(function () {
if (window.__dmf) return; window.__dmf = 1;
var TR = 'tr-TR';
function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
function kucuk(s) { return String(s || '').toLocaleLowerCase(TR).replace(/\s+/g, ' ').trim(); }
// Renk aileleri: ad i\u00e7indeki s\u00f6zc\u00fc\u011fe g\u00f6re (s\u0131ra \u00f6nemli: \u00f6nce \u00f6zel olanlar)
var AILE = [ // ad = ailenin alt\u0131ndaki tonlar\u0131 kapsayan ad
['Siyah', '#111111', /siyah/], ['Alt\u0131n & G\u00fcm\u00fc\u015f', 'linear-gradient(135deg,#c9a640,#eee,#9a9a9a)', /gold|alt\u0131n|g\u00fcm\u00fc\u015f/], ['Gri & Antrasit', '#8c8c8c', /antrasit|gri|f\u00fcme|fume|melanj/],
['Beyaz & Ekru', '#f3eee3', /beyaz|ekru|kemik|krem|vanil/], ['Bej & Camel', '#d9c4a3', /bej|ta\u015f|tas\b|camel|kum/], ['Kahve & Vizon', '#7a4a2a', /kahve|taba|tar\u00e7\u0131n|kakao|karamel|t\u00fct\u00fcn|vizon/],
['Lacivert', '#1f2b4f', /laci|morcivert/], ['Mavi & \u0130ndigo', '#3a6fd6', /mavi|saks|indigo|petrol|blue/], ['Ye\u015fil & Haki', '#3e7b3c', /ye\u015fil|yesil|haki|olive|z\u00fcmr\u00fct|\u00e7a\u011fla|benetton|nefti|mint/],
['K\u0131rm\u0131z\u0131 & Bordo', '#a51f24', /k\u0131rm\u0131z\u0131|bordo|vino|nar\b|kiremit|kremit/], ['Pembe & Pudra', '#e59ab0', /pembe|pudra|g\u00fcl|fu\u015fya|somon|karides/],
['Mor & Lila', '#6d3b8c', /mor\b|mor$|lila|m\u00fcrd\u00fcm|erguvan|k\.mor/], ['Sar\u0131 & Hardal', '#e6be2b', /sar\u0131|hardal|limon|safran|asit/], ['Turuncu & Mercan', '#e5772d', /orange|oranj|turuncu|mercan/],
['Leopar & Desenli', 'repeating-linear-gradient(45deg,#c69c6d 0 3px,#3a2a1a 3px 6px)', /leopar|zebra|desen/]
];
function aileBul(ad) {
var a = kucuk(ad), parca = a.split(/\s*[\/\-]\s*/).filter(Boolean), bul = function (s) { for (var i = 0; i < AILE.length; i++) if (AILE[i][2].test(s)) return AILE[i][0]; return null; };
if (parca.length > 1) { var u = {}; parca.forEach(function (p) { var f = bul(p); if (f) u[f] = 1; }); var k = Object.keys(u); if (k.length === 1) return k[0]; if (k.length > 1) return '\u0130ki renkli'; }
return bul(a) || 'Di\u011fer';
}
function tonAd(n) { var p = kucuk(n).split(/\s*[\/\-]\s*/).filter(function (x) { return x && !/^\d+$/.test(x); }); /* 'NEON SARI-36' gibi adlardaki beden say\u0131s\u0131 at\u0131l\u0131r */ if (p.length > 1 && p.every(function (x) { return x === p[0]; })) p = [p[0]]; return p.map(function (w) { return w.split(' ').map(function (t) { return t.charAt(0).toLocaleUpperCase(TR) + t.slice(1); }).join(' '); }).join(' / '); }
var BEDEN_SIRA =['STD', 'Standart', 'S', 'S-M', 'M', 'L', 'L-XL', 'XL', 'XXL', '3XL'];
function bedenAnahtar(ad) { var n = parseFloat(ad); if (!isNaN(n) && /^\d+$/.test(ad)) return n < 10 ? 1000 + n : n; var i = BEDEN_SIRA.indexOf(ad === 'standart' ? 'Standart' : ad); return i < 0 ? 5000 : 2000 + i; }
var FIYAT = [[0, 2000, '2.000 TL alt\u0131'], [2000, 3500, '2.000 \u2013 3.500 TL'], [3500, 5000, '3.500 \u2013 5.000 TL'], [5000, 6500, '5.000 \u2013 6.500 TL'], [6500, 0, '6.500 TL \u00fczeri']];
function yolu(h) { try { return new URL(h, location.href).pathname.replace(/\/+$/, '') || '/'; } catch (e) { return ''; } }
function buyukMu(t) { return /[A-Z\u00c7\u011e\u0130\u00d6\u015e\u00dc]/.test(t) && t === t.toLocaleUpperCase(TR); }
function kategoriBolumu() {
var burasi = yolu(location.href), bolumler = [];
[].slice.call(document.querySelectorAll('li')).forEach(function (li) {
if (li.parentElement && li.parentElement.closest('li')) return; // yaln\u0131z \u00fcst d\u00fczey men\u00fc \u00f6\u011feleri
var ust = li.querySelector('a[href]'), hepsi = [].slice.call(li.querySelectorAll('a[href]')).filter(function (a) { return a !== ust; });
if (!ust || hepsi.length < 4) return;
var gruplar = [], g = null, gor = {};
hepsi.forEach(function (a) {
var ad = a.textContent.replace(/\s+/g, ' ').trim(), h = a.getAttribute('href') || '', y = h ? yolu(h) : '';
if (!ad) return;
if (buyukMu(ad)) { g = { ad: ad, yol: y, ogeler: [] }; gruplar.push(g); return; }
if (!g) { g = { ad: '', yol: '', ogeler: [] }; gruplar.push(g); }
if (!y || gor[g.ad + y]) return; gor[g.ad + y] = 1; g.ogeler.push({ ad: ad, href: h, yol: y });
});
bolumler.push({ yol: yolu(ust.getAttribute('href')), gruplar: gruplar.filter(function (x) { return x.ogeler.length >= 2; }) });
});
var icinde = function (b) { return b.gruplar.some(function (x) { return x.yol === burasi || x.ogeler.some(function (o) { return o.yol === burasi; }); }); };
var b = bolumler.filter(function (x) { return x.yol === burasi && x.gruplar.some(function (g) { return g.ad; }); })[0] || bolumler.filter(icinde)[0] || { gruplar: [] };
// Grup sayfas\u0131ndaysak (\u00f6r. Gilda) ya da bir grubun kategorisindeysek yaln\u0131z o grubu g\u00f6ster; b\u00f6l\u00fcm sayfas\u0131nda (\u00f6r. Yeniler) hepsini.
var grp = b.gruplar.filter(function (x) { return x.yol === burasi || x.ogeler.some(function (o) { return o.yol === burasi; }); });
return { burasi: burasi, gruplar: b.yol === burasi || !grp.length ? b.gruplar : grp };
}

// Adresten se\u00e7ili filtreleri oku
function adresOku() {
var q = new URLSearchParams(location.search), s = { renk: {}, beden: {}, min: +q.get('min') || 0, max: +q.get('max') || 0, diger: [] };
String(q.get('filtre') || '').split(';').forEach(function (p) {
var m = /^s-(\d+)\|(.+)$/.exec(p); if (!m) { if (p) s.diger.push(p); return; }
var hedef = m[1] === '1' ? s.renk : m[1] === '2' ? s.beden : null; if (!hedef) { s.diger.push(p); return; }
m[2].split(',').forEach(function (v) { hedef[v] = 1; });
});
return s;
}
function adresYaz(s, renkDeger, bedenDeger, yol) { // yol verilirse (kategori de\u011fi\u015fimi) se\u00e7imler o sayfaya ta\u015f\u0131n\u0131r
var q = new URLSearchParams(yol ? '' : location.search), f = s.diger.slice();
if (renkDeger.length) f.push('s-1|' + renkDeger.join(','));
if (bedenDeger.length) f.push('s-2|' + bedenDeger.join(','));
if (f.length) q.set('filtre', f.join(';')); else q.delete('filtre');
if (s.min) q.set('min', s.min); else q.delete('min');
if (s.max) q.set('max', s.max); else q.delete('max');
q.delete('sayfa'); var qs = q.toString();
return (yol || location.pathname) + (qs ? '?' + qs.replace(/%7C/gi, '|').replace(/%2C/gi, ',').replace(/%3B/gi, ';') : '');
}

function kur() {
if (document.getElementById('dmfPanel')) return;
var F = (window.filterMenu && window.filterMenu.Filters) || [], R = F.filter(function (f) { return f.Name === 'Renk'; })[0], B = F.filter(function (f) { return f.Name === 'Beden'; })[0];
if (!R && !B) return;
var secim = adresOku();
// renkleri ailelere topla
var aileler = {}, aileSira = ['Siyah', 'Gri & Antrasit', 'Beyaz & Ekru', 'Bej & Camel', 'Kahve & Vizon', 'Lacivert', 'Mavi & \u0130ndigo', 'Ye\u015fil & Haki', 'K\u0131rm\u0131z\u0131 & Bordo', 'Pembe & Pudra', 'Mor & Lila', 'Sar\u0131 & Hardal', 'Turuncu & Mercan', 'Alt\u0131n & G\u00fcm\u00fc\u015f', 'Leopar & Desenli', '\u0130ki renkli', 'Di\u011fer'];
(R ? R.Elements : []).forEach(function (e) { var a = aileBul(e.Name); (aileler[a] = aileler[a] || []).push(String(e.Value)); });
// Aile i\u00e7indeki tonlar: ayn\u0131 ad\u0131n farkl\u0131 yaz\u0131mlar\u0131 (S\u0130YAH / Siyah, Siyah-Siyah) tek tonda birle\u015fir
var aileTon = {}; (R ? R.Elements : []).forEach(function (e) { var a = aileBul(e.Name), t = tonAd(e.Name), m = aileTon[a] = aileTon[a] || [], x = m.filter(function (y) { return y.ad === t; })[0]; if (!x) { x = { ad: t, v: [] }; m.push(x); } x.v.push(String(e.Value)); });
Object.keys(aileTon).forEach(function (a) { aileTon[a].sort(function (x, y) { return x.ad.localeCompare(y.ad, TR); }); });
var bedenler = (B ? B.Elements : []).map(function (e) { return { ad: e.Name === 'standart' ? 'STD' : e.Name, v: String(e.Value) }; });
var bedenGrup = {}; bedenler.forEach(function (b) { (bedenGrup[b.ad] = bedenGrup[b.ad] || []).push(b.v); });
var bedenAdlari = Object.keys(bedenGrup).sort(function (x, y) { return bedenAnahtar(x) - bedenAnahtar(y); });

var st = el('style'); st.textContent =
'.dmf-ort{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:2147483640;opacity:0;transition:opacity .25s}.dmf-ort.dmf-ac{opacity:1}' +
'.dmf-pn{position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100%;background:#fff;color:#000;z-index:2147483641;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;font-family:Karla,sans-serif;font-size:12.8px;line-height:1.4;-webkit-font-smoothing:antialiased}.dmf-pn.dmf-ac{transform:none}' +
'.dmf-pn *{box-sizing:border-box;font-family:inherit}.dmf-ust{display:flex;justify-content:space-between;align-items:center;padding:22px 24px 18px;border-bottom:1px solid #ececec;margin-bottom:4px}.dmf-bas{margin:0;font-size:14px;font-weight:700;text-transform:uppercase}' +
'.dmf-kp{display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin:-8px -10px -8px 0;padding:0;border:0;background:none;cursor:pointer;color:#000}' +
'.dmf-ic{flex:1;overflow-y:auto;overflow-x:hidden;padding:0 24px 16px}.dmf-blk{border-bottom:1px solid #ececec}.dmf-bb{display:flex;justify-content:space-between;align-items:center;width:100%;padding:16px 0;border:0;background:none;cursor:pointer;font-size:14px;font-weight:700;text-transform:uppercase;color:#000;text-align:left}' +
'.dmf-bb:after{content:"";width:7px;height:7px;margin-right:4px;border:solid #000;border-width:0 1.5px 1.5px 0;transform:rotate(45deg);transition:transform .2s}.dmf-blk.dmf-acik .dmf-bb:after{transform:rotate(-135deg)}.dmf-bb .dmf-sy{font-weight:400;text-transform:none;color:#616161;margin-left:auto;margin-right:12px}' +
'.dmf-ic2{display:none;padding:0 0 18px}.dmf-blk.dmf-acik .dmf-ic2{display:block}' +
'.dmf-iz{display:grid;border-top:1px solid #d7d7d8;border-left:1px solid #d7d7d8}.dmf-iz2{grid-template-columns:repeat(2,minmax(0,1fr))}.dmf-iz3{grid-template-columns:repeat(3,minmax(0,1fr))}.dmf-iz5{grid-template-columns:repeat(5,minmax(0,1fr))}' +
'.dmf-k{display:flex;align-items:center;gap:8px;min-height:40px;padding:8px 10px;border:0;border-right:1px solid #d7d7d8;border-bottom:1px solid #d7d7d8;background:#fff;color:#000;font-size:12px;text-transform:uppercase;text-align:left;cursor:pointer}' +
'.dmf-k:hover{background:#f6f6f6}.dmf-k[aria-pressed=true]{background:#000;color:#fff}.dmf-iz5 .dmf-k{justify-content:center;text-transform:none;font-size:13px}' +
'.dmf-n{flex:none;width:9px;height:9px;border:1px solid rgba(0,0,0,.15)}.dmf-k[aria-pressed=true] .dmf-n{border-color:#fff}' +
'.dmf-hc{display:flex;align-items:stretch;border-right:1px solid #d7d7d8;border-bottom:1px solid #d7d7d8;background:#fff}.dmf-ab{flex:1;min-width:0;display:flex;align-items:center;gap:8px;min-height:40px;padding:8px 6px 8px 10px;border:0;background:none;color:inherit;font-size:12px;text-transform:uppercase;text-align:left;cursor:pointer}' +
'.dmf-hc:hover{background:#f6f6f6}.dmf-ab[aria-pressed=true]{background:#000;color:#fff}.dmf-ab[aria-pressed=true] .dmf-n{border-color:#fff}.dmf-hc.dmf-kismi{box-shadow:inset 0 0 0 1px #000}.dmf-ad{min-width:0;line-height:1.25;overflow-wrap:anywhere}.dmf-ks{flex:none;margin-left:auto;font-size:11px;color:#616161;text-transform:none}' +
'.dmf-ok{flex:none;width:34px;border:0;border-left:1px solid #ececec;background:none;cursor:pointer;position:relative}.dmf-ok:after{content:"";position:absolute;left:11px;top:50%;width:6px;height:6px;margin-top:-5px;border:solid #000;border-width:0 1.5px 1.5px 0;transform:rotate(45deg)}.dmf-hc.dmf-acikk .dmf-ok:after{transform:rotate(-135deg);margin-top:-1px}.dmf-hc.dmf-acikk{background:#f6f6f6}' +
'.dmf-ton{margin-top:14px}.dmf-tb{padding:9px 12px;border:1px solid #d7d7d8;background:#fff;color:#000;font-size:12.8px;cursor:pointer}.dmf-tb:hover{border-color:#000}.dmf-tb[aria-pressed=true]{background:#000;color:#fff;border-color:#000}.dmf-ab:focus-visible,.dmf-ok:focus-visible,.dmf-tb:focus-visible{outline:1px solid #000;outline-offset:-3px}' +
'.dmf-g.dmf-yuk{opacity:.75}.dmf-kat a.dmf-yuk{opacity:.5}' +
'.dmf-gb{font-size:11px;font-weight:700;text-transform:uppercase;color:#616161;margin:4px 0 8px}.dmf-kat+.dmf-gb{margin-top:16px}.dmf-kat{display:flex;flex-wrap:wrap;gap:8px}.dmf-kat a{display:inline-block;padding:9px 14px;border:1px solid #d7d7d8;color:#000;text-decoration:none;font-size:12.8px}.dmf-kat a:hover{border-color:#000}.dmf-kat a.dmf-bu{background:#000;color:#fff;border-color:#000}' +
'.dmf-alt{padding:14px 24px 22px;display:grid;gap:8px}.dmf-g{width:100%;height:42px;border:0;background:#000;color:#fff;font-size:14px;font-weight:700;text-transform:uppercase;cursor:pointer}.dmf-t{width:100%;height:42px;border:1px solid #d7d7d8;background:#fff;color:#000;font-size:13px;text-transform:uppercase;cursor:pointer}.dmf-t:disabled{color:#b0b0b0;cursor:default}' +
'.dmf-k:focus-visible,.dmf-bb:focus-visible,.dmf-g:focus-visible,.dmf-t:focus-visible,.dmf-kp:focus-visible,.dmf-kat a:focus-visible{outline:1px solid #000;outline-offset:-3px}.dmf-pn:focus{outline:none}body.dmf-kilit{overflow:hidden}' +
'@media (max-width:600px){.dmf-pn{width:100%}.dmf-ust,.dmf-ic,.dmf-alt{padding-left:16px;padding-right:16px}.dmf-iz5{grid-template-columns:repeat(4,1fr)}.dmf-iz3{grid-template-columns:repeat(2,1fr)}.dmf-alt{padding-bottom:calc(16px + env(safe-area-inset-bottom))}}';
document.head.appendChild(st);

var ort = el('div', 'dmf-ort'), pn = el('div', 'dmf-pn'); pn.id = 'dmfPanel'; pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-modal', 'true'); pn.setAttribute('aria-labelledby', 'dmfBas'); pn.tabIndex = -1; ort.hidden = pn.hidden = true;
var ust = el('div', 'dmf-ust'), bas = el('h2', 'dmf-bas', 'Filtrele'); bas.id = 'dmfBas';
var kp = el('button', 'dmf-kp'); kp.type = 'button'; kp.setAttribute('aria-label', 'Kapat'); kp.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
ust.appendChild(bas); ust.appendChild(kp);
var ic = el('div', 'dmf-ic');
function blok(baslik, acik) { var b = el('div', 'dmf-blk' + (acik ? ' dmf-acik' : '')), d = el('button', 'dmf-bb'), sy = el('span', 'dmf-sy'), i2 = el('div', 'dmf-ic2'); d.type = 'button'; d.appendChild(document.createTextNode(baslik)); d.appendChild(sy); d.setAttribute('aria-expanded', acik ? 'true' : 'false'); d.addEventListener('click', function () { var a = b.classList.toggle('dmf-acik'); d.setAttribute('aria-expanded', a ? 'true' : 'false'); }); b.appendChild(d); b.appendChild(i2); ic.appendChild(b); return { ic: i2, sayac: sy }; }
function kutu(ad, secili, ek) { var k = el('button', 'dmf-k'); k.type = 'button'; if (ek) k.appendChild(ek); k.appendChild(document.createTextNode(ad)); k.setAttribute('aria-pressed', secili ? 'true' : 'false'); k.addEventListener('click', function () { k.setAttribute('aria-pressed', k.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); guncelle(); }); return k; }

// Kategori ba\u011flant\u0131lar\u0131: sitenin \u00fcst men\u00fcs\u00fcnden, BU SAYFANIN B\u00d6L\u00dcM\u00dcN\u00dcN (Sonbahar&K\u0131\u015f, \u0130lkbahar&Yaz, Koleksiyon\u2026) alt kategorileri.
// Men\u00fc yap\u0131s\u0131: \u00fcst ba\u011flant\u0131n\u0131n <li>'si alt\u0131nda b\u00fcy\u00fck harfli grup ba\u015fl\u0131klar\u0131 (MODA\u0130LG\u0130, G\u0130LDA-XL\u2026) ve onlar\u0131n alt\u0131ndaki kategori ba\u011flant\u0131lar\u0131.
var kb = kategoriBolumu(); if (kb.gruplar.length) { var kblk = blok('Kategori', true); kb.gruplar.forEach(function (g) { if (kb.gruplar.length > 1) kblk.ic.appendChild(el('div', 'dmf-gb', g.ad)); var kd = el('div', 'dmf-kat'); g.ogeler.forEach(function (o) { var a = el('a', o.yol === kb.burasi ? 'dmf-bu' : '', o.ad); a.href = o.href; a.addEventListener('click', function (e) { kategoriyeGec(e, o.yol); }); a.addEventListener('pointerdown', function () { katId(o.yol); }); kd.appendChild(a); }); kblk.ic.appendChild(kd); }); }
// Kategori se\u00e7ilince panel kapanmaz: arkada o kategorinin sayfas\u0131 a\u00e7\u0131l\u0131r, panel yeni sayfada a\u00e7\u0131k gelir; se\u00e7ili renk/beden/fiyat korunur.
var KID = {}; try { KID = JSON.parse(sessionStorage.getItem('dmfKid') || '{}'); } catch (x) { }
function katId(yol) { // kategori adresi \u2192 Ticimax kategori kimli\u011fi (sayfa kayna\u011f\u0131ndan bir kez okunur, oturum boyunca saklan\u0131r)
if (KID[yol]) return Promise.resolve(KID[yol]);
if (!katId.p) katId.p = {}; if (katId.p[yol]) return katId.p[yol];
return katId.p[yol] = fetch(yol, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (h) { var m = /"targetId":(\d+)/.exec(h), id = m ? +m[1] : 0; if (id) { KID[yol] = id; try { sessionStorage.setItem('dmfKid', JSON.stringify(KID)); } catch (x) { } } return id; });
}
function kategoriyeGec(e, yol) { // kategori arkada de\u011fi\u015fir (sayfa yenilenmez), panel a\u00e7\u0131k kal\u0131r; kategori kimli\u011fi o sayfan\u0131n kayna\u011f\u0131ndan okunur
e.preventDefault(); var hedef = e.currentTarget; hedef.classList.add('dmf-yuk');
katId(yol).then(function (id) {
hedef.classList.remove('dmf-yuk'); if (!id || !window.filterModel || typeof window.getProducts !== 'function') throw 0;
window.filterModel.filter.CategoryIdList = [id]; if (window.productsModel) window.productsModel.targetId = id; try { window.categoryId = id; } catch (x) { }
history.pushState(null, '', yol); [].slice.call(pn.querySelectorAll('.dmf-kat a')).forEach(function (a) { a.classList.toggle('dmf-bu', a === hedef); });
uygula(true); urunSay(secimler()); // kategori de\u011fi\u015fince "N \u00fcr\u00fcn\u00fc g\u00f6ster" say\u0131s\u0131 da yenilensin (\u00f6nce yaln\u0131z renk/beden se\u00e7iminde yenileniyordu)
}).catch(function () { var s = secimler(); secim.min = s.min; secim.max = s.max; try { sessionStorage.setItem('dmfAcik', '1'); } catch (x) { } location.href = adresYaz(secim, s.rv, s.bv, yol); });
}

var renkKutu = [], bedenKutu = [], fiyatKutu = [];
// Renk: aile kutusu ailenin t\u00fcm tonlar\u0131n\u0131 se\u00e7er; yan\u0131ndaki ok o ailenin tonlar\u0131n\u0131 a\u00e7ar (tek ton se\u00e7ilebilir). Se\u00e7im renk kimlikleri k\u00fcmesinde tutulur.
var renkSec = {}, aileUI = [], acikAile = null; Object.keys(secim.renk).forEach(function (v) { renkSec[v] = 1; });
if (R) {
var rb = blok('Renk', true), rz = el('div', 'dmf-iz dmf-iz2'), tonAlan = el('div', 'dmf-ton'); tonAlan.hidden = true;
aileSira.forEach(function (a) {
var tonlar = aileTon[a]; if (!tonlar) return; var tanim = AILE.filter(function (x) { return x[0] === a; })[0], hepsi = [];
tonlar.forEach(function (t) { hepsi = hepsi.concat(t.v); });
var hucre = el('div', 'dmf-hc'), ab = el('button', 'dmf-ab'), n = el('span', 'dmf-n'), ad = el('span', 'dmf-ad', a), sy = el('span', 'dmf-ks');
n.style.background = tanim ? tanim[1] : a === '\u0130ki renkli' ? 'linear-gradient(135deg,#111 50%,#f3eee3 50%)' : '#ccc';
ab.type = 'button'; ab.appendChild(n); ab.appendChild(ad); ab.appendChild(sy); hucre.appendChild(ab);
var ui = { ad: a, tonlar: tonlar, hepsi: hepsi, ab: ab, sy: sy, hucre: hucre, ok: null };
ab.addEventListener('click', function () { var tam = hepsi.every(function (v) { return renkSec[v]; }); hepsi.forEach(function (v) { if (tam) delete renkSec[v]; else renkSec[v] = 1; }); renkCiz(); guncelle(); });
if (tonlar.length > 1) { var ok = el('button', 'dmf-ok'); ok.type = 'button'; ok.setAttribute('aria-label', a + ' tonlar\u0131n\u0131 g\u00f6ster'); ok.setAttribute('aria-expanded', 'false'); ok.addEventListener('click', function () { acikAile = acikAile === ui ? null : ui; renkCiz(); }); hucre.appendChild(ok); ui.ok = ok; }
aileUI.push(ui); rz.appendChild(hucre);
});
rb.ic.appendChild(rz); rb.ic.appendChild(tonAlan); var renkSay = rb.sayac;
}
function renkCiz() { // aile kutular\u0131n\u0131n durumu (tam / k\u0131smi / yok) ve a\u00e7\u0131k ailenin ton listesi
aileUI.forEach(function (u) {
var n = u.hepsi.filter(function (v) { return renkSec[v]; }).length, tamMi = n === u.hepsi.length, tonSay = u.tonlar.filter(function (t) { return t.v.every(function (v) { return renkSec[v]; }); }).length;
u.ab.setAttribute('aria-pressed', n && tamMi ? 'true' : 'false'); u.hucre.classList.toggle('dmf-kismi', !!n && !tamMi); u.sy.textContent = n && !tamMi ? tonSay + '/' + u.tonlar.length : '';
if (u.ok) { u.ok.setAttribute('aria-expanded', acikAile === u ? 'true' : 'false'); u.hucre.classList.toggle('dmf-acikk', acikAile === u); }
});
if (!tonAlan) return; tonAlan.textContent = ''; tonAlan.hidden = !acikAile; if (!acikAile) return;
tonAlan.appendChild(el('div', 'dmf-gb', acikAile.ad + ' tonlar\u0131')); var kd = el('div', 'dmf-kat');
acikAile.tonlar.forEach(function (t) { var b = el('button', 'dmf-tb', t.ad); b.type = 'button'; b.setAttribute('aria-pressed', t.v.every(function (v) { return renkSec[v]; }) ? 'true' : 'false'); b.addEventListener('click', function () { var s = t.v.every(function (v) { return renkSec[v]; }); t.v.forEach(function (v) { if (s) delete renkSec[v]; else renkSec[v] = 1; }); renkCiz(); guncelle(); }); kd.appendChild(b); });
tonAlan.appendChild(kd);
}
renkCiz();
if (B) { var bb = blok('Beden', false), bz = el('div', 'dmf-iz dmf-iz5'); bedenAdlari.forEach(function (ad) { var v = bedenGrup[ad], k = kutu(ad, v.some(function (x) { return secim.beden[x]; })); k.dataset.v = v.join(','); bedenKutu.push(k); bz.appendChild(k); }); bb.ic.appendChild(bz); var bedenSay = bb.sayac; }
var fb = blok('Fiyat', false), fz = el('div', 'dmf-iz dmf-iz2'); FIYAT.forEach(function (f) { var k = kutu(f[2], secim.min === f[0] && secim.max === f[1]); k.style.textTransform = 'none'; k.dataset.min = f[0]; k.dataset.max = f[1]; k.addEventListener('click', function () { fiyatKutu.forEach(function (x) { if (x !== k) x.setAttribute('aria-pressed', 'false'); }); guncelle(); }); fiyatKutu.push(k); fz.appendChild(k); }); fb.ic.appendChild(fz); var fiyatSay = fb.sayac;

var alt = el('div', 'dmf-alt'), goster = el('button', 'dmf-g', '\u00dcr\u00fcnleri g\u00f6ster'), temizle = el('button', 'dmf-t', 'Filtreleri kald\u0131r'); goster.type = temizle.type = 'button'; alt.appendChild(goster); alt.appendChild(temizle);
pn.appendChild(ust); pn.appendChild(ic); pn.appendChild(alt); document.body.appendChild(ort); document.body.appendChild(pn);

function secimler() {
var rv = [], bv = [], f = fiyatKutu.filter(function (k) { return k.getAttribute('aria-pressed') === 'true'; })[0];
aileUI.forEach(function (u) { u.hepsi.forEach(function (v) { if (renkSec[v]) rv.push(v); }); });
bedenKutu.forEach(function (k) { if (k.getAttribute('aria-pressed') === 'true') bv = bv.concat(k.dataset.v.split(',')); });
return { rv: rv, bv: bv, min: f ? +f.dataset.min : 0, max: f ? +f.dataset.max : 0 };
}
var sayZ = 0;
function uygula(hemen) { // se\u00e7imi Ticimax'in filtre modeline yazar, \u00fcr\u00fcnleri sayfa yenilenmeden arkada y\u00fckler, adresi g\u00fcnceller
try {
var s = secimler(), f = window.filterModel.filter, fo = (f.FilterObject || []).filter(function (o) { return !(o.FilterType === 'secenek' && (+o.FilterId === 1 || +o.FilterId === 2)); });
if (s.rv.length) fo.push({ FilterType: 'secenek', FilterId: 1, FilterValues: s.rv.map(Number) }); if (s.bv.length) fo.push({ FilterType: 'secenek', FilterId: 2, FilterValues: s.bv.map(Number) });
f.FilterObject = fo; f.MinPrice = s.min; f.MaxPrice = s.max; window.filterModel.paging.PageNumber = 1;
try { window.lastLoadedUpperPageNumber = 1; window.lastLoadedLowerPageNumber = 1; window.scrollGetProductNotRun = true; } catch (x) { }
// Sonsuz kayd\u0131rma / "daha fazla" (sayfalamaSecenek 2-3; 2026-11-17'de a\u00e7\u0131ld\u0131): Ticimax yeni \u00fcr\u00fcnleri listenin SONUNA ekler. Kendi filtresi gibi \u00f6nce listeyi
// bo\u015falt; \u00fcr\u00fcnler gelince kayd\u0131rmayla y\u00fcklemeyi yeniden a\u00e7 (a\u00e7\u0131k kal\u0131rsa a\u015fa\u011f\u0131 inince devam\u0131 gelmiyordu). Sayfal\u0131 modda (1) Ticimax listeyi zaten de\u011fi\u015ftirir.
var sonsuz = window.siteSettings && (siteSettings.sayfalamaSecenek == 2 || siteSettings.sayfalamaSecenek == 3), liste = document.getElementById('ProductPageProductList');
if (sonsuz && liste) { if (window.jQuery) jQuery(liste).html(''); else liste.innerHTML = ''; var lt = liste.getBoundingClientRect().top + (window.scrollY || 0) - 120; if ((window.scrollY || 0) > lt) window.scrollTo(0, Math.max(0, lt)); }
window.getProducts(); if (typeof window.setFilterUrl === 'function') window.setFilterUrl(window.filterModel);
if (sonsuz && liste) { var t0 = Date.now(); (function bekle() { if (liste.querySelector('.ItemOrj') || Date.now() - t0 > 8000) { try { window.scrollGetProductNotRun = false; } catch (x) { } } else setTimeout(bekle, 150); })(); }
} catch (e) { var s2 = secimler(); secim.min = s2.min; secim.max = s2.max; location.href = adresYaz(secim, s2.rv, s2.bv); }
}
var uyZ = 0;
function guncelle() {
var s = secimler(), say = function (a) { return a.filter(function (k) { return k.getAttribute('aria-pressed') === 'true'; }).length; };
var ra = aileUI.filter(function (u) { return u.hepsi.some(function (v) { return renkSec[v]; }); }).length; if (renkSay) renkSay.textContent = ra ? ra + ' se\u00e7ili' : ''; if (bedenSay) bedenSay.textContent = say(bedenKutu) ? say(bedenKutu) + ' se\u00e7ili' : ''; fiyatSay.textContent = say(fiyatKutu) ? '1 se\u00e7ili' : '';
temizle.disabled = !(s.rv.length || s.bv.length || s.min || s.max || secim.diger.length);
clearTimeout(sayZ); sayZ = setTimeout(function () { urunSay(s); }, 150);
if (pn.classList.contains('dmf-ac')) { goster.classList.add('dmf-yuk'); clearTimeout(uyZ); uyZ = setTimeout(uygula, 250); } // her se\u00e7imde \u00fcr\u00fcnler arkada de\u011fi\u015fir
}
function urunSay(s) { // se\u00e7ime uyan \u00fcr\u00fcn say\u0131s\u0131 (Ticimax'in kendi listeleme servisi)
try {
var f = JSON.parse(JSON.stringify(window.filterModel.filter)), fo = (f.FilterObject || []).filter(function (o) { return !(o.FilterType === 'secenek' && (o.FilterId === 1 || o.FilterId === 2)); });
if (s.rv.length) fo.push({ FilterType: 'secenek', FilterId: 1, FilterValues: s.rv.map(Number) }); if (s.bv.length) fo.push({ FilterType: 'secenek', FilterId: 2, FilterValues: s.bv.map(Number) });
f.FilterObject = fo; f.MinPrice = s.min; f.MaxPrice = s.max;
if (urunSay.ctl) urunSay.ctl.abort(); var ctl = urunSay.ctl = window.AbortController ? new AbortController() : null; // eski istek yan\u0131t\u0131 yenisinin \u00fcst\u00fcne yazmas\u0131n
fetch('/api/product/GetProductList?FilterJson=' + encodeURIComponent(JSON.stringify(f)) + '&PagingJson=' + encodeURIComponent(JSON.stringify({ PageItemCount: 1, PageNumber: 1, OrderBy: 'KATEGORISIRA', OrderDirection: 'ASC' })), ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.json(); }).then(function (j) { if (j && j.totalProductCount != null) goster.textContent = j.totalProductCount + ' \u00fcr\u00fcn\u00fc g\u00f6ster'; goster.classList.remove('dmf-yuk'); }).catch(function () {});
} catch (e) { }
}
goster.addEventListener('click', function () { kapa(); }); // se\u00e7imler zaten uygulanm\u0131\u015f durumda; panel kapan\u0131r
temizle.addEventListener('click', function () { [].concat(bedenKutu, fiyatKutu).forEach(function (k) { k.setAttribute('aria-pressed', 'false'); }); renkSec = {}; acikAile = null; renkCiz(); secim.diger = []; guncelle(); });

var donus = null;
function ac() { try { [].slice.call(document.querySelectorAll('.filterBlock.active')).forEach(function (x) { x.classList.remove('active'); }); } catch (x) { } /* eski Ticimax penceresi a\u00e7\u0131k kald\u0131ysa kapat */ donus = document.activeElement; ort.hidden = pn.hidden = false; document.body.classList.add('dmf-kilit'); guncelle(); requestAnimationFrame(function () { ort.classList.add('dmf-ac'); pn.classList.add('dmf-ac'); }); pn.focus(); }
function kapa() { ort.classList.remove('dmf-ac'); pn.classList.remove('dmf-ac'); document.body.classList.remove('dmf-kilit'); setTimeout(function () { ort.hidden = pn.hidden = true; }, 260); if (donus && donus.focus) donus.focus(); }
kp.addEventListener('click', kapa); ort.addEventListener('click', kapa);
pn.addEventListener('keydown', function (e) { if (e.key === 'Escape') kapa(); });
// Ticimax'in "Filtreleme" d\u00fc\u011fmelerini bizim panele y\u00f6nlendir: bilgisayarda .FiltreBtn, telefonda .mobilFilterBtn. Belge d\u00fczeyinde yakalama a\u015famas\u0131nda dinlenir,
// b\u00f6ylece Ticimax'in kendi penceresi a\u00e7\u0131lmaz ve sonradan \u00e7izilen d\u00fc\u011fmeler de yakalan\u0131r. S\u0131ralama d\u00fc\u011fmesine dokunulmaz.
window.dmfAc = ac; if (bekleyenAc) { bekleyenAc = false; ac(); }
var acikGel = false; try { acikGel = sessionStorage.getItem('dmfAcik') === '1'; sessionStorage.removeItem('dmfAcik'); } catch (x) { }
if (acikGel) { pn.style.transition = ort.style.transition = 'none'; ac(); setTimeout(function () { pn.style.transition = ort.style.transition = ''; }, 50); } // kategori de\u011fi\u015fiminden sonra panel kaymadan, a\u00e7\u0131k gelir
}
// Ticimax'in "Filtreleme" d\u00fc\u011fmeleri bizim panele y\u00f6nlendirilir: bilgisayarda .FiltreBtn, telefonda .mobilFilterBtn. Dinleyiciler betik \u00e7al\u0131\u015f\u0131r \u00e7al\u0131\u015fmaz kurulur;
// panel hen\u00fcz haz\u0131r de\u011filse bas\u0131\u015f saklan\u0131r ve panel haz\u0131r olunca a\u00e7\u0131l\u0131r (Ticimax'in eski penceresi hi\u00e7 a\u00e7\u0131lmaz). S\u0131ralama d\u00fc\u011fmesine dokunulmaz.
var DUGME = '.FiltreBtn, a.mobilFilterBtn, .mobilFilterOpenBtn > a:not(.mobilSiralamBtn)', bekleyenAc = false, devrede = false;
function dugmeMi(e) { var t = devrede && e.target && e.target.closest && e.target.closest(DUGME); return t && !t.closest('#dmfPanel'); }
function yakala() {
document.addEventListener('click', function (e) { if (!dugmeMi(e)) return; e.preventDefault(); e.stopImmediatePropagation(); if (window.dmfAc) window.dmfAc(); else bekleyenAc = true; }, true);
// Telefonda Ticimax eski pencereyi dokunma an\u0131nda (touchend) a\u00e7\u0131yor: bu olaylar da Ticimax'e ula\u015fmadan durdurulur (t\u0131klama yine olu\u015fur)
['touchstart', 'touchend', 'mousedown', 'pointerdown', 'pointerup'].forEach(function (tur) { document.addEventListener(tur, function (e) { if (dugmeMi(e)) e.stopImmediatePropagation(); }, true); });
}
function bekle() { // Ticimax filtre verisi (filterMenu) sayfa a\u00e7\u0131ld\u0131ktan sonra gelir; gelmezse (20 sn) Ticimax'in kendi filtresi devreye girer
var t0 = Date.now(), iv = setInterval(function () { if (window.filterMenu && window.filterMenu.Filters && window.filterMenu.Filters.length) { clearInterval(iv); kur(); } else if (Date.now() - t0 > 20000) { clearInterval(iv); devrede = false; } }, 100);
}
// T\u00fcm \u00fcr\u00fcn listeleme sayfalar\u0131: kategori (1), etiket (5, \u00f6r. Outlet), marka, arama vb. \u00dcr\u00fcn detay\u0131nda productsModel yoktur.
if (window.productsModel && window.productsModel.pageType > 0) { devrede = true; yakala(); if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bekle); else bekle(); }
})();

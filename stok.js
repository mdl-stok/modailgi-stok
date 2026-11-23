(function () {
var ADRES = "https://mdl-stok.github.io/modailgi-stok/stok.json", ESKI_SAAT = 14; // 22:00 son yükleme + gece boşluğu: mağazalar kapalıyken görünür kalır
if (window.__dms) return; window.__dms = 1;
function duoEv(n) { try { if (window.gtag) window.gtag('event', n); } catch (e) { } } // ölçüm: GA4'e yalnız olay adı gider (kişisel veri yok); panel › Site eklentileri
var mm = document.documentElement.innerHTML.match(/"stockCode":"([^"]+)"/); if (!mm) return;
var kod = mm[1], TR = 'tr-TR';
function ad(s) { return s.split(' ').map(function (w) { return w.charAt(0).toLocaleUpperCase(TR) + w.slice(1).toLocaleLowerCase(TR); }).join(' ').replace(/ Cad /, ' Cad. '); } // "İZMİR CAD MAĞAZA" → "İzmir Cad. Mağaza"
function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
function bedenSec() { return document.querySelector('.eksecenekLine.selectvaryasyon select.eksecenekSelect'); } // sayfanın beden açılır listesi
function bAd(o) { return o.textContent.replace(/\s*Tükendi\s*$/i, '').trim(); } // site online'da biten bedeni "42 Tükendi" yazar
function onlineYok(o) { return o.disabled || o.hasAttribute('nostock') || /Tükendi\s*$/i.test(o.textContent); }
function secenekler() { var s = bedenSec(); return s ? [].slice.call(s.options).filter(function (o) { return o.value !== '-1'; }) : []; }
function sayfaBedenleri() { return secenekler().map(bAd); }
function secenek(b) { return secenekler().filter(function (o) { return bAd(o) === b; })[0]; }
function secili() { var s = bedenSec(), o = s && s.options[s.selectedIndex]; return o && o.value !== '-1' ? bAd(o) : ''; }
function kur(d, sehirler, zaman) {
var ozel = document.getElementById('liTabOzellikler'); if (!ozel || document.getElementById('dmsTab')) return;
var magazalar = Object.keys(d); if (!magazalar.length) return;
var stokBeden = {}; magazalar.forEach(function (m) { d[m].forEach(function (b) { stokBeden[b] = 1; }); });
var st = el('style'); st.textContent =
'#dmsTab{list-style:none;border-bottom:1px solid #ececec}#dmsTab>a{display:block;position:relative;padding:15px 0;font-size:14px;line-height:20px;font-weight:700;text-transform:uppercase;color:#000;text-decoration:none;cursor:pointer}' +
'#dmsTab>a:after{content:"";float:right;width:7px;height:7px;margin:6px 5px 0 0;border:solid #000;border-width:0 1.5px 1.5px 0;transform:rotate(-45deg)}#dmsTab>a:focus-visible{outline:1px solid #000;outline-offset:2px}' +
'.dms-ort{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:2147483646;opacity:0;transition:opacity .25s}.dms-ort.dms-ac{opacity:1}' +
'.dms-pn{position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100%;background:#fff;color:#000;z-index:2147483647;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;font-family:Karla,sans-serif;font-size:12.8px;font-weight:400;line-height:1.5;box-sizing:border-box;-webkit-font-smoothing:antialiased}.dms-pn.dms-ac{transform:none}' +
'.dms-pn *{box-sizing:border-box;font-family:inherit}.dms-ust{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #ececec}.dms-bas{margin:0;font-size:14px;line-height:20px;font-weight:700;text-transform:uppercase;color:#000}' +
'.dms-kp{display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin:-8px -10px -8px 0;padding:0;border:0;background:none;cursor:pointer;color:#000}.dms-kp:focus-visible,.dms-bd:focus-visible,.dms-sec:focus-visible{outline:1px solid #000;outline-offset:2px}' +
'.dms-ic{flex:1;overflow-y:auto;padding:20px 24px 24px}.dms-urun{display:flex;gap:14px;padding-bottom:20px;border-bottom:1px solid #ececec}.dms-urun img{width:64px;height:96px;object-fit:cover;background:#f5f5f5;flex:none}' +
'.dms-urun div{font-size:12.8px;line-height:1.6}.dms-urun b{font-weight:400;color:#616161}.dms-ad{font-size:14px;line-height:1.4;margin-bottom:6px;color:#000}' +
'.dms-yon{font-size:12.8px;margin:20px 0 10px;color:#000}.dms-bdl{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px}' +
'.dms-bd{height:42px;border:1px solid #d7d7d8;border-radius:0;background:#fff;color:#000;font-size:14px;font-weight:400;cursor:pointer;padding:0}.dms-bd:hover{border-color:#000}.dms-bd[aria-pressed=true]{background:#000;color:#fff;border-color:#000}' +
'.dms-bd.dms-yok{color:#b0b0b0;text-decoration:line-through;cursor:default}.dms-bd.dms-yok:hover{border-color:#d7d7d8}' +
'.dms-sonuc{margin-top:22px}.dms-say{font-size:12.8px;margin-bottom:4px;color:#000}.dms-s{font-size:11px;font-weight:700;text-transform:uppercase;padding:14px 0 6px;color:#616161}' +
'.dms-m{border-bottom:1px solid #ececec;padding:11px 0;font-size:14px;display:flex;justify-content:space-between;align-items:center;gap:10px}.dms-m span{color:#616161;font-size:12.8px;white-space:nowrap}' +
'.dms-bos{font-size:12.8px;padding:14px;background:#f7f6f3;border:1px solid #ebe9e4}.dms-uy{font-size:12.8px;color:#616161;margin-top:10px}.dms-not{margin-top:18px;font-size:11px;color:#616161;line-height:1.5}' +
'.dms-alt{padding:16px 24px 24px;border-top:1px solid #ececec}.dms-sec{width:100%;height:42px;border:0;border-radius:0;background:#000;color:#fff;font-size:15px;font-weight:300;cursor:pointer}.dms-sec:disabled{background:#c8c8c8;cursor:default}' +
'.dms-pn:focus{outline:none}body.dms-kilit{overflow:hidden}@media (max-width:600px){.dms-pn{top:50%;bottom:auto;left:16px;right:16px;width:auto;max-width:none;max-height:85vh;max-height:85dvh;opacity:0;transform:translateY(-48%);transition:opacity .2s,transform .2s}.dms-pn.dms-ac{opacity:1;transform:translateY(-50%)}.dms-ic{flex:1 1 auto;min-height:0}.dms-ust{padding:16px}.dms-ic{padding:16px}.dms-alt{padding:12px 16px 16px}}'; // telefonda ekranı kaplamayan, ortada köşeli pencere (içerik kadar yükseklik, en fazla ekranın %85'i)
document.head.appendChild(st);
var li = el('li'); li.id = 'dmsTab';
var a = el('a', '', 'Mağaza Stok Durumu'); a.href = 'javascript:void(0);'; a.setAttribute('role', 'button'); a.setAttribute('aria-haspopup', 'dialog'); a.setAttribute('aria-controls', 'dmsPanel');
li.appendChild(a); ozel.parentNode.insertBefore(li, ozel.nextSibling);
var ort = el('div', 'dms-ort'), pn = el('div', 'dms-pn'); pn.id = 'dmsPanel'; pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-modal', 'true'); pn.setAttribute('aria-labelledby', 'dmsBas'); pn.tabIndex = -1; ort.hidden = pn.hidden = true;
var ust = el('div', 'dms-ust'), bas = el('h2', 'dms-bas', 'Mağaza Stok Durumu'); bas.id = 'dmsBas';
var kp = el('button', 'dms-kp'); kp.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'; kp.type = 'button'; kp.setAttribute('aria-label', 'Kapat'); ust.appendChild(bas); ust.appendChild(kp);
var ic = el('div', 'dms-ic'), urun = el('div', 'dms-urun'), img = el('img'), bilgi = el('div');
var og = document.querySelector('meta[property="og:image"]'), kucukResim = og ? String(og.content).replace(/\/cdn-cgi\/image\/[^/]*\//, '/cdn-cgi/image/width=200,quality=80/') : ''; img.alt = '';
var h1 = document.querySelector('h1'), urunAd = h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : '';
var rk = document.querySelector('.resimlivaryasyon .size_box.selected'), renk = rk ? rk.getAttribute('title') : '';
bilgi.appendChild(el('div', 'dms-ad', urunAd)); if (renk) { var r = el('div'); r.appendChild(el('b', '', 'Renk: ')); r.appendChild(document.createTextNode(renk)); bilgi.appendChild(r); }
var sb = el('div'); sb.appendChild(el('b', '', 'Seçilen beden: ')); var sbD = document.createTextNode('—'); sb.appendChild(sbD); bilgi.appendChild(sb);
urun.appendChild(img); urun.appendChild(bilgi);
var yon = el('p', 'dms-yon', 'Mağazalardaki stok durumunu görmek için beden seçin.'), bdl = el('div', 'dms-bdl'); bdl.setAttribute('role', 'group'); bdl.setAttribute('aria-label', 'Beden');
var sonuc = el('div', 'dms-sonuc'); sonuc.setAttribute('aria-live', 'polite');
var zs = zaman ? new Date(zaman) : null, not = el('p', 'dms-not', 'Stok bilgisi' + (zs ? ' ' + zs.toLocaleDateString(TR, { day: 'numeric', month: 'long' }) + ' ' + zs.toLocaleTimeString(TR, { hour: '2-digit', minute: '2-digit' }) + ' itibarıyladır' : '') + '; gün içinde değişebilir. Gitmeden önce mağazayı aramanızı öneririz.');
ic.appendChild(urun); ic.appendChild(yon); ic.appendChild(bdl); ic.appendChild(sonuc); ic.appendChild(not);
var alt = el('div', 'dms-alt'), sec = el('button', 'dms-sec', 'Bu bedeni seç'); sec.type = 'button'; sec.disabled = true; alt.appendChild(sec);
pn.appendChild(ust); pn.appendChild(ic); pn.appendChild(alt); document.body.appendChild(ort); document.body.appendChild(pn);
var bedenler = sayfaBedenleri(); Object.keys(stokBeden).forEach(function (b) { if (bedenler.indexOf(b) < 0) bedenler.push(b); });
var aktif = '', dugmeler = {};
bedenler.forEach(function (b) {
var x = el('button', 'dms-bd', b); x.type = 'button'; x.setAttribute('aria-pressed', 'false');
if (!stokBeden[b]) { x.className += ' dms-yok'; x.setAttribute('aria-label', b + ' beden, mağazalarda yok'); }
x.addEventListener('click', function () { goster(b); }); dugmeler[b] = x; bdl.appendChild(x);
});
function goster(b) {
aktif = b; Object.keys(dugmeler).forEach(function (k) { dugmeler[k].setAttribute('aria-pressed', k === b ? 'true' : 'false'); });
var o = b ? secenek(b) : null, oy = !!(o && onlineYok(o));
sbD.nodeValue = b || '—'; sonuc.textContent = ''; sec.disabled = !o || oy; sec.textContent = oy ? 'Online tükendi' : 'Bu bedeni seç'; if (!b) return;
var var_ = magazalar.filter(function (m) { return d[m].indexOf(b) >= 0; });
if (!var_.length) { sonuc.appendChild(el('div', 'dms-bos', b + ' beden şu an mağazalarımızda yok.' + (o && !oy ? ' Online sipariş verebilirsiniz.' : ''))); return; }
sonuc.appendChild(el('div', 'dms-say', b + ' beden ' + var_.length + ' mağazada var'));
var gr = {}; var_.forEach(function (m) { var s = (sehirler && sehirler[m]) || 'Diğer'; (gr[s] = gr[s] || []).push(m); });
Object.keys(gr).sort(function (x, y) { return x === 'Diğer' ? 1 : y === 'Diğer' ? -1 : x.localeCompare(y, TR); }).forEach(function (s) {
sonuc.appendChild(el('div', 'dms-s', s));
gr[s].sort(function (x, y) { return ad(x).localeCompare(ad(y), TR); }).forEach(function (m) { var r = el('div', 'dms-m'); r.appendChild(el('div', '', ad(m))); r.appendChild(el('span', '', 'Stokta')); sonuc.appendChild(r); });
});
if (oy) sonuc.appendChild(el('div', 'dms-uy', b + ' beden online tükendi; yalnızca mağazalarımızda bulabilirsiniz.'));
}
var donus = null, TEL = window.matchMedia ? window.matchMedia('(max-width:600px)') : null;
function altBosluk() { // altta sabit duran çerez bandının yüksekliği (sitenin çerez aracı gölge DOM içinde olabilir); telefonda pencere onun üstünde ortalanır
var h = 0;
function bak(kok) {
var l = kok.querySelectorAll('*'), i, e, st, r;
for (i = 0; i < l.length; i++) {
e = l[i]; if (e.shadowRoot) bak(e.shadowRoot);
st = getComputedStyle(e); if (st.position !== 'fixed' || parseInt(st.bottom, 10) > 12) continue;
r = e.getBoundingClientRect();
if (r.height > 60 && r.height < 600 && r.width > 200 && !/(^| )(dms|bb)-/.test(String(e.className || '')) && /çerez|cerez|cookie/i.test(e.innerText || e.textContent || '')) h = Math.max(h, r.height + (parseInt(st.bottom, 10) || 0));
}
}
try { bak(document); } catch (e) { }
return Math.round(h);
}
function yerlestir() { if (!TEL || !TEL.matches) { pn.style.top = pn.style.maxHeight = ''; return; } var h = altBosluk(), y = window.innerHeight - h; pn.style.top = Math.round(y / 2) + 'px'; pn.style.maxHeight = Math.max(240, Math.round(Math.min(y - 32, window.innerHeight * 0.85))) + 'px'; }
function ac() { duoEv('duo_stok_ac'); if (kucukResim && !img.getAttribute('src')) img.src = kucukResim; donus = document.activeElement; ort.hidden = pn.hidden = false; yerlestir(); document.body.classList.add('dms-kilit'); var s = secili(); goster(s && dugmeler[s] ? s : aktif); requestAnimationFrame(function () { ort.classList.add('dms-ac'); pn.classList.add('dms-ac'); }); pn.focus(); }
function kapa() { ort.classList.remove('dms-ac'); pn.classList.remove('dms-ac'); document.body.classList.remove('dms-kilit'); setTimeout(function () { ort.hidden = pn.hidden = true; }, 260); if (donus && donus.focus) donus.focus(); }
a.addEventListener('click', ac); kp.addEventListener('click', kapa); ort.addEventListener('click', kapa);
pn.addEventListener('keydown', function (e) {
if (e.key === 'Escape') { kapa(); return; }
if (e.key !== 'Tab') return; var f = [].slice.call(pn.querySelectorAll('button:not([disabled])')); if (!f.length) return; // odak panelin içinde döner
if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
});
sec.addEventListener('click', function () { // sayfadaki beden listesinde aynı bedeni seçer (sitenin kendi değişiklik olayıyla)
var s = bedenSec(), o = secenek(aktif); if (!s || !o || onlineYok(o)) return;
s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); if (window.jQuery) window.jQuery(s).trigger('change'); kapa();
});
}
function calis() {
var ctl = window.AbortController ? new AbortController() : null, z = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
fetch(ADRES, ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
clearTimeout(z); if (!j || !j.v || !j.t) return;
if (Date.now() - Date.parse(j.t) > ESKI_SAAT * 3600000) return; // veri bayatsa yanlış stok göstermemek için bölüm yok
var d = j.v[kod] || j.v[kod.toLowerCase()] || j.v[kod.replace(/I/g, 'ı').toLowerCase()]; if (d) { if (document.getElementById('liTabOzellikler') || document.readyState !== 'loading') kur(d, j.m, j.t); else document.addEventListener('DOMContentLoaded', function () { kur(d, j.m, j.t); }); } // sekme henüz yoksa sayfa hazır olunca // Nebim'de birkaç eski kod küçük harf / noktasız ı ile kayıtlı
}).catch(function () {});
}
calis(); // 2026-11-17: sayfanın tamamen hazır olması (DOMContentLoaded) beklenmez; blok sayfa sonunda olduğu için ürün sekmeleri zaten hazır. Önceden veri ~3 sn geç geliyor, bölüm geç beliriyordu.
})();

(function () {
if (window.__dmk) return; window.__dmk = 1;
function duoEv(n) { try { if (window.gtag) window.gtag('event', n); } catch (e) { } } // \u00f6l\u00e7\u00fcm: GA4'e yaln\u0131z olay ad\u0131 gider (ki\u015fisel veri yok); panel \u203a Site eklentileri
var TR = 'tr-TR';
function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
function bagliUrunler() { // sayfan\u0131n alt\u0131ndaki "G\u00f6r\u00fcn\u00fcm\u00fc Tamamla" b\u00f6l\u00fcm\u00fcndeki \u00fcr\u00fcn kimlikleri
var bas = [].slice.call(document.querySelectorAll('.JKatAdi .satir1, .JKatAdi span')).filter(function (e) { return /g\u00f6r\u00fcn\u00fcm\u00fc tamamla/i.test(e.textContent); })[0];
var kap = bas && bas.closest('.jCarouselLite'); if (!kap) return [];
var bu = (location.pathname.match(/-(\d+)\/?$/) || [])[1] || '', gor = {}; // bu sayfan\u0131n \u00fcr\u00fcn kimli\u011fi adresin sonundaki say\u0131
return [].slice.call(kap.querySelectorAll('.detailLink[data-id]')).map(function (a) { return a.getAttribute('data-id'); }).filter(function (id) { if (!id || id === bu || gor[id]) return false; gor[id] = 1; return true; });
}
function urunleriGetir(ids) { // fiyat, beden ve stok Ticimax \u00fcr\u00fcn servisinden (anl\u0131k)
var f = { CategoryIdList: [], BrandIdList: [], SupplierIdList: [], TagIdList: [], TagId: -1, FilterObject: [], MinStockAmount: -1, IsShowcaseProduct: -1, IsOpportunityProduct: -1, FastShipping: -1, IsNewProduct: -1, IsBestSeller: -1, IsDiscountedProduct: -1, IsShippingFree: -1, IsProductCombine: -1, MinPrice: 0, MaxPrice: 0, Point: -1, SearchKeyword: '', StrProductIds: ids.join(',') };
return fetch('/api/product/GetProductList?FilterJson=' + encodeURIComponent(JSON.stringify(f)) + '&PagingJson=' + encodeURIComponent(JSON.stringify({ PageItemCount: 20, PageNumber: 1, OrderBy: 'KATEGORISIRA', OrderDirection: 'ASC' })), { credentials: 'same-origin' })
.then(function (r) { return r.json(); }).then(function (j) { var P = (j && j.products) || []; return ids.map(function (id) { return P.filter(function (p) { return String(p.productId) === id; })[0]; }).filter(Boolean); });
}
function sepeteEkle(p, variantId, bitti) { // Ticimax'in kendi sepet i\u015flevi; ba\u015far\u0131 Ticimax'in successCallBack'i ile bildirilir (hata mesaj\u0131n\u0131 Ticimax kendi g\u00f6sterir)
var c = window.cart && window.cart.add; if (!c || typeof c.createModel !== 'function') { location.href = p.url; return; }
var oldu = false, son = function (b) { if (oldu) return; oldu = true; bitti(b); };
c.model = c.createModel(); c.model.productUnique = p.productUnique; c.model.productId = p.productId; c.model.variantId = variantId; c.model.piece = 1; c.model.assortmentProductId = 0; c.model.productUrl = p.url;
c.model.successCallBack = function () { duoEv('duo_kombin_sepet'); son(true); }; try { c.execute(); } catch (e) { son(false); } setTimeout(function () { son(null); }, 6000); // yan\u0131t gelmezse d\u00fc\u011fme yine a\u00e7\u0131l\u0131r
}

function kur(ids) {
var satinAl = document.getElementById('divSatinAl'); if (!satinAl || document.getElementById('dmkDugme')) return;
var st = el('style'); st.textContent =
'#divSatinAl.dmk-var{margin-bottom:10px!important}#dmkDugme{display:block;width:100%;height:42px;margin:0;border:1px solid #000;background:#fff;color:#000;font-family:Karla,sans-serif;font-size:15px;font-weight:300;letter-spacing:0;text-transform:none;cursor:pointer;border-radius:0}#dmkDugme:hover{background:#000;color:#fff}#dmkDugme:focus-visible{outline:1px solid #000;outline-offset:2px}' +
'.dmk-ort{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:2147483644;opacity:0;transition:opacity .25s}.dmk-ort.dmk-ac{opacity:1}' +
'.dmk-pn{position:fixed;top:0;right:0;bottom:0;width:440px;max-width:100%;background:#fff;color:#000;z-index:2147483645;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;font-family:Karla,sans-serif;font-size:12.8px;line-height:1.5;-webkit-font-smoothing:antialiased}.dmk-pn.dmk-ac{transform:none}.dmk-pn:focus{outline:none}' +
'.dmk-pn *{box-sizing:border-box;font-family:inherit}.dmk-ust{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #ececec}.dmk-bas{margin:0;font-size:14px;line-height:20px;font-weight:700;text-transform:uppercase}' +
'.dmk-kp{display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin:-8px -10px -8px 0;padding:0;border:0;background:none;cursor:pointer;color:#000}' +
'.dmk-ic{flex:1;overflow-y:auto;padding:4px 24px 24px}.dmk-u{display:flex;gap:16px;padding:20px 0;border-bottom:1px solid #ececec}.dmk-u:last-child{border-bottom:0}' +
'.dmk-r{flex:none;width:112px}.dmk-r img{display:block;width:112px;height:168px;object-fit:cover;background:#f5f5f5}.dmk-b{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}' +
'.dmk-ad{font-size:13px;line-height:1.4;color:#000;text-decoration:none}.dmk-ad:hover{text-decoration:underline}.dmk-f{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.dmk-eski{color:#b8b8b8;text-decoration:line-through;font-size:14px}.dmk-yeni{font-size:16px;font-weight:600}.dmk-ind{color:#aa1010}' +
'.dmk-bl{font-size:11px;font-weight:700;text-transform:uppercase;color:#616161;margin-top:4px}.dmk-bd{display:flex;flex-wrap:wrap;gap:6px}' +
'.dmk-bz{min-width:46px;height:42px;padding:0 8px;border:1px solid #d7d7d8;background:#fff;color:#000;font-size:13px;cursor:pointer}.dmk-bz:hover{border-color:#000}.dmk-bz[aria-pressed=true]{background:#000;color:#fff;border-color:#000}.dmk-bz:disabled{color:#b0b0b0;text-decoration:line-through;cursor:default;border-color:#ececec}' +
'.dmk-s{margin-top:auto;height:42px;border:0;background:#000;color:#fff;font-size:15px;font-weight:300;cursor:pointer}.dmk-s:disabled{background:#c8c8c8;cursor:default}.dmk-s.dmk-tamam,.dmk-s.dmk-tamam:disabled{background:#000;color:#fff;opacity:1}.dmk-s.dmk-bekle:disabled{background:#000;color:#fff;opacity:.6}' +
'.dmk-bos{padding:24px 0;color:#616161}.dmk-kp:focus-visible,.dmk-bz:focus-visible,.dmk-s:focus-visible{outline:1px solid #000;outline-offset:2px}body.dmk-kilit{overflow:hidden}' +
'@media (max-width:600px){.dmk-pn{top:50%;bottom:auto;left:16px;right:16px;width:auto;max-width:none;max-height:85vh;max-height:85dvh;opacity:0;transform:translateY(-48%);transition:opacity .2s,transform .2s}.dmk-pn.dmk-ac{opacity:1;transform:translateY(-50%)}.dmk-ic{flex:1 1 auto;min-height:0}.dmk-ust,.dmk-ic{padding-left:16px;padding-right:16px}.dmk-r,.dmk-r img{width:96px}.dmk-r img{height:144px}}';
document.head.appendChild(st);

var dugme = el('button', '', 'Kombininizi Tamamlay\u0131n'); dugme.id = 'dmkDugme'; dugme.type = 'button'; dugme.setAttribute('aria-haspopup', 'dialog');
satinAl.parentNode.insertBefore(dugme, satinAl.nextSibling); satinAl.classList.add('dmk-var'); // Sepete Ekle alan\u0131n\u0131n alt bo\u015flu\u011fu (sitede 20 px) 10 px olur: iki d\u00fc\u011fme bir \u00e7ift gibi durur

var ort = el('div', 'dmk-ort'), pn = el('div', 'dmk-pn'); pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-modal', 'true'); pn.setAttribute('aria-labelledby', 'dmkBas'); pn.tabIndex = -1; ort.hidden = pn.hidden = true;
var ust = el('div', 'dmk-ust'), bas = el('h2', 'dmk-bas', 'Kombininizi tamamlay\u0131n'); bas.id = 'dmkBas';
var kp = el('button', 'dmk-kp'); kp.type = 'button'; kp.setAttribute('aria-label', 'Kapat'); kp.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
ust.appendChild(bas); ust.appendChild(kp); var ic = el('div', 'dmk-ic'); ic.appendChild(el('div', 'dmk-bos', 'Y\u00fckleniyor\u2026'));
pn.appendChild(ust); pn.appendChild(ic); document.body.appendChild(ort); document.body.appendChild(pn);

var yuklendi = false;
function doldur() {
if (yuklendi) return; yuklendi = true;
urunleriGetir(ids).then(function (P) {
ic.textContent = ''; if (!P.length) { ic.appendChild(el('div', 'dmk-bos', '\u015eu an \u00f6nerilecek \u00fcr\u00fcn yok.')); return; }
P.forEach(function (p) {
var u = el('div', 'dmk-u'), r = el('a', 'dmk-r'), img = el('img'), b = el('div', 'dmk-b');
r.href = p.url; img.src = String(p.imageThumbPath || '').replace('/thumb/', '/buyuk/'); img.alt = p.name || ''; r.appendChild(img);
var ad = el('a', 'dmk-ad', String(p.name || '').replace(/\s+/g, ' ').trim()); ad.href = p.url; b.appendChild(ad);
var f = el('div', 'dmk-f'); if (p.discountRate > 0 && p.productSellPriceStr && p.productSellPriceStr !== p.productCartPriceStr) f.appendChild(el('span', 'dmk-eski', p.productSellPriceStr));
f.appendChild(el('span', 'dmk-yeni' + (p.discountRate > 0 ? ' dmk-ind' : ''), p.productCartPriceStr || '')); b.appendChild(f);
var bedenler = (p.variantDetails || []).filter(function (v) { return v.variantTypeName === 'Beden'; }), stokta = bedenler.filter(function (v) { return v.stockAmount > 0; });
var sec = null, s = el('button', 'dmk-s', 'Sepete Ekle'); s.type = 'button'; s.setAttribute('aria-live', 'polite');
if (bedenler.length > 1 || (bedenler.length === 1 && !/^(std|standart)$/i.test(bedenler[0].name))) {
b.appendChild(el('div', 'dmk-bl', 'Beden')); var bd = el('div', 'dmk-bd'); bd.setAttribute('role', 'group'); bd.setAttribute('aria-label', 'Beden');
bedenler.forEach(function (v) { var z = el('button', 'dmk-bz', v.name); z.type = 'button'; z.setAttribute('aria-pressed', 'false'); if (!(v.stockAmount > 0)) { z.disabled = true; z.setAttribute('aria-label', v.name + ' beden, t\u00fckendi'); }
z.addEventListener('click', function () { sec = v; [].slice.call(bd.children).forEach(function (x) { x.setAttribute('aria-pressed', x === z ? 'true' : 'false'); }); if (!s.classList.contains('dmk-bekle')) { s.disabled = false; s.classList.remove('dmk-tamam'); s.textContent = 'Sepete Ekle'; } }); bd.appendChild(z); });
b.appendChild(bd); s.disabled = true; s.textContent = stokta.length ? 'Bedenini se\u00e7' : 'T\u00fckendi';
} else if (bedenler.length === 1) { sec = bedenler[0]; if (!(sec.stockAmount > 0)) { s.disabled = true; s.textContent = 'T\u00fckendi'; } }
else { sec = { variantId: p.variantId || p.defaultVariantId }; if (!(p.totalStockAmount > 0)) { s.disabled = true; s.textContent = 'T\u00fckendi'; } }
s.addEventListener('click', function () {
if (!sec || s.disabled) return; s.disabled = true; s.classList.add('dmk-bekle'); s.textContent = 'Ekleniyor\u2026'; // birden fazla bas\u0131\u015f sepete tekrar eklemez
sepeteEkle(p, sec.variantId, function (sonuc) {
s.classList.remove('dmk-bekle'); if (sonuc === false) { s.disabled = false; s.textContent = 'Sepete Ekle'; return; }
s.classList.add('dmk-tamam'); s.textContent = '\u2713 Sepete eklendi';
if (sonuc) setTimeout(kapa, 700); // Ticimax kendi sepet panelini a\u00e7ar: bizimki kapan\u0131r, iki panel \u00fcst \u00fcste kalmaz
setTimeout(function () { s.classList.remove('dmk-tamam'); s.disabled = false; s.textContent = 'Sepete Ekle'; }, 2500);
});
});
b.appendChild(s); u.appendChild(r); u.appendChild(b); ic.appendChild(u);
});
}).catch(function () { yuklendi = false; ic.textContent = ''; ic.appendChild(el('div', 'dmk-bos', '\u00dcr\u00fcnler y\u00fcklenemedi, l\u00fctfen tekrar deneyin.')); });
}
var donus = null;
function ac() { duoEv('duo_kombin_ac'); donus = document.activeElement; doldur(); ort.hidden = pn.hidden = false; document.body.classList.add('dmk-kilit'); requestAnimationFrame(function () { ort.classList.add('dmk-ac'); pn.classList.add('dmk-ac'); }); pn.focus(); }
function kapa() { ort.classList.remove('dmk-ac'); pn.classList.remove('dmk-ac'); document.body.classList.remove('dmk-kilit'); setTimeout(function () { ort.hidden = pn.hidden = true; }, 260); if (donus && donus.focus) donus.focus(); }
dugme.addEventListener('click', ac); (window.requestIdleCallback || function (f) { setTimeout(f, 1500); })(doldur); // veri ve g\u00f6rseller sayfa bo\u015fta iken \u00f6nden y\u00fcklenir; panel an\u0131nda dolu a\u00e7\u0131l\u0131r
kp.addEventListener('click', kapa); ort.addEventListener('click', kapa); pn.addEventListener('keydown', function (e) { if (e.key === 'Escape') kapa(); });
}
function basla() { // "G\u00f6r\u00fcn\u00fcm\u00fc Tamamla" b\u00f6l\u00fcm\u00fc ve Sepete Ekle alan\u0131 sayfa a\u00e7\u0131l\u0131nca haz\u0131r olur; gelmezse 15 sn sonra vazge\u00e7ilir
var t0 = Date.now(), iv = setInterval(function () { var ids = bagliUrunler(); if (ids.length && document.getElementById('divSatinAl')) { clearInterval(iv); kur(ids); } else if (Date.now() - t0 > 15000) clearInterval(iv); }, 200);
}
if (document.documentElement.innerHTML.indexOf('"stockCode":"') > -1) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla); else basla(); }
})();

(function () {
if (window.__dki) return; window.__dki = 1;
function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
var SVG_ARTI = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>';
var SVG_KALP = '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.3l-7.3-7.4a4.6 4.6 0 0 1 6.5-6.6l.8.8.8-.8a4.6 4.6 0 0 1 6.5 6.6z"/></svg>';
var SVG_KAPAT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';

var st = el('style'); st.textContent =
'.dki-kutu{position:absolute;right:12px;bottom:12px;z-index:5;display:flex;flex-direction:column;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06)}' +
'.dki-kutu button{display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin:0;padding:0;border:0;background:#fff;color:#000;cursor:pointer;border-radius:0;-webkit-tap-highlight-color:transparent}' +
'.dki-kutu button+button{border-top:1px solid #e6e6e6}.dki-kutu button:hover{background:#f4f4f4}.dki-kutu button:focus-visible{outline:1px solid #000;outline-offset:-3px}' +
'.dki-kalp svg{fill:none}.dki-kalp[aria-pressed=true] svg{fill:#000}' +
'.ItemOrj .productDetail .favori.dki-gizli,#ProductPageProductList .productDetail .favori{display:none!important}' +
'#ProductPageProductList .productItem .boxBedenlerContent,.ItemOrj .productItem.dki-var .boxBedenlerContent{display:none!important}' + // Ticimax'in \u00fczerine gelince beden \u015feridi (yaln\u0131z g\u00f6sterir) kutuyla \u00e7ak\u0131\u015f\u0131yor; + ayn\u0131 bilgiyi verir

'.dki-pn{position:absolute;left:0;right:0;bottom:0;z-index:6;background:#fff;font-family:Karla,sans-serif;color:#000;transform:translateY(100%);transition:transform .2s ease;padding:12px 12px 14px}.dki-pn.dki-ac{transform:none}' +
'.dki-pn *{box-sizing:border-box;font-family:inherit}.dki-ust{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.dki-bas{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.02em}' +
'.dki-kp{display:flex;align-items:center;justify-content:center;width:32px;height:32px;margin:-6px -6px -6px 0;border:0;background:none;color:#000;cursor:pointer;padding:0}' +
'.dki-bd{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:6px}' +
'.dki-bz{height:38px;border:1px solid #d7d7d8;background:#fff;color:#000;font-size:13px;cursor:pointer;padding:0 4px}.dki-bz:hover{border-color:#000}.dki-bz:disabled{color:#b0b0b0;text-decoration:line-through;border-color:#ececec;cursor:default}.dki-bz.dki-bekle{background:#000;color:#fff;border-color:#000}.dki-mesgul .dki-bz{pointer-events:none}.dki-mesgul .dki-bz:not(.dki-bekle){opacity:.5}' +
'.dki-not{font-size:12.8px;color:#616161;padding:6px 0}.dki-git{display:inline-block;margin-top:10px;font-size:12.8px;color:#000;text-decoration:underline}' +
'.dki-kp:focus-visible,.dki-bz:focus-visible,.dki-git:focus-visible{outline:1px solid #000;outline-offset:2px}' +
// \u00dcr\u00fcn listesinin g\u00f6r\u00fcn\u00fcm\u00fc (renk kareleri, noktalar, bo\u015fluk) beti\u011fi beklemeden, kart i\u015faretine (dki-var) ba\u011fl\u0131 olmadan uygulan\u0131r: sayfa a\u00e7\u0131l\u0131rken eski g\u00f6r\u00fcn\u00fcm bir an bile g\u00f6r\u00fcnmesin
// Renk kartlar\u0131 (Arket gibi): yuvarlak yerine k\u00fc\u00e7\u00fck kare, ince \u00e7er\u00e7eve (beyaz renk de g\u00f6r\u00fcns\u00fcn); en \u00e7ok 3, fazlas\u0131 Ticimax'in kendi "+N" sayac\u0131yla (.v-count)
'#ProductPageProductList .productItem .boxUrunlerContainer{display:flex;flex-wrap:wrap;align-items:center;gap:6px}#ProductPageProductList .productItem .boxUrunlerContainer>div{margin:0!important;padding:0!important;line-height:0;width:auto!important;height:auto!important;float:none!important;border-radius:0!important;outline:0!important;box-shadow:none!important;border:0!important;background:none!important}' +
'#ProductPageProductList .productItem .boxUrunResimContent{display:block;margin:0!important;padding:0!important;line-height:0}' +
'#ProductPageProductList .productItem .boxUrunResimContent img{width:16px!important;height:16px!important;border-radius:0!important;border:1px solid #c8c8c8!important;box-sizing:border-box;object-fit:cover;margin:0!important}' +
'#ProductPageProductList .productItem .boxUrunResimContent:hover img{border-color:#000!important}#ProductPageProductList .productItem .boxUrunlerContainer>div:nth-child(n+4){display:none!important}#ProductPageProductList .productItem .boxUrunlerTittle:empty{display:none!important}#ProductPageProductList .productItem .boxUrunlerContent{display:flex;align-items:center;gap:6px}#ProductPageProductList .productItem .v-count{display:inline-block!important;position:static!important;margin:0!important;padding:0!important;font-family:Karla,sans-serif;font-size:13px;line-height:16px;height:16px;color:#000;background:none!important;border:0!important}' +
// Foto\u011fraf \u00e7izgisi (COS gibi): resmin en alt\u0131nda ince iz, koyu b\u00f6l\u00fcm hangi foto\u011frafta olundu\u011funu g\u00f6sterir; noktalar\u0131n yerini al\u0131r
'.dki-iz{position:absolute;left:0;right:0;bottom:0;height:2px;z-index:4;background:rgba(0,0,0,.08);pointer-events:none;overflow:hidden}.dki-iz i{position:absolute;top:0;left:0;height:100%;background:rgba(0,0,0,.45);transition:transform .25s ease}' +
'#ProductPageProductList .productItem .productImage .owl-dots{display:none!important}' +
// Kartlar aras\u0131 bo\u015fluk yok (COS gibi): resimler yan yana birle\u015fir, ad/fiyat/renk resim kenar\u0131ndan 10 px i\u00e7eride
'#ProductPageProductList{margin-left:0!important;margin-right:0!important}#ProductPageProductList>.ItemOrj{padding-left:0!important;padding-right:0!important}#ProductPageProductList .productItem .productDetail{padding-left:10px!important;padding-right:10px!important}' +
// Renkler fiyatla ayn\u0131 sat\u0131rda, sa\u011fda (COS gibi): ad tam sat\u0131r, alt\u0131nda solda fiyat, sa\u011fda renk kareleri + saya\u00e7; bir sat\u0131r kazan\u0131l\u0131r
'#ProductPageProductList .productItem .productDetail{display:flex!important;flex-wrap:wrap;align-items:center;column-gap:8px}#ProductPageProductList .productItem .productDetail>*{flex:0 0 100%;min-width:0}#ProductPageProductList .productItem .productDetail>.productPrice{flex:0 1 auto;margin:0!important}#ProductPageProductList .productItem .productDetail>.boxUrunlerContent{flex:0 0 auto;margin:0 0 0 auto!important;width:auto!important}#ProductPageProductList .productItem .productDetail>.productMarka:empty,#ProductPageProductList .productItem .productDetail>.productIcon:empty{display:none}' +
// Sayfan\u0131n \u00fcst\u00fcne \u00e7\u0131k d\u00fc\u011fmesi (COS gibi, t\u00fcm sayfalar): yuvarlak k\u00fc\u00e7\u00fck d\u00fc\u011fme yerine 44 px beyaz kare, ince siyah \u00e7er\u00e7eve, ince ok (ok CSS \u00e7izgisiyle \u00e7izilir: blokta g\u00f6m\u00fcl\u00fc resim/data: adresi yok, Ticimax y\u00f6netim ekran\u0131 yap\u0131\u015ft\u0131r\u0131rken t\u0131kan\u0131yordu)
'#back-to-top{width:44px!important;height:44px!important;right:24px!important;bottom:24px!important}#back-to-top a{width:44px!important;height:44px!important;border-radius:0!important;border:1px solid #000!important;background:#fff!important;box-shadow:none!important;display:flex!important;align-items:center;justify-content:center}#back-to-top a svg{display:none!important}#back-to-top a:before{content:"";width:9px;height:9px;border-left:1px solid #000;border-top:1px solid #000;transform:translateY(2px) rotate(45deg)}#back-to-top a:hover{background:#f4f4f4!important}' +
'@media (max-width:767px){#back-to-top,#back-to-top a{width:38px!important;height:38px!important}#back-to-top{right:12px!important;bottom:84px!important}}' +
// \u00dcr\u00fcn sayfas\u0131, telefon: foto\u011fraf alan\u0131 kenardan kenara (uygulama hissi). Sayfa kutusu (#divIcerik) iki yanda 10 px i\u00e7 bo\u015fluk veriyor; yaln\u0131z foto\u011fraf
// alan\u0131 d\u0131\u015far\u0131 ta\u015f\u0131r\u0131l\u0131r, ad/fiyat yerinde kal\u0131r. width:auto KULLANMA (galeri kayd\u0131r\u0131c\u0131s\u0131 geni\u015fli\u011fi yanl\u0131\u015f hesaplay\u0131p sayfay\u0131 yana ta\u015f\u0131rd\u0131); calc ile verilir.
'@media (max-width:767px){#divIcerik.productDetailContainer .leftImage{margin-left:-10px!important;margin-right:-10px!important;width:calc(100% + 20px)!important;max-width:calc(100% + 20px)!important}}' +
// \u00dcr\u00fcn sayfas\u0131 foto\u011fraf oklar\u0131: Ticimax'in yar\u0131 saydam yuvarlak "\u2039 \u203a" oklar\u0131 yerine kategori kartlar\u0131ndaki gibi 32 px beyaz kare + ince ok (dosya GitHub'dan geldi\u011fi i\u00e7in data: adresi sorun de\u011fil; Ticimax kutusuna YAPI\u015eTIRILMAZ)
'#divProductImageCarousel .owl-nav .owl-prev,#divProductImageCarousel .owl-nav .owl-next{width:32px!important;height:32px!important;margin-top:-16px!important;padding:0!important;background:#fff center/16px 16px no-repeat!important;border:0!important;border-radius:0!important;box-shadow:none!important;opacity:1}#divProductImageCarousel .owl-nav .owl-prev{left:12px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23000%22 stroke-width=%221.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M19 12H5M11 6l-6 6 6 6%22/%3E%3C/svg%3E")!important}#divProductImageCarousel .owl-nav .owl-next{right:12px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23000%22 stroke-width=%221.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M5 12h14M13 6l6 6-6 6%22/%3E%3C/svg%3E")!important}#divProductImageCarousel .owl-nav .owl-prev span,#divProductImageCarousel .owl-nav .owl-next span{display:none!important}#divProductImageCarousel .owl-nav .disabled{opacity:.35!important}' +
// Telefonda \u00fcr\u00fcn sayfas\u0131 oklar\u0131 COS gibi: kutu/zemin yok, yaln\u0131z ince ok i\u015fareti (kullan\u0131c\u0131 karar\u0131); koyu fonlu foto\u011frafta g\u00f6r\u00fcns\u00fcn diye hafif a\u00e7\u0131k hale
'@media (max-width:767px){#divProductImageCarousel .owl-nav .owl-prev,#divProductImageCarousel .owl-nav .owl-next{width:36px!important;height:44px!important;margin-top:-22px!important;background-color:transparent!important;background-size:20px 20px!important;filter:drop-shadow(0 0 1px rgba(255,255,255,.95)) drop-shadow(0 0 3px rgba(255,255,255,.7))}#divProductImageCarousel .owl-nav .owl-prev{left:4px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23111%22 stroke-width=%221.3%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M15 5l-7 7 7 7%22/%3E%3C/svg%3E")!important}#divProductImageCarousel .owl-nav .owl-next{right:4px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23111%22 stroke-width=%221.3%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M9 5l7 7-7 7%22/%3E%3C/svg%3E")!important}#divProductImageCarousel .owl-nav .disabled{opacity:0!important}}' +
// Telefonda liste kartlar\u0131nda Ticimax'in "\u2039 \u203a" oklar\u0131 gizli (kullan\u0131c\u0131 karar\u0131): foto\u011fraf parmakla kayd\u0131r\u0131l\u0131r, ka\u00e7 foto\u011fraf oldu\u011funu alttaki ince \u00e7izgi g\u00f6sterir
'@media (max-width:767px){#ProductPageProductList .productImage .owl-nav{display:none!important}}' +
'.dki-ok{position:absolute;top:50%;z-index:5;display:none;align-items:center;justify-content:center;width:32px;height:32px;margin-top:-16px;padding:0;border:0;border-radius:0;background:#fff;color:#000;cursor:pointer}.dki-ok:hover{background:#f4f4f4}.dki-ok:focus-visible{outline:1px solid #000;outline-offset:-3px}.dki-ok[disabled]{opacity:.35;cursor:default}.dki-geri{left:12px}.dki-ileri{right:12px}' +
// Fareli ekranlarda (Arket gibi): oklar ve ikonlar yaln\u0131z kart\u0131n \u00fczerine gelince ya da klavyeyle odaklan\u0131nca g\u00f6r\u00fcn\u00fcr; dokunmatik ekranlarda ikonlar hep g\u00f6r\u00fcn\u00fcr, resim parmakla kayd\u0131r\u0131l\u0131r
'@media (hover:hover) and (pointer:fine){.dki-kutu{opacity:0;transition:opacity .15s}.dki-kutu button{width:32px;height:32px}.dki-kutu svg{width:17px;height:17px}' +
'.productImage:hover .dki-kutu,.dki-kutu:focus-within,.productImage.dki-panelde .dki-kutu{opacity:1}.productImage:hover .dki-ok.dki-coklu,.dki-ok.dki-coklu:focus-visible{display:flex}.dki-iz{opacity:0;transition:opacity .15s}.productImage:hover .dki-iz{opacity:1}' +
'}' +

// Telefonda kart dar: fiyat + eski fiyat + renkler tek sat\u0131ra s\u0131\u011fm\u0131yor, renkler alta d\u00fc\u015f\u00fcp sa\u011fa yaslan\u0131nca da\u011f\u0131n\u0131k duruyordu. Telefonda renkler fiyat\u0131n alt\u0131nda ayr\u0131 sat\u0131rda, sola yasl\u0131, fiyatla ayn\u0131 hizada (kullan\u0131c\u0131 karar\u0131), biraz k\u00fc\u00e7\u00fck
'@media (max-width:767px){#ProductPageProductList .productItem .productDetail>.boxUrunlerContent{flex:0 0 100%;margin:6px 0 0!important;padding:0!important;justify-content:flex-start}#ProductPageProductList .productItem .boxUrunlerContainer{margin:0!important;padding:0!important}#ProductPageProductList .productItem .productDetail{padding-left:8px!important;padding-right:8px!important}#ProductPageProductList .productItem .boxUrunResimContent img{width:14px!important;height:14px!important}#ProductPageProductList .productItem .v-count{font-size:12px;line-height:14px;height:14px}}' +
'.dki-ok .dki-k{display:none}' +
'@media (max-width:767px){.dki-ok.dki-coklu{display:flex;width:28px;height:48px;margin-top:-24px;background:transparent;color:#111;filter:drop-shadow(0 0 1px rgba(255,255,255,.95)) drop-shadow(0 0 3px rgba(255,255,255,.7))}.dki-ok:hover{background:transparent}.dki-ok svg:not(.dki-k){display:none}.dki-ok .dki-k{display:block}.dki-geri{left:0}.dki-ileri{right:0}.dki-ok[disabled]{opacity:0;pointer-events:none}}' +
'@media (max-width:767px){.dki-kutu{right:6px;bottom:6px}.dki-kutu button{width:34px;height:34px}.dki-kutu svg{width:17px;height:17px}' +
'.dki-pn{position:fixed;z-index:2147483645;padding:16px 16px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -4px 24px rgba(0,0,0,.12)}.dki-bas{font-size:13px}.dki-bd{grid-template-columns:repeat(auto-fill,minmax(64px,1fr))}.dki-bz{height:44px}' +
'.dki-ort{position:fixed;inset:0;z-index:2147483644;background:rgba(0,0,0,.35)}}';
document.head.appendChild(st);

var veri = {}; // \u00fcr\u00fcn kimli\u011fi \u2192 servis yan\u0131t\u0131 (oturum boyunca)
function urunGetir(id) {
if (veri[id]) return Promise.resolve(veri[id]);
var f = { CategoryIdList: [], BrandIdList: [], SupplierIdList: [], TagIdList: [], TagId: -1, FilterObject: [], MinStockAmount: -1, IsShowcaseProduct: -1, IsOpportunityProduct: -1, FastShipping: -1, IsNewProduct: -1, IsBestSeller: -1, IsDiscountedProduct: -1, IsShippingFree: -1, IsProductCombine: -1, MinPrice: 0, MaxPrice: 0, Point: -1, SearchKeyword: '', StrProductIds: String(id) };
return fetch('/api/product/GetProductList?FilterJson=' + encodeURIComponent(JSON.stringify(f)) + '&PagingJson=' + encodeURIComponent(JSON.stringify({ PageItemCount: 1, PageNumber: 1, OrderBy: 'KATEGORISIRA', OrderDirection: 'ASC' })), { credentials: 'same-origin' })
.then(function (r) { return r.json(); }).then(function (j) { var p = ((j && j.products) || []).filter(function (x) { return String(x.productId) === String(id); })[0]; if (p) veri[id] = p; return p; });
}
function sepeteEkle(p, variantId, bitti) {
var c = window.cart && window.cart.add; if (!c || typeof c.createModel !== 'function') { location.href = p.url; return; }
var oldu = false, son = function (b) { if (oldu) return; oldu = true; bitti(b); };
c.model = c.createModel(); c.model.productUnique = p.productUnique; c.model.productId = p.productId; c.model.variantId = variantId; c.model.piece = 1; c.model.assortmentProductId = 0; c.model.productUrl = p.url;
c.model.successCallBack = function () { son(true); }; try { c.execute(); } catch (e) { son(false); } setTimeout(function () { son(null); }, 6000);
}

var acik = null; // ayn\u0131 anda tek beden paneli
function paneliKapa() { if (!acik) return; var a = acik; acik = null; a.pn.classList.remove('dki-ac'); if (a.resim) a.resim.classList.remove('dki-panelde'); if (a.ort) a.ort.remove(); setTimeout(function () { a.pn.remove(); }, 220); if (a.donus && a.donus.focus) a.donus.focus({ preventScroll: true }); }
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') paneliKapa(); });
document.addEventListener('click', function (e) { if (acik && !acik.pn.contains(e.target) && !acik.dugme.contains(e.target)) paneliKapa(); }, true);

function bedenPaneli(kart, resim, id, dugme) {
if (acik && acik.dugme === dugme) { paneliKapa(); return; } paneliKapa();
var mobil = window.matchMedia('(max-width:767px)').matches, ad = (kart.querySelector('.productName') || {}).textContent || '';
var pn = el('div', 'dki-pn'); pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-label', 'Beden se\u00e7: ' + ad.trim()); pn.tabIndex = -1;
var ust = el('div', 'dki-ust'), kp = el('button', 'dki-kp'); kp.type = 'button'; kp.setAttribute('aria-label', 'Kapat'); kp.innerHTML = SVG_KAPAT; kp.addEventListener('click', paneliKapa);
ust.appendChild(el('span', 'dki-bas', 'Beden se\u00e7')); ust.appendChild(kp); pn.appendChild(ust);
var ic = el('div'); ic.appendChild(el('div', 'dki-not', 'Y\u00fckleniyor\u2026')); pn.appendChild(ic);
var ort = null; if (mobil) { ort = el('div', 'dki-ort'); ort.addEventListener('click', paneliKapa); document.body.appendChild(ort); document.body.appendChild(pn); } else { resim.appendChild(pn); resim.classList.add('dki-panelde'); }
acik = { pn: pn, ort: ort, dugme: dugme, donus: dugme, resim: resim }; requestAnimationFrame(function () { pn.classList.add('dki-ac'); pn.focus({ preventScroll: true }); });
urunGetir(id).then(function (p) {
if (!p) throw 0; ic.textContent = '';
var bedenler = (p.variantDetails || []).filter(function (v) { return v.variantTypeName === 'Beden'; });
if (!bedenler.length) bedenler = [{ name: 'Standart', variantId: p.variantId || p.defaultVariantId, stockAmount: p.totalStockAmount }];
var bd = el('div', 'dki-bd'); bd.setAttribute('role', 'group'); bd.setAttribute('aria-label', 'Beden');
bedenler.forEach(function (v) {
var z = el('button', 'dki-bz', v.name); z.type = 'button'; if (!(v.stockAmount > 0)) { z.disabled = true; z.setAttribute('aria-label', v.name + ' beden, t\u00fckendi'); }
z.addEventListener('click', function () {
if (z.disabled || bd.classList.contains('dki-mesgul')) return; bd.classList.add('dki-mesgul'); z.classList.add('dki-bekle'); // se\u00e7ilen beden siyah dolgulu kal\u0131r; simge (\u2026 / \u2713) g\u00f6sterilmez, Safari'de garip g\u00f6r\u00fcn\u00fcyordu
sepeteEkle(p, v.variantId, function (sonuc) {
if (sonuc === false) { z.classList.remove('dki-bekle'); bd.classList.remove('dki-mesgul'); return; }
setTimeout(paneliKapa, 300); // Ticimax kendi sepet panelini a\u00e7ar
});
});
bd.appendChild(z);
});
ic.appendChild(bd);
if (!bedenler.some(function (v) { return v.stockAmount > 0; })) ic.appendChild(el('div', 'dki-not', 'Bu \u00fcr\u00fcn \u015fu an t\u00fckendi.'));
var git = el('a', 'dki-git', '\u00dcr\u00fcn sayfas\u0131na git'); git.href = p.url; ic.appendChild(git);
}).catch(function () { ic.textContent = ''; ic.appendChild(el('div', 'dki-not', 'Bedenler y\u00fcklenemedi.')); var git = el('a', 'dki-git', '\u00dcr\u00fcn sayfas\u0131na git'); var l = kart.querySelector('.detailLink'); if (l) { git.href = l.href; ic.appendChild(git); } });
}

function kartKur(kart) {
if (kart.__dki) return; var resim = kart.querySelector('.productImage'), link = kart.querySelector('.detailLink[data-id]'); if (!resim || !link) return; kart.__dki = 1;
// \u00dcr\u00fcn ad\u0131n\u0131n ba\u015f\u0131ndaki marka ad\u0131 ("Modailgi  Hakim Yaka \u2026") yaln\u0131z listede gizlenir; Ticimax'teki ad, sayfa adresi, Google/pazar yeri beslemesi de\u011fi\u015fmez (kullan\u0131c\u0131 karar\u0131 2026-11-17)
[].slice.call(kart.querySelectorAll('.productName a, .productName')).forEach(function (e) {
[].slice.call(e.childNodes).forEach(function (t) { if (t.nodeType === 3 && /^\s*modailgi\s+/i.test(t.nodeValue)) t.nodeValue = t.nodeValue.replace(/^\s*modailgi\s+/i, ''); });
if (e.title) e.title = e.title.replace(/^\s*modailgi\s+/i, '');
});
var id = link.getAttribute('data-id'), favA = kart.querySelector('.favori a.favoriteslist'), ad = ((kart.querySelector('.productName') || {}).textContent || '').trim();
var kutu = el('div', 'dki-kutu');
var arti = el('button', 'dki-arti'); arti.type = 'button'; arti.innerHTML = SVG_ARTI; arti.setAttribute('aria-label', 'Sepete ekle: ' + ad); arti.setAttribute('aria-haspopup', 'dialog');
arti.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); bedenPaneli(kart, resim, id, arti); });
kutu.appendChild(arti);
if (favA) {
var kalp = el('button', 'dki-kalp'); kalp.type = 'button'; kalp.innerHTML = SVG_KALP;
var guncelle = function () { var aktif = !/Pasif/i.test(favA.className) || favA.getAttribute('data-action') === '0'; kalp.setAttribute('aria-pressed', aktif ? 'true' : 'false'); kalp.setAttribute('aria-label', (aktif ? 'Favorilerden \u00e7\u0131kar: ' : 'Favorilere ekle: ') + ad); };
guncelle(); new MutationObserver(guncelle).observe(favA, { attributes: true, attributeFilter: ['class', 'data-action'] });
kalp.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); favA.click(); });
kutu.appendChild(kalp); favA.closest('.favori').classList.add('dki-gizli');
}
['click', 'mousedown', 'touchstart', 'touchend', 'pointerdown'].forEach(function (t) { kutu.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true }); }); // resim kayd\u0131r\u0131c\u0131s\u0131 (Owl) ve \u00fcr\u00fcn ba\u011flant\u0131s\u0131 tetiklenmesin
resim.appendChild(kutu); kart.classList.add('dki-var');
oklarKur(resim, ad);
onYukle(resim);
// netlestir(resim); // KAPALI (2026-11-17): canl\u0131da kullan\u0131c\u0131 b\u00fcy\u00fck h\u0131z kayb\u0131 g\u00f6rd\u00fc; nedeni \u00f6l\u00e7\u00fclene kadar \u00e7a\u011fr\u0131lmaz
}
var SVG_GERI = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
var SVG_ILERI = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
// Telefonda kartta COS gibi k\u00fc\u00e7\u00fck, siyah, zeminsiz chevron (\u203a \u2039); masa\u00fcst\u00fcnde oklu kare kal\u0131r. \u0130kisi de d\u00fc\u011fmede, CSS se\u00e7er.
var SVG_GERI_K = '<svg class="dki-k" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
var SVG_ILERI_K = '<svg class="dki-k" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
var FARE = window.matchMedia('(hover:hover) and (pointer:fine)');
function oklarKur(resim, ad) { // Ticimax'in resim kayd\u0131r\u0131c\u0131s\u0131 (Owl) zaten var; oklar onun \u00f6nceki/sonraki komutlar\u0131n\u0131 \u00e7a\u011f\u0131r\u0131r
var owl = resim.querySelector('.productList-Image-Owl'); if (!owl || !window.jQuery) return;
// Ticimax fare gezdik\u00e7e foto\u011fraf\u0131 de\u011fi\u015ftiriyor (resim ve kayd\u0131r\u0131c\u0131daki mousemove i\u015fleyicileri, tembel y\u00fcklemede sonradan ba\u011flan\u0131yor): masa\u00fcst\u00fcnde olay yakalama a\u015famas\u0131nda durdurulur, foto\u011fraf yaln\u0131z oklarla de\u011fi\u015fir (Arket gibi)
resim.addEventListener('mousemove', function (e) { if (FARE.matches) e.stopPropagation(); }, true);
var iz = el('div', 'dki-iz'), izc = el('i'); iz.setAttribute('aria-hidden', 'true'); iz.appendChild(izc); resim.appendChild(iz);
var geri = el('button', 'dki-ok dki-geri'), ileri = el('button', 'dki-ok dki-ileri');
geri.type = ileri.type = 'button'; geri.innerHTML = SVG_GERI + SVG_GERI_K; ileri.innerHTML = SVG_ILERI + SVG_ILERI_K; geri.setAttribute('aria-label', '\u00d6nceki foto\u011fraf: ' + ad); ileri.setAttribute('aria-label', 'Sonraki foto\u011fraf: ' + ad);
function durum() {
var o = jQuery(owl).data('owl.carousel'); if (!o) return;
var n = o.items().length, i = o.relative(o.current()); [geri, ileri].forEach(function (b) { b.classList.toggle('dki-coklu', n > 1); });
geri.disabled = i <= 0; ileri.disabled = i >= n - 1;
iz.hidden = n < 2; if (n > 1) { izc.style.width = (100 / n) + '%'; izc.style.transform = 'translateX(' + (Math.max(0, Math.min(i, n - 1)) * 100) + '%)'; }
}
[[geri, 'prev.owl.carousel'], [ileri, 'next.owl.carousel']].forEach(function (x) {
x[0].addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); jQuery(owl).trigger(x[1]); });
['mousedown', 'touchstart', 'pointerdown'].forEach(function (t) { x[0].addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true }); });
resim.appendChild(x[0]);
});
jQuery(owl).on('initialized.owl.carousel changed.owl.carousel translated.owl.carousel refreshed.owl.carousel', function () { setTimeout(durum, 0); }); durum();
}
// Resim netli\u011fi: Ticimax'in AutoResize'\u0131 liste resimlerini Cloudflare'den kart\u0131n CSS geni\u015fli\u011finde (\u00f6r. width=343,quality=85, JPEG) istiyor; Retina/telefonda
// 2-3 kat yo\u011fun ekranda bulan\u0131k g\u00f6r\u00fcn\u00fcyordu (2026-11-17 \u00f6l\u00e7\u00fcm: 215 resmin 209'u). Geni\u015flik ekran yo\u011funlu\u011fuyla (en \u00e7ok 2 kat) \u00e7arp\u0131l\u0131r, format=auto ile
// taray\u0131c\u0131 AVIF/WebP al\u0131r, kalite 75: 686 px AVIF \u2248 343 px JPEG'in 1,4 kat\u0131; yo\u011funluk 1 olan ekranda bug\u00fcnk\u00fcnden k\u00fc\u00e7\u00fck.
// \u00d6NEML\u0130: adres B\u0130R KEZ yaz\u0131l\u0131r ve resim `resize-banned` ile i\u015faretlenir; AutoResize i\u015faretli resme dokunmaz (Ticimax'in kendi ilk resimleri de b\u00f6yle gelir).
// \u0130lk denemede \u00f6znitelik g\u00f6zlemcisiyle d\u00fczeltiyordum: AutoResize ile kar\u015f\u0131l\u0131kl\u0131 yeniden yazma sonsuz d\u00f6ng\u00fcye girip sayfay\u0131 kilitledi. G\u00f6zlemci KULLANMA.
var YOG = Math.min(2, Math.max(1, window.devicePixelRatio || 1)), CDN = 'https://static.ticimax.cloud';
function netAdres(u, gen) {
if (!u) return u;
var w = Math.min(1500, Math.ceil(gen * YOG / 50) * 50), seg = '/cdn-cgi/image/width=' + w + ',quality=75,format=auto/'; // 50'nin kat\u0131: ayn\u0131 boyut \u00f6nbellekten gelsin
if (u.indexOf('/cdn-cgi/image/') > -1) return u.replace(/\/cdn-cgi\/image\/[^/]*\//, seg);
if (u.indexOf(CDN + '/') === 0 && /\.(jpe?g|png|webp)$/i.test(u)) return CDN + seg + u.slice(CDN.length + 1);
return u;
}
function netlestir(resim) {
var gen = resim.getBoundingClientRect().width || 0; if (gen < 50) return;
[].slice.call(resim.querySelectorAll('img.productSliderImage')).forEach(function (im) {
im.setAttribute('resize-banned', ''); // \u00f6nce i\u015faretle: adres de\u011fi\u015fince AutoResize araya girmesin
var ds = im.getAttribute('data-src'), src = im.getAttribute('src') || '';
if (ds) { var y = netAdres(ds, gen); if (y !== ds) im.setAttribute('data-src', y); }
if (src.indexOf('/cdn-cgi/image/') > -1) { var y2 = netAdres(src, gen); if (y2 !== src) im.setAttribute('src', y2); } // y\u00fcklenmi\u015f tam boy ilk resim yeniden indirilmez
});
}
// Sonraki foto\u011fraf\u0131 \u00f6nceden indir: Ticimax'in kayd\u0131r\u0131c\u0131s\u0131 2. ve sonraki foto\u011fraflar\u0131 ancak o foto\u011frafa ge\u00e7ilince indiriyor (load.gif bekliyor);
// telefonda kayd\u0131r\u0131nca 2-3 sn bo\u015f g\u00f6r\u00fcn\u00fcyordu (2026-11-17 \u00f6l\u00e7\u00fcm 3,1 sn). Kart ekrana yakla\u015f\u0131nca yaln\u0131z B\u0130R sonraki foto\u011fraf, her ge\u00e7i\u015fte de
// bir sonraki, taray\u0131c\u0131 \u00f6nbelle\u011fine indirilir (new Image; sayfadaki img'ye ve Ticimax'in adresine dokunulmaz: AutoResize ile d\u00f6ng\u00fc riski yok).
// Maliyet: ekrana giren kart ba\u015f\u0131na bir k\u00fc\u00e7\u00fck resim (\u224811-17 KB); ilk a\u00e7\u0131l\u0131\u015f etkilenmez (taray\u0131c\u0131 bo\u015fta kal\u0131nca ba\u015flar).
var onYuklenen = {}, gozcu = ('IntersectionObserver' in window) ? new IntersectionObserver(function (gs) {
gs.forEach(function (g) { if (g.isIntersecting) { gozcu.unobserve(g.target); sonrakiniHazirla(g.target, 0); } });
}, { rootMargin: '300px 0px' }) : null;
function sonrakiniHazirla(resim, i) {
var im = resim.querySelectorAll('.owl-item:not(.cloned) img.productSliderImage, .imageItem img.productSliderImage');
var hedef = im[i + 1]; if (!hedef) return;
var u = hedef.getAttribute('data-src'); if (!u || onYuklenen[u] || /load\.gif/.test(u)) return;
onYuklenen[u] = 1; var on = new Image(); on.decoding = 'async'; on.src = u;
}
function onYukle(resim) {
if (!gozcu || !window.jQuery) return;
var owl = resim.querySelector('.productList-Image-Owl'); if (!owl) return;
var bas = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 300); })(function () { gozcu.observe(resim); }); };
if (document.readyState === 'complete') bas(); else window.addEventListener('load', bas);
jQuery(owl).on('changed.owl.carousel', function (e) { var i = e.item && e.item.index; if (typeof i === 'number') { var o = jQuery(owl).data('owl.carousel'); sonrakiniHazirla(resim, o ? o.relative(i) : i); } });
}
// \u0130lk a\u00e7\u0131l\u0131\u015f ipucu (telefon, oturumda bir kez): ekrandaki ilk \u00e7ok foto\u011frafl\u0131 kart\u0131n foto\u011fraf\u0131 ~56 px sola kay\u0131p geri gelir; "kayd\u0131r\u0131labilir" der.
// Sonraki foto\u011fraf \u00f6nceden y\u00fckl\u00fc (\u00f6n y\u00fckleme) ve img'ye yaz\u0131l\u0131r ki bo\u015fluk g\u00f6r\u00fcnmesin. Animasyon Web Animations ile; bitince kayd\u0131r\u0131c\u0131n\u0131n kendi konumu aynen kal\u0131r.
function ipucu() {
try { if (!window.matchMedia('(max-width:767px)').matches || sessionStorage.getItem('dki-ipucu')) return; } catch (e) { return; }
var kart = [].slice.call(document.querySelectorAll('#ProductPageProductList .productImage')).filter(function (r) {
var b = r.getBoundingClientRect(); return b.top >= 0 && b.bottom <= window.innerHeight + 40 && r.querySelector('.dki-ileri.dki-coklu');
})[0];
var stage = kart && kart.querySelector('.owl-stage'); if (!stage || !stage.animate) return;
var sonraki = kart.querySelectorAll('.owl-item:not(.cloned) img.productSliderImage')[1];
if (sonraki) { var u = sonraki.getAttribute('data-src'); if (u && /load\.gif/.test(sonraki.getAttribute('src') || '')) sonraki.setAttribute('src', u); }
try { sessionStorage.setItem('dki-ipucu', '1'); } catch (e) {}
var t = getComputedStyle(stage).transform; t = (t && t !== 'none') ? t : '';
setTimeout(function () { stage.animate([{ transform: t + ' translateX(0)' }, { transform: t + ' translateX(-56px)' }, { transform: t + ' translateX(0)' }], { duration: 1100, easing: 'cubic-bezier(.4,0,.2,1)' }); }, 600);
}
if (document.readyState === 'complete') setTimeout(ipucu, 800); else window.addEventListener('load', function () { setTimeout(ipucu, 800); });
function tara() { [].slice.call(document.querySelectorAll('.ItemOrj .productItem')).forEach(kartKur); }
function basla() { tara(); setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 0); // bo\u015fluk kalk\u0131nca kart geni\u015fli\u011fi de\u011fi\u015fir: \u00f6nceden kurulmu\u015f foto\u011fraf kayd\u0131r\u0131c\u0131lar\u0131 yeni geni\u015fli\u011fe g\u00f6re yeniden \u00f6l\u00e7\u00fcls\u00fcn
var bekleyen = 0; new MutationObserver(function () { if (bekleyen) return; bekleyen = 1; requestAnimationFrame(function () { bekleyen = 0; tara(); }); }).observe(document.body, { childList: true, subtree: true }); }
// Blok sayfada \u00fcr\u00fcn listesinden SONRA yer al\u0131r (Script Y\u00f6netimi \u203a T\u00fcm Sayfalar, body i\u00e7inde): liste haz\u0131rsa beklemeden ba\u015fla, de\u011filse sayfa y\u00fcklenince
if (document.readyState !== 'loading' || document.querySelector('.ItemOrj .productItem')) basla(); else document.addEventListener('DOMContentLoaded', basla);
})();

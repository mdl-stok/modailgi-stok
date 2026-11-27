// GENEL SÜRÜM (tüm ürünlerde). Ticimax > Modüller > Script Yönetimi > 'Ürün Detay' kaydına eklenecek. Kendi kendine çalışır (ayrıca bir çağrı gerekmez).
// Modailgi/Gilda: pantolon/etek/şort, elbise/tulum, tunik/bluz/gömlek/ceket/blazer/yelek/kazak/kaban/mont/trençkot kategorilerinde; dış üretici ürünleri: kendi beden tablosuyla. Diğerlerinde hiçbir şey yapmaz.
// Geri almak için: bu kodun tamamını silmek yeterli. Hata olursa sayfaya dokunmaz.
function BedenBul() {
    try {
        if ($('.bb-ac').length || !$('#divUrunEkSecenek').length) return;
        var yolEl = $('[itemtype*="BreadcrumbList"]').first(), yol = yolEl.text(), kod = $('#divUrunKodu').text();
        // Kategori = yol izinde sondan bir önceki öğe (sonuncusu ürün adı; 'Gömlek Elbise' gibi adlar tablo seçimini şaşırtmasın).
        // Dış üretici ürünleri (XML ile gelenler) kendi beden tablosunu kullanır: üretici sayfadaki JSON-LD'den, parça türü ürün adındaki SON parça sözcüğünden okunur
        // ('Etek Ucu Simli Tunik' = tunik). Marka tanınmazsa aşağıdaki Modailgi/Gilda akışı aynen çalışır.
        var adlar = yolEl.find('[itemprop="name"]').map(function () { return $.trim($(this).text()); }).get();
        var urunAd = (adlar.length ? adlar[adlar.length - 1] : '').toLocaleLowerCase('tr'), mk = '', grup = '', tip, B, KAYNAK = '';
        (function () {
            var m = '';
            $('script[type="application/ld+json"]').each(function () { try { var j = JSON.parse(this.textContent), l = $.isArray(j) ? j : [j], i, b; for (i = 0; i < l.length; i++) { b = l[i] && l[i].brand; if (b) { m = String(b.name || b); return false; } } } catch (e) { } });
            m = m.toLocaleLowerCase('tr');
            mk = /mutlu\s*ertan/.test(m) || /^mutlu ertan/.test(urunAd) ? 'me' : /t[ıi]ğ\s*triko/.test(m) ? 'tg' : '';
        })();
        if (mk) {
            var PRC = /(pantolon|etek|şort|elbise|tulum|takım|tunik|bluz|gömlek|ceket|blazer|yelek|kazak|hırka|pardesü|atlet|kaban|mont|tren[cç]|trench)/g, pr = '', pm;
            while ((pm = PRC.exec(urunAd))) { pr = pm[1]; }
            tip = /^(pantolon|etek|şort)$/.test(pr) ? 'alt' : /^(elbise|tulum|takım)$/.test(pr) ? 'elbise' : pr ? 'ust' : '';
            grup = /^(ceket|blazer|hırka|yelek|pardesü|kaban|mont|tren[cç]|trench)$/.test(pr) ? 'c' : 'b'; // üretici A: ceket/hırka/yelek/pardesü grubu ile bluz grubunun göğüs ölçüleri farklı
        } else {
            var kat = (adlar.length > 1 ? adlar[adlar.length - 2] : '').toLocaleLowerCase('tr');
            // Kategori → beden tablosu: alt (pantolon, etek, şort) · elbise (elbise, tulum) · üst (tunik, bluz, gömlek, ceket, yelek, kazak, kaban, mont, trenç, kap).
            // 'Kap' tek sözcük olarak aranır (2026-11-20: Kap & Trençkot ürünlerinde yol izi 'Kap' yazıyor, araç çalışmıyordu; 'kapama/kapüşon' eşleşmesin).
            tip = /(pantolon|etek|şort)/.test(kat) ? 'alt' : /(elbise|tulum)/.test(kat) ? 'elbise' : /(tunik|bluz|gömlek|ceket|blazer|yelek|kazak|kaban|mont|tren[cç]|trench)/.test(kat) || /(^|[\s&])kap($|[\s&])/.test(kat) ? 'ust' : '';
        }
        if (!tip) return;
        // ACİL KAPATMA: aşağıdaki değeri true yapıp kaydederseniz araç tüm sitede kapanır (kodun geri kalanına dokunmaya gerek yok).
        var BB_KAPALI = false; if (BB_KAPALI) return;
        var G = !mk && (/GLD/i.test(kod) || /gilda/i.test(yol));
        B = G ? ['+44', '+46', '+48', '+50', '+52', '+54', '+56'] : ['38', '40', '42', '44', '46', '48', '50'];
        var gog = { ad: 'gog', bs: 'Göğsün kaç cm?', yd: 'Mezurayı kolların altından, göğsün en dolgun yerinden yere paralel geçir.', t: G ? [105, 111, 117, 123, 129, 135, 141] : [90, 94, 98, 102, 108, 112, 116], ar: G ? [95, 160, 111] : [80, 130, 94], et: 'Göğüs' };
        var bel = { ad: 'bel', bs: 'Belin kaç cm?', yd: 'Mezurayı göbek deliğinin biraz üstünden, belin en ince yerinden geçir. Sıkma, rahat dursun.', t: G ? [90, 96, 102, 108, 114, 120, 126] : [70, 74, 78, 82, 88, 92, 96], ar: G ? [80, 135, 92] : [60, 110, 70], et: 'Bel' };
        var bas = { ad: 'bas', bs: 'Basenin kaç cm?', yd: 'Mezurayı kalçanın en geniş yerinden, yere paralel geçir.', t: G ? [112, 118, 124, 130, 136, 142, 148] : [96, 100, 104, 108, 114, 118, 122], ar: G ? [100, 155, 114] : [85, 135, 96], et: 'Basen' };
        if (mk === 'me') { // üretici A beden tablosu (üretici bedenleri 38-40 … 58-60 olarak eşliyor)
            B = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
            gog.t = grup === 'c' ? [100, 108, 116, 124, 132, 140] : [100, 106, 112, 118, 124, 130]; gog.ar = [80, 150, 100];
            bel.t = [80, 86, 90, 94, 98, 102]; bel.ar = [60, 115, 80];
            bas.t = [110, 116, 120, 124, 128, 132]; bas.ar = [85, 145, 110];
            KAYNAK = 'me';
        } else if (mk === 'tg') { // üretici B: listede 36-44 yazan ürünler "Standart Beden" tablosunu, 1-2-3 yazanlar "1-3" tablosunu (aralıkların üst sınırı) kullanır
            var t36 = false, t13 = false;
            $('select.eksecenekSelect').first().find('option').each(function () { var x = parseInt($.trim($(this).text()), 10); if (x >= 36 && x <= 44) { t36 = true; } if (x >= 1 && x <= 3) { t13 = true; } });
            if (t36) { B = ['36', '38', '40', '42', '44']; gog.t = [86, 90, 94, 98, 102]; bel.t = [68, 72, 76, 80, 84]; bas.t = [92, 96, 100, 104, 108]; }
            else if (t13) { B = ['1', '2', '3']; gog.t = [94, 98, 102]; bel.t = [76, 80, 84]; bas.t = [100, 104, 108]; }
            else { return; }
            gog.ar = [75, 115, 92]; bel.ar = [55, 100, 74]; bas.ar = [80, 125, 98];
            KAYNAK = 'tg';
        }
        var K = B.length, AK = mk ? mk + grup + tip + B.join('') : tip + B[0]; // AK: kayıtlı sonucun hangi tabloya ait olduğu
        var M = tip === 'elbise' ? [gog, bel, bas] : tip === 'ust' ? [gog, bel] : [bel, bas], N = M.length;
        var AD = M.map(function (m) { return m.et.toLocaleLowerCase('tr'); }), ADS = AD.length > 2 ? AD[0] + ', ' + AD[1] + ' ve ' + AD[2] : AD[0] + ' ve ' + AD[1];
        var NOT = ADS.charAt(0).toLocaleUpperCase('tr') + ADS.slice(1) + ' ölçülerinden hangisi daha büyük bir bedene denk geliyorsa o esas alındı. İki beden arasında kalırsan büyüğünü seç.';
        var SECIN = 'Bedenini seç'; // listenin ilk satırında 'Seçiniz' yerine görünecek yazı (istenirse buradan değiştirilir)
        function ev(n) { try { if (window.gtag) { window.gtag('event', n); } } catch (e) { } } // sayaç: yalnızca olay adı gider, kişisel veri/ölçü gitmez
        var KEY = 'bb_beden_v4', adim = 0, V = [], A = [], terc = 'oturan'; // A[j]: ölçü kutunun alt sınırının da altında girildi (sınıra yükseltildi)
        function oku() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
        function yaz(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { } }
        var CSS='.bb-kapla,.bb-kapla *{box-sizing:border-box}.bb-kapla{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;z-index:2147483000;font-family:inherit;color:#000}.bb-kapla.bb-acik{display:flex}.bb{background:#fff;width:min(440px,100%);max-height:100vh;overflow:auto;padding:24px 24px 28px;text-align:left}.bb button{font-family:inherit;cursor:pointer;border-radius:0}.bb-ust{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}.bb-ust h2{font-size:18px;margin:0;font-weight:700;color:#000}.bb-x{background:none;border:0;font-size:26px;line-height:1;padding:4px 8px;margin:-4px -8px;color:#000}.bb-il{height:4px;background:#e3e3e3;margin-bottom:6px}.bb-il i{display:block;height:100%;background:#000;transition:width .35s ease}.bb-ad{font-size:13px;color:#666;margin-bottom:20px;display:flex;justify-content:space-between}.bb h3{font-size:20px;font-weight:600;margin:0 0 6px;color:#000}.bb p.bb-yd{font-size:14px;color:#666;margin:0 0 20px;line-height:1.45}.bb-deger{display:flex;align-items:center;justify-content:center;gap:18px;margin:8px 0 14px}.bb-deger button{width:44px;height:44px;border:1px solid #000;background:#fff;font-size:22px;border-radius:50%!important;color:#000;padding:0}.bb-deger button:active{background:#000;color:#fff}.bb-deger output{font-size:44px;font-weight:700;min-width:120px;text-align:center}.bb-deger output small{font-size:16px;font-weight:400;color:#666;margin-left:4px}.bb input.bb-rng{width:100%;accent-color:#000;margin:0 0 6px;height:32px;padding:0;border:0}.bb-aral{display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:22px}.bb-sec{display:block;width:100%;text-align:left;border:1px solid #e3e3e3;background:#fff;padding:14px 16px;margin-bottom:10px;font-size:15px;color:#000}.bb-sec b{display:block;font-weight:600}.bb-sec span{font-size:13px;color:#666}.bb-sec[aria-pressed=true]{border-color:#000;box-shadow:inset 0 0 0 1px #000}.bb-btn{display:block;width:100%;background:#000;color:#fff;border:0;padding:14px;font-size:15px;letter-spacing:.04em}.bb-btn.bb-ikinci{background:#fff;color:#000;border:1px solid #000;margin-top:10px}.bb-geri{background:none;border:0;font-size:14px;color:#666;text-decoration:underline;text-underline-offset:3px;margin-top:12px;padding:6px 0}.bb-mikro{font-size:13px;background:#f3f3f3;padding:8px 12px;margin-bottom:16px;display:none}.bb-mikro.bb-g{display:block}.bb-sonuc{text-align:center}.bb-rozet{display:inline-flex;align-items:center;gap:8px;border:1px solid #000;padding:5px 12px;font-size:13px;margin-bottom:14px}.bb-rozet svg{width:14px;height:14px}.bb-buyuk{font-size:72px;font-weight:700;line-height:1;margin:6px 0 2px}.bb-etk{font-size:14px;color:#666;margin-bottom:18px}.bb-mini{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 16px}.bb-mini th,.bb-mini td{padding:7px 0;text-align:center;border-bottom:1px solid #e3e3e3;font-weight:400;background:none}.bb-mini th{font-weight:700}.bb-mini td:first-child{text-align:left;color:#666}.bb-mini .bb-on{background:#000!important;color:#fff!important;font-weight:700}.bb p.bb-not{text-align:left;font-size:14px;line-height:1.5;border-left:3px solid #000;padding:2px 0 2px 12px;margin:0 0 20px}.bb p.bb-alt{font-size:13px;color:#666;margin:-6px 0 18px}@keyframes bbpop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}.bb-buyuk,.bb-rozet{animation:bbpop .45s ease both}@media (prefers-reduced-motion:reduce){.bb-buyuk,.bb-rozet{animation:none}.bb-il i{transition:none}}@media (max-width:640px){.bb-kapla{align-items:flex-end}.bb{width:100%;max-height:92vh;padding:20px 16px 24px}.bb-buyuk{font-size:64px}}.bb-lbl{font-size:13px;color:#666;margin:6px 0 -2px}.bb-nw{display:flex;align-items:baseline;justify-content:center;min-width:130px}.bb-nw small{font-size:16px;color:#666;margin-left:4px}.bb-num{width:104px;font-size:44px;font-weight:700;text-align:center;border:0;border-bottom:2px solid #000;background:transparent;padding:0;color:#000;font-family:inherit;border-radius:0;-moz-appearance:textfield;appearance:textfield;box-shadow:none;height:auto}.bb-num::-webkit-outer-spin-button,.bb-num::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.bb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}.bb-bd{border:1px solid #e3e3e3;background:#fff;padding:14px 0;font-size:16px;color:#000}.bb-bd:active,.bb-bd[aria-pressed=true]{border-color:#000;box-shadow:inset 0 0 0 1px #000}.bb-kapla{box-sizing:border-box}.bb-serit{display:flex!important;align-items:center;justify-content:space-between;gap:10px;width:100%;clear:both;box-sizing:border-box;margin:0 0 10px;padding:11px 14px;background:#f7f6f3;border:1px solid #ebe9e4;color:#000!important;text-decoration:none!important;font-size:13px;line-height:18px;cursor:pointer;font-family:inherit}.bb-serit:hover,.bb-serit:focus{background:#efede8;color:#000!important;text-decoration:none!important}.bb-serit .bb-st{flex:1;color:#222}.bb-serit b{font-weight:700;color:#000}.bb-serit svg{flex:none}.bb-serit:hover svg:last-child{transform:translateX(3px)}.bb-serit svg{transition:transform .2s}.detaySticky .bb-serit{display:none!important}.bb-buyuk.bb-yok{color:#6b6b6b;text-decoration:line-through}.bb-uyari{text-align:left;background:#fff4e5;border-left:3px solid #c05600;padding:10px 12px;margin:0 0 14px;font-size:14px;line-height:1.5;color:#000}.bb-uyari b{font-weight:700}';
        $('head').append('<style id="bb-css">' + CSS + '</style>');
        // Şerit: "Beden Ölçü Tablosu" satırının altına, beden listesinin hemen üstüne konur. Tamamı tıklanabilir, altı çizili değil.
        var OK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
        var CET = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="8" width="20" height="8" rx="1.2"/><path d="M6 8v3M10 8v4M14 8v3M18 8v4"/></svg>';
        var SORU = 'Hangi beden sana uygun? <b>Bedenini bul</b>';
        var $satir = $('select.eksecenekSelect').first().closest('.eksecenekLine');
        if (!$satir.length || !Object.keys(sec()).length) { return; } // beden listesi tabloyla eşlenemiyorsa (ör. tek beden STD) araç hiç görünmez
        var $serit = $('<a href="#" class="bb-ac bb-serit" role="button">' + CET + '<span class="bb-st">' + SORU + '</span>' + OK + '</a>'); $satir.before($serit);
        $('body').append('<div class="bb-kapla" role="dialog" aria-modal="true" aria-labelledby="bb-baslik"><div class="bb"></div></div>');
        var $k = $('.bb-kapla'), $b = $k.find('.bb');
        // Sitedeki beden adı üç biçimde olabilir: 38/40/… (Gilda: 44/46/…), +44/+46/…, ya da 1/2/3/… (1=38 ya da Gilda'da 1=44). Hepsi tablo sırasına (0-6) çevrilir.
        function sec() {
            var s = {}, dz = B.map(function (b) { return b.replace('+', ''); });
            $('select.eksecenekSelect').first().find('option').each(function () {
                var ad = $.trim($(this).text()), et = ad.replace(/\s*Tükendi\s*$/i, ''), ixs = [], m, x, ix, a, c, i;
                if (mk === 'me') { // S, M, L, XL, XXL/2XL, 3XL ve S-M / L-XL gibi aralıklar; STD (tek beden) eşlenmez
                    m = et.toUpperCase().replace(/\s+/g, '').replace(/XXL/g, '2XL').match(/^(2XL|3XL|XL|S|M|L)(?:-(2XL|3XL|XL|S|M|L))?$/);
                    if (!m) return;
                    a = $.inArray(m[1], B); c = m[2] ? $.inArray(m[2], B) : a;
                    if (a < 0 || c < 0) return;
                    for (i = Math.min(a, c); i <= Math.max(a, c); i++) { ixs.push(i); }
                } else { // 38/40/…, +44/+46/…, 1/2/3/… (tablo sırasına çevrilir)
                    m = ad.match(/^\+?(\d+)/); if (!m) return; x = +m[1]; ix = x >= 1 && x <= K ? x - 1 : $.inArray(String(x), dz); if (ix > -1) { ixs.push(ix); }
                }
                for (i = 0; i < ixs.length; i++) { if (!s[ixs[i]]) { s[ixs[i]] = { v: this.value, yok: this.disabled || $(this).attr('nostock'), et: et }; } }
            });
            return s;
        }
        // Şeritte beden, ürünün listesinde yazdığı adla gösterilir (liste 1-2-3-4 ise '3'); listede yoksa tablo adıyla.
        function kayitGoster() { var k = oku(); if (k && k.t === AK) { var e = sec()[k.i], et = e ? e.et : B[k.i]; $('.bb-st').html('Önerdiğimiz beden: <b>' + et + '</b> · yeniden hesapla'); } }
        function hesap() {
            var x = 0, j, i, f;
            for (j = 0; j < N; j++) { f = -1; for (i = 0; i < K; i++) { if (M[j].t[i] >= V[j]) { f = i; break; } } if (f < 0) return null; x = Math.max(x, f); }
            return terc === 'rahat' ? Math.min(x + 1, K - 1) : x;
        }
        function ilr(k, top) { return '<div class="bb-il"><i style="width:' + Math.round((k + 1) / (top + 1) * 100) + '%"></i></div><div class="bb-ad"><span>Adım ' + Math.min(k + 1, top) + ' / ' + top + '</span><span>' + (k === 0 ? 'Başlıyoruz' : k >= top - 1 ? 'Son adım' : 'Devam ediyoruz') + '</span></div>'; }
        function ust() { return '<div class="bb-ust"><h2 id="bb-baslik">Bedenini Bul</h2><button type="button" class="bb-x" aria-label="Kapat">&times;</button></div>'; }
        function olcu(j) {
            var m = M[j], ar = m.ar, v = V[j] || ar[2]; ev('bedenbul_adim_' + (j + 1));
            $b.html(ust() + ilr(j, N + 1) + '<h3>' + m.bs + '</h3><p class="bb-yd">' + m.yd + '</p>'
                + '<div class="bb-deger"><button type="button" class="bb-eks" aria-label="Azalt">&minus;</button><div class="bb-nw"><input class="bb-num" type="number" inputmode="numeric" min="' + ar[0] + '" max="' + ar[1] + '" value="' + v + '" aria-label="' + m.bs + '"><small>cm</small></div><button type="button" class="bb-art" aria-label="Arttır">+</button></div>'
                + '<input type="range" class="bb-rng" min="' + ar[0] + '" max="' + ar[1] + '" value="' + v + '" aria-label="' + m.bs + '"><div class="bb-aral"><span>' + ar[0] + '</span><span>' + ar[1] + '</span></div>'
                + '<div class="bb-mikro"></div><button type="button" class="bb-btn bb-ileri">DEVAM</button>' + (j > 0 ? '<button type="button" class="bb-geri">Geri</button>' : ''));
            var $r = $b.find('.bb-rng'), $n = $b.find('.bb-num');
            function set(x) { A[j] = x < ar[0]; if (x < ar[0] || x > ar[1]) { $b.find('.bb-mikro').text(x < ar[0] ? 'En az ' + ar[0] + ' cm girilebiliyor, ' + ar[0] + ' cm olarak aldık. Sonuçta seni uyaracağız.' : 'En çok ' + ar[1] + ' cm girilebiliyor, ' + ar[1] + ' cm olarak aldık.').addClass('bb-g'); } x = Math.max(ar[0], Math.min(ar[1], x)); V[j] = x; $r.val(x); $n.val(x); }
            function yazildi() { var x = parseInt($n.val(), 10); if (x === V[j]) return; set(isNaN(x) ? ar[2] : x); } // değişmediyse dokunma: sınıra yükseltilmiş değeri yeniden okuyup A[j]'yi silmesin
            V[j] = v;
            $r.on('input', function () { set(+this.value); });
            $n.on('input', function () { var x = parseInt(this.value, 10); if (!isNaN(x) && x >= ar[0] && x <= ar[1]) { V[j] = x; $r.val(x); } });
            $n.on('blur change', yazildi);
            $b.find('.bb-eks').on('click', function () { yazildi(); set(V[j] - 1); });
            $b.find('.bb-art').on('click', function () { yazildi(); set(V[j] + 1); });
            $b.find('.bb-ileri').on('click', function () { yazildi(); $b.find('.bb-mikro').text(j < N - 1 ? 'Tamam. Sıradaki ölçü.' : 'Ölçüler tamam. Son soru.').addClass('bb-g'); setTimeout(function () { adim = j + 1; ciz(); }, 550); });
            $b.find('.bb-geri').on('click', function () { adim = j - 1; ciz(); });
        }
        function tercih() {
            ev('bedenbul_tercih');
            $b.html(ust() + ilr(N, N + 1) + '<h3>Nasıl giymeyi seversin?</h3><p class="bb-yd">Tercihine göre öneriyi ayarlıyoruz.</p>'
                + '<button type="button" class="bb-sec" data-t="oturan" aria-pressed="' + (terc === 'oturan') + '"><b>Vücuda oturan</b><span>Ölçülerine en yakın beden</span></button>'
                + '<button type="button" class="bb-sec" data-t="rahat" aria-pressed="' + (terc === 'rahat') + '"><b>Rahat ve biraz bol</b><span>Bir beden büyüğü</span></button>'
                + '<button type="button" class="bb-btn bb-bul" style="margin-top:8px">BEDENİMİ GÖSTER</button><button type="button" class="bb-geri">Geri</button>');
            $b.find('.bb-sec').on('click', function () { terc = $(this).data('t'); $b.find('.bb-sec').attr('aria-pressed', 'false'); $(this).attr('aria-pressed', 'true'); });
            $b.find('.bb-bul').on('click', function () { adim = N + 1; ciz(); });
            $b.find('.bb-geri').on('click', function () { adim = N - 1; ciz(); });
        }
        function sonuc() {
            var i = hesap();
            if (i === null) {
                ev('bedenbul_disarida');
                $b.html(ust() + '<h3>Ölçülerin bu tablonun dışında</h3><p class="bb-yd">Ölçülerini kontrol edip tekrar deneyebilirsin ya da bize yazabilirsin.</p><button type="button" class="bb-btn bb-ikinci bb-tekrar">TESTİ TEKRARLA</button>');
                $b.find('.bb-tekrar').on('click', function () { adim = 0; V = []; A = []; ciz(); });
                return;
            }
            ev('bedenbul_sonuc'); yaz({ t: AK, i: i, v: V, terc: terc }); kayitGoster();
            var S = sec(), ad = B[i], mev = S[i], eylem = '', yokm = !(mev && !mev.yok);
            // Ölçüler en küçük bedenin de belirgin altındaysa (her ölçü en az 4 cm küçük) sessizce en küçüğü önermek yerine uyar (2026-11-27).
            // Kaç cm bol geleceği yazılmaz: dış marka tablolarının vücut mu ürün ölçüsü mü olduğu doğrulanmadı.
            var kucuk = '', kl = [], jk, fk = 99;
            for (jk = 0; jk < N; jk++) { fk = Math.min(fk, M[jk].t[0] - V[jk]); kl.push(AD[jk] + ' ' + (A[jk] ? V[jk] + ' cm’den az' : V[jk] + ' cm') + ' (' + B[0] + ' bedende ' + M[jk].t[0] + ' cm)'); }
            if (fk >= 4) { ev('bedenbul_kucuk'); kucuk = '<div class="bb-uyari" role="alert"><b>Ölçülerin en küçük bedenimizin altında.</b> ' + kl.join(', ').replace(/^./, function (c) { return c.toLocaleUpperCase('tr'); }) + '. Bu üründe en küçük beden ' + B[0] + ' bile sana bol gelebilir.</div>'; }
            // Listede beden '3' gibi yazılıyorsa müşteri şaşırmasın: hangi numaraya denk geldiğini söyle.
            function dkl(et, b) { return et.replace('+', '') !== b.replace('+', '') ? '<p class="bb-alt">Bu üründe ' + b + ' bedeni listede “' + et + '” olarak görünür.</p>' : ''; }
            if (mev && !mev.yok) { eylem = dkl(mev.et, ad) + '<button type="button" class="bb-btn bb-secbtn" data-v="' + mev.v + '">' + (/-/.test(mev.et) ? mev.et : ad) + ' BEDENİNİ SEÇ</button>'; }
            else {
                var yk = null, d, j;
                for (d = 1; d < K && !yk; d++) { for (j = 0; j < 2; j++) { var ix = i + (j ? -d : d), s2 = ix >= 0 && ix < K && S[ix]; if (s2 && !s2.yok) { yk = { a: B[ix], v: s2.v, et: s2.et, f: ix - i }; break; } } }
                var yon = yk ? (yk.f > 0 ? (yk.f === 1 ? 'bir beden büyük, bol durabilir' : yk.f + ' beden büyük, bol durabilir') : (yk.f === -1 ? 'bir beden küçük, dar olabilir' : -yk.f + ' beden küçük, dar olabilir')) : '';
                eylem = '<div class="bb-uyari" role="alert"><b>' + ad + ' bedeni ' + (mev ? 'tükendi' : 'bulunmuyor') + '.</b> ' + (yk ? 'Stokta sana en yakın beden <b>' + yk.a + '</b>, ölçülerine göre ' + yon + '.' : 'Bu üründe ölçülerine uygun, stokta olan bir beden yok.') + '</div>' + (yk ? dkl(yk.et, yk.a) + '<button type="button" class="bb-btn bb-ikinci bb-secbtn" data-v="' + yk.v + '">Yine de ' + (/-/.test(yk.et) ? yk.et : yk.a) + ' bedenini seç</button>' : '');
            }
            function satir(m) { return '<tr><td>' + m.et + '</td>' + m.t.map(function (x, k) { return '<td' + (k === i ? ' class="bb-on"' : '') + '>' + x + '</td>'; }).join('') + '</tr>'; }
            var bsl = '<tr><td>Beden</td>' + B.map(function (x, k) { return '<th' + (k === i ? ' class="bb-on"' : '') + '>' + x + '</th>'; }).join('') + '</tr>';
            var alt = yokm ? '' : terc === 'oturan' && i < K - 1 && S[i + 1] && !(S[i] && S[i + 1].v === S[i].v) ? 'Rahat giymeyi seversen bir üstü: ' + B[i + 1] : (terc === 'rahat' && i > 0 && S[i - 1] && !(S[i] && S[i - 1].v === S[i].v) ? 'Daha oturan istersen bir altı: ' + B[i - 1] : ''); // yalnızca bu üründe listelenen bedenler önerilir
            if (kucuk) { alt = ''; } // en küçük beden bile bol: 'bir üstü' önerisi çelişir
            var et = M.map(function (m, j) { return m.et + ' ' + V[j] + ' cm'; }).join(' · ');
            var not = NOT + (KAYNAK ? ' Bu ürünün kendi beden tablosu kullanılır.' : '');
            $b.html(ust() + '<div class="bb-sonuc"><div class="bb-rozet"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3.2 3L13 4.5"/></svg>' + (yokm ? 'Önerilen beden stokta yok' : 'Önerimiz hazır') + '</div><div class="bb-lbl">Sana önerdiğimiz beden</div><div class="bb-buyuk' + (yokm ? ' bb-yok' : '') + '">' + ad + '</div>'
                + '<div class="bb-etk">' + et + ' · ' + (terc === 'rahat' ? 'rahat kalıp' : 'oturan kalıp') + '</div>'
                + kucuk + (yokm ? eylem : '') // öneri stokta yoksa uyarı ve düğme tablonun ÜSTÜNDE: çerez bandı açıkken pencere kısa kalır, işlem düğmesi kaydırmadan görünsün
                + '<table class="bb-mini"><tbody>' + bsl + M.map(satir).join('') + '</tbody></table>'
                + '<p class="bb-not">' + not + '</p>' + (alt ? '<p class="bb-alt">' + alt + '</p>' : '')
                + (yokm ? '' : eylem) + '<button type="button" class="bb-btn bb-ikinci bb-tekrar">TESTİ TEKRARLA</button></div>');
            $b.find('.bb-secbtn').on('click', function () { ev('bedenbul_sec'); var $s = $('select.eksecenekSelect').first(); $s.val($(this).data('v')).trigger('change'); kapat(); });
            $b.find('.bb-tekrar').on('click', function () { ev('bedenbul_tekrar'); adim = 0; V = []; A = []; ciz(); });
        }
        function ciz() { if (adim < N) olcu(adim); else if (adim === N) tercih(); else sonuc(); $b.find('.bb-x').on('click', kapat); }
        // Çerez bandı gibi altta sabit duran bir şey (sitenin çerez aracı gölge DOM içinde olabilir) varsa pencereyi onun üstünde tut.
        function altBosluk() {
            var h = 0;
            function bak(kok) {
                var l = kok.querySelectorAll('*'), i, e, st, r;
                for (i = 0; i < l.length; i++) {
                    e = l[i];
                    if (e.shadowRoot) { bak(e.shadowRoot); }
                    st = getComputedStyle(e);
                    if (st.position !== 'fixed' || parseInt(st.bottom, 10) > 12) { continue; }
                    r = e.getBoundingClientRect();
                    if (r.height > 60 && r.height < 600 && r.width > 200 && !/(^| )bb-/.test(String(e.className || '')) && /çerez|cerez|cookie/i.test(e.innerText || e.textContent || '')) { h = Math.max(h, r.height + (parseInt(st.bottom, 10) || 0)); }
                }
            }
            try { bak(document); } catch (e) { }
            return Math.round(h);
        }
        function ac() {
            ev('bedenbul_ac'); var k = oku();
            if (k && k.t === AK && k.v && k.v.length === N) { V = k.v; terc = k.terc; adim = N + 1; }
            else { adim = 0; V = []; A = []; terc = 'oturan'; }
            var h = altBosluk(); $k.css('padding-bottom', h + 'px'); $b.css('max-height', 'calc(100vh - ' + h + 'px)');
            $k.addClass('bb-acik'); ciz();
        }
        function kapat() { $k.removeClass('bb-acik'); }
        $('.bb-ac').on('click', function (e) { e.preventDefault(); ac(); });
        $k.on('click', function (e) { if (e.target === this) kapat(); });
        $(document).on('keydown', function (e) { if (e.key === 'Escape') kapat(); });
        kayitGoster();
        // Site ilk bedeni kendiliğinden seçili getiriyor (urunDetay_varyasyonSecili = true); müşteri bilmeden onu sepete atmasın diye
        // sayfa açılışında listeyi 'Seçiniz'e döndürür. Müşteri kendisi bir beden seçtiyse dokunmaz.
        var dokundu = false;
        $(document).on('mousedown touchstart keydown', 'select.eksecenekSelect', function () { dokundu = true; });
        $k.on('click', '.bb-secbtn', function () { dokundu = true; });
        function seciniz() {
            if (dokundu) return;
            var $s = $('select.eksecenekSelect').first();
            if ($s.length && $s.val() !== '-1' && $s.find('option[value="-1"]').length) { $s.val('-1').trigger('change'); }
        }
        setTimeout(seciniz, 300); setTimeout(seciniz, 1500);
        // Listedeki ilk seçenek 'Seçiniz' yerine SECIN yazısını göstersin. Site listeyi yeniden çizerse yazı geri gelmesin diye izlenir.
        function etiket() { var o = document.querySelector('select.eksecenekSelect option[value="-1"]'); if (o && o.textContent.replace(/^\s+|\s+$/g, '') === 'Seçiniz') { o.textContent = SECIN; } }
        etiket(); setTimeout(etiket, 300); setTimeout(etiket, 1500);
        // Site kapsayıcıyı yeniden çizerse şerit silinebilir; silinirse beden satırının önüne geri konur (aynı öğe, tıklama bağı korunur).
        function izle() { etiket(); if (!$serit[0].isConnected) { var $l = $('select.eksecenekSelect').first().closest('.eksecenekLine'); if ($l.length) { $l.before($serit); } } }
        try { new MutationObserver(izle).observe($('#divUrunEkSecenek')[0], { childList: true, subtree: true }); } catch (e) { }
    } catch (e) { /* sayfayı bozma */ }
}

// Beden listesi (seçenekleriyle) sayfada hazır olur olmaz çalışır: önce hemen bakar (liste çoğunlukla sunucudan hazır gelir, bu durumda hiç gözlemci kurulmaz);
// değilse sayfa değişiklikleri izlenir (yedek olarak 0,25 sn'de bir; en fazla 20 sn). Sitenin "Beden Ölçü Tablosu" bağlantısını (.bedenT) beklemez:
// şerit beden satırının önüne konur, site o bağlantıyı kapsayıcının en başına ekler, sıralama değişmez.
(function () {
    var bitti = false, t0 = Date.now(), obs = null, iv = null;
    function son() { bitti = true; clearInterval(iv); try { if (obs) { obs.disconnect(); } } catch (e) { } }
    function dene() {
        if (bitti) return;
        try {
            var s = document.querySelector('#divUrunEkSecenek select.eksecenekSelect');
            if (window.jQuery && s && s.options.length > 1) { son(); BedenBul(); }
            else if (Date.now() - t0 > 20000) { son(); }
        } catch (e) { son(); }
    }
    dene();
    if (!bitti) {
        try { obs = new MutationObserver(dene); obs.observe(document.documentElement, { childList: true, subtree: true }); } catch (e) { }
        iv = setInterval(dene, 250);
    }
})();

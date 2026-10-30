(function () {

    /* Fungsi bantu: photos(folder, jumlah, ekstensi, [caption1, caption2, ...]) */
    function photos(folder, total, ext, captions) {
        var list = [];
        for (var i = 1; i <= total; i++) {
            list.push({
                type: 'photo',
                src: folder + '/foto-' + i + '.' + (ext || 'jpg'),
                caption: (captions && captions[i - 1]) || ''
            });
        }
        return list;
    }

    var GALLERY = {

        /* 1 - IKAPPNS */
        1: photos('assets/ikappns', 2, 'jpg', []).concat([
            { type: 'youtube', id: 'FDUMhRHylS8' },
            { type: 'youtube', id: 'bOs7ace_aXQ' }
        ]),

        /* 2 - Welder Activity Recognition */
        2: [
            { type: 'photo', src: 'assets/welder/foto-1.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-2.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-3.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-4.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-5.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-6.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-7.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-8.jpeg' },
            { type: 'photo', src: 'assets/welder/foto-9.jpg' },
            { type: 'photo', src: 'assets/welder/foto-10.jpg' },
            { type: 'photo', src: 'assets/welder/foto-11.png' },
            { type: 'photo', src: 'assets/welder/foto-12.jpg' },
            { type: 'youtube', id: '5Yn497UCZq0' },
            { type: 'youtube', id: 'EuYMTRLgQrc' },
            { type: 'youtube', id: 'aOw0gTwZrFk' }
        ],

        /* 3 - Automation & Control Systems */
        3: photos('assets/automation', 13, 'jpeg').concat([
            { type: 'photo', src: 'assets/automation/foto-14.jpg' },
            { type: 'youtube', id: '2W3tEDPPyOw' }
        ]),

        /* 4 - UangKu */
        4: photos('assets/uangku', 1, 'jpg', [
        ]).concat([
            { type: 'youtube', id: '2QH83JKkQqQ' }
        ]),

        /* 5 - Human Activity Recognition */
        5: photos('assets/har', 3, 'jpeg').concat([
            { type: 'youtube', id: 'ANHVEqoAceg' }
        ])

    };

    var section = document.getElementById('modalGallerySection');
    if (!section) return;

    var view    = document.getElementById('galView');
    var strip   = document.getElementById('galStrip');
    var cap     = document.getElementById('galCap');
    var count   = document.getElementById('galCount');
    var prevBtn = document.getElementById('galPrev');
    var nextBtn = document.getElementById('galNext');

    var items = [];
    var cur = 0;


    /* =====================================================
       ZOOM FOTO
    ===================================================== */

    var zoom = document.createElement('div');
    zoom.className = 'gz';
    zoom.setAttribute('aria-hidden', 'true');
    zoom.innerHTML =
        '<div class="gz-bar">' +
            '<button type="button" class="gz-btn" data-act="out" aria-label="Zoom out">−</button>' +
            '<span class="gz-level">100%</span>' +
            '<button type="button" class="gz-btn" data-act="in" aria-label="Zoom in">+</button>' +
            '<button type="button" class="gz-btn gz-text" data-act="reset">Reset</button>' +
            '<button type="button" class="gz-btn gz-close" data-act="close" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="gz-stage"><img class="gz-img fit" alt="" draggable="false"></div>' +
        '<p class="gz-cap"></p>';
    document.body.appendChild(zoom);

    var zStage = zoom.querySelector('.gz-stage');
    var zImg   = zoom.querySelector('.gz-img');
    var zLevel = zoom.querySelector('.gz-level');
    var zCap   = zoom.querySelector('.gz-cap');

    var zScale = 1, zBase = 0;
    var ZMIN = 1, ZMAX = 6;

    function setZoom(z) {
        z = Math.max(ZMIN, Math.min(ZMAX, z));

        /* simpan titik tengah supaya zoom terasa di tengah layar */
        var rx = (zStage.scrollLeft + zStage.clientWidth / 2) / (zStage.scrollWidth || 1);
        var ry = (zStage.scrollTop + zStage.clientHeight / 2) / (zStage.scrollHeight || 1);

        zScale = z;

        if (z === 1) {
            zImg.classList.add('fit');
            zImg.style.width = '';
        } else {
            zImg.classList.remove('fit');
            zImg.style.width = (zBase * z) + 'px';
        }

        zStage.classList.toggle('zoomed', z > 1);
        zLevel.textContent = Math.round(z * 100) + '%';

        zStage.scrollLeft = rx * zStage.scrollWidth - zStage.clientWidth / 2;
        zStage.scrollTop  = ry * zStage.scrollHeight - zStage.clientHeight / 2;
    }

    function measureBase() {
        zImg.classList.add('fit');
        zImg.style.width = '';
        zBase = zImg.getBoundingClientRect().width;
    }

    function openZoom(src, caption) {
        zImg.onload = function () { measureBase(); setZoom(1); };
        zImg.src = src;
        zImg.alt = caption || '';
        zCap.textContent = caption || '';
        zoom.classList.add('open');
        zoom.setAttribute('aria-hidden', 'false');
        zScale = 1;
        zLevel.textContent = '100%';
        zStage.scrollLeft = 0;
        zStage.scrollTop = 0;
        if (zImg.complete) { measureBase(); setZoom(1); }
    }

    function closeZoom() {
        zoom.classList.remove('open');
        zoom.setAttribute('aria-hidden', 'true');
        zImg.removeAttribute('src');
    }

    /* tombol */
    zoom.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]');
        if (b) {
            var act = b.getAttribute('data-act');
            if (act === 'in')    setZoom(zScale * 1.4);
            if (act === 'out')   setZoom(zScale / 1.4);
            if (act === 'reset') setZoom(1);
            if (act === 'close') closeZoom();
            return;
        }
        /* klik area gelap menutup */
        if (e.target === zoom || e.target === zStage) closeZoom();
    });

    /* scroll mouse = zoom */
    zStage.addEventListener('wheel', function (e) {
        e.preventDefault();
        setZoom(zScale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
    }, { passive: false });

    /* geser foto dengan mouse saat diperbesar (di layar sentuh pakai geser jari biasa) */
    var drag = false, moved = false, sx = 0, sy = 0, sl = 0, st = 0;

    zStage.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0 || zScale === 1) return;
        drag = true; moved = false;
        sx = e.clientX; sy = e.clientY;
        sl = zStage.scrollLeft; st = zStage.scrollTop;
        zStage.classList.add('grabbing');
    });

    window.addEventListener('pointermove', function (e) {
        if (!drag) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
        zStage.scrollLeft = sl - dx;
        zStage.scrollTop  = st - dy;
    });

    window.addEventListener('pointerup', function () {
        drag = false;
        zStage.classList.remove('grabbing');
    });

    /* klik foto = zoom 2.5x, klik lagi = kembali */
    zImg.addEventListener('click', function () {
        if (moved) { moved = false; return; }
        setZoom(zScale > 1 ? 1 : 2.5);
    });

    /* keyboard: Esc hanya menutup zoom, bukan seluruh modal project */
    window.addEventListener('keydown', function (e) {
        if (!zoom.classList.contains('open')) return;
        e.stopPropagation();
        if (e.key === 'Escape') closeZoom();
        if (e.key === '+' || e.key === '=') setZoom(zScale * 1.4);
        if (e.key === '-') setZoom(zScale / 1.4);
        if (e.key === '0') setZoom(1);
    }, true);

    window.addEventListener('resize', function () {
        if (zoom.classList.contains('open')) { measureBase(); setZoom(1); }
    });


    /* =====================================================
       GALERI
    ===================================================== */

    function posterOf(it) {
        if (it.poster) return it.poster;
        if (it.type === 'youtube') return 'https://img.youtube.com/vi/' + it.id + '/hqdefault.jpg';
        return '';
    }

    function clearView() {
        view.innerHTML = '';   // menghapus video/iframe juga menghentikan putarannya
    }

    function playMedia(it) {
        clearView();

        if (it.type === 'youtube') {
            var f = document.createElement('iframe');
            f.src = 'https://www.youtube.com/embed/' + it.id + '?autoplay=1&rel=0';
            f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            f.referrerPolicy = 'strict-origin-when-cross-origin';
            f.allowFullscreen = true;
            f.title = it.caption || 'Video';
            view.appendChild(f);
        } else {
            var v = document.createElement('video');
            v.src = it.src;
            v.controls = true;
            v.autoplay = true;
            v.playsInline = true;
            if (it.poster) v.poster = it.poster;
            view.appendChild(v);
        }
    }

    function show(i) {
        cur = (i + items.length) % items.length;
        var it = items[cur];

        clearView();

        if (it.type === 'photo') {
            var img = document.createElement('img');
            img.src = it.src;
            img.alt = it.caption || '';
            img.draggable = false;
            img.className = 'gal-zoomable';
            img.title = 'Click to zoom';
            img.onclick = function () { openZoom(it.src, it.caption); };
            view.appendChild(img);
        } else {
            var p = posterOf(it);
            if (p) {
                var pimg = document.createElement('img');
                pimg.src = p;
                pimg.alt = it.caption || '';
                pimg.className = 'gal-poster';
                pimg.draggable = false;
                view.appendChild(pimg);
            }
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gal-play';
            btn.setAttribute('aria-label', 'Play video');
            btn.onclick = function () { playMedia(it); };
            view.appendChild(btn);
        }

        cap.textContent = it.caption || '';
        count.textContent = (cur + 1) + ' / ' + items.length;

        for (var k = 0; k < strip.children.length; k++) {
            strip.children[k].classList.toggle('on', k === cur);
        }
    }

    function render(n) {
        items = GALLERY[n] || [];
        section.hidden = items.length === 0;
        strip.innerHTML = '';
        clearView();

        if (!items.length) return;

        items.forEach(function (it, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'gal-th' + (it.type === 'photo' ? '' : ' is-video');
            b.setAttribute('aria-label', 'Show item ' + (i + 1));

            var thumbSrc = it.type === 'photo' ? (it.thumb || it.src) : posterOf(it);
            if (thumbSrc) {
                var t = document.createElement('img');
                t.src = thumbSrc;
                t.alt = '';
                t.loading = 'lazy';
                t.draggable = false;
                b.appendChild(t);
            }

            if (it.type !== 'photo') {
                var badge = document.createElement('span');
                badge.className = 'gal-badge';
                badge.textContent = 'Video';
                b.appendChild(badge);
            }

            b.onclick = function () { show(i); };
            strip.appendChild(b);
        });

        var multi = items.length > 1;
        prevBtn.style.display = multi ? '' : 'none';
        nextBtn.style.display = multi ? '' : 'none';

        show(0);
    }

    prevBtn.onclick = function () { show(cur - 1); };
    nextBtn.onclick = function () { show(cur + 1); };


    /* Sambungkan ke fungsi lama TANPA mengubahnya */

    var originalOpen = window.openProject;
    window.openProject = function (n) {
        var result = typeof originalOpen === 'function' ? originalOpen.apply(this, arguments) : undefined;
        render(n);
        return result;
    };

    var originalClose = window.closeProject;
    window.closeProject = function () {
        clearView();
        closeZoom();
        return typeof originalClose === 'function' ? originalClose.apply(this, arguments) : undefined;
    };

})();
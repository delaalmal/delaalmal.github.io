/* =========================================================
   PROJECT DATA
   (urutan nomor sama dengan urutan kartu di HTML)
========================================================= */

const projectData = {

    1: {

        number: "01",

        title: "IKAPPNS",

        category: "MOBILE APPLICATION · BACKEND & FRONTEND",

        image: "assets/project-ikappns.jpg",

        description:
            "An alumni information application developed using React Native with a PHP backend and MySQL database. The system uses an API to connect the mobile application with the database.",

        tags: [
            "React Native",
            "PHP",
            "MySQL",
            "REST API",
            "Figma"
        ],

        contribution: [
            "Developed the mobile application interface using React Native.",
            "Implemented communication between the application and backend API.",
            "Worked with PHP backend and MySQL database integration.",
            "Designed the application interface and user experience."
        ],

        result:
            "The application provides an interface for displaying and managing alumni information through a mobile platform."

    },


    2: {

        number: "02",

        title: "Welder Activity Recognition",

        category: "DEEP LEARNING · IoT · EMBEDDED SYSTEM",

        image: "assets/project-iot.jpg",

        description:
            "An IoT-based system for classifying welder activities using IMU sensor data and a Convolutional Neural Network (CNN). The system is designed to recognize six welder activity classes based on body position and welding activity.",

        tags: [
            "ESP32",
            "ICM-20948",
            "CNN",
            "Image Precessing",
            "Python",
            "MQTT",
            "Raspberry Pi"
        ],

        contribution: [
            "Designed the sensor data acquisition system using ESP32 and ICM-20948.",
            "Performed sensor data preprocessing and preparation for machine learning.",
            "Developed and trained the CNN classification model.",
            "Integrated the prediction system with IoT communication and monitoring."
        ],

        result:
            "The classification model achieved 99.03% accuracy, 99.04% precision, 99.03% recall, and 99.03% F1-score."

    },


    3: {

        number: "03",

        title: "Automation & Control Systems",

        category: "INDUSTRIAL AUTOMATION",

        image: "assets/project-automation.jpg",

        description:
            "A collection of practical automation projects covering electrical design, PLC programming, pneumatic systems, circuit simulation, PCB design, and electrical power system analysis.",

        tags: [
            "PLC",
            "AutoCAD",
            "EAGLE",
            "ETAP",
            "Proteus",
            "Pneumatics"
        ],

        contribution: [
            "Created electrical drawings and wiring diagrams using AutoCAD.",
            "Designed electronic schematics and PCB layouts using EAGLE.",
            "Performed electrical system analysis using ETAP.",
            "Developed PLC control logic for automation systems.",
            "Designed and simulated pneumatic control systems.",
            "Simulated electronic and microcontroller circuits using Proteus."
        ],

        result:
            "Developed practical understanding of industrial automation, electrical systems, control logic, electronics, and pneumatic systems."

    },


    4: {

        number: "04",

        title: "UangKu",

        category: "UI/UX · MOBILE APPLICATION",

        image: "assets/project-uangku.jpg",

        description:
            "A mobile financial management application designed to help users manage their personal expenses through a simple and intuitive interface.",

        tags: [
            "UI/UX",
            "React Native",
            "Expo",
            "Figma"
        ],

        contribution: [
            "Designed the user interface and user experience.",
            "Created application prototypes using Figma.",
            "Developed the mobile interface using React Native.",
            "Implemented the application using Expo."
        ],

        result:
            "Created a simple mobile interface for managing personal financial activities and expenses."

    },


    5: {

        number: "05",

        title: "Human Activity Recognition",

        category: "COMPUTER VISION · IoT",

        image: "assets/project-har.jpg",

        description:
            "A computer vision project for recognizing human activities from camera input and sending activity notifications through Telegram.",

        tags: [
            "Computer Vision",
            "YOLO",
            "Python",
            "Telegram",
            "IoT"
        ],

        contribution: [
            "Processed camera input for activity recognition.",
            "Implemented object and activity detection using YOLO.",
            "Developed the activity notification workflow.",
            "Integrated the system with Telegram notifications."
        ],

        result:
            "The system can detect activities from camera input and provide notifications through Telegram."

    }

};


/* =========================================================
   HELPER
========================================================= */

/* true kalau modal project atau lightbox sertifikat sedang terbuka */
function isOverlayOpen() {

    return (
        document.body.classList.contains("modal-open") ||
        document.body.classList.contains("org-modal-lock") ||
        document.body.classList.contains("cx-lock")
    );

}


/* =========================================================
   PROJECT CAROUSEL
========================================================= */

const projectCards = document.querySelectorAll(".project-card");
const projectDots = document.querySelectorAll(".project-dots button");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentProject = 1;


function updateCarousel() {

    const totalProjects = projectCards.length;

    projectCards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "prev",
            "next",
            "hidden-left",
            "hidden-right"
        );

        /* selisih posisi kartu dengan kartu aktif (carousel melingkar) */

        let difference = index - currentProject;

        if (difference > totalProjects / 2) {
            difference -= totalProjects;
        }

        if (difference < -totalProjects / 2) {
            difference += totalProjects;
        }

        if (difference === 0) {
            card.classList.add("active");
        }
        else if (difference === -1) {
            card.classList.add("prev");
        }
        else if (difference === 1) {
            card.classList.add("next");
        }
        else if (difference < 0) {
            card.classList.add("hidden-left");
        }
        else {
            card.classList.add("hidden-right");
        }

    });

    projectDots.forEach((dot, index) => {

        dot.classList.toggle("active", index === currentProject);

    });

}


function nextProject() {

    currentProject++;

    if (currentProject >= projectCards.length) {
        currentProject = 0;
    }

    updateCarousel();

}


function previousProject() {

    currentProject--;

    if (currentProject < 0) {
        currentProject = projectCards.length - 1;
    }

    updateCarousel();

}


nextButton.addEventListener("click", nextProject);
prevButton.addEventListener("click", previousProject);

projectDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentProject = index;
        updateCarousel();

    });

});

/* panah keyboard (tidak aktif saat modal / lightbox terbuka) */

document.addEventListener("keydown", (event) => {

    if (isOverlayOpen()) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextProject();
    }

    if (event.key === "ArrowLeft") {
        previousProject();
    }

});

updateCarousel();


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal = document.getElementById("projectModal");

function openProject(projectId) {

    const project = projectData[projectId];

    if (!project) {
        return;
    }

const modalImage = document.getElementById("modalImage");

/* ambil gambar dari kartu yang sama, supaya selalu sama dengan gambar depan */
const cardImg = document.querySelector(
    '.project-card[data-index="' + (projectId - 1) + '"] .project-image img'
);

modalImage.src = cardImg ? cardImg.getAttribute("src") : project.image;
modalImage.alt = project.title;

    document.getElementById("modalNumber").textContent = project.number;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalCategory").textContent = project.category;
    document.getElementById("modalDescription").textContent = project.description;
    document.getElementById("modalResult").textContent = project.result;


    /* Technologies */

    const modalTags = document.getElementById("modalTags");

    modalTags.innerHTML = "";

    project.tags.forEach((tag) => {

        const span = document.createElement("span");

        span.textContent = tag;
        modalTags.appendChild(span);

    });


    /* Contribution */

    const contribution = document.getElementById("modalContribution");

    contribution.innerHTML = "";

    project.contribution.forEach((item) => {

        const li = document.createElement("li");

        li.textContent = item;
        contribution.appendChild(li);

    });


    projectModal.classList.add("show");
    document.body.classList.add("modal-open");

}


function closeProject() {

    projectModal.classList.remove("show");
    document.body.classList.remove("modal-open");

}


/* klik di luar kotak modal untuk menutup */

projectModal.addEventListener("click", (event) => {

    if (event.target === projectModal) {
        closeProject();
    }

});


/* =========================================================
   ORGANIZATIONS GALLERY + DETAIL PANEL
========================================================= */
(() => {
    const section = document.getElementById('organizations');
    if (!section) return;

    const track = section.querySelector('.org-track');
    const items = [...section.querySelectorAll('.org-item')];
    const modal = section.querySelector('.org-modal');

    // Pindahkan panel ke <body> supaya selalu menutupi seluruh layar
    document.body.appendChild(modal);

    const infoBox  = modal.querySelector('.org-modal-info');
    const photoBox = modal.querySelector('.org-modal-photo');
    const counter  = modal.querySelector('.org-modal-count');
    const closeBtn = modal.querySelector('.org-modal-close');
    const mPrev    = modal.querySelector('.org-modal-prev');
    const mNext    = modal.querySelector('.org-modal-next');

    let current = 0;
    let lastFocus = null;
    let moved = false;

    /* ---------- Slider: geser dengan mouse ---------- */

    let down = false, startX = 0, startLeft = 0;

    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true;
        moved = false;
        startX = e.clientX;
        startLeft = track.scrollLeft;
    });

    track.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) {
            moved = true;
            track.classList.add('is-dragging');
            track.setPointerCapture(e.pointerId);
        }
        if (moved) track.scrollLeft = startLeft - dx;
    });

    const endDrag = () => {
        if (!down) return;
        down = false;
        track.classList.remove('is-dragging');
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    /* ---------- Panel detail ---------- */

    const pad = (n) => String(n).padStart(2, '0');

    const render = (i) => {
        current = (i + items.length) % items.length;
        const item = items[current];
        infoBox.innerHTML  = item.querySelector('.org-info').innerHTML;
        photoBox.innerHTML = item.querySelector('.org-photo').innerHTML;
        counter.textContent = `${pad(current + 1)} / ${pad(items.length)}`;
    };

    const openModal = (i) => {
        lastFocus = document.activeElement;
        render(i);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('org-modal-lock');
        closeBtn.focus();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('org-modal-lock');
        if (lastFocus) lastFocus.focus();
    };

    // Klik foto -> buka panel (diabaikan kalau barusan menggeser)
    track.addEventListener('click', (e) => {
        if (moved) { moved = false; return; }
        const btn = e.target.closest('.org-open');
        if (!btn) return;
        openModal(items.indexOf(btn.closest('.org-item')));
    });

    closeBtn.addEventListener('click', closeModal);
    mPrev.addEventListener('click', () => render(current - 1));
    mNext.addEventListener('click', () => render(current + 1));

    // Klik area gelap menutup panel
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('org-modal-backdrop') ||
            e.target === modal) closeModal();
    });

    // Keyboard: Esc, panah kiri/kanan, Tab terkunci di dalam panel
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            render(current + 1);
        } else if (e.key === 'ArrowLeft') {
            render(current - 1);
        } else if (e.key === 'Tab') {
            const f = [...modal.querySelectorAll('button')];
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        }
    });
})();

/* =========================================================
   CERTIFICATIONS & TRAINING: ACCORDION + LIGHTBOX (ZOOM)
========================================================= */
(() => {
    const section = document.getElementById('certifications');
    if (!section) return;

    const panels = [...section.querySelectorAll('.cx-panel')];
    const box    = section.querySelector('.cx-lightbox');

    // Pindahkan lightbox ke <body> supaya menutupi seluruh layar
    document.body.appendChild(box);

    const stage   = box.querySelector('.cx-lightbox-stage');
    const lbImg   = stage.querySelector('img');
    const lbCap   = box.querySelector('.cx-lightbox-cap');
    const lbClose = box.querySelector('.cx-lightbox-close');
    const bar     = box.querySelector('.cx-lightbox-bar');
    const level   = box.querySelector('.cx-zlevel');
    const btnIn   = box.querySelector('[data-zoom="in"]');
    const btnOut  = box.querySelector('[data-zoom="out"]');

    /* ---------- Akordeon ---------- */

    const activate = (target) => {
        panels.forEach((p) => {
            const on = p === target;
            p.classList.toggle('is-active', on);
            p.querySelector('.cx-collapsed').inert = on;
            p.querySelector('.cx-expanded').inert = !on;
        });
    };

    // Desktop dengan mouse: panel berganti saat kursor diarahkan (ada jeda singkat)
    const hoverMode = window.matchMedia('(hover: hover) and (min-width: 901px)');
    let timer;

    panels.forEach((p) => {
        p.addEventListener('mouseenter', () => {
            if (!hoverMode.matches) return;
            clearTimeout(timer);
            timer = setTimeout(() => activate(p), 110);
        });
        p.addEventListener('mouseleave', () => clearTimeout(timer));
        p.querySelector('.cx-collapsed').addEventListener('click', () => activate(p));
    });

    activate(panels[0]);

    /* ---------- Zoom ---------- */

    const MIN = 1, MAX = 4, STEP = 0.5;
    let scale = 1;

    // lebar foto saat pas di layar (zoom 100%)
    const fitWidth = () => {
        const w = lbImg.naturalWidth;
        const h = lbImg.naturalHeight;
        if (!w || !h) return 0;
        const rect = stage.getBoundingClientRect();
        return w * Math.min(rect.width / w, rect.height / h) * 0.96;
    };

    const render = () => {
        const fit = fitWidth();
        lbImg.style.width = fit ? (fit * scale) + 'px' : '';
        level.textContent = Math.round(scale * 100) + '%';
        stage.classList.toggle('is-zoomed', scale > 1);
        btnOut.disabled = scale <= MIN;
        btnIn.disabled  = scale >= MAX;
    };

    // zoom dengan titik fokus (cx, cy) relatif terhadap area foto
    const setScale = (next, cx = stage.clientWidth / 2, cy = stage.clientHeight / 2) => {
        next = Math.min(MAX, Math.max(MIN, next));
        if (next === scale) return;

        const rx = (stage.scrollLeft + cx) / stage.scrollWidth;
        const ry = (stage.scrollTop + cy) / stage.scrollHeight;

        scale = next;
        render();

        stage.scrollLeft = rx * stage.scrollWidth - cx;
        stage.scrollTop  = ry * stage.scrollHeight - cy;
    };

    // tombol + / − / Reset
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('[data-zoom]');
        if (!b) return;
        const action = b.dataset.zoom;
        if (action === 'in')  setScale(scale + STEP);
        if (action === 'out') setScale(scale - STEP);
        if (action === 'reset') {
            setScale(1);
            stage.scrollTo(0, 0);
        }
    });

    // Ctrl + scroll (atau cubit di trackpad) untuk zoom
    stage.addEventListener('wheel', (e) => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        const rect = stage.getBoundingClientRect();
        setScale(
            scale + (e.deltaY < 0 ? STEP : -STEP),
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    }, { passive: false });

    // Geser foto saat sedang di-zoom (mouse)
    let drag = null;
    let dragged = false;

    stage.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0 || scale === 1) return;
        drag = {
            x: e.clientX,
            y: e.clientY,
            left: stage.scrollLeft,
            top: stage.scrollTop
        };
        dragged = false;
    });

    stage.addEventListener('pointermove', (e) => {
        if (!drag) return;
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        if (!dragged && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
            dragged = true;
            stage.classList.add('is-grabbing');
        }
        if (dragged) {
            stage.scrollLeft = drag.left - dx;
            stage.scrollTop  = drag.top - dy;
        }
    });

    const endDrag = () => {
        drag = null;
        stage.classList.remove('is-grabbing');
    };
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('pointerleave', endDrag);

    // Klik foto: zoom 200% / kembali. Klik area kosong: tutup.
    stage.addEventListener('click', (e) => {
        if (dragged) { dragged = false; return; }

        if (e.target !== lbImg) {
            if (scale === 1) closeBox();
            return;
        }

        if (scale === 1) {
            const rect = stage.getBoundingClientRect();
            setScale(2, e.clientX - rect.left, e.clientY - rect.top);
        } else {
            setScale(1);
            stage.scrollTo(0, 0);
        }
    });

    window.addEventListener('resize', () => {
        if (box.classList.contains('is-open')) render();
    });

    /* ---------- Buka / tutup ---------- */

    let lastFocus = null;

    const openBox = (src, title) => {
        lastFocus = document.activeElement;

        scale = 1;
        lbImg.style.width = '';
        lbImg.onload = render;
        lbImg.src = src;
        lbImg.alt = title;
        lbCap.textContent = title;

        box.classList.add('is-open');
        box.setAttribute('aria-hidden', 'false');
        document.body.classList.add('cx-lock');

        stage.scrollTo(0, 0);
        render();
        if (lbImg.complete) render();

        lbClose.focus();
    };

    const closeBox = () => {
        box.classList.remove('is-open');
        box.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('cx-lock');
        scale = 1;
        if (lastFocus) lastFocus.focus();
    };

    section.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-lightbox]');
        if (!btn) return;
        const title = btn.closest('.cx-panel').querySelector('h3').textContent;
        openBox(btn.dataset.lightbox, title);
    });

    lbClose.addEventListener('click', closeBox);

    // Keyboard: Esc tutup, + / − / 0 untuk zoom, Tab terkunci di dalam viewer
    document.addEventListener('keydown', (e) => {
        if (!box.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeBox();
        } else if (e.key === '+' || e.key === '=') {
            setScale(scale + STEP);
        } else if (e.key === '-') {
            setScale(scale - STEP);
        } else if (e.key === '0') {
            setScale(1);
        } else if (e.key === 'Tab') {
            const f = [...box.querySelectorAll('button:not(:disabled)')];
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        }
    });
})();


/* =========================================================
   ESCAPE KEY (menutup modal project)
   Panel organisasi dan lightbox sertifikat menangani Esc sendiri
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    closeProject();

});

/* =========================================================
   HERO — INTERACTIVE
========================================================= */

(function () {

    const hero = document.querySelector(".hero");

    if (!hero) {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


    /* -----------------------------------------------------
       1. TEKS MENGETIK
    ----------------------------------------------------- */

    const typed = document.getElementById("heroTyped");

    if (typed) {

        const phrases = [
            "IoT systems",
            "embedded applications",
            "deep learning models",
            "PLC & SCADA systems"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {

            const word = phrases[phraseIndex];

            charIndex += deleting ? -1 : 1;
            typed.textContent = word.slice(0, charIndex);

            let delay = deleting ? 35 : 70;

            if (!deleting && charIndex === word.length) {

                delay = 1600;
                deleting = true;

            } else if (deleting && charIndex === 0) {

                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 350;

            }

            setTimeout(type, delay);

        }

        if (reduceMotion) {
            typed.textContent = phrases[0];
        } else {
            setTimeout(type, 900);
        }

    }


        /* -----------------------------------------------------
       2. NAMA "DELA" TERACAK SEBENTAR, LALU KEMBALI
    ----------------------------------------------------- */

    const heading = hero.querySelector(".hero-content h1");
    const nameEl = hero.querySelector(".hero-content h1 span");

    if (nameEl && heading && !reduceMotion) {

        const finalText = nameEl.textContent.trim();
        const glyphs = "abcdefghijklmnopqrstuvwxyz";

        let running = false;

        nameEl.style.display = "inline-block";

        function finish() {

            running = false;
            nameEl.textContent = finalText;

        }

        function scramble() {

            if (running) {
                return;
            }

            /* kunci lebar supaya judul tidak bergeser saat huruf berubah */
            nameEl.style.minWidth = nameEl.offsetWidth + "px";

            running = true;

            const start = performance.now();
            const duration = 700;

            function frame(now) {

                const t = Math.min((now - start) / duration, 1);

                let output = "";

                for (let i = 0; i < finalText.length; i++) {

                    if (t > (i + 1) / finalText.length) {

                        output += finalText[i];

                    } else {

                        const letter =
                            glyphs[Math.floor(Math.random() * glyphs.length)];

                        output += i === 0 ? letter.toUpperCase() : letter;

                    }

                }

                nameEl.textContent = output;

                if (t < 1) {
                    requestAnimationFrame(frame);
                } else {
                    finish();
                }

            }

            requestAnimationFrame(frame);

        }

        heading.addEventListener("mouseenter", scramble);
                setTimeout(scramble, 500);
    }


    /* -----------------------------------------------------
       3. BOLA BISA DIKLIK (MEMANTUL)
    ----------------------------------------------------- */

    hero.querySelectorAll(".circle").forEach((circle) => {

        circle.addEventListener("click", () => {

            circle.animate(
                [
                    { scale: "1" },
                    { scale: "1.35 0.7" },
                    { scale: "0.85 1.2" },
                    { scale: "1.1 0.95" },
                    { scale: "1" }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );

        });

    });


    /* -----------------------------------------------------
       4. FOTO MIRING + BOLA PARALLAX + TOMBOL MAGNETIK
          (hanya untuk mouse, bukan layar sentuh)
    ----------------------------------------------------- */

    if (!canHover || reduceMotion) {
        return;
    }

    const card = hero.querySelector(".image-card");

    const layers = [
        [".circle-one", 26],
        [".circle-two", 42],
        [".circle-three", 16],
        [".circle-four", 34],
        [".circle-five", 24],
        [".orbit-one", 8],
        [".orbit-two", 14]
    ]
        .map(([selector, depth]) => [hero.querySelector(selector), depth])
        .filter(([element]) => element);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    function render() {

        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        if (card) {
            card.style.setProperty("--rx", (-currentY * 7).toFixed(2) + "deg");
            card.style.setProperty("--ry", (currentX * 9).toFixed(2) + "deg");
        }

        layers.forEach(([element, depth]) => {
            element.style.translate =
                `${currentX * depth}px ${currentY * depth}px`;
        });

        const stillMoving =
            Math.abs(targetX - currentX) > 0.001 ||
            Math.abs(targetY - currentY) > 0.001;

        frameId = stillMoving ? requestAnimationFrame(render) : null;

    }

    function start() {

        if (!frameId) {
            frameId = requestAnimationFrame(render);
        }

    }

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        start();

    });

    hero.addEventListener("mouseleave", () => {

        targetX = 0;
        targetY = 0;

        start();

    });


    /* Tombol sedikit "tertarik" ke kursor */

    hero.querySelectorAll(".hero-buttons .button").forEach((button) => {

        button.addEventListener("mousemove", (event) => {

            const rect = button.getBoundingClientRect();

            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);

            button.style.translate = `${dx * 0.25}px ${dy * 0.4}px`;

        });

        button.addEventListener("mouseleave", () => {
            button.style.translate = "";
        });

    });

})();

/* =========================================================
   CONTACT: BOLA MEMANTUL + FOTO MIRING
========================================================= */
(() => {
    const section = document.getElementById('contact');
    if (!section) return;

    /* ---------- Bola memantul saat diklik ---------- */

    section.querySelectorAll('.ct-sphere').forEach((sphere) => {
        sphere.addEventListener('click', () => {
            sphere.animate(
                [
                    { scale: '1' },
                    { scale: '1.35 0.7' },
                    { scale: '0.85 1.2' },
                    { scale: '1.1 0.95' },
                    { scale: '1' }
                ],
                { duration: 600, easing: 'ease-out' }
            );
        });
    });

    /* ---------- Foto miring mengikuti kursor (hanya untuk mouse) ---------- */

    const photo = section.querySelector('.ct-photo');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!photo || reduceMotion || !canHover) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let frameId = null;

    const render = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        photo.style.setProperty('--rx', (-currentY * 7).toFixed(2) + 'deg');
        photo.style.setProperty('--ry', (currentX * 9).toFixed(2) + 'deg');

        const moving =
            Math.abs(targetX - currentX) > 0.001 ||
            Math.abs(targetY - currentY) > 0.001;

        frameId = moving ? requestAnimationFrame(render) : null;
    };

    const start = () => {
        if (!frameId) frameId = requestAnimationFrame(render);
    };

    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        start();
    });

    section.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        start();
    });
})();
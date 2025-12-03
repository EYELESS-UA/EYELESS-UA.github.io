document.addEventListener('DOMContentLoaded', () => {
    // Версія для cache busting зображень (синхронізовано з .version)
    const ASSETS_VERSION = '1.4.1';

    // Функція для додавання версії до URL зображення
    const addImageVersion = (url) => {
        if (!url || url.startsWith('http') || url.startsWith('data:')) return url;
        return url.includes('?') ? `${url}&v=${ASSETS_VERSION}` : `${url}?v=${ASSETS_VERSION}`;
    };

    const translations = {
        uk: {
            nav_projects: "Проєкти", nav_support: "Підтримка", nav_contacts: "Контакти",
            hero_title: "Грайте українською —<br>відчувайте по-новому.",
            hero_lead: "Улюблені історії — українською, від серця.",
            stat_projects: "ПРОЄКТІВ", stat_avg: "СЕР. ГОТОВНІСТЬ", stat_ea: "РАННІЙ ДОСТУП",
            search_ph: "Пошук всесвіту...", filter_all: "Всі", filter_in_progress: "В процесі", filter_fundraising: "Збір", filter_early_access: "Ранній доступ",
            news_title: "НОВИНИ",
            contacts_title: "Контакти", contacts_text: "Слідкуйте за новинами у наших соцмережах:",
            support_title: "Підтримати нас", support_text: "Ваша підтримка допомагає нам створювати якісні українські локалізації улюблених ігор",
            benefactors_title: "ДОБРОЧИНЦІ",
            st_prog: "В ПРОЦЕСІ", st_fund: "ЗБІР КОШТІВ", st_early: "РАННІЙ ДОСТУП", st_done: "ГОТОВО", st_planned: "ЗАПЛАНОВАНО",
            lbl_readiness: "Готовність", lbl_raised: "Зібрано",
            btn_dl: "Завантажити", btn_details: "Деталі", lbl_episode: "Епізод",
            lbl_text: "Текст", lbl_textures: "Текстури", lbl_fonts: "Шрифти",
            empty_projects: "Наразі нічого нема"
        },
        en: {
            nav_projects: "Projects", nav_support: "Support", nav_contacts: "Contacts",
            hero_title: "Play in Ukrainian —<br>feel it anew.",
            hero_lead: "Favorite stories — in Ukrainian, from the heart.",
            stat_projects: "PROJECTS", stat_avg: "AVG. READINESS", stat_ea: "EARLY ACCESS",
            search_ph: "Search universe...", filter_all: "All", filter_in_progress: "In Progress", filter_fundraising: "Fundraising", filter_early_access: "Early Access",
            news_title: "NEWS",
            contacts_title: "Contacts", contacts_text: "Follow our news on social media:",
            support_title: "Support Us", support_text: "Your support helps us create quality Ukrainian localizations of beloved games",
            benefactors_title: "BENEFACTORS",
            st_prog: "IN PROGRESS", st_fund: "FUNDRAISING", st_early: "EARLY ACCESS", st_done: "RELEASED", st_planned: "PLANNED",
            lbl_readiness: "Readiness", lbl_raised: "Raised",
            btn_dl: "Download", btn_details: "Details", lbl_episode: "Episode",
            lbl_text: "Text", lbl_textures: "Textures", lbl_fonts: "Fonts",
            empty_projects: "Nothing here yet"
        }
    };

    let currentLang = 'uk';

    // Дані імпортуються з data.js

    // ENHANCED TILT with Logo Parallax
    const initTilt = (card) => {
        const logo = card.querySelector('.card-logo');

        card.addEventListener('mousemove', (e) => {
            if(window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;

            // Картка нахиляється
            card.style.transform = `perspective(1000px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;

            // Логотип рухається в протилежному напрямку (паралакс)
            if (logo) {
                logo.style.transform = `translateX(${dx * 15}px) translateY(${dy * 15}px) translateZ(30px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
            if (logo) {
                logo.style.transform = `translateX(0) translateY(0) translateZ(0)`;
            }
        });
    };

    const grid = document.getElementById('projects');
    let activeFilter = 'all';

    // --- Animated background particles (lightweight canvas) ---
    const initBackgroundParticles = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let w = window.innerWidth;
        let h = window.innerHeight;
        let particles = [];
        let rafId = null;
        let mouseX = w * 0.5;
        let mouseY = h * 0.5;

        function resize() {
            dpr = window.devicePixelRatio || 1;
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function createParticles() {
            const count = Math.max(18, Math.floor(w / 70));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: 0.8 + Math.random() * 2.4,
                    alpha: 0.15 + Math.random() * 0.6,
                    speedMult: 0.5 + Math.random() * 1.5
                });
            }
        }

        let time = 0;
        const colors = ['rgba(0,242,255', 'rgba(189,0,255', 'rgba(16,185,129'];
        const getColor = (idx) => colors[idx % colors.length];

        function draw() {
            ctx.clearRect(0, 0, w, h);
            time += 0.013;

            // Draw soft pulsing glows with colors and gravity-like center pull
            for (const p of particles) {
                p.x += p.vx * p.speedMult;
                p.y += p.vy * p.speedMult;
                
                // Cursor interaction: attract/repel particles
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distToMouse = Math.hypot(dx, dy);
                const mouseRadius = 200;
                
                if (distToMouse < mouseRadius) {
                    // Attract particles toward cursor (with reduced influence at distance)
                    const influence = 1 - (distToMouse / mouseRadius);
                    const attractStrength = 0.00015 * influence;
                    p.vx += dx * attractStrength;
                    p.vy += dy * attractStrength;
                }
                
                // Subtle acceleration toward center (gravity-like pull)
                const cx = w * 0.5, cy = h * 0.5;
                const distToCenter = Math.hypot(p.x - cx, p.y - cy);
                if (distToCenter > 100) {
                    const pullStrength = 0.00008;
                    p.vx += (cx - p.x) * pullStrength;
                    p.vy += (cy - p.y) * pullStrength;
                    p.vx *= 0.9995;
                    p.vy *= 0.9995;
                }
                
                if (p.x < -20) p.x = w + 20;
                if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20;
                if (p.y > h + 20) p.y = -20;

                // Pulsing radius and opacity based on time
                const pulsePhase = (time + p.r * 0.5) * 2.5;
                const pulse = Math.sin(pulsePhase) * 0.4 + 0.6;
                const pulseRad = p.r * pulse;
                const pulseAlpha = p.alpha * (Math.sin(pulsePhase + Math.PI / 4) * 0.3 + 0.7);

                // Color based on particle index
                const colorBase = getColor(Math.floor(p.r * 100));

                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRad * 9);
                grd.addColorStop(0, `${colorBase},${0.18 * pulseAlpha})`);
                grd.addColorStop(0.5, `${colorBase},${0.06 * pulseAlpha})`);
                grd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseRad * 9, 0, Math.PI * 2);
                ctx.fill();

                // Inner bright core (more pronounced during pulse peaks)
                const corePulse = Math.abs(Math.sin(pulsePhase)) * 0.5 + 0.2;
                ctx.fillStyle = `${colorBase},${corePulse * pulseAlpha * 0.3})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseRad * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw dynamic connecting lines with color gradients and glow
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    const maxDist = 140;
                    if (dist < maxDist) {
                        const pulseA = Math.sin(time * 2 + a.r) * 0.4 + 0.6;
                        const pulseB = Math.sin(time * 2 + b.r) * 0.4 + 0.6;
                        const baseSmoothness = 1 - (dist / maxDist);
                        const opa = baseSmoothness * 0.16 * Math.min(pulseA, pulseB) * Math.min(a.alpha, b.alpha);
                        
                        const colorA = getColor(Math.floor(a.r * 100));
                        
                        // Draw line with enhanced glow
                        ctx.strokeStyle = `${colorA},${opa * 0.6})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        
                        // Glow line on top
                        ctx.strokeStyle = `${colorA},${opa * 0.15})`;
                        ctx.lineWidth = 3.2;
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(draw);
        }

        function start() {
            cancelAnimationFrame(rafId);
            resize();
            createParticles();
            draw();
        }

        window.addEventListener('resize', () => { start(); });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else rafId = requestAnimationFrame(draw);
        });
        
        // Track mouse position for particle interaction
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Reset to center when mouse leaves window
        document.addEventListener('mouseleave', () => {
            mouseX = w * 0.5;
            mouseY = h * 0.5;
        });

        start();
    };

    window.setLang = (lang) => {
        if (!translations[lang]) return;
        const t = translations[lang];

        const els = Array.from(document.querySelectorAll('[data-i18n]'));
        const placeholders = Array.from(document.querySelectorAll('[data-i18n-placeholder]'));

        // Fade out existing text
        els.forEach(el => { el.style.transition = 'opacity 180ms ease'; el.style.opacity = 0; });
        placeholders.forEach(el => { el.style.transition = 'opacity 180ms ease'; el.style.opacity = 0; });

        setTimeout(() => {
            currentLang = lang;

            const opts = Array.from(document.querySelectorAll('.lang-opt'));
            opts.forEach(el => { el.classList.remove('active'); el.setAttribute('aria-pressed', 'false'); });
            const chosen = opts[lang === 'uk' ? 0 : 1];
            if (chosen) { chosen.classList.add('active'); chosen.setAttribute('aria-pressed', 'true'); }

            els.forEach(el => { if (t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n]; el.style.opacity = 1; });
            placeholders.forEach(el => { if (t[el.dataset.i18nPlaceholder]) el.placeholder = t[el.dataset.i18nPlaceholder]; el.style.opacity = 1; });

            try { localStorage.setItem('lng', lang); } catch (e) { /* ignore */ }

            renderGrid();
            if (typeof initNewsSlider === 'function') initNewsSlider();
        }, 180);
    };

    function renderGrid() {
        const term = document.getElementById('search').value.toLowerCase();
        grid.innerHTML = '';
        const t = translations[currentLang];

        const filtered = projectsData.filter(p => {
            const matchCat = activeFilter === 'all' || p.status === activeFilter;
            const matchTerm = p.title.toLowerCase().includes(term);
            return matchCat && matchTerm;
        });

        // Якщо немає елементів після фільтрації/пошуку — показуємо повідомлення
        if (!filtered.length) {
            grid.innerHTML = `<div class="empty-grid-message">${t.empty_projects || (currentLang==='uk' ? 'Наразі нічого нема' : 'Nothing here yet')}</div>`;
            const sc = document.getElementById('stat-count'); if(sc) sc.innerText = 0;
            const se = document.getElementById('stat-ea'); if(se) se.innerText = 0;
            const sa = document.getElementById('stat-avg'); if(sa) sa.innerText = '0%';
            return;
        }

        filtered.forEach(p => {
            let stClass = 'st-prog', stText = t.st_prog;
            let barColor = 'var(--neon-blue)';
            let metaLabel = t.lbl_readiness;
            let btnClass = 'btn-grad-blue';

            // Автоматичний розрахунок загального прогресу на основі компонентів
            // Шрифти мають найменший вплив на загальну готовність
            let displayProgress = p.progress;
            if (p.progress_text !== undefined || p.progress_textures !== undefined || p.progress_fonts !== undefined) {
                let weightedSum = 0;
                let totalWeight = 0;

                // Ваги компонентів: текст - 60%, текстури - 30%, шрифти - 10%
                if (p.progress_text !== undefined) {
                    weightedSum += p.progress_text * 0.6;
                    totalWeight += 0.6;
                }
                if (p.progress_textures !== undefined) {
                    weightedSum += p.progress_textures * 0.3;
                    totalWeight += 0.3;
                }
                if (p.progress_fonts !== undefined) {
                    weightedSum += p.progress_fonts * 0.1;
                    totalWeight += 0.1;
                }

                if (totalWeight > 0) {
                    displayProgress = Math.round(weightedSum / totalWeight);
                }
            }

            // Встановлюємо metaVal після розрахунку displayProgress
            let metaVal = `${displayProgress}%`;

            if(p.status === 'fundraising') {
                stClass = 'st-fund'; stText = t.st_fund; barColor = 'var(--neon-orange)';
                metaLabel = t.lbl_raised;
                if(p.goal) {
                    metaVal = `${(p.raised/1000).toFixed(1)}k / ${(p.goal/1000).toFixed(1)}k`;
                }
                // Використовуємо прогрес перекладу (progress), а не збору коштів
                btnClass = 'btn-fund';
            } else if (p.status === 'done') {
                // Завершений проєкт
                stClass = 'st-done'; stText = t.st_done; barColor = 'var(--neon-green)';
                // Покажемо 100% у смузі прогресу
                displayProgress = 100;
                metaLabel = t.lbl_readiness;
                metaVal = `${displayProgress}%`;
            } else if (p.status === 'planned') {
                // Заплановний проєкт
                stClass = 'st-planned'; stText = t.st_planned; barColor = '#94a3b8';
                displayProgress = 0;
                metaLabel = t.lbl_readiness;
                metaVal = `${displayProgress}%`;
                btnClass = 'btn-disabled';
            } else if(p.status === 'early-access') {
                stClass = 'st-early'; stText = t.st_early; barColor = 'var(--neon-purple)';
                btnClass = 'btn-early';
            }

            const btnLabel = (currentLang==='uk'? p.cta.label : (p.cta.label_en || p.cta.label));
            let btnHtml = `<a href="${p.cta.url}" target="_blank" class="btn-action ${btnClass}">${btnLabel}</a>`;
            if(p.cta.type === 'disabled') {
                btnHtml = `<span class="btn-action btn-disabled">${btnLabel}</span>`;
            }

            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-visual">
                    <img src="${addImageVersion(p.cover)}" class="card-bg-img" loading="lazy">
                    <div class="card-logo-layer">
                        <img src="${addImageVersion(p.logo)}" class="card-logo" onerror="this.style.display='none'">
                    </div>
                </div>
                <div class="card-info">
                    <div class="c-header"><div class="status-pill ${stClass}">${stText}</div></div>
                    <h3 class="card-title">${p.title}</h3>
                    <div class="progress-wrap">
                        <div class="p-meta"><span>${metaLabel}</span><span>${metaVal}</span></div>
                        <div class="p-track">
                            <div class="p-bar" style="width:${displayProgress}%; background:${barColor}; box-shadow:0 0 10px ${barColor}"></div>
                        </div>
                    </div>
                    <div class="card-actions">
                        ${btnHtml}
                        <button class="btn-action btn-details" onclick="openModal('${p.id}')">${t.btn_details}</button>
                    </div>
                </div>
            `;
            initTilt(card);
            grid.appendChild(card);
        });

        document.getElementById('stat-count').innerText = filtered.length;
        document.getElementById('stat-ea').innerText = filtered.filter(p => p.status === 'early-access').length;

        // Розрахунок середньої статистики залежно від фільтру
        let avg = 0;
        const statAvgLabel = document.querySelector('.stat[data-label="avg"] .stat-lbl');

        if (activeFilter === 'fundraising') {
            // Для збору коштів рахуємо середній прогрес збору
            const fundraising = filtered.filter(p => p.status === 'fundraising' && p.goal);
            if (fundraising.length) {
                const totalProgress = fundraising.reduce((sum, p) => {
                    return sum + Math.min(Math.round((p.raised / p.goal) * 100), 100);
                }, 0);
                avg = Math.round(totalProgress / fundraising.length);
            }
            // Змінюємо текст на "Зібрано"
            if (statAvgLabel) {
                statAvgLabel.setAttribute('data-i18n', 'stat_fundraising');
                statAvgLabel.innerText = currentLang === 'uk' ? 'ЗІБРАНО' : 'FUNDRAISED';
            }
        } else {
            // Для інших фільтрів рахуємо середню готовність з автоматичним розрахунком
            const active = filtered.filter(p => p.status !== 'fundraising');
            if (active.length) {
                const totalProgress = active.reduce((sum, p) => {
                    // Автоматичний розрахунок прогресу для кожного проєкту
                    let projectProgress = p.progress;
                    if (p.progress_text !== undefined || p.progress_textures !== undefined || p.progress_fonts !== undefined) {
                        const components = [];
                        if (p.progress_text !== undefined) components.push(p.progress_text);
                        if (p.progress_textures !== undefined) components.push(p.progress_textures);
                        if (p.progress_fonts !== undefined) components.push(p.progress_fonts);
                        if (components.length > 0) {
                            projectProgress = Math.round(components.reduce((a, b) => a + b, 0) / components.length);
                        }
                    }
                    return sum + (projectProgress || 0);
                }, 0);
                avg = Math.round(totalProgress / active.length);
            }
            // Повертаємо текст на "СЕР. ГОТОВНІСТЬ"
            if (statAvgLabel) {
                statAvgLabel.setAttribute('data-i18n', 'stat_avg');
                statAvgLabel.innerText = currentLang === 'uk' ? 'СЕР. ГОТОВНІСТЬ' : 'AVG. READINESS';
            }
        }
        document.getElementById('stat-avg').innerText = avg + "%";
    }

    document.querySelectorAll('.f-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        activeFilter = b.dataset.filter;
        renderGrid();
    }));

    // Yakuza Easter Egg
    const yakuzaSound = new Audio(addImageVersion('assets/sound.mp3'));
    let yakuzaSoundPlayed = false;

    document.getElementById('search').addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();

        // Перевірка на "yakuza" або "якудза"
        if ((searchValue.includes('yakuza') || searchValue.includes('якудза')) && !yakuzaSoundPlayed) {
            yakuzaSound.play().catch(err => console.log('Audio play failed:', err));
            yakuzaSoundPlayed = true;
        } else if (!searchValue.includes('yakuza') && !searchValue.includes('якудза')) {
            yakuzaSoundPlayed = false;
        }

        renderGrid();
    });

    const bList = document.getElementById('benefactors-list');
    benefactorsList.forEach(b => {
        const sp = document.createElement('span');
        sp.className = `b-tag ${b.type||''}`;
        sp.innerText = (b.type==='gold'?'👑 ':b.type==='green'?'💚 ':b.type==='flamingo'?'🦩 ':'') + b.name;
        bList.appendChild(sp);
    });

    // МОДАЛЬНЕ ВІКНО (ВИПРАВЛЕНО)
    const modal = document.getElementById('modal');
    let currentSlide = 0;
    let totalSlides = 0;

    const renderGallerySlider = (gallery) => {
        const container = document.getElementById('m-gallery-slider');
        const track = document.getElementById('m-gallery-track');
        const dotsContainer = document.querySelector('.gallery-dots');
        
        if (!gallery || gallery.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        currentSlide = 0;
        totalSlides = gallery.length;

        // Додаємо слайди
        gallery.forEach((img, idx) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            const imgEl = document.createElement('img');
            imgEl.src = addImageVersion(img);
            imgEl.alt = `Слайд ${idx + 1}`;
            slide.appendChild(imgEl);
            track.appendChild(slide);

            // Додаємо крапку
            const dot = document.createElement('div');
            dot.className = 'dot' + (idx === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        updateSliderPosition();
    };

    const goToSlide = (index) => {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        updateSliderPosition();
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSliderPosition();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    };

    const updateSliderPosition = () => {
        const track = document.getElementById('m-gallery-track');
        if (track) {
            track.style.transform = `translateX(${-currentSlide * 100}%)`;
        }

        // Оновляємо активну крапку
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    };

    window.openModal = (id) => {
        const p = projectsData.find(x => x.id === id);
        if(!p) return;
        const t = translations[currentLang];

        document.getElementById('m-logo').src = addImageVersion(p.logo);
        document.getElementById('m-desc').innerHTML = currentLang==='uk'?p.desc: (p.desc_en || p.desc);

        // Ініціалізуємо слайдер
        renderGallerySlider(p.gallery || []);

        const sBox = document.getElementById('m-stats'); sBox.innerHTML = '';

        const addBar = (l,v) => {
            if(v!==undefined) sBox.innerHTML += `
            <div class="stat-row">
                <div class="stat-label">${l}</div>
                <div class="stat-track"><div class="stat-fill" style="width:${v}%"></div></div>
                <div class="stat-val">${v}%</div>
            </div>`;
        };

        // Логіка для різних типів прогресу
        if (p.progress_mode === 'episodes') {
             for(let i=1; i<=8; i++) {
                const val = p[`progress_ep${i}`];
                if(val !== undefined) addBar(`${t.lbl_episode} ${i}`, val);
             }
        } else if (p.status === 'fundraising') {
            if(p.goal) {
                const pct = Math.min(Math.round((p.raised/p.goal)*100), 100);
                addBar(t.lbl_raised, pct);
            }
            if(p.progress_text) addBar(t.lbl_text, p.progress_text);
        } else {
            if(p.progress_text !== undefined) addBar(t.lbl_text, p.progress_text);
            if(p.progress_textures !== undefined) addBar(t.lbl_textures, p.progress_textures);
            if(p.progress_fonts !== undefined) addBar(t.lbl_fonts, p.progress_fonts);
        }

        const vBox = document.getElementById('m-video'); vBox.innerHTML = '';
        if(p.videos && p.videos.length) {
             const vID = p.videos[0].match(/v=([a-zA-Z0-9_-]+)/)?.[1];
             if(vID) vBox.innerHTML = `<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/${vID}" frameborder="0" allowfullscreen></iframe></div>`;
        }

        // Кнопки дій
        const mActions = document.getElementById('m-actions');
        mActions.innerHTML = '';

        // Steam link
        if(p.steam) {
            mActions.innerHTML += `<a href="${p.steam}" target="_blank" class="btn-action btn-details" style="flex:0 0 auto; padding:0 15px">Steam</a>`;
        }

        // Основна кнопка
        const btnLabel = (currentLang==='uk'? p.cta.label : (p.cta.label_en || p.cta.label));
        if(p.cta.type !== 'disabled') {
            let btnClass = 'btn-grad-blue';
            if(p.status === 'fundraising') btnClass = 'btn-fund';
            else if(p.status === 'early-access') btnClass = 'btn-early';

            mActions.innerHTML += `<a href="${p.cta.url}" target="_blank" class="btn-action ${btnClass}" style="flex:1">${btnLabel}</a>`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Додаємо слухачі для кнопок навігації слайдера
        setTimeout(() => {
            const prevBtn = document.querySelector('.gallery-nav-prev');
            const nextBtn = document.querySelector('.gallery-nav-next');
            
            if (prevBtn) prevBtn.removeEventListener('click', prevSlide);
            if (nextBtn) nextBtn.removeEventListener('click', nextSlide);
            
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        }, 0);
    };

    const closeM = () => { 
        modal.classList.remove('active'); 
        document.body.style.overflow = ''; 
        document.getElementById('m-video').innerHTML='';
        document.getElementById('m-gallery-slider').style.display = 'none';
        currentSlide = 0;
        totalSlides = 0;
    };
    document.querySelector('.modal-close').addEventListener('click', closeM);
    modal.addEventListener('click', e => { if(e.target === modal) closeM(); });

    // Apply saved language preference (if any) — this will call renderGrid()
    try {
        const saved = localStorage.getItem('lng') || currentLang;
        setLang(saved);
    } catch (e) {
        renderGrid();
    }

    // Initialize animated particle background (non-blocking)
    try { initBackgroundParticles(); } catch (e) { console.warn('bg particles init failed', e); }

    // === NEWS SLIDER ===
    window.initNewsSlider = () => {
        const slider = document.querySelector('.news-slider');
        if (!slider) return;

        const sliderTrack = slider.querySelector('.slider-track');
        const dotsContainer = slider.querySelector('.slider-dots');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');

        // Очищаємо попередні dots при переініціалізації
        dotsContainer.innerHTML = '';

        // Рендеримо слайди з newsSlides відповідно до поточної мови
        if (typeof newsSlides !== 'undefined' && newsSlides.length > 0) {
            sliderTrack.innerHTML = newsSlides.map((slide, index) => {
                const badgeClass = `news-badge-${slide.badgeType}`;
                const isActive = index === 0 ? 'active' : '';

                // Вибір тексту залежно від мови
                const badge = currentLang === 'uk' ? slide.badge : (slide.badge_en || slide.badge);
                const title = currentLang === 'uk' ? slide.title : (slide.title_en || slide.title);
                const description = currentLang === 'uk' ? slide.description : (slide.description_en || slide.description);
                const buttonText = currentLang === 'uk' ? slide.buttonText : (slide.buttonText_en || slide.buttonText);

                // Lazy loading: завантажуємо тільки перший слайд, інші через data-атрибут
                const bgStyle = index === 0 ? `style="background-image: url('${addImageVersion(slide.image)}');"` : `data-bg="${addImageVersion(slide.image)}"`;

                return `
                    <div class="news-slide ${isActive}" ${bgStyle}>
                        <div class="news-slide-overlay"></div>
                        <div class="news-slide-content">
                            <div class="news-badge ${badgeClass}">${badge}</div>
                            <h2 class="news-title">${title}</h2>
                            <p class="news-description">${description}</p>
                            <a href="${slide.link}" target="_blank" class="news-btn">
                                <span>${buttonText}</span>
                            </a>
                        </div>
                        <div class="slide-progress-bar"></div>
                    </div>
                `;
            }).join('');
        }

        const slides = Array.from(slider.querySelectorAll('.news-slide'));

        let currentIndex = 0;
        let progressInterval = null;
        let isPaused = false;
        let isWaitingAfterManual = false; // Чи очікуємо після ручного перемикання
        let currentProgress = 0;
        const AUTOPLAY_DELAY = 5000; // 5 секунд

        // Створюємо dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Перейти до новини ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index, true);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));

        // Анімація прогрес-бару
        const startProgressBar = (startFrom = 0) => {
            const progressBar = slides[currentIndex].querySelector('.slide-progress-bar');
            if (!progressBar) return;

            // Зупинка попереднього інтервалу
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }

            currentProgress = startFrom;
            progressBar.style.width = startFrom + '%';
            const increment = 100 / (AUTOPLAY_DELAY / 16); // 60 FPS

            progressInterval = setInterval(() => {
                if (isPaused) return;

                currentProgress += increment;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    progressBar.style.width = '100%';
                    clearInterval(progressInterval);
                    progressInterval = null;

                    // Перемикаємо слайд тільки коли прогрес-бар досяг 100%
                    if (!isWaitingAfterManual) {
                        goToSlide(currentIndex + 1, false);
                    }
                } else {
                    progressBar.style.width = currentProgress + '%';
                }
            }, 16);
        };

        const stopProgressBar = () => {
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
        };

        // Функція переходу до слайду
        const goToSlide = (index, isManual = false) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Зміна слайдів
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            // Lazy load зображення для поточного слайду
            const currentSlide = slides[currentIndex];
            if (currentSlide.dataset.bg && !currentSlide.style.backgroundImage) {
                currentSlide.style.backgroundImage = `url('${currentSlide.dataset.bg}')`;
            }

            // Preload наступного слайду
            const nextIndex = (currentIndex + 1) % slides.length;
            const nextSlide = slides[nextIndex];
            if (nextSlide.dataset.bg && !nextSlide.style.backgroundImage) {
                nextSlide.style.backgroundImage = `url('${nextSlide.dataset.bg}')`;
            }

            // Обнуляємо ВСІ прогрес-бари візуально
            slides.forEach(slide => {
                const progressBar = slide.querySelector('.slide-progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            });

            // Скид та перезапуск прогрес-бару
            stopProgressBar();
            currentProgress = 0;

            if (!isManual) {
                // Автоматичне перемикання - запускаємо прогрес-бар
                startProgressBar(0);
            } else {
                // Ручне перемикання - ресет автоплею з паузою
                resetAutoplay();
            }
        };

        // Автоплей
        const startAutoplay = () => {
            stopAutoplay();
            isPaused = false;

            // Просто запускаємо прогрес-бар, він сам перемкне слайд коли досягне 100%
            startProgressBar(currentProgress);
        };

        const stopAutoplay = () => {
            stopProgressBar();
        };

        const resetAutoplay = () => {
            stopAutoplay();
            isPaused = false;
            isWaitingAfterManual = true;
            currentProgress = 0;

            // Пауза 3 секунди після ручного перемикання
            setTimeout(() => {
                if (isWaitingAfterManual) {
                    isWaitingAfterManual = false;
                    currentProgress = 0;
                    startAutoplay();
                }
            }, 3000);
        };

        // Події для кнопок
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1, true);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1, true);
        });

        // Пауза при наведенні
        slider.addEventListener('mouseenter', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            isPaused = true;
            stopAutoplay();
        });

        slider.addEventListener('mouseleave', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            isPaused = false;
            startAutoplay();
        });

        // Підтримка свайпів на мобільних
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1, true);
                } else {
                    goToSlide(currentIndex - 1, true);
                }
            }
        }, { passive: true });

        // Підтримка клавіатури
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1, true);
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1, true);
        });

        // Запуск автоплею
        startAutoplay();

        // Зупинка при виході з вкладки
        document.addEventListener('visibilitychange', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            if (document.hidden) {
                isPaused = true;
                stopAutoplay();
            } else {
                isPaused = false;
                startAutoplay();
            }
        });
    };

    // Ініціалізація слайдера
    initNewsSlider();

    // Bento-style gradient effect для donate та contact cards
    const bentoCards = document.querySelectorAll('.support-donate-card, .contact-card');

    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            // Обчислення кута для обертання градієнта
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);
            card.style.setProperty('--gradient-angle', angle);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
            card.style.setProperty('--gradient-angle', 0);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        uk: {
            nav_projects: "Проєкти", nav_support: "Підтримка", nav_contacts: "Контакти",
            hero_title: "Грайте українською —<br>відчувайте по-новому.",
            hero_lead: "Улюблені історії — українською, від серця.",
            stat_projects: "ПРОЄКТІВ", stat_avg: "СЕР. ГОТОВНІСТЬ", stat_ea: "РАННІЙ ДОСТУП", st_planned: "Заплановано",
            search_ph: "Пошук всесвіту...", filter_all: "Всі", filter_in_progress: "В процесі", filter_fundraising: "Збір", filter_early_access: "Ранній доступ",
            contacts_title: "Контакти", contacts_text: "Слідкуйте за новинами у наших соцмережах:",
            support_title: "Підтримати нас", support_text: "Ваша підтримка допомагає нам створювати якісні українські локалізації улюблених ігор",
            benefactors_title: "ДОБРОЧИНЦІ",
            st_prog: "В ПРОЦЕСІ", st_fund: "ЗБІР КОШТІВ", st_early: "РАННІЙ ДОСТУП", st_done: "ГОТОВО",
            lbl_readiness: "Готовність", lbl_raised: "Зібрано",
            btn_dl: "Завантажити", btn_details: "Деталі", lbl_episode: "Епізод",
            lbl_text: "Текст", lbl_textures: "Текстури", lbl_fonts: "Шрифти"
        },
        en: {
            nav_projects: "Projects", nav_support: "Support", nav_contacts: "Contacts",
            hero_title: "Play in Ukrainian —<br>feel it anew.",
            hero_lead: "Favorite stories — in Ukrainian, from the heart.",
            stat_projects: "PROJECTS", stat_avg: "AVG. READINESS", stat_ea: "EARLY ACCESS", st_planned: "planned",
            search_ph: "Search universe...", filter_all: "All", filter_in_progress: "In Progress", filter_fundraising: "Fundraising", filter_early_access: "Early Access",
            contacts_title: "Contacts", contacts_text: "Follow our news on social media:",
            support_title: "Support Us", support_text: "Your support helps us create quality Ukrainian localizations of beloved games",
            benefactors_title: "BENEFACTORS",
            st_prog: "IN PROGRESS", st_fund: "FUNDRAISING", st_early: "EARLY ACCESS", st_done: "RELEASED",
            lbl_readiness: "Readiness", lbl_raised: "Raised",
            btn_dl: "Download", btn_details: "Details", lbl_episode: "Episode",
            lbl_text: "Text", lbl_textures: "Textures", lbl_fonts: "Fonts"
        }
    };

    let currentLang = 'uk';

    // Дані імпортуються з data.js

    // TILT
    const initTilt = (card) => {
        card.addEventListener('mousemove', (e) => {
            if(window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const cx = rect.width / 2; const cy = rect.height / 2;
            const dx = (x - cx) / cx; const dy = (y - cy) / cy;
            card.style.transform = `perspective(1000px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    };

    const grid = document.getElementById('projects');
    let activeFilter = 'all';

    window.setLang = (lang) => {
        currentLang = lang;
        const t = translations[lang];
        document.querySelectorAll('.lang-opt').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.lang-opt')[lang === 'uk' ? 0 : 1].classList.add('active');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            if(t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            if(t[el.dataset.i18nPlaceholder]) el.placeholder = t[el.dataset.i18nPlaceholder];
        });
        renderGrid();
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

        filtered.forEach(p => {
            let stClass = 'st-prog', stText = t.st_prog;
            let barColor = 'var(--neon-blue)';
            let metaLabel = t.lbl_readiness;
            let metaVal = `${p.progress}%`;
            let btnClass = 'btn-grad-blue';

            // Автоматичний розрахунок прогресу для збору коштів
            let displayProgress = p.progress;

            if(p.status === 'fundraising') {
                stClass = 'st-fund'; stText = t.st_fund; barColor = 'var(--neon-orange)';
                metaLabel = t.lbl_raised;
                if(p.goal) {
                    metaVal = `${(p.raised/1000).toFixed(1)}k / ${(p.goal/1000).toFixed(1)}k`;
                    // Автоматично розраховуємо прогрес збору коштів
                    displayProgress = Math.min(Math.round((p.raised/p.goal)*100), 100);
                }
                btnClass = 'btn-fund';
              } else if (p.status === 'early-access') {
                stClass = 'st-early';
                stText = t.st_early;
                barColor = 'var(--neon-purple)';
                btnClass = 'btn-early';

              } else if (p.status === 'planned') {
                  stClass = 'st-planned';
                  stText = t.st_planned;
                  btnClass = 'btn-disabled';
              }

               else if (p.status === 'done') {
                stClass = 'st-done';
                stText = t.st_done;
                barColor = 'var(--neon-green)';
                btnClass = 'btn-grad-blue';
              }

               else if (p.status === 'planned') {
                stClass = 'st-planned';
                stText = t.st_planned;
                btnClass = 'btn-disabled';
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
                    <img src="${p.cover}" class="card-bg-img" loading="lazy">
                    <div class="card-logo-layer">
                        <img src="${p.logo}" class="card-logo" onerror="this.style.display='none'">
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

        // Розрахунок середньої готовності з урахуванням автоматичного прогресу збору
        const active = filtered.filter(p => p.status !== 'fundraising');
        const avg = active.length ? Math.round(active.reduce((a,b)=>a+(b.progress||0),0)/active.length) : 0;
        document.getElementById('stat-avg').innerText = avg + "%";
    }

    document.querySelectorAll('.f-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        activeFilter = b.dataset.filter;
        renderGrid();
    }));
    document.getElementById('search').addEventListener('input', renderGrid);

    const bList = document.getElementById('benefactors-list');
    benefactorsList.forEach(b => {
        const sp = document.createElement('span');
        sp.className = `b-tag ${b.type||''}`;
        sp.innerText = (b.type==='gold'?'👑 ':b.type==='green'?'💚 ':b.type==='flamingo'?'🦩 ':'') + b.name;
        bList.appendChild(sp);
    });

    // МОДАЛЬНЕ ВІКНО (ВИПРАВЛЕНО)
    const modal = document.getElementById('modal');
    window.openModal = (id) => {
        const p = projectsData.find(x => x.id === id);
        if(!p) return;
        const t = translations[currentLang];

        document.getElementById('m-logo').src = p.logo;
        document.getElementById('m-desc').innerHTML = currentLang==='uk'?p.desc: (p.desc_en || p.desc);

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
    };

    const closeM = () => { modal.classList.remove('active'); document.body.style.overflow = ''; document.getElementById('m-video').innerHTML=''; };
    document.querySelector('.modal-close').addEventListener('click', closeM);
    modal.addEventListener('click', e => { if(e.target === modal) closeM(); });

    renderGrid();
});

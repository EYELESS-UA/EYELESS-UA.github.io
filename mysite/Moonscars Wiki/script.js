/* script.js - SPA-like navigation and rendering logic */
(function(){
  const ROOT = document.getElementById('app');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActiveNav(route){
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('data-route')===route);
    });
  }

  function routeFromHash(){
    const hash = location.hash.replace('#','') || 'home';
    return hash.split('/')[0];
  }

  function idFromHash(){
    const parts = location.hash.replace('#','').split('/');
    return parts[1] || null;
  }

  function render(){
    const route = routeFromHash();
    setActiveNav(route);
    if(route==='home') renderHome();
    else if(['characters','bosses','locations','weapons','mechanics','achievements'].includes(route)){
      const id = idFromHash();
      if(id) renderDetail(route,id); else renderList(route);
    } else renderHome();
  }

  function renderHome(){
    ROOT.innerHTML = '';
    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
      <h2>Moonscars — вікі</h2>
      <p class="muted">Тут зібрані персонажі,боси, локації, зброя та механіки гри.</p>
      <p class="muted"> Клацніть на розділ у навігації або переглядайте елементи.</p>
    `;
    ROOT.appendChild(hero);

    // quick links (use nav labels when available)
    const sections = ['characters','bosses','locations','weapons','mechanics','achievements'];
    const grid = document.createElement('div');
    grid.className='grid';
    sections.forEach(s=>{
      const list = window.DATA[s];
      const card = document.createElement('div');
      card.className='card';
      card.innerHTML = `
        <div class="thumb"><img src="${list[0].img}" alt="${s}"></div>
        <h3>${(document.querySelector(`.main-nav a[data-route="${s}"]`)?.textContent.trim()) || (s[0].toUpperCase()+s.slice(1))}</h3>
        <p class="muted">${list.length} items — переглянути</p>
      `;
      card.addEventListener('click', ()=>{ location.hash = `#${s}` });
      grid.appendChild(card);
    });
    ROOT.appendChild(grid);
  }

  function renderList(category){
    const items = window.DATA[category] || [];
    ROOT.innerHTML = '';
    const header = document.createElement('div');
    header.innerHTML = `<a class="back-btn" href="#home">← Назад</a><h2 style="margin-top:12px">${category[0].toUpperCase()+category.slice(1)}</h2>`;
    ROOT.appendChild(header);

    const grid = document.createElement('div');
    grid.className='grid';
    items.forEach(it=>{
      const card = document.createElement('div');
      card.className='card';
      card.innerHTML = `
        <div class="thumb"><img src="${it.img}" alt="${it.name}"></div>
        <h3>${it.name}</h3>
        <p class="muted">${it.short}</p>
      `;
      card.addEventListener('click', ()=>{ location.hash = `#${category}/${it.id}` });
      grid.appendChild(card);
    });
    ROOT.appendChild(grid);
  }

  function renderDetail(category, id){
    const items = window.DATA[category] || [];
    const it = items.find(x=>x.id===id);
    if(!it){ ROOT.innerHTML = `<p>Елемент не знайдено.</p><a class="back-btn" href="#${category}">← Назад</a>`; return; }
    ROOT.innerHTML = '';
    const back = document.createElement('div');
    back.innerHTML = `<a class="back-btn" href="#${category}">← Назад до ${category}</a>`;
    ROOT.appendChild(back);

    const detail = document.createElement('div');
    detail.className = 'detail';
    // build detail body including optional fields
    const physicalHtml = it.physical ? `<p><strong>Фізичний опис:</strong> ${it.physical}</p>` : '';
    const genderHtml = it.gender ? `<p><strong>Стать:</strong> ${it.gender}</p>` : '';
    detail.innerHTML = `
      <div class="detail-img"><img src="${it.img}" alt="${it.name}"></div>
      <div class="detail-body">
        <h2>${it.name}</h2>
        <p class="muted">${it.short}</p>
        <div style="height:12px"></div>
        ${physicalHtml}
        ${genderHtml}
        <p>${it.details}</p>
      </div>
    `;
    ROOT.appendChild(detail);
  }

  // initialize
  window.addEventListener('hashchange', render);
  document.addEventListener('DOMContentLoaded', ()=>{
    // delegate nav clicks to avoid reloads
    const navAnchors = Array.from(document.querySelectorAll('.main-nav a'));
    navAnchors.forEach(a=>{
      a.addEventListener('click', (e)=>{ e.preventDefault(); location.hash = a.getAttribute('href'); });
    });

    // build a searchable index from nav labels and DATA
    const categoryMap = {};
    navAnchors.forEach(a=>{ const r = a.getAttribute('data-route'); if(r) categoryMap[r] = a.textContent.trim(); });

    const searchInput = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    if(resultsEl) resultsEl.style.display = 'none';

    let searchIndex = [];
    function buildIndex(){
      searchIndex = [];
      // categories
      Object.keys(categoryMap).forEach(k=>{
        if(k==='home') return;
        searchIndex.push({type:'category', key:k, title:categoryMap[k], subtitle:'Розділ', hash:'#'+k});
      });
      // items
      Object.keys(window.DATA || {}).forEach(cat=>{
        const items = window.DATA[cat] || [];
        items.forEach(it=>{
          searchIndex.push({type:'item', category:cat, id:it.id, title:it.name, subtitle:it.short||'', hash:`#${cat}/${it.id}`});
        });
      });
    }
    buildIndex();

    function escapeHtml(str){
      if(!str) return '';
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    let highlighted = -1;
    function renderResults(list){
      resultsEl.innerHTML = '';
      highlighted = -1;
      if(!list || list.length===0){ resultsEl.style.display = 'none'; return; }
      resultsEl.style.display = 'block';
      list.slice(0,12).forEach((r,i)=>{
        const li = document.createElement('li');
        li.className = 'search-item';
        li.setAttribute('role','option');
        li.setAttribute('data-index', String(i));
        li.innerHTML = `<div><strong>${escapeHtml(r.title)}</strong></div><div class="meta">${escapeHtml(r.type==='category'? r.subtitle : r.subtitle)}</div>`;
        li.addEventListener('click', ()=>{ location.hash = r.hash; closeResults(); });
        resultsEl.appendChild(li);
      });
    }

    function closeResults(){ if(resultsEl){ resultsEl.innerHTML=''; resultsEl.style.display='none'; highlighted = -1; } }

    if(searchInput){
      searchInput.addEventListener('input', (e)=>{
        const q = (e.target.value || '').trim().toLowerCase();
        if(!q){ closeResults(); return; }
        const matches = searchIndex.filter(entry=>{
          return (entry.title || '').toLowerCase().includes(q) || (entry.subtitle||'').toLowerCase().includes(q);
        });
        renderResults(matches);
      });

      searchInput.addEventListener('keydown', (e)=>{
        const items = Array.from(resultsEl.querySelectorAll('.search-item'));
        if(e.key === 'ArrowDown'){
          e.preventDefault(); highlighted = Math.min(items.length-1, highlighted+1); updateHighlight(items);
        } else if(e.key === 'ArrowUp'){
          e.preventDefault(); highlighted = Math.max(0, highlighted-1); updateHighlight(items);
        } else if(e.key === 'Enter'){
          e.preventDefault(); if(items[highlighted]) items[highlighted].click(); else if(items[0]) items[0].click();
        } else if(e.key === 'Escape'){
          closeResults(); searchInput.blur();
        }
      });
    }

    function updateHighlight(items){
      items.forEach((it, idx)=> it.setAttribute('aria-selected', String(idx===highlighted)));
      if(items[highlighted]) items[highlighted].scrollIntoView({block:'nearest'});
    }

    document.addEventListener('click', (ev)=>{ if(!ev.target.closest || !ev.target.closest('.search-wrapper')) closeResults(); });

    render();
  });

})();
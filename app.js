const filterButtons = document.querySelectorAll(".filter-chip");
const catalogGrid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#game-search");
const emptyState = document.querySelector("#empty-state");
const visibleCount = document.querySelector("#visible-count");
const allCount = document.querySelector("#all-count");
const projectCount = document.querySelector("#project-count");
const readyCount = document.querySelector("#ready-count");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const games = window.RAVEN_GAMES;
const donorsList = document.querySelector("#donors-list");
const donorsEmpty = document.querySelector("#donors-empty");
const newsTrack = document.querySelector("#news-track");
const newsDots = document.querySelector("#news-dots");
const newsCounter = document.querySelector("#news-counter");
const newsCarousel = document.querySelector("#news-carousel");
const siteNotice = document.querySelector("#site-notice");

let activeFilter = "Усі";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderGameCard(game, index) {
  const statusClass = game.status === "Готово" ? "status-done"
    : game.status === "У роботі" ? "status-work" : "status-plan";
  const statusLabel = game.status.toLocaleUpperCase("uk");
  const actionLabel = game.status === "Готово" ? "Як грати" : "Детальніше";
  const progress = Math.max(0, Math.min(100, Number(game.progress) || 0));

  return `
    <a class="game-card" href="game.html?slug=${encodeURIComponent(game.slug)}"
      data-title="${escapeHTML(`${game.title} ${game.genres}`)}" data-status="${escapeHTML(game.status)}"
      aria-label="Переглянути сторінку гри ${escapeHTML(game.title)}">
      <div class="game-cover">
        <img src="${escapeHTML(game.cover)}" alt="${escapeHTML(game.title)}" loading="lazy">
        <span class="game-status ${statusClass}"><i></i> ${escapeHTML(statusLabel)}</span>
        <span class="cover-index">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="game-info">
        <div class="game-meta"><span>${escapeHTML(game.genres)}</span><span>${progress}%</span></div>
        <h3>${escapeHTML(game.cardTitle)}</h3>
        <div class="progress-track"><span style="width:${progress}%"></span></div>
        <div class="game-footer"><span>Переклад</span><span class="card-action">${actionLabel} <b>↗</b></span></div>
      </div>
    </a>`;
}

function renderTopDonors() {
  if (!donorsList || !donorsEmpty) return;

  const donors = window.RAVEN_TOP_DONORS;
  if (!Array.isArray(donors)) {
    console.error("Список донатерів не завантажено: перевірте RAVEN_TOP_DONORS у data.js.");
    donorsEmpty.textContent = "Не вдалося завантажити список донатерів.";
    donorsEmpty.hidden = false;
    return;
  }

  const topDonors = donors
    .filter((donor) => typeof donor.name === "string" && donor.name.trim() && Number.isFinite(Number(donor.amount)) && Number(donor.amount) > 0)
    .sort((first, second) => Number(second.amount) - Number(first.amount))
    .slice(0, 5);

  donorsList.innerHTML = topDonors.map((donor, index) => `
    <li class="donor-row${index === 0 ? " donor-first" : ""}">
      <span class="donor-rank">${String(index + 1).padStart(2, "0")}</span>
      <span class="donor-name">${escapeHTML(donor.name.trim())}</span>
      <strong class="donor-amount">${new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Number(donor.amount))} ₴</strong>
    </li>
  `).join("");
  donorsEmpty.hidden = topDonors.length > 0;

  for (let index = topDonors.length; index < 5; index += 1) {
    donorsList.insertAdjacentHTML("beforeend", `
      <li class="donor-row donor-open">
        <span class="donor-rank">${String(index + 1).padStart(2, "0")}</span>
        <span class="donor-name">Місце відкрите</span>
        <strong class="donor-amount">—</strong>
      </li>
    `);
  }
}

renderTopDonors();

function renderNewsSlider() {
  if (!newsTrack || !newsDots || !newsCounter || !newsCarousel) return;

  const newsItems = window.RAVEN_NEWS;
  if (!Array.isArray(newsItems)) {
    console.error("Новини не завантажено: перевірте RAVEN_NEWS у data.js.");
    newsTrack.innerHTML = '<p class="news-error">Новини тимчасово недоступні.</p>';
    return;
  }

  const slides = newsItems.flatMap((item) => {
    const game = games?.find((entry) => entry.slug === (item.gameSlug || item.slug));
    if (!game) {
      console.error(`Для новини «${item.title}» не знайдено гру зі slug ${item.slug}.`);
      return [];
    }

    return [{
      ...item,
      title: item.title || game.title,
      cover: typeof item.cover === "string" && item.cover.trim() ? item.cover.trim() : game.cover.trim(),
      gameTitle: game.title,
      status: game.status,
      href: `news.html?slug=${encodeURIComponent(item.slug)}`
    }];
  });

  if (slides.length === 0) {
    newsTrack.innerHTML = '<p class="news-error">Новини поки що відсутні.</p>';
    return;
  }

  newsTrack.innerHTML = slides.map((item, index) => `
    <article class="news-slide" role="group" aria-roledescription="слайд" aria-label="${index + 1} з ${slides.length}">
      <img class="news-image" src="${escapeHTML(item.cover)}" alt="" loading="${index === 0 ? "eager" : "lazy"}">
      <div class="news-content">
        <div class="news-meta"><span>${escapeHTML(item.category)}</span><span class="news-status">${escapeHTML(item.status)}</span></div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.excerpt)}</p>
        <a class="news-link" href="${item.href}">Дізнатися більше <span aria-hidden="true">↗</span></a>
      </div>
      <span class="news-watermark" aria-hidden="true">R</span>
    </article>
  `).join("");

  newsDots.innerHTML = slides.map((item, index) => `
    <button class="news-dot${index === 0 ? " active" : ""}" type="button"
      aria-label="Перейти до новини ${index + 1}" aria-current="${index === 0 ? "true" : "false"}"></button>
  `).join("");

  const dots = [...newsDots.querySelectorAll(".news-dot")];
  const previousButton = document.querySelector("#news-previous");
  const nextButton = document.querySelector("#news-next");
  let activeSlide = 0;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    newsTrack.style.transform = `translateX(-${activeSlide * 100}%)`;
    newsTrack.querySelectorAll(".news-slide").forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== activeSlide));
      slide.inert = slideIndex !== activeSlide;
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
    newsCounter.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  }

  previousButton.addEventListener("click", () => {
    showSlide(activeSlide - 1);
  });
  nextButton.addEventListener("click", () => {
    showSlide(activeSlide + 1);
  });
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(0);
}

renderNewsSlider();

siteNotice?.querySelector(".notice-dismiss")?.addEventListener("click", () => {
  siteNotice.hidden = true;
});

function updateCatalog() {
  if (!catalogGrid) return;

  const query = searchInput.value.trim().toLocaleLowerCase("uk");
  let count = 0;

  catalogGrid.querySelectorAll(".game-card").forEach((card) => {
    const matchesFilter = activeFilter === "Усі" || card.dataset.status === activeFilter;
    const matchesSearch = card.dataset.title.toLocaleLowerCase("uk").includes(query);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) count += 1;
  });

  visibleCount.textContent = String(count).padStart(2, "0");
  emptyState.hidden = count !== 0;
}

if (catalogGrid) {
  if (!Array.isArray(games)) {
    console.error("Каталог не завантажено: перевірте файл data.js.");
    emptyState.textContent = "Не вдалося завантажити каталог. Спробуйте оновити сторінку пізніше.";
    emptyState.hidden = false;
  } else {
    catalogGrid.innerHTML = games.map(renderGameCard).join("");
    allCount.textContent = String(games.length).padStart(2, "0");
    projectCount.textContent = String(games.length).padStart(2, "0");
    readyCount.textContent = String(games.filter((game) => game.status === "Готово").length).padStart(2, "0");
    updateCatalog();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      updateCatalog();
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
  });

  searchInput.addEventListener("input", updateCatalog);
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Відкрити меню" : "Закрити меню");
    mainNav.classList.toggle("open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Відкрити меню");
    });
  });
}

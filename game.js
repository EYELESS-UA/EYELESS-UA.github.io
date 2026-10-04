(() => {
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character]);

const games = window.RAVEN_GAMES;
const slug = new URLSearchParams(window.location.search).get("slug");
const game = Array.isArray(games) ? games.find((item) => item.slug === slug) : undefined;
const gameContent = document.querySelector("#game-content");
const loadError = document.querySelector("#game-load-error");

if (!game) {
  document.title = "Гру не знайдено — Raven Team";
  loadError.hidden = false;
} else {
  const statusClass = game.status === "Готово" ? "status-done"
    : game.status === "У роботі" ? "status-work" : "status-plan";
  const progress = Math.max(0, Math.min(100, Number(game.progress) || 0));
  const ready = game.status === "Готово";

  document.title = `${game.title} — Raven Team`;
  document.querySelector('meta[name="description"]').content = game.description;
  document.querySelector("#breadcrumb-title").textContent = game.title;

  const cover = document.querySelector("#detail-cover");
  cover.src = game.cover;
  cover.alt = `Обкладинка гри ${game.title}`;

  document.querySelector("#detail-title").textContent = game.title;
  document.querySelector("#detail-description").textContent = game.description;
  document.querySelector("#detail-tags").innerHTML = game.genres
    .split("·")
    .map((tag) => `<span>${escapeHTML(tag.trim())}</span>`)
    .join("");

  const statusBadges = [document.querySelector("#detail-status"), document.querySelector("#note-status")];
  statusBadges.forEach((badge) => {
    badge.classList.add(statusClass);
    badge.querySelector("span").textContent = game.status.toLocaleUpperCase("uk");
  });

  document.querySelector("#detail-progress-label").textContent = `${progress}%`;
  document.querySelector("#detail-progress-bar").style.width = `${progress}%`;
  document.querySelector("#project-note").textContent = game.projectNote || "Стежте за оновленнями команди — тут з’являтиметься актуальний стан локалізації.";

  const progressDetails = game.progressDetails || {};
  const progressStages = [
    { key: "translation", label: "Переклад", value: progress },
    { key: "editing", label: "Редактура" },
    { key: "fonts", label: "Шрифти" },
    { key: "artwork", label: "Малювання" }
  ];
  document.querySelector("#localization-progress").innerHTML = progressStages.map((stage) => {
    const stageValue = stage.value ?? progressDetails[stage.key] ?? null;
    const hasProgress = Number.isFinite(Number(stageValue)) && stageValue !== null;
    const percent = hasProgress ? Math.max(0, Math.min(100, Number(stageValue))) : null;
    const label = hasProgress ? `${percent}%` : "Не розпочато";
    return `
      <div class="localization-stage">
        <div class="localization-stage-heading"><span>${escapeHTML(stage.label)}</span><strong class="${percent === 100 ? "stage-complete" : ""}">${label}</strong></div>
        <div class="progress-track"><span class="${percent === 100 ? "stage-complete" : ""}" style="width:${percent ?? 0}%"></span></div>
      </div>
    `;
  }).join("");

  const workVolume = game.workVolume || {};
  const volumeItems = [
    ["Рядків загалом", workVolume.totalLines],
    ["Перекладено рядків", workVolume.translatedLines],
    ["Слів", workVolume.words]
  ];
  const formatCount = (value) => Number.isFinite(Number(value)) && value !== null
    ? new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Number(value))
    : "Не вказано";
  document.querySelector("#work-volume").innerHTML = volumeItems.map(([label, value]) => `
    <div class="work-volume-item"><strong>${formatCount(value)}</strong><span>${escapeHTML(label)}</span></div>
  `).join("");

  const timeline = Array.isArray(game.timeline) && game.timeline.length > 0
    ? game.timeline
    : [{
      date: game.updatedAt || "ОСТАННЄ ОНОВЛЕННЯ",
      title: "Поточний статус",
      text: game.projectNote || "Стежте за оновленнями команди — тут з’являтиметься актуальний стан локалізації."
    }];
  document.querySelector("#project-timeline").innerHTML = timeline.map((entry) => `
    <li class="timeline-entry">
      <span class="timeline-date">${escapeHTML(entry.date || "ДАТУ НЕ ВКАЗАНО")}</span>
      <div><strong>${escapeHTML(entry.title || "Оновлення проєкту")}</strong><p>${escapeHTML(entry.text || "")}</p></div>
    </li>
  `).join("");

  const links = Array.isArray(game.links) ? game.links.filter((link) => link.label && link.url) : [];
  const linksContainer = document.querySelector("#game-links");
  if (links.length === 0) {
    linksContainer.innerHTML = '<span class="game-link-empty">Посилання ще не додані.</span>';
  } else {
    linksContainer.innerHTML = links.map((link) => {
      let url;
      try {
        url = new URL(link.url, window.location.href);
      } catch (error) {
        console.error(`Некоректне посилання для гри ${game.title}:`, error);
        return "";
      }
      if (!["http:", "https:"].includes(url.protocol)) {
        console.error(`Недозволений протокол посилання для гри ${game.title}: ${url.protocol}`);
        return "";
      }
      return `<a href="${escapeHTML(url.href)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)} <span aria-hidden="true">↗</span></a>`;
    }).join("") || '<span class="game-link-empty">Посилання ще не додані.</span>';
  }

  const primaryAction = document.querySelector("#detail-primary-action");
  if (ready) {
    primaryAction.href = "#installation";
    primaryAction.innerHTML = 'До інструкції <span>↘</span>';
  } else {
    primaryAction.href = "#project-status";
    primaryAction.innerHTML = 'Стежити за проєктом <span>↘</span>';
  }

  const facts = [
    ["Статус", game.status],
    ["Версія", game.version],
    ["Реліз перекладу", game.translationRelease || "Не визначено"],
    ["Оновлено", game.updatedAt || "Не вказано"],
    ["Рік виходу", game.year],
    ["Платформи", game.platforms]
  ];
  document.querySelector("#detail-facts").innerHTML = facts.map(([label, value]) => `
    <div><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>
  `).join("");

  const installationContent = document.querySelector("#installation-content");
  const installationSteps = Array.isArray(game.installation)
    ? game.installation.filter((step) => typeof step === "string" && step.trim())
    : [];
  if (ready && installationSteps.length > 0) {
    installationContent.innerHTML = `
      <p class="installation-intro">Локалізація готова. Скористайтеся інструкцією, що надається разом із файлами перекладу:</p>
      <ol class="installation-steps">${installationSteps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
      <p class="installation-note">Посилання на завантаження та детальні кроки встановлення публікуються в офіційних каналах команди.</p>
    `;
  } else {
    document.querySelector("#installation-title").innerHTML = ready
      ? 'Інформація про <span>встановлення</span>'
      : 'Стежте за <span>оновленнями</span>';
    installationContent.innerHTML = ready
      ? '<p class="installation-intro">Інструкція зі встановлення з’явиться тут після публікації файлів перекладу. Перевірте офіційні канали команди.</p>'
      : '<p class="installation-intro">Переклад ще не опублікований. Підпишіться на оновлення Raven Team, щоб дізнатися про реліз.</p>';
  }

  const relatedGames = games.filter((item) => item.slug !== game.slug).slice(0, 4);
  document.querySelector("#related-games").innerHTML = relatedGames.map((item) => {
    const itemStatusClass = item.status === "Готово" ? "status-done"
      : item.status === "У роботі" ? "status-work" : "status-plan";
    const itemProgress = Math.max(0, Math.min(100, Number(item.progress) || 0));
    return `
      <a class="related-card" href="game.html?slug=${encodeURIComponent(item.slug)}">
        <div class="related-cover"><img src="${escapeHTML(item.cover)}" alt="${escapeHTML(item.title)}" loading="lazy">
          <span class="game-status ${itemStatusClass}"><i></i>${escapeHTML(item.status.toLocaleUpperCase("uk"))}</span>
        </div>
        <div class="related-info"><span>${escapeHTML(item.genres)}</span><strong>${escapeHTML(item.title)}</strong>
          <div class="progress-track"><span style="width:${itemProgress}%"></span></div>
        </div>
      </a>`;
  }).join("");

  gameContent.hidden = false;
}
})();

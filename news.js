(() => {
  const newsItems = window.RAVEN_NEWS;
  const games = window.RAVEN_GAMES;
  const slug = new URLSearchParams(window.location.search).get("slug");
  const article = document.querySelector("#news-article");
  const error = document.querySelector("#news-load-error");
  const moreNews = document.querySelector("#more-news");

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const story = Array.isArray(newsItems) ? newsItems.find((item) => item.slug === slug) : undefined;
  const game = story && Array.isArray(games)
    ? games.find((item) => item.slug === (story.gameSlug || story.slug))
    : undefined;

  if (!story || !game) {
    document.title = "Новину не знайдено — Raven Team";
    error.hidden = false;
    return;
  }

  document.title = `${story.title} — Raven Team`;
  document.querySelector('meta[name="description"]').content = story.excerpt;
  document.querySelector("#news-breadcrumb").textContent = story.title.toLocaleUpperCase("uk");
  document.querySelector("#article-category").textContent = story.category;
  document.querySelector("#article-title").textContent = story.title;
  document.querySelector("#article-excerpt").textContent = story.excerpt;

  const image = document.querySelector("#article-image");
  const cover = typeof story.cover === "string" && story.cover.trim() ? story.cover.trim() : game.cover.trim();
  image.src = cover;
  image.alt = `Обкладинка гри ${game.title}`;

  const paragraphs = Array.isArray(story.body) ? story.body : [];
  document.querySelector("#article-body").innerHTML = paragraphs
    .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
    .join("");

  const gameCover = document.querySelector("#article-game-cover");
  gameCover.src = game.cover.trim();
  gameCover.alt = `Обкладинка гри ${game.title}`;
  document.querySelector("#article-game-title").textContent = game.title;
  document.querySelector("#article-game-status").textContent = `Статус локалізації: ${game.status}`;
  document.querySelector("#article-game-link").href = `game.html?slug=${encodeURIComponent(game.slug)}`;
  article.hidden = false;

  const related = newsItems.filter((item) => item.slug !== story.slug && games.some((entry) => entry.slug === (item.gameSlug || item.slug)));
  if (related.length > 0) {
    document.querySelector("#more-news-grid").innerHTML = related.map((item) => {
      const relatedGame = games.find((entry) => entry.slug === (item.gameSlug || item.slug));
      const cover = typeof item.cover === "string" && item.cover.trim() ? item.cover.trim() : relatedGame.cover.trim();
      return `
        <a class="more-news-card" href="news.html?slug=${encodeURIComponent(item.slug)}">
          <img src="${escapeHTML(cover)}" alt="" loading="lazy">
          <div><span>${escapeHTML(item.category)}</span><h3>${escapeHTML(item.title)}</h3><strong>Читати новину ↗</strong></div>
        </a>`;
    }).join("");
    moreNews.hidden = false;
  }
})();

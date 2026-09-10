// Run on the local site: browse eval tests/articles.browser.js
return (async () => {
  const expected = [
    ["i-never-thought-i-d-do-startups", "I never thought I'd do startups"],
    ["i-ching", "I Ching"],
    ["i-hate-cs-i-thank-cs", "I hate CS, I thank CS"],
    ["the-matches", "The matches"],
    ["toxic-motivation-hate-and-anxiety", "Toxic motivation - Hate and Anxiety"],
  ];
  const parser = new DOMParser();
  const indexResponse = await fetch('/blog');
  if (!indexResponse.ok || new URL(indexResponse.url).pathname !== '/') throw new Error('Blog index must redirect home');
  const index = parser.parseFromString(await indexResponse.text(), 'text/html');
  const results = await Promise.all(expected.map(async ([slug, title]) => {
    if (!index.querySelector(`a[href="/blog/${slug}"]`)) throw new Error(`Missing index link: ${slug}`);
    const response = await fetch(`/blog/${slug}`);
    const page = parser.parseFromString(await response.text(), 'text/html');
    if (!response.ok || page.querySelector('h1')?.textContent !== title) throw new Error(`Incorrect article: ${slug}`);
    if (!page.querySelector('article a[href="/#articles"]')) throw new Error(`Missing return link: ${slug}`);
    if (page.querySelector('[data-home-view]')) throw new Error('Article must not inherit the Cities scroll gate');
    const content = page.querySelector('article').textContent;
    if (/Essay in progress|Still taking shape|Words by|Next in the notebook/.test(content)) throw new Error(`Extra article copy: ${slug}`);
    if (page.querySelectorAll('article a').length !== 1) throw new Error('Article must only have the return link');
    return { slug, status: response.status };
  }));
  return { status: 'PASS', articles: results };
})();

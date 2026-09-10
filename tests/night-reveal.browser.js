// Run on a fresh homepage: browse eval tests/night-reveal.browser.js
return (async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  await wait(800);
  const trigger = document.querySelector('header > div:first-child button[aria-label="Toggle navigation"]');
  const panel = document.getElementById(trigger.getAttribute('aria-controls'));
  const sky = panel.querySelector('[data-night-sky]');
  const stars = [...sky.querySelectorAll('span')];
  const before = stars.map(star => star.getBoundingClientRect().top);
  if (!sky || panel.getBoundingClientRect().height !== 24) throw new Error('Closed menu must retain its star hint');
  if (document.querySelector('header > div:first-child ul')) throw new Error('Contact must be hidden before opening');
  trigger.click();
  await wait(500);
  if (panel.querySelector('[data-night-sky]') !== sky) throw new Error('Sky must not remount');
  if (stars.some((star, i) => Math.abs(star.getBoundingClientRect().top - before[i]) > 1)) throw new Error('Stars must stay in place during reveal');
  await wait(1100);
  if (sky.getAnimations({ subtree: true }).length) throw new Error('Sky must not animate into place');
  if (!panel.querySelector('button[aria-label^="Copy email"]') || panel.inert) throw new Error('Opening must reveal the contact controls');
  panel.querySelector('button[aria-label="Toggle navigation"]').click();
  await wait(1600);
  if (panel.querySelector('[data-night-sky]') !== sky || panel.getBoundingClientRect().height !== 24 || !panel.inert) throw new Error('Closing must preserve and cover the sky');
  return { status: 'PASS', viewport: innerWidth, persistentSky: true, stationaryStars: true, hintHeight: 24 };
})();

// Run on a fresh homepage: browse eval tests/night-reveal.browser.js
return (async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  await wait(800);
  const trigger = document.querySelector('header > div:first-child button[aria-label="Toggle navigation"]');
  const panel = document.getElementById(trigger.getAttribute('aria-controls'));
  const sky = panel.querySelector('[data-night-sky]');
  const stars = [...sky.querySelectorAll('span')];
  const before = stars.map(star => star.getBoundingClientRect().top);
  const card = document.querySelector('[data-home-card]');
  if (!sky || panel.getBoundingClientRect().height !== 0) throw new Error('Closed menu must leave no strip above Home');
  if (card.getBoundingClientRect().top !== 0) throw new Error('Home must start at the top of the viewport');
  if (document.querySelector('header > div:first-child ul')) throw new Error('Contact must be hidden before opening');
  trigger.click();
  await wait(500);
  if (panel.querySelector('[data-night-sky]') !== sky) throw new Error('Sky must not remount');
  if (stars.some((star, i) => Math.abs(star.getBoundingClientRect().top - before[i]) > 1)) throw new Error('Stars must stay in place during reveal');
  await wait(1100);
  if (sky.getAnimations({ subtree: true }).length) throw new Error('Sky must not animate into place');
  if (!panel.querySelector('button[aria-label^="Copy email"]') || panel.inert) throw new Error('Opening must reveal the contact controls');
  if (parseFloat(getComputedStyle(card).borderTopLeftRadius) !== 96) throw new Error('Opening must round the top of the home card');
  if (Math.abs(card.getBoundingClientRect().top - panel.getBoundingClientRect().bottom) > 1) throw new Error('The card must sit directly beneath the article panel');
  if (!getComputedStyle(card.parentElement).backgroundImage.includes('rgb(16, 23, 45) 0px, rgb(16, 23, 45) 96px')) throw new Error('Top corners must reveal the night-sky color');
  panel.querySelector('button[aria-label="Toggle navigation"]').click();
  await wait(1600);
  if (panel.querySelector('[data-night-sky]') !== sky || panel.getBoundingClientRect().height !== 0 || !panel.inert) throw new Error('Closing must completely cover the sky');
  if (card.getBoundingClientRect().top !== 0 || parseFloat(getComputedStyle(card).borderTopLeftRadius) !== 0) throw new Error('Closing must restore the flush home edge');
  return { status: 'PASS', viewport: innerWidth, persistentSky: true, stationaryStars: true, hintHeight: 0 };
})();

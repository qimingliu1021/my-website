// Run on a loaded page: browse eval tests/contact.browser.js
return (async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  await wait(700);
  let header = document.querySelector('header > div:first-child');
  if (!header.querySelector('ul')) {
    const toggle = header.querySelector('button[aria-label="Toggle navigation"]');
    toggle.click();
    await wait(1600);
    header = document.getElementById(toggle.getAttribute('aria-controls'));
  }
  const links = [...header.querySelectorAll('ul a')].map(a => a.getAttribute('aria-label'));
  if (links.join(',') !== 'X,LinkedIn') throw new Error('Contact links must only be X and LinkedIn');
  const button = header.querySelector('button[aria-label="Copy email address qiming1021@outlook.com"]');
  button.focus();
  const tooltip = document.getElementById(button.getAttribute('aria-describedby'));
  if (getComputedStyle(tooltip).visibility !== 'visible' || !tooltip.textContent.includes('qiming1021@outlook.com')) throw new Error('Keyboard focus must reveal the email');
  let copiedSelection = null;
  const observeCopy = () => { copiedSelection = document.activeElement.value; };
  document.addEventListener('copy', observeCopy);
  button.click();
  await wait(400);
  document.removeEventListener('copy', observeCopy);
  if (header.querySelector('[role=status]').textContent !== 'Successfully copied!') throw new Error('Email copy did not succeed');
  if (copiedSelection !== null && copiedSelection !== 'qiming1021@outlook.com') throw new Error('Fallback copied the wrong text');
  if (document.activeElement !== button) throw new Error('Copy must preserve keyboard focus');
  const bounds = tooltip.getBoundingClientRect();
  if (bounds.left < 0 || bounds.right > innerWidth) throw new Error('Email tooltip exceeds viewport');
  return {status:'PASS',links,copyConfirmed:true,fallbackCopied:copiedSelection};
})();

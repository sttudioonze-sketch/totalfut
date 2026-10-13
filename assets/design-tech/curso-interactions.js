(() => {
  const hero = document.querySelector('.topo');
  const visual = document.querySelector('.topo__foto');
  if (!hero || !visual) return;
  const enabled = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  let frame = 0;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    for (const property of ['--hover-x', '--hover-y']) hero.style.removeProperty(property);
    for (const property of ['--tilt-x', '--tilt-y']) visual.style.removeProperty(property);
  }
  hero.addEventListener('pointermove', event => {
    if (!enabled.matches) return;
    const x = event.clientX, y = event.clientY;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const h = hero.getBoundingClientRect();
      hero.style.setProperty('--hover-x', `${x - h.left}px`);
      hero.style.setProperty('--hover-y', `${y - h.top}px`);
      const v = visual.getBoundingClientRect();
      const inside = x >= v.left && x <= v.right && y >= v.top && y <= v.bottom;
      visual.style.setProperty('--tilt-x', inside ? `${((.5 - (y - v.top) / v.height) * 2).toFixed(2)}deg` : '0deg');
      visual.style.setProperty('--tilt-y', inside ? `${(((x - v.left) / v.width - .5) * 2).toFixed(2)}deg` : '0deg');
      frame = 0;
    });
  }, {passive:true});
  hero.addEventListener('pointerleave', reset);
  enabled.addEventListener('change', reset);
})();

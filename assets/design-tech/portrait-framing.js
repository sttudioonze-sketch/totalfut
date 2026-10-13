// Enquadramento por imagem: rosto no eixo horizontal; peito/pescoço perto do centro vertical.
(() => {
  for (const image of document.querySelectorAll('img[data-focus-x]')) {
    const frame = image.parentElement;
    const focusX = Number(image.dataset.focusX);
    const focusY = Number(image.dataset.focusY);
    if (!frame || !(focusX > 0 && focusX < 1 && focusY > 0 && focusY < 1)) continue;
    function crop() {
      const w = frame.clientWidth, h = frame.clientHeight;
      const nw = image.naturalWidth, nh = image.naturalHeight;
      if (!w || !h || !nw || !nh) return;
      // Amplia só o necessário para centralizar o rosto sem expor bordas vazias.
      const zoom = Number(image.dataset.portraitZoom || 1);
      const scale = Math.max(w / nw, h / nh, w / (2 * Math.min(focusX, 1 - focusX) * nw)) * zoom;
      const iw = nw * scale, ih = nh * scale;
      const left = Math.min(0, Math.max(w - iw, w / 2 - iw * focusX));
      let top = Math.min(0, Math.max(h - ih, h * .52 - ih * focusY));
      const headY = Number(image.dataset.headY);
      if (image.dataset.headY) top = Math.min(0, Math.max(top, h * .035 - ih * headY));
      for (const [property, value] of Object.entries({'--portrait-width':iw,'--portrait-height':ih,'--portrait-left':left,'--portrait-top':top})) {
        image.style.setProperty(property, `${value.toFixed(2)}px`);
      }
    }
    image.addEventListener('load', crop);
    if (window.ResizeObserver) new ResizeObserver(crop).observe(frame);
    else window.addEventListener('resize', crop, {passive:true});
    crop();
  }
})();

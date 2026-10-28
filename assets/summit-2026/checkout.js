(() => {
  const checkout = 'https://pay.hotmart.com/J102509501A';
  document.querySelectorAll('[data-hotmart-open]').forEach(button => {
    button.addEventListener('click', () => {
      const widget = document.getElementById('hotmart-widget-trigger');
      if (widget) widget.click();
      else window.location.assign(checkout);
    });
  });
  document.querySelectorAll('[data-hotmart-direct]').forEach(button => {
    button.addEventListener('click', () => window.open(checkout, '_blank', 'noopener,noreferrer'));
  });
})();

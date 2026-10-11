/* Resolve a short invitation slug while keeping existing ?to= links working. */
(() => {
  const params = new URLSearchParams(location.search);
  const slug = (params.get('invite') || '').toLowerCase();
  const directory = window.WEDDING_GUESTS || {};
  const registered = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    ? Object.prototype.hasOwnProperty.call(directory, slug) && directory[slug]
    : '';
  const legacy = params.get('to') || '';
  const name = String(registered || legacy).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 60);
  window.WEDDING_GUEST = Object.freeze({ name, slug: registered ? slug : '' });
})();

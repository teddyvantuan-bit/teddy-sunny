/* Resolve published slugs and instant links for new names; keep ?to= links working. */
(() => {
  const params = new URLSearchParams(location.search);
  const slug = (params.get('invite') || '').toLowerCase();
  const directory = window.WEDDING_GUESTS || {};
  const registered = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    ? Object.prototype.hasOwnProperty.call(directory, slug) && directory[slug]
    : '';
  let instant = '';
  const encoded = params.get('n') || '';
  if (slug && /^[A-Za-z0-9_-]{1,256}$/.test(encoded)) {
    try {
      const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
      instant = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch (_) {}
  }
  const legacy = params.get('to') || '';
  const name = String(instant || registered || legacy).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 60);
  window.WEDDING_GUEST = Object.freeze({ name, slug: instant || registered ? slug : '' });
})();

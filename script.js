<script>
  const selector = document.getElementById('lang-select');

  // If user has already chosen a language, set the dropdown
  const saved = localStorage.getItem('lang');
  if (saved) {
    selector.value = saved;
  }

  selector.addEventListener('change', e => {
    const lang = e.target.value;          // 'en' | 'fr' | 'ar'
    localStorage.setItem('lang', lang);

    // Build new path, stripping any existing /xx/ prefix
    let path = window.location.pathname.replace(/^\/(en|fr|ar)\//, '/');
    // If root page, ensure no double slash
    if (path === '/') path = '/index.html';

    window.location.href = `/${lang}${path}`;
  });
</script>

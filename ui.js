/* Общий вид для страниц внутри Telegram: цвета берутся из темы Telegram пользователя. */
(function () {
  var T = window.Telegram && window.Telegram.WebApp;
  var root = document.documentElement;
  root.classList.add('ui');
  if (!T || !T.initData) return;
  var p = T.themeParams || {};
  function hexA(h, a) {
    h = String(h).replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function set(k, v) { if (v) root.style.setProperty(k, v); }
  set('--bg', p.secondary_bg_color || p.bg_color);
  set('--surface', p.section_bg_color || p.bg_color);
  set('--ink', p.text_color);
  set('--muted', p.hint_color || p.subtitle_text_color);
  set('--accent', p.button_color || p.link_color);
  set('--accent-ink', p.button_text_color);
  if (p.button_color) set('--accent-soft', hexA(p.button_color, 0.14));
  if (p.hint_color) set('--line', hexA(p.hint_color, 0.22));
  root.style.colorScheme = T.colorScheme === 'dark' ? 'dark' : 'light';
  root.classList.add('tg');
  try {
    if (p.secondary_bg_color) { T.setHeaderColor('secondary_bg_color'); T.setBackgroundColor('secondary_bg_color'); }
    if (T.setBottomBarColor && p.secondary_bg_color) T.setBottomBarColor('secondary_bg_color');
  } catch (e) {}
})();

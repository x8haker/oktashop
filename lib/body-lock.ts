// Счётчик блокировок скролла body: QuickView и мобильное меню Navbar
// независимо писали document.body.style.overflow — закрытие одного
// сбрасывало блокировку другого. Здесь блокировка снимается только
// когда открыто всё закрылось.
let depth = 0;

export function pushBodyLock() {
  if (depth === 0) document.body.style.overflow = "hidden";
  depth += 1;
}

export function popBodyLock() {
  depth = Math.max(0, depth - 1);
  if (depth === 0) document.body.style.overflow = "";
}

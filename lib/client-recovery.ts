// Восстановление после клиентских падений (см. app/error.tsx и
// app/global-error.tsx).
//
// Главный сценарий: вкладка открыта до деплоя — старый HTML ссылается на
// чанки /_next/static, которых на GitHub Pages уже нет. Любая навигация падает
// с «Failed to load dynamically imported module» и без перезагрузки такую
// страницу не спасти. Поэтому при похожей ошибке мы перезагружаемся один раз
// за сессию с cache-bust (HTML на GitHub Pages кэшируется до 10 минут).

const GUARD_KEY = "oktashop_auto_reload";

/** Понятно ли по тексту ошибки, что нужна свежая загрузка файлов сборки. */
export function isStaleAssetError(error: unknown): boolean {
  const msg =
    error instanceof Error
      ? `${error.message} ${(error as Error & { digest?: string }).digest ?? ""}`
      : String(error ?? "");
  return /chunk|dynamically imported module|importing the module|error loading dynamically|failed to fetch/i.test(
    msg,
  );
}

/** true — автоперезагрузка ещё не использовалась (защита от зацикливания).
 *  Помечает попытку, чтобы повторные падения показывали экран с кнопками. */
export function takeAutoReloadPermission(): boolean {
  try {
    if (sessionStorage.getItem(GUARD_KEY)) return false;
    sessionStorage.setItem(GUARD_KEY, String(Date.now()));
    return true;
  } catch {
    // приватный режим — без автоперезагрузки, только ручная кнопка
    return false;
  }
}

/** Сбрасывает предохранитель, когда приложение снова успешно загрузилось —
 *  иначе после первого восстановления самовосстановление перестанет работать. */
export function clearAutoReloadGuard(): void {
  try {
    sessionStorage.removeItem(GUARD_KEY);
  } catch {
    /* приватный режим */
  }
}

/** Текущая страница с cache-bust: заставляет GitHub Pages отдать свежий HTML,
 *  а не то, что лежит в кэше браузера. */
export function reloadUrl(): string {
  const sep = window.location.search ? "&" : "?";
  return `${window.location.pathname}${window.location.search}${sep}_r=${Date.now()}${window.location.hash}`;
}

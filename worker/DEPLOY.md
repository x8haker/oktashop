# Деплой Cloudflare Worker (заказы в Telegram)

Пошагово — аккаунт Cloudflare создаётся бесплатно, карта не нужна.

## 1. Регистрация

1. Открой <https://dash.cloudflare.com/sign-up>.
2. Email + пароль → Sign up (тариф **Free**).
3. На приветственном экране выбери **Workers & Pages** (можно пропустить онбординг).

## 2. Создание Worker

1. **Workers & Pages → Create → Create Worker**.
2. Имя: `oktashop-order` → **Deploy**.

## 3. Вставить код

1. На странице воркера нажми **Edit code** (справа сверху).
2. Удали всё в редакторе.
3. Вставь **целиком** содержимое файла `worker/order-worker.js` из этого репозитория.
4. **Deploy**.

## 4. Секреты (токен и chat_id)

**Workers & Pages → `oktashop-order` → Settings → Variables and Secrets → Add**.

Добавь три переменные:

| Имя | Тип | Значение |
|---|---|---|
| `TG_BOT_TOKEN` | Secret | токен бота «Тли» — открой `C:\Users\user\Desktop\parser\somon-deal-hunter\.env`, строка `TELEGRAM_BOT_TOKEN` (без кавычек) |
| `TG_CHAT_ID` | Secret | `8009176946` (тот же `.env`, строка `TELEGRAM_CHAT_ID`) |
| `ALLOWED_ORIGIN` | Text | `https://x8haker.github.io` |

> Токен и chat_id живут только в секретах Worker — в код сайта они не попадают.

Нажми **Deploy**.

## 5. Тест

Открой в браузере (подставь свой поддомен):

```
https://oktashop-order.<твоё-имя>.workers.dev/order
```

Должен вернуться JSON `{"ok":false,"error":"not found"}` — значит воркер жив.

Проверка отправкой заказа (в PowerShell):

```powershell
Invoke-RestMethod -Method Post -Uri "https://oktashop-order.<имя>.workers.dev/order" `
  -ContentType "application/json" `
  -Body '{"name":"Тест","phone":"+992 90 000 0000","city":"Душанбе","details":"тест","items":[{"name":"ХУДИ TEST","size":"M","qty":1,"price":550}],"subtotal":550,"text":"Тест заказа"}'
```

Ожидаемый результат: `{"ok":true}` и сообщение от «Тли» в Telegram.

## 6. Подключить к сайту

Скопируй URL вида `https://oktashop-order.<имя>.workers.dev/order` и скажи его мне —
я впишу его в `lib/config.ts: telegram.workerUrl`, запушу, и заказы с чекаута
начнут приходить в Telegram автоматически.

Пока `workerUrl` пуст — работает запасной режим (текст заказа на экране + кнопка
копирования), сайт полностью функционален.

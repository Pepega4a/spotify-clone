# 🎵 Spotify Clone

> ⚠️ **ПРОЕКТ АРХИВИРОВАН И НЕ ПОДДЕРЖИВАЕТСЯ**
> 
> Данный проект больше не разрабатывается и не обновляется.
> 
> **Важно:** Часть файлов проекта была безвозвратно утеряна и не попала в репозиторий. Восстановление полной функциональности невозможно.

---

## 📋 О проекте

Клон Spotify, созданный с использованием Next.js. Проект разрабатывался как полноценный музыкальный стриминговый сервис с планами дальнейшей монетизации.

### Технологический стек

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Язык:** TypeScript
- **Стилизация:** Tailwind CSS
- **База данных:** Supabase
- **Платежи:** Stripe
- **Аутентификация:** Supabase Auth
- **Шрифты:** [Geist](https://vercel.com/font) через next/font

---

## ⚠️ Статус проекта

**ПРОЕКТ ЗАМОРОЖЕН**

К сожалению, разработка проекта была прекращена по следующим причинам:

- Утеряны критически важные файлы, которые не были добавлены в систему контроля версий
- Отсутствует документация по утерянным компонентам
- Невозможно восстановить полную функциональность проекта

Репозиторий сохранён в архивных целях и как пример незавершённой работы.

---

## 🚀 Быстрый старт (для ознакомления)

> **Внимание:** Из-за утерянных файлов проект может работать некорректно или не запускаться вообще.

### Установка зависимостей

```bash
npm install
# или
yarn install
# или
pnpm install
```

### Запуск dev-сервера

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

---

## 📁 Структура проекта

```
spotify-clone/
├── actions/              # Серверные действия
│   ├── getLikedSongs.ts
│   ├── getSongs.ts
│   ├── getSongsByTitile.ts
│   └── getSongsByUserId.ts
├── app/                  # Next.js App Router
│   ├── (site)/          # Главная страница
│   ├── account/         # Страница аккаунта
│   ├── liked/           # Понравившиеся треки
│   ├── search/          # Поиск
│   ├── globals.css
│   └── layout.tsx
├── components/          # React компоненты
│   ├── AuthModal.tsx
│   ├── Header.tsx
│   ├── Library.tsx
│   ├── Player.tsx
│   ├── Sidebar.tsx
│   └── ... (другие компоненты)
├── hooks/               # Кастомные React хуки
│   ├── useAuthModal.ts
│   ├── usePlayer.ts
│   ├── useUser.tsx
│   └── ... (другие хуки)
├── libs/                # Библиотеки и утилиты
│   ├── helpers.ts
│   ├── stripe.ts
│   ├── stripeClient.ts
│   └── supabaseAdmin.ts
├── providers/           # Context провайдеры
│   ├── ModalProvider.tsx
│   ├── SupabaseProvider.tsx
│   ├── ToasterProvider.tsx
│   └── UserProvider.tsx
├── public/              # Статические файлы
│   ├── images/
│   └── logo.svg
├── types/               # TypeScript типы
│   ├── types_db.ts
│   └── types.ts
├── middleware.ts
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

> ⚠️ Некоторые файлы и директории отсутствуют из-за потери данных

---

## 👤 Автор

[@Pepega4a](https://github.com/Pepega4a)

---

<div align="center">
  
**Проект заархивирован • Последнее обновление: 2025**

</div>

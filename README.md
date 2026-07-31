# gooru — Portfolio

Публічний сайт: **https://gooru-lab.github.io/portfolio/**

Репо: https://github.com/gooru-lab/portfolio

## Локально

```powershell
cd "c:\work ambar and other\portfolio"
python -m http.server 8080
```

http://localhost:8080

## Мови

На головній: **UA · EN · DE · PL · SK** (кнопки в шапці). Вибір зберігається в `localStorage`, також працює `?lang=uk|en|de|pl|sk`.

`index-en.html` редіректить на `index.html?lang=en`.

## Теми

Кнопка **Світла / Темна** (Light / Dark) у шапці. Вибір зберігається в `localStorage`.

## Hero

Split-layout: текст зліва, справа легкий CSS 3D-куб (`hero-cube.js`) з гранями контуру.
Без Three.js — швидко на телефоні й ПК.


## Шрифти

- Display: **Sora**
- Body: **Literata**

## Деплой

Push у `main` → GitHub Pages (branch `main`, root).

## Design system

Visual language adapted from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) linear.app tokens → gooru amber accent. See DESIGN.md.

# Serhiy Petrenko — Portfolio

Статичне портфоліо (UA / EN) для Freelancehunt, заявок і LinkedIn.

## Локально

Відкрий `index.html` у браузері або:

```powershell
cd "c:\work ambar and other\portfolio"
python -m http.server 8080
```

Далі: http://localhost:8080

## Публікація на GitHub Pages

Потрібен логін: `gh auth login`

```powershell
cd "c:\work ambar and other\portfolio"
git init
git add index.html index-en.html styles.css README.md portfolio.pdf portfolio-en.pdf loyalty payroll bi cloud corporate-site
git commit -m "Add public portfolio site"
gh repo create serhiy-petrenko-portfolio --public --source=. --remote=origin --push
```

У репо: **Settings → Pages → Deploy from branch `main` / root**.

URL буде приблизно:
`https://<username>.github.io/serhiy-petrenko-portfolio/`

Після публікації додай URL у Notion Personal OS і в заявки.

## PDF

Наявні: `portfolio.pdf`, `portfolio-en.pdf`.  
Перегенерація: `python create_pdf.py` (потрібні шрифти в `../fonts/`).

## NDA

Скріни sanitized. Не викладати auth-URL і секрети.

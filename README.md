# FizioKid – Klinički Web Template

> Soft UI / Bento Grid / High Accessibility  
> Stack: HTML5 + Tailwind CSS (Play CDN) + Vanilla JS

---

## 📁 Struktura projekta

```
klinika/
├── index.html          ← Glavni fajl (sve sekcije)
├── css/
│   └── styles.css      ← Vlastiti CSS (navbar, reveal, accordion, slider...)
├── js/
│   └── main.js         ← Sva JS logika (bez biblioteka)
├── assets/
│   ├── images/         ← Ovde ubacite vaše slike
│   │   ├── hero-main.jpg        (preporučeno: 600×420px)
│   │   ├── about-team-1.jpg     (preporučeno: 300×370px)
│   │   ├── about-team-2.jpg     (preporučeno: 300×370px)
│   │   └── og-image.jpg         (preporučeno: 1200×630px)
│   └── icons/          ← SVG ikone (opciono)
└── README.md
```

---

## 🚀 Kako pokrenuti lokalno

```bash
# Otvorite index.html direktno u browser-u
# ILI pokrenite live server u VS Code (preporučeno):

# 1. Instalirajte ekstenziju "Live Server" u VS Code
# 2. Desni klik na index.html → "Open with Live Server"
```

---

## ✏️ Editovanje sadržaja

Svaki element koji treba zameniti označen je komentarom iznad njega:

```html
<!-- [EDITABLE: NAZIV] - Uputstvo -->
```

### Najvažniji editable elementi:

| Komentar                        | Šta menjati                                              |
| ------------------------------- | -------------------------------------------------------- |
| `[EDITABLE: COLOR_PALETTE]`     | Glavne boje u Tailwind config-u (index.html, `<script>`) |
| `[EDITABLE: META_TITLE]`        | Naziv klinike i SEO opis                                 |
| `[EDITABLE: JSON-LD]`           | Adresa, telefon, radno vreme (LocalBusiness Schema)      |
| `[EDITABLE: LOGO]`              | Logo tekst ili `<img>` tag                               |
| `[EDITABLE: HERO_TITLE]`        | Glavni H1 naslov                                         |
| `[EDITABLE: HERO_IMAGE]`        | Putanja do hero slike                                    |
| `[EDITABLE: SERVICE_CARD]`      | Naziv i opis svake usluge                                |
| `[EDITABLE: TESTIMONIALS]`      | Iskustva roditelja (tekst, ime, uloga)                   |
| `[EDITABLE: FAQ_*]`             | Pitanja i odgovori                                       |
| `[EDITABLE: MAP_IFRAME]`        | Google Maps embed src URL                                |
| `[EDITABLE: CONTACT_*]`         | Telefon, email, adresa                                   |
| `[EDITABLE: FORM_SUBMIT_LOGIC]` | Formspree / Netlify / vlastiti backend                   |
| `[EDITABLE: SOCIAL_LINKS]`      | Facebook, Instagram, YouTube URL                         |

---

## 🗺️ Google Maps embed

1. Idite na [maps.google.com](https://maps.google.com)
2. Nađite vašu lokaciju → kliknite ••• → **Podeli** → **Ugradi kartu**
3. Kopirajte `src=` URL iz iframe koda
4. Zalepite ga u `index.html` na mestu `[EDITABLE: MAP_IFRAME]`

---

## 📬 Kontakt forma — opcije slanja

### Opcija A: Formspree (najlakše, besplatno)

```html
<form action="https://formspree.io/f/VAŠ_FORM_ID" method="POST"></form>
```

Registrujte se na [formspree.io](https://formspree.io), kreirajte formu, kopirajte ID.

### Opcija B: Netlify Forms (ako deployujete na Netlify)

```html
<form data-netlify="true" name="kontakt" method="POST"></form>
```

Netlify automatski prikuplja popunjene forme.

### Opcija C: Vlastiti backend

Zamenite simulaciju u `js/main.js` → sekcija `[EDITABLE: FORM_SUBMIT_LOGIC]`

---

## 🎨 Menjanje boja

Sve boje su definisane u Tailwind konfiguraciji u `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#5B9BD5', ... },  // Plava
        secondary: { DEFAULT: '#7EC8C8', ... },  // Teal
        mint:      { DEFAULT: '#9DD9C5', ... },  // Mint zelena
        cream:     { DEFAULT: '#FAFAF7', ... },  // Krem bela
      }
    }
  }
}
```

---

## 🔤 Menjanje fonta

U `<head>` delu `index.html`:

```html
<!-- Promenite "Quicksand" u željeni Google Font -->
<link
  href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

I u Tailwind config:

```javascript
fontFamily: {
  sans: ['Quicksand', 'sans-serif'],  // ← promenite ovde
}
```

---

## 📦 Produkcija — Tailwind CLI (opcija)

```bash
# Instalirajte Tailwind CLI
npm install -D tailwindcss

# Inicijalizujte config
npx tailwindcss init

# Buildujte optimizovani CSS
npx tailwindcss -i ./css/input.css -o ./css/output.min.css --minify --watch
```

Zatim u `index.html` zamenite Play CDN `<script>` sa:

```html
<link rel="stylesheet" href="css/output.min.css" />
```

---

## ♿ Pristupačnost (WCAG AA)

- Svi interaktivni elementi imaju `focus-visible` stilove
- Slike imaju opisne `alt` tekstove (dodajte vaše opise!)
- Slider ima `aria-live`, `aria-label`, `aria-expanded`
- FAQ accordion pravilno menja `aria-expanded`
- `prefers-reduced-motion` isključuje sve animacije
- Kontrast boja: plava #5B9BD5 na beloj = 3.1:1 (AA za large text)

---

## 📊 SEO checklist

- [x] Jedinstven `<h1>` na stranici
- [x] Semantičke HTML5 oznake (`<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`)
- [x] LocalBusiness JSON-LD Schema
- [x] Open Graph meta tagovi
- [x] `alt` atributi na svim slikama
- [x] `lang="sr"` na `<html>`
- [ ] **Popuniti**: sve `[EDITABLE: JSON-LD]` podatke
- [ ] **Popuniti**: `og:url` sa pravim URL-om
- [ ] **Dodati**: canonicalization ako ima više URL-ova

---

## 🌿 Git branching predlog

```
main          ← produkcija
develop       ← razvoj
feature/hero-redesign
feature/new-service-cards
fix/mobile-slider
```

---

_Template verzija: 1.0 | Kompatibilnost: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+_

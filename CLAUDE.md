# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

AFRO-AFRO is the website for a modeling/talent agency. It is a **static multi-page site** (plain HTML + Bootstrap 5 + jQuery) backed by **Firebase** (Firestore, Auth, Storage) loaded entirely via the CDN compat SDK (v8). There is no build step and no framework — the HTML files are served as-is. The site UI and codebase are in French.

## Commands

```bash
# Local dev server (live reload) — serves the repo root
npx live-server

# Deploy to Firebase Hosting (public dir is the repo root ".")
firebase deploy
```

There are no tests, lint, or build steps. `npm test` is a placeholder that errors.

## Architecture

### Pages
- `index.html` — home (carousel, about, services, casting banner, testimonials)
- `about.html`, `service.html`, `model.html` (8 mannequins), `collaboration.html` (contact info + two public forms)
- `admin.html` — single-page admin dashboard, gated to one admin email
- `404.html`

### Firebase wiring (load order matters)
Every page loads the Firebase compat SDK **then** `js/firebase-config.js` **before** any other site script:
```
firebase-app.js → firebase-auth.js → firebase-firestore.js → firebase-storage.js
→ js/firebase-config.js   (initializes app; exposes globals `db`, `auth`, `ADMIN_EMAIL`)
→ js/auth-modal.js        (header login modal on public pages)
→ js/site-dynamic.js      (applies Firestore customization to the page)
→ js/main.js              (template animations/carousels)
```
`db`, `auth`, and `ADMIN_EMAIL` are **globals** defined in `js/firebase-config.js`. Other scripts depend on them existing and guard with `typeof db === "undefined"` checks.

### Auth model
- Single hardcoded admin: `ADMIN_EMAIL` in [js/firebase-config.js](js/firebase-config.js). Only this email may reach the dashboard.
- `js/auth-modal.js` drives the public-page login modal; on success it redirects to `admin.html`.
- `admin.html` re-checks `user.email === ADMIN_EMAIL` in `onAuthStateChanged` and signs out anyone else. This is **client-side only** — real protection must come from Firestore/Storage security rules.

### Firestore collections
- `site_config/main` — the single document holding all site customization (texts, image URLs, section visibility flags like `show_about`). Written by the admin "personnalisation" panel; read by `js/site-dynamic.js`.
- `model_requests` — "Devenir une Modèle" form submissions (from `collaboration.html`)
- `collaboration_requests` — "Faire une collaboration" form submissions
- `contacts` — admin-managed contacts
- `campagnes` — admin-managed campaign people

`js/site-dynamic.js` reads `site_config/main` and patches DOM nodes by `id`/selector. If the doc is missing or the read fails, the page silently keeps its static default content. **When editing a page's customizable sections, keep the element ids/selectors in sync with the keys this script looks for** (e.g. `#section-about`, `#svc1`..`#svc4`, `#model1`..`#model8`, `data-dot` for testimonials).

### Image uploads
Admin uploads go to Firebase **Storage** under `site-images/`; the resulting download URL is stored as a string field in `site_config/main`.

## Conventions
- Vanilla JS in IIFEs with `"use strict"`; compat-SDK namespaced API (`firebase.firestore()`, `db.collection(...).add(...)`), not the modular v9 API.
- Comments, labels, and user-facing strings are in French — match this when adding code.
- The two Firebase projects appearing in `Afro-Afro.txt` are scratch notes; the live config is `afro-afro` (see `.firebaserc` and `js/firebase-config.js`).

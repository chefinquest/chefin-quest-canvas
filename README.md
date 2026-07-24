# Chefin Quest Canvas

An infinite, tactile idea playground built with React and the [tldraw SDK](https://tldraw.dev/).

The starter constellation turns a blank whiteboard into a playful creative ritual:

1. **Find the signal** — collect sparks and questions.
2. **Enter the forge** — prototype the strange version first.
3. **Launch small** — let another human touch it.

Use **Summon a Quest** to generate creative constraints, then draw, connect, annotate, rearrange, and extend the map with tldraw's native tools. The canvas persists locally in your browser.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm test
npm run lint
npm run build
```

## Stack

- React + TypeScript + Vite
- tldraw SDK 5
- Vitest

## Deployment and tldraw licensing

tldraw permits SDK use in development by default, but a production deployment requires a valid trial, hobby, or commercial license key. This repository intentionally does not include a key. Request a hobby license for a non-commercial public deployment, then pass its public key to the `<Tldraw licenseKey="..." />` component before deploying.

> The application code in this repository is MIT-licensed. The tldraw dependency remains covered by [tldraw's own license](https://tldraw.dev/community/license).

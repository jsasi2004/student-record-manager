# Student Record Manager

## Overview
Simple Node.js + Express app for managing student records with CRUD, validation, and CI/CD.

## Run locally
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

## Tests & Lint
- `npm test`
- `npm run lint`

## CI/CD
This repo includes GitHub Actions workflows:
- `ci.yml` — runs lint, tests, Snyk, and deploys to Render
- `codeql.yml` — runs CodeQL analysis

## Deployment
I used **Render**. Configure `RENDER_SERVICE_ID` and `RENDER_API_KEY` as GitHub secrets.

## Report
Attach the IEEE style report with screenshots and pipeline details.

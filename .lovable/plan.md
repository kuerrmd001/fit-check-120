# Fit Check — Build Plan

A mobile-first Thai-language self-assessment prototype for exercise-related lower back pain. Frontend-only, localStorage for state. No real auth, no medical diagnosis, no backend.

## Scope confirmation
- Prototype only: no Lovable Cloud, no real login/payments/emergency integrations
- Thai UI throughout; legal/safety wording exactly as specified (preliminary, red flag, not diagnosis)
- MVP pain area = lower back only; others shown as "เร็วๆ นี้"

## Design system (src/styles.css `@theme`)
- Background: white `#FFFFFF`
- Primary: teal/green (`oklch` ~ #14B8A6 / mint accents); success/green for low-risk
- Navy text `#0F172A`; muted slate for secondary
- Warning yellow, danger red for medium/high risk
- Rounded cards (`rounded-2xl`), soft shadows (token `--shadow-card`)
- iOS-style status bar mock at top, safe-area padding
- Bottom nav: 5 tabs (ประเมิน, ฟื้นฟู, คู่มือ, บันทึก, เพิ่มเติม)
- Font: Noto Sans Thai (loaded via `<link>` in `__root.tsx`)

## Reusable components (`src/components/`)
AppHeader, StatusBar, BottomNavigation, ProgressSteps, Card, Button, RiskBadge, RiskGauge, QuestionCard, OptionButton, AlertBox, EmptyState, SectionTitle

## Routing (TanStack Start, `src/routes/`)
Pre-app flow (no bottom nav):
- `index.tsx` → Splash → auto-redirect to `/disclaimer` (or `/home` if consented)
- `disclaimer.tsx`, `login.tsx`, `signup.tsx`, `forgot-password.tsx`

Main app (layout route `_app.tsx` renders BottomNav + Outlet):
- `_app.home.tsx` — dashboard
- `_app.assess.*` — assess intake, pain-location, safety-check, red-flag, activity-select, questions/running, questions/weights, questions/unsure, processing, result/$id, care-plan/$id, follow-up/$id
- `_app.recover.*` — recovery plan list, activity-detail/$id, session/$id, summary/$id
- `_app.guide.*` — categories, article/$id, saved, search
- `_app.history.*` — list (with filters), detail/$id, progress, insights
- `_app.more.*` — menu, profile, settings, privacy, references, support, faq, notifications, delete-account

Error/empty states: `__root.tsx` notFoundComponent + per-route empty states; offline banner component.

## Assessment engine (`src/lib/assessment/`)
- `types.ts` — Answer, Question, RiskLevel, AssessmentRecord
- `redFlags.ts` — 5 safety check questions; any "มี" or "ไม่แน่ใจ" on serious items → forced Red
- `questions.ts` — running, weights, unsure question banks (Thai)
- `scoring.ts` — pure function implementing the point rules:
  - pain 0–2/3–4/5–6/7–10 → 0/1/2/3
  - activity impact 0–3, daily life impact 0–3, rest response 0–3
  - load-increase adds caution; many "ไม่แน่ใจ" prevents Green
  - Thresholds → Green / Yellow / Red; red-flag override always wins
- `storage.ts` — localStorage CRUD for assessments, follow-ups, saved articles, profile, settings, consent

## Content (`src/content/`)
- `articles.ts` — seed guide articles incl. "กลับไปวิ่งอย่างไรไม่ให้ปวดหลังซ้ำ" with sections (หลักการ, run-walk, สัญญาณให้หยุด, เคล็ดลับ, feedback)
- `carePlans.ts` — Green/Yellow/Red plan templates + warning signs + disclaimer
- `disclaimer.ts` — required disclaimer string and PDPA notice

## Result screens
- Green "ความเสี่ยงระดับต่ำ" — basic self-care, reduce intensity, reassess 24–48h; no "ปลอดภัยแน่นอน"
- Yellow "ความเสี่ยงระดับปานกลาง" — rest, avoid triggers, see pro if no improvement in 3–5 days
- Red "ความเสี่ยงระดับสูง" — stop exercise, contact pro; no prominent return-to-exercise CTA
- RiskGauge visualization + Care Plan link + Follow-up reminder

## History & progress
Filters: risk color, activity, date range, trend (ดีขึ้น/เท่าเดิม/แย่ลง). Progress dashboard shows pain trend chart (simple SVG, no chart lib) + insights derived from stored records.

## Mock data
Seed 3–5 sample assessments, saved articles, notifications, profile on first run so screens aren't empty.

## Out of scope (prototype)
- Real auth (login/signup just set a localStorage flag; Guest Mode supported)
- Real backend, real notifications, real emergency dialer (buttons show info modal)
- No diagnosis, no treatment claims

## Deliverable
All ~42 screens navigable, Thai copy, scoring engine working end-to-end from assessment → result → care plan → follow-up → history.

Ready to build on approval.
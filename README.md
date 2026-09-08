# KirokuFlow Website

KirokuFlow｜紀錄流 official website prototype.

This site is built with Next.js App Router and supports `zh-TW` and `ja-JP` routes.

## Local Development

```bash
pnpm install
pnpm dev
```

Open:

- `http://localhost:3000/zh-TW`
- `http://localhost:3000/ja-JP`

## Environment

Stripe checkout is prepared but optional during the first phase.

```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_MEETING_URL=
```

`NEXT_PUBLIC_MEETING_URL` is intentionally optional. When it is blank, the Japanese 「日中字幕」 and Traditional Chinese 「中日字幕」 navigation entry is not rendered. Set it to the confirmed HTTPS meeting service URL only after Render deployment and a real microphone meeting test pass.

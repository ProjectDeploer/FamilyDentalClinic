# Family Dental Clinic — By Dr Bushra

A production-oriented Next.js website for a premium family dental clinic. It includes public treatment pages, responsive appointment and contact flows, moderated reviews, a protected admin area, PostgreSQL persistence, and Meta WhatsApp Cloud API automation.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- PostgreSQL with Prisma ORM
- React Hook Form and Zod
- Meta WhatsApp Cloud API
- Signed, HTTP-only admin sessions

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in clinic details, database credentials, admin secrets, and (optionally) Meta WhatsApp credentials.

3. Generate an admin password hash:

   ```bash
   node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" 'replace-with-a-strong-password'
   ```

   Put the output in `ADMIN_PASSWORD_HASH`. Generate `ADMIN_SESSION_SECRET` with at least 32 random characters, for example `openssl rand -base64 48`.

4. Create the PostgreSQL database and run the committed migration:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

## Business information and photography

Clinic details live in `config/clinic.ts` and are overridden with the public environment variables in `.env.example`. No live clinic address, number, qualifications, or map location was invented.

Replace the doctor placeholder by adding Dr Bushra’s real WebP portrait at:

```text
public/images/team/dr-bushra.webp
```

The component falls back gracefully until that file exists. Generated editorial imagery is stored locally under `public/images` and optimized at runtime by Next Image.

## WhatsApp Cloud API

Create and approve four utility templates in WhatsApp Manager. Their names are configurable through the four `WHATSAPP_APPOINTMENT_*_TEMPLATE` variables. Each template receives five body parameters in this order:

1. Patient name
2. Appointment reference
3. Service
4. Date
5. Time

Configure the Meta callback as:

```text
GET/POST https://your-domain.example/api/whatsapp/webhook
```

Use the same verification token as `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, subscribe to `messages` and message-status events, and set `META_APP_SECRET` so POST signatures can be verified.

Only `CLINIC_ADMIN_WHATSAPP_NUMBER` may issue commands:

```text
CONFIRM FDC-8K3P2Q
CANCEL FDC-8K3P2Q
RESCHEDULE FDC-8K3P2Q 25-08-2026 05:30 PM
```

Appointments are committed as `PENDING` before notifications are attempted. WhatsApp requests use bounded retries, failures are logged without dropping the appointment, webhook events are de-duplicated, and status updates are idempotent.

## Deployment notes

- Run `npx prisma migrate deploy` during release.
- Use a pooled PostgreSQL connection suitable for serverless environments when deploying there.
- Use a durable distributed rate limiter (for example Redis/KV) on horizontally scaled deployments. The built-in limiter is a safe single-instance baseline.
- Keep all non-`NEXT_PUBLIC_` secrets server-side.
- Review the privacy/terms copy with local counsel before launch.
- Replace placeholder business details and clinical qualifications only with verified information.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

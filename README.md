# FlowCut Silence Remover

React/Vite landing page for FrameLabs FlowCut, including the hero, interactive waveform simulator, feature sections, batch-processing demo, pricing card, and footer.

## Run Locally

**Prerequisite:** Node.js

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open `http://localhost:3000`

Useful checks:

- `npm run build`
- `npm run lint`
## Contact Form Backend

The public contact form submits to the Supabase Edge Function in
`supabase/functions/contact-form`. The function stores each valid submission in
the private `contact_submissions` table and sends an email notification through
Resend.

Before deploying:

1. Verify a Resend sending domain, preferably `mail.theframelabs.com`.
2. In Supabase Dashboard, add the following Edge Function secrets. Use the
   dashboard rather than placing the Resend API key in your terminal history:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=oleksandr.nikitin24@gmail.com
CONTACT_FROM_EMAIL=FrameLabs <support@mail.theframelabs.com>
```

3. Apply the database migration and deploy the function:

```bash
npx supabase link --project-ref jbxrquaajgkewgeqoono
npx supabase db push
npx supabase functions deploy contact-form --no-verify-jwt
```

Never commit the Resend API key or Supabase secret keys to this repository.

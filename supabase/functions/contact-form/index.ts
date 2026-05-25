import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://www.theframelabs.com",
  "https://theframelabs.com",
  "http://127.0.0.1:4173",
  "http://localhost:4173",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
]);

const subjects = new Set([
  "Technical Support",
  "Billing & Account",
  "Privacy Request",
  "Partnership Inquiry",
  "Other",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

function corsHeaders(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin)
    ? origin
    : "https://www.theframelabs.com";

  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
    Vary: "Origin",
  };
}

function json(body: Record<string, unknown>, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, origin);
  }

  if (origin && !allowedOrigins.has(origin)) {
    return json({ error: "Origin not allowed." }, 403, origin);
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400, origin);
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true }, 200, origin);
  }

  if (
    typeof body.startedAt !== "number" ||
    Date.now() - body.startedAt < 1200 ||
    Date.now() - body.startedAt > 86_400_000
  ) {
    return json({ error: "Please reload the form and try again." }, 400, origin);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 120) {
    return json({ error: "Enter your name." }, 400, origin);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json({ error: "Enter a valid email address." }, 400, origin);
  }
  if (!subjects.has(subject)) {
    return json({ error: "Select a valid subject." }, 400, origin);
  }
  if (message.length < 10 || message.length > 4000) {
    return json({ error: "Your message must be between 10 and 4000 characters." }, 400, origin);
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const toEmail = Deno.env.get("CONTACT_TO_EMAIL");
  const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!resendKey || !toEmail || !fromEmail || !supabaseUrl || !serviceRoleKey) {
    console.error("Contact form environment is incomplete.");
    return json({ error: "Contact form is temporarily unavailable." }, 503, origin);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: submission, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({ name, email, subject, message })
    .select("id")
    .single();

  if (insertError || !submission) {
    console.error("Unable to create contact submission.", insertError);
    return json({ error: "Unable to submit your message right now." }, 500, origin);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `contact-${submission.id}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[FrameLabs Contact] ${subject}`,
      html: `
        <h2>New FrameLabs inquiry</h2>
        <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p>${safeMessage}</p>
        <hr />
        <p style="color:#666;font-size:12px">Submission ID: ${submission.id}</p>
      `,
      text: `New FrameLabs inquiry\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}\n\nSubmission ID: ${submission.id}`,
    }),
  });

  const resendResult = await emailResponse.json();

  if (!emailResponse.ok) {
    console.error("Resend delivery failed.", resendResult);
    await supabase
      .from("contact_submissions")
      .update({
        delivery_status: "failed",
        delivery_error: "Email delivery failed.",
      })
      .eq("id", submission.id);
    return json({ error: "Unable to send your message right now." }, 502, origin);
  }

  await supabase
    .from("contact_submissions")
    .update({
      delivery_status: "delivered",
      resend_message_id: resendResult.id,
    })
    .eq("id", submission.id);

  return json({ ok: true }, 200, origin);
});

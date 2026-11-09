
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import PublicPage from "./PublicPage";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    window.location.href = `mailto:contact@codeguardianai.example?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <PublicPage
      eyebrow="Contact"
      title="Let's talk about secure code reviews."
      description="Send a question, share feedback or discuss the CodeGuardian AI project."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
          <Mail className="text-cyan-400" size={28} />
          <h2 className="mt-5 text-xl font-semibold">Get in touch</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            This contact form opens your email application. Replace the example email address in the code with your real project contact address before publishing.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-800 bg-[#111B2E] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Your name"
              className="rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="Email address"
              className="rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            name="subject"
            value={form.subject}
            onChange={update}
            className="w-full rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm text-slate-300 outline-none"
          >
            <option>General enquiry</option>
            <option>Project feedback</option>
            <option>Technical question</option>
            <option>Collaboration</option>
          </select>

          <textarea
            required
            rows={6}
            name="message"
            value={form.message}
            onChange={update}
            placeholder="Write your message..."
            className="w-full resize-y rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500">
            <Send size={16} />
            Open email
          </button>

          {submitted && (
            <p className="text-sm text-emerald-400">
              Your email application should open with the message prepared.
            </p>
          )}
        </form>
      </div>
    </PublicPage>
  );
}

export default Contact;

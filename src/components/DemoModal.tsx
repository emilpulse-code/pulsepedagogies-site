import { X, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

// Replace with your key from web3forms.com
const WEB3FORMS_KEY = '32c86377-fb57-4110-a513-67fd523cf413';

/* The copy defaults below are what this modal said when it was only ever
   opened from /company and the landing page — a general "tell us what's on
   your mind" form. A product page needs to ask a narrower question and needs
   the mail to arrive labelled, so each piece of copy is overridable and every
   override defaults to the original string. No existing caller changes. */
interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Modal heading. */
  heading?: string;
  /** The line under the heading. */
  blurb?: string;
  /** Subject tag, e.g. "Signet" → "Signet Inquiry — Name, District". */
  subject?: string;
  messagePlaceholder?: string;
}

export function DemoModal({
  isOpen,
  onClose,
  heading = 'Start the Conversation',
  blurb = "A project, a demo, or the investment opportunity — tell us what's on your mind and we'll reach out shortly.",
  subject = 'Pulse Pedagogies',
  messagePlaceholder = 'Tell us about your school, district, project, or investment interest...',
}: DemoModalProps) {
  const [form, setForm] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${subject} Inquiry — ${form.name}${form.school ? `, ${form.school}` : ''}`,
          name: form.name,
          email: form.email,
          'School / District': form.school || 'Not provided',
          'Phone': form.phone || 'Not provided',
          message: form.message,
        }),
      });
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setStatus('idle');
    setForm({ name: '', school: '', email: '', phone: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm" onClick={handleClose} />
      {/* `text-brand-ink` is load-bearing, not decoration. Nothing in here set a
          text colour until October 2026, so the heading and the typed input
          text inherited whatever the opening page used. That was invisibly
          fine while the only callers were /company and the landing page, which
          are dark-on-light — and broke the moment this opened inside
          `PageShell`, which is light-on-dark: cream heading on a cream panel,
          and cream text typed into white boxes. A modal should not read its
          colours off the page behind it. */}
      <div className="relative bg-brand-paper text-brand-ink rounded-[40px] p-10 w-full max-w-lg shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-ink/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle className="w-16 h-16 text-brand-orange mb-6" />
            <h3 className="text-3xl font-serif mb-3">You're on our radar.</h3>
            <p className="text-brand-ink/50 text-sm mb-8 max-w-xs">
              We received your message and will be in touch shortly.
            </p>
            <button
              onClick={handleClose}
              className="bg-brand-ink text-brand-paper px-8 py-3 rounded-full font-medium hover:bg-brand-orange transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-serif mb-2">{heading}</h3>
            <p className="text-brand-ink/50 text-sm mb-8">{blurb}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 block mb-2">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    placeholder="you@school.edu"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 block mb-2">
                  Organization / District
                </label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
                  placeholder="Your school, district, or county office"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 block mb-2">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
                  placeholder="(optional)"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm resize-none"
                  placeholder={messagePlaceholder}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again or email us directly at emil@pulsepedagogies.com.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-ink text-brand-paper py-4 rounded-2xl font-medium hover:bg-brand-orange transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

import { X, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

// Replace with your key from web3forms.com
const WEB3FORMS_KEY = '32c86377-fb57-4110-a513-67fd523cf413';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [form, setForm] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Demo Request — ${form.name}${form.school ? `, ${form.school}` : ''}`,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className="relative bg-brand-paper rounded-[40px] p-10 w-full max-w-lg shadow-2xl">
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
              We received your request and will be in touch shortly to schedule your live walkthrough.
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
            <h3 className="text-3xl font-serif mb-2">Request a Live Demo</h3>
            <p className="text-brand-ink/50 text-sm mb-8">
              Fill in the details below — we'll reach out to schedule a live walkthrough.
            </p>

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
                  School / District
                </label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
                  placeholder="e.g. Glendale Unified School District"
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
                  placeholder="Tell us about your school or district and what you're looking for..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again or email us directly at emil@vapapulse.com.
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
                    Send Demo Request
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

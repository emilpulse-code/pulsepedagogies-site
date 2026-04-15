import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demo Request — ${form.name}, ${form.school}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nSchool / District: ${form.school}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\n\nMessage:\n${form.message || 'No message provided.'}`
    );
    window.location.href = `mailto:coo@vapapulse.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-paper rounded-[40px] p-10 w-full max-w-lg shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-ink/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

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
              School / District *
            </label>
            <input
              name="school"
              required
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
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-brand-ink/10 bg-white focus:outline-none focus:border-brand-orange transition-colors text-sm resize-none"
              placeholder="Tell us about your school or district and what you're looking for..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-ink text-brand-paper py-4 rounded-2xl font-medium hover:bg-brand-orange transition-all flex items-center justify-center gap-2"
          >
            Send Demo Request
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] text-brand-ink/30 text-center">
            This opens your email client pre-filled and sends to coo@vapapulse.com
          </p>
        </form>
      </div>
    </div>
  );
}

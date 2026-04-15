import { X } from 'lucide-react';

export type LegalDoc = 'privacy' | 'terms' | 'coppa' | null;

interface LegalModalProps {
  doc: LegalDoc;
  onClose: () => void;
}

const EFFECTIVE_DATE = 'April 14, 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-brand-ink mb-3">{title}</h3>
      <div className="text-brand-ink/70 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

const DOCS: Record<NonNullable<LegalDoc>, { title: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="text-brand-ink/50 text-xs mb-8">Effective Date: {EFFECTIVE_DATE}</p>

        <Section title="Who We Are">
          <p>Pulse Pedagogies, LLC ("Pulse Pedagogies," "we," "our," or "us") is a K–12 education technology company based in Glendale, California. This Privacy Policy describes how we collect, use, and protect information gathered through our marketing website at pulsepedagogies.com (the "Site").</p>
          <p>This policy applies to the marketing Site only. Our product applications (including VAPA Pulse) are governed by separate product-level privacy agreements provided to districts and schools at the time of engagement.</p>
        </Section>

        <Section title="Information We Collect">
          <p><strong>Information you provide voluntarily.</strong> The only personal information we collect on this Site is what you submit through our demo request form: your name, email address, school or district (optional), phone number (optional), and a message. We do not collect any information passively through cookies, analytics pixels, or tracking technologies.</p>
          <p><strong>Information we do not collect.</strong> We do not collect payment information, create user accounts, or store any information beyond what is submitted through the demo request form.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information you submit solely to respond to your demo request, answer your questions, and schedule a live walkthrough of our products. We do not sell, rent, or share your information with any third party for marketing purposes.</p>
        </Section>

        <Section title="Third-Party Services">
          <p><strong>Web3Forms.</strong> Our demo request form is processed by Web3Forms (web3forms.com), a form submission service. When you submit a form, your data is transmitted to Web3Forms servers and forwarded to our team. Web3Forms does not retain your data beyond transmission. Please review Web3Forms' privacy policy at web3forms.com for details.</p>
          <p><strong>Cloudflare.</strong> This Site is hosted on Cloudflare Pages and uses Cloudflare Stream to deliver video content. Cloudflare may process standard server log data (IP addresses, browser type, referring URLs) as part of normal CDN and hosting operations. Please review Cloudflare's privacy policy at cloudflare.com for details.</p>
          <p>We do not use Google Analytics, Meta Pixel, or any other behavioral tracking tools on this Site.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>This marketing Site is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child under 13 has submitted information through this Site, please contact us immediately at emil@vapapulse.com and we will promptly delete it.</p>
          <p>Our product privacy practices related to students are described separately in our COPPA/FERPA Compliance Statement.</p>
        </Section>

        <Section title="Data Security">
          <p>We take reasonable technical and organizational measures to protect the information you submit. All data is transmitted over encrypted HTTPS connections. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="Your Rights">
          <p>You may request access to, correction of, or deletion of any personal information you have submitted to us by contacting us at emil@vapapulse.com. We will respond to all reasonable requests within 30 days.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. When we do, we will revise the Effective Date at the top of this page. Continued use of the Site after any update constitutes acceptance of the revised policy.</p>
        </Section>

        <Section title="Contact Us">
          <p>Pulse Pedagogies, LLC<br />Glendale, California<br />Email: <a href="mailto:emil@vapapulse.com" className="text-brand-orange hover:underline">emil@vapapulse.com</a></p>
        </Section>
      </>
    ),
  },

  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <p className="text-brand-ink/50 text-xs mb-8">Effective Date: {EFFECTIVE_DATE}</p>

        <Section title="Acceptance of Terms">
          <p>By accessing or using pulsepedagogies.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site. These Terms apply to the marketing Site only and do not govern use of any Pulse Pedagogies product applications.</p>
        </Section>

        <Section title="Use of the Site">
          <p>This Site is provided for informational and marketing purposes only. You may use the Site for lawful purposes and in a manner consistent with these Terms. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the Site in any way that violates applicable federal, state, or local law</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
            <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
            <li>Impersonate or misrepresent your affiliation with any person or organization</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
          </ul>
        </Section>

        <Section title="Intellectual Property">
          <p>All content on this Site — including text, graphics, logos, images, video, and software — is the property of Pulse Pedagogies, LLC or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
          <p>You may view and print content from the Site for personal, non-commercial use only. No content may be reproduced, distributed, modified, or used for commercial purposes without our express written permission.</p>
          <p>The Pulse Pedagogies name, logo, and VAPA Pulse are trademarks of Pulse Pedagogies, LLC. All rights reserved.</p>
        </Section>

        <Section title="Third-Party Links">
          <p>This Site contains links to third-party websites, including vapapulse.com, LinkedIn, and others. These links are provided for convenience only. We have no control over the content or practices of third-party sites and accept no responsibility for them. Accessing third-party sites is at your own risk.</p>
        </Section>

        <Section title="Disclaimer of Warranties">
          <p>The Site and all content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Pulse Pedagogies, LLC disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          <p>We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
        </Section>

        <Section title="Limitation of Liability">
          <p>To the fullest extent permitted by law, Pulse Pedagogies, LLC and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Site — even if we have been advised of the possibility of such damages.</p>
          <p>Our total liability to you for any claim arising out of these Terms or your use of the Site shall not exceed one hundred dollars ($100).</p>
        </Section>

        <Section title="Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Los Angeles County, California.</p>
        </Section>

        <Section title="Changes to These Terms">
          <p>We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site with a revised Effective Date. Your continued use of the Site after any changes constitutes your acceptance of the revised Terms.</p>
        </Section>

        <Section title="Contact Us">
          <p>For questions about these Terms, please contact:<br />Pulse Pedagogies, LLC<br />Glendale, California<br />Email: <a href="mailto:emil@vapapulse.com" className="text-brand-orange hover:underline">emil@vapapulse.com</a></p>
        </Section>
      </>
    ),
  },

  coppa: {
    title: 'COPPA / FERPA Compliance',
    content: (
      <>
        <p className="text-brand-ink/50 text-xs mb-8">Effective Date: {EFFECTIVE_DATE}</p>

        <p className="text-brand-ink/70 text-sm leading-relaxed mb-8">Pulse Pedagogies, LLC is committed to the highest standards of student privacy. This statement describes how we comply with the Children's Online Privacy Protection Act (COPPA) and the Family Educational Rights and Privacy Act (FERPA) across our marketing site and product offerings.</p>

        <Section title="This Marketing Site">
          <p>The pulsepedagogies.com marketing website is not directed at students or children under the age of 13. We do not knowingly collect personal information from children under 13 on this Site. The only information we collect is submitted voluntarily by educators, administrators, and other adult professionals through our demo request form.</p>
          <p>If you believe a child has submitted information through this Site, please contact us at emil@vapapulse.com and we will promptly delete it.</p>
        </Section>

        <Section title="COPPA Compliance in Our Products">
          <p>Our products, including VAPA Pulse, are designed from the ground up with COPPA compliance as a foundational requirement — not an afterthought.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>No student accounts.</strong> Students do not create accounts, log in, or submit personal information directly to our systems.</li>
            <li><strong>Teacher-mediated interaction.</strong> All student-facing activity is mediated by the classroom teacher. Teachers operate the application on behalf of their students.</li>
            <li><strong>Ephemeral processing.</strong> When student artwork is photographed for instructional feedback, the image is processed in real time and immediately discarded. No student images are stored, indexed, or retained.</li>
            <li><strong>Zero student PII stored.</strong> We do not collect, store, or transmit any student personally identifiable information (PII).</li>
          </ul>
        </Section>

        <Section title="FERPA Compliance">
          <p>FERPA grants parents and eligible students rights over educational records maintained by schools and districts. Pulse Pedagogies supports these rights through the following practices:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>School Official designation.</strong> When districts license our products, Pulse Pedagogies operates as a "school official" under FERPA, accessing student information only as necessary to perform our contracted services.</li>
            <li><strong>No independent use.</strong> We do not use student information for any purpose outside of the educational services provided under our agreement with the district or school.</li>
            <li><strong>No disclosure to third parties.</strong> We do not share student educational records with any third party without explicit written consent from the appropriate school or district authority, except as required by law.</li>
            <li><strong>District control.</strong> Educational records remain under the control of the district at all times. Upon termination of any agreement, we promptly delete or return any student data in our possession.</li>
          </ul>
        </Section>

        <Section title="Data Minimization">
          <p>Our approach to student privacy is rooted in data minimization: we collect and process the minimum information necessary to deliver our educational services, and nothing more. This is not merely a legal posture — it reflects our values as educators who understand what is at stake when student data is mishandled.</p>
        </Section>

        <Section title="Security">
          <p>All data transmitted through our products is encrypted in transit using TLS. Our products are built on Cloudflare's global edge network, which provides enterprise-grade security, DDoS protection, and access controls. We conduct regular security reviews and are committed to prompt disclosure and remediation of any security issues.</p>
        </Section>

        <Section title="Contact for Privacy & Compliance Questions">
          <p>If you are a parent, guardian, educator, district administrator, or compliance officer with questions about our data practices, please contact us directly:</p>
          <p>Pulse Pedagogies, LLC<br />Glendale, California<br />Email: <a href="mailto:emil@vapapulse.com" className="text-brand-orange hover:underline">emil@vapapulse.com</a></p>
          <p>We are committed to responding to all privacy and compliance inquiries within five (5) business days.</p>
        </Section>
      </>
    ),
  },
};

export function LegalModal({ doc, onClose }: LegalModalProps) {
  if (!doc) return null;
  const { title, content } = DOCS[doc];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-paper w-full sm:rounded-[40px] sm:max-w-2xl shadow-2xl flex flex-col max-h-screen sm:max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-brand-ink/10 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1">Legal</p>
            <h3 className="text-2xl font-serif text-brand-ink">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-ink/10 transition-colors shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-10 py-8 flex-1">
          {content}
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-brand-ink/10 shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-brand-ink text-brand-paper py-3 rounded-2xl font-medium hover:bg-brand-orange transition-all text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

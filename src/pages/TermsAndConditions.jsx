import { Link } from 'react-router-dom'
import guideme42icon from '../assets/guideme42icon.png'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={guideme42icon} alt="GuideMe42" className="h-7 w-7 object-cover rounded-full" />
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-black">GuideMe</span>
              <span className="text-[#059669]">42</span>
            </span>
          </Link>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-white bg-[#059669] rounded-lg hover:bg-[#047857] transition-colors"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">Terms and Conditions</h1>
        <p className="text-[var(--color-text-secondary)] mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">1. Acceptance of Terms</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              By accessing or using the GuideMe42 application and services ("Services"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">2. Description of Services</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              GuideMe42 provides travel planning tools including itinerary creation, destination discovery, cost splitting, and collaboration features. We reserve the right to modify, suspend, or discontinue any part of our Services at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">3. User Accounts</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              To use certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)]">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">4. User Conduct</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)]">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property or privacy rights of others</li>
              <li>Upload harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems or other accounts</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">5. Intellectual Property</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              The GuideMe42 name, logo, and all related content are owned by us. You retain ownership of content you create. By posting content, you grant us a license to use, display, and share it as necessary to provide the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">6. Disclaimer of Warranties</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Our Services are provided "as is" without warranties of any kind. We do not guarantee accuracy of third-party information, availability of destinations, or fitness for a particular purpose. Use the Services at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">7. Limitation of Liability</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              To the maximum extent permitted by law, GuideMe42 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">8. Changes</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms and updating the "Last updated" date. Continued use of the Services after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">9. Contact</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:legal@guideme42.com" className="text-[#059669] hover:underline">
                legal@guideme42.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

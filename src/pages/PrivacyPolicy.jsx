import { Link } from 'react-router-dom'
import guideme42icon from '../assets/guideme42icon.png'

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">Privacy Policy</h1>
        <p className="text-[var(--color-text-secondary)] mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8 text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">1. Introduction</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              GuideMe42 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our travel planning application. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">2. Information We Collect</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              We may collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)]">
              <li>Account information (name, email address, profile picture)</li>
              <li>Trip details and itineraries you create</li>
              <li>Preferences and settings</li>
              <li>Communications with us or other users</li>
              <li>Payment and billing information for premium features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">3. How We Use Your Information</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)]">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you updates, security alerts, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience and provide relevant content</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">4. Information Sharing</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We do not sell your personal information. We may share your information with trip members you invite, service providers who assist our operations, or when required by law. We take steps to ensure such parties protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">5. Data Security</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">6. Your Rights</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)]">
              <li>Access and receive a copy of your data</li>
              <li>Correct or update your information</li>
              <li>Delete your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">7. Contact Us</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              If you have questions about this Privacy Policy or our practices, please contact us at{' '}
              <a href="mailto:privacy@guideme42.com" className="text-[#059669] hover:underline">
                privacy@guideme42.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

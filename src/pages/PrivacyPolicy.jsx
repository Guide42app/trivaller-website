import { Link } from 'react-router-dom'
import guideme42icon from '../assets/guideme42icon.png'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
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

      <main className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-5">Last updated: March 17, 2025</p>

        <div className="prose prose-slate max-w-none space-y-4 text-[var(--color-text-primary)] text-sm">
          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">1. Introduction</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              GuideMe42 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our travel planning application. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">2. Information We Collect</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              We may collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-[var(--color-text-secondary)]">
              <li>Account information (name, email address, profile picture)</li>
              <li>Trip details and itineraries you create</li>
              <li>Preferences and settings</li>
              <li>Communications with us or other users</li>
              <li>Payment and billing information for premium features</li>
              <li>Location data (e.g. when you set a trip start/destination, use “nearby” features, or use AI travel assistance), only when you use those features</li>
              <li>Device information (e.g. device type, OS) for app operation and support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">3. How We Use Your Information</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-[var(--color-text-secondary)]">
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
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">4. Information Sharing</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              We do not sell your personal information. We may share your information with trip members you invite, service providers who assist our operations, or when required by law. We take steps to ensure such parties protect your information.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              Our app uses third-party services that may process data: <strong>Google</strong> (sign-in and places/address features; see Google Privacy Policy), <strong>Expo</strong> (push notifications; see Expo privacy policy), and <strong>Sentry</strong> (crash and performance monitoring; see Sentry privacy policy). Their use of data is governed by their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">5. Data Retention</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              We retain your information for as long as your account is active or as needed to provide the Services. After you delete your account, we delete or anonymize your personal data (such as your name, email, and profile) within a reasonable period, except where we must retain it for legal or safety reasons.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              We may continue to keep place-related content that you contributed as a GuideMe42 user—such as place details, descriptions, photos, or ratings—in anonymized or non–personally linked form. We use this to recommend places to other users and to improve our Services. This content is no longer associated with your account or identity after deletion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">6. Data Security</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">7. Your Rights</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-[var(--color-text-secondary)]">
              <li>Access and receive a copy of your data</li>
              <li>Correct or update your information</li>
              <li>Delete your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">8. Children&apos;s Privacy</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              Our Services are not directed to anyone under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">9. Contact Us</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
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

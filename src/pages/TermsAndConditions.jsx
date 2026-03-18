import { Link } from 'react-router-dom'
import guideme42icon from '../assets/guideme42icon.png'

export default function TermsAndConditions() {
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
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Terms and Conditions</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-5">Last updated: March 17, 2025</p>

        <div className="space-y-4 text-sm text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">1. Acceptance of Terms</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              By accessing or using the GuideMe42 application and services ("Services"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">2. Description of Services</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              GuideMe42 provides travel planning tools including itinerary creation, destination discovery, deals and offers from businesses, cost splitting, and collaboration features. We reserve the right to modify, suspend, or discontinue any part of our Services at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">3. Eligibility</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              You must be at least 13 years of age (or the minimum age in your jurisdiction to consent to use of the Services) to use GuideMe42. If you are under 18, you should have your parent or guardian review these Terms. By using the Services, you represent that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">4. User Accounts</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              To use certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-[var(--color-text-secondary)]">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">5. User Conduct</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-[var(--color-text-secondary)]">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property or privacy rights of others</li>
              <li>Upload harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems or other accounts</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">6. Intellectual Property</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              The GuideMe42 name, logo, and all related content are owned by us. You retain ownership of content you create. By posting content, you grant us a license to use, display, and share it as necessary to provide the Services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">7. Paid Services and Refunds</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              Premium or subscription features may be offered in the app. Payment and renewal are processed by the app store (Apple App Store or Google Play). Refunds and cancellations are governed by the applicable store&apos;s policies. We do not provide direct refunds for store purchases.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">8. Deals and Third-Party Offers</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              GuideMe42 may display deals, discounts, or offers from business owners (e.g. attractions, restaurants, hotels). These deals are created and described by the respective businesses. The applicability, terms, validity period, and redemption of each deal are determined solely by the business owner—not by GuideMe42.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              We do not guarantee that a business will honor any deal as shown in the app. Users are responsible for verifying deal terms with the business before visiting or purchasing. GuideMe42 is not liable for any dispute, loss, or disappointment arising from a business&apos;s failure to apply a deal as described.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">9. Termination</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              We may suspend or terminate your account or access to the Services if you breach these Terms or for other operational or legal reasons. You may delete your account at any time through the app or by contacting us. Upon termination, your right to use the Services ends. Provisions that by their nature should survive (including intellectual property, disclaimers, and limitation of liability) will survive.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">10. Disclaimer of Warranties</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              Our Services are provided "as is" without warranties of any kind. We do not guarantee accuracy of third-party information, availability of destinations, or fitness for a particular purpose. Use the Services at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">11. Limitation of Liability</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              To the maximum extent permitted by law, GuideMe42 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">12. Changes</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug">
              We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms and updating the "Last updated" date. Continued use of the Services after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">13. Governing Law and Contact</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              These Terms are governed by the laws of the jurisdiction in which GuideMe42 operates, without regard to conflict of law principles. Any disputes shall be resolved in the courts of that jurisdiction.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-snug">
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

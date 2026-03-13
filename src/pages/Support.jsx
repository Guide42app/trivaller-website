import { Link } from 'react-router-dom'
import guideme42icon from '../assets/guideme42icon.png'

export default function Support() {
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
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">Support</h1>
        <p className="text-[var(--color-text-secondary)] mb-12">
          Get help with GuideMe42. We&apos;re here to assist you.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-2">How do I create a trip?</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Open the app, tap &quot;New Trip,&quot; add your destinations and dates, and start building your itinerary day by day.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-2">How do I invite trip members?</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Open your trip, tap the share icon, and invite friends via email or link. They can collaborate in real time.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-2">How does cost splitting work?</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Add expenses to your trip and assign them to members. The app calculates fair splits and shows who owes what.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-2">How do I export or share my trip guide?</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  From your trip, tap the share button to export as PDF or send a shareable link to others.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Contact Us</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Can&apos;t find what you need? Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <strong className="text-[var(--color-text-primary)]">Email:</strong>{' '}
                <a href="mailto:support@guideme42.com" className="text-[#059669] hover:underline">
                  support@guideme42.com
                </a>
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Response time:</strong> Usually within 24–48 hours
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Helpful Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-[#059669] hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#059669] hover:underline">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}

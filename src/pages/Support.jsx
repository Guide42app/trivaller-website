import { Link } from 'react-router-dom'
import trivallerIcon from '../assets/trivallericon.png'

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={trivallerIcon} alt="Trivaller" className="h-7 w-7 object-cover rounded-full" />
            <span className="text-lg font-semibold tracking-tight text-black">Trivaller</span>
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
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Support</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-5">
          Get help with Trivaller. We&apos;re here to assist you.
        </p>

        <div className="space-y-4 text-sm text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-base font-semibold mb-3 text-[var(--color-text-primary)]">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I create a trip?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  Go to the Trips tab and tap the + button. Enter your origin, destination, and dates to create a trip. You can then add routes and explore recommendations.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I set an active trip?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  Open My Trips, select a trip, and tap &quot;Set Active&quot;. Your active trip will appear on the dashboard and in the Trip Planner.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I save my itinerary?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  In Trip Status, open the Itinerary tab and assign activities to days. Tap &quot;Save itinerary&quot; to store it. You&apos;ll be prompted to save when switching tabs or leaving if you have unsaved changes.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I add places to my trip?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  In Trip Status, use the Recommendations tab to discover nearby attractions, restaurants, and hotels. Tap &quot;Add to trip&quot; on any place to add it to your itinerary. You can also add custom activities in the Itinerary tab.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I add trip mates?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  Open your trip and go to the Trip Details or Members section. Tap &quot;Add members&quot; or &quot;Invite&quot; and search for users by name or email. Trip mates can view and edit the itinerary together.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I save places for later?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  When viewing a place (on the map, in recommendations, or in search), tap the bookmark or save icon. Saved places appear in the Saved Places section and can be added to trips anytime.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I create a place guide?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  From the Home tab, tap &quot;Create Guide&quot; or go to your saved places and select multiple spots. You can also create a guide from an existing trip itinerary in My Trips. Add a title, destination, and pick your top places.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I manage notifications?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  Go to Settings and tap &quot;Notification preferences&quot;. You can toggle trip reminders, daily itinerary alerts, thread replies, deals, and nearby attractions. Changes are saved automatically.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">How do I delete a trip?</h3>
                <p className="text-[var(--color-text-secondary)] leading-snug">
                  Open My Trips, select the trip you want to remove, and open the trip details. Tap the menu or settings icon and choose &quot;Delete trip&quot;. This action cannot be undone.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">Contact Us</h2>
            <p className="text-[var(--color-text-secondary)] leading-snug mb-2">
              Can&apos;t find what you need? Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <ul className="space-y-0.5 text-[var(--color-text-secondary)]">
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
            <h2 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]">Helpful Links</h2>
            <ul className="space-y-0.5">
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

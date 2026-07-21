import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data SavePinner processes, why, and for how long: no accounts, no long-term storage of links or files, IPs retained briefly for rate limiting.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      intro="SavePinner is designed to collect as little as possible: no accounts, no tracking pixels, no advertising scripts. This page explains exactly what is processed, why, and for how long."
    >
      <section>
        <h2>What we process</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Purpose</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Pinterest URL you paste</td>
              <td>To resolve that single request</td>
              <td>Not stored after the request completes; full URLs are never written to logs</td>
            </tr>
            <tr>
              <td>Downloaded media files</td>
              <td>Streamed through our server to your device</td>
              <td>Never stored on our servers</td>
            </tr>
            <tr>
              <td>IP address</td>
              <td>Rate limiting and abuse prevention</td>
              <td>Kept only as long as needed for rate-limit windows (minutes), never logged</td>
            </tr>
            <tr>
              <td>Technical logs</td>
              <td>Reliability monitoring: error codes, timings, media type, size buckets</td>
              <td>Up to 30 days; logs never contain full URLs, query strings or download tokens</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>No user accounts, no email collection, no passwords.</li>
          <li>No advertising or third-party analytics trackers.</li>
          <li>No sale or sharing of personal data with third parties.</li>
          <li>No long-term storage of the links you submit or the files you download.</li>
        </ul>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          SavePinner does not set tracking cookies. The hosting platform may set strictly necessary
          cookies required for security and load balancing.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>
          Resolving a Pin requires our server to request the public Pinterest page you asked for.
          Pinterest&apos;s own policies apply to their service; we do not send any of your data to
          Pinterest beyond a standard HTTPS request.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Because we do not hold accounts or persistent personal data tied to you, there is usually
          nothing to access, correct or delete. If you believe we hold data about you, contact us and
          we will respond within a reasonable time.
        </p>
      </section>

      <section>
        <h2>Changes &amp; contact</h2>
        <p>
          We may update this policy as the product evolves; material changes will be reflected on
          this page with a new revision date. Questions: see our{" "}
          <a href="/contact/">contact page</a>.
        </p>
        <p className="text-gray-500">Last updated: 2026-07-20</p>
      </section>
    </ContentPage>
  );
}

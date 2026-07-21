import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Copyright & Takedown",
  description:
    "How rights holders can report content resolved through SavePinner and request restrictions: what to include, where to send it, and how we respond.",
  alternates: { canonical: "/copyright/" },
};

export default function CopyrightPage() {
  return (
    <ContentPage
      title="Copyright & Takedown"
      intro="SavePinner respects the rights of content owners. We do not host any Pinterest content — files are fetched on demand from Pinterest's own servers — but we can restrict specific Pins or media from being resolved through our service."
    >
      <section>
        <h2>Report content (takedown request)</h2>
        <p>Email your request to the address on our <a href="/contact/">contact page</a> with:</p>
        <ol>
          <li>Your name and contact information (email is sufficient).</li>
          <li>Identification of the copyrighted work you own or represent.</li>
          <li>The exact Pinterest Pin URL(s) you want restricted on SavePinner.</li>
          <li>
            A statement that you have a good-faith belief the use is not authorized, and that the
            information in your notice is accurate.
          </li>
        </ol>
        <p>
          We review complete requests and aim to respond within 3–5 business days. Valid
          restrictions are applied to our resolver so the reported Pins no longer resolve through
          SavePinner.
        </p>
      </section>

      <section>
        <h2>Important notes</h2>
        <ul>
          <li>
            Removing or restricting content on SavePinner does not remove it from Pinterest — to
            remove content at the source, please also use Pinterest&apos;s own reporting tools.
          </li>
          <li>
            SavePinner does not re-host, index or archive media; downloads are fetched directly from
            Pinterest&apos;s CDN at the moment of the user&apos;s request.
          </li>
          <li>
            Knowingly misrepresenting that content infringes your rights may carry legal liability.
          </li>
        </ul>
      </section>

      <section>
        <h2>Counter-notice</h2>
        <p>
          If you believe a restriction was applied in error, contact us with the Pin URL and an
          explanation. We will review and, where appropriate, restore resolution.
        </p>
      </section>

      <section>
        <h2>Repeat misuse</h2>
        <p>
          SavePinner is a single-Pin tool with rate limits designed to prevent bulk misuse. We may
          block traffic patterns that systematically abuse the service to infringe rights.
        </p>
      </section>
    </ContentPage>
  );
}

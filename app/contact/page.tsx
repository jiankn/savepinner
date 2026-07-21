import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "How to reach the SavePinner team: bug reports, feedback, error corrections and copyright requests.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact Us"
      intro="Questions, bug reports, feedback or copyright requests — email is the fastest way to reach us."
    >
      <section>
        <h2>Email</h2>
        <p>
          <a href="mailto:contact@savepinner.com" className="text-base font-semibold">
            contact@savepinner.com
          </a>
        </p>
        <p>We typically reply within 3–5 business days.</p>
      </section>

      <section>
        <h2>What to include</h2>
        <ul>
          <li>
            <strong>Bug reports:</strong> the Pin link you tried (or at least the error message
            shown), your device/browser, and roughly when it happened.
          </li>
          <li>
            <strong>Copyright requests:</strong> see the <a href="/copyright/">Copyright page</a> for
            the required details.
          </li>
          <li>
            <strong>Feedback:</strong> what you expected, what happened instead, and screenshots if
            helpful.
          </li>
        </ul>
      </section>

      <section>
        <h2>Before you write</h2>
        <p>
          Many issues are explained by the error message on the page or by{" "}
          <a href="/how-to-use/">How to Use</a> — unsupported link types, private Pins and expired
          download links are the most common causes.
        </p>
      </section>
    </ContentPage>
  );
}

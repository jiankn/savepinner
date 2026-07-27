import TrustContentPage from "@/components/TrustContentPage";
import { getTrustPageSeo } from "@/lib/seo";
import { TRUST_PAGES } from "@/lib/trust-content";

const content = TRUST_PAGES.es.privacy;

export const metadata = getTrustPageSeo(content);

export default function PrivacyPage() {
  return <TrustContentPage content={content} />;
}

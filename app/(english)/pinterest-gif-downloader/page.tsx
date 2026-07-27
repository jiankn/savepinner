import ToolLandingPage from "@/components/ToolLandingPage";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageSeo } from "@/lib/seo";

export const metadata = getPageSeo("gif");

export default function PinterestGifDownloaderPage() {
  return <ToolLandingPage content={TOOL_PAGES.gif} />;
}

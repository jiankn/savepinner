import ToolLandingPage from "@/components/ToolLandingPage";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageSeo } from "@/lib/seo";

export const metadata = getPageSeo("android");

export default function PinterestDownloaderAndroidPage() {
  return <ToolLandingPage content={TOOL_PAGES.android} />;
}

import AdSenseScript from "@/components/AdSenseScript";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export default function SiteShell({
  children,
  skipLabel,
}: {
  children: React.ReactNode;
  skipLabel: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {skipLabel}
      </a>
      {children}
      <AdSenseScript />
      <ServiceWorkerRegistration />
    </>
  );
}

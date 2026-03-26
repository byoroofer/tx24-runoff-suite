import { buildDisclosureText } from "@tx24/shared";

const DEFAULT_DISCLOSURE = buildDisclosureText({
  paidForBy: "TX-24 Runoff Digital Committee",
  authorizedBy: "TX-24 Runoff Digital Committee",
  websiteUrl: "https://example.org/disclosure"
});

export function DisclosureFooter() {
  return (
    <footer className="footer">
      <main>
        <strong>Disclosure</strong>
        <p>{DEFAULT_DISCLOSURE}</p>
      </main>
    </footer>
  );
}


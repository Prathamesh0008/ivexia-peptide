import LegalContentPage from "@/components/LegalContentPage";

export const metadata = {
  title: "Accessibility Statement | Ivexia Peptide",
};

export default function AccessibilityStatementPage() {
  return (
    <LegalContentPage title="Accessibility Statement">
      <h3>Accessibility Statement for Ivexia Peptide</h3>

      <p>
        Ivexia Peptide is committed to ensuring digital accessibility for people
        with disabilities. We are continually improving the user experience for
        everyone, and applying the relevant accessibility standards.
      </p>

      <h3>Conformance status</h3>

      <p>
        The Web Content Accessibility Guidelines (WCAG) defines requirements for
        designers and developers to improve accessibility for people with
        disabilities. It defines three levels of conformance: Level A, Level AA,
        and Level AAA. Ivexia Peptide WebStore is partially conformant with WCAG
        2.1 level AA. Partially conformant means that some parts of the content
        do not fully conform to the accessibility standard.
      </p>

      <h3>Feedback</h3>

      <p>
        We welcome your feedback on the accessibility of the Ivexia Peptide
        WebStore. Please let us know if you encounter accessibility barriers on
        Ivexia Peptide:
      </p>

      <ul>
        <li>
          Phone:{" "}
          <a href="tel:18009866401">1-800-986-6401</a>
        </li>
        <li>
          E-mail:{" "}
          <a href="mailto:service@ivexiapeptide.com">
            service@ivexiapeptide.com
          </a>
        </li>
      </ul>

      <p>We try to respond to feedback within 5 business days.</p>

      <p>This statement was created on 21 October 2024.</p>
    </LegalContentPage>
  );
}
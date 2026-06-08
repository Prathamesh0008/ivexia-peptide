import LegalContentPage from "@/components/LegalContentPage";

export const metadata = {
  title: "Customer Service | Ivexia Peptide",
};

export default function ShippingPaymentsPage() {
  return (
    <LegalContentPage title="Customer Service">
     <ul className="list-disc pl-5">
  <li>Shipping & Delivery</li>
  <li>Privacy & Security</li>
  <li>Returns & Replacements</li>
  <li>Ordering</li>
  <li>Payment, Pricing & Promotions</li>
  <li>Viewing Order Status</li>
  <li>Satisfaction Guaranteed</li>
</ul>

      <h3>Shipping & Delivery</h3>
      <p>
        We offer multiple shipping options. FREE shipping with orders over
        $200.00 (Grand Total), USPS Priority, FedEx 2 Day (2 business days),
        FedEx Overnight, FedEx Overnight - Signature Required and FedEx Saturday
        Delivery for orders placed on Fridays before noon PST that need next day
        delivery. Orders placed, paid, and processed before 12 noon PST typically
        ship out the same business day. Orders placed, paid, and processed after
        12 noon PST and on weekends and holidays ship out the following business
        day.
      </p>

      <h3>Privacy & Security</h3>
      <p>
        When your order is submitted online, you are protected by 256 Bit SSL
        (Secure Socket Layer) encryption technology on our secure server. We take
        your privacy very seriously and follow all federal and state privacy laws
        to ensure your information is completely secure and confidential. We will
        not release your personal or order information to anyone and will not use
        your information for any purpose other than filling your order(s).
      </p>

      <h3>Returns & Replacements</h3>
      <p>
        Due to regulations regarding the sale of our products, returns are
        prohibited. However, in the event that the order is shipped incorrectly
        or the items received are not the items ordered, please contact us by
        email. We will issue a replacement of your original order.
      </p>

      <h3>Ordering</h3>
      <p>
        You may order from PeptideSciences™ 24 hours a day 7 days a week through
        our secure website. After your order is submitted, approved, and payment
        is received, your order will be filled, properly packaged and shipped by
        a reputable delivery service such as USPS. We will contact you with
        details when your order has shipped.
      </p>

      <h3>Payment, Pricing & Promotions</h3>
      <p>
        We accept payments with all major credit cards. We offer both individual
        pricing and wholesale bulk pricing. Please see our products pages for
        quantity discounts. Please contact us by email for large bulk discounts.
      </p>

      <p>
        Click here to contact us at{" "}
        <a href="mailto:service@peptidesciencesmail.com">
          service@peptidesciencesmail.com
        </a>
      </p>

      <h3>Viewing Orders</h3>
      <p>
        During checkout, you will have the option to register or check out as a
        guest. We encourage you to register, but this is completely optional.
        Registration does not take any extra time, and will enable you to check
        order status, change your account information and access your past orders
        by logging in to our website. It also speeds up the process of checkout
        for future orders. If you choose not to create an account during checkout
        and have questions about the status of your order, please email us. You
        may also check out as a Guest.
      </p>

      <h3>Satisfaction Guaranteed</h3>
      <p>
        We are committed to offering outstanding quality and service and we are
        here to serve you. If you are have any question or issue regarding our
        service, please contact us to let us know the problem. We respond to ALL
        questions and inquiries.
      </p>
    </LegalContentPage>
  );
}
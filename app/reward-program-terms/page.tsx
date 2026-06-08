// app/reward-program-terms/page.tsx

import LegalContentPage from "@/components/LegalContentPage";

export const metadata = {
  title: "Reward Program Terms | Ivexia Peptide",
};

export default function RewardProgramTermsPage() {
  return (
    <LegalContentPage title="Reward Program Terms">
      <h3>Reward Program</h3>

      <h3>How it Works</h3>

      <p>
        Earn $1 in Reward Balance for every $100 spent on products. Subtotal
        only — taxes, shipping, discounts, and rewards are excluded from the
        calculation.
      </p>

      <p>
        Example: If your product subtotal is $75, you will earn $0.75 in Reward
        Balance.
      </p>

      <h3>When Rewards Are Granted</h3>

      <p>Rewards are granted only after the order is shipped.</p>

      <p>
        If an order is canceled or modified, the corresponding reward points
        will be removed from your balance.
      </p>

      <p>
        The earned balance becomes immediately available for use on your next
        purchase.
      </p>

      <p>You must be logged in when placing the order to earn rewards.</p>

      <h3>Eligibility</h3>

      <p>
        Only registered and logged-in customers are eligible to earn and use
        Reward Balance.
      </p>

      <p>Orders placed as a guest will not earn any points.</p>

      <h3>Using Your Reward Balance</h3>

      <p>
        There’s no minimum or maximum limit on how much of your balance you can
        use.
      </p>

      <p>You can combine your Reward Balance with other discounts.</p>

      <h3>Where to Check Your Reward Balance</h3>

      <p>
        Log in to your account and go to <strong>My Account → My Rewards</strong>.
      </p>

      <p>
        You’ll see your current balance and full transaction history there.
      </p>

      <h3>How to Use Your Balance at Checkout</h3>

      <p>
        On the Payment step at checkout, you’ll see a field to apply your Reward
        Balance.
      </p>

      <p>
        Just enter the amount you’d like to use — and it will be deducted from
        your order total.
      </p>

      <p>
        Need help or have questions? Contact us and we’ll be happy to assist.
      </p>
    </LegalContentPage>
  );
}
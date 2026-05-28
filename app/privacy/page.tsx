import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Duitin's commitment to your data privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-base min-h-screen text-primary p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-display font-bold">Privacy Policy</h1>
        <p className="text-secondary">Your privacy is important to us. At Duitin, we are committed to protecting your financial data.</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Data Collection</h2>
          <p className="text-secondary">We collect only necessary information to provide you with the best financial tracking experience.</p>
        </section>
      </div>
    </div>
  );
}

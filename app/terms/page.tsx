import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Duitin.",
};

export default function TermsPage() {
  return (
    <div className="bg-base min-h-screen text-primary p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-display font-bold">Terms of Service</h1>
        <p className="text-secondary">By using Duitin, you agree to the following terms.</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Usage</h2>
          <p className="text-secondary">Duitin is provided as-is for personal financial tracking.</p>
        </section>
      </div>
    </div>
  );
}

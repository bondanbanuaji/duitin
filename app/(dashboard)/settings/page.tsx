import { SettingsContent } from "./SettingsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile and application preferences.",
};

export default function SettingsPage() {
  return <SettingsContent />;
}

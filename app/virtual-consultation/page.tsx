import { Metadata } from "next";
import VirtualConsultationPage from "./VirtualConsultationPage";

export const metadata: Metadata = {
  title: "Virtual Hair Consultation | BLACKHOUSE SALON",
  description: "Try our AI-powered virtual hair consultation to visualize new styles before your appointment.",
};

export default function Page() {
  return <VirtualConsultationPage />;
}
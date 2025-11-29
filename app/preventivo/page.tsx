import Contact from "@/components/Contact";
import dynamic from "next/dynamic";

const PreventivoWizard = dynamic(() => import("../form-preventivo/PreventivoWizard"), { ssr: false });

export default function PreventivoPage() {
  return (
    <>
      <PreventivoWizard />
      <Contact viewMode="footer" />
    </>
  );
}

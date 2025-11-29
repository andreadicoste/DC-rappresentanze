import Contact from "@/components/Contact";
import dynamic from "next/dynamic";

const PreventivoWizard = dynamic(() => import("./PreventivoWizard"), { ssr: false });

export default function FormPreventivoPage() {
  return (
    <>
      <PreventivoWizard />
      <Contact viewMode="footer" />
    </>
  );
}

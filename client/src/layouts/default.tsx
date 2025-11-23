import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function DefaultLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn("flex-1 container mx-auto", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

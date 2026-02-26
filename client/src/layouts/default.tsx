import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

export default function DefaultLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className={cn("flex-1 p-3 sm:container mx-auto", className)}>{children}</main>
      <Footer />
    </div>
  );
}

import Footer from "@/components/guest/footer";
import Header from "@/components/guest/header";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">{children}</main>
      <Footer />
    </div>
  );
}

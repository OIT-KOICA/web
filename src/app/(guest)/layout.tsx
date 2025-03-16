import EventTicker from "@/components/guest/events/event-ticker";
import Footer from "@/components/guest/footer";
import Header from "@/components/guest/header";
import ProjectSponsorsCarousel from "@/components/guest/project-sponsors-carousel";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 pt-20">
        <ProjectSponsorsCarousel />
        <EventTicker />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const DynamicHero = dynamic(() => import("@/components/guest/hero"), {
  loading: () => (
    <div className="flex h-[600px] items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ),
});
const DynamicStakeholderSection = dynamic(
  () => import("@/components/guest/stakeholder-section"),
  {
    loading: () => (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
  }
);
const DynamicValueSection = dynamic(
  () => import("@/components/guest/value-section"),
  {
    loading: () => (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
  }
);
const DynamicProductsSection = dynamic(
  () => import("@/components/guest/products-section"),
  {
    loading: () => (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <Suspense
        fallback={
          <div className="flex h-[600px] items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <DynamicHero />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <DynamicProductsSection />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <DynamicStakeholderSection />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <DynamicValueSection />
      </Suspense>
    </div>
  );
}

"use client";

import PriceVariationsTable from "@/components/guest/products/price-variations-table";
import ProductDiscussion from "@/components/guest/products/product-discussion";
import ProductHeader from "@/components/guest/products/product-header";
import ProductInfo from "@/components/guest/products/product-info";
import SkeletonLoader from "@/components/guest/products/skeleton-loader";
import { getDiscussion } from "@/lib/service/discussion-api";
import useProductStore from "@/lib/stores/product-store";
import { Discussion } from "@/types/type";
import { getPhoneFromCookie } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { motion } from 'framer-motion'

export default function ProductDetailPage() {
  const product = useProductStore((state) => state.activeProduct);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const phone = getPhoneFromCookie();

  /**
   * Cherche le numéro de téléphone du client dans les cookies
   * Si trouvé, cherche la discussion associée
   * Sinon retourne une discussion vide
   */
  useEffect(() => {
    if (phone && product)
      getDiscussion({ code: product.code, phone }).then((data) =>
        setDiscussion(data)
      );
  }, [phone, product, setDiscussion]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<SkeletonLoader />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductHeader product={product} />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <ProductInfo product={product} />
              <PriceVariationsTable product={product} />
            </div>
            <ProductDiscussion
              code={product?.code}
              discussion={discussion}
              setDiscussion={setDiscussion}
            />
          </div>
        </motion.div>
      </Suspense>
    </div>
  );
}

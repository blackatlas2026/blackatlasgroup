import { Suspense } from 'react';
import ShopPage from '../components/marketplace/ShopPage';

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading marketplace...</div>}>
      <ShopPage />
    </Suspense>
  );
}
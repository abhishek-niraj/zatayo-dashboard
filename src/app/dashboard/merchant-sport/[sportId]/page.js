'use client';
import CommonPageComponent from '@/app/components/CommonPageComponent';
import SportHeader from '@/app/components/ui/sports/SportHeader';

import { useParams } from 'next/navigation';
import MerchantSportDetail from '../merchant-sport-details';

export default function MerchantSportDetailPage() {
  const { sportId } = useParams();
  return (
    <CommonPageComponent
      title={`Merchant-Sports/ ${sportId}`}
      // headerComponent={<SportHeader />}
      bodyComponent={<MerchantSportDetail />}
    ></CommonPageComponent>
  );
}

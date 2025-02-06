'use client';
import CommonPageComponent from '@/app/components/CommonPageComponent';
import { useParams } from 'next/navigation';
import FitnessDetails from '../fitness-details';

export default function MerchnatFitnessDetailPage() {
  const { fitnessId } = useParams();
  return (
    <CommonPageComponent
      title={`Fitness/ ${fitnessId}`}
      // headerComponent={<FitnessHeader />}
      bodyComponent={<FitnessDetails />}
    ></CommonPageComponent>
  );
}

import CommonPageComponent from '@/app/components/CommonPageComponent';
import MerchnatFitnessList from './fitness-list';
import SportHeader from '@/app/components/ui/sports/SportHeader';

export default function FitnessPage() {
  return (
    <CommonPageComponent
      title='Fitness'
      headerComponent={<SportHeader title='Fitness List' />}
      bodyComponent={<MerchnatFitnessList />}
    ></CommonPageComponent>
  );
}

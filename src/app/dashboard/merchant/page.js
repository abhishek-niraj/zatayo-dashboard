import CommonPageComponent from '@/app/components/CommonPageComponent';
import SportHeader from '@/app/components/ui/sports/SportHeader';
import MerchantList from './merchnatList';

export default function MerchantPage() {
  return (
    <CommonPageComponent
      title='Merchant'
      headerComponent={<SportHeader title='Merchant List' />}
      bodyComponent={<MerchantList />}
    ></CommonPageComponent>
  );
}

import CommonPageComponent from '@/app/components/CommonPageComponent';
import QrCodeList from './qr-code-list';
import QrCodeHeader from './qr-code-header';

export default function QR() {
  return (
    <CommonPageComponent
      title='Qr Code'
      headerComponent={<QrCodeHeader title='Qr Code list' />}
      bodyComponent={<QrCodeList />}
    ></CommonPageComponent>
  );
}

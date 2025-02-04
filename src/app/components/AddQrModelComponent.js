'use client';

import InputField from './InputField';
import { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { QRCodeCanvas } from 'qrcode.react';
// import { useAddQrCode } from '../hook/admin/qr/qrApi';
import { useAddQrCode } from '../hook/admin/qr/qrApi';
export default function AddQrModelComponent({ isShow, setIsShow }) {
  const [qrCodeNumber, setQrCodeNumber] = useState('');
  const qrCodeRef = useRef(null);

  const addQrCodeMutation = useAddQrCode();
  if (!isShow) return null;
  //   const addQrCodeMutation = useAddQrCode();
  function handleCloseQr() {
    setIsShow(false);
  }
  const handleInputQrChange = (event) => {
    const { name, value } = event.target;
    setQrCodeNumber(value);
  };

  const handleSubmit = async () => {
    if (!qrCodeNumber) return alert('Please enter a QR Code');

    try {
      await addQrCodeMutation.mutateAsync({ qrNumber: qrCodeNumber });
      alert('QR Code Added Successfully!');
      downloadQRCode();
      setIsShow(false); // Close modal after success
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    console.log(qrCodeURL);
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    handleCloseQr();
  };
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-10 
     flex justify-center items-center
    '
    >
      <div className=''>
        <div className='bg-white rounded-md'>
          <div className='p-5'>
            <div className='flex justify-between '>
              <p>QrCode</p>
              <IoClose
                onClick={handleCloseQr}
                size={25}
                className='cursor-pointer '
              />
            </div>
            <div>
              <InputField
                placeholder='Please enter qrCode'
                onChange={handleInputQrChange}
              ></InputField>
            </div>
            <div
              className='border-2 border-indigo-50 border-solid flex flex-col items-center 
                  justify-center p-5 md:px-5 sm:px-5 rounded w-full mt-3'
            >
              <div className='flex flex-col gap-10 items-center justify-center w-full'>
                <div
                  style={{
                    height: 'auto',
                    margin: '0 auto',
                    maxWidth: 256,
                    width: '100%',
                  }}
                >
                  <QRCodeCanvas
                    id='qrCodeEl'
                    size={256}
                    style={{
                      height: 'auto',
                      maxWidth: '100%',
                      width: '100%',
                      bgColor: '#FF8243',
                    }}
                    value={qrCodeNumber}
                    ref={qrCodeRef}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className='flex justify-center items-center mt-2
             w-full h-10 bg-blueButton rounded-sm  text-white'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

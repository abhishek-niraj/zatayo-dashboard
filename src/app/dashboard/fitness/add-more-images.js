'use client';
import CommonButton from '@/app/components/CommonButton';
import PopUpModel from '@/app/components/PopUpModel';
import { Fragment, useState, useRef } from 'react';
import { useAddFitnessImages } from '@/app/hook/merchant/fitness/merchantFitness';
import { IoClose } from 'react-icons/io5';

export default function AddMoreImages({ fitnessSportsId }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isClosedDialog, setIsClosedDialog] = useState(false);
  const fileInputRef = useRef(null);
  const mutation = useAddFitnessImages();

  // Handle Image Selection
  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile(files); // Convert FileList to array
    if (files.length === 0) return; // Prevent adding empty selection
    setSelectedImages((prevImages) => [...prevImages, ...files]); // Append new files
  };

  // Handle Dialog Toggle
  const handleClosedDialog = () => {
    setIsClosedDialog(!isClosedDialog);
  };

  const handleSaveImages = async () => {
    if (selectedImages.length === 0) {
      console.log('No images selected');
      return;
    }

    try {
      console.log('FormData :', selectedFile);
      const response = await mutation.mutateAsync({
        fitnessSportsId: fitnessSportsId,
        file: selectedFile,
      });

      if (response.statusCode == 200) {
        handleClosedDialog();
        alert(response.message);
        setSelectedImages([]);
      } else {
        handleClosedDialog();
        alert(response.message);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <Fragment>
      <button
        onClick={handleClosedDialog}
        className='inline-block bg-blueButton rounded-md px-3 py-2 text-sm text-white mr-2 mb-2'
      >
        + Add Images
      </button>

      {isClosedDialog && (
        <PopUpModel>
          <div>
            <div className='flex gap-5 justify-between'>
              <p>Add Fitness Images</p>
              <div className='cursor-pointer bg-slate-300 rounded-[100px] h-6 w-6 flex items-center justify-center'>
                <IoClose size={16} onClick={handleClosedDialog} />
              </div>
            </div>

            {/* Image Preview Section */}
            <div className='py-2'>
              {selectedImages.length === 0 ? (
                <p>Please select images</p>
              ) : (
                <div className='grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-2 border rounded-md'>
                  {selectedImages.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index}`}
                      className='w-24 h-24 object-cover rounded-lg border'
                    />
                  ))}
                </div>
              )}
            </div>

            <div className='py-1 flex justify-end gap-2'>
              {/* Hidden File Input */}
              <input
                type='file'
                multiple
                accept='image/*'
                ref={fileInputRef}
                className='hidden'
                onChange={handleImageSelect}
              />

              {/* Select Image Button */}
              <CommonButton
                text='Select Image'
                bgColor='bg-blueButton'
                textColor='text-white'
                onClick={() => fileInputRef.current.click()}
              />

              {/* Save Button */}
              <CommonButton
                text={mutation.isPending ? 'Uploading...' : 'Save'}
                textColor='text-white'
                bgColor='bg-blueButton'
                onClick={handleSaveImages}
                disabled={mutation.isPending} // Prevent multiple submissions
              />
            </div>
          </div>
        </PopUpModel>
      )}
    </Fragment>
  );
}

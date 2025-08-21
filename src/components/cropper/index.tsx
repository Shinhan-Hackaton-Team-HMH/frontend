import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Image from 'next/image';
import 'react-cropper/node_modules/cropperjs/dist/cropper.css';

interface CroppedProps {
  adImages: File[];
  setAdImages: Dispatch<SetStateAction<File[]>>;
}

export default function ImageCropper({ adImages, setAdImages }: CroppedProps) {
  const [image, setImage] = useState(
    'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
  );
  const [cropData, setCropData] = useState('');
  const cropperRef = useRef<ReactCropperElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const cropper = cropperRef.current?.cropper;
      setCropData(cropper.getCroppedCanvas().toDataURL());
      console.log('base64: ', cropper.getCroppedCanvas().toDataURL());
      setAdImages((prev) => [
        ...prev,
        base64ToFile(
          cropper.getCroppedCanvas().toDataURL(),
          adImages.length.toString(),
        ),
      ]);
    }
  };

  const base64ToFile = (base64: string, filename: string): File => {
    // Split the base64 string into metadata and data
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

    // Decode base64
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Create File
    return new File([u8arr], filename, { type: mime });
  };

  console.log('images: ', adImages);
  return (
    <>
      <div className="w-2xl relative">
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          // style={{ height: 400, width: '100%' }}
          className="w-full"
          initialAspectRatio={9 / 16}
          aspectRatio={9 / 16}
          movable={true}
          cropBoxResizable={true}
          preview=".img-preview"
          guides={true}
          src={image}
          ref={cropperRef}
          dragMode={'move'}
          checkOrientation={true}
        />
        <button style={{ float: 'right' }} onClick={getCropData}>
          Crop Image
        </button>
        {cropData && (
          <>
            <img
              className="absolute w-full h-full left-0 top-0 bg-red-300"
              src={cropData}
              alt=""
            />
            <button
              className="absolute bottom-2 right-2 z-30 bg-white"
              onClick={() => setCropData('')}
            >
              Roll back
            </button>
          </>
        )}
      </div>
      {/* <div>
        <div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: '30%', float: 'left', height: 300 }}
          />
        </div>
        <div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>
            <span>Crop</span>
            <button style={{ float: 'right' }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          {cropData && (
            <Image
              style={{ width: '30%' }}
              src={cropData}
              alt="cropped image"
              width={240}
              height={240}
            />
          )}
        </div>
      </div>
      <br style={{ clear: 'both' }} /> */}
    </>
  );
}

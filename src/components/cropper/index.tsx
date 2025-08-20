import React, { useState, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Image from 'next/image';
import 'react-cropper/node_modules/cropperjs/dist/cropper.css';

export default function ImageCropper() {
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
    }
  };

  return (
    <>
      <div className="w-2xl">
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
      </div>
      <div>
        {/* <div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: '30%', float: 'left', height: 300 }}
          />
        </div> */}
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
      <br style={{ clear: 'both' }} />
    </>
  );
}

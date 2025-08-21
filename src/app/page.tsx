'use client';

import DragDropImage from '@/components/businessRegister';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BusinessRegistration } from '@/types/business/type';
import ImageCropper from '@/components/cropper';

export default function Home() {
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [businessInfo, setBusinesInfo] = useState<BusinessRegistration>({
    biz_id: 0,
    biz_number: '',
    biz_name: '',
    owner_name: '',
    address: '',
    biz_type: '',
    biz_subtype: '',
  });

  const [adImage, setAdImage] = useState<File[]>([]);
  const [a, setA] = useState('');

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    console.log('User ID:', userId);
    setA(userId as string);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessImage) {
      setMessage('Please select an image before submitting.');
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      const formData = new FormData();
      formData.append('file', businessImage);

      const response = await axios.post(
        ///proxy/auth/callback/kakao?code=${code}`;
        `/proxy/api/upload/image/${a}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
      setMessage('Upload successful!');
    } catch (error) {
      console.error(error);
      setMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBusinesInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const K_REDIRECT_URI = `https://frontend-five-sepia-55.vercel.app/auth/callback/kakao`;

  // const K_REDIRECT_URI = `http://localhost:3000/auth/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  console.log(adImage);

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <button
        onClick={handleKakaoLogin}
        style={{
          backgroundColor: '#FEE500',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#3C1E1E',
        }}
      >
        Login with Kakao
      </button>
      ;
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <DragDropImage onChange={(file) => setBusinessImage(file)} />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        {message && <div className="text-center text-sm mt-2">{message}</div>}
      </form>
      <section>
        <input
          type="number"
          id="biz_id"
          value={businessInfo.biz_id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="biz_number"
          value={businessInfo.biz_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="biz_name"
          value={businessInfo.biz_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="owner_name"
          value={businessInfo.owner_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="address"
          value={businessInfo.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="biz_type"
          value={businessInfo.biz_type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="biz_subtype"
          value={businessInfo.biz_subtype}
          onChange={handleInputChange}
        />
      </section>
      {/* <section className="flex flex-col gap-20">
        <ImageCropper adImages={adImage} setAdImages={setAdImage} />
        <ImageCropper adImages={adImage} setAdImages={setAdImage} />
        <ImageCropper adImages={adImage} setAdImages={setAdImage} />
        <ImageCropper adImages={adImage} setAdImages={setAdImage} />
        <div className="mt-20 flex flex-row gap-1 ">this is cropped images</div>
        {adImage &&
          adImage.map((value, index) => {
            return <img key={index} src={value} alt="" />;
          })}
      </section> */}
    </>
  );
}

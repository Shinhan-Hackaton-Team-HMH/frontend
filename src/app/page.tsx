'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Home() {
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // const [scriptLoaded, setScriptLoaded] = useState(true);

  // useEffect(() => {
  //   if (!scriptLoaded) return;

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any

  //   const run = async () => {
  //     const { MindARThree } = window.MINDAR.IMAGE; // ✅ now safe

  //    const mindarThree = new MindARThree({
  //       container: containerRef.current!,
  //       imageTargetSrc: '/targets.mind',
  //     });

  //     const { renderer, scene, camera } = mindarThree;
  //     const anchor = mindarThree.addAnchor(0);

  //     // ✅ 빨간 원 메쉬 생성
  //     const circleGeometry = new THREE.CircleGeometry(0.3, 32);
  //     const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  //     const  circleMesh: THREE.Mesh = new THREE.Mesh(circleGeometry, circleMaterial);
  //     circleMesh.visible = true; // 처음엔 숨김
  //     anchor.group.add(circleMesh);

  //         // ✅ 마커 인식되었을 때
  //     anchor.onTargetFound = () => {
  //       console.log('🎯 마커 인식됨');
  //       circleMesh.visible = true;
  //     };

  //     // ✅ 마커 사라졌을 때
  //     anchor.onTargetLost = () => {
  //       console.log('❌ 마커 사라짐');
  //       circleMesh.visible = false;
  //     };

  //     await mindarThree.start();
  //     renderer.setAnimationLoop(() => {
  //       renderer.render(scene, camera);
  //     });
  //   };

  //   run();
  //   // return () => {
  //   //   mindarThree?.stop?.();
  //   // };
  // }, [scriptLoaded]);
  // useEffect(()=>{
  //   const validImage = fetch('/api/ffmpeg?url=https://shinhan-hmh-files.s3.ap-northeast-2.amazonaws.com/0c8103f0-c958-4783-8dab-b1542c17c401_.gif')
  //   validImage
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Image validation response:', data);
  //       if (data.message) {
  //         console.error('Error:', data.message);
  //       } else {
  //         console.log('Image is valid:', data);
  //       }
  // })})

  return (
    <div className="w-full h-full relative">
      {/* <div className='w-1/2'>
      <Script
        src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image-three.prod.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('MindAR script loaded ✅');
          setScriptLoaded(true);
        }}
      />
      </div>
      <div ref={containerRef} className=" w-1/2 h-full bg-transparent" /> */}
      <div></div>
      <div className="text-Headline">this is spoqa</div>
    </div>
  );
}

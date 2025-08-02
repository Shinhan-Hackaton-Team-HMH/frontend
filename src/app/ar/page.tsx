'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
 import * as THREE from 'three';

export default function ARPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mindarThree: any;

    const run = async () => {
      const { MindARThree } = window.MINDAR.IMAGE; // ✅ now safe

      mindarThree = new MindARThree({
        container: containerRef.current!,
        imageTargetSrc: '/marker.mind',
      });

      const { renderer, scene, camera } = mindarThree;

      const anchor = mindarThree.addAnchor(0);
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      anchor.group.add(cube);

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    run();
  }, [scriptLoaded]);

  return (
    <div >
      <Script
        src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image-three.prod.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('MindAR script loaded ✅');
          setScriptLoaded(true);
        }}
      />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

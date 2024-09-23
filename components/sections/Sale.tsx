"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useInView } from 'framer-motion';
import Link from 'next/link';

const Sale = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(mountRef, { once: true });

  const leftModelRef = useRef<THREE.Object3D | null>(null);
  const rightModelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const containerWidth = mount.clientWidth;
    //console.log(containerWidth)
    const sceneWidth = containerWidth <= 1536 ? containerWidth : 1536;
    const sceneHeight = window.innerHeight >= window.innerWidth ? window.innerHeight : 744 * 1.5;
    const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sceneWidth, sceneHeight);
    mount.appendChild(renderer.domElement);

    // Add bright directional lights
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 3);
    light2.position.set(-5, 5, 5);
    scene.add(light2);

    // Load and position the left model
    if (window.innerWidth > 768) {
      loader.load('/assets/keyboard.glb', (gltf) => {
        const leftModel = gltf.scene;
        leftModel.scale.set(0.65, 0.65, 0.65); // Keep original scale
        leftModel.position.set(-2, 0, 0); // Position it to the left
        leftModel.rotation.y = THREE.MathUtils.degToRad(80); // Rotate
        leftModel.rotation.z = THREE.MathUtils.degToRad(-10); // Rotate
        leftModel.rotation.x = THREE.MathUtils.degToRad(90); // Rotate
        scene.add(leftModel);
        leftModelRef.current = leftModel;
      });
    }

    // Load and position the right model
    loader.load('/assets/keyboard.glb', (gltf) => {
      const rightModel = gltf.scene;
      rightModel.rotation.y = THREE.MathUtils.degToRad(80); // Rotate
      rightModel.rotation.z = THREE.MathUtils.degToRad(-10); // Rotate
      rightModel.rotation.x = THREE.MathUtils.degToRad(90); // Rotate
      rightModel.scale.set(0.65, 0.65, 0.65); // Keep original scale
      rightModel.position.set(2, 0, 0); // Position it to the right
      scene.add(rightModel);
      rightModelRef.current = rightModel;
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      if (isInView) {
        const leftModel = leftModelRef.current;
        const rightModel = rightModelRef.current;

        if (window.innerWidth > 768) {
          if (leftModel) {
            const leftTargetPosition = { x: -3.1, y: -1.3 };
            leftModel.position.x += (leftTargetPosition.x - leftModel.position.x) * 0.025;
            leftModel.position.y += (leftTargetPosition.y - leftModel.position.y) * 0.025;
          }

          if (rightModel) {
            const rightTargetPosition = { x: 2.9, y: 0.8 };
            rightModel.position.x += (rightTargetPosition.x - rightModel.position.x) * 0.025;
            rightModel.position.y += (rightTargetPosition.y - rightModel.position.y) * 0.025;
          }
        } else {
          if (rightModel) {
            const rightTargetPosition = { x: 1.5, y: -1};
            rightModel.position.x += (rightTargetPosition.x - rightModel.position.x) * 0.025;
            rightModel.position.y += (rightTargetPosition.y - rightModel.position.y) * 0.025;
          }

          // Remove left model if it exists
          if (leftModel) {
            scene.remove(leftModel);
            leftModelRef.current = null;
          }
        }
      }

      renderer.render(scene, camera);
    };


    animate();

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isInView]);

  return (
    <div className='max-w-[1536px] flex flex-col items-center gap-8 pt-32 mx-auto   relative' >
      <div ref={mountRef} className='absolute w-full top-0 md:top-[-400px] left-0'/>

      <h2 className='text-4xl md:text-5xl font-bold text-center'>Limited collection<br /> for sale</h2>
      
      <p className='uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent'>
        discounts up to 30%
      </p>

      <Link href='#preview' className='w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient'>
        Buy keyboard
      </Link>
    </div>
  );
};

export default Sale
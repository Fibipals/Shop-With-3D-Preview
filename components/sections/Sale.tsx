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
    const sceneWidth = window.innerWidth <= 1536 ? window.innerWidth : 1536;
    const sceneHeight = window.innerHeight >= window.innerWidth ? window.innerHeight : 744 * 1.5;
    const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    <div className='max-w-[1536px] flex flex-col items-center gap-8 relative pt-32 mx-auto' >
      <div ref={mountRef} className='absolute top-0 md:top-[-400px] left-0'/>
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

export default Sale;


/*"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useInView } from 'framer-motion';
import Logo from '../Logo';

const Sale = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const leftModelRef = useRef<THREE.Object3D | null>(null);
  const rightModelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load the left keyboard model
    loader.load('/assets/keyboard.glb', (gltf) => {
      const leftModel = gltf.scene;
      leftModelRef.current = leftModel;
      leftModel.scale.set(2, 2, 2); // Adjust the scale as needed
      leftModel.position.set(-5, -5, 0); // Initial position off-screen to the left
      leftModel.rotation.y = THREE.MathUtils.degToRad(80);
      leftModel.rotation.z = THREE.MathUtils.degToRad(-10); // Rotate by 90 degrees around Z-axis
      leftModel.rotation.x = THREE.MathUtils.degToRad(90); 
      scene.add(leftModel);
    });

    // Load the right keyboard model
    loader.load('/assets/keyboard.glb', (gltf) => {
      const rightModel = gltf.scene;
      rightModelRef.current = rightModel;
      rightModel.scale.set(2, 2, 2); // Adjust the scale as needed
      rightModel.position.set(5, 5, 0); // Initial position off-screen to the right
      rightModel.rotation.y = THREE.MathUtils.degToRad(80); // Rotate by 90 degrees around Z-axis
      rightModel.rotation.z = THREE.MathUtils.degToRad(-10);
      rightModel.rotation.x = THREE.MathUtils.degToRad(90);
      scene.add(rightModel);
    });

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);

      if (leftModelRef.current && rightModelRef.current) {
        if (isInView) {
          leftModelRef.current.position.x += (0 - leftModelRef.current.position.x) * 0.05; // Animate to final position
          leftModelRef.current.position.y += (-1 - leftModelRef.current.position.y) * 0.05; // Adjust y position for left model

          rightModelRef.current.position.x += (0 - rightModelRef.current.position.x) * 0.05; // Animate to final position
          rightModelRef.current.position.y += (1 - rightModelRef.current.position.y) * 0.05; // Adjust y position for right model
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
    <div className='max-w-[1024px] mx-auto flex flex-col items-center gap-8 relative pt-32'>
      <div ref={ref} style={{ width: '100%', height: '500px', position: 'relative' }}></div>
      <Logo />
      <h2 className='text-5xl font-bold text-center'>Limited collection<br /> for sale</h2>
      <p className='uppercase text-sm font-bold bg-gradient-to-br from-rose-500 to-fuchsia-900 bg-clip-text text-transparent'>
        discounts up to 30%
      </p>
      <div className='w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient-to-br from-rose-500 to-fuchsia-900'>
        Buy keyboard
      </div>
    </div>
  );
};

export default Sale;
*/
/*"use client"

import { motion, useInView } from 'framer-motion';
import Logo from '../Logo'
import { useRef } from 'react';

const Sale = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className='max-w-[1024px] mx-auto flex flex-col items-center gap-8 relative pt-32'>
      <motion.img
        src='/assets/3Dkeyboard.png'
        alt='Keyboard Left'
        ref={ref}
        initial={{ x: '-100%', opacity: 0, y: '100%' }} // Start position
        animate={{ x: isInView ? '-50%' : '-100%', opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }} // Animated position
        transition={{ duration: 5.7, ease: 'easeOut' }}
        className='absolute left-0 bottom-[-200px] z-0' // Adjust positioning
        style={{ width: '500px', height: 'auto' }} // Control image size
      />
      <motion.img
        src='/assets/3Dkeyboard.png'
        alt='Keyboard Right'
        ref={ref}
        initial={{ x: '100%', opacity: 0, y: '-100%' }} // Start position
        animate={{ x: isInView ? '50%' : '100%', opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }} // Animated position
        transition={{ duration: 5.7, ease: 'easeOut' }}
        className='absolute right-0 bottom-0' // Adjust positioning
        style={{ width: '500px', height: 'auto' }} // Control image size
      />
      <Logo />
      <h2 className='text-5xl font-bold text-center'>Limited collection<br /> for sale</h2>
      <p className='uppercase text-sm font-bold bg-gradient-to-br from-rose-500 to-fuchsia-900 bg-clip-text text-transparent'>
        discounts up to 30%
      </p>
      <div className='w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient-to-br from-rose-500 to-fuchsia-900'>
        Buy keyboard
      </div>
    </div>
  );
};

export default Sale;*/
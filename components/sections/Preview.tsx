"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ProductType } from './Catalog';

interface PreviewProps {
    selectedProduct: ProductType | null;
}

const Preview = ({ selectedProduct }: PreviewProps) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);
    const rotationRef = useRef<number>(0);
    const isTouchDownRef = useRef<boolean>(false);
    const touchStartXRef = useRef<number>(0);
    const touchStartRotationRef = useRef<number>(0);
    const isMouseDownRef = useRef<boolean>(false); // To keep track of the current rotation
    const mouseInsideRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount || !selectedProduct) return;

        const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const containerWidth = mount.clientWidth;
        const sceneWidth = containerWidth <= 1536 ? containerWidth : 1536;
        const sceneHeight = window.innerWidth <= window.innerHeight ?  window.innerWidth : window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sceneWidth, sceneHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Rotate the entire scene by 30 degrees towards the viewer
        scene.rotation.x = THREE.MathUtils.degToRad(60);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Soft white light
        scene.add(ambientLight);

         // Add directional lights from multiple angles
         const directionalLightTop = new THREE.DirectionalLight(0xffffff, 1);
         directionalLightTop.position.set(5, 10, 7.5); // Top light
         scene.add(directionalLightTop);
 
         const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 1);
         directionalLightLeft.position.set(-10, 5, 0); // Left side light
         scene.add(directionalLightLeft);
 
         const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1);
         directionalLightRight.position.set(10, 5, 0); // Right side light
         scene.add(directionalLightRight);

       

        const loadModel = (modelSrc: string) => {
            loader.load(modelSrc, (gltf) => {
                // Remove the previous model if it exists
                if (modelRef.current) {
                    scene.remove(modelRef.current);
                }

                const model = gltf.scene;
                model.scale.set(1, 1, 1);
                model.position.set(0, 12, -2);
                scene.add(model);
                modelRef.current = model; // Store the new model
            });
        };

        // Load the model for the selected product
        if (selectedProduct) {
            loadModel(selectedProduct.modelSrc);
        }

        camera.position.z = 5;

        // Gravity and bouncing variables
        const gravity = 0.002; // Gravity strength
        const bounceFactor = 0.3; // How much it bounces back
        let velocityY = 0;
        const groundY = 0; // Ground level
        let isBouncing = false;

        const startAnimation = () => {
            const animate = () => {
                requestAnimationFrame(animate);

                if (modelRef.current) {
                    // Apply gravity
                    velocityY -= gravity;
                    modelRef.current.position.y += velocityY;

                    // Check if the model hits the ground
                    if (modelRef.current.position.y <= groundY) {
                        modelRef.current.position.y = groundY; // Reset to ground level
                        velocityY *= -bounceFactor; // Invert velocityY for bouncing effect
                        isBouncing = true; // Mark as bouncing
                    } else {
                        isBouncing = false; // Not bouncing
                    }

                    // Optionally reduce bounce velocityY over time
                    if (Math.abs(velocityY) < 0.01 && isBouncing) {
                        velocityY = 0;
                    }
                }

                renderer.render(scene, camera);
            };

            animate();
        };

        // Start animation after a delay
        const animationDelay = 200; // 0.2 seconds
        setTimeout(startAnimation, animationDelay);

        const handleMouseMove = (event: MouseEvent) => {
            if (modelRef.current && mouseInsideRef.current && isMouseDownRef.current) {
              const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
              modelRef.current.rotation.y = mouseX * Math.PI;
              rotationRef.current = modelRef.current.rotation.y;
            }
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (modelRef.current && isTouchDownRef.current) {
                const touchX = event.touches[0].clientX;
                const deltaX = touchX - touchStartXRef.current;
                modelRef.current.rotation.y = touchStartRotationRef.current + deltaX * 0.01;
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (modelRef.current) {
                isTouchDownRef.current = true;
                touchStartXRef.current = event.touches[0].clientX;
                touchStartRotationRef.current = modelRef.current.rotation.y;
            }
        };

        const handleTouchEnd = () => {
            isTouchDownRef.current = false;
        };

        const handleMouseDown = () => {
            isMouseDownRef.current = true;
        };

        const handleMouseUp = () => {
            isMouseDownRef.current = false;
        };
      
        const handleMouseEnter = () => {
            mouseInsideRef.current = true;
        };
      
        const handleMouseLeave = () => {
            mouseInsideRef.current = false;
            if (modelRef.current) {
              // Animate rotation back to 0
                const animateRotationBack = () => {
                    if (modelRef.current) {
                        if (Math.abs(modelRef.current.rotation.y) > 0.01) {
                          // Adjust the rotation back towards 0
                          modelRef.current.rotation.y -= (modelRef.current.rotation.y * 0.01);
                          requestAnimationFrame(animateRotationBack);
                        } else {
                          // Ensure rotation is exactly 0
                          modelRef.current.rotation.y = 0;
                        }
                      }
                };
      
              animateRotationBack();
            }
        };
      
        mount.addEventListener('mousemove', handleMouseMove);
        mount.addEventListener('mousedown', handleMouseDown);
        mount.addEventListener('mouseup', handleMouseUp);
        mount.addEventListener('mouseenter', handleMouseEnter);
        mount.addEventListener('mouseleave', handleMouseLeave);

        mount.addEventListener('touchstart', handleTouchStart);
        mount.addEventListener('touchmove', handleTouchMove);
        mount.addEventListener('touchend', handleTouchEnd);
    
        startAnimation();
    
        return () => {
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
            mount.removeEventListener('mousemove', handleMouseMove);
            mount.removeEventListener('mousedown', handleMouseDown);
            mount.removeEventListener('mouseup', handleMouseUp);
            mount.removeEventListener('mouseenter', handleMouseEnter);
            mount.removeEventListener('mouseleave', handleMouseLeave);

            mount.removeEventListener('touchstart', handleTouchStart);
            mount.removeEventListener('touchmove', handleTouchMove);
            mount.removeEventListener('touchend', handleTouchEnd);
        };
    }, [selectedProduct]);

    return (
        <div ref={mountRef} className='w-full h-[400px] md:h-[80vh] pt-8 md:pt-0' />
    );
};

export default Preview;
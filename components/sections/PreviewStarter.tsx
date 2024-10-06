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
    
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        //const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const sceneWidth = mount.clientWidth
        const sceneHeight = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sceneWidth, sceneHeight);
        renderer.setAnimationLoop( animate );
        
        //renderer.setPixelRatio(window.devicePixelRatio);
        //renderer.setClearColor(0x000000, 0);

        mount.appendChild(renderer.domElement);

        // Rotate the entire scene by 30 degrees towards the viewer
        //scene.rotation.x = THREE.MathUtils.degToRad(60);

        // Add ambient light
        
        {/*const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Soft white light
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
         scene.add(directionalLightRight);*/}

       

    
        {/*loader.load("", (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.set(0, 12, -2);
            scene.add(model);
        });*/}
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        //const cube = new THREE.Mesh( geometry, material );
        //scene.add( cube );

        for (let i = 0; i < 10; i++) { // Change the number for more or fewer cubes
            const cube = new THREE.Mesh(geometry, material);
            // Random positions
            cube.position.set(
                (Math.random() - 0.5) * 10, // Random x position between -5 and 5
                (Math.random() - 0.5) * 10, // Random y position between -5 and 5
                (Math.random() - 0.5) * 10  // Random z position between -5 and 5
            );
            scene.add(cube);
        }

        camera.position.z = 9;

        function animate() {
            // Rotate all cubes
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.rotation.x += 0.01;
                    object.rotation.y += 0.01;
                }
            });

            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);
        {/*function animate() {

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        
            renderer.render( scene, camera );
        
        }*/}

       
        return () => {
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={mountRef} className='w-full h-[400px] md:h-[80vh] pt-8 md:pt-0' />
    );
};

export default Preview;
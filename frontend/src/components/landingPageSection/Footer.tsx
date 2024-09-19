import {
  PresentationControls,
  SpotLight,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import Heading from "../design/Heading";
import Button from "../utils/Button";
import { socials } from "../../constants";
import { BackgroundBeams } from "../ui/background-beams";

const BugModel = (props: any) => {
  const { scene, animations } = useGLTF(`/hunter2.glb`);
  const mixer = useRef<THREE.AnimationMixer | undefined>(undefined);

  if (animations && animations.length && !mixer.current) {
    mixer.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => {
      mixer.current!.clipAction(clip).play();
    });
  }

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });
  return (
    <>
      <ambientLight
      // intensity={0.9}
      />
      <directionalLight
      // position={[0, 10, 0]} intensity={1}
      />
      <primitive object={scene} dispose={null} {...props} />;
    </>
  );
};

const Footer = () => {
  return (
    <div className="relative">
      <div className=" relative flex justify-center items-center -mt-[15rem] md:-mt-[4rem] lg:mt-[3rem]">
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ fov: 45 }}
          style={{
            width: `100%`,
            height: `50rem`,
            zIndex: "1",
          }}
        >
          <PresentationControls
            speed={1.5}
            zoom={0.5}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage shadows environment={null}>
              <BugModel scale={0.7} />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
      <div className="relative flex justify-center flex-col items-center -mt-[12rem] md:mt-[5rem]">
        <Heading
          className="text-center max-w-[25rem] px-8 md:px-0"
          title="Become a bounty"
          span=" hunter today"
        />
        <div className="  md:mt-[2rem] flex items-center">
          <Button
            onClick={() => console.log("clicked ")}
            className="z-10 right  font-bold uppercase"
            href="/pricing"
            // white
          >
            Get started
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-[5rem] items-center flex sm:justify-between p-4 justify-center gap-10 max-sm:flex-col ">
        <p className="caption text-color-7 lg:block">
          ©{new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center w-10 h-10 bg-n-7 justify-center rounded-full transition-colors hover:bg-n-6 "
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Footer;

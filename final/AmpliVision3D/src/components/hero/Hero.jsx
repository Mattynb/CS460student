import { Canvas } from "@react-three/fiber";
import "./hero.css";
import Speech from "./Speech";
import { motion } from "motion/react";
import Shape from "./Shape";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

const awardVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const followVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="hSection left">
        {/* TITLE */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hTitle"
        >
          What is,
          <br />
          <span>AmpliVision?</span>
        </motion.h1>
        {/* AWARDS */}
        <motion.div
          variants={awardVariants}
          initial="initial"
          animate="animate"
          className="awards"
        >
          <motion.h2 variants={awardVariants}>Project Affiliations</motion.h2>
          <motion.p variants={awardVariants}>
            AmpliVision is a project proudly affiliated with:
          </motion.p>
          <motion.div variants={awardVariants} className="awardList">
            <a href="https://blogs.umb.edu/kimhamad/">
              <motion.img variants={awardVariants} src="/umb.png" alt="" />
            </a>
            <a href="https://umb-dfhcc.org/">
            <motion.img variants={awardVariants} src="/u54.png" alt="" />
            </a>
            <a href="https://abrcms.org/wp-content/uploads/2024/11/ABRCMS-2024-Awardee-List.pdf">
            <motion.img variants={awardVariants} src="/ABRCMS.jpeg" alt="" />
            </a>
            <a href="https://urtc.mit.edu/">
            <motion.img variants={awardVariants} src="/urtc.png" alt="" />          
            </a>
          </motion.div>
        </motion.div>
        {/* SCROLL SVG */}
        <motion.a
          animate={{ y: [0, 5], opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          href="#services"
          className="scroll"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
              stroke="white"
              strokeWidth="1"
            />
            <motion.path
              animate={{ y: [0, 5] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              d="M12 5V8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.a>
        <div>
        Webpage Design Inspired/Sourced From <a href="https://www.youtube.com/watch?v=KGCMSaEWPVs" style={ {color: "Red"} }>LamaDev</a>
        </div>
  
      </div>
      <div className="hSection right">
        {/* FOLLOW */}
        <motion.div
          variants={followVariants}
          initial="initial"
          animate="animate"
          className="follow"
        >
          <motion.a variants={followVariants} href="https://github.com/Mattynb/AmpliVision">
            <img src="/github.png" alt="" />
          </motion.a>
          <motion.a variants={followVariants} href="https://mattynb.github.io/AmpliVision/docs/">
            <img src="/docs.png" alt="" />
          </motion.a>
          {/*
          <motion.a variants={followVariants} href="/">
            <img src="/youtube.png" alt="" />
          </motion.a>
          */}
          <motion.div variants={followVariants} className="followTextContainer">
            <div className="followText">LINKS</div>
          </motion.div>
        </motion.div>
        {/* BUBBLE */}
        <Speech />
        
        {/* CERTIFICATE */}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className="certificate"
        >
          <img src="/award.png" alt="" />
          OPEN SOURCE
        </motion.div>
      {/* CONTACT BUTTON */}
      <motion.a
          href="https://www.linkedin.com/in/matheusnberbet/"
          className="contactLink"
          animate={{
            x: [200, 0],
            opacity: [0, 1],
          }}
          transition={{
            duration: 2,
          }}
        >
          <motion.div
            className="contactButton"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 200 200" width="150" height="150">
              <circle cx="100" cy="100" r="90" fill="white" />
              <path
                id="innerCirclePath"
                fill="none"
                d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
              <text className="circleText">
                <textPath href="#innerCirclePath">Contact Me •</textPath>
              </text>
              <text className="circleText">
                <textPath href="#innerCirclePath" startOffset="50%">
                  Contact Me •
                </textPath>
              </text>
            </svg>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                stroke="black"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </div>
          </motion.div>
      </motion.a>
      
      </div>
      
      <div className="bg">
        {/* 3d */}
        <Canvas>
          <Suspense fallback="loading...">
            <Shape />
          </Suspense>
        </Canvas>
        <div className="hImg">

          {// load 3d gltf model here 
          }
          <RobotCanvas/>
        </div>
      </div>
    </div>
  );
};

const RobotCanvas = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Robot />
      </Suspense>
    </Canvas>
  );
}

const Robot = () => {
  const bot = useGLTF("/robot.glb");
  return (
    <mesh>
      <spotLight 
        intensity={50}
        position={[0, 5, 10]}
      />
      <primitive 
        object={bot.scene}
        scale={2.5}
        position-y={0} 
        rotation-y={Math.PI / 9}
      />
    </mesh>
  );
}

export default Hero;

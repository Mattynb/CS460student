import Counter from "./Counter";
import "./services.css";
import { color, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const textVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const services = [
  {
    id: 1,
    img: "/service1.png",
    title: "Ampli Readout Automation",
  },
  {
    id: 2,
    img: "/service2.png",
    title: "Train and Predict Results",
  },
  {
    id: 3,
    img: "/service3.png",
    title: "Spot Outliers",
  },
];

const Services = () => {
  const [currentServiceId, setCurrentServiceId] = useState(1);
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  return (
    <div className="services" ref={ref}>
      <div className="sSection left">
        <motion.h1
          variants={textVariants}
          animate={isInView ? "animate" : "initial"}
          className="sTitle"
        >
          How does AmpliVision help?
        </motion.h1>
        <motion.div
          variants={listVariants}
          animate={isInView ? "animate" : "initial"}
          className="serviceList"
        >
          {services.map((service) => (
            <motion.div
              variants={listVariants}
              className="service"
              key={service.id}
              onClick={() => setCurrentServiceId(service.id)}
            >
              <div className="serviceIcon">
                <img src={service.img} alt="" />
              </div>
              <div className="serviceInfo">
                <h2>{service.title}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="sSection right">
        {currentServiceId === 1 ? (
          <div className="serviceInfo" style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
              paddingTop: "10rem",
            }
          }>
            <h2>
            <a href="https://pubmed.ncbi.nlm.nih.gov/29766658/" style={{color: "cyan"}}> AMPLI </a> 
            is a reconfigurable rapid test system. Similar to a <b>pregnancy test</b> or <b>covid tests</b>, the AMPLI test is a paper-based device that changes color in the presence of a target molecule.
            <br/>
            <br/>
            <b>AmpliVision</b> is able to load and process AMPLI
            rapid test images from a specified folder, find the grid and Ampli blocks in the image, read the diagnostic result for each Ampli block.
            </h2>
          </div>
        ) : currentServiceId === 2 ? (
          <div className="serviceInfo" style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
              paddingTop: "10rem",
            }
          }>
            <h2>
            Based on the readout results, <b>AmpliVision</b> is able to generate a synthetic dataset of AMPLI images and train a Convolutional Neural Network (CNN) to classify the diagnostic result of each Ampli block.
            </h2>
          </div>
        ) : currentServiceId === 3 ? (
          <div className="serviceInfo" style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
              paddingTop: "10rem",
            }
          }>
            <h2>
            <b>AmpliVision</b> is able to spot outliers in the diagnostic results of the Ampli blocks using the
            <a href="https://github.com/mpsych/ODM" style={{color: "cyan"}}> ODMammogram </a> outlier detection pipeline.
            <br/>
            <br/>
            Outliers are Ampli blocks with diagnostic results that are significantly different from the generated training set. 
            <br/>
            <br/>
            Outliers can indicate errors in the test procedure or 
            <a href="https://github.com/mpsych/ODM" style={{color: "cyan"}}>target mutations</a>.
            </h2>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Services;

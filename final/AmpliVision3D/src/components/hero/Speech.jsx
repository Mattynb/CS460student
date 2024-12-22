import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";

const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            "Open Source Program to Automate AMPLI Rapid Test Workflows",
            1000,
            "Automatic Colorimetric Scanning, CNN Classification, and Outlier Detection",
            1000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          // omitDeletionAnimation
          repeat={Infinity}
        />
      </div>
      <img src="https://matheusberbet.site/assets/profile-DhiOsbuD.png" alt="" />
    </motion.div>
  );
};

export default Speech;

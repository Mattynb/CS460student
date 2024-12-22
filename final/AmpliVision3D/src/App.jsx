import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import AmpliPainter from "./components/AmpliPainter";

import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";

const App = () => {
  return (
    <>
    <div className="container">
      <section id="#home">
        <Hero />
      </section>
      <section id="#services">
        <Services />
      </section>{" "}
    </div>
    <section id="#painter" style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
      <h1 style={{alignSelf: "center", width: "70vw"}}> 
        In one more scroll down, You will see a tool to design and visualize your own AMPLI tests! Here are the controls:</h1>
      <img src="controls.png"  style={{alignSelf: "center",  width: "70vw" }} />
    </section>
    <section id="#painter">
      <button>
      <AmpliPainter />
      </button>
    </section>
    </>
  );
};

export default App;

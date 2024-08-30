import React, { Suspense, lazy } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import bg from "../assets/bg.webp";
import Loader from "./Loader";

// Lazy load the Carddisplay component
const Carddisplay = lazy(() => import("./Carddisplay"));

export default function Home() {
  const handleGetStartedClick = () => {
    // Smooth scroll to the Carddisplay section
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello Coders</h1>
            <p className="mb-5">
              Documenting my coding experiences and solutions to real-world
              problems.
            </p>
            <Link onClick={handleGetStartedClick} className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <br />
      <Link
        to="/getpost"
        className="text-2xl underline p-5 font-mono font-bold"
      >
        Recent Articles ...
      </Link>
      {/* Use Suspense to show a loader while Carddisplay is loading */}
      <Suspense fallback={<Loader />}>
        <Carddisplay />
      </Suspense>
      {/* <Stat /> */}
      <Footer />
    </>
  );
}

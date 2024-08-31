"use client";
import { useEffect } from "react";
// import "@photo-sphere-viewer/core/"; // Import the CSS
import { Viewer } from "@photo-sphere-viewer/core/";
import "@photo-sphere-viewer/core/index.css";
const PhotoSphereViewer = () => {
  // const { Viewer } = require("@photo-sphere-viewer/core"); // Lazy load the Viewer module
  useEffect(() => {
    const viewer = new Viewer({
      container: "#viewer",
      caption: "Bohol Trip",
      panorama: "/img_6759.jpg",
      navbar: ["caption", "fullscreen", "download"], // Update the path as needed
    });

    return () => {
      // Cleanup logic if needed
      viewer.destroy();
    };
  }, []);

  return <div id="viewer" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default PhotoSphereViewer;

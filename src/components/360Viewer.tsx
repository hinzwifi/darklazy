"use client";
import { useEffect } from "react";
// import "@photo-sphere-viewer/core/"; // Import the CSS
import { Viewer } from "@photo-sphere-viewer/core/";
import "@photo-sphere-viewer/core/index.css";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
const PhotoSphereViewer = () => {
  // const { Viewer } = require("@photo-sphere-viewer/core"); // Lazy load the Viewer module
  useEffect(() => {
    const viewer = new Viewer({
      container: "#viewer",
      caption: "Bohol Trip",
      panorama: "/img_6759.jpg",
      navbar: ["caption", "fullscreen", "download"],
      plugins: [GyroscopePlugin], // Update the path as needed
    });

    return () => {
      // Cleanup logic if needed
      viewer.destroy();
    };
  }, []);

  return <div id="viewer" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default PhotoSphereViewer;
// import { useEffect } from "react";
// import View360, { EquirectProjection } from "@egjs/view360";
// import { ControlBar } from "@egjs/view360";

// const View360Viewer = () => {
//   useEffect(() => {
//     // Wait until the component is fully rendered
//     const viewerElement = document.querySelector("#viewer") as HTMLElement;

//     if (viewerElement) {
//       const viewer = new View360(viewerElement, {
//         projection: new EquirectProjection({
//           src: "/img_6759.jpg", // Replace with your actual image path
//           video: false, // Set to true if you're displaying a video
//         }),
//       });
//       viewer.addPlugins(
//         new ControlBar({
//           gyroButton: {
//             position: ControlBar.POSITION.TOP_RIGHT,
//             order: 0,
//           },
//         })
//       );

//       return () => {
//         // Clean up the viewer on component unmount
//         viewer.destroy();
//       };
//     }
//   }, []);

//   return (
//     <div
//       id="viewer"
//       style={{ width: "100vw", height: "100vh", position: "relative" }}
//     >
//       <canvas style={{ width: "100%", height: "100%" }}></canvas>
//     </div>
//   );
// };

// export default View360Viewer;

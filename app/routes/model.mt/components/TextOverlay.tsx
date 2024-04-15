import React from "react";

const OCRTextOverlay = ({ imageUrl, textData }) => {
  // Placeholder for image dimensions; adjust as necessary for your use case
  const newTextData = textData.slice(1);
  return (
    <div style={{ position: "relative", width: "100vh" }}>
      <img
        src={imageUrl}
        alt="Background"
        style={{ maxWidth: "100%", objectFit: "contain" }}
      />
      {newTextData.map((item, index) => {
        const vertices = item.boundingPoly.vertices;
        const x = vertices[0].x; // Using the first vertex as the reference point
        const y = vertices[0].y;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              userSelect: "text",
              backdropFilter: "blur(10px)",
            }}
            className="font-monlam"
          >
            {item.description}
          </div>
        );
      })}
    </div>
  );
};

export default OCRTextOverlay;

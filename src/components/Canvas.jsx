"use client";

import scroll from '../styles/Scroll.module.css';
import { useState, useEffect, useRef } from 'react';

const Canvas = () => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [hullGenerated, setHullGenerated] = useState(false); // Track if hull is generated
  const canvasRef = useRef(null);

  const handleCanvasClick = (event) => {
    if (hullGenerated) return; // Prevent adding points after hull is generated

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const generateConvexHull = () => {
    if (points.length < 3) {
      alert('At least 3 points are required to form a convex hull');
      return;
    }

    const sortedPoints = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
    const upperHull = [];
    const lowerHull = [];

    // Build the lower hull
    for (const point of sortedPoints) {
      while (lowerHull.length >= 2 && crossProduct(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], point) <= 0) {
        lowerHull.pop();
      }
      lowerHull.push(point);
    }

    // Build the upper hull
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
      const point = sortedPoints[i];
      while (upperHull.length >= 2 && crossProduct(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], point) <= 0) {
        upperHull.pop();
      }
      upperHull.push(point);
    }

    // Remove the last point of each half because it's repeated at the beginning of the other half
    upperHull.pop();
    lowerHull.pop();

    setHull([...lowerHull, ...upperHull]);
    setHullGenerated(true); // Mark hull as generated
  };

  const crossProduct = (p1, p2, p3) => {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  };

  const animateHullDrawing = (ctx, points) => {
    let i = 0;
    const delay = 200; // Adjust delay for slower animation
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    const drawLine = () => {
      if (i < points.length) {
        const start = points[i];
        const end = points[(i + 1) % points.length];
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        i++;
        setTimeout(() => {
          requestAnimationFrame(drawLine);
        }, delay);
      }
    };

    drawLine();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    });

    // Draw convex hull with animation
    if (hull.length > 0) {
      animateHullDrawing(ctx, hull);
    }
  }, [points, hull]);

  const clearCanvas = () => {
    setPoints([]);
    setHull([]);
    setHullGenerated(false); // Allow adding points again
  };

  return (
    <div>
      <div className="flex flex-col">
        <canvas
          ref={canvasRef}
          width="1000vw"
          height="600vh"
          className="border-gray-900 rounded-lg border-2 mb-4 bg-gray-100"
          onClick={handleCanvasClick}
        />
        <div className="flex flex-row space-x-4 justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
            onClick={generateConvexHull}
          >
            Generate Convex Hull
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full mb-4"
            onClick={clearCanvas}
          >
            Clear Canvas
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-start space-x-8 text-black">
        <div className="{scroll.scrollable} bg-white mb-4 border border-black rounded-xl w-44">
          <h3 className="text-xl font-bold bg-gray-300 mb-2 py-3 rounded-t-xl">Points:</h3>
          <ul className="list-disc list-inside h-60 overflow-auto">
            {points.map((point, index) => (
              <li key={index}>{`(${point.x}, ${point.y})`}</li>
            ))}
          </ul>
        </div>
        <div className='{scroll.scrollable} bg-white mb-4 border border-black rounded-xl w-44'>
          <h3 className="text-xl font-bold bg-gray-300 mb-2 py-3 rounded-t-xl">Convex Hull:</h3>
          <ul className="list-disc list-inside h-60 overflow-auto">
            {hull.map((point, index) => (
              <li key={index}>{`(${point.x}, ${point.y})`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

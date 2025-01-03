import React, { useState, useEffect } from "react";
import "./App.css";

interface Position {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    const moveSnake = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newX = Math.max(0, Math.min(screenWidth - 50, position.x + (Math.random() * 100 - 50)));
      const newY = Math.max(0, Math.min(screenHeight - 50, position.y + (Math.random() * 100 - 50)));

      setPosition({ x: newX, y: newY });
    };

    const interval = setInterval(moveSnake, 100);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <div className="game-container">
      <div
        className="snake"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
    </div>
  );
};

export default App;
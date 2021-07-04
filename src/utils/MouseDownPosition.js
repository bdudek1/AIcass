import { useState, useEffect } from "react";

const useMouseDownPosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousedown", updateMousePosition);

    return () => window.removeEventListener("mousedown", updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMouseDownPosition;
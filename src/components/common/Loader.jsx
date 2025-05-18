import React, { useState, useEffect } from "react";

const LoadingText = ({ letter, index }) => {
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlur((prevBlur) => (prevBlur === 0 ? 4 : 0));
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      className="inline-block mx-1 text-white font-sans"
      style={{
        filter: `blur(${blur}px)`,
        animation: `blurText 1.5s ${index * 0.2}s infinite linear alternate`,
      }}
    >
      {letter}
    </span>
  );
};

const Loader = () => {
  const letters = "LOADING".split("");

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full h-24 leading-24 text-center">
        {letters.map((letter, index) => (
          <LoadingText key={index} letter={letter} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Loader;

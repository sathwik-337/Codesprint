import React, { useEffect, useRef, useState, useCallback } from "react";

const Home = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const hackathonDate = new Date("2025-09-15T09:00:00").getTime();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    const particles = Array.from({ length: windowSize.width < 640 ? 30 : 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [windowSize]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hackathonDate]);

  // Split text for animation
  const title = "CODESPRINT".split("");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-black font-sans">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Content */}
      <div className="relative text-center z-10 px-4 w-full max-w-6xl mx-auto">
        {/* Main Heading with letter animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold italic text-white tracking-wide flex flex-wrap justify-center">
          {title.map((char, index) => (
            <span
              key={index}
              className="opacity-0 animate-fadeIn"
              style={{ 
                animationDelay: `${index * 0.2}s`, 
                animationFillMode: "forwards" 
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl text-gray-200">
          24 Hours Ultimate Challenge
        </p>

        {/* Countdown Title */}
        <h2 className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Race Begins In
        </h2>

        {/* Countdown Timer Boxes */}
        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 justify-center">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center bg-neutral-900/80 backdrop-blur-md border border-red-500/20 rounded-lg sm:rounded-xl md:rounded-2xl px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 shadow-lg"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-none">
                {value}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 uppercase tracking-widest font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-center">
          <a
            href="/register"
            className="px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-red-600 rounded-lg sm:rounded-xl hover:bg-red-700 transition-all duration-300"
          >
            Register
          </a>
          <a
            href="/brochure.pdf"
            download
            className="px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-gray-800 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300"
          >
            Download Brochure
          </a>
        </div>
      </div>

      {/* Fade-in animation CSS */}
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Home;
import React, { useEffect, useRef } from "react";
import {
  Zap,
  Wifi,
  Plug,
  Utensils,
  Coffee,
  Monitor,
  Bed,
  ShowerHead,
  Plus,
  Cpu,
  CupSoda,
  Home,
} from "lucide-react";

const WhatWeProvide = () => {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);

  // Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: "Technical Provisions",
      icon: <Cpu className="w-12 h-12 text-purple-400" />,
      points: [
        {
          icon: <Zap className="w-5 h-5 text-pink-400" />,
          text: "Reliable power supply for all devices.",
        },
        {
          icon: <Wifi className="w-5 h-5 text-blue-400" />,
          text: "High-speed WiFi and Ethernet access for seamless online activities.",
        },
        {
          icon: <Plug className="w-5 h-5 text-green-400" />,
          text: "Sufficient power outlets and extension cords available for convenience.",
        },
      ],
      animation: "slide-in-left",
    },
    {
      title: "Catering and Refreshments",
      icon: <CupSoda className="w-12 h-12 text-yellow-400" />,
      points: [
        { icon: <Utensils className="w-5 h-5 text-orange-400" />, text: "Catered meals provided." },
        { icon: <Coffee className="w-5 h-5 text-yellow-400" />, text: "Scheduled snack breaks." },
      ],
      animation: "slide-in-bottom",
    },
    {
      title: "Workspace and Accommodation",
      icon: <Home className="w-12 h-12 text-blue-400" />,
      points: [
        { icon: <Monitor className="w-5 h-5 text-purple-400" />, text: "Equipped classrooms." },
        { icon: <Bed className="w-5 h-5 text-pink-400" />, text: "Rest areas with pillows." },
        { icon: <ShowerHead className="w-5 h-5 text-teal-400" />, text: "Clean hygiene facilities." },
        { icon: <Plus className="w-5 h-5 text-red-400" />, text: "On-site medical assistance." },
      ],
      animation: "slide-in-right",
    },
  ];

  return (
    <section
      id="what-we-provide"
      className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold italic mb-16  text-white">
          What We Provide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 translate-y-10 ${card.animation}`}
            >
              <div className="flex justify-center mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>
              <ul className="space-y-3 text-left">
                {card.points.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-300">
                    {point.icon}
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .slide-in-left {
          transform: translateX(-50px);
        }
        .slide-in-right {
          transform: translateX(50px);
        }
        .slide-in-bottom {
          transform: translateY(50px);
        }
        .animate-slide-in {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
          transition: all 1s ease;
        }
      `}</style>
    </section>
  );
};

export default WhatWeProvide;

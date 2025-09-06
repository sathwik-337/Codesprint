// src/Sections/EventSchedule.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Round 1: Problem Statement",
    description:
      "In this round, participants will receive detailed problem statements that they will tackle throughout the hackathon. Each statement presents a unique challenge designed to inspire creativity and collaboration among teams.",
  },
  {
    id: 2,
    title: "Day 1: Hackathon Begins",
    description:
      "The hackathon officially kicks off! Teams will start brainstorming and developing their ideas into workable solutions. Mentors will be available throughout the day to provide guidance and support to all participants.",
  },
  {
    id: 3,
    title: "Day 2: Presentation Round",
    description:
      "On the second day, teams will finalize their projects and prepare for the presentation round. Each team will have the opportunity to showcase their innovative solutions to a panel of judges and fellow participants.",
  },
  {
    id: 4,
    title: "Evaluation & Judging",
    description:
      "Judges will evaluate each team's solutions based on creativity, feasibility, and impact. Feedback will be provided to help participants grow and refine their projects.",
  },
  {
    id: 5,
    title: "Winner Announcement",
    description:
      "Winners will be announced, and prizes will be distributed to celebrate the most innovative solutions. A closing ceremony will follow with acknowledgments and group photos.",
  },
  {
    id: 6,
    title: "Networking & Wrap-Up",
    description:
      "After the hackathon concludes, participants will have an opportunity to network with peers, mentors, and industry experts, building connections for future collaborations.",
  },
];

const EventSchedule = () => {
  const canvasRef = useRef(null);
  const lineRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
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
        ctx.fillStyle = "rgba(255,255,0,0.4)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll progress for line fill
  useEffect(() => {
    const handleScroll = () => {
      const section = lineRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - rect.top) / rect.height)
        );
        setScrollHeight(progress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-black text-white py-12 md:py-20 overflow-hidden">
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold italic text-center mb-10 md:mb-16 z-10 relative px-4">
        Event <span className="text-gray-300">Schedule</span>
      </h2>

      {/* Timeline */}
      <div ref={lineRef} className="relative max-w-6xl mx-auto z-10 px-4 md:px-6">
        {/* Static Gray Line */}
        <div className={`absolute ${isMobile ? "left-4" : "left-1/2"} top-0 w-1 bg-gray-700 h-full ${isMobile ? "" : "transform -translate-x-1/2"}`} />

        {/* Smooth Animated Yellow Line */}
        <motion.div
          className={`absolute ${isMobile ? "left-4" : "left-1/2"} top-0 w-1 bg-yellow-400 ${isMobile ? "" : "transform -translate-x-1/2"}`}
          initial={{ height: 0 }}
          animate={{ height: `${scrollHeight}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className={`mb-12 md:mb-16 flex ${isMobile ? "justify-start" : (index % 2 === 0 ? "justify-start" : "justify-end")} relative`}
            initial={{ opacity: 0, x: isMobile ? 150 : (index % 2 === 0 ? -150 : 150) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Timeline Dot */}
            <div className={`absolute ${isMobile ? "left-4" : "left-1/2"} top-6 ${isMobile ? "transform -translate-x-1/2" : "transform -translate-x-1/2"} z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black border-2 border-yellow-400 text-yellow-400 font-bold`}>
              {event.id}
            </div>

            {/* Event Card */}
            <div
              className={`${isMobile ? "w-full ml-12" : "w-5/12"} p-4 md:p-6 rounded-xl backdrop-blur-lg bg-white/10 shadow-lg hover:scale-105 transition-transform duration-300 ${isMobile ? "" : (index % 2 === 0 ? "ml-12" : "mr-12")}`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2 md:mb-3">
                {event.title}
              </h3>
              <p className="text-sm md:text-base text-gray-200">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventSchedule;
// src/Sections/Sponsors.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Sponsors = () => {
  const canvasRef = useRef(null);
  const [activeTier, setActiveTier] = useState(0);

  const sponsorTiers = [
    {
      name: "Platinum Sponsors",
      level: "platinum",
      sponsors: [
        // { name: "TechCorp", logo: "/Assests/Cordinator.webp", url: "https://techcorp.com" },
        { name: "InnovateX", logo: "/Assests/Siona.webp", url: "https://innovatex.com" },
      ],
    },
    {
      name: "Gold Sponsors",
      level: "gold",
      sponsors: [
        { name: "DataSystems", logo: "/Assets/datasystems.webp", url: "https://datasystems.com" },
        { name: "CloudNet", logo: "/Assets/cloudnet.webp", url: "https://cloudnet.com" },
        { name: "CodeHub", logo: "/Assets/codehub.webp", url: "https://codehub.com" },
      ],
    },
    {
      name: "Silver Sponsors",
      level: "silver",
      sponsors: [
        { name: "DevTools", logo: "/Assets/devtools.webp", url: "https://devtools.com" },
        { name: "AppWorks", logo: "/Assets/appworks.webp", url: "https://appworks.com" },
        { name: "ByteSize", logo: "/Assets/bytesize.webp", url: "https://bytesize.com" },
      ],
    },
  ];

  // Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // Softer white particles
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getTierColor = (level) => {
    switch (level) {
      case "platinum":
        return "text-gray-200 border-platinum"; 
      case "gold":
        return "text-yellow-300 border-gold";
      case "silver":
        return "text-gray-400 border-silver";
      default:
        return "text-red-400";
    }
  };

  const getTierGradient = (level) => {
    switch (level) {
      case "platinum":
        return "from-gray-800 to-gray-900";
      case "gold":
        return "from-yellow-900 to-yellow-800";
      case "silver":
        return "from-gray-800 to-gray-700";
      default:
        return "from-gray-800 to-gray-900";
    }
  };

  const getTierBg = (level) => {
    switch (level) {
      case "platinum": return "bg-gradient-to-r from-gray-700 to-gray-800";
      case "gold": return "bg-gradient-to-r from-yellow-700 to-yellow-800";
      case "silver": return "bg-gradient-to-r from-gray-600 to-gray-700";
      default: return "bg-gray-800";
    }
  };

  // Testimonial data
  const testimonials = [
    {
      quote: "Supporting this event has been incredibly valuable for our brand visibility and connecting with the developer community.",
      author: "Jane Doe",
      position: "Marketing Director at InnovateX",
      tier: "platinum"
    },
    {
      quote: "We've seen a significant return on investment through our sponsorship, with increased engagement from our target audience.",
      author: "John Smith",
      position: "CEO at DataSystems",
      tier: "gold"
    },
    {
      quote: "Being a sponsor allowed us to showcase our latest products to an engaged and relevant audience.",
      author: "Sarah Johnson",
      position: "Product Manager at CloudNet",
      tier: "silver"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black text-white py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20" />
      
      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMiI+CiAgICA8cGF0aCBkPSJNNTkgMUwxIDU5Ii8+CiAgICA8cGF0aCBkPSJNLTU5IDEwTDEwIC01OSIvPgogICAgPHBhdGggZD0iTTU5IDIwTDIwIDU5Ii8+CiAgICA8cGF0aCBkPSJNLTM5IDQwTDQwIC0zOSIvPgogICAgPHBhdGggZD0iTTU5IDQwTDQwIDU5Ii8+CiAgICA8cGF0aCBkPSJNLTE5IDYwTDYwIC0xOSIvPgogIDwvZz4KPC9zdmc+')] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mb-4">
            OUR SPONSORS
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're grateful to our partners who make this event possible through their generous support
          </p>
        </motion.div>

        {/* Tier Selector */}
        <div className="flex justify-center mb-10">
          {sponsorTiers.map((tier, index) => (
            <button
              key={index}
              onClick={() => setActiveTier(index)}
              className={`px-6 py-2 mx-2 rounded-full font-medium transition-all ${
                activeTier === index 
                  ? `${getTierBg(tier.level)} text-white` 
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>
        
        {/* Carousel Content */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {sponsorTiers[activeTier].sponsors.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6 w-64 transition-all hover:bg-opacity-10"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center h-32">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="max-h-full max-w-full object-contain filter brightness-0 invert"
                />
              </div>
              <p className="text-center mt-4 font-medium text-gray-300">{s.name}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div 
          className="my-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute left-0 top-0 text-6xl text-red-500 opacity-20">"</div>
          <div className="absolute right-0 bottom-0 text-6xl text-red-500 opacity-20">"</div>
          
          <div className="text-center px-8 py-12 bg-black bg-opacity-30 rounded-xl">
            <p className="text-xl italic text-gray-300 max-w-3xl mx-auto">
              {testimonials[activeTier].quote}
            </p>
            <p className="mt-6 text-red-400 font-medium">
              — {testimonials[activeTier].author}, {testimonials[activeTier].position}
            </p>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-medium text-gray-300 mb-6">Interested in becoming a sponsor?</h3>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
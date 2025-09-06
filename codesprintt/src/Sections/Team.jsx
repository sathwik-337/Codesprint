// src/Sections/Team.jsx
import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "John Doe",
    role: "Event Lead",
    img: " /Assests/Cordinator.png",
    accent: "from-pink-500 to-red-500",
  },
  {
    name: "Jane Smith",
    role: "Technical Lead",
    img: "/Assests/Cordinator.png",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    name: "Mike Johnson",
    role: "Design Lead",
    img: "/Assests/Cordinator.png",
    accent: "from-orange-400 to-yellow-500",
  },
];

const Team = () => {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Big Background Text */}
      <h1 className="absolute text-[8rem] md:text-[15rem] font-extrabold text-gray-900/10 z-0 left-1/2 -translate-x-1/2 top-12">
        TEAM
      </h1>

      {/* Header */}
      <div className="text-center relative z-10 mb-16">
        <p className="uppercase text-gray-400 tracking-widest">MEET OUR</p>
        <h2 className="text-5xl md:text-6xl font-extrabold italic">
          <span className="text-white">TEAM</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
          We're excited to bring you an innovative hackathon experience! Our
          dedicated team is here to support you every step of the way.
        </p>
      </div>

      {/* Team Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Accent Border */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${member.accent} opacity-0 group-hover:opacity-100 transition duration-500`}
            ></div>

            {/* Image */}
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-96 object-cover grayscale group-hover:grayscale-0 transition duration-500"
            />

            {/* Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-4 opacity-0 group-hover:opacity-100 transition duration-500">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;

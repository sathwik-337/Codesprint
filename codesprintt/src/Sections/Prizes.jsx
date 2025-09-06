// src/Sections/Prizes.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const prizes = [
  { place: "1st Place", amount: 50000, color: "text-yellow-400", podiumColor: "bg-yellow-500/20 border-yellow-400" },
  { place: "2nd Place", amount: 30000, color: "text-gray-300", podiumColor: "bg-gray-400/20 border-gray-300" },
  { place: "3rd Place", amount: 20000, color: "text-orange-400", podiumColor: "bg-orange-500/20 border-orange-400" },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    step();
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
};

const Prizes = () => {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <canvas id="particles" className="w-full h-full" />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold italic">
          Prize <span className="text-yellow-400">Winners</span>
        </h2>
      </div>

      {/* Podium */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center md:items-end gap-6 md:gap-8 max-w-5xl mx-auto px-6">
        {/* 2nd Place */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div
            className={`w-36 h-48 md:w-40 md:h-56 ${prizes[1].podiumColor} border-2 rounded-t-xl flex flex-col justify-center items-center shadow-lg hover:scale-105 transition`}
          >
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mb-2" />
            <h3 className="text-xl md:text-2xl font-bold">{prizes[1].place}</h3>
            <p className={`text-2xl md:text-3xl font-bold ${prizes[1].color}`}>
              ₹<Counter target={prizes[1].amount} />
            </p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div
            className={`w-40 h-56 md:w-44 md:h-72 ${prizes[0].podiumColor} border-2 rounded-t-xl flex flex-col justify-center items-center shadow-xl hover:scale-110 transition`}
          >
            <Trophy className="w-12 h-12 md:w-14 md:h-14 text-yellow-400 mb-2" />
            <h3 className="text-2xl md:text-3xl font-bold">{prizes[0].place}</h3>
            <p className={`text-3xl md:text-4xl font-extrabold ${prizes[0].color}`}>
              ₹<Counter target={prizes[0].amount} />
            </p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div
            className={`w-32 h-40 md:w-40 md:h-48 ${prizes[2].podiumColor} border-2 rounded-t-xl flex flex-col justify-center items-center shadow-lg hover:scale-105 transition`}
          >
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-orange-400 mb-2" />
            <h3 className="text-xl md:text-2xl font-bold">{prizes[2].place}</h3>
            <p className={`text-2xl md:text-3xl font-bold ${prizes[2].color}`}>
              ₹<Counter target={prizes[2].amount} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Prizes;

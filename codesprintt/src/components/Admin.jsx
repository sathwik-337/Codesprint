// src/components/Admin.jsx
import React, { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";

const Admin = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const canvasRef = useRef(null);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
      })
      .catch((err) => console.error("Data fetch error:", err));
  }, []);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = data.filter((row) =>
      Object.values(row).some((val) =>
        JSON.stringify(val).toLowerCase().includes(term)
      )
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  // CSV Export
  const exportToCSV = () => {
    if (!data.length) return alert("No data to export");
    const headers = Object.keys(data[0]).join(",");
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((val) =>
            typeof val === "object" ? JSON.stringify(val) : `"${val}"`
          )
          .join(",")
      )
      .join("\n");

    const csvContent = [headers, rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  // Simple login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  // Enhanced particle animation
  useEffect(() => {
    if (!isLoggedIn || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Create particles with different colors and properties
    const particles = Array.from({ length: 150 }, () => {
      const colors = ["#4FC3F7", "#29B6F6", "#03A9F4", "#0288D1", "#01579B"];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.dx;
        p.y += p.dy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        
        // Draw connections between nearby particles
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 180, 255, ${1 - distance/100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isLoggedIn]);

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        ></canvas>
        
        <div className="relative z-10 bg-gray-800 bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">Admin Portal</h1>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-gray-300 mb-2 text-sm">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Sign In
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              Default credentials: admin / admin
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      ></canvas>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl p-6 mb-6 border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search across all fields..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700 text-left">
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-6 py-4 font-semibold text-gray-300 capitalize">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-700 hover:bg-gray-750 ${i % 2 === 0 ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-800 bg-opacity-30'}`}>
                    {Object.entries(row).map(([key, value], idx) => (
                      <td key={idx} className="px-6 py-4">
                        {Array.isArray(value) ? (
                          <div className="flex flex-col gap-1">
                            {value.map((v, j) => (
                              <div key={j} className="text-sm bg-gray-700 p-2 rounded">
                                {Object.entries(v).map(([k, val]) => (
                                  <div key={k}><span className="text-gray-400">{k}:</span> {val}</div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : typeof value === "object" && value !== null ? (
                          <div className="text-sm bg-gray-700 p-2 rounded">
                            {Object.entries(value).map(([k, val]) => (
                              <div key={k}><span className="text-gray-400">{k}:</span> {val}</div>
                            ))}
                          </div>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No matching records found
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredData.length} of {data.length} records
        </div>
      </div>
    </div>
  );
};

export default Admin;
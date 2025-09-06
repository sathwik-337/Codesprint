import React, { useState } from "react";
import { motion } from "framer-motion";

const Register = () => {
  const [teamSize, setTeamSize] = useState(2);
  const [formData, setFormData] = useState({
    teamName: "",
    members: Array(4).fill().map(() => ({
      name: "",
      email: "",
      phone: "",
      institution: "",
      educationType: "",
      graduationYear: "",
      github: "",
      linkedin: "",
      skill: ""
    }))
  });

  // Determine backend API URL
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleTeamSizeChange = (e) => {
    setTeamSize(parseInt(e.target.value));
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setFormData(prev => {
      const updatedMembers = [...prev.members];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      return { ...prev, members: updatedMembers };
    });
  };

  const handleTeamNameChange = (e) => {
    setFormData(prev => ({ ...prev, teamName: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      teamName: formData.teamName,
      members: formData.members.slice(0, teamSize)
    };

    try {
      const response = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registration successful!");
        console.log(data);

        // Reset form
        setFormData({
          teamName: "",
          members: Array(4).fill().map(() => ({
            name: "",
            email: "",
            phone: "",
            institution: "",
            educationType: "",
            graduationYear: "",
            github: "",
            linkedin: "",
            skill: ""
          }))
        });
        setTeamSize(2);
      } else {
        alert(`❌ Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ An error occurred. Please try again.");
    }
  };

  return (
    <section className="relative bg-black text-white py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold italic text-center mb-12 text-red-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          TEAM REGISTRATION
        </motion.h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-red-500/30"
        >
          {/* Team Name */}
          <div className="mb-8">
            <label className="block text-xl font-semibold mb-4 text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              value={formData.teamName}
              onChange={handleTeamNameChange}
              placeholder="Enter Team Name"
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Team Size Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">
              Select Team Size
            </h3>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4].map(size => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="teamSize"
                    value={size}
                    checked={teamSize === size}
                    onChange={handleTeamSizeChange}
                    className="sr-only"
                  />
                  <div
                    className={`px-6 py-3 rounded-xl border-2 ${
                      teamSize === size
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500"
                    }`}
                  >
                    {size} Member{size > 1 ? "s" : ""}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 my-8"></div>

          {/* Team Members */}
          <div className="space-y-12">
            {Array.from({ length: teamSize }, (_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-2xl font-bold text-red-400 mb-6">
                  Team Member {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.members[index].name}
                      onChange={(e) => handleInputChange(e, index, "name")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.members[index].email}
                      onChange={(e) => handleInputChange(e, index, "email")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.members[index].phone}
                      onChange={(e) => handleInputChange(e, index, "phone")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-gray-400 mb-2">Institution Name</label>
                    <input
                      type="text"
                      value={formData.members[index].institution}
                      onChange={(e) => handleInputChange(e, index, "institution")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Education Type */}
                  <div>
                    <label className="block text-gray-400 mb-2">Education Type</label>
                    <select
                      value={formData.members[index].educationType}
                      onChange={(e) => handleInputChange(e, index, "educationType")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Education Type</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label className="block text-gray-400 mb-2">Graduation Year (e.g., 2024)</label>
                    <input
                      type="number"
                      min="2000"
                      max="2030"
                      value={formData.members[index].graduationYear}
                      onChange={(e) => handleInputChange(e, index, "graduationYear")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-gray-400 mb-2">GitHub (Optional)</label>
                    <input
                      type="url"
                      value={formData.members[index].github}
                      onChange={(e) => handleInputChange(e, index, "github")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-gray-400 mb-2">LinkedIn (Optional)</label>
                    <input
                      type="url"
                      value={formData.members[index].linkedin}
                      onChange={(e) => handleInputChange(e, index, "linkedin")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Skill */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2">Coding Skill (e.g., JavaScript)</label>
                    <input
                      type="text"
                      value={formData.members[index].skill}
                      onChange={(e) => handleInputChange(e, index, "skill")}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white text-xl font-semibold rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Register Team
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;

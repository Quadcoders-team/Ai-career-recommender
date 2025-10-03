import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/recommend", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(res.data);
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
    }
    setInput("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/skills/update",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRecommendations();
    } catch (err) {
      setError("Failed to update skills");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        Career Recommendations
      </h1>

      {/* Skill Input with Tags */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-xl mx-auto">
        <form onSubmit={handleAddSkill} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a skill and press Enter"
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>

        {/* Display skill tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSaveSkills}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-full"
        >
          Save Skills
        </button>
      </div>

      {/* Recommendations */}
      {loading ? (
        <p className="text-center">Loading recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p className="text-center text-gray-500">
          No recommendations yet. Add some skills above!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {rec.role}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Match:{" "}
                <span className="font-bold text-green-500">{rec.match}%</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

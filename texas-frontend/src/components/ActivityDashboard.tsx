import React, { useState } from "react";
import { HeatMap } from "./HeatMap";

export function ActivityDashboard() {
  const [activePlatform, setActivePlatform] = useState("codeforces");
  const [platformData, setPlatformData] = useState();

  const platforms = ["codeforces", "codechef", "leetcode"];

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`px-4 py-2 rounded-md ${
              activePlatform === platform
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </button>
        ))}
      </div>

      <HeatMap platform={activePlatform} data={platformData} />

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ActivitySummary
          platform={activePlatform}
          setPlatformData={setPlatformData}
        />
      </div>
    </div>
  );
}

function ActivitySummary({ platform, setPlatformData }) {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchRecentActivity = async () => {
      setLoading(true);
      try {
        // // Fetch the appropriate data file based on the platform
        // let response;
        // switch (platform.toLowerCase()) {
        //   case 'codeforces':
        //     response = await fetch('/data/codeforcesData.json');
        //     break;
        //   case 'codechef':
        //     response = await fetch('/data/codechefData.json');
        //     break;
        //   case 'leetcode':
        //     response = await fetch('/data/leetcodeData.json');
        //     break;
        //   default:
        //     response = await fetch('/data/codeforcesData.json');
        // }

        // if (!response.ok) {
        //   throw new Error(`Failed to fetch ${platform} data`);
        // }

        let data;
        // const data = await response.json();
        if (platform === "codeforces") {
          data = JSON.parse(
            localStorage.getItem(`${platform}Data`) || "[]"
          );
          setPlatformData(data);
        }
        else {
          let response = await fetch(`/data/${platform}Data.json`);
          data = await response.json();
          setPlatformData(data);
        }

        // Sort by date (newest first) and take the 5 most recent days
        const sortedData = [...data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        console.log("efwd", sortedData);
        setRecentActivity(sortedData);
      } catch (err) {
        console.error("Error fetching recent activity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, [platform]);

  if (loading) return <div>Loading recent activity...</div>;

  console.log(recentActivity);
  return (
    <div className="space-y-4">
      {recentActivity.length === 0 ? (
        <p>No recent activity found.</p>
      ) : (
        recentActivity.map((day) => (
          <div key={day.date} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                {new Date(day.date).toLocaleDateString()}
              </h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {day.numberOfProblemsSolved} problems
              </span>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {day.problemsSolved.map((problem) => (
                <div
                  key={problem.problemCode}
                  className="bg-gray-50 p-2 rounded text-sm"
                >
                  <div className="flex justify-between">
                    <span>Problem: {problem.problemCode}</span>
                    <span
                      className={`font-medium ${getRatingColor(
                        platform,
                        problem.rating
                      )}`}
                    >
                      {problem.rating}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Attempts: {problem.numberOfAttempts}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Helper function to determine text color based on problem rating
function getRatingColor(platform, rating) {
  if (platform === "codeforces") {
    if (rating < 1200) return "text-[#808080]"; // Gray for Newbie
    if (rating < 1400) return "text-[#008000]"; // Green for Pupil
    if (rating < 1600) return "text-[#03a89e]"; // Cyan for Specialist
    if (rating < 1900) return "text-[#0000ff]"; // Blue for Expert
    if (rating < 2100) return "text-[#aa00aa]"; // Purple for Candidate Master
    if (rating < 2300) return "text-[#ff8c00]"; // Orange for Master
    if (rating < 2400) return "text-[#ff8c00]"; // Orange for International Master
    if (rating < 2600) return "text-[#ff0000]"; // Red for Grandmaster
    if (rating < 3000) return "text-[#ff0000]"; // Red for International Grandmaster
    return "text-[#ff0000]"; // Red for Legendary Grandmaster (with additional styling typically applied)
  } else if (platform == "codechef") {
    if (rating < 1400) return "text-[#666666]"; // 1 Star
    if (rating < 1600) return "text-[#1E7D22]"; // 2 Stars
    if (rating < 1800) return "text-[#3366CC]"; // 3 Stars
    if (rating < 2000) return "text-[#684273]"; // 4 Stars
    if (rating < 2200) return "text-[#FFD700]"; // 5 Stars
    if (rating < 2500) return "text-[#FF6800]"; // 6 Stars
    return "text-[#FF0000]"; // 7 Stars
  } else {
    if (rating === "Easy") return "text-[#00b8a3]"; // Green for easy problems
    if (rating === "Medium") return "text-[#ffa116]"; // Orange for medium problems
    if (rating === "Hard") return "text-[#ff2d55]"; // Red-orange for hard problems
  }
  return "text-[#ff0000]"; // Default red
}

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Calendar, BarChart2, TrendingUp } from "lucide-react";
import { ContestHistory } from "../components/ContestHistory";
import { RatingGraph } from "../components/RatingGraph";
import { UpcomingContestCalendar } from "./UpcomingContestCalendar";

const mockContests = [
  {
    id: "1",
    platform: "leetcode",
    name: "Weekly Contest 389",
    date: "2024-03-10",
    participated: true,
    rank: 1234,
    rating: 1567,
  },
  {
    id: "2",
    platform: "codeforces",
    name: "Codeforces Round #923",
    date: "2024-03-08",
    participated: true,
    rank: 890,
    rating: 1789,
  },
  {
    id: "3",
    platform: "codechef",
    name: "March Long Challenge 2024",
    date: "2024-03-01",
    participated: false,
  },
];

const mockRatingData = [
  { date: "2024-03-01", leetcode: 1500, codeforces: 1600, codechef: 1700 },
  { date: "2024-03-05", leetcode: 1550, codeforces: 1650, codechef: 1680 },
  { date: "2024-03-10", leetcode: 1567, codeforces: 1789, codechef: 1695 },
];

export function Contests() {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "leetcode",
    "codeforces",
    "codechef",
  ]);

  const platformColors = {
    leetcode: "#FFA116",
    codeforces: "#1890FF",
    codechef: "#429e4d",
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coding Activity
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange("week")}
            className={`flex items-center px-4 py-2 rounded-md ${
              timeRange === "week"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`flex items-center px-4 py-2 rounded-md ${
              timeRange === "month"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RatingGraph data={mockRatingData} />
        <ContestHistory contests={mockContests} />
      </div>

      <UpcomingContestCalendar />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Platform Comparison
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockRatingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
              <Legend />
              {Object.entries(platformColors).map(
                ([platform, color]) =>
                  selectedPlatforms.includes(platform) && (
                    <Bar
                      key={platform}
                      dataKey={platform}
                      fill={color}
                      name={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    />
                  )
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(platformColors).map(([platform, color]) => (
          <button
            key={platform}
            onClick={() => togglePlatform(platform)}
            className={`px-4 py-2 rounded-md border-2 ${
              selectedPlatforms.includes(platform)
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }`}
          >
            <span className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-900 dark:text-gray-100">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
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
import mockData from "../../public/data/mockData.json";

const platformColors = {
  leetcode: "#FFA116",
  codeforces: "#1890FF",
  codechef: "#429e4d",
};

const processData = (data: any[], timerange: "week" | "month") => {
  if (timerange === "week") {
    return data.slice(-7); // Last 7 days
  }

  const monthlyData: {
    [key: string]: {
      date: string;
      leetcode: number;
      codeforces: number;
      codechef: number;
    };
  } = {};

  data.forEach(({ date, leetcode, codeforces, codechef }) => {
    const month = date.slice(0, 7); // "YYYY-MM"
    if (!monthlyData[month]) {
      monthlyData[month] = {
        date: month,
        leetcode: 0,
        codeforces: 0,
        codechef: 0,
      };
    }
    monthlyData[month].leetcode += leetcode;
    monthlyData[month].codeforces += codeforces;
    monthlyData[month].codechef += codechef;
  });

  return Object.values(monthlyData);
};

export function Problems() {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "leetcode",
    "codeforces",
    "codechef",
  ]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredData = useMemo(
    () => processData(mockData.data, timeRange),
    [timeRange]
  );

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

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Problem Solving Trends
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
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
                    <Line
                      key={platform}
                      type="monotone"
                      dataKey={platform}
                      stroke={color}
                      name={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    />
                  )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Platform Comparison
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
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
      </div> */}

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

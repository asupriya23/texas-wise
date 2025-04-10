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
} from "recharts";
import { UpcomingContestCalendar } from "./UpcomingContestCalendar";
import { endOfMonth, subDays, format } from "date-fns";

export function Contests() {
  const [codeforcesRatings, setCodeforcesRatings] = useState([]);
  const [ratingsData, setRatingsData] = useState({
    codechef: [],
    leetcode: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["codeforces"]); // Added missing state

  const platformColors = {
    leetcode: "#FFA116",
    codeforces: "#1890FF",
    codechef: "#429e4d",
  };

  useEffect(() => {
    fetchCodeforcesRatings();
    generateDummyData();
  }, []); // Added empty dependency array to run only once

  const generateDummyData = () => {
    setLoading(true);

    // Function to generate dummy data for a platform
    const generatePlatformData = (platform, numEntries) => {
      const data = [];
      let currentDate = new Date(); // Start from today
      currentDate = new Date(currentDate.getTime() - 9 * 24 * 60 * 60 * 1000);
      let rating = Math.floor(Math.random() * 300) + 1800; // Between 1200-1500

      for (let i = numEntries - 1; i >= 0; i--) {
        const ratingChange = Math.floor(Math.random() * 101) - 80; // -20 to 80
        const newRating = Math.max(0, rating + ratingChange);

        data.push({
          platform: platform,
          contestId: i + 1,
          contestName: `${
            platform.charAt(0).toUpperCase() + platform.slice(1)
          } Contest ${i + 1}`,
          rank: Math.floor(Math.random() * 1000) + 1,
          oldRating: newRating,
          newRating: rating,
          ratingChange: -1 * ratingChange,
          date: new Date(currentDate),
          formattedDate: format(currentDate, "MMM d, yyyy"),
        });

        rating = newRating;
        currentDate = new Date(
          currentDate.setDate(
            currentDate.getDate() - Math.floor(Math.random() * 31) - 15
          )
        );
      }

      return data.reverse();
    };

    const codechefData = generatePlatformData("codechef", 44);

    const leetcodeData = generatePlatformData("leetcode", 23);

    // Set data for each platform separately
    setRatingsData({
      codechef: codechefData,
      leetcode: leetcodeData,
    });
    setLoading(false);
  };

  // Moved function declaration outside useEffect for better readability
  const fetchCodeforcesRatings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=rockhopper130`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const formattedData = data.result.map((entry, index) => ({
          contestId: entry.contestId,
          contestName: entry.contestName,
          rank: entry.rank,
          oldRating: entry.oldRating,
          newRating: entry.newRating,
          ratingChange: entry.newRating - entry.oldRating,
          index: index + 1,
          // Convert timestamp to Date object
          date: new Date(entry.ratingUpdateTimeSeconds * 1000),
          // Format date for display
          formattedDate: format(
            new Date(entry.ratingUpdateTimeSeconds * 1000),
            "MMM d, yyyy"
          ),
        }));

        setCodeforcesRatings(formattedData);
        setError(null);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching Codeforces data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Custom tooltip component to display date and rank
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{data.contestName}</p>
          <p className="text-sm text-gray-600">{data.formattedDate}</p>
          <p>Rating: {data.newRating}</p>
          <p>Rank: {data.rank}</p>
          <p
            className={
              data.ratingChange >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            Change: {data.ratingChange > 0 ? "+" : ""}
            {data.ratingChange}
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to format dates for X-axis ticks
  const formatXAxis = (tickItem) => {
    // Check if tickItem is valid before processing
    if (!tickItem || codeforcesRatings.length === 0) return "";

    try {
      // Find the corresponding data point
      const dataPoint = codeforcesRatings.find(
        (item) => item.date.getTime() === new Date(tickItem).getTime()
      );

      // Return formatted date if found
      if (dataPoint) {
        return format(dataPoint.date, "MMM yyyy");
      }
      return format(new Date(tickItem), "MMM yyyy"); // Fallback formatting
    } catch (error) {
      console.error("Error formatting X-axis:", error);
      return "";
    }
  };

  const now = new Date();
  const currentMonthEnd = endOfMonth(now);
  // Function to create a chart for a specific platform
  const renderPlatformChart = (platform, data) => {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {platformName} Rating History
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="category"
                scale="time"
                domain={['auto', currentMonthEnd.getTime()]} // end at current month
                tickFormatter={(date) => format(new Date(date), "MMM yyyy")}
                label={{
                  value: "Date",
                  position: "insideBottomRight",
                  offset: -10,
                }}
                minTickGap={50}
              />
              <YAxis
                label={{
                  value: "Rating",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[
                  (dataMin) => dataMin - 100,
                  (dataMax) => dataMax + 100,
                ]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="newRating"
                name={`${platformName} Rating`}
                stroke={platformColors[platform]}
                activeDot={{ r: 8 }}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coding Activity
        </h2>
        {/* Platform toggle buttons could go here */}
      </div>
      <UpcomingContestCalendar />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Codeforces Rating History
        </h3>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading ratings data...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={codeforcesRatings}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  type="category"
                  scale="time"
                  tickFormatter={(date) => format(new Date(date), "MMM yyyy")}
                  label={{
                    value: "Date",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                  minTickGap={50}
                />
                <YAxis
                  label={{
                    value: "Rating",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={[
                    (dataMin) => dataMin - 100,
                    (dataMax) => dataMax + 100,
                  ]} // Fixed domain format
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newRating"
                  name="Rating"
                  stroke={platformColors.codeforces}
                  activeDot={{ r: 8 }}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div>
        {renderPlatformChart("codechef", ratingsData.codechef)}
        {renderPlatformChart("leetcode", ratingsData.leetcode)}
      </div>
    </div>
  );
}

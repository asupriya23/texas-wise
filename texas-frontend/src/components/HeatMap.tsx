import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Add this import

import "react-calendar-heatmap/dist/styles.css";

export function HeatMap({ platform = "codeforces", data }) {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!data || data.length === 0) {
          setHeatmapData([]); // Set an empty array if no data is provided
          return;
        }

        const processedData = data.map((item) => ({
          date: item.date,
          count: item.numberOfProblemsSolved,
          details: {
            problems: item.problemsSolved,
            totalAttempts: item.problemsSolved.reduce(
              (sum, problem) => sum + problem.numberOfAttempts,
              0
            ),
          },
        }));

        setHeatmapData(processedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platform, data]);

  // Get start and end dates for the selected year
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  // Calculate the max value for color scaling
  //   const maxCount = Math.max(...heatmapData.map((data) => data.count || 0), 1);
  const maxCount = 10;

  // Function to determine color intensity based on count
  const getColorClass = (count) => {
    if (!count) return "color-empty";

    const intensity = Math.min(Math.ceil((count / maxCount) * 4), 4);
    return `color-scale-${intensity}`;
  };

  // Filter data for the selected year
  const filteredData = heatmapData.filter((data) => {
    const date = new Date(data.date);
    return date.getFullYear() === selectedYear;
  });

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading heatmap data...</div>
    );
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="heatmap-container p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{platform} Activity</h2>
        <div className="year-selector">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border rounded"
          >
            {Array.from(
              { length: 5 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="heatmap-wrapper">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={filteredData}
          classForValue={(value) => {
            const baseClass = "calendar-day " + getColorClass(value?.count);
            return baseClass;
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return {
                "data-tooltip-id": "heatmap-tooltip",
                "data-tooltip-content": "No activity",
              };
            }

            // Create a unique ID for each day's tooltip
            const tooltipId = `tooltip-${value.date}`;

            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date}: ${value.count} problems solved`,
              "data-date": value.date,
              "data-count": value.count,
              "data-details": JSON.stringify(value.details),
            };
          }}
          showWeekdayLabels={true}
        />

        <ReactTooltip
          id="heatmap-tooltip"
          render={({ activeAnchor }) => {
            if (!activeAnchor) return null;

            const date = activeAnchor.getAttribute("data-date");
            const count = activeAnchor.getAttribute("data-count");
            const detailsStr = activeAnchor.getAttribute("data-details");

            if (!date || !count) return <div>No activity</div>;

            let details;
            try {
              details = JSON.parse(detailsStr);
            } catch (e) {
              details = null;
            }

            return (
              <div className="tooltip-content">
                <div className="font-bold">
                  {date}: {count} problems solved
                </div>
                {details && details.problems && (
                  <ul className="mt-2 pl-4 list-disc">
                    {details.problems.map((problem, idx) => (
                      <li key={idx}>
                        {problem.problemCode} (Rating: {problem.rating}) -
                        {problem.numberOfAttempts} attempt
                        {problem.numberOfAttempts > 1 ? "s" : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }}
        />
      </div>

      <div className="flex justify-end items-center text-sm">
        <span className="mr-2">Less</span>
        <div className="flex">
          <div className="w-4 h-4 bg-[#ebedf0] border border-gray-200"></div>
          <div className="w-4 h-4 bg-[#c6e48b] border border-gray-200"></div>
          <div className="w-4 h-4 bg-[#7bc96f] border border-gray-200"></div>
          <div className="w-4 h-4 bg-[#239a3b] border border-gray-200"></div>
          <div className="w-4 h-4 bg-[#196127] border border-gray-200"></div>
        </div>
        <span className="ml-2">More</span>
      </div>

      <style jsx>{`
        .color-empty {
          fill: #ebedf0;
        }
        .color-scale-1 {
          fill: #c6e48b;
        }
        .color-scale-2 {
          fill: #7bc96f;
        }
        .color-scale-3 {
          fill: #239a3b;
        }
        .color-scale-4 {
          fill: #196127;
        }
        .heatmap-wrapper .react-calendar-heatmap text {
          font-size: 8px; /* Adjust this value as needed */
        }

        /* For month labels specifically */
        .heatmap-wrapper .react-calendar-heatmap .month-label {
          font-size: 9px; /* Adjust this value as needed */
        }

        /* For weekday labels specifically */
        .heatmap-wrapper .react-calendar-heatmap .weekday-label {
          font-size: 8px; /* Adjust this value as needed */
        }
      `}</style>
    </div>
  );
}

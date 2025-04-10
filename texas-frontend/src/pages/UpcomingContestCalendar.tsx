// components/UpcomingContestCalendar.tsx
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";

// Platform-specific colors
const platformColors: Record<string, string> = {
  codeforces: "#1890FF",
  leetcode: "#FFA116",
  codechef: "#429e4d",
};

// Dummy data for CodeChef and LeetCode
const dummyContests = [
  {
    title: "CodeChef Starters 147",
    date: "2025-04-02T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 140",
    date: "2025-04-05T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 399",
    date: "2025-04-06T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 148",
    date: "2025-04-09T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Weekly Contest 400",
    date: "2025-04-13T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 149",
    date: "2025-04-16T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 141",
    date: "2025-04-19T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 401",
    date: "2025-04-20T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 150",
    date: "2025-04-23T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Weekly Contest 402",
    date: "2025-04-27T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 151",
    date: "2025-04-30T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 142",
    date: "2025-05-03T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 403",
    date: "2025-05-04T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 152",
    date: "2025-05-07T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Weekly Contest 404",
    date: "2025-05-11T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 153",
    date: "2025-05-14T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 143",
    date: "2025-05-17T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 405",
    date: "2025-05-18T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 154",
    date: "2025-05-21T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Weekly Contest 406",
    date: "2025-05-25T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 155",
    date: "2025-05-28T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 144",
    date: "2025-05-31T20:00:00",
    platform: "leetcode",
  }
];


interface Contest {
  title: string;
  date: string;
  platform: string;
}

export function UpcomingContestCalendar() {
  const [contests, setContests] = useState<Contest[]>(dummyContests);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodeforcesContests = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://codeforces.com/api/contest.list");
        const data = await response.json();
        
        if (data.status === "OK") {
          // Filter for upcoming contests only
          const currentTime = new Date().getTime() / 1000;
          const upcomingContests = data.result
            .filter((contest: any) => 
              contest.phase === "BEFORE" && 
              contest.startTimeSeconds > currentTime
            )
            .map((contest: any) => ({
              title: contest.name,
              date: new Date(contest.startTimeSeconds * 1000).toISOString(),
              platform: "codeforces",
            }))
            .slice(0, 10); // Limit to 10 upcoming contests
          
          // Combine with dummy data
          setContests([...upcomingContests, ...dummyContests]);
        } else {
          setError("Failed to fetch Codeforces contests");
        }
      } catch (err) {
        setError("Error fetching contest data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCodeforcesContests();
  }, []);

  const events = contests.map((contest) => ({
    title: contest.title,
    start: contest.date,
    backgroundColor: platformColors[contest.platform],
    borderColor: platformColors[contest.platform],
  }));

  return (
    <Card className="p-6 mt-8 shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
        📅 Upcoming Contests Calendar
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Stay sharp! Don't miss these contests 🚀
      </p>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">
          {error} - Using fallback data
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridDay,dayGridWeek,dayGridMonth",
          }}
          events={events}
          height="auto"
          eventDisplay="block"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          eventContent={(arg) => {
            return {
              domNodes: [
                Object.assign(document.createElement("div"), {
                  innerText: arg.event.title,
                  style: "white-space: normal; word-break: break-word;",
                }),
              ],
            };
          }}
        />
      )}
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 rounded-sm" style={{ backgroundColor: platformColors.codeforces }}></div>
          <span className="text-sm">Codeforces</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 rounded-sm" style={{ backgroundColor: platformColors.leetcode }}></div>
          <span className="text-sm">LeetCode</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 rounded-sm" style={{ backgroundColor: platformColors.codechef }}></div>
          <span className="text-sm">CodeChef</span>
        </div>
      </div>
    </Card>
  );
}

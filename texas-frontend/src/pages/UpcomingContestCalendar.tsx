// components/UpcomingContestCalendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";

const upcomingContests = [
  {
    title: "Codeforces Round #925 (Div. 2)",
    date: "2025-04-13T17:35:00",
    platform: "codeforces",
  },
  {
    title: "Educational CF Round #165 (Div. 2)",
    date: "2025-04-16T18:00:00",
    platform: "codeforces",
  },
  {
    title: "LeetCode Weekly Contest 390",
    date: "2025-04-14T14:30:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Biweekly Contest 130",
    date: "2025-04-13T14:30:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef April Long Challenge",
    date: "2025-04-12T15:00:00",
    platform: "codechef",
  },
  {
    title: "CodeChef Starters 133",
    date: "2025-04-15T20:00:00",
    platform: "codechef",
  },
];

const platformColors: Record<string, string> = {
  codeforces: "#1890FF",
  leetcode: "#FFA116",
  codechef: "#429e4d",
};

export function UpcomingContestCalendar() {
  const events = upcomingContests.map((contest) => ({
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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
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
      />
    </Card>
  );
}

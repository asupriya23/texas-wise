// components/UpcomingContestCalendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";

const upcomingContests = [
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
    title: "Codeforces Round #949 (Div. 2)",
    date: "2025-04-12T19:35:00",
    platform: "codeforces",
  },
  {
    title: "Codeforces Round #950 (Div. 1)",
    date: "2025-04-13T17:35:00",
    platform: "codeforces",
  },
  {
    title: "Codeforces Round #950 (Div. 2)",
    date: "2025-04-13T17:35:00",
    platform: "codeforces",
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
    title: "Codeforces Round #951 (Div. 3)",
    date: "2025-04-18T17:35:00",
    platform: "codeforces",
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
    title: "Codeforces Round #952 (Div. 1 + Div. 2)",
    date: "2025-04-27T17:35:00",
    platform: "codeforces",
  },
  {
    title: "LeetCode Weekly Contest 402",
    date: "2025-04-27T08:00:00",
    platform: "leetcode",
  },
  {
    title: "Educational Codeforces Round #165 (Div. 2)",
    date: "2025-04-30T17:35:00",
    platform: "codeforces",
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
    title: "Codeforces Round #953 (Div. 4)",
    date: "2025-05-06T17:35:00",
    platform: "codeforces",
  },
  {
    title: "CodeChef Starters 152",
    date: "2025-05-07T20:00:00",
    platform: "codechef",
  },
  {
    title: "Codeforces Round #954 (Div. 2)",
    date: "2025-05-11T19:35:00",
    platform: "codeforces",
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
    title: "Codeforces Round #955 (Div. 2)",
    date: "2025-05-19T17:35:00",
    platform: "codeforces",
  },
  {
    title: "CodeChef Starters 154",
    date: "2025-05-21T20:00:00",
    platform: "codechef",
  },
  {
    title: "Educational Codeforces Round #166 (Div. 2)",
    date: "2025-05-22T17:35:00",
    platform: "codeforces",
  },
  {
    title: "LeetCode Weekly Contest 406",
    date: "2025-05-25T08:00:00",
    platform: "leetcode",
  },
  {
    title: "Codeforces Round #956 (Div. 1)",
    date: "2025-05-26T17:35:00",
    platform: "codeforces",
  },
  {
    title: "Codeforces Round #956 (Div. 2)",
    date: "2025-05-26T17:35:00",
    platform: "codeforces",
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
  },
  {
    title: "LeetCode Weekly Contest 407",
    date: "2025-06-01T08:00:00",
    platform: "leetcode",
  },
  {
    title: "Codeforces Round #957 (Div. 3)",
    date: "2025-06-03T17:35:00",
    platform: "codeforces",
  },
  {
    title: "CodeChef Starters 156",
    date: "2025-06-04T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Weekly Contest 408",
    date: "2025-06-08T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 157",
    date: "2025-06-11T20:00:00",
    platform: "codechef",
  },
  {
    title: "Educational Codeforces Round #167 (Div. 2)",
    date: "2025-06-12T17:35:00",
    platform: "codeforces",
  },
  {
    title: "LeetCode Biweekly Contest 145",
    date: "2025-06-14T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 409",
    date: "2025-06-15T08:00:00",
    platform: "leetcode",
  },
  {
    title: "Codeforces Round #958 (Div. 1 + Div. 2)",
    date: "2025-06-16T17:35:00",
    platform: "codeforces",
  },
  {
    title: "CodeChef Starters 158",
    date: "2025-06-18T20:00:00",
    platform: "codechef",
  },
  {
    title: "Codeforces Round #959 (Div. 2)",
    date: "2025-06-22T19:35:00",
    platform: "codeforces",
  },
  {
    title: "LeetCode Weekly Contest 410",
    date: "2025-06-22T08:00:00",
    platform: "leetcode",
  },
  {
    title: "CodeChef Starters 159",
    date: "2025-06-25T20:00:00",
    platform: "codechef",
  },
  {
    title: "LeetCode Biweekly Contest 146",
    date: "2025-06-28T20:00:00",
    platform: "leetcode",
  },
  {
    title: "LeetCode Weekly Contest 411",
    date: "2025-06-29T08:00:00",
    platform: "leetcode",
  },
  {
    title: "Codeforces Round #960 (Div. 4)",
    date: "2025-06-30T17:35:00",
    platform: "codeforces",
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
    </Card>
  );
}

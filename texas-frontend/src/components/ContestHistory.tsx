import React from 'react';
import { Trophy, Calendar, Star } from 'lucide-react';
import { format } from 'date-fns';

interface Contest {
  id: string;
  platform: string;
  name: string;
  date: string;
  participated: boolean;
  rank?: number;
  rating?: number;
}

interface ContestHistoryProps {
  contests: Contest[];
}

export function ContestHistory({ contests }: ContestHistoryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
        <Trophy className="w-5 h-5 mr-2" />
        Contest History
      </h3>
      <div className="space-y-4">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  {contest.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(contest.date), 'PPP')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {contest.participated && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    Participated
                  </span>
                )}
                {contest.rating && (
                  <span className="inline-flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span>{contest.rating}</span>
                  </span>
                )}
              </div>
            </div>
            {contest.participated && contest.rank && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Rank: #{contest.rank}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
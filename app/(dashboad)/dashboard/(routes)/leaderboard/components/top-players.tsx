"use client"

import { motion } from "framer-motion";

import { LeaderboardUser } from "@/types/typings";
import { cn } from "@/lib/utils";

import UserAvatar from "@/components/global/user-avatar";

interface TopPlayersProps {
  playerList: LeaderboardUser[];
}

const TopPlayers = ({ playerList }: TopPlayersProps) => {
  const sortedPlayers = [...playerList].sort((a, b) => b.points - a.points);
  const [first, second, third] = sortedPlayers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
        
      className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg border dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-8">🏆 Leaderboard</h2>

      {/* Podium Section */}
      <div className="flex justify-center items-end md:gap-14 gap-8 relative">
        <Player player={second} rank={2} />
        <Player player={first} rank={1} />
        <Player player={third} rank={3} />
      </div>

      {/* Top 10 Players List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Top 10 Players</h3>
        <ul className="mt-4 space-y-4">
          {sortedPlayers.slice(3).map((player, index) => (
            <li
              key={player.id}
              className="flex
              items-center justify-between bg-slate-50 dark:bg-neutral-800
              p-4 cursor-pointer  transition rounded-lg"
            >
              <span >
                {index + 4}. {player.name || "User"}
              </span>
              <span>{player.points} Points</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Player = ({
  player,
  rank,
}: {
    player: LeaderboardUser;
    rank: number;
  }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center relative",
        rank === 1 ? "md:top-0" : "md:top-2"
      )}
    >
      {/* Avatar and Badge */}
      <UserAvatar
        className={cn(
          "w-16 h-16",
          rank === 1 ? "md:w-24 md:h-24" : "md:w-18 md:h-18"
        )}
        alt={player.name || "User"}
        imageUrl={`https://api.dicebear.com/9.x/dylan/svg?seed=${player.id}`}
        fallback={player.name ? player.name[0] : "A"}
        fallbackStyle="text-3xl"
      />

      {/* Name */}
      <p className="text-lg font-semibold mt-2">{player.name || "User"}</p>

      {/* Points */}
      <p className="text-sm p-2 bg-gray-100 dark:bg-neutral-700 rounded-md font-medium">
        {player.points} Points
      </p>

      {/* Rank */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gray-100  dark:bg-neutral-800 text-black dark:text-white flex items-center justify-center rounded-full">
        {rank}
      </div>
    </div>
  );
};

export default TopPlayers;

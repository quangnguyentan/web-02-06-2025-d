import { Match } from "@/types/index";
import { UserIcon, LiveIcon } from "./Icon";
import * as React from "react";
import team_1 from "@/assets/user/team-1.png";
import team_2 from "@/assets/user/team-2.png";

const SpotlightMatchCard: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <div className="bg-slate-800 shadow-lg overflow-hidden flex flex-col rounded-xl">
      {/* Header: League Name & Live Status */}
      <div
        className={`p-2 flex justify-between items-center ${
          match.isLive ? "bg-red-700/80" : "bg-slate-700/70"
        }`}
      >
        <div className="flex items-center space-x-1.5">
          {match.leagueIcon && (
            <span className="text-yellow-300">{match.leagueIcon}</span>
          )}
          <span
            className="text-xs font-semibold text-white truncate"
            title={match.leagueName}
          >
            {match.leagueName}
          </span>
        </div>
        {match.isLive && (
          <div className="flex items-center space-x-1">
            <LiveIcon className="w-2 h-2 text-white" />
            <span className="text-xs text-white font-bold uppercase">
              {match.liveStatus || "LIVE"}
            </span>
          </div>
        )}
      </div>

      {/* Main Content: Teams & Time/VS */}
      <div className="p-2 sm:p-3 flex-grow">
        <div className="flex items-center justify-around mb-2">
          {/* Team A */}
          <div className="flex flex-col items-center text-center w-2/5">
            <img
              src={team_1}
              alt={match.teamA.name}
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-1"
            />
            <span className="text-xs sm:text-sm text-white font-medium truncate w-full">
              {match.teamA.name}
            </span>
          </div>

          {/* Time/Date or VS */}
          <div className="text-center px-1">
            <div className="text-sm sm:text-base font-bold text-gray-300">
              {match.time}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">{match.date}</div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center text-center w-2/5">
            <img
              src={team_2}
              alt={match.teamB.name}
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-1"
            />
            <span className="text-xs sm:text-sm text-white font-medium truncate w-full">
              {match.teamB.name}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Streamer & Buttons */}
      <div className="p-2 bg-slate-800/50 border-t border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            {match.streamerAvatarUrl ? (
              <img
                src={match.streamerAvatarUrl}
                alt={match.streamerName}
                className="w-5 h-5 rounded-full flex-shrink-0"
              />
            ) : (
              <UserIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm text-sky-400 truncate">
              {match.streamerName || "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={match.matchUrl || "#"}
            className="flex-1 bg-slate-600 hover:bg-slate-500 text-white text-xs sm:text-sm font-semibold py-1.5 px-2 rounded transition-colors text-center"
          >
            Xem Ngay
          </a>
          {match.showBetButton && (
            <a
              href={match.betUrl || "#"}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-2 rounded transition-colors text-center"
            >
              Đặt Cược
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotlightMatchCard;

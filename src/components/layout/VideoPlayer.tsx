import { useState, useRef, useEffect } from "react";
import {
  PlayCircleIconSolid,
  PauseCircleIconSolid,
  SpeakerWaveIconSolid,
  SpeakerXMarkIconSolid,
  ArrowsPointingOutIconSolid,
  Cog6ToothIconSolid,
} from "./Icon";
import * as React from "react";

interface VideoPlayerProps {
  videoTitle?: string;
  videoUrl?: string; // URL for the video source
  posterUrl?: string; // Optional poster image
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoTitle = "Live Stream",
  videoUrl,
  posterUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true); // Show controls initially and on pause
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) setIsMuted(false);
    if (!isMuted && newVolume === 0) setIsMuted(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleSettings = () => {
    /* Placeholder */ console.log("Open settings");
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      controlsTimeout.current = window.setTimeout(
        () => setShowControls(false),
        2000
      );
    }
  };

  useEffect(() => {
    setShowControls(!isPlaying || !videoRef.current?.played.length); // Show if paused or not started
  }, [isPlaying]);

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black text-white rounded-lg shadow-2xl overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="absolute inset-0 w-full h-full object-contain" // object-contain to see whole video
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onVolumeChange={() => {
          if (videoRef.current) {
            setVolume(videoRef.current.volume);
            setIsMuted(videoRef.current.muted);
          }
        }}
      />

      {/* Big Play Button Overlay (only if poster is shown and not playing) */}
      {!isPlaying && posterUrl && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
        >
          <PlayCircleIconSolid className="w-20 h-20 text-white/80 hover:text-white" />
        </button>
      )}

      {/* Custom Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1.5 mb-2 accent-red-500 cursor-pointer"
          aria-label="Video progress"
        />

        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="hover:text-red-500 transition-colors"
            >
              {isPlaying ? (
                <PauseCircleIconSolid className="w-7 h-7" />
              ) : (
                <PlayCircleIconSolid className="w-7 h-7" />
              )}
            </button>
            <div className="flex items-center group/volume">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="hover:text-red-500 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <SpeakerXMarkIconSolid className="w-6 h-6" />
                ) : (
                  <SpeakerWaveIconSolid className="w-6 h-6" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 ml-1 accent-red-500 cursor-pointer opacity-0 group-hover/volume:opacity-100 sm:opacity-100 transition-opacity"
                aria-label="Volume"
              />
            </div>
            <span className="text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* <span className="text-xs bg-red-600 px-1.5 py-0.5 rounded">LIVE</span> */}{" "}
            {/* Usually not for replays */}
            <button
              onClick={handleSettings}
              aria-label="Settings"
              className="hover:text-red-500 transition-colors"
            >
              <Cog6ToothIconSolid className="w-6 h-6" />
            </button>
            <button
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              className="hover:text-red-500 transition-colors"
            >
              <ArrowsPointingOutIconSolid className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Video Title Overlay - top left corner */}
      <div
        className={`absolute top-0 left-0 p-3 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-sm font-semibold">{videoTitle}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;

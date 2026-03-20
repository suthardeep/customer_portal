import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { useToggle } from "@/hooks/useToggle";
import Hls from "hls.js";
import { useCallback, useEffect, useRef, useState } from "react";
import ShortActionIconButton from "../shorts/components/actions/ShortActionIconButton";
import { Popover } from "@/components/base/popover/Popover";
import MenuItem from "@/components/base/MenuItem";

interface HlsVideoPlayerProps {
  hlsUrl: string;
  thumbnail: string;
  alt: string;
  autoplay?: boolean;
  className?: string;
}

export function HlsVideoPlayer({
  hlsUrl,
  thumbnail,
  alt,
  autoplay = false,
  className,
}: HlsVideoPlayerProps) {
  const { isOpen: isPlaying, open: startPlaying } = useToggle(autoplay);
  const { isOpen: isPaused, open: pause, close: resume } = useToggle();
  const { isOpen: isMuted, toggle: toggleMute } = useToggle();
  const [progress, setProgress] = useState(0);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const pauseIconTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Attach HLS to the video element. Called either via ref callback (autoplay)
  // or once isPlaying flips true (manual play).
  const initHls = useCallback(
    (video: HTMLVideoElement) => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
        video.play();
      }
    },
    [hlsUrl],
  );

  // Ref callback — fires synchronously after the <video> element mounts.
  // Guarantees the ref is populated before we try to attach HLS.
  const videoRefCallback = useCallback(
    (node: HTMLVideoElement | null) => {
      (videoRef as React.RefObject<HTMLVideoElement | null>).current = node;
      if (!node) return;
      initHls(node);
    },
    [initHls],
  );

  // Destroy HLS on unmount
  useEffect(() => {
    return () => {
      hlsRef.current?.destroy();
      if (pauseIconTimerRef.current) clearTimeout(pauseIconTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  }, []);

  const seekTo = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = seekBarRef.current;
    if (!video || !bar || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      seekTo(e.clientX);
    },
    [seekTo],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      seekTo(e.clientX);
    },
    [seekTo],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [],
  );

  const handleVideoClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      resume();
    } else {
      video.pause();
      pause();
    }

    setShowPauseIcon(true);
    if (pauseIconTimerRef.current) clearTimeout(pauseIconTimerRef.current);
    pauseIconTimerRef.current = setTimeout(() => setShowPauseIcon(false), 800);
  }, [pause, resume]);

  // Manual play: thumbnail click -> startPlaying -> isPlaying becomes true ->
  // video element mounts -> ref callback fires -> initHls runs
  if (!isPlaying) {
    return (
      <div
        className={`relative cursor-pointer ${className ?? ""}`}
        onClick={startPlaying}
      >
        <Image src={thumbnail} alt={alt} className="size-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full backdrop-blur-md bg-black/40 p-4 border border-n-800">
            <Icon name="PlayFill" size="xl" className="text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-black ${className ?? ""}`}>
      {/* Video */}
      <video
        ref={videoRefCallback}
        loop
        playsInline
        autoPlay
        className="w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
      />

      {/* Center pause/play flash icon */}
      {showPauseIcon && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-black/50 p-4 animate-fade-out">
            <Icon
              name={isPaused ? "PlayFill" : "Pause"}
              size="xl"
              className="text-white"
            />
          </div>
        </div>
      )}

      {/* Top controls - visible only when paused */}
      {isPaused && (
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-3 pt-3">
          <ShortActionIconButton
            name={isMuted ? "VolumeOff" : "VolumeUp"}
            onClick={toggleMute}
          />
          <Popover
            trigger={
              <div>
                <ShortActionIconButton name={"MoreVertical"} />
              </div>
            }
          >
            <div>
              <MenuItem>Report</MenuItem>
            </div>
          </Popover>
        </div>
      )}

      {/* Bottom seek bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div
          ref={seekBarRef}
          className="h-1 w-full cursor-pointer bg-white/20 touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="h-full bg-linear-to-r from-p-400 to-p-300 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

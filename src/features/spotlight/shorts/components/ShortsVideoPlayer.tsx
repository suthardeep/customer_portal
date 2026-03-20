import { Icon } from "@/components/base/icon";
import { useToggle } from "@/hooks/useToggle";
import Hls from "hls.js";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface ShortsVideoPlayerHandle {
  play: () => void;
  pause: () => void;
  getVideoElement: () => HTMLVideoElement | null;
}

interface ShortsVideoPlayerProps {
  hlsUrl: string;
  thumbnail: string;
  alt: string;
  className?: string;
  /** When true, initialise HLS immediately and start playing */
  isActive: boolean;
  /** When true, initialise HLS with a 5s buffer cap but do not play */
  isPreload: boolean;
  onHlsReady?: (hls: Hls) => void;
}

const ShortsVideoPlayer = forwardRef<
  ShortsVideoPlayerHandle,
  ShortsVideoPlayerProps
>(function ShortsVideoPlayer(
  { hlsUrl, thumbnail, alt, className, isActive, isPreload, onHlsReady },
  ref,
) {
  const { isOpen: isPaused, open: pause, close: resume } = useToggle();
  const { isOpen: isMuted, toggle: toggleMute } = useToggle();
  const [progress, setProgress] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
      resume();
    },
    pause: () => {
      videoRef.current?.pause();
      pause();
    },
    getVideoElement: () => videoRef.current,
  }));

  const destroyHls = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    const video = videoRef.current;
    if (video) {
      video.src = "";
      video.load();
    }
  }, []);

  const initHls = useCallback(
    (video: HTMLVideoElement, preloadOnly: boolean) => {
      destroyHls();

      if (Hls.isSupported()) {
        const config = preloadOnly
          ? { maxBufferLength: 5, maxMaxBufferLength: 5 }
          : {};
        const hls = new Hls(config);
        hlsRef.current = hls;
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        onHlsReady?.(hls);

        if (!preloadOnly) {
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
          });
        }
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
        if (!preloadOnly) video.play();
      }
    },
    [hlsUrl, destroyHls, onHlsReady],
  );

  const videoRefCallback = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (!node) return;
      if (isActive) {
        initHls(node, false);
      } else if (isPreload) {
        initHls(node, true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isActive, isPreload],
  );

  // When isActive flips true after being preload, reinit as full player
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      initHls(video, false);
    } else if (isPreload && !hlsRef.current) {
      initHls(video, true);
    }
  }, [isActive, isPreload, initHls]);

  // Destroy on unmount
  useEffect(() => {
    return () => {
      destroyHls();
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, [destroyHls]);

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
    setShowFlash(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setShowFlash(false), 800);
  }, [pause, resume]);

  return (
    <div className={`relative overflow-hidden bg-black ${className ?? ""}`}>
      {/* Thumbnail shown until video is ready */}
      <img
        src={thumbnail}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
        aria-hidden="true"
      />

      <video
        ref={videoRefCallback}
        loop
        playsInline
        muted={isMuted}
        className="relative size-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
      />

      {/* Center play/pause flash */}
      {showFlash && (
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

      {/* Mute button — always visible */}
      <button
        type="button"
        className="absolute top-3 left-3 flex items-center justify-center size-9 rounded-full backdrop-blur-lg bg-black/30 border border-transparent"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Icon
          name={isMuted ? "VolumeOff" : "VolumeUp"}
          size="md"
          className="text-n-50"
        />
      </button>

      {/* Seek bar */}
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
});

export default ShortsVideoPlayer;

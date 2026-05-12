import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import Spinner from "@/components/compound/spinner/Spinner";
import { useToggle } from "@/hooks/useToggle";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import Hls from "hls.js";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ShortActionIconButton from "./actions/ShortActionIconButton";
import { Popover } from "@/components/base/popover/Popover";
import MenuItem from "@/components/base/MenuItem";
import { useShortsPlayerStore } from "../stores/shortsPlayerStore";
import ReportPostDialog from "./ReportPostDialog";

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
  postId: string;
  /** When true, initialise HLS immediately and start playing */
  isActive: boolean;
  /** When true, initialise HLS with a 5s buffer cap but do not play */
  isPreload: boolean;
  onHlsReady?: (hls: Hls) => void;
  onVideoReady?: (el: HTMLVideoElement) => void;
}

const ShortsVideoPlayer = forwardRef<
  ShortsVideoPlayerHandle,
  ShortsVideoPlayerProps
>(function ShortsVideoPlayer(
  {
    hlsUrl,
    thumbnail,
    alt,
    className,
    postId,
    isActive,
    isPreload,
    onHlsReady,
    onVideoReady,
  },
  ref,
) {
  const { isOpen: isPaused, open: pause, close: resume } = useToggle();
  const reportDialog = useToggle();
  const isMuted = useShortsPlayerStore((s) => s.isMuted);
  const setMuted = useShortsPlayerStore((s) => s.setMuted);
  const [progress, setProgress] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const canGoBack = useCanGoBack();

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
      setHasError(false);
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
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
        if (!preloadOnly) {
          video.muted = true;
          video.play().catch(() => {});
        }
      }
    },
    [hlsUrl, destroyHls, onHlsReady],
  );

  const handleVolumeClick = () => {
    setMuted(!isMuted);
    const video = videoRef.current;
    if (video?.paused) {
      video.play();
      resume();
    }
  };

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
      // Skip full reinit if HLS is already attached and playing this URL
      if (hlsRef.current && (hlsRef.current as Hls & { url?: string }).url === hlsUrl) {
        video.play().catch(() => {});
        return;
      }
      setIsLoading(true);
      initHls(video, false);
    } else if (isPreload && !hlsRef.current) {
      initHls(video, true);
    } else if (!isActive) {
      destroyHls();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isPreload]);

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

  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !reportDialog.isOpen) {
        e.preventDefault();
        handleVideoClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, handleVideoClick, reportDialog.isOpen]);

  useEffect(() => {
    if (!isActive) return;
    const handleVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
        pause();
      } else {
        video.play().catch(() => {});
        resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isActive, pause, resume]);

  return (
    <div className={`relative overflow-hidden bg-black ${className ?? ""}`}>
      {/* Thumbnail + spinner shown until video is ready */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10">
          <Image
            src={thumbnail}
            alt={alt}
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="stroke-n-50" size={40} />
          </div>
        </div>
      )}

      {/* Error state with retry */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 gap-3">
          <Icon name="AlertCircle" size="xl" className="text-n-50" />
          <button
            className="rounded-full bg-p-400 px-4 py-2 text-sm text-white"
            onClick={() => {
              const video = videoRef.current;
              if (video) initHls(video, !isActive);
            }}
          >
            Retry
          </button>
        </div>
      )}

      <video
        ref={videoRefCallback}
        loop
        playsInline
        muted
        preload={isActive || isPreload ? "auto" : "none"}
        className="relative size-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
        onCanPlay={() => {
          setIsLoading(false);
          if (videoRef.current) onVideoReady?.(videoRef.current);
        }}
        onError={() => setHasError(true)}
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
      {isPaused && (
        <div className="flex gap-1 items-center absolute top-3 left-3">
          {canGoBack && (
            <ShortActionIconButton
              name="ChevronLeft"
              onClick={() => router.history.back()}
              iconSize="md"
            />
          )}
          <Popover
            trigger={
              <div>
                <ShortActionIconButton
                  name="MoreVertical"
                  iconSize="md"
                  className="cursor-pointer"
                />
              </div>
            }
          >
            <div>
              <MenuItem
                startIcon="Report"
                className="text-n-900"
                onClick={reportDialog.open}
              >
                Report
              </MenuItem>
            </div>
          </Popover>
        </div>
      )}
      <ReportPostDialog
        isOpen={reportDialog.isOpen}
        onClose={reportDialog.close}
        postId={postId}
      />
      {/* Mute button — always visible */}
      {isPaused && (
        <ShortActionIconButton
          name={isMuted ? "VolumeOff" : "VolumeHigh"}
          className="absolute top-3 right-3"
          iconSize="md"
          onClick={handleVolumeClick}
        />
      )}

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

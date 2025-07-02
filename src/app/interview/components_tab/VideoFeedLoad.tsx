import { useEffect, useRef } from "react";

type Props = { need_video: boolean };

export default function Video_Feed({ need_video }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    // Stop all tracks first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Track stopped:", track.kind, track.readyState);
      });
      streamRef.current = null;
    }

    // Then clean up video element
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  };

  const startCamera = async () => {
    try {
      // Stop any existing stream first
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // Explicitly set audio to false if not needed
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("getUserMedia error:", err);
    }
  };

  useEffect(() => {
    if (need_video) {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [need_video]);

  // Also stop camera when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!need_video) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline // Important for mobile devices
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      className="rounded-[26px]"
    />
  );
}

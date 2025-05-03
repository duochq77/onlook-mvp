// src/utils/videoUtils.ts

export const loopVideo = (videoElement: HTMLVideoElement) => {
    if (!videoElement) return;
  
    videoElement.loop = true;
    videoElement.onended = () => {
      videoElement.currentTime = 0;
      videoElement.play().catch((err) => {
        console.error("Error replaying video:", err);
      });
    };
  };
  
  export const setupMutedAutoplay = (videoElement: HTMLVideoElement) => {
    if (!videoElement) return;
  
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
  
    videoElement
      .play()
      .catch((err) => {
        console.warn("Autoplay failed. User gesture required.", err);
      });
  };
  
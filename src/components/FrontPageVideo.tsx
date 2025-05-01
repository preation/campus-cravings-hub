// components/FrontPageVideo.tsx
import React from "react";

export default function FrontPageVideo() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <video
        src="/your-video.mp4"
        autoPlay
        loop
        muted
        controls
        className="w-full h-full object-cover"
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";

function Timer(props) {
  const timeLeft = props.time;
  const progress = timeLeft / 120;
  const radius = props.radius;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;
  function formatMinutesSeconds(seconds) {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  return (
    // <div className="w-full">
    <div className="relative">
      <svg className="transform -rotate-90" width="200" height="200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear text-primary"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center ">
        <h2 className="text-2xl md:text-3xl font-medium">{formatMinutesSeconds(timeLeft)}</h2>
      </div>
    </div>
    // </div>
  );
}

export default Timer;

import React, { useEffect, useState } from "react";

function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 60;
        }
        console.log(prev - 1);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isActive]);

  const progress = timeLeft / 60;
  const radius = props.radius;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

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
          <h2 className="text-3xl font-medium">{timeLeft}</h2>
        </div>
      </div>
    // </div>
  );
}

export default Timer;

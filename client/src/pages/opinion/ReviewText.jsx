import React, { useEffect, useRef, useState } from "react";

const ReviewText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * 4;

    if (el.scrollHeight > maxHeight) {
      setShowToggle(true);
    }
  }, [text]);

  return (
    <div className="text-justify">
      <p
        ref={textRef}
        className={`text-[13px] text-slate-700 mt-4 ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}
      >
        {text}
      </p>

      {showToggle && (
        <div className="flex justify-end mt-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-500 cursor-pointer"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewText;

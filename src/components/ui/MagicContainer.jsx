import React, { useState, useRef } from 'react';

const clsx = (...args) => args.filter(Boolean).join(' ');

const MagicContainer = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'magic-container relative rounded-3xl p-[1px] transition-all duration-300',
        isHovered && 'is-hovered',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default MagicContainer;
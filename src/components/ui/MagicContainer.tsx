'use client';

import React from 'react';

const clsx = (...args: (string | boolean | undefined | null)[]): string =>
  args.filter(Boolean).join(' ');

interface MagicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MagicContainer: React.FC<MagicContainerProps> = ({
  children,
  className,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
const containerRef = React.useRef<HTMLDivElement | null>(null);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

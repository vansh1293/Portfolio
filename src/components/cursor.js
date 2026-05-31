import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: var(--green);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorRing = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid var(--green);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out, width 0.2s, height 0.2s, background-color 0.2s;

  &.hovering {
    width: 60px;
    height: 60px;
    background-color: var(--green-tint);
    border-color: transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const onMouseMove = e => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = e => {
      const isClickable =
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button');
      setHovering(isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <CursorDot style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      <CursorRing
        className={hovering ? 'hovering' : ''}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default Cursor;

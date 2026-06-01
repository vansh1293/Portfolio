import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
  overflow: hidden;

  .sky-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0a0a0a; /* Fallback midnight */
  }

  .grid-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 50px 50px;
    background-image: linear-gradient(to right, rgba(100, 255, 218, 0.12) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(100, 255, 218, 0.12) 1px, transparent 1px);
    animation: panGrid 20s linear infinite;
    /* This mask makes the grid smoothly fade out towards the bottom of the screen */
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
  }

  .stars-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hidden at the top (dusk) */

    .star {
      position: absolute;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.3);
      animation: twinkle 4s infinite alternate;
    }
  }

  .celestial-body {
    position: absolute;
    top: 0;
    left: 0;
    width: 50vmax;
    height: 50vmax;
    transform: translate(-50%, -50%);
  }

  .celestial-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* We start with the warm sunset glow */
    background: radial-gradient(circle, rgba(255, 136, 34, 0.4) 0%, rgba(255, 136, 34, 0) 70%);
    filter: blur(60px);
  }
  @keyframes panGrid {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 50px;
    }
  }
  @keyframes twinkle {
    0% {
      opacity: 0.1;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

const GsapBackground = () => {
  const containerRef = useRef(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars only on the client side to avoid hydration mismatch
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2.5 + 0.5}px`,
      height: `${Math.random() * 2.5 + 0.5}px`,
      animationDelay: `${Math.random() * 4}s`,
    }));
    setStars(generatedStars);

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      const isMobile = window.innerWidth <= 768;

      // 1. Move the celestial body container
      tl.fromTo(
        '.celestial-body',
        {
          xPercent: -50,
          yPercent: -50,
          x: isMobile ? '0vw' : '15vw',
          y: isMobile ? '0vh' : '20vh',
        },
        {
          xPercent: -50,
          yPercent: -50,
          x: '85vw',
          y: '70vh',
          ease: 'power1.inOut',
        },
        0,
      );

      // 1b. Morph the glow color
      tl.fromTo(
        '.celestial-glow',
        { background: 'radial-gradient(circle, rgba(255,136,34,0.4) 0%, rgba(255,136,34,0) 70%)' },
        {
          background: 'radial-gradient(circle, rgba(226,232,240,0.3) 0%, rgba(226,232,240,0) 70%)',
          ease: 'power1.inOut',
        },
        0,
      );

      // 2. Change the sky from a deep sunset dusk to midnight navy
      tl.fromTo(
        '.sky-bg',
        { backgroundColor: '#1a1016' }, // Deep dusk
        { backgroundColor: '#0a0a0a', ease: 'power1.inOut' }, // Midnight
        0,
      );

      // 3. Fade in the stars as night falls
      tl.fromTo('.stars-layer', { opacity: 0 }, { opacity: 1, ease: 'power2.in' }, 0);

      // 4. Fade out the grid pattern as we scroll to the stars
      tl.fromTo('.grid-layer', { opacity: 1 }, { opacity: 0, ease: 'power1.inOut' }, 0);

      // Fix: The page height changes drastically after the loading screen disappears.
      // We need to tell ScrollTrigger to recalculate its start/end points.
      const observer = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      observer.observe(document.body);

      return () => {
        observer.disconnect();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <BackgroundContainer ref={containerRef} aria-hidden="true">
      <div className="sky-bg"></div>
      <div className="grid-layer"></div>

      <div className="stars-layer">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.width,
              height: star.height,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="celestial-body">
        <div className="celestial-glow"></div>
      </div>
    </BackgroundContainer>
  );
};

export default GsapBackground;

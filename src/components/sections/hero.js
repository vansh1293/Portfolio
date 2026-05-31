import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  text-align: center;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    z-index: 1;

    h1 {
      margin: 0 0 20px 0px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
      font-weight: 400;
    }

    h2, h3 {
      font-size: clamp(40px, 6vw, 70px);
      text-align: center;
    }

    h3 {
      margin-top: 5px;
      color: var(--slate);
      line-height: 0.9;
    }

    .terminal-wrapper {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 40px auto 10px;
      text-align: left;
      
      .terminal-window {
        background: rgba(5, 5, 5, 0.95);
        border: 1px solid #333;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 15px rgba(100,255,218,0.15);
        font-family: var(--font-mono);
      }

      .terminal-header {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        background: #111;
        border-bottom: 1px solid #333;

        .dots {
          display: flex;
          gap: 6px;
          span { width: 12px; height: 12px; border-radius: 50%; }
          .red { background: #ff5f56; }
          .yellow { background: #ffbd2e; }
          .green { background: #27c93f; }
        }

        .title {
          margin: 0 auto;
          color: #888;
          font-size: var(--fz-xs);
          padding-right: 48px;
        }
      }

      .terminal-body {
        padding: 24px 30px;
        color: var(--green);
        font-size: var(--fz-md);
        line-height: 1.8;
        
        .line {
          margin-bottom: 10px;
        }

        .cursor {
          display: inline-block;
          width: 10px;
          height: 18px;
          background-color: var(--green);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 8px;
          margin-bottom: -2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .prompt { color: var(--green); margin-right: 12px; }
      }
    }

    .email-link {
      ${({ theme }) => theme.mixins.bigButton};
      margin-top: 50px;
    }

    /* Custom Mask Slide-Up Animation */
    .mask-wrapper {
      overflow: hidden;
      width: 100%;
      padding: 0 10px; /* Prevent clipping */
      margin: 0 -10px; 
    }

    .slideup-enter .reveal-target {
      transform: translateY(120%);
      opacity: 0;
    }
    .slideup-enter-active .reveal-target,
    .slideup-enter-done .reveal-target {
      transform: translateY(0);
      opacity: 1;
      transition-property: transform, opacity;
      transition-duration: 800ms, 600ms;
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1), ease-out;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState('');

  const bioText = "I'm a Full Stack Developer specializing in building scalable web applications, AI-powered products, and real-time systems. Currently, I'm a Computer Science undergraduate at Jaypee Institute of Information Technology.";

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(bioText);
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    let i = 0;
    let typingInterval;
    // Wait for the terminal window to completely fade in before typing
    const startDelay = setTimeout(() => {
      typingInterval = setInterval(() => {
        setTypedText(bioText.substring(0, i + 1));
        i++;
        if (i === bioText.length) {
          clearInterval(typingInterval);
        }
      }, 20); // 20ms per character for a fast, techy typing speed
    }, 1300);

    return () => {
      clearTimeout(startDelay);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [isMounted, prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Vansh Arora.</h2>;
  const three = <h3 className="big-heading">Software Engineer focused on AI and scalable systems.</h3>;
  const four = (
    <div className="terminal-wrapper">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="dots">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div className="title">guest@vansh-network:~</div>
        </div>
        <div className="terminal-body">
          <div className="line">
            <span className="prompt">&gt;</span> 
            {typedText}
            <span className="cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:vansh.arora@example.com"
      target="_blank"
      rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [
    { content: one, className: 'slideup' },
    { content: two, className: 'slideup' },
    { content: three, className: 'slideup' },
    { content: four, className: 'fadeup' },
    { content: five, className: 'fadeup' }
  ];

  return (
    <StyledHeroSection>
      <div className="hero-content">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item.content}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames={item.className} timeout={loaderDelay}>
                  <div 
                    className={item.className === 'slideup' ? 'mask-wrapper' : ''} 
                    style={{ transitionDelay: `${i + 1}00ms` }}
                  >
                    <div 
                      className={item.className === 'slideup' ? 'reveal-target' : ''}
                      style={item.className === 'slideup' ? { transitionDelay: `${i + 1}00ms` } : {}}
                    >
                      {item.content}
                    </div>
                  </div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;

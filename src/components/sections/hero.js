import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { IconReact, IconNextJs, IconPython, IconNodeJs } from '@components/icons';
import TextType from '@components/TextType';
import BlurText from '@components/BlurText';

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

    h2,
    h3 {
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
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 15px rgba(100, 255, 218, 0.15);
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
          span {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          .red {
            background: #ff5f56;
          }
          .yellow {
            background: #ffbd2e;
          }
          .green {
            background: #27c93f;
          }
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
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .prompt {
          color: var(--green);
          margin-right: 12px;
        }
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
      padding: 50px 10px 20px; /* Prevent clipping */
      margin: -50px -10px -20px;
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

  .floating-elements {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .floating-item {
      position: absolute;
      color: var(--green);
      opacity: 0.25;
      font-family: var(--font-mono);
      font-size: var(--fz-lg);
      font-weight: 500;
      user-select: none;
      animation-name: floatAnimation;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      text-shadow: 0 0 10px rgba(100, 255, 218, 0.2);

      svg {
        width: 70px;
        height: 70px;
        fill: currentColor;
      }
    }

    @media (max-width: 768px) {
      .floating-item {
        font-size: 10px;
        opacity: 0.15;
        svg {
          width: 35px;
          height: 35px;
        }
      }
      .item-1 {
        top: 5%;
        left: 2%;
      }
      .item-2 {
        top: 12%;
        right: 2%;
      }
      .item-3 {
        bottom: 10%;
        left: 2%;
      }
      .item-4 {
        bottom: 20%;
        right: 2%;
      }
      .item-5 {
        bottom: 5%;
        right: 2%;
      }
      .item-6 {
        top: 6%;
        right: 2%;
      }
      .item-7 {
        bottom: 28%;
        left: 2%;
      }
      .item-8 {
        top: 25%;
        left: 2%;
      }
    }

    /* Pushed to the extreme corners of the 100vw container */
    .item-1 {
      top: 12%;
      left: 8%;
      animation-duration: 12s;
    }
    .item-2 {
      top: 18%;
      right: 10%;
      animation-duration: 15s;
      animation-delay: 1.5s;
      animation-name: floatAnimationAlt;
    }
    .item-3 {
      bottom: 15%;
      left: 12%;
      animation-duration: 13s;
      animation-delay: 0.5s;
    }
    .item-4 {
      bottom: 25%;
      right: 8%;
      animation-duration: 14s;
      animation-delay: 2s;
      animation-name: floatAnimationAlt;
    }

    .item-5 {
      bottom: 10%;
      right: 15%;
      animation-duration: 11s;
      animation-delay: 1s;
    }
    .item-6 {
      top: 10%;
      right: 25%;
      animation-duration: 16s;
      animation-delay: 2.5s;
      animation-name: floatAnimationAlt;
    }
    .item-7 {
      bottom: 35%;
      left: 6%;
      animation-duration: 12s;
      animation-delay: 0.8s;
    }
    .item-8 {
      top: 35%;
      left: 4%;
      animation-duration: 14s;
      animation-delay: 1.2s;
      animation-name: floatAnimationAlt;
    }
  }

  @keyframes floatAnimation {
    0% {
      transform: translate(0px, 0px) rotate(-2deg);
    }
    100% {
      transform: translate(20px, -60px) rotate(4deg);
    }
  }

  @keyframes floatAnimationAlt {
    0% {
      transform: translate(0px, 0px) rotate(2deg);
    }
    100% {
      transform: translate(-25px, -50px) rotate(-3deg);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState('');

  const bioText =
    'I\'m a Full Stack Developer specializing in building scalable web applications, AI-powered products, and real-time systems. Currently, I\'m a Computer Science undergraduate at Jaypee Institute of Information Technology.';

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(bioText);
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) {
      return;
    }

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
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [isMounted, prefersReducedMotion]);

  const one = (
    <BlurText as="h1" text="Hi, my name is" delay={50} animateBy="words" direction="top" />
  );
  const two = (
    <BlurText
      as="h2"
      className="big-heading"
      text="Vansh Arora."
      delay={100}
      animateBy="words"
      direction="top"
    />
  );
  const three = (
    <TextType
      as="h3"
      className="big-heading"
      text="Software Developer | Full Stack Engineer"
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
      loop={false}
    />
  );
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
      href="mailto:aroravansh.com@gmail.com"
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
    { content: five, className: 'fadeup' },
  ];

  return (
    <StyledHeroSection>
      {isMounted && (
        <div className="floating-elements">
          <div className="floating-item item-1">
            <IconPython />
          </div>
          <div className="floating-item item-2">
            <IconReact />
          </div>
          <div className="floating-item item-3">
            <IconNextJs />
          </div>
          <div className="floating-item item-4">
            <IconNodeJs />
          </div>

          <div className="floating-item item-5">import {'{ AI }'}</div>
          <div className="floating-item item-6">SELECT * FROM systems</div>
          <div className="floating-item item-7">npm run dev</div>
          <div className="floating-item item-8">&lt;Developer /&gt;</div>
        </div>
      )}
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
                    style={{ transitionDelay: `${i + 1}00ms` }}>
                    <div
                      className={item.className === 'slideup' ? 'reveal-target' : ''}
                      style={
                        item.className === 'slideup' ? { transitionDelay: `${i + 1}00ms` } : {}
                      }>
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

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--navy);
  z-index: 99;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  transform: ${props => (props.isFinished ? 'translateY(-100%)' : 'translateY(0)')};

  .greeting-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(25px, 4vw, 40px);
    font-family: var(--font-mono);
    color: var(--lightest-slate);

    .dot {
      color: var(--green);
      margin-right: 15px;
      font-size: clamp(25px, 4vw, 40px);
      line-height: 1;
    }

    .text-container {
      width: 120px; /* Adjusted fixed width for the smaller font size to keep centering balanced */
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .greeting-text {
      opacity: ${props => (props.isFading ? 0 : 1)};
      transform: ${props => (props.isFading ? 'translateY(10px)' : 'translateY(0)')};
      transition: opacity 0.15s ease, transform 0.15s ease;
      white-space: nowrap;
    }
  }
`;

const greetings = ['Hello', 'Namaste', 'Bonjour', 'Hola', 'Ciao', 'こんにちは', 'أرحبو', 'Hello'];

const Loader = ({ finishLoading }) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (index === greetings.length - 1) {
      setTimeout(() => {
        setIsFinished(true);
        setTimeout(() => finishLoading(), 600);
      }, 300);
      return;
    }

    const timeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex(prev => prev + 1);
        setIsFading(false);
      }, 150);
    }, 180);

    return () => clearTimeout(timeout);
  }, [index, finishLoading]);

  return (
    <StyledLoader className="loader" isFinished={isFinished} isFading={isFading}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />

      <div className="greeting-wrapper">
        <span className="dot">•</span>
        <div className="text-container">
          <span className="greeting-text">{greetings[index]}</span>
        </div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledLeadershipSection = styled.section`
  max-width: 900px;

  .leadership-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;
  }

  .leadership-item {
    h3 {
      font-size: var(--fz-xl);
      color: var(--lightest-slate);
      margin-bottom: 5px;

      .title {
        color: var(--green);
      }
    }

    .range {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--light-slate);
      margin-bottom: 15px;
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
    }
  }
`;

const Leadership = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledLeadershipSection id="leadership" ref={revealContainer}>
      <h2 className="numbered-heading">Extracurriculars</h2>

      <div className="leadership-list">
        <div className="leadership-item">
          <h3>
            Frontend Developer <span className="title">@ Google Developer Groups</span>
          </h3>
          <p className="range">September 2024 - August 2025 | Noida, U.P.</p>
          <ul>
            <li>
              Orchestrated BitBox 5.0 hackathon with 1400+ registrations, coordinating a 12-hour
              event and achieving 100% completion rate with zero technical incidents.
            </li>
            <li>
              Spearheaded the Google Cloud Study Jam for 80+ participants, directing a 4-person team
              to deliver 10+ hands-on labs.
            </li>
          </ul>
        </div>

        <div className="leadership-item">
          <h3>
            Participant <span className="title">@ Competitive Programming</span>
          </h3>
          <p className="range">2023 - Present | Online Platforms</p>
          <ul>
            <li>
              Secured 3rd place out of 100+ teams at Code Clash, utilizing advanced data structures
              and algorithms to solve complex challenges within strict time constraints.
            </li>
            <li>
              Formulated optimal solutions for 700+ algorithmic challenges across platforms like
              LeetCode (600+) and CodeForces (100+).
            </li>
          </ul>
        </div>

        <div className="leadership-item">
          <h3>
            Contributor <span className="title">@ Open Source Contributions</span>
          </h3>
          <p className="range">2023 - Present | GitHub</p>
          <ul>
            <li>
              Successfully merged 25+ Pull Requests across various repositories, notably engineered
              the HOD Dashboard for a faculty appraisal system to streamline department-level
              performance tracking.
            </li>
          </ul>
        </div>
      </div>
    </StyledLeadershipSection>
  );
};

export default Leadership;

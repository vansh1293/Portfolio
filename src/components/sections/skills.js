import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import {
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiTailwindcss,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiVercel,
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaDatabase, FaBrain, FaLayerGroup } from 'react-icons/fa';
import { DiVisualstudio } from 'react-icons/di';

const StyledSkillsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 30px 10px;
    margin-top: 50px;
    list-style: none;
    padding: 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    }
  }

  .skill-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: var(--transition);
    cursor: default;

    /* Very dark/dimmed out by default */
    svg {
      width: 45px;
      height: 45px;
      color: rgba(255, 255, 255, 0.15); /* Black shaded/dimmed */
      margin-bottom: 12px;
      transition: all 0.3s ease;
    }

    .text-icon {
      font-size: 35px;
      color: rgba(255, 255, 255, 0.15);
      margin-bottom: 12px;
      font-family: var(--font-mono);
      font-weight: bold;
      transition: all 0.3s ease;
      filter: grayscale(100%) opacity(0.35);
    }

    span {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: rgba(255, 255, 255, 0.15); /* Black shaded/dimmed */
      transition: all 0.3s ease;
      letter-spacing: 0.5px;
    }

    /* Hover effect: Glows with theme color */
    &:hover {
      transform: translateY(-5px);

      svg,
      .text-icon {
        color: var(--green);
        filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.5));
      }

      span {
        color: var(--green);
        text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const allSkills = [
    { name: 'C', icon: <SiC /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'React.js', icon: <SiReact /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'Express.js', icon: <SiExpress /> },
    { name: 'Socket.io', icon: <SiSocketdotio /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'LangChain', icon: <span className="text-icon">🦜🔗</span> },
    { name: 'SQL', icon: <FaDatabase /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Vector DBs', icon: <FaLayerGroup /> },
    { name: 'RAG', icon: <FaBrain /> },
    { name: 'Git', icon: <SiGit /> },
    { name: 'GitHub', icon: <SiGithub /> },
    { name: 'Postman', icon: <SiPostman /> },
    { name: 'Docker', icon: <SiDocker /> },
    { name: 'Vercel', icon: <SiVercel /> },
    { name: 'VS Code', icon: <DiVisualstudio /> },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">My Skills</h2>

      <ul className="skills-grid">
        {allSkills.map((skill, i) => (
          <li className="skill-item" key={i}>
            {skill.icon}
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </StyledSkillsSection>
  );
};

export default Skills;

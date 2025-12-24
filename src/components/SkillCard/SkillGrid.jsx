import React from 'react';
import SkillCard from './SkillCard';
import { skillsPrimary } from '../../data/skillsData/skillsPrimary';
import { skillsSecondary } from '../../data/skillsData/skillsSecondary';
import './SkillCard.css';

const SkillStack = () => {
  return (
    <div className="skills-main-container">
      <div className="skills-row">
        {skillsPrimary.map((skill, index) => (
          <SkillCard key={`pri-${index}`} skill={skill} />
        ))}
      </div>

      <div className="skills-row">
        {skillsSecondary.map((skill, index) => (
          <SkillCard key={`sec-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillStack;
import React from 'react';
import './SkillCard.css';

const SkillCard = ({ skill }) => {
  const themes = {
    API:     { main: '#38bdf8', sec: '#f061fdff' },
    SEC:     { main: '#4ade80', sec: '#83eee9ff' },
    WEB:     { main: '#fbbf24', sec: '#87da03ff' },
    UI:      { main: '#a78bfa', sec: '#db2777' },
    DB:      { main: '#f061fdff', sec: '#f00303ff' },
    CLOUD:   { main: '#4ade80', sec: '#00fa5cff' },
    CI:      { main: '#fbbf24', sec: '#ea580c' },
    MOBILE:  { main: '#a78bfa', sec: '#db2777' },
    NET:     { main: '#06b6d4', sec: '#86ca95ff' },
    HW:      { main: '#f43f5e', sec: '#9f1239' }
  };

  const theme = themes[skill.icon] || { main: '#ffffff', sec: '#cccccc' };

  return (
    /* Este contenedor se queda quieto y detecta el mouse */
    <div className="skill-card-container">
     
      <div 
        className="skill-card" 
        style={{ 
          '--card-color': theme.main,
          '--card-color-secondary': theme.sec 
        }}
      >
        <div className="skill-card-backlight"></div>
        <div className="skill-card-dots"></div>

        <div className="skill-content">
          <div className="skill-badge" style={{ 
            color: theme.main, 
            backgroundColor: `${theme.main}1A`,
            border: `1px solid ${theme.main}40`
          }}>
            {skill.icon}
          </div>
          
          <h3 className="skill-card-title">{skill.title}</h3>
          
          <div className="skill-card-subtitle" style={{ color: theme.main }}>
            {skill.subtitle}
          </div>

          <div className="skill-divider"></div>
          
          <p className="skill-desc">{skill.description}</p>

          {skill.tags && skill.tags.length > 0 && (
            <div className="skill-tags-container">
              {skill.tags.map((tag, index) => (
                <span key={index} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
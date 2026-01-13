import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file Utility functions and components for handling background patterns.
 * These patterns are used throughout the dashboard to add visual flair.
 */

const PATTERN_FILES = [
  'pattern-01.png',
  'pattern-02.png',
  'pattern-03.png',
  'pattern-04.png',
  'pattern-05.png',
  'pattern-06.png',
];

/**
 * Returns a randomly selected pattern file name from the available patterns.
 * @returns {string} A random pattern file name (e.g., 'pattern-03.png').
 */
export const getRandomPattern = () => {
  const randomIndex = Math.floor(Math.random() * PATTERN_FILES.length);
  return PATTERN_FILES[randomIndex];
};

/**
 * Generates a CSS style object for applying a pattern as a background.
 * @param {string} patternName - The filename of the pattern (e.g., 'pattern-01.png').
 * @param {number} [opacity=0.1] - The opacity of the background pattern, from 0 to 1.
 * @returns {React.CSSProperties} A style object suitable for inline styling.
 */
export const getPatternStyle = (patternName, opacity = 0.1) => {
  if (!patternName) return {};
  return {
    backgroundImage: `url(/logos/${patternName})`,
    opacity: opacity,
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  };
};

/**
 * A React component that renders its children over a patterned background.
 * The pattern can be specified or a random one will be chosen.
 *
 * @param {object} props - The component props.
 * @param {string} [props.pattern] - The specific pattern filename to use. If not provided, a random pattern will be chosen.
 * @param {number} [props.opacity=0.1] - The opacity of the background pattern.
 * @param {React.ReactNode} props.children - The content to be rendered over the pattern.
 * @param {string} [props.className=''] - Additional CSS classes for the container div.
 * @returns {JSX.Element} A div with a patterned background and children.
 */
export const PatternBackground = ({ pattern, opacity = 0.1, children, className = '' }) => {
  const selectedPattern = pattern || getRandomPattern();
  const style = getPatternStyle(selectedPattern, opacity);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-lg" style={style}></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

PatternBackground.propTypes = {
  pattern: PropTypes.string,
  opacity: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
};

PatternBackground.defaultProps = {
  pattern: null,
  opacity: 0.1,
  children: null,
  className: '',
};

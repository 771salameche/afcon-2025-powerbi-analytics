import { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = fullConfig.theme.screens;

const useBreakpoint = (breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
    const handler = (event) => setMatches(event.matches);

    handler(mediaQuery);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
};

export default useBreakpoint;

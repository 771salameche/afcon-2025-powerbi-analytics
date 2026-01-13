import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const teamLogoMap = {
  "Algeria": "algeria_algeria-national-team.football-logos.cc.svg",
  "Angola": "angola_angola-national-team.football-logos.cc.svg",
  "Benin": "benin_benin-national-team.football-logos.cc.svg",
  "Botswana": "botswana_botswana-national-team.football-logos.cc.svg",
  "Burkina Faso": "burkina-faso_burkina-faso-national-team.football-logos.cc.svg",
  "Cameroon": "cameroon_cameroon-national-team.football-logos.cc.svg",
  "Comoros": "comoros_comoros-national-team.football-logos.cc.svg",
  "DR Congo": "congo-dr_congo-dr-national-team.football-logos.cc.svg",
  "Egypt": "egypt_egypt-national-team.football-logos.cc.svg",
  "Equatorial Guinea": "equatorial-guinea_equatorial-guinea-national-team.football-logos.cc.svg",
  "Gabon": "gabon_gabon-national-team.football-logos.cc.svg",
  "Ivory Coast": "cote-d-ivoire_cote-d-ivoire-national-team.football-logos.cc.svg",
  "Mali": "mali_mali-national-team.football-logos.cc.svg",
  "Morocco": "morocco_morocco-national-team.football-logos.cc.svg",
  "Mozambique": "mozambique_mozambique-national-team.football-logos.cc.svg",
  "Nigeria": "nigeria_nigeria-national-team.football-logos.cc.svg",
  "Senegal": "senegal_senegal-national-team.football-logos.cc.svg",
  "South Africa": "south-africa_south-africa-national-team.football-logos.cc.svg",
  "Sudan": "sudan_sudan-national-team.football-logos.cc.svg",
  "Tanzania": "Tanzania_FF_(logo).png",
  "Tunisia": "tunisia_tunisia-national-team.football-logos.cc.svg",
  "Uganda": "uganda_uganda-national-team.football-logos.cc.svg",
  "Zambia": "zambia_zambia-national-team.football-logos.cc.svg",
  "Zimbabwe": "zifa-full-crest.png",
};

const TeamLogo = ({ teamName, size = 'md' }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const fileName = teamLogoMap[teamName];
    if (fileName) {
      setImgSrc(`/logos/${fileName}`);
    } else {
      const genericSlug = teamName.toLowerCase().replace(/\s/g, '-');
      setImgSrc(`/logos/teams/${genericSlug}.svg`);
    }
  }, [teamName]);

  const handleImageError = () => {
    setError(true);
    setImgSrc('');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 md:w-8 md:h-8';
      case 'md':
        return 'w-8 h-8 md:w-10 md:h-10';
      case 'lg':
        return 'w-10 h-10 md:w-12 md:h-12';
      case 'xl':
        return 'w-12 h-12 md:w-16 md:h-16';
      case 'xxl':
        return 'w-16 h-16 md:w-24 md:h-24';
      default:
        return 'w-8 h-8 md:w-10 md:h-10';
    }
  };

  if (error) {
    const initials = teamName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    return (
      <div className={`flex items-center justify-center bg-gray-300 text-gray-700 rounded-full ${getSizeClasses()} flex-shrink-0`}>
        <span className="text-xs font-semibold">{initials}</span>
      </div>
    );
  }

  return (
    <motion.img
      src={imgSrc}
      alt={`${teamName} Logo`}
      className={`${getSizeClasses()} object-contain flex-shrink-0`}
      onError={handleImageError}
      whileHover={{ scale: 1.05 }}
    />
  );
};

TeamLogo.propTypes = {
  teamName: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
};

TeamLogo.defaultProps = {
  size: 'md',
};

export default TeamLogo;

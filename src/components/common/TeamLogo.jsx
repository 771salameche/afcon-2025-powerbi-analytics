import React, { useState, useEffect } from 'react'; // Import useEffect for initial image source setting

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
  "Senegal": "senegal_senegal-national-team.football-logos.cc.svg",
  "South Africa": "south-africa_south-africa-national-team.football-logos.cc.svg",
  "Sudan": "sudan_sudan-national-team.football-logos.cc.svg",
  "Tanzania": "Tanzania_FF_(logo).png", // Note: This is a PNG and has a different naming style
  "Tunisia": "tunisia_tunisia-national-team.football-logos.cc.svg",
  "Uganda": "uganda_uganda-national-team.football-logos.cc.svg",
  "Zambia": "zambia_zambia-national-team.football-logos.cc.svg",
  "Zimbabwe": "zifa-full-crest.png", // Note: This is a PNG and has a different naming style
};

const TeamLogo = ({ teamName, size = 'md' }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false); // Reset error on teamName change
    const fileName = teamLogoMap[teamName];
    if (fileName) {
      setImgSrc(`/logos/${fileName}`);
    } else {
      // Fallback to generic slug if not in map
      const genericSlug = teamName.toLowerCase().replace(/\s/g, '-');
      setImgSrc(`/logos/teams/${genericSlug}.svg`); // Assuming .svg for generic fallback
    }
  }, [teamName]);

  const handleImageError = () => {
    setError(true);
    setImgSrc(''); // Clear the src to prevent further error attempts
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'md':
        return 'w-8 h-8';
      case 'lg':
        return 'w-10 h-10';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  if (error) {
    // Fallback: Display initials or a generic placeholder
    const initials = teamName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    return (
      <div className={`flex items-center justify-center bg-gray-300 text-gray-700 rounded-full ${getSizeClasses()} flex-shrink-0`}>
        <span className="text-xs font-semibold">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`${teamName} Logo`}
      className={`${getSizeClasses()} object-contain flex-shrink-0`}
      onError={handleImageError}
    />
  );
};

export default TeamLogo;

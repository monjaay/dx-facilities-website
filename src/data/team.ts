export type TeamMember = {
  name: string;
  role: string;
  company: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "El Hadji Malick Gueye",
    role: "Fondateur et CEO",
    company: "DEXTERA GROUP",
    bio: "15+ ans d'expertise en génie civil et management QHSE. Projets de référence : P2i Diamniadio, Tour des Mamelles, Hôtel Azalaï Dakar, TER Dakar-AIBD.",
  },
  {
    name: "Mamadou Ndiaye",
    role: "CEO",
    company: "DX Facilities",
    bio: "15+ ans en digitalisation, maintenance multitechnique et gestion des services généraux. Parcours : Global Tech, Groupe SERTEM, CGF Bourse.",
  },
  {
    name: "Kinta Lucia Sene",
    role: "QHSE Manager",
    company: "DX Facilities",
    bio: "20+ ans en management QSE. Auditrice tierce partie Groupe AFNOR. Expertise ISO 9001:2015.",
  },
  {
    name: "Ibrahima Thiam",
    role: "MEP Manager",
    company: "DX Facilities",
    bio: "15+ ans en génie électromécanique. Expert systèmes techniques complexes. Parcours : Groupe SERTEM.",
  },
  {
    name: "Samba Diallo",
    role: "Security Solutions Manager",
    company: "DX Facilities",
    bio: "Spécialiste solutions de sécurité intégrées. Expert en systèmes de contrôle d'accès et vidéoprotection.",
  },
];

// Single source of truth for portfolio content — synced to the
// RohulRayEdward_SoftwareDeveloper resume (full-stack: Java · Spring Boot · React.js).

export interface Project {
  index: string;
  year: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  href: string;
  tone: 'accent' | 'deep';
}

export interface Stat {
  value: number;
  label: string;
  decimals: number;
  pad?: number;
  suffix?: string;
}

export interface SkillGroup {
  code: string;
  label: string;
  tone: 'accent' | 'paper';
  items: string[];
}

export interface Section {
  id: string;
  label: string;
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    year: '2025',
    title: 'BookREST API',
    desc: 'A layered Spring Boot REST API (Controller → Service → Repository) for a book catalog — full CRUD, pagination, and search by author, title and price range. Service and web layers tested with JUnit, Mockito and MockMvc.',
    tags: ['Java 21', 'Spring Boot', 'JPA · MySQL', 'JUnit · Mockito'],
    image: '/proj-bookrest.jpg',
    href: 'https://github.com/Hashcat07/book-rest-api',
    tone: 'accent',
  },
  {
    index: '02',
    year: '2025',
    title: 'PokéMemory',
    desc: 'A React memory-card game that fetches 12 randomized Pokémon per session via Promise.all. Score and high-score managed with React hooks, a Fisher–Yates shuffle each turn, and loading / error-retry states. Deployed on Netlify.',
    tags: ['React.js', 'Vite', 'PokéAPI', 'Netlify'],
    image: '/proj-pokememory.jpg',
    href: 'https://pokimemory.netlify.app',
    tone: 'deep',
  },
  {
    index: '03',
    year: '2024',
    title: 'Battleship',
    desc: 'A test-driven Battleship game with a full Jest unit suite covering ship placement, hit/miss tracking and win detection. Webpack bundling with ESLint and Prettier; live on GitHub Pages.',
    tags: ['JavaScript', 'Jest · TDD', 'Webpack', 'GitHub Pages'],
    image: '/proj-battleship.jpg',
    href: 'https://hashcat07.github.io/battleship',
    tone: 'accent',
  },
];

export const STATS: Stat[] = [
  { value: 8.24, label: 'CGPA / 10', decimals: 2 },
  { value: 2027, label: 'Expected Grad', decimals: 0 },
  { value: 10, label: 'Live Web Apps', decimals: 0, pad: 2, suffix: '+' },
  { value: 35, label: 'GitHub Repos', decimals: 0, pad: 2, suffix: '+' },
];

export const SKILLS: SkillGroup[] = [
  { code: 'A1', label: 'Languages', tone: 'accent', items: ['Java', 'JavaScript ES6+', 'SQL'] },
  { code: 'A2', label: 'Backend', tone: 'paper', items: ['Spring Boot', 'Spring Core', 'Spring Data JPA', 'REST APIs', 'Maven'] },
  { code: 'A3', label: 'Frontend', tone: 'accent', items: ['React.js', 'HTML5 · CSS3', 'Responsive Design', 'SPA Architecture', 'Component UI'] },
  { code: 'A4', label: 'Tools & Testing', tone: 'paper', items: ['Git · GitHub', 'Node.js', 'Vite · Webpack', 'Jest · JUnit', 'React Testing Library'] },
  { code: 'A5', label: 'Concepts', tone: 'accent', items: ['DSA (Java / JS)', 'OOP', 'DBMS', 'REST', 'Async (fetch / await)'] },
];

export const CERTS: string[] = [
  'NASSCOM — Software Programmer (Java)',
  'NPTEL (IIT) — Intro to Machine Learning',
  'UiPath — Automation Developer Associate (RPA)',
  'NASSCOM — Cybersecurity Fundamentals',
];

export const MARQUEE: string[] = [
  'JAVA', 'SPRING BOOT', 'REACT.JS', 'REST APIs', 'TDD — JEST · JUNIT', 'SQL · JPA',
];

export const ROTATING_WORDS: string[] = ['interfaces.', 'REST APIs.', 'experiences.'];

export const SECTIONS: Section[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
];

export const LINKS = {
  email: 'srohulrayedward@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rohul-ray-edward-s-b40720293',
  github: 'https://github.com/Hashcat07',
};

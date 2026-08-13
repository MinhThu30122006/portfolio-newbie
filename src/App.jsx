import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, Mail, MapPin, Phone } from 'lucide-react';
import ThreeHero from './components/ThreeHero';
import { journey, projects, skillGroups } from './data';

const githubUrl = 'https://github.com/MinhThu30122006';
const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

function Header({ activeSection }) {
  return (
    <header className="site-header" id="top">
      <a className={`brand ${activeSection === 'home' ? 'is-active' : ''}`} href="#home" aria-label="Back to home">
        <span className="brand-mark">MT</span>
        <span className="brand-name">Minh Thu<span>.</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            className={activeSection === item.id ? 'is-active' : ''}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="mailto:phamthiminhthu@gmail.com">Let's talk <ArrowUpRight size={15} /></a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-pad" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> Frontend developer in progress</p>
        <h1>Designing<br /><em>digital</em> feelings.</h1>
        <p className="hero-intro">I'm <strong>Phạm Thị Minh Thư</strong>, an aspiring frontend developer passionate about turning ideas into polished, intuitive, and engaging web experiences.</p>
        <div className="hero-actions">
          <a className="btn btn-dark" href="#work">Explore my work <ArrowDown size={15} /></a>
          <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </div>
        <div className="hero-meta">
          <div><span className="meta-label">Based in</span><span>Ho Chi Minh City</span></div>
          <div><span className="meta-label">Currently</span><span>HUTECH University</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-ring ring-one" /><div className="visual-ring ring-two" />
        <ThreeHero />
        <div className="visual-note"><span className="pulse-dot" /> open to opportunities</div>
        <div className="portrait-wrap">
          <img src="/anhr.jpg" alt="Phạm Thị Minh Thư" />
          <span className="portrait-caption">a little<br /><i>about me</i></span>
        </div>
        <div className="hero-stamp">Scroll<br />to explore</div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ['React', 'TypeScript', 'UI craft', 'Interactive web', 'React', 'TypeScript', 'UI craft', 'Interactive web'];
  return <section className="ticker" aria-label="Technologies and specialties"><div className="ticker-track">{items.map((item, index) => <span className="ticker-item" key={`${item}-${index}`}><span>{item}</span><b>✦</b></span>)}</div></section>;
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="section-kicker">01 / About me</div>
      <div className="about-grid">
        <h2>Curious mind,<br /><em>careful details.</em></h2>
        <div className="about-body">
          <p>I'm currently studying at <strong>Ho Chi Minh City University of Technology (HUTECH)</strong>, with a strong focus on frontend development. I enjoy building products with thoughtful structure, refined visuals, and natural user experiences.</p>
          <p>My current goal is to gain hands-on experience, strengthen my product mindset, and grow into a well-rounded <strong>Fullstack Developer</strong> with solid technical foundations.</p>
          <div className="about-facts"><span><b>01</b> thoughtful UI</span><span><b>02</b> eager to learn</span><span><b>03</b> team mindset</span></div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <div className="section-kicker">02 / Skills & toolkit</div>
      <div className="section-heading-row"><h2>My everyday<br /><em>toolkit.</em></h2><p>The technologies I use to turn visual concepts into responsive and engaging digital experiences.</p></div>
      <div className="skills-table">{skillGroups.map((group) => <div className="skill-row" key={group.category}><div className="skill-cat">{group.category}</div><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
    </section>
  );
}

function ProjectVisual({ variant }) {
  if (variant === 'pink') return <div className="project-window"><div /><div /><div /><p>teamspace<br /><b>dashboard</b></p></div>;
  if (variant === 'lilac') return <div className="mobile-card"><div className="mobile-top">finly</div><strong>Good morning,<br />Minh Thu</strong><div className="mobile-chart"><i /><i /><i /><i /><i /></div><small>Weekly overview</small></div>;
  return <div className="note-stack"><div className="note note-back" /><div className="note note-mid" /><div className="note note-front"><b>notes for<br />better days</b><span>✎</span></div></div>;
}

function Work() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-kicker">03 / Design explorations</div>
      <div className="section-heading-row"><h2>What I'm<br /><em>building next.</em></h2><p>Three product directions I'm exploring to apply frontend skills to practical, real-world challenges.</p></div>
      <div className="project-grid">{projects.map((project, index) => <article className={`project-card ${index === 0 ? 'project-featured' : ''}`} key={project.name}><div className={`project-visual project-${project.variant}`}><span className="project-number">{project.number}</span><span className="project-symbol">{project.variant === 'pink' ? '◌' : project.variant === 'lilac' ? '✦' : '✣'}</span><ProjectVisual variant={project.variant} /></div><div className="project-info"><div><p className="project-type">{project.type}</p><h3>{project.name}</h3></div><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="View Minh Thu's GitHub profile"><ArrowUpRight /></a></div></article>)}</div>
    </section>
  );
}

function Journey() {
  return <section className="journey section-pad" id="journey"><div className="section-kicker">04 / The journey</div><div className="journey-grid"><h2>Building with<br /><em>intention.</em></h2><div className="journey-list">{journey.map((item) => <div className="journey-item" key={item.label}><span>{item.label}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div></section>;
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-top"><div className="section-kicker">05 / Contact</div><p>Have a project in mind?</p></div>
      <h2>Let's make something<br /><em>meaningful.</em></h2>
      <a className="contact-email" href="mailto:phamthiminhthu@gmail.com">phamthiminhthu@gmail.com <ArrowUpRight /></a>
      <div className="contact-bottom">
        <div><span><Phone size={12} /> Phone</span><a href="tel:0368473717">036 847 3717</a></div>
        <div><span><Code2 size={12} /> GitHub</span><a href={githubUrl} target="_blank" rel="noreferrer">@MinhThu30122006</a></div>
        <div><span><MapPin size={12} /> Location</span><strong>Ho Chi Minh City, VN</strong></div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 280);
      let current = 'home';
      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = section.id;
      });
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header activeSection={activeSection} />
      <main><Hero /><Ticker /><About /><Skills /><Work /><Journey /><Contact /></main>
      <footer className="site-footer"><span>© 2026 Phạm Thị Minh Thư</span><span><Mail size={11} /> Designed & built with care <i>♥</i></span><a href="#top">Back to top <ArrowUp size={12} /></a></footer>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Scene = "hello" | "work" | "about" | "contact";
type Category =
  | "All work"
  | "Films & cinematography"
  | "Photography"
  | "Editing & post-production"
  | "Personal experiments";

type Project = {
  title: string;
  category: Exclude<Category, "All work">;
  role: string;
  image: string;
  alt: string;
  href: string;
  description: string;
};

const projects: Project[] = [
  {
    title: "GAMBLE",
    category: "Films & cinematography",
    role: "Co-directed and edited",
    image: "/work/gamble-music-video.jpg",
    alt: "Official GAMBLE music video thumbnail",
    href: "https://youtu.be/sU3qit_YyWI",
    description: "Official music video. Credited role: co-direction and editing.",
  },
  {
    title: "Vishwakarandak ’25 Aftermovie",
    category: "Films & cinematography",
    role: "Selected shots and editing",
    image: "/work/vishwakarandak-aftermovie.jpg",
    alt: "Vishwakarandak ’25 aftermovie thumbnail",
    href: "https://youtu.be/HUk21evYZV0",
    description: "The Vishwakarandak ’25 aftermovie.",
  },
  {
    title: "Pehchaan Tu — Promo 1",
    category: "Films & cinematography",
    role: "Song promo, shot and edited",
    image: "/work/pehchaan-promo-1.webp",
    alt: "Pehchaan Tu song promo 1 thumbnail",
    href: "https://www.instagram.com/p/Dd896J6hyD7/",
    description: "The first Pehchaan Tu song promo, shot and edited by Random Hours.",
  },
  {
    title: "Pehchaan Tu — Promo 2",
    category: "Films & cinematography",
    role: "Song promo, shot and edited",
    image: "/work/pehchaan-promo-2.webp",
    alt: "Pehchaan Tu song promo 2 thumbnail",
    href: "https://www.instagram.com/p/DeMaoS5hs2q/",
    description: "The second Pehchaan Tu song promo, shot and edited by Random Hours.",
  },
  {
    title: "Pehchaan Tu — Promo 3",
    category: "Films & cinematography",
    role: "Song promo, shot and edited",
    image: "/work/pehchaan-promo-3.webp",
    alt: "Pehchaan Tu song promo 3 thumbnail",
    href: "https://www.instagram.com/p/DeeOi_VBy_P/",
    description: "The third Pehchaan Tu song promo, shot and edited by Random Hours.",
  },
  {
    title: "Ganpati Visarjan, Mumbai",
    category: "Films & cinematography",
    role: "Event film, shot and edited",
    image: "/work/ganpati-visarjan.webp",
    alt: "A night frame from Ganpati Visarjan in Mumbai",
    href: "https://www.instagram.com/p/Dd3QuvguAtM/",
    description: "An event film from Ganpati Visarjan in Mumbai.",
  },
  {
    title: "Ganpati Visarjan, Mumbai — Stills",
    category: "Photography",
    role: "Event photography",
    image: "/work/ganpati-photography.webp",
    alt: "Still photograph from Ganpati Visarjan",
    href: "https://www.instagram.com/p/Dd0b_jYDhde/",
    description: "Still moments from Ganpati Visarjan.",
  },
  {
    title: "Pat Bakery Café",
    category: "Photography",
    role: "Photography, visual study",
    image: "/work/pat-cafe.webp",
    alt: "Signage and details at Pat Bakery Café",
    href: "https://www.instagram.com/p/DdepqNWDo-D/",
    description: "A detail-led café photograph built around signage and atmosphere.",
  },
  {
    title: "Ganpati Aagman, Pune — Stills",
    category: "Photography",
    role: "Event photography",
    image: "/work/ganpati-aagman-photo.webp",
    alt: "Ganpati Aagman event photography in Pune",
    href: "https://www.instagram.com/p/DdULUPsDuz1/",
    description: "Photographs from Ganpati Aagman in Pune.",
  },
  {
    title: "Ganpati Aagman, Pune — Film",
    category: "Films & cinematography",
    role: "Event film, shot and edited",
    image: "/work/ganpati-aagman-video.webp",
    alt: "Ganpati Aagman event film frame in Pune",
    href: "https://www.instagram.com/p/DdTcxvKu2C_/",
    description: "Moving images from Ganpati Aagman in Pune.",
  },
  {
    title: "VIT Pune",
    category: "Photography",
    role: "Photography, visual study",
    image: "/work/vit-pune.webp",
    alt: "Photographic study at VIT Pune",
    href: "https://www.instagram.com/p/DdLOEHeiIux/",
    description: "A photographic study at Vishwakarma Institute of Technology, Pune.",
  },
  {
    title: "The Silent Patient",
    category: "Photography",
    role: "Product photography",
    image: "/work/silent-patient.webp",
    alt: "Product photograph of The Silent Patient",
    href: "https://www.instagram.com/p/DdDb51bggh8/",
    description: "A product-style photograph of The Silent Patient.",
  },
  {
    title: "The Working Hour",
    category: "Personal experiments",
    role: "Artist visual for Chets",
    image: "/work/working-hour.webp",
    alt: "Artist visual from The Working Hour featuring Chets",
    href: "https://www.instagram.com/p/Dc-QHjaidFv/",
    description: "A visual from The Working Hour, featuring Chets.",
  },
  {
    title: "Denver",
    category: "Photography",
    role: "Product photography",
    image: "/work/denver.webp",
    alt: "Product photograph for Denver",
    href: "https://www.instagram.com/p/Dc33FfGji9R/",
    description: "Product photography for Denver.",
  },
  {
    title: "GAMBLE — Official Trailer",
    category: "Films & cinematography",
    role: "Music visual, trailer",
    image: "/work/gamble-trailer.webp",
    alt: "GAMBLE official trailer thumbnail",
    href: "https://www.instagram.com/p/DYtvz4kqgcY/",
    description: "Trailer visual for GAMBLE.",
  },
  {
    title: "GAMBLE — Teaser",
    category: "Films & cinematography",
    role: "Music visual, teaser",
    image: "/work/gamble-teaser.webp",
    alt: "GAMBLE teaser thumbnail",
    href: "https://www.instagram.com/p/DYUg9o9Kc2x/",
    description: "Teaser visual for GAMBLE.",
  },
  {
    title: "Crescendo ’25 — Aftermovie Trailer",
    category: "Editing & post-production",
    role: "Aftermovie trailer edit",
    image: "/work/crescendo-trailer.png",
    alt: "Stage performance still from the Crescendo ’25 aftermovie trailer",
    href: "https://www.instagram.com/reel/DIZK_csKCzc/",
    description: "A stage-and-performance edit for the aftermovie trailer.",
  },
  {
    title: "Vishwakarandak ’25 — Teaser",
    category: "Editing & post-production",
    role: "Teaser edit",
    image: "/work/vishwakarandak-teaser.png",
    alt: "Vishwakarandak ’25 teaser thumbnail",
    href: "https://www.instagram.com/reel/DEhLh2uR2dp/",
    description: "A teaser edit for Vishwakarandak ’25.",
  },
  {
    title: "Crescendo ’25 — Promotional Video",
    category: "Editing & post-production",
    role: "Promotional edit",
    image: "/work/crescendo-promo.png",
    alt: "Crescendo ’25 promotional video thumbnail",
    href: "https://www.instagram.com/reel/DDjn-YUs-Jb/",
    description: "A promotional edit built around a black-and-white college collage.",
  },
  {
    title: "Crescendo ’25 — Kabaddi Teaser",
    category: "Editing & post-production",
    role: "Kabaddi teaser edit",
    image: "/work/crescendo-kabaddi.png",
    alt: "Crescendo ’25 kabaddi teaser thumbnail",
    href: "https://www.instagram.com/reel/DDmUtObN_fI/",
    description: "A high-energy kabaddi edit for the event teaser.",
  },
  {
    title: "Aero Fusion — Event Promotion",
    category: "Editing & post-production",
    role: "Event promotion edit",
    image: "/work/aero-fusion.png",
    alt: "Aero Fusion event promotion thumbnail",
    href: "https://www.instagram.com/reel/CyI-w7woqYi/",
    description: "Promotional edit for Aero Fusion at Vishwa Tech Spectra ’24.",
  },
  {
    title: "RC Racing — Event Promotion",
    category: "Editing & post-production",
    role: "Event promotion edit",
    image: "/work/rc-racing.png",
    alt: "RC Racing event promotion thumbnail",
    href: "https://www.instagram.com/reel/CyOLkmsIkdQ/",
    description: "Promotional edit for RC Racing at Vishwa Tech Spectra ’24.",
  },
  {
    title: "Battle Bots — Event Promotion",
    category: "Editing & post-production",
    role: "Event promotion edit",
    image: "/work/battle-bots.png",
    alt: "Battle Bots event promotion thumbnail",
    href: "https://www.instagram.com/reel/CyWGN-tvXH1/",
    description: "Promotional edit for Battle Bots at Vishwa Tech Spectra ’24.",
  },
];

const categories: Category[] = [
  "All work",
  "Films & cinematography",
  "Photography",
  "Editing & post-production",
  "Personal experiments",
];

const chapters: { id: Scene; label: string }[] = [
  { id: "hello", label: "Hello" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function PortfolioExperience() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene>("hello");
  const [category, setCategory] = useState<Category>("All work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = projects.filter(
    (project) => category === "All work" || project.category === category,
  );

  useEffect(() => {
    const stops = experienceRef.current?.querySelectorAll<HTMLElement>("[data-chapter-stop]");
    if (!stops?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeStop = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        const nextScene = activeStop?.target.getAttribute("data-chapter-stop") as Scene | null;
        if (nextScene) setScene(nextScene);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-16% 0px -16% 0px" },
    );

    stops.forEach((stop) => observer.observe(stop));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateScrollProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = experienceRef.current;
        if (!root) return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        root.style.setProperty("--scroll-progress", progress.toFixed(3));
        root.style.setProperty("--image-shift", `${progress * -28}px`);
        root.style.setProperty("--copy-shift", `${progress * -12}px`);
        root.style.setProperty("--texture-shift", `${progress * 42}px`);
      });
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);

  function goToScene(nextScene: Scene) {
    setScene(nextScene);
    setMenuOpen(false);
    setSelectedProject(null);

    const stop = document.getElementById(`chapter-stop-${nextScene}`);
    stop?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="experience-scroll-root" ref={experienceRef}>
    <div className={`experience-shell scene-${scene}`}>
      <header className="experience-header">
        <a className="experience-brand" href="#hello" onClick={() => goToScene("hello")}>
          RANDOM HOURS<span>.</span>
        </a>
        <p className="experience-status">Independent filmmaker <span>·</span> Pune, India</p>
        <nav className="experience-top-nav" aria-label="Main navigation">
          <button type="button" onClick={() => goToScene("work")}>Work</button>
          <button type="button" onClick={() => goToScene("about")}>About</button>
          <button type="button" onClick={() => goToScene("contact")}>Contact</button>
          <a href="https://www.instagram.com/randomhours.mp4/" target="_blank" rel="noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <button
          className="experience-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-scene-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-scene-menu" id="mobile-scene-menu" aria-label="Mobile navigation">
          <button type="button" onClick={() => goToScene("work")}>Work</button>
          <button type="button" onClick={() => goToScene("about")}>About</button>
          <button type="button" onClick={() => goToScene("contact")}>Contact</button>
          <a href="https://www.instagram.com/randomhours.mp4/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </nav>
      )}

      <main className="experience-main" aria-live="polite">
        <section className="experience-scene intro-scene" id="hello" aria-labelledby="intro-title" hidden={scene !== "hello"}>
          <div className="intro-copy">
            <p className="scene-kicker">Independent filmmaker · Visual storyteller</p>
            <h1 id="intro-title" className="monument-title"><span>RANDOM</span><span>HOURS</span></h1>
            <p className="intro-tagline">Stories told in frames.</p>
            <p className="intro-description">Exploring light, movement, atmosphere and the moments in between.</p>
            <button className="scene-action" type="button" onClick={() => goToScene("work")}>Explore selected work <span aria-hidden="true">↗</span></button>
          </div>
          <button className="intro-frame" type="button" onClick={() => { setSelectedProject(projects[0]); }} aria-label="Open the GAMBLE project details">
            <Image src="/work/ganpati-visarjan.webp" alt="A night frame from Ganpati Visarjan in Mumbai" width={639} height={746} priority sizes="(max-width: 720px) 88vw, 46vw" />
            <span className="intro-frame-caption">Ganpati Visarjan · Mumbai</span>
            <span className="intro-frame-open" aria-hidden="true">↗</span>
          </button>
          <p className="intro-disciplines">Cinematography <span>·</span> Photography <span>·</span> Film editing</p>
        </section>

        <section className="experience-scene work-scene" id="work" aria-labelledby="work-title" hidden={scene !== "work"}>
          <div className="work-scene-heading">
            <div>
              <p className="scene-kicker">Selected work</p>
              <h1 id="work-title">Frames in motion</h1>
            </div>
            <p className="work-scene-note">Films, photographs and edits. Select a frame to see its details.</p>
          </div>
          <div className="category-rail" role="group" aria-label="Filter projects by category">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <select
            className="category-select"
            aria-label="Filter projects by category"
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
          >
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <div className="project-track" aria-label={`${visibleProjects.length} projects`}>
            {visibleProjects.map((project) => (
              <button className="experience-project" key={project.title} type="button" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} details`}>
                <span className="experience-project-image">
                  <Image src={project.image} alt={project.alt} width={800} height={1100} sizes="(max-width: 720px) 78vw, 30vw" />
                  <span className="experience-project-open" aria-hidden="true">↗</span>
                </span>
                <span className="experience-project-copy">
                  <span className="experience-project-title">{project.title}</span>
                  <span className="experience-project-meta">{project.category} <span>·</span> {project.role}</span>
                </span>
              </button>
            ))}
          </div>
          <a className="archive-link" href="https://www.instagram.com/randomhours.mp4/" target="_blank" rel="noreferrer">More from the Instagram archive <span aria-hidden="true">↗</span></a>
        </section>

        <section className="experience-scene about-scene" id="about" aria-labelledby="about-title" hidden={scene !== "about"}>
          <div className="about-scene-copy">
            <p className="scene-kicker">About Random Hours</p>
            <h1 id="about-title">Behind the frame</h1>
            <p className="about-lead">I’m Prathamesh Mohod, an independent filmmaker and visual storyteller drawn to the relationship between light, movement, music and emotion.</p>
            <p className="about-detail">Through cinematography, photography and editing, I explore how ordinary moments can become memorable visual experiences. The Sony A6700 is part of the toolkit; the story decides where the camera goes.</p>
            <div className="capability-block">
              <h2>Ways of working</h2>
              <p>Cinematography and videography <span>·</span> Video editing <span>·</span> Photography <span>·</span> Visual treatments <span>·</span> Music videos <span>·</span> Colour and post-production</p>
            </div>
          </div>
          <figure className="about-portrait">
            <Image src="/work/prathamesh-portrait.jpeg" alt="Prathamesh Mohod with his camera" width={1170} height={1025} sizes="(max-width: 720px) 72vw, 34vw" />
            <figcaption>Prathamesh Mohod · Pune, India</figcaption>
          </figure>
        </section>

        <section className="experience-scene contact-scene" id="contact" aria-labelledby="contact-title" hidden={scene !== "contact"}>
          <div className="contact-scene-copy">
            <p className="scene-kicker">Random Hours · Pune, India</p>
            <h1 id="contact-title">Have a story<br />worth telling?</h1>
            <p>Available for selected projects, creative collaborations and conversations about visual storytelling.</p>
            <div className="contact-email-list">
              <div className="contact-email-entry">
                <span className="contact-email-label">Studio / Projects</span>
                <a className="contact-email" href="mailto:randomhours07@gmail.com">randomhours07@gmail.com <span aria-hidden="true">↗</span></a>
              </div>
              <div className="contact-email-entry">
                <span className="contact-email-label">Personal</span>
                <a className="contact-email" href="mailto:prathameshmohod3@gmail.com">prathameshmohod3@gmail.com <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="contact-links">
            <a href="https://www.instagram.com/randomhours.mp4/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
            <a href="https://www.youtube.com/@RandomHours-q4b" target="_blank" rel="noreferrer">YouTube <span aria-hidden="true">↗</span></a>
            <span>© 2026 Random Hours</span>
          </div>
          <p className="contact-wordmark" aria-hidden="true">RANDOM HOURS</p>
        </section>
      </main>

      <nav className="chapter-rail" aria-label="Portfolio chapters">
        {chapters.map((chapter) => (
          <button key={chapter.id} type="button" aria-current={scene === chapter.id ? "page" : undefined} onClick={() => goToScene(chapter.id)}>
            <span className="chapter-marker" aria-hidden="true" />
            {chapter.label}
          </button>
        ))}
        <a className="chapter-email" href="mailto:prathameshmohod3@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
      </nav>

      {selectedProject && (
        <div className="project-dialog-backdrop" onClick={() => setSelectedProject(null)}>
          <article className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={(event) => event.stopPropagation()}>
            <button className="project-dialog-close" type="button" autoFocus onClick={() => setSelectedProject(null)} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
            <div className="project-dialog-image">
              <Image src={selectedProject.image} alt={selectedProject.alt} width={800} height={1100} sizes="(max-width: 720px) 90vw, 55vw" />
            </div>
            <div className="project-dialog-copy">
              <p className="scene-kicker">{selectedProject.category}</p>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <p className="project-dialog-role">Role: {selectedProject.role}</p>
              <a className="scene-action" href={selectedProject.href} target="_blank" rel="noreferrer">Open original project <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      )}
    </div>
      <div className="chapter-scroll-track" aria-hidden="true">
        {chapters.map((chapter) => (
          <div
            className="chapter-scroll-stop"
            data-chapter-stop={chapter.id}
            id={`chapter-stop-${chapter.id}`}
            key={chapter.id}
          />
        ))}
      </div>
    </div>
  );
}
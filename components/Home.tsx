import { PixelField } from "./PixelField";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageProvider";
import { messages, localePath, type Locale } from "../lib/i18n";
import { PiPulse, PiPulseThin, PiGithubLogo } from "react-icons/pi";
import { LiaRandomSolid } from "react-icons/lia";
import { GiHandOk } from "react-icons/gi";
import { RiArrowRightUpLine, RiArrowDownLine } from "react-icons/ri";

function ExternalArrow() {
  return <RiArrowRightUpLine className="external-arrow" viewBox="5.98291 6 12.02079 12.0208" />;
}

export default function Home({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const projects = [
    {
      name: "200 OK",
      slug: "200ok",
      index: "01",
      category: t.httpCategory,
      description: t.httpLead,
      detail: t.httpDetail,
      tags: ["HTTP", t.debugging, "API"],
      command: "curl 200ok.hacks.run/v1/ip",
      response: "192.0.2.1",
      icon: <GiHandOk />,
    },
    {
      name: "rand",
      slug: "rand",
      index: "02",
      category: t.randomCategory,
      description: t.randomLead,
      detail: t.randomDetail,
      tags: ["Nano ID", "Hex", "Base64"],
      command: "curl rand.hacks.run/hex/16",
      response: "a9f4c2e8b017d63f5a0c98e1247bd6f3",
      icon: <LiaRandomSolid />,
    },
  ];

  return (
    <>
      <div className="background" aria-hidden="true">
        <div className="hero-gradient" />
        <div className="hero-noise" />
        <PixelField />
      </div>
      <a className="skip" href="#projects">
        {t.skip}
      </a>
      <div className="shell">
        <header>
          <a className="brand" href={localePath(locale)} aria-label={t.home}>
            <span className="brand-mark">
              h<span>_</span>
            </span>
            hacks<span className="muted">.run</span>
          </a>
          <nav aria-label={t.navigation}>
            <a href="https://status.hacks.run/" className="status-link">
              <PiPulse size={17} />
              <span className="nav-label">{t.status}</span>
            </a>
            <a className="github-nav" href="https://github.com/teplostanski">
              <PiGithubLogo size={17} />
              <span className="nav-label">GitHub</span>
            </a>
            <div className="header-controls">
              <LanguageSelect />
              <ThemeToggle />
            </div>
          </nav>
        </header>
        <main>
          <section className="intro" aria-labelledby="headline">
            <p className="eyebrow">
              <span /> {t.eyebrow}
            </p>
            <h1 id="headline">
              {t.headline}
              <br />
              <span>{t.headlineAccent}</span>
            </h1>
            <p className="intro-copy">{t.intro}</p>
            <a className="explore" href="#projects">
              {t.explore} <span aria-hidden="true"><RiArrowDownLine size={22}/></span>
            </a>
            <span className="hero-note" aria-hidden="true">
              {t.note}
              <span>_</span>
            </span>
          </section>
          <section id="projects" aria-labelledby="projects-heading">
            <div className="section-heading">
              <h2 id="projects-heading">
                {t.projects} <span>02</span>
              </h2>
              <span>{t.projectsNote}</span>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className={`project ${project.slug}`} key={project.slug}>
                  <div className="card-top">
                    <span className="project-icon" aria-hidden="true">
                      {project.icon}
                    </span>
                    <span className="project-number">/{project.index}</span>
                  </div>
                  <p className="category">{project.category}</p>
                  <h3>
                    <a href={`https://${project.slug}.hacks.run/`}>
                      {project.name}
                      <span aria-hidden="true">
                        <ExternalArrow />
                      </span>
                    </a>
                  </h3>
                  <p className="card-lead">{project.description}</p>
                  <p className="card-description">{project.detail}</p>
                  <div className="terminal" aria-label={t.exampleLabel}>
                    <div>
                      <span className="terminal-dot" />
                      <span className="terminal-dot" />
                      <span className="terminal-dot" />
                      <span className="terminal-label">{t.example}</span>
                    </div>
                    <code>
                      <span className="prompt">$ </span>
                      {project.command}
                    </code>
                    <code className="response">{project.response}</code>
                  </div>
                  <ul className="tags" aria-label={t.features}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="card-footer">
                    <a className="open-project" href={`https://${project.slug}.hacks.run/`}>
                      {t.open}{" "}
                      <span aria-hidden="true">
                        <ExternalArrow />
                      </span>
                    </a>
                    <a
                      className="source-link"
                      href={`https://github.com/teplostanski/${project.slug}`}
                      aria-label={`${project.name} ${t.onGithub}`}
                    >
                      GitHub{" "}
                      <span aria-hidden="true">
                        <ExternalArrow />
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <a className="status-banner" href="https://status.hacks.run/">
            <span className="status-icon" aria-hidden="true">
              <PiPulseThin size={32} />
            </span>
            <span>
              <strong>{t.statusTitle}</strong>
              <span>{t.statusDescription}</span>
            </span>
            <span className="status-destination">
              status.hacks.run{" "}
              <span aria-hidden="true">
                <ExternalArrow />
              </span>
            </span>
          </a>
        </main>
        <footer>
          <span>© {new Date().getFullYear()} hacks.run</span>
          <a href="https://github.com/teplostanski">
            {t.madeBy} <span>@teplostanski</span>
          </a>
          <span className="footer-note">happy hacking.</span>
        </footer>
      </div>
    </>
  );
}

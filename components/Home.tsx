import styles from "./Home.module.css";
import { PixelField } from "./PixelField";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageProvider";
import { messages, localePath, type Locale } from "../lib/i18n";
import { PiPulse, PiPulseThin, PiGithubLogo } from "react-icons/pi";
import { LiaRandomSolid } from "react-icons/lia";
import { GiHandOk } from "react-icons/gi";
import { RiArrowRightUpLine, RiArrowDownLine } from "react-icons/ri";

function ExternalArrow() {
  return (
    <RiArrowRightUpLine className={styles["external-arrow"]} viewBox="5.98291 6 12.02079 12.0208" />
  );
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
      <div className={styles["background"]} aria-hidden="true">
        <div className={styles["hero-gradient"]} />
        <div className={styles["hero-noise"]} />
        <PixelField />
      </div>
      <a className={styles["skip"]} href="#projects">
        {t.skip}
      </a>
      <div className={styles["shell"]}>
        <header className={styles["header"]}>
          <a className={styles["brand"]} href={localePath(locale)} aria-label={t.home}>
            <span className={styles["brand-mark"]}>
              h<span>_</span>
            </span>
            hacks<span className={styles["muted"]}>.run</span>
          </a>
          <nav className={styles["nav"]} aria-label={t.navigation}>
            <a href="https://status.hacks.run/">
              <PiPulse size={17} />
              <span className={styles["nav-label"]}>{t.status}</span>
            </a>
            <a className={styles["github-nav"]} href="https://github.com/teplostanski">
              <PiGithubLogo size={17} />
              <span className={styles["nav-label"]}>GitHub</span>
            </a>
            <div className={styles["header-controls"]}>
              <LanguageSelect />
              <ThemeToggle />
            </div>
          </nav>
        </header>
        <main>
          <section className={styles["intro"]} aria-labelledby="headline">
            <p className={styles["eyebrow"]}>
              <span /> {t.eyebrow}
            </p>
            <h1 className={styles["headline"]} id="headline">
              {t.headline}
              <br />
              <span>{t.headlineAccent}</span>
            </h1>
            <p className={styles["intro-copy"]}>{t.intro}</p>
            <a className={styles["explore"]} href="#projects">
              {t.explore}{" "}
              <span aria-hidden="true">
                <RiArrowDownLine size={22} />
              </span>
            </a>
            <span className={styles["hero-note"]} aria-hidden="true">
              {t.note}
              <span>_</span>
            </span>
          </section>
          <section id="projects" aria-labelledby="projects-heading">
            <div className={styles["section-heading"]}>
              <h2 id="projects-heading">
                {t.projects} <span>02</span>
              </h2>
              <span>{t.projectsNote}</span>
            </div>
            <div className={styles["project-grid"]}>
              {projects.map((project) => (
                <article
                  className={`${styles.project} ${project.slug === "rand" ? styles.rand : ""}`}
                  key={project.slug}
                >
                  <div className={styles["card-top"]}>
                    <span className={styles["project-icon"]} aria-hidden="true">
                      {project.icon}
                    </span>
                    <span className={styles["project-number"]}>/{project.index}</span>
                  </div>
                  <p className={styles["category"]}>{project.category}</p>
                  <h3 className={styles["project-title"]}>
                    <a href={`https://${project.slug}.hacks.run/`}>
                      {project.name}
                      <span aria-hidden="true">
                        <ExternalArrow />
                      </span>
                    </a>
                  </h3>
                  <p className={styles["card-lead"]}>{project.description}</p>
                  <p className={styles["card-description"]}>{project.detail}</p>
                  <div className={styles["terminal"]} aria-label={t.exampleLabel}>
                    <div>
                      <span className={styles["terminal-dot"]} />
                      <span className={styles["terminal-dot"]} />
                      <span className={styles["terminal-dot"]} />
                      <span className={styles["terminal-label"]}>{t.example}</span>
                    </div>
                    <code>
                      <span className={styles["prompt"]}>$ </span>
                      {project.command}
                    </code>
                    <code className={styles["response"]}>{project.response}</code>
                  </div>
                  <ul className={styles["tags"]} aria-label={t.features}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className={styles["card-footer"]}>
                    <a
                      className={styles["open-project"]}
                      href={`https://${project.slug}.hacks.run/`}
                    >
                      {t.open}{" "}
                      <span aria-hidden="true">
                        <ExternalArrow />
                      </span>
                    </a>
                    <a
                      className={styles["source-link"]}
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
          <a className={styles["status-banner"]} href="https://status.hacks.run/">
            <span className={styles["status-icon"]} aria-hidden="true">
              <PiPulseThin size={32} />
            </span>
            <span>
              <strong>{t.statusTitle}</strong>
              <span>{t.statusDescription}</span>
            </span>
            <span className={styles["status-destination"]}>
              status.hacks.run{" "}
              <span aria-hidden="true">
                <ExternalArrow />
              </span>
            </span>
          </a>
        </main>
        <footer className={styles["footer"]}>
          <span>© {new Date().getFullYear()} hacks.run</span>
          <a href="https://github.com/teplostanski">
            {t.madeBy} <span>@teplostanski</span>
          </a>
          <span className={styles["footer-note"]}>happy hacking.</span>
        </footer>
      </div>
    </>
  );
}

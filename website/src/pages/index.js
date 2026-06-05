import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.kicker}>MAIMBAQ Documentation</div>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroCopy}>
              Un hub técnico para entender el flujo creativo de la app, la API
              REST, los requisitos del proyecto y el despliegue de la
              documentación.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro"
              >
                Ver documentación
              </Link>
              <Link
                className="button button--outline button--lg"
                to="/docs/api"
              >
                Ir a la API
              </Link>
            </div>
          </div>
          <aside className={styles.heroPanel}>
            <span className={styles.panelLabel}>Sitio vivo</span>
            <strong>GitHub Pages</strong>
            <p>https://nessisx.github.io/MAIMBAQ/</p>
            <ul className={styles.panelList}>
              <li>Frontend móvil-first</li>
              <li>Backend Express + MongoDB</li>
              <li>Docs técnicas con Docusaurus</li>
            </ul>
          </aside>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentación técnica y funcional de MAIMBAQ"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

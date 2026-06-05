import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Flujo creativo",
    badge: "01",
    description: (
      <>
        Desde entrada y creación hasta resultado y museo. La documentación
        explica cómo se conectan las pantallas del usuario.
      </>
    ),
  },
  {
    title: "API REST",
    badge: "02",
    description: (
      <>
        Endpoints para consultar, crear, actualizar y eliminar obras con una
        estructura clara para frontend y backend.
      </>
    ),
  },
  {
    title: "Publicación",
    badge: "03",
    description: (
      <>
        Docusaurus genera el sitio estático y lo publica en GitHub Pages bajo la
        ruta de MAIMBAQ.
      </>
    ),
  },
];

function Feature({ badge, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.badge}>{badge}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeadingWrap}>
          <span className={styles.sectionKicker}>Documentación enfocada</span>
          <Heading as="h2" className={styles.sectionHeading}>
            Lo que realmente importa en MAIMBAQ
          </Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

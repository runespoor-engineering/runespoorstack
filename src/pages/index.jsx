import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import playbookPreviewUrl from "@site/static/img/playbook-preview.png";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";

const HomepageHeader = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx("hero", styles.heroBanner)}>
			<div className="container">
				<Heading as="h1">{siteConfig.title}</Heading>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<img alt="Runespoor" src={playbookPreviewUrl} />
			</div>
		</header>
	);
};

const Home = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			description="Description will go into a meta tag in <head />"
			title={`Welcome to ${siteConfig.title}`}
		>
			<HomepageHeader />
			<main />
		</Layout>
	);
};

export default Home;

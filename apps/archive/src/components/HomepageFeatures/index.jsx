import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Runespoor',
    description: (
      <>
        Runespoor was created by Boris Shulyak as an organization of an ambitious engineers for whom
        their work is not just writing code and translating tasks into the Done column
      </>
    )
  },
  {
    title: 'Engineering Playbook',
    description: (
      <>
        Is a set of documents that may help you to increase overall efficiency for team members and
        the whole team in general, and to strive to be better engineers.
      </>
    )
  },
  {
    title: 'Future Plans',
    description: (
      <>
        This web site will contain a lot of useful information about the Runespoor contributions,
        products, and tools.
      </>
    )
  }
];

const Feature = ({ Svg, title, description }) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">{Svg && <Svg className={styles.featureSvg} role="img" />}</div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
};

const HomepageFeatures = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageFeatures;

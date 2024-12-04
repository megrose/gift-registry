import React from 'react';
import styles from './LandingPage.module.css';
import withLoveLogo from '../../assets/with-love-logo.png';
import heroImage from '../../assets/hero-image.jpg';
// import toddlerImage from '../../assets/toddler.jpg';
// import elementaryImage from '../../assets/elementary.jpg';
// import middleSchoolImage from '../../assets/middle-school.jpg';

const HeroSection = () => (
  <section className={styles.hero}>
    <div className={styles.heroImage}>
      <img
        src={heroImage}
        alt="Family playing with child"
        className={styles.familyImage}
      />
    </div>
    <div className={styles.heroContent}>
      <img
        src={withLoveLogo}
        alt="With Love"
        className={styles.heroLogo}
      />
      <h1>Make giving easy!</h1>
      <button className={styles.primaryButton}>
        Start a registry
      </button>
    </div>
  </section>
);

const GiftingWizardSection = () => (
  <section className={styles.wizardSection}>
    <div className={styles.wizardContent}>
      <h2>Don't know what to give?<br />Let our gifting wizard help!</h2>
      <p>Take a quiz and get a gift list just for you</p>
      <button className={styles.secondaryButton}>
        Use this registry wizard
      </button>
    </div>
    <div className={styles.wizardGraphic}>
      {/* Wand and stars graphic */}
    </div>
  </section>
);

// const GiftCategoriesSection = () => (
//   <section className={styles.categoriesSection}>
//     <h2>want some inspo?</h2>
//     <h3>kids voted! here are this year's most loved gifts...</h3>
//     <div className={styles.categoryCards}>
//       <CategoryCard
//         image={toddlerImage}
//         label="Toddler gifts"
//       />
//       <CategoryCard
//         image={elementaryImage}
//         label="Elementary-aged kids"
//       />
//       <CategoryCard
//         image={middleSchoolImage}
//         label="Middle school kids"
//       />
//     </div>
//   </section>
// );

// const CategoryCard = ({ image, label }) => (
//   <div className={styles.categoryCard}>
//     <img src={image} alt={label} />
//     <button className={styles.categoryButton}>{label}</button>
//   </div>
// );

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <GiftingWizardSection />
      {/* <GiftCategoriesSection /> */}
    </div>
  );
};

export default LandingPage;
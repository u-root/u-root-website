import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia(),
  bp = 600;

const keyVisualWrapper = document.querySelector('.home-hero__key-visual');
gsap.set(keyVisualWrapper, { height: 0, autoAlpha: 1 });

/*
 * Move, fade and scale key visual on scroll
 */
gsap.to(keyVisualWrapper, {
  height: 'auto',
  autoAlpha: 1,
  duration: 1,
  ease: 'linear',
  scrollTrigger: {
    trigger: 'body',
    pin: true,
    start: 'top',
    end: '+=40%',
    scrub: true,
    //markers: true,
  },
});

/*
 * Move and fade box items on scroll
 */
const keyVisualItems = document.querySelectorAll('.key-visual__item');
gsap.set(keyVisualItems, { y: 0, autoAlpha: 1 });

for (const [i, item] of keyVisualItems.entries()) {
  // Stagger animation for keyVisualItems
  const offset = 2; // Adjust this offset value as needed
  const distance = 2; // Adjust this distance value as needed

  let start = `+=${i * distance + offset}%`;

  gsap.to(item, {
    scrollTrigger: {
      trigger: 'body',
      start: start,
      end: '+=15%',
      scrub: true,
      //markers: true,
    },
    duration: 1,
    y: -60,
    autoAlpha: 0,
    ease: 'linear',
    id: `keyVisualItem-${i + 1}`,
  });
}

/*
 * Move and fade feature illustrations on scroll
 */

const featuresCardIllustrations = document.querySelectorAll(
  '.features__card svg'
);
gsap.set(featuresCardIllustrations, { y: -75, autoAlpha: 0 });

const featuresCards = document.querySelectorAll('.features__card');
// const cardsReverseOrder = Array.from(featuresCards).reverse();

mm.add(
  {
    // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
    isDesktop: `(min-width: ${bp}px)`,
    isMobile: `(max-width: ${bp - 1}px)`,
  },
  (context) => {
    // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
    let { isDesktop, isMobile } = context.conditions;

    for (const [i, item] of featuresCards.entries()) {
      // Stagger animation for feature illustrations
      const offset = 15; // Adjust this offset value as needed
      const distance = 2; // Adjust this distance value as needed

      let start = `+=${(i + 1) * distance + offset}%`;
      let end = `+=${(i + 1) * distance + offset}%`;

      let illustration = item.querySelector('svg');

      gsap.to(illustration, {
        scrollTrigger: {
          trigger: isDesktop ? 'body' : item,
          start: isDesktop ? start : '-=200%',
          end: isDesktop ? end : '-=150%',
          scrub: true,
          //markers: true,
        },
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'linear',
        id: `feature-${i + 1}`,
      });
    }
  }
);

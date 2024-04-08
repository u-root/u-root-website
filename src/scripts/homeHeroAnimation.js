import { gsap } from 'gsap';
import Flip from 'gsap/Flip';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(Flip, ScrollTrigger);

const keyVisualContainer = document.querySelector('.home-hero');
const keyVisual = document.querySelector('.key-visual');
const startContainer = document.querySelector('.home-hero__start-container');
const originalContainer = document.querySelector(
  '.home-hero__original-container'
);

const mm = gsap.matchMedia(),
  bp = 600;

const state = Flip.getState(keyVisual);
startContainer.appendChild(keyVisual);

const flip = Flip.to(state, {
  autoAlpha: 0,
});

/*
 * Move, fade and scale key visual on scroll
 */

// Add flip animation to the ScrollTrigger
ScrollTrigger.create({
  trigger: 'body',
  pin: keyVisualContainer,
  start: 'top',
  end: '+=50%',
  scrub: true,
  animation: flip, // Use flip animation for keyVisual
  //markers: true,
});

gsap.set(originalContainer, { minHeight: 0 });
gsap.to(originalContainer, {
  minHeight: '256px',
  scrollTrigger: {
    trigger: 'body',
    start: 'top',
    end: '+=50%',
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
  const offset = 10; // Adjust this offset value as needed
  const distance = 2; // Adjust this distance value as needed

  let start = `+=${i * distance + offset}%`;

  gsap.to(item, {
    scrollTrigger: {
      trigger: 'body',
      start: start,
      end: '+=10%',
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
const cardsReverseOrder = Array.from(featuresCards).reverse();

mm.add(
  {
    // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
    isDesktop: `(min-width: ${bp}px)`,
    isMobile: `(max-width: ${bp - 1}px)`,
  },
  (context) => {
    // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
    let { isDesktop, isMobile } = context.conditions;

    for (const [i, item] of cardsReverseOrder.entries()) {
      // Stagger animation for feature illustrations
      let start = `-=${(i + 1) * 80 + 200}%`;
      let end = `-=${(i + 1) * 80 + 100}%`;

      let illustration = item.querySelector('svg');

      gsap.to(illustration, {
        scrollTrigger: {
          trigger: item,
          start: isDesktop ? start : '-=250%',
          end: isDesktop ? end : '-=100%',
          scrub: true,
          //markers: true,
        },
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'linear',
        id: `feature-${i}`,
      });
    }
  }
);

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  if (document.querySelector('[data-hero]')) {
    gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
      .from('[data-hero] h1', { y: 24, opacity: 0 })
      .from('[data-hero] .lead, [data-hero] .actions', { y: 16, opacity: 0, stagger: 0.1 }, '-=0.4')
      .from('[data-hero] .hero-art', { opacity: 0, scale: 0.98, duration: 0.9 }, '-=0.6');
  }
  gsap.utils.toArray('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
});

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".header__logo, .header__item, .header__icons img", {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });

    gsap.from(".welcome__title", {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    gsap.from(".welcome__text", {
        x: -100,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power2.out"
    });

    gsap.from(".welcome__image img", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.6,
        ease: "power2.out"
    });

    gsap.from(".about-site__title, .about-site__subtitle", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
    });

    gsap.from(".about-site__card", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.3,
        delay: 0.5,
    });

    gsap.to(".about-site__img img", {
        rotation: 3,
        yoyo: true,
        repeat: -1,
        duration: 1,
        ease: "sine.inOut",
        yoyoEase: true,
    });

    gsap.from(".plans__title, .plans__intro, .plans__text", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".plans__content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".plans-animated-gif", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".plans__graph",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".plans-video", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".plans__gif",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

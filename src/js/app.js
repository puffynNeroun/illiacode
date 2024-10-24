import { gsap } from 'gsap';

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
});

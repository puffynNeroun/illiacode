import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { dataCards } from "@/data/dataCards";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Header Animations
    gsap.from(".header__logo, .header__item", {
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

    // Убрал анимацию прозрачности для более стабильного отображения
    gsap.fromTo(".welcome__image img",
        {
            scale: 0.8,
            opacity: 1, // Задал начальную непрозрачность
        },
        {
            scale: 0.9,
            duration: 1.5,
            delay: 0.6,
            ease: "power2.out"
        }
    );


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
    gsap.from(".inst__card1, .inst__card2, .inst__card3", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".inst__container",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        stagger: 0.3
    });
    gsap.from(".paypal__title, .paypal__img,  .paypal__text", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".paypal__container",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        stagger: 0.3
    });


    gsap.from(".footer__item, .footer__up", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer__container",
            start: "bottom bottom",
            toggleActions: "play none none none"
        },
        stagger: 0.3
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

    const addCardBtn = document.getElementById("add-card-btn");
    const newCardsContainer = document.getElementById("new-cards-container");
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.getElementById('close-modal');
    const videoElement = document.getElementById('video-element');

    let cardIndex = 0;

    // Событие для клика на изображение, чтобы открыть видео в модальном окне
    videoThumbnail.addEventListener('click', () => {
        videoModal.style.display = 'flex'; // Показываем модальное окно
        videoElement.play(); // Проигрываем видео
    });

    // Событие для закрытия модального окна
    closeModal.addEventListener('click', () => {
        videoElement.pause(); // Останавливаем видео
        videoElement.currentTime = 0; // Сбрасываем время видео на начало
        videoModal.style.display = 'none'; // Скрываем модальное окно
    });

    // Закрытие модального окна по клику вне видео
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal || event.target === videoModal.parentNode) {
            videoElement.pause(); // Останавливаем видео
            videoElement.currentTime = 0; // Сбрасываем время видео на начало
            videoModal.style.display = 'none'; // Скрываем модальное окно
        }
    });

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
        navbar.classList.toggle("flex");
    });

    document.querySelector('.footer__up').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#top').scrollIntoView({
            behavior: 'smooth'
        });
    });

    const createCard = (cardData) => {
        const newCard = document.createElement("div");
        newCard.className = "history__card flex items-center gap-16";
        newCard.innerHTML = `
            <div class="history__card__image pr-4">
                <img class="max-w-96" src="${cardData.imageUrl}" alt="${cardData.title}">
            </div>
            <div class="history__card__content">
                <div class="history__card__header flex justify-between">
                    <h3 class="history__card__title pb-4">${cardData.title}</h3>
                    <p class="history__card__date text-mixin">${cardData.date}</p>
                </div>
                <p class="history__card__text text-mixin">${cardData.text}</p>
            </div>
        `;

        newCardsContainer.appendChild(newCard);

        gsap.fromTo(newCard, {
            opacity: 0,
            y: 20,
        }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    };

    if (dataCards.length > 0) {
        createCard(dataCards[cardIndex]);
        cardIndex++;
    }

    addCardBtn.addEventListener("click", () => {
        if (cardIndex < dataCards.length) {
            createCard(dataCards[cardIndex]);
            cardIndex++;
        } else {
            addCardBtn.disabled = true;
        }
    });
    fetchInstagramData();
});

async function fetchInstagramData() {
    try {
        const response = await axios.get('https://graph.instagram.com/me', {
            params: {
                fields: 'id,username,followers_count,profile_picture_url',
                access_token: 'YOUR_ACCESS_TOKEN'
            }
        });
        const data = response.data;
        const avatarUrl = data.profile_picture_url;
        const followerCount = data.followers_count;

        document.querySelector('.inst__avatar').style.backgroundImage = `url(${avatarUrl})`;
        document.querySelector('.inst__subscribe').textContent = `${followerCount} FOLLOWERS`;
    } catch (error) {
        console.error("Ошибка при получении данных Instagram:", error);
    }
}
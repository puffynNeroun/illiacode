import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { dataCards } from "@/data/dataCards";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const addCardBtn = document.getElementById("add-card-btn");
    const collapseCardBtn = document.getElementById("collapse-card-btn");
    const newCardsContainer = document.getElementById("new-cards-container");
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.getElementById('close-modal');
    const videoElement = document.getElementById('video-element');
    const historySection = document.getElementById("about");
    const cardButtons = document.querySelectorAll(".about-site__btn");

    cardButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.parentElement;
            const hiddenText = card.querySelector(".about-site__card-subtitle");

            if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
                gsap.fromTo(hiddenText,
                    { opacity: 0, display: "none" },
                    {
                        opacity: 1,
                        display: "block",
                        duration: 1,
                        ease: "power2.out"
                    }
                );
            } else {
                gsap.to(hiddenText, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        hiddenText.style.display = "none";
                    }
                });
            }
        });
    });

    let cardIndex = 0;

    // Добавление новых карточек
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


    // Показать одну карточку по умолчанию
    if (dataCards.length > 0) {
        createCard(dataCards[cardIndex]);
        cardIndex++;
    }

    // Добавление новой карточки по клику на "Weitere Details"
    addCardBtn.addEventListener("click", () => {
        if (cardIndex < dataCards.length) {
            createCard(dataCards[cardIndex]);
            cardIndex++;
            collapseCardBtn.classList.remove("hidden");
        } else {
            addCardBtn.disabled = true;
        }
    });

    // Сворачивание карточек до одной по клику на "Weniger Details"
    collapseCardBtn.addEventListener("click", () => {
        gsap.to(newCardsContainer.children, {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                newCardsContainer.innerHTML = "";
                cardIndex = 1;
                createCard(dataCards[0]);
                addCardBtn.disabled = false;
                collapseCardBtn.classList.add("hidden");

                // Плавный скролл к началу секции "about"
                historySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка модального окна для видео
    videoThumbnail.addEventListener('click', () => {
        videoModal.style.display = 'flex'; // Показываем модальное окно
        videoElement.play(); // Проигрываем видео
    });

    closeModal.addEventListener('click', () => {
        videoElement.pause(); // Останавливаем видео
        videoElement.currentTime = 0; // Сбрасываем время видео на начало
        videoModal.style.display = 'none'; // Скрываем модальное окно
    });

    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal || event.target === videoModal.parentNode) {
            videoElement.pause(); // Останавливаем видео
            videoElement.currentTime = 0; // Сбрасываем время видео на начало
            videoModal.style.display = 'none'; // Скрываем модальное окно
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

/* =========================================
   EMBER & OAK
   RESTAURANT / CAFE JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const reservationModal = document.getElementById("reservationModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const reservationForm = document.getElementById("reservationForm");

const heroBook = document.getElementById("heroBook");
const desktopBook = document.getElementById("desktopBook");
const mobileBook = document.getElementById("mobileBook");
const ctaBook = document.getElementById("ctaBook");
const footerBook = document.getElementById("footerBook");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const newsletterForm = document.getElementById("newsletterForm");

const previousReview = document.getElementById("previousReview");
const nextReview = document.getElementById("nextReview");

const reviewText = document.getElementById("reviewText");
const reviewAuthor = document.getElementById("reviewAuthor");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


/* =========================================
   NAVBAR SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   RESERVATION MODAL
========================================= */

function openReservation() {

    reservationModal.classList.add("active");

    document.body.classList.add("modal-open");

    navLinks.classList.remove("active");

}


function closeReservation() {

    reservationModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


heroBook.addEventListener("click", openReservation);
desktopBook.addEventListener("click", openReservation);
mobileBook.addEventListener("click", openReservation);
ctaBook.addEventListener("click", openReservation);
footerBook.addEventListener("click", openReservation);


modalClose.addEventListener("click", closeReservation);
modalOverlay.addEventListener("click", closeReservation);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeReservation();

        closeLightbox();

    }

});


/* =========================================
   SET MINIMUM BOOKING DATE
========================================= */

const bookingDate = document.getElementById("bookingDate");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

bookingDate.min = `${year}-${month}-${day}`;


/* =========================================
   RESERVATION FORM
========================================= */

reservationForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const phone = document.getElementById("guestPhone").value.trim();
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const guests = document.getElementById("guestCount").value;

    if (!name || !phone || !date || !time || !guests) {

        showToast("Please complete all required fields.");

        return;

    }


    closeReservation();

    reservationForm.reset();

    showToast(
        `Thanks ${name}! Your reservation request has been received.`
    );

});


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


/* =========================================
   MENU FILTER
========================================= */

const menuTabs = document.querySelectorAll(".menu-tab");
const menuCards = document.querySelectorAll(".menu-card");

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const category = tab.dataset.category;


        menuTabs.forEach(item => {

            item.classList.remove("active");

        });

        tab.classList.add("active");


        menuCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                }, 20);

            } else {

                card.style.opacity = "0";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================================
   FULL MENU BUTTON
========================================= */

const viewFullMenu = document.getElementById("viewFullMenu");

viewFullMenu.addEventListener("click", () => {

    showToast(
        "The full menu can be connected to a PDF or online ordering system."
    );

});


/* =========================================
   FEATURED DISH
========================================= */

const featuredOrder = document.getElementById("featuredOrder");

featuredOrder.addEventListener("click", () => {

    showToast(
        "Today's seasonal special changes with our fresh produce."
    );

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryButtons = document.querySelectorAll(".gallery-open");


galleryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image = button.parentElement.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("modal-open");

}


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================
   TESTIMONIAL SLIDER
========================================= */

const reviews = [

    {
        text: "“Beautiful atmosphere, thoughtful food and genuinely warm service. It feels like one of those places you discover and immediately want to keep to yourself.”",
        author: "— Ananya M."
    },

    {
        text: "“The food was beautifully presented, but what really stood out was how comfortable the whole evening felt. We stayed much longer than planned.”",
        author: "— Rohan K."
    },

    {
        text: "“A lovely place for a relaxed dinner. The interiors are beautiful, the menu is interesting and every dish felt carefully prepared.”",
        author: "— Meera S."
    },

    {
        text: "“We came for dinner and ended up talking for three hours. Great food, beautiful ambience and genuinely friendly service.”",
        author: "— Arjun & Priya"
    }

];

let currentReview = 0;


function updateReview() {

    reviewText.style.opacity = "0";
    reviewAuthor.style.opacity = "0";


    setTimeout(() => {

        reviewText.textContent = reviews[currentReview].text;

        reviewAuthor.textContent = reviews[currentReview].author;

        reviewText.style.opacity = "1";
        reviewAuthor.style.opacity = "1";

    }, 180);

}


previousReview.addEventListener("click", () => {

    currentReview--;

    if (currentReview < 0) {

        currentReview = reviews.length - 1;

    }

    updateReview();

});


nextReview.addEventListener("click", () => {

    currentReview++;

    if (currentReview >= reviews.length) {

        currentReview = 0;

    }

    updateReview();

});


/* =========================================
   AUTO TESTIMONIAL
========================================= */

setInterval(() => {

    currentReview++;

    if (currentReview >= reviews.length) {

        currentReview = 0;

    }

    updateReview();

}, 7000);


/* =========================================
   NEWSLETTER
========================================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("newsletterEmail").value.trim();


    if (!email) {

        showToast("Please enter your email address.");

        return;

    }


    showToast(
        "You're on the list. Welcome to EMBER & OAK."
    );

    newsletterForm.reset();

});


/* =========================================
   DIRECTIONS
========================================= */

const directionsBtn =
    document.getElementById("directionsBtn");


directionsBtn.addEventListener("click", () => {

    const mapURL =
        "https://www.google.com/maps/search/?api=1&query=18+Oak+Street";

    window.open(mapURL, "_blank");

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   IMAGE FALLBACK
========================================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background = "#d7d0c3";

        img.style.minHeight = "200px";

        img.removeAttribute("src");

    });

});


/* =========================================
   PREVENT EMPTY SOCIAL LINKS
========================================= */

document.querySelectorAll(".social-links a").forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        showToast(
            "Social media profile will be connected here."
        );

    });

});


/* =========================================
   INITIAL LOAD
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

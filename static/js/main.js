"use strict";

AOS.init({
    once: true
});

/*  Easy selector helper function */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
}

/* Easy event listener function */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
}

/* Easy on scroll event listener */
const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
}

/* Preloader */
let preloader = $("#preloader");
if (preloader) {
    window.addEventListener("load", () => {
        preloader.fadeOut();
        setTimeout(() => {
            preloader.remove();
        }, "2500");
    });
}

/* Navbar links active state on scroll */
let navbarlinks = select(".navbar .scrollto", true);
const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add("active")
        } else {
            navbarlink.classList.remove("active")
        }
    })
}
window.addEventListener("load", navbarlinksActive)
onscroll(document, navbarlinksActive)

/* Scrolls to a section */
const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos - 70,
        behavior: "smooth"
    })
}

/* Uses the scrollto function to scroll to a section and sets the navbar to active  */
on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
        e.preventDefault()

        let navbar = select(".navbar")
        if (navbar.classList.contains("active")) {
            $(".navbar-nav").slideToggle();
            navbar.classList.remove("active");
        }
        scrollto(this.hash);
    }
}, true)

/* Scrolls to the user"s current section depending on the url hash */
window.addEventListener("load", () => {
    if (window.location.hash) {
        if (select(window.location.hash)) {
            scrollto(window.location.hash)
        }
    }
});

/* Shrinks the header and changes opacity after scrolling */
let selectHeader = select(".navbar")
if (selectHeader) {
    const headerScrolled = () => {
        if (window.scrollY > window.innerHeight - 400) {
            selectHeader.classList.add("navbar-scrolled")
        } else {
            selectHeader.classList.remove("navbar-scrolled")
        }
    }
    window.addEventListener("load", headerScrolled)
    onscroll(document, headerScrolled)
}

/* Hamburger menu animation stuff */
$(function(){ 
    $(".navbar-collapse").on("click", "a:not([data-toggle])", null, function () {
        $(".navbar-collapse").collapse("hide");
	$(".hamburger").toggleClass("is-active");
    });

    $(".navbar-brand").on("click", "", null, function () {
        $(".navbar-collapse").collapse("hide");
	if (select(".hamburger").classList.contains("is-active")) $(".hamburger").toggleClass("is-active");
    });

    $(".hamburger").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
    });
});

/* Back to top button */
let backtotop = select(".back-to-top")
if (backtotop) {
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backtotop.classList.add("active")
        } else {
            backtotop.classList.remove("active")
        }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
}


/* === Styling === */
const body = document.querySelector("body")
let modeToggle = document.querySelector(".dark-light")

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark-mode");
    modeToggle.classList.toggle("active");
}

/* Toggles dark mode and light mode */
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark-mode");

    // Gets the user"s last mode using localstorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark-mode");
    } else {
        localStorage.setItem("mode", "light-mode");
    }
});


/* === Home / Parallax Image === */
let hello = new Typewriter(document.getElementById("hello"), {
    loop: false,
    delay: 60,
    cursor: "",
});
let im = new Typewriter(document.getElementById("im"), {
    loop: false,
    delay: 60,
    cursor: "",
});
let welcome = new Typewriter(document.getElementById("welcome"), {
    loop: false,
    delay: 60,
    deleteSpeed: "natural",
    cursor: "",
});

hello.typeString("Hello There!").start();
im.pauseFor(2500).typeString("I'm Michael").start();
welcome.pauseFor(4000).typeString("Welcome to my garbage").pauseFor(300).deleteChars(7).pauseFor(300).typeString("website!").start();

$(".parallax-window").parallax({
    imageSrc: "static/img/parallaxImages/bg" + String(Math.floor((Math.random() * 9) + 1)) + ".jpg"
});


/* === Projects  === */
const projects = [
    {img: "mdb.png", name: "CIS 2750 Project - MolDB", 
    description: "A web application that allows users to upload, view, and store .SDF files. Made for CIS 2750 (Software Systems Development and Integration) at the University of Guelph.", 
    links: {github: "https://github.com/msirna/CIS2750-W23-MolDB", film: "https://msirna.github.io/static/videos/MolDB Demo.mp4" }, 
    madeWith: [
        {img: "html", name: "HTML", link: "", alt: "HTML Logo"}, 
        {img: "css", name: "CSS", link: "", alt: "CSS Logo"}, 
        {img: "bootstrap", name: "Bootstrap", link: "", alt: "Bootstrap Logo"}, 
        {img: "javascript", name: "JavaScript", link: "", alt: "JavaScript Logo"}, 
        {img: "jquery", name: "jQuery", link: "", alt: "jQuery Logo"}, 
        {img: "c", name: "C", link: "", alt: "C Logo"}, 
        {img: "python", name: "Python", link: "", alt: "Python Logo"}, 
        {img: "sqlite", name: "SQLite", link: "", alt: "SQLite Logo"}
    ]}, 
    {img: "leg.png", name: "CIS 3190 Assignments", 
    description: "Various programs made for CIS 3190 (Software for Legacy Systems) at the University of Guelph.", 
    links: { github: "https://github.com/msirna/CIS3190-W23-Assignments"}, 
    madeWith: [
        {img: "fortran", name: "Fortran", link: "", alt: "Fortran Logo"},
        {img: "ada", name: "Ada", link: "", alt: "Ada Logo"},
        {img: "cobol", name: "COBOL", link: "", alt: "COBOL Logo"}
    ]}, 
    {img: "sv.png", name: "Smart Voting", 
    description: "An secure online voting platform designed and developed for a Capstone Project at George Brown College.", 
    links: { github: "https://github.com/smartvoting", "card-heading": "https://xd.adobe.com/view/209e2139-bac5-4e9f-a9e6-abc99761be42-75cd/", film: "https://msirna.github.io/static/videos/Smart Voting Demo.mp4"}, 
    madeWith: [
        {img: "csharp", name: "C#", link: "", alt: "C# Logo"},
        {img: "netcore", name: ".NET", link: "", alt: ".NET Core Logo"},
        {img: "react", name: "React", link: "", alt: "React Logo"},
        {img: "bootstrap", name: "Bootstrap", link: "", alt: "Bootstrap Logo"}, 
    ]}, 
    {img: "ws.png", name: "This Website", 
    description: "The website you're currently looking at! A showcase of my skills and a few of the projects that I work on.", 
    links: { github: "https://github.com/msirna/msirna.github.io", globe2: "https://msirna.github.io/"}, 
    madeWith: [
        {img: "html", name: "HTML", link: "", alt: "HTML Logo"}, 
        {img: "css", name: "CSS", link: "", alt: "CSS Logo"}, 
        {img: "javascript", name: "JavaScript", link: "", alt: "JavaScript Logo"}, 
        {img: "jquery", name: "jQuery", link: "", alt: "jQuery Logo"} 
    ]}, 
    {img: "wa.png", name: "COMP 3074 OpenWeather App", 
    description: "A mobile weather application that uses OpenWeather's API. Made for COMP 3074 (Mobile Application Development I) at George Brown College.", 
    links: { github: "https://github.com/msirna/COMP3074-F21-OpenWeather-App", film: "https://msirna.github.io/static/videos/COMP3074 Demo.mp4" }, 
    madeWith: [
        {img: "react", name: "React", link: "", alt: "React Logo"},
        {img: "openweather", name: "OpenWeather API", link: "https://openweathermap.org/", alt: "Open Weather API Logo"},
    ]}, 
    {img: "sk.png", name: "Sitekick Remastered Bots", 
    description: "Various bots made for the Sitekick Remastered Discord server to help users, allow users to verify their accounts, and create profile pictures.", 
    links: { globe2: "https://sitekickremastered.com/", film: "https://msirna.github.io/static/videos/SitePic Demo.mp4" }, 
    madeWith: [
        {img: "java", name: "Java", link: "", alt: "Java Logo"},
        {img: "discord", name: "Java Discord API", link: "https://github.com/discord-jda/JDA", alt: "Discord Logo"}
    ]},
];


/* Creates all the projects cards dynamically using the array above */
for (let i = 0; i < projects.length; i++) {
    let iconLinks = "";
    let index = 0;
    for (let j in projects[i].links){
        iconLinks += `
            <div class="col-1 p-0 text-center">
                <a href="${projects[i].links[j]}" class="bi bi-${j} project-link-icon" target="_blank"></a>
            </div>`;
        index++;
    }
    for (let j = 0; j < Object.keys(projects[i].links).length; j++){
        console.log(projects[i].links)
    }
    let madeWithIcons = "";
    for (let k = 0; k < projects[i].madeWith.length; k++){
        madeWithIcons += `
            <div class="col d-flex justify-content-center mx-3 mb-2 made-with-icon" style="max-width: 48px; max-height: 48px">
                ${projects[i].madeWith[k].link != "" ? `<a href="${projects[i].madeWith[k].link}" target="_blank">` : ""}
                    <img height="48" src="static/img/logos/${projects[i].madeWith[k].img}.svg" alt=${projects[i].madeWith[k].alt} />
                    <span class="tooltiptext">${projects[i].madeWith[k].name}</span>
                ${projects[i].madeWith[k].link != "" ? `</a>` : ""}
            </div>`;
    }
    let newDiv = `
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch projects-item ">
        <div class="card box-shadow">
            <img src=${"static/img/projectThumbnails/" + projects[i].img} alt=${projects[i].img + " Thumbnail"} class="img-fluid">
            <div class="card-body">
                <div class="row d-flex justify-content-between me-1">
                    <div class="col d-flex align-items-center"><h5 class="card-title" style="font-weight: 600">${projects[i].name}</h5></div>
                    ${iconLinks}
                </div>
                <p class="card-text">${projects[i].description}</p>\
            </div>
            <div class="card-footer">
                <p class="mb-2" style="font-weight: 600">Made with:</p>
                <div class="row d-flex justify-content-center">${madeWithIcons}</div>
            </div>
        </div>
    </div>
    `;

    $("#projectsContainer").append(newDiv);
}
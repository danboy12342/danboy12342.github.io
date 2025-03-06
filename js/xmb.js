const video = document.getElementById("vid");
const titles = document.getElementById("title");
const warning = document.querySelectorAll(".warning")[0];
const menu = document.getElementById("menu");
const clockSection = document.querySelectorAll(".clock")[0];
const dateTime = document.getElementById("date");
const xmbMain = document.querySelectorAll(".xmb-main")[0];
const startupSound = document.getElementById("startup");
const navSound = document.getElementById("nav");

let sectionNumber = 0;
let subsection = 0;
startupSound.play();

const xmbItems = document.querySelectorAll(".xmb-item");

let checkLoad = () => {
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

let titlesTimeOut = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 3100);  // Reduce from 10000 to 3000 (3 seconds)
    });
};

let warningTimeOut = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);  // Reduce from 7000 to 2000 (2 seconds)
    });
};

let warningDisplay = async () => {
    await titlesTimeOut();
    titles.remove();
    warning.style.opacity = "1";
    setTimeout(() => {
        warning.style.opacity = "0";
        warning.remove();
    }, 2050);
    await warningTimeOut();
};

let sideClock = () => {
    let d = new Date();
    let clock = `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${d.getMinutes()}`;
    dateTime.innerText = clock;
    setTimeout(sideClock, 1000);
};

let loadTitles = async () => {
    await checkLoad();
    video.play();
    video.style.opacity = "1";
    titles.style.opacity = "1";
    await warningDisplay();
};

let loadMenu = async () => {
    await loadTitles();
    menu.style.opacity = "1";
    sideClock();
    clockSection.style.opacity = "1";
};

let moveMenu = (hd, ultraHd, fullHd) => {
    let width = document.body.clientWidth;
    if (width < 1400) {
        xmbMain.style.marginRight = hd;
    } else if (width >= 2560 && width <= 3840) {
        xmbMain.style.marginRight = ultraHd;
    } else {
        xmbMain.style.marginRight = fullHd;
    }
};

let focusSection = (sn, right, left) => {
    xmbItems.forEach((item, index) => {
        item.classList.remove("active");
    });
    xmbItems[sn].classList.add("active");
    sectionNumber = sn
    subsection = 0;
    switchSection()
};

let switchSection = () => {
    let multiSection = false;
    switch (sectionNumber) {
        case 0:
            moveMenu('-40%', 0, 0);
            break;
        case 1:
            moveMenu('-10%', '18%', '18%');
            multiSection = true;
            break;
        case 2:
            moveMenu('22%', '32%', '39%');
            break;
        case 3:
            moveMenu('50%', '47%', '60%');
            break;
        case 4:
            moveMenu('76%', '62%', '77%');
            break;
        case 5:
            moveMenu('100%', '77%', '97%');
            break;
        case 6:
            moveMenu('122%', '92%', '112%');
            break;
        case 7:
            moveMenu('145%', '112%', '137%');
            break;
        case 8:
            moveMenu('167%', '127%', '152%');
            break;
        case 9:
            moveMenu('188%', '147%', '167%');
            break;
    }
};

let focusSubMenu = (sn, sub, down, up) => {
    const subitems = Array.from(xmbItems[sn].querySelectorAll(".xmb-subitem"));
    subitems.forEach((item) => {
        item.classList.remove("active");
        item.classList.remove("inactive");
        item.classList.remove("gotop");
    });
    if (sub >= 0 && sub < subitems.length) {
        subitems[sub].classList.add("active");
        if (down) {
            for (let i = 0; i < sub; i++) {
                subitems[i].classList.add('inactive')
            }
        }
    }


    if (sub >= 1 && down) {
        for (let i = 0; i < sub - 1; i++) {
            subitems[i].classList.add("gotop")
        }
    }
};

document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        navSound.play();
        e.preventDefault();
        subsection++;
        const subitems = Array.from(xmbItems[sectionNumber].querySelectorAll(".xmb-subitem"));
        if (subsection >= subitems.length) {
            subsection = subitems.length - 1
        }
        focusSubMenu(sectionNumber, subsection, true, false);

    } else if (e.key === "ArrowUp") {
        navSound.play();
        e.preventDefault();
        subsection--;
        if (subsection < 0) {
            subsection = 0
        }
        focusSubMenu(sectionNumber, subsection, false, true);
    } else if (e.key === "ArrowRight") {
        navSound.play();
        e.preventDefault();
        sectionNumber++;
        if (sectionNumber >= xmbItems.length) {
            sectionNumber = xmbItems.length - 1
        }
        focusSection(sectionNumber, true, false);
    } else if (e.key === "ArrowLeft") {
        navSound.play();
        e.preventDefault();
        sectionNumber--;
        if (sectionNumber < 0) {
            sectionNumber = 0;
        }
        focusSection(sectionNumber, false, true);
    }
});
document.addEventListener('click', (event) => {
    if (event.target.closest('.xmb-subitem')) {
        const link = event.target.closest('.xmb-subitem')
        window.location.href = link.href;
    }
});
loadMenu();
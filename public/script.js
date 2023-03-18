const updateLength = () => {
    let allQuesttions = document.querySelectorAll("form > div > div");
    console.log(document.querySelector("form"));
    document.querySelector("form > div").style.width = `${allQuesttions.length * 100
        }%`;
};
updateLength();
const updateTransition = (i) => {
    let allQuesttions = document.querySelectorAll(".question > div");
    allQuesttions.forEach((cur) => {
        console.log(cur);
        cur.style.transform = `translateX(-${i * 100}%)`;
    });
};

let i = 0;
checkStatus(i);
next.addEventListener("click", (e) => {
    ++i;
    updateTransition(i);
    checkStatus(i);
});

prev.addEventListener("click", (e) => {
    --i;
    updateTransition(i);
    checkStatus(i);
});

function checkStatus(i) {
    let allQuesttions = document.querySelectorAll(".question > div");
    if (i == 0) {
        que_no.innerText = i + 1;
        prev.style.opacity = 0.5;
        prev.style.cursor = "not-allowed";
        next.style.width = "20%";
        prev.style.width = "20%";
        prev.disabled = true;
        row.style.justifyContent = "space-around";
    } else if (i == allQuesttions.length - 1 || i == allQuesttions.length) {
        que_no.innerText = i + 1;
        prev.disabled = false;
        prev.style.cursor = "pointer";
        next.setAttribute("value", "SUBMIT");
        setTimeout(() => {
            next.setAttribute("type", "submit");
        }, 1);
    } else {
        que_no.innerText = i + 1;
        prev.disabled = false;
        prev.style.opacity = 1;
        prev.style.cursor = "pointer";
        prev.style.display = "block";
        prev.style.width = "20%";
        next.setAttribute("value", "NEXT");
        next.setAttribute("type", "button");
    }
    // console.log(allQuesttions.length);
}
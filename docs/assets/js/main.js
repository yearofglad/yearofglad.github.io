let btnContainer = document.getElementById("navigator");


let btns = btnContainer.getElementsByClassName("nav-item");


for (let i = 0; i < btns.length; i++) {

    btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";

    }); 
}

let setHomeActive = document.getElementById("set-p-active");
setHomeActive.addEventListener("click", function() {
    for (let j = 0; j < btns.length; j++) {
        btns[j].className = btns[j].className.replace(" active", "");
    }
    btns[1].className += " active";
});

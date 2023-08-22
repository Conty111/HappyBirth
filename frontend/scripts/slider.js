let cards_block = document.querySelector(".cards"),
    cards = document.querySelectorAll(".work-card"),
    card_block_width = cards_block.getBoundingClientRect().width,
    card_width = cards[0].getBoundingClientRect().width,
    gap = (card_block_width - card_width*cards.length - 100)/2,
    startMouseX = 0,
    finishMouseX = 0,
    slideDirection = 0,
    mousePressed = false,
    mouse_move=false,
    sensivity = 50,
    direction = 0,
    can_slide = true,
    dots = document.querySelectorAll(".dote"),
    window_size = window.innerWidth;


cards_block.addEventListener("mousedown", function(event) {
    startMouseX = event.clientX;
    mousePressed = true;
})

cards_block.addEventListener("mouseup", function(event) {
    mouse_move=false;
    mousePressed = false;
    slideDirection = slideDirection / Math.abs(slideDirection);
    console.log(slideDirection);
    can_slide=true;
})

function slide(d) {
    direction += d
        if (direction < -1)
            direction += 1
        else if (direction > (Number)(cards.length/2))
            direction -= 1
        cards_block.setAttribute("style", `transform: translateX(${(card_width + gap) * -direction}px);`);
        for (var i = 0; i < cards.length; i ++) {
            cards[i].classList.remove("active");
            dots[i].classList.remove("active-dote");
        }
        cards[direction + 1].classList.add("active");
        dots[direction + 1].classList.add("active-dote")
        can_slide=false;
}

window.addEventListener("mousemove", function(event) {
    finishMouseX = event.clientX;
    mouse_move = true;
    slideDirection = finishMouseX - startMouseX;
    if (mousePressed && Math.abs(slideDirection) > sensivity && can_slide){
        var d = slideDirection / Math.abs(slideDirection);
        slide(-d)
    }
})

window.onkeydown = function(event) {
    if (event.key == "ArrowRight") {
        slide(1);
    }
    else if (event.key == "ArrowLeft") {
        slide(-1);
    }
}

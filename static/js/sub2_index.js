var target = document.querySelector(".button")
target.addEventListener("mouseover", function() {
    this.classList.remove("hide");    
})
target.addEventListener("mouseout", function() {
    this.classList.add("hide");})


const draggables = document.querySelectorAll(".drag");
let offsetX, offsetY;

const dragNDrop = (item) => {
    const move = (e) => {
        item.style.left = `${e.clientX-offsetX}px`
        item.style.top = `${e.clientY-offsetY}px`
    }
    item.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - item.offsetLeft;
        offsetY = e.clientY - item.offsetTop;
        document.addEventListener("mousemove", move);
    });
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
    });
}


draggables.forEach(dragNDrop);


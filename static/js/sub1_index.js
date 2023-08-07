var target = document.querySelector(".button")
target.addEventListener("mouseover", function() {
    this.classList.remove("hide");    
})
target.addEventListener("mouseout", function() {
    this.classList.add("hide");})
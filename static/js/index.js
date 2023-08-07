target = document.querySelectorAll(".clickMe")

for (var i=0; i<2; i++) {
    target[i].addEventListener("mouseover", function() {
        this.classList.remove("hide");    
    })
    target[i].addEventListener("mouseout", function() {
        this.classList.add("hide");
    })
}
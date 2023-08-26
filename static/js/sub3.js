const canvas = document.getElementById('drawing-board');
const cancel = document.getElementById('cancel');
const save = document.getElementById('save');
const ctx = canvas.getContext('2d');
const placeholder = document.querySelectorAll(".placeholder")

canvas.width = (801/1920)*window.innerWidth;
canvas.height = (323/1080)*window.innerHeight;

// background expand

const gridDisplay = document.querySelector('.display');
const backLeft = document.querySelector('.back_left');
const backRight = document.querySelector('.back_right');
const children = gridDisplay.children;
if (children.length > 6) {
    const lastChild = children[children.length-1];
    const lastChildRect = lastChild.getBoundingClientRect();
    const divHeight = lastChildRect.top+(1.6*window.innerHeight)+'px'; //60*window.innerHeight
    backLeft.style.height = divHeight;
    backRight.style.height = divHeight;
};

let isPainting = false;
let paint = false;
let lineWidth = 5;
let startX;
let startY;


cancel.addEventListener('click', e => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint = false;
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    const location = canvas.getBoundingClientRect();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX-location.left, e.clientY-location.top);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    paint = true;
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw); // Attach the event to the document instead of canvas

for (const element of placeholder) {
    canvas.addEventListener('mouseenter', () => element.classList.add("hide"))
    canvas.addEventListener('mouseleave', () => {
        if (paint == false){element.classList.remove("hide");}})
}


save.addEventListener('click', (e) => {
    var url = canvas.toDataURL();
    var formData = new FormData();
    formData.append('image', url);
    fetch('/archive', {
        method: 'POST',
        body: formData
    }).then( location.href("{{(url_for('archive'))}}")
    );
        // 페이지 reload해서 보여줘야해
    })


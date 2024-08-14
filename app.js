const ASPECT_RATIO = 4 / 5;
const WIDTH = 360;
const HEIGHT = WIDTH / ASPECT_RATIO;
const imageInput = document.getElementById("imageInput");

let images = [];
let inspectors = [];

imageInput.addEventListener('input',(event)=>{
    const myImgFile = event.target.files[0];
    const imgUrl = URL.createObjectURL(myImgFile);
    const newImage = new Img(imgUrl,WIDTH,HEIGHT,0,0);
    images.push(newImage);
    const newInspector = new Inspector(newImage);
    newInspector.renderElements("inspector");
}); 

window.addEventListener('click',()=>{
    //filter images & text by their active status.. Not so efficient :/
    images = images.filter(v => v.active === true);
});


function setup() {
    createCanvas(WIDTH, WIDTH / ASPECT_RATIO);
}

function draw(){    
    background(100);
    for(const img of images){
        img.updateImage();
    }
}
const ASPECT_RATIO = 4 / 5;
const WIDTH = 360;
const HEIGHT = WIDTH / ASPECT_RATIO;
const imageInput = document.getElementById("imageInput");
const CANVAS = document.getElementById("canvas");

let images = [];
let inspectors = [];

imageInput.addEventListener('input',(event)=>{
    const myImgFile = event.target.files[0];
    createNewImage(myImgFile);
}); 

function createNewImage(file){
    const imgUrl = URL.createObjectURL(file);
    const newImage = new Img(imgUrl,WIDTH,HEIGHT,0,0);
    images.push(newImage);

    const newInspector = new Inspector(newImage);
    newInspector.renderElements("inspector");
}

window.addEventListener('click',()=>{
    //filter images & text by their active status.. Not so efficient :/
    images = images.filter(v => v.active === true);
});

window.addEventListener('drop',(ev)=>{
    // TODO: Check file type & only accept image!
    ev.preventDefault();
    
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        createNewImage(file);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      // Handel the drop file..
    });
  }
    
})

window.addEventListener('dragover',(e)=>{
    e.preventDefault();
})

window.addEventListener('paste',(ev)=>{
    if (ev.clipboardData.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.clipboardData.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            createNewImage(file);
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.clipboardData.files].forEach((file, i) => {
          // Handel the drop file..
        });
      }
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
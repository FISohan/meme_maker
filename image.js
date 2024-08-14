class Img{
    /**
     *
     */
    constructor(img,width,height,x,y) {
        this.id = generateRandomId(10);
        this.img = img;
        this.height = height;
        this.width = width;
        this.positionX = x;
        this.positionY = y;
        this.isRenderInspectorElement = false;
        this.active = true;
        this.newImg = loadImage(this.img);
    }

    updateImage(){
        image(this.newImg, 0, 0,this.width,this.height,this.positionX,this.positionY);
    }
}
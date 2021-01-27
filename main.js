status="";
objects=[];
video="";


function setup(){
canvas=createCanvas(500,450);
canvas.center();
}

function preload()
{
video=createVideo("video.mp4");
video.hide();
}

function gotResult(error,results)
{
if(error)
{
console.log(error);
}

else
{
console.log(results);
    objects=results;
}
}


function draw()
{
image(video, 0,0,500,450);
if(status!="")
{
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="status:objects detected";
document.getElementById("noofobjects").innerHTML="no of objects:"+objects.length;
percent=floor(objects[i].confidence*100);
fill("#ff0000");
text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
noFill();
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}

}
}


function start()
{
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";

}


function modelLoaded()
{
console.log("coco ssd has loaded!");
status="true";
video.loop();
video.speed(1);
video.volume(0);
}

img = "";
status = "";
objects = [];
music = "";
function setup()
{
    canvas = createCanvas(380,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size();
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting the objects!";

}
function modelLoaded()
{
    console.log("Model is Loaded!");
    status = true;
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function preload()
{
    img = loadImage("dog_cat.jpg");
    song=loadSound("ringing_old_phone.mp3");
}



function draw()
{
    image(video,0,0,380,300);

    if(status!="")
{
    r = random(255);
    b = random(255);
    g = random(255);
    objectDetector.detect(video,gotResults);
    for(i=0; i<objects.length; i++)
    {
        document.getElementById("status").innerHTML="Status : Objects Detected!";
        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " : " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        if(objects[i].label == "person")
        {
            document.getElementById("found").innerHTML= "Baby - Found";
            music.stop();
        }
        else
        {
            document.getElementById("found").innerHTML= "Baby - Not Found";
            music.play();
        }

    }
   
}
    
}
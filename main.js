song1="";
song2="";
leftwristX=0;
rightwristX=0;
rightwristY=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;



function setup() {
     canvas = createCanvas(600,500);
     canvas.center();
 
     video = createCapture(VIDEO);
     video.hide();
 
     poseNet=ml5.poseNet(video , modelLoaded)
     poseNet.on('pose' , gotPoses)
} 

function preload() {
     song1 = loadSound('music1.mp3');
     song2 = loadSound('music2.mp3');
   }

   function draw() {
     image( video , 0 , 0 , 600 , 500);
     fill("red");
    stroke("red");
    if(scorerightwrist>0.2){
    circle(rightwristX , rightwristY , 20);
    song2.play()
    song1.stop()
    song2.setVolume(1)
     song2.rate(1)
    
}
    
    
    
    if(scoreleftwrist>0.2){
    circle(leftwristX , leftwristY , 20);
    song1.play()
    song2.stop()
    song1.setVolume(1)
    song1.rate(1)
    }
   }

   function modelLoaded() {
     console.log("model is loaded");
   }

   function gotPoses(error , results) {
     if(error) {
       console.log(error)
     }

     console.log(results)
     leftwristX=results[0].pose.leftWrist.x;
     leftwristY=results[0].pose.leftWrist.y;
     rightwristX=results[0].pose.rightWrist.x;
     rightwristY=results[0].pose.rightWrist.y;

     console.log("leftwristx= " + leftwristX + ", leftwristy= " + leftwristY)
     console.log("rightwristx= " + rightwristX + ", rightwristy= " + rightwristY)
     scoreleftwrist = results[0].pose.keypoints[9].score;
     console.log("scoreleftwrist= " + scoreleftwrist);
     scorerightwrist = results[0].pose.keypoints[10].score;
     console.log("scorerightwrist= " + scorerightwrist);
   }

   function song() {
     song1.play()
     
     
   }
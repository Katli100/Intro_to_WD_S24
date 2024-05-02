/* 
p5.video recorder
https://github.com/calebfoss/p5.videorecorder
-------------------
Example - Webcam

Record video and audio from webcam
Then display and download the recorded video
*/

/*
This code is modified for my final project use case
*/

//  Declare variable to store VideoRecorder object
let videoRecorder;
let capture;
let recordButton, stopButton, downloadButton, deleteButton;
let deleteCount;
let videoPlayback

function setup() {
  createCanvas(800, 800);
  
  //  Create a webcam capture with video and audio
  //  When the stream is ready, setup the buttons
  capture = createCapture({ video: true, audio: true }, setupButtons);
  //  Mute webcam audio to prevent feedback
  capture.volume(0);
  //  Hide capture element (because it will be displayed on canvas instead)
  capture.hide();
  
  //  Create a new VideoRecorder instance
  //    with webcam capture as input
  videoRecorder = new p5.VideoRecorder(capture);
  //  Set callback for when recording is completed
  //    and video file has been created
	videoRecorder.onFileReady = stopRecording;
}

function draw() {
    image(capture, 0, 0, width, height);
    //  If recording
    if (videoRecorder.recording) {
      //  Display a red circle indicator
      noStroke();
      fill(200, 40, 20);
      circle(width - 50, 50, 50);
    }
}


//  Create buttons and hide all except record
function setupButtons() {
  recordButton = createButton("Record");
  recordButton.mousePressed(startRecording);
  stopButton = createButton("Stop");
  stopButton.hide();
  downloadButton = createButton("Download");
  downloadButton.hide();
  deleteButton = createButton("Delete take")
  deleteButton.hide()
}


function startRecording() {
  //  Set buttons to manage recording
  //    and show hidden buttons
	stopButton.mousePressed(stopRecording);
  stopButton.show();
	videoRecorder.start();
}

function stopRecording() {
	videoRecorder.stop()
	videoPlayback = createVideo(videoRecorder.url);
	videoPlayback.hide();
  downloadButton.mousePressed(() => {videoRecorder.save("webcam"); window.location.href='end.html';});
  downloadButton.show();
  deleteButton.show();
  deleteButton.mousePressed(deleteStuff)
  console.log(deleteCount)
  recordButton.hide();
  stopButton.hide();

}

function deleteStuff(){

  deleteCount+=1;
  deleteButton.hide();
  downloadButton.hide();
  setupButtons();
}


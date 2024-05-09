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

// Declare variable to store VideoRecorder object
// Declare variable to store VideoRecorder object
// Declare variable to store VideoRecorder object
// Declare variable to store VideoRecorder object
let videoRecorder;
let capture;
let recordButton, stopButton, downloadButton, deleteButton;
let deleteCount;
let videoPlayback;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, TOP); // Align text and buttons to the center horizontally

  // Create a webcam capture with video and audio
  capture = createCapture({ video: true, audio: true }, setupButtons);
  // Mute webcam audio to prevent feedback
  capture.volume(0);
  // Hide capture element (because it will be displayed on canvas instead)
  capture.hide();
  
  // Create a new VideoRecorder instance
  // with webcam capture as input
  videoRecorder = new p5.VideoRecorder(capture);

  // Set callback for when recording is completed
  // and video file has been created
  videoRecorder.onFileReady = stopRecording;
}

function draw() {
  // Calculate sizes based on the smaller dimension of the window
  let minDimension = min(windowWidth, windowHeight) * 0.8;
  let captureWidth, captureHeight;
  
  // Adjust capture size while maintaining aspect ratio
  if (width > height) {
    captureWidth = minDimension;
    captureHeight = (captureWidth / capture.width) * capture.height;
  } else {
    captureHeight = minDimension;
    captureWidth = (captureHeight / capture.height) * capture.width;
  }

  // Calculate positions for centering
  let captureX = (width - captureWidth) / 2;
  let captureY = (height - captureHeight) / 2;

  // Draw capture
  image(capture, captureX, captureY, captureWidth, captureHeight);

  // If recording
  if (videoRecorder.recording) {
    // Display a red circle indicator
    let indicatorX = captureX + captureWidth - 20;
    let indicatorY = captureY + 20;
    noStroke();
    fill(200, 40, 20);
    circle(indicatorX, indicatorY, 20);
  }
}

// Create buttons and hide all except record
function setupButtons() {
  recordButton = createButton("Record");
  recordButton.mousePressed(startRecording);
  stopButton = createButton("Stop");
  stopButton.hide();
  downloadButton = createButton("Download");
  downloadButton.hide();
  deleteButton = createButton("Delete take");
  deleteButton.hide();
  positionButtons(); // Position buttons initially
}

// Position buttons below the capture and center horizontally
function positionButtons() {
  const buttonWidth = 100;
  const buttonHeight = 30;
  const spacing = 20;
  
  let minDimension = min(windowWidth, windowHeight) * 0.8;
  let captureWidth, captureHeight;
  
  // Adjust capture size while maintaining aspect ratio
  if (width > height) {
    captureWidth = minDimension;
    captureHeight = (captureWidth / capture.width) * capture.height;
  } else {
    captureHeight = minDimension;
    captureWidth = (captureHeight / capture.height) * capture.width;
  }

  let captureX = (width - captureWidth) / 2;
  let captureY = (height - captureHeight) / 2;

  let buttonX = (width - buttonWidth * 2 - spacing) / 2;
  let buttonY = captureY + captureHeight + spacing;

  recordButton.position(buttonX, buttonY);
  stopButton.position(buttonX + buttonWidth + spacing, buttonY);
  downloadButton.position(buttonX, buttonY + buttonHeight + spacing);
  deleteButton.position(buttonX + buttonWidth + spacing, buttonY + buttonHeight + spacing);
}

function startRecording() {
  // Set buttons to manage recording
  // and show hidden buttons
  stopButton.mousePressed(stopRecording);
  stopButton.show();
  videoRecorder.start();
}

function stopRecording() {
  videoRecorder.stop();
  videoPlayback = createVideo(videoRecorder.url);
  videoPlayback.hide();
  downloadButton.mousePressed(() => {videoRecorder.save("webcam"); window.location.href='end.html';});
  downloadButton.show();
  deleteButton.show();
  deleteButton.mousePressed(deleteStuff);
  recordButton.hide();
  stopButton.hide();
}

function deleteStuff() {
  deleteCount += 1;
  deleteButton.hide();
  downloadButton.hide();
  setupButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionButtons(); // Reposition buttons when window is resized
}

import React, { useEffect, useRef, useState } from 'react';
import classes from './objectDetection.module.css';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import renderPredictions from './utils/renderPrediction';

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setisLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    setisLoading(true);
    const net = await cocoSSDLoad();
    setisLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };

  const runObjectDetection = async (net) => {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      //find detected Objects
      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6,
      );
    //   console.log(detectedObjects);

    const context = canvasRef.current.getContext("2d")
    renderPredictions(detectedObjects, context)
    }
  };

  const showmyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showmyVideo();
  }, []);

  return (
    <div className={classes.obj}>
      {isLoading ? (
        <div>AI model is loading...</div>
      ) : (
        <div className={classes.modal}>
          {/* webcom */}
          <Webcam muted ref={webcamRef} className={classes.webcam} />
          {/* canvas */}
          <canvas ref={canvasRef} className={classes.canvas} />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;

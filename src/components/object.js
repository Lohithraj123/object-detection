import React from 'react';
import classes from './object.module.css';
import ObjectDetection from './objectDetection';

const Object = () => {
  return (
    <main className={classes.heading}>
      <h1>Thief Detection Alarm</h1>
      <ObjectDetection />
    </main>
  );
};

export default Object;

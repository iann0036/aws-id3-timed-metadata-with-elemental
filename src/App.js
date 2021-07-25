import React from 'react';
import VideoJS from './components/VideoJS'
import Button from './components/Button';
import TextInput from './components/TextInput';
import './App.css';

const App = () => {
  let innerDiv;

  let videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: []
  }

  function setURL() {
    videoJsOptions.sources.push({ src: 'x', type: 'application/x-mpegURL' });
  }

  if (videoJsOptions.sources.length > 0) {
    innerDiv = (
      <div>
        <VideoJS options={videoJsOptions} />
      </div>
    );
  } else {
    innerDiv = (
      <div>
        <TextInput placeholder="Enter a HLS URL..." />
        <Button onClick={setURL}>Set URL</Button>
      </div>
    );
  }

  return (
    <>
      {innerDiv}
    </>
  );
}

export default App;

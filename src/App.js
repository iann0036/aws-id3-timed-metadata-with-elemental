import React from 'react';
import { useState } from 'react';
import VideoJS from './components/VideoJS'
import Button from './components/Button';
import TextInput from './components/TextInput';
import './App.css';

const App = () => {
  const innerDiv = () => {
    const [input, setInput] = useState('');
    const [videoJsOptions, setVideoJsOptions] = useState({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: []
    });

    const setURL = () => {
      videoJsOptions.sources.push({ src: input, type: 'application/x-mpegURL' });
      setVideoJsOptions(videoJsOptions);
      console.log("SET");
    };

    if (videoJsOptions.sources.length > 0) {
      return (
        <div>
          <VideoJS options={videoJsOptions} />
          <p>URL: {input}</p>
        </div>
      );
    } else {
      return (
        <div>
          <TextInput value={input} onInput={e => setInput(e.target.value)} placeholder="Enter a HLS URL..." />
          <Button onClick={setURL}>Set URL</Button>
        </div>
      );
    }
  };

  let div = innerDiv();

  return (
    <>
      {div}
    </>
  );
}

export default App;

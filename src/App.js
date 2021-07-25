import React from 'react';
import { useState } from 'react';
import VideoJS from './components/VideoJS'
import Button from './components/Button';
import TextInput from './components/TextInput';
import './App.css';

const App = () => {
  let innerDiv;

  const [input, setInput] = useState('');

  let videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: []
  }

  function setURL() {
    videoJsOptions.sources.push({ src: input, type: 'application/x-mpegURL' });
    alert();
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
        <TextInput value={input} onInput={e => setInput(e.target.value)} placeholder="Enter a HLS URL..." />
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

import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";

export const VideoJS = (props) => {

  const videoRef = React.useRef(null);
  const { options } = props;

  // This seperate functional component fixes the removal of the videoelement 
  // from the DOM when calling the dispose() method on a player
  const VideoHtml = (props) => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );

  const Utf8ArrayToStr = (array) => {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  };

  React.useEffect(() => {
    const videoElement = videoRef.current;
    let player;
    if (videoElement) {
      player = videojs(videoElement, options, () => {
        console.debug("player is ready");
      });

      player.textTracks().addEventListener('addtrack', (addTrackEvent) => {
        var track = addTrackEvent.track;
        track.mode = 'hidden';

        track.addEventListener('cuechange', () => {
          for (let i = 0; i < track.activeCues.length; i++) {
            if (track.activeCues[i].value.key == "TXXX") {
              console.log(Utf8ArrayToStr(track.activeCues[i].value.data));
            }
          }
        });
      });
    }
    return () => {
      if (player) {
        player.dispose();
      }
    }
  }, [options]);

  return (<VideoHtml />);
}
export default VideoJS;
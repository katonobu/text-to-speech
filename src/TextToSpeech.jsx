
import React from "react";
import { useTextToSpeech } from "./useTextToSpeech";

const TextToSpeech = ({ tracks }) => {
  const {
    playingStt,
    currentTrack,
    totalTracks,
    playPause,
    stop,
    prevTrack,
    nextTrack,
  } = useTextToSpeech(tracks);

  const buttonLabel =
    playingStt === "IDLE" ? "▶" : playingStt === "PLAY" ? "⏸" : "⏸▶";

  return (
    <div>
      <p>TRACK : {currentTrack + 1}/{totalTracks}</p>
      <button onClick={prevTrack} disabled={currentTrack === 0}>{"⏮"}</button>
      <button onClick={playPause}>{buttonLabel}</button>
      <button onClick={stop} disabled={playingStt === "IDLE"}>⏹</button>
      <button onClick={nextTrack} disabled={currentTrack >= totalTracks - 1}>{"⏭"}</button>
    </div>
  );
};

export default TextToSpeech;
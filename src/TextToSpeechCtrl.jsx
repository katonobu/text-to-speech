import { useTextToSpeech } from "./useTextToSpeech";

export const TextToSpeechCtrl = ({texts, disabled}) => {
  const {
    playingStt,
    currentTrack,
    totalTracks,
    playStopDisabled,
    playStop,
    prevTrackDisabled,
    prevTrack,
    nextTrackDisabled,
    nextTrack,
  } = useTextToSpeech(texts);


  if (!texts) return <p className="p-4">データがありません。</p>

  const playStopButtonLabel =
    (playingStt === "IDLE" || playingStt === "PAUSE") ? "▶" :  (playingStt === "PLAY") ? "⏹" : "..."


  return (
    <div className="p-4">
      <p>TRACK : {currentTrack + 1}/{totalTracks}</p>
      <p>{playingStt}</p>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${prevTrackDisabled() || disabled? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={prevTrack}
        disabled={prevTrackDisabled() || disabled}
      >⏮</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${playStopDisabled() || disabled? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={playStop}
        disabled={playStopDisabled() || disabled}
      >{playStopButtonLabel}</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${nextTrackDisabled() || disabled? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={nextTrack}
        disabled={nextTrackDisabled() || disabled}
      >⏭</button>
    </div>
  );
};

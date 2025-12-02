
import { useTextToSpeech } from "./useTextToSpeech";

export const TextToSpeechCtrl = ({texts, loading}) => {
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

  const playStopButtonLabel =
    (playingStt === "IDLE" || playingStt === "PAUSE") ? "▶" :  (playingStt === "PLAY") ? "⏹" : "..."

  return (
    <div className="p-4">
      <p>{loading?"Loading ...":`TRACK : ${currentTrack + 1}/${totalTracks}`}</p>
      <p>{playingStt}</p>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${prevTrackDisabled() || loading || !texts ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={prevTrack}
        disabled={prevTrackDisabled() || loading || !texts}
      >⏮</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${playStopDisabled() || loading || !texts ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={playStop}
        disabled={playStopDisabled() || loading || !texts}
      >{playStopButtonLabel}</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${nextTrackDisabled() || loading || !texts ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={nextTrack}
        disabled={nextTrackDisabled() || loading || !texts}
      >⏭</button>
    </div>
  );
};

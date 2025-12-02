import { useTextToSpeech } from "./useTextToSpeech";
import { useTtsTicker } from "./useTtsTicker";
import { TtsTicker } from "./TtsTicker";

export const TextToSpeechCtrl = ({texts, loading}) => {
  const {
    playingStt,
    currentTrack,
    totalTracks,
    currentStr,
    eventInfo,
    playStopDisabled,
    playStop,
    prevTrackDisabled,
    prevTrack,
    nextTrackDisabled,
    nextTrack,
  } = useTextToSpeech(texts);

  const playStopButtonLabel =
    (playingStt === "IDLE" || playingStt === "PAUSE") ? "▶" :  (playingStt === "PLAY") ? "⏹" : "..."

  const startOffset = 3
  const updateIntervalMs = 500
  const {displayStartIndex, charsPerSec} = useTtsTicker(currentStr, playingStt, eventInfo, startOffset, updateIntervalMs)
  const length = 32
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

      <p>{charsPerSec}</p>
      <TtsTicker currentStr={currentStr} displayStartIndex={displayStartIndex}></TtsTicker>
    </div>
  );
};

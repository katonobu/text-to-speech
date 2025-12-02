
import { useTextToSpeech } from "./useTextToSpeech";

const TtsTicker = ({currentStr, eventInfo, startOffset, length}) => {
  const {charIndex, elapsedTime, name} = eventInfo?eventInfo:{charIndex:-1, elapsedTime:-1, name:""}
  if (name === "start" || name === "end") {
    return <p>{name}</p>
  } else {
    const startIndex = Math.max(0, charIndex - startOffset)
    return <p>{currentStr.slice(startIndex, startIndex + length)}</p>
  }
}


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
  const {charIndex, elapsedTime, name} = eventInfo?eventInfo:{charIndex:-1, elapsedTime:-1, name:""}
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

      <p>{charIndex} {charIndex === 0?0:elapsedTime/charIndex} </p>
      <TtsTicker currentStr={currentStr} eventInfo={eventInfo} startOffset={startOffset} length={length}></TtsTicker>
    </div>
  );
};


import { useTextToSpeech } from "./useTextToSpeech";
import { useFetchKaisetsuTexts } from "./useFetchKaisetsuTexts";

const TextToSpeech = () => {
  const {
    texts,
    loading
  } = useFetchKaisetsuTexts()

  const {
    playingStt,
    currentTrack,
    totalTracks,
    playPauseDisabled,
    playPause,
    stopDisabled,
    stop,
    prevTrackDisabled,
    prevTrack,
    nextTrackDisabled,
    nextTrack,
  } = useTextToSpeech(texts);


  if (loading) return <p className="p-4">読み込み中...</p>
  if (!texts) return <p className="p-4">データがありません。</p>

  const playPauseButtonLabel =
    (playingStt === "IDLE" || playingStt === "PAUSE") ? "▶" :  (playingStt === "PLAY") ? "⏸" : "..."

  return (
    <div className="p-4">
      <h1
        className="text-2xl font-bold"
      >クライアント側音声読み上げサンプル</h1>
      <h2
        className="text-lg font-bold"
      >読み上げ制御コンポーネント</h2>
      <p>TRACK : {currentTrack + 1}/{totalTracks}</p>
      <p>{playingStt}</p>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${prevTrackDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={prevTrack}
        disabled={prevTrackDisabled()}
      >⏮</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${playPauseDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={playPause}
        disabled={playPauseDisabled()}
      >{playPauseButtonLabel}</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${stopDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={stop}
        disabled={stopDisabled()}
      >⏹</button>
      <button
        className={`px-1 py-1 rounded text-white 
                    ${nextTrackDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={nextTrack}
        disabled={nextTrackDisabled()}
      >⏭</button>
      <h2
        className="text-lg font-bold"
      >読み上げ対象テキスト</h2>
      <ul class="list-decimal text-wrap px-10">
        {texts.map((item,idx) => (<li
          key={idx}
        >{item}</li>))}
      </ul>
      <p className="text-xs">Build Time : {import.meta.env.VITE_BUILD_TIME}</p>
    </div>
  );
};

export default TextToSpeech;
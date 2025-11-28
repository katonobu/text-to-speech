
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
    playPause,
    stop,
    prevTrack,
    nextTrack,
  } = useTextToSpeech(texts);


  if (loading) return <p className="p-4">読み込み中...</p>
  if (!texts) return <p className="p-4">データがありません。</p>

  const buttonLabel =
    playingStt === "IDLE" ? "▶" : playingStt === "PLAY" ? "⏸" : "⏸▶";

  return (
    <div>
      <h1>クライアント側音声読み上げサンプル</h1>
      <h2>読み上げ制御コンポーネント</h2>
      <p>TRACK : {currentTrack + 1}/{totalTracks}</p>
      <button onClick={prevTrack} disabled={currentTrack === 0}>{"⏮"}</button>
      <button onClick={playPause}>{buttonLabel}</button>
      <button onClick={stop} disabled={playingStt === "IDLE"}>⏹</button>
      <button onClick={nextTrack} disabled={currentTrack >= totalTracks - 1}>{"⏭"}</button>
      <h2>読み上げ対象テキスト</h2>
      <ul>
        {texts.map((item,idx) => (<li key={idx}>{item}</li>))}
      </ul>
    </div>
  );
};

export default TextToSpeech;

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
    <div className="p-4">
      <h1
        className="text-2xl font-bold"
      >クライアント側音声読み上げサンプル</h1>
      <h2
        className="text-lg font-bold"
      >読み上げ制御コンポーネント</h2>
      <p>TRACK : {currentTrack + 1}/{totalTracks}</p>
      <button 
        class="border border-gray-500 rounded w-[25px] h-[25px] text-black bg-white"
        onClick={prevTrack}
        disabled={currentTrack === 0}
      >{"⏮"}</button>
      <button
        class="border border-gray-500 rounded w-[40px] h-[25px] text-black bg-white"
        onClick={playPause}
      >{buttonLabel}</button>
      <button
        class="border border-gray-500 rounded w-[25px] h-[25px] text-black bg-white"
        onClick={stop}
        disabled={playingStt === "IDLE"}
      >⏹</button>
      <button
        class="border border-gray-500 rounded w-[25px] h-[25px] text-black bg-white"
        onClick={nextTrack}
        disabled={currentTrack >= totalTracks - 1}
      >{"⏭"}</button>
      <h2
        className="text-lg font-bold"
      >読み上げ対象テキスト</h2>
      <ul class="list-decimal text-wrap px-10">
        {texts.map((item,idx) => (<li
          key={idx}
        >{item}</li>))}
      </ul>
    </div>
  );
};

export default TextToSpeech;
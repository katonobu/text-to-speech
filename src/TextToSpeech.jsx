import { useFetchKaisetsuTexts } from "./useFetchKaisetsuTexts";
import { TextToSpeechCtrl} from "./TextToSpeechCtrl"

const TextToSpeech = ({disabled}) => {
  const {
    texts,
    loading
  } = useFetchKaisetsuTexts()

  if (!texts) return <p className="p-4">データがありません。</p>
  return (
    <div className="p-4">
      <h1
        className="text-2xl font-bold"
      >クライアント側音声読み上げサンプル</h1>
      <h2
        className="text-lg font-bold"
      >読み上げ制御コンポーネント</h2>

      <TextToSpeechCtrl texts={texts} disabled={loading}></TextToSpeechCtrl>

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
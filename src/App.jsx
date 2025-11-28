import { useEffect, useState } from 'react'
import TextToSpeech from './TextToSpeech';

const App = () => {
  const [kaisetsu, setKaisetsu] = useState(null)
  const [loading, setLoading] = useState(true)  
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}kaisetsu_tanki.json`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch metadata')
        return response.json()
      })
      .then(data => {
        const tracks = []
        tracks.push([
          data[0].name,
          data[0].sentences[0]
        ].join("\n"))
        tracks.push(data[1].name)
        data[1].subsections.forEach(item => {
          const texts = []
          texts.push(item.name)
          item.sentences.forEach(sentence => texts.push(sentence))
          tracks.push(texts.join("\n"))
        })
        tracks.push(data[2].name)
        data[2].subsections.forEach(item => {
          const texts =[]
          texts.push(item.name)
          item.sentences.forEach(sentence => texts.push(sentence))
          tracks.push(texts.join("\n"))
        })
        setKaisetsu(tracks)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching metadata:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="p-4">読み込み中...</p>
  if (!kaisetsu) return <p className="p-4">データがありません。</p>

  return (
    <div>
      <h1>クライアント側音声読み上げサンプル</h1>
      <h2>読み上げ制御コンポーネント</h2>
      <TextToSpeech tracks={kaisetsu} />
      <h2>読み上げ対象テキスト</h2>
      <ul>
        {kaisetsu.map((item,idx) => (<li key={idx}>{item}</li>))}
      </ul>
    </div>
  );
};

export default App;

import { useEffect, useState } from 'react'

export const useFetchKaisetsuTexts = () => {
  const [kaisetsu, setKaisetsu] = useState([])
  const [loading, setLoading] = useState(true)  
  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}kaisetsu_tanki.json`
    fetch(url)
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

  return {
    texts:kaisetsu,
    loading
  }
}

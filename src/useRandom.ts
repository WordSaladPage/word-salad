import {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react'

export const useRandomWords = (initialCount: number) => {
  const [allWords, setAllWords] = useState<Array<string>>([])
  const [words, setWords] = useState<Array<string>>([])
  const loading = allWords.length === 0
  const lastCountRef = useRef(initialCount)

  // Load word list
  useEffect(() => {
    const loadWords = async () => {
      const res = await fetch('/words.txt')
      const text = await res.text()
      const wordArray = text
        .split('\n')
        .map((w) => w.trim())
        .filter(Boolean)

      setAllWords(wordArray)
    }

    loadWords()
  }, [])

  // Helper to generate random words
  const generate = useCallback(
    (count?: number) => {
      if (allWords.length === 0) return
      count = Math.min(count ?? lastCountRef.current, allWords.length)

      const result: Array<string> = []
      const used = new Set<number>()

      while (result.length < count) {
        const i = Math.floor(Math.random() * allWords.length)
        if (!used.has(i)) {
          used.add(i)
          result.push(allWords[i])
        }
      }

      lastCountRef.current = count
      setWords(result)
    },
    [allWords]
  )

  // Initial generation
  useEffect(() => {
    if (!loading) {
      generate(initialCount)
    }
  }, [loading, initialCount, generate])

  return {
    words,
    loading,
    regenerate: generate,
  }
}

export const useRandomGenre = () => {
  const genres = useMemo(
    () => [
      'Sci-Fi',
      'Romance',
      'Fantasy',
      'Horror',
      'Thriller',
      'Mystery',
      'Drama',
      'Comedy',
      'Action',
      'Adventure',
      'Slice of Life',
      'Historical',
      'Documentary',
      'Crime',
      'Noir',
      'Western',
      'Dystopian',
      'Post-Apocalyptic',
      'Cyberpunk',
      'Steampunk',
      'Magical Realism',
      'Dark Fantasy',
      'Urban Fantasy',
      'Epic Fantasy',
      'Psychological Thriller',
      'Supernatural',
      'Paranormal',
      'Coming of Age',
      'Romantic Comedy',
      'Satire',
      'Mockumentary',
      'Biography',
      'Autobiography',
      'True Crime',
      'War',
      'Military',
      'Political',
      'Sports',
      'Musical',
      'Family',
      'Kids',
      'Animation',
      'Anime',
      'Indie',
      'Experimental',
      'Art House',
    ],
    []
  )
  const [genre, setGenre] = useState<string>(genres[0])
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setGenre(genres[Math.floor(Math.random() * genres.length)])
  }, [trigger, genres])

  const generate = useCallback(() => {
    setTrigger((t) => t + 1)
  }, [])

  return {
    genre,
    regenerate: generate,
  }
}

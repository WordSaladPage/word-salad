import { useState } from 'react'
import { useRandomWords, useRandomGenre } from './useRandom'

export const App = () => {
  const [clicked, setClicked] = useState(false)
  const [showWords, setShowWords] = useState(false)
  const [version, setVersion] = useState(0)

  const {
    words,
    loading,
    regenerate: regenerateWords,
  } = useRandomWords(6)
  const { genre, regenerate: regenerateGenre } = useRandomGenre()

  return (
    <div className='flex h-screen flex-col bg-linear-to-b from-black via-[#05070c] to-black text-2xl text-[#DBE4F2]'>
      {/* Top Half */}
      <div
        className={`flex items-center justify-center transition-all duration-700 ${
          clicked ? 'h-1/2' : 'h-full'
        }`}
      >
        <button
          onClick={() => {
            if (clicked) {
              regenerateWords()
              regenerateGenre()
              setVersion((v) => v + 1)
            }
            setClicked(true)
            setShowWords(false)
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setShowWords(true))
            )
          }}
          className='min-w-55 rounded-xl border border-[#DBE4F2] px-6 py-3 font-medium tracking-widest text-[#DBE4F2] transition-all duration-300 hover:animate-pulse hover:bg-[#DBE4F2] hover:text-black active:scale-95'
        >
          {clicked ? 'Change Inspiration' : 'Get Inspired'}
        </button>
      </div>

      {/* Bottom Half */}
      <div className='flex flex-col'>
        <div className='flex items-center justify-around p-6'>
          {loading ? (
            <></>
          ) : (
            words.map((word, i) => {
              const delay = 200 + i * 150

              return (
                <p
                  key={`${word}-${i}-${version}`}
                  style={{ transitionDelay: `${delay}ms` }}
                  className={`tracking-widest transition-all duration-1500 ${showWords ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'}`}
                >
                  {word}
                </p>
              )
            })
          )}
        </div>
        <div className='flex flex-1 items-center justify-center p-6'>
          {loading ? (
            <></>
          ) : (
            <p
              key={`${genre}-${version}`}
              style={{
                transitionDelay: `${200 + words.length * 150}ms`,
              }}
              className={`tracking-widest transition-all duration-1500 ${showWords ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'}`}
            >
              {`Genre: ${genre}`}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

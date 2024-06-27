'use client'

import dynamic from 'next/dynamic'
const YouTubePlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
})

const YoutubeVideo = ({ url }: { url: string }) => {
  return (
    <div className="my-10 flex justify-center">
      {typeof url === 'string' ? (
        <YouTubePlayer url={url} />
      ) : (
        <div className="h-20 w-full animate-pulse bg-gray-200 dark:bg-zinc-400"></div>
      )}
    </div>
  )
}

export default YoutubeVideo

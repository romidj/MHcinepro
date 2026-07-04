'use client'

import {useMemo, useState} from 'react'
import type {ServicesBackground} from '@/sanity/lib/types'

type VideoBackgroundProps = {
  background: ServicesBackground
}

type VideoItem = {
  key: string
  url: string
  mimeType?: string
}

export function VideoBackground({background}: VideoBackgroundProps) {
  const videos = useMemo(
    () =>
      background?.videos
        ?.map((video) => ({
          key: video._key,
          url: video.videoFile?.asset?.url,
          mimeType: video.videoFile?.asset?.mimeType,
        }))
        .filter((video): video is VideoItem => Boolean(video.url)) ?? [],
    [background]
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)

  if (videos.length === 0) {
    return null
  }

  const activeVideo = videos[activeIndex]
  const nextVideo = nextIndex === null ? null : videos[nextIndex]

  function startTransition() {
    if (videos.length <= 1 || nextIndex !== null) return

    setNextIndex((activeIndex + 1) % videos.length)
  }

  function completeTransition() {
    if (nextIndex === null) return

    setActiveIndex(nextIndex)
    setNextIndex(null)
  }

  return (
    <div className="absolute inset-0">
      <video
        key={activeVideo.key}
        className="absolute inset-0 h-full w-full object-cover opacity-45 transition-opacity duration-1000 ease-in-out"
        autoPlay
        muted
        loop={videos.length === 1}
        playsInline
        onEnded={startTransition}
        onError={startTransition}
      >
        <source src={activeVideo.url} type={activeVideo.mimeType} />
      </video>

      {nextVideo ? (
        <video
          key={nextVideo.key}
          className="absolute inset-0 h-full w-full object-cover opacity-45 transition-opacity duration-1000 ease-in-out"
          autoPlay
          muted
          playsInline
          onLoadedData={() => window.setTimeout(completeTransition, 1000)}
          onError={completeTransition}
        >
          <source src={nextVideo.url} type={nextVideo.mimeType} />
        </video>
      ) : null}
    </div>
  )
}

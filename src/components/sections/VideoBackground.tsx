'use client'

import {useMemo, useState} from 'react'
import type {ServicesBackground} from '@/sanity/lib/types'

type VideoBackgroundProps = {
  background: ServicesBackground
}

type VideoItem = {
  key: string
  url: string
  mimeType: string | undefined
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

  if (videos.length === 0) {
    return null
  }

  const activeVideo = videos[activeIndex]

  function showNextVideo() {
    if (videos.length > 1) {
      setActiveIndex((currentIndex) => (currentIndex + 1) % videos.length)
    }
  }

  return (
    <div className="absolute inset-0">
      <video
        key={activeVideo.key}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop={videos.length === 1}
        playsInline
        onEnded={showNextVideo}
        onError={showNextVideo}
      >
        <source src={activeVideo.url} type={activeVideo.mimeType} />
      </video>
    </div>
  )
}

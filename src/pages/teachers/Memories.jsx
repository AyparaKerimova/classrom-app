import React from 'react'
import VideoPlayer from '../../components/common/VideoPlayer'
import { Helmet } from 'react-helmet-async'

const Memories = () => {
  return (
    <>
        <Helmet>
            <title>Memories</title>
        </Helmet>
        <VideoPlayer/>
    </>
  )
}

export default Memories
import { FC } from 'react'
import {
  MdFullscreen,
  MdHistory,
  MdPause,
  MdPlayArrow,
  MdUpdate
} from 'react-icons/md'
import styles from './VideoPlayer.module.scss'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'

const VideoPlayer: FC<IVideoPlayer> = ({ videoSource }) => {
  const { actions, video, videoRef } = useVideo()

  return (
    <div className={styles['video-player']}>
      <div className={styles.wrapper}>
        <>
          <video
            ref={videoRef}
            className={styles.video}
            src={`${videoSource}#t=1`}
            preload='metadata'
          />

          <div className={styles.progress_bar_container}>
            <div
              style={{ width: `${video.progress}%` }}
              className={styles.progress_bar}
            />
          </div>

          <div className={styles.controls}>
            <div>
              <button type='button' onClick={actions.revert}>
                <MdHistory />
              </button>

              <button
                type='button'
                onClick={actions.toggleVideo}
                className={styles.play_button}
              >
                {video.isPlaying ? <MdPause /> : <MdPlayArrow />}
              </button>

              <button type='button' onClick={actions.fastForward}>
                <MdUpdate />
              </button>

              <div className={styles.time_controls}>
                <p className={styles.controls_time}>
                  {Math.floor(video.currentTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.currentTime % 60)).slice(-2)}
                </p>
                <p> / </p>
                <p className={styles.controls_time}>
                  {Math.floor(video.videoTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.videoTime % 60)).slice(-2)}
                </p>
              </div>
            </div>

            <div>
              <button type='button' onClick={actions.fullScreen}>
                <MdFullscreen />
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default VideoPlayer

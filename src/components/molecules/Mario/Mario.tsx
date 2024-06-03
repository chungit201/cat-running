import { useEffect, useRef, useCallback } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { marioJumping, marioHeight, marioLeft, marioTop, marioWidth } from '@/config/redux/marioSlice'
import { setReady, setDie, setScore } from '@/config/redux/engineSlice'
import Image from 'next/image'

const Mario = () => {
  const marioRef: any = useRef(null)
  const dispatch = useDispatch()
  const die = useSelector((state: any) => state.engine.die)
  const loadingScreen = useSelector((state: any) => state.engine.loadingScreen)

  const isPlay = useSelector((state: any) => state.engine.play)
  // Mario positions & jump
  const mario_jump = useSelector((state: any) => state.mario.jumping)
  const mario_height = useSelector((state: any) => state.mario.height)
  const mario_left = useSelector((state: any) => state.mario.left)
  const mario_top = useSelector((state: any) => state.mario.top)
  const mario_width = useSelector((state: any) => state.mario.width)
  // Obstacle1 positions
  const obs1_height = useSelector((state: any) => state.obstacle.obs1Height)
  const obs1_left = useSelector((state: any) => state.obstacle.obs1Left)
  const obs1_top = useSelector((state: any) => state.obstacle.obs1Top)
  const obs1_width = useSelector((state: any) => state.obstacle.obs1Width)
  // Obstacle2 positions
  const obs2_height = useSelector((state: any) => state.obstacle.obs2Height)
  const obs2_left = useSelector((state: any) => state.obstacle.obs2Left)
  const obs2_top = useSelector((state: any) => state.obstacle.obs2Top)
  const obs2_width = useSelector((state: any) => state.obstacle.obs2Width)
  const audioJumpRef: any = useRef(null)
  const audioDieRef: any = useRef(null)
  const audioBgRef: any = useRef(null)

  // Jump audio

  // Die

  // Handling key press event.
  const handleKey = useCallback(
    (e: any) => {
      console.log('e.code', e.code)
      console.log('isPlay', isPlay)
      console.log('die', die)
      console.log('loadingScreen', loadingScreen)
      if (e.code === 'Enter' && !isPlay && !die && !loadingScreen) {
        console.log('eeeeeeeeeeeeee')
        dispatch(setReady(true))
      }
      if (mario_jump === false && e.code === 'Space' && isPlay && !die && !loadingScreen) {
        console.log('222222222222222')
        dispatch(marioJumping(true))
        audioJumpRef.current.play()
        setTimeout(() => {
          dispatch(marioJumping(false))
          audioJumpRef.current.pause()
          audioJumpRef.current.currentTime = 0
        }, 400)
      }
    },
    [mario_jump, audioJumpRef, dispatch, isPlay, die, loadingScreen],
  )

  useEffect(() => {
    if (
      mario_left < obs1_left + obs1_width &&
      mario_left + mario_width > obs1_left &&
      mario_top < obs1_top + obs1_height &&
      mario_top + mario_height > obs1_top
    ) {
      dispatch(setDie(true))
      audioDieRef?.current?.play()
      dispatch(setReady(false))
      setTimeout(() => {
        dispatch(setDie(false))
      }, 2000)
      setTimeout(() => {
        dispatch(setScore(0))
      }, 100)
    }

    if (
      mario_left < obs2_left + obs2_width &&
      mario_left + mario_width > obs2_left &&
      mario_top < obs2_top + obs2_height &&
      mario_top + mario_height > obs2_top
    ) {
      dispatch(setDie(true))
      audioDieRef?.current?.play()
      dispatch(setReady(false))
      setTimeout(() => {
        dispatch(setDie(false))
      }, 2000)
      setTimeout(() => {
        dispatch(setScore(0))
      }, 100)
    }
  }, [
    mario_left,
    obs1_left,
    obs1_width,
    mario_width,
    mario_top,
    obs1_top,
    obs1_height,
    mario_height,
    dispatch,
    audioDieRef,
    obs2_left,
    obs2_width,
    obs2_top,
    obs2_height,
  ])

  // Monitor key press.
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      handleKey(e)
    })
    dispatch(marioHeight(marioRef.current.getBoundingClientRect().height))
    dispatch(marioLeft(marioRef.current.getBoundingClientRect().left))
    dispatch(marioTop(marioRef.current.getBoundingClientRect().top))
    dispatch(marioWidth(marioRef.current.getBoundingClientRect().width))

    if (isPlay) {
      audioBgRef?.current?.play()
    } else {
      audioBgRef?.current?.pause()
      // audioBgRef?.current?.currentTime = 0
    }
  }, [handleKey, dispatch, audioBgRef, isPlay])

  return (
    <div className="mario-container">
      <audio ref={audioJumpRef} src="/audio/mario-jump.mp3" />
      <audio ref={audioBgRef} src="/audio/running-about.mp3" />
      <audio ref={audioDieRef} src="/audio/mario-died.mp3" />
      {!die && (
        <Image
          src={require('@/assets/img/gif/mario-run.gif')}
          alt=""
          className={`mario ${mario_jump ? 'jump' : ''}`}
          ref={marioRef}
        />
      )}
      {die && (
        <Image
          src={require('@/assets/img/gif/mario-run.gif')}
          alt=""
          className={`mario ${die ? 'die' : ''}`}
          ref={marioRef}
        />
      )}
    </div>
  )
}
export default Mario

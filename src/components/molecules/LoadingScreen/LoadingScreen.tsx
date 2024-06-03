import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { setLoadingScreen } from '@/config/redux/engineSlice'

const LoadingScreen = () => {
  const [isReady, setIsReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 3000)
  }, [])

  return (
    <div className="loading-screen-container">
      <Image src={require('@/assets/img/mario.png')} alt="" className="loading-mario" />
      {!isReady && <h1 className="loading-title">Loading...</h1>}
      {isReady && (
        <button className="enter-button" onClick={() => dispatch(setLoadingScreen(false))}>
          ENTER
        </button>
      )}
    </div>
  )
}
export default LoadingScreen

import { Birds, Bricks, Clouds, Footer, KeyMessage, Mario, MobileControls, Obstacles, Score, Sun } from '@/components'
import { useSelector } from 'react-redux'

export default function Home() {
  const isPlay = useSelector((state: any) => state.engine.play)
  return (
    <>
      <div className="App">
        {!isPlay && <KeyMessage />}
        <Bricks />
        <Mario />
        <Sun />
        <Clouds />
        <Birds />
        <Obstacles />
        <Score />
      </div>
      <MobileControls />
      <Footer />
    </>
  )
}

import Image from 'next/image'

const Title = () => {
  return (
    <div className="title-container">
      <Image src={require('@/assets/img/mario.png')} alt="" className="mario-logo" />
      <h1 className="title">Mario Jump</h1>
    </div>
  )
}
export default Title

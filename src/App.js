import { useEffect, useState } from 'react';
import { DownloadSimple, Share} from "@phosphor-icons/react"
import ShareCard from './ShareCard';
import './App.css';
const image = "https://postcat3.s3.us-east-1.amazonaws.com/71cb383e-0d50-4d58-b588-b6f06612c3ac_0_wm.png"
// const image = '/img.jpeg'

function App() {
  const [canShare, setCanShare] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [shareToggle, setShareToggle] = useState(false)

  const shareCard = document.querySelector('#shareCard')

  useEffect(() => {
    if(shareToggle) shareCard.classList.toggle('hidden')
  }, [shareToggle])  

  useEffect(() => {
    if(navigator.share) {
      setCanShare(true)
    }
  }, [])

  function download(mediaUrl){
    fetch(mediaUrl, { crossOrigin: "Anonymous"})
    .then(r => r.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const _link = document.createElement("a")
      _link.href = url
      _link.setAttribute('download', 'image.png')

      document.body.appendChild(_link)
      _link.click()
      _link.parentNode.removeChild(_link)
    })
  }

  async function share(mediaUrl){
    const file = await fetch(mediaUrl, {crossOrigin: "Anonymous"}).then(r => r.blob())

    try{
      await navigator.share({
        files: [ 
          new File([file], 'img.png', {
            type: file.type
          })
        ]
      })
    } catch (err) {
      console.log(err) 
    }
  } 

  async function handleClick(e){
    const mediaUrl = e.currentTarget.dataset.img;

    setImageUrl(mediaUrl)
    canShare ? setShareToggle(!shareToggle) : await download(imageUrl)
  }

  return (
    <div className='relative'>
      <div className="bg-gray-800 h-screen w-full flex items-center justify-center">
          <div 
            data-img={image}
            onClick={(e) => handleClick(e)} 
            className="group relative w-64 h-96 rounded-xl overflow-hidden cursor-pointer shadow-xl"
            >
            <img src={image} alt="card image" className='object-cover w-full h-full'/>
            <div className='absolute top-0 right-0 h-full w-full bg-black opacity-0 group-hover:opacity-40 duration-500 flex items-center justify-center'>
              <div className='text-white text-2xl'>
                {canShare ? (<Share size={32} />) : (<DownloadSimple size={32} />)}
              </div> 
            </div>
          </div>
      </div>
      <div id="shareCard" className='relative inset-0 w-full h-full flex justify-center hidden'>
        {/* <div className='absolute inset-0 bottom-0 left-0 h-full w-full transition-all ease-out duration-500 bg-black/20'></div> */}
        <ShareCard handleShare={() => share(imageUrl)} handleDownload={() => download(imageUrl)} />
      </div> 
    </div> 
  );
}

export default App;

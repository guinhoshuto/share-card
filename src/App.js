import { useEffect, useState } from 'react';
import { DownloadSimple, Share} from "@phosphor-icons/react"
import ShareCard from './ShareCard';
import './App.css';
const image = "https://images.pexels.com/photos/15272405/pexels-photo-15272405/free-photo-of-fotografia-aerea-aerofotografia-tiro-com-drone-natureza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
// const image = '/img.jpeg'

function App() {
  const [canShare, setCanShare] = useState(false)
  const [shareToggle, setShareToggle] = useState(false)

  const shareCard = document.querySelector('#shareCard')
  // async function imageBlob(url){
  //   const blob = await fetch(url).then(r => r.blob())
  //   return new File([blob], 'img.png', {
  //     type: blob.type
  //   })
  // }
  useEffect(() => {
    if(shareToggle) shareCard.classList.toggle('hidden')
  }, [shareToggle])  

  useEffect(() => {
    setCanShare(navigator.share)
  }, [])

  async function share(mediaUrl){
      const file = await fetch(mediaUrl).then(r => r.blob())

      await navigator.share({
        files: [ 
          new File([file], 'img.jpeg', {
            type: file.type
          })
        ]
      })
  } 

  async function handleClick(e){
    const mediaUrl = e.currentTarget.dataset.img;
    console.log("clicked", mediaUrl);
    setShareToggle(!shareToggle)

    if(canShare) {
      await share(mediaUrl)
    }
  }

  return (
    <div className='relative'>
      <div className="bg-gray-800 h-screen w-full flex items-center justify-center">
        <a href={!canShare ? image : 'javascript:void(0)'} download="image" >
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
        </a>
      </div>
      <div id="shareCard" className='absolute bottom-0 w-full flex justify-center hidden'>
        <ShareCard />
      </div> 
    </div> 
  );
}

export default App;

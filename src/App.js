import { useEffect, useState } from 'react';
import { DownloadSimple, Share} from "@phosphor-icons/react"
import ShareCard from './ShareCard';
import './App.css';
const image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
// const options = {crossOrigin: "anonymous", mode: "no-cors"}
const options = {
  method: "GET",
  // headers: myHeaders,
  cache: "default",
}
// const image = '/img.jpeg'

function App() {
  const [canShare, setCanShare] = useState(false)
  const [imageUrl, setImageUrl] = useState(image)
  const [shareToggle, setShareToggle] = useState(false)

  useEffect(() => {
    if(navigator.share) {
      setCanShare(true)
    }
  }, [])

  async function getImageBlob(mediaUrl){
    return await fetch(mediaUrl + '?not-from-cache-please', options).then(r => r.blob())
  }

  // function getImage(imageUrl){
  //   const img = new Image();
  //   img.crossOrigin = "anonymous";
  //   img.src = imageUrl;
  //   return img
  // }

  async function download(mediaUrl){
    const blob = await getImageBlob(mediaUrl)
    
    const url = window.URL.createObjectURL(new Blob([blob]))
    const _link = document.createElement("a")
    _link.href = url
    _link.setAttribute('download', 'image.jpeg')

    document.body.appendChild(_link)
    _link.click()
    _link.parentNode.removeChild(_link)
  }

  async function share(mediaUrl){
    const file = await getImageBlob(mediaUrl)

    try{
      await navigator.share({
        files: [
          new File([file], `img.jpeg`, {
            type: file.type
          })
        ]
      })
    } catch (err) {
      console.log(err) 
    }
  } 

  async function handleClick(e){
    // const mediaUrl = e.currentTarget.dataset.img;

    // setImageUrl(mediaUrl)
    canShare ? setShareToggle(true) : await download(imageUrl)
  }

  return (
    <div className='relative bg-gray-800 h-screen w-full flex flex-col items-center justify-center gap-8'>
        <input
          type="url" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='Enter image url' 
          className='w-64 p-2 rounded-lg text-gray-300'/>
        <div 
          data-img={image}
          onClick={(e) => handleClick(e)} 
          className="group relative w-64 h-96 rounded-xl overflow-hidden cursor-pointer shadow-xl"
          >
          <img 
            src={imageUrl} 
            alt="selected" 
            className='object-cover w-full h-full'
          />
          <div className='absolute top-0 right-0 h-full w-full bg-black opacity-0 group-hover:opacity-40 duration-500 flex items-center justify-center'>
            <div className='text-white text-2xl'>
              {canShare ? (<Share size={32} />) : (<DownloadSimple size={32} />)}
            </div> 
          </div>
        </div>
      <div 
        id="shareCard"
        className={`fixed inset-0 w-full h-full flex justify-center ${shareToggle ? '' : 'hidden'}`}>
        <div 
          onClick={() => setShareToggle(false)} 
          className='absolute inset-0 top-0 left-0 h-full w-full transition-all ease-out duration-500 bg-black/30'></div>
        <ShareCard 
          handleShare={() => share(imageUrl)} 
          handleDownload={() => download(imageUrl)} />
      </div> 
    </div> 
  );
}

export default App;

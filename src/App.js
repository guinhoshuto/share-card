import { useEffect, useState } from 'react';
import './App.css';
const image = "https://images.pexels.com/photos/15272405/pexels-photo-15272405/free-photo-of-fotografia-aerea-aerofotografia-tiro-com-drone-natureza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

function App() {
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    console.log(navigator.canShare())
    if(navigator.canShare()){
      setCanShare(true)
    }
  }, [])

  function handleClick(e){
    console.log("clicked", e);
  }

  return (
    <div className="bg-gray-800 h-screen w-full flex items-center justify-center">
      <div 
        onClick={(e) => handleClick(e)} 
        className="group relative w-64 h-96 rounded-xl overflow-hidden cursor-pointer shadow-xl">
        <img src={image} alt="image" className='object-cover w-full h-full'/>
        <div className='absolute top-0 right-0 h-full w-full bg-black opacity-0 group-hover:opacity-40 duration-500 flex items-center justify-center'>
          <div className='text-white text-2xl'>{canShare ? "Share" : "Not supported"}</div> 
        </div>
      </div>
    </div>
  );
}

export default App;

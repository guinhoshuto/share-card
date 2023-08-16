import {DownloadSimple, Share} from '@phosphor-icons/react'

export default function ShareCard(){
    return(
        <div className="bg-white w-96 h-48 flex flex-col items-center justify-center rounded-t-xl">
            <button className='flex items-center gap-2'>Download <DownloadSimple /></button>
            <button className='flex items-center gap-2'>Share <Share /></button>
        </div>
    )    
} 
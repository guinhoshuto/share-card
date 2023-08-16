import {DownloadSimple, InstagramLogo} from '@phosphor-icons/react'

export default function ShareCard({handleShare, handleDownload}){
    return(
        <div className="bg-white shadow-md w-96 h-48 flex flex-col gap-2 items-center justify-center rounded-t-xl">
            <button onClick={() => handleShare()} className='flex items-center gap-2 bg-purple-600 text-white justify-center py-2 px-8 rounded-full'>Post <InstagramLogo /></button>
            <button onClick={() => handleDownload()} className='flex items-center gap-2 text-xs'>Download <DownloadSimple /></button>
        </div>
    )    
} 
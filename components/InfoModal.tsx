import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import PlayButton from './PlayButton'
import useInfoModal from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'


interface InfoModalProps {
    visible?: boolean,
    onClose:any
}

const InfoModal:React.FC<InfoModalProps> = ({visible,onClose}) => {
  const [isVisible,setIsVisible] = useState(!!visible)
  const {movieId} =useInfoModal()
  const {data={}}=useMovie(movieId as string) 
  return (
    <div>
        {/* <PlayButton /> */}

    </div>
  )
}

export default InfoModal
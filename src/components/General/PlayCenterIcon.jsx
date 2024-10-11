import { useState } from 'react'
import { FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const PlayCenterIcon = () => {
    const [toggle, setToggle ] = useState(false);
  return (
    
    <div className='fixed z-50 bottom-[90px] right-4' onClick={() => setToggle(!toggle)}>
        <div className={`${toggle ? "w-[150px] h-[60px] group" : "w-[53px] h-[53px]"} transition-all  flex items-center gap-2  rounded-full p-4 bg-primary`}>
            <FaGamepad color='white' size={25}/>
            
            <h3 className={`${toggle ? "block" : "hidden"} text-white transition-all delay-300`}><Link to="/play-center" className='hover:text-yellow-300'>Play Center</Link></h3>
            
            
        </div>
    </div>
  )
}

export default PlayCenterIcon
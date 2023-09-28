import React, { useEffect, useState } from 'react'

const useOrigin = () => {

    const [ mounted,setMOunted] = useState(false)

    const origin =  typeof window !== 'undefined' && window.location.origin?window.location.origin:""

    useEffect(() => {
        setMOunted(true)
    }, [])

    if(!mounted){
        return ''
    }
  return origin
}

export default useOrigin
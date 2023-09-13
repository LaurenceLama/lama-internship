import React, { useState } from 'react'

const Countdown = ({ expiryDate }) => {
 const [time, setTime] = useState('')
 const [idInterval, setIdInterval] = useState()

  React.useEffect(() => {
    calcTime() 
    
    const idInterval = setInterval(() => {
      calcTime()
    }, 1000)
    
    setIdInterval(idInterval)

    return () => {
      clearInterval(idInterval);
    }
  }, [])

  function calcTime() {
    const millisleft = expiryDate - Date.now();
    
    if (millisleft < 0) {
      clearInterval(idInterval)
      setTime('Expired')
      return;
    }

    const secondsLeft = millisleft / 1000
    const minutesLeft = secondsLeft / 60
    const hoursLeft = minutesLeft / 60

    setTime(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(secondsLeft % 60)}s`
    )
  }


  return (
    <div className='de_countdown'>{time}</div>
  )
}

export default Countdown
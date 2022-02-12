import React from 'react';

const Background = () => {
  const amountBubbles = 25;

  const bubbles: JSX.Element[] = []
  for (let i = 0; i < amountBubbles; i++) {
    bubbles.push(<div className="bubble" style={{backgroundColor: "#3182ce85"}}></div>)
  }
  return (
  <div className='background'>
    <div className="bubbles">
        {bubbles}
    </div>
  </div>
  )
};

export default Background;

import React from 'react';
import glow from './glow.gif';

export default () => {
  return (
    <div>
      <img src={glow} alt="Loading..." style={{width:'200px', margin:'auto', display:'block'}}/>
    </div>
  )
}

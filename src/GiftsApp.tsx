import React from 'react';
import Homepage from './components/layout/Homepage';
import {FlagsmithProvider} from 'flagsmith/react'
import flagsmith from 'flagsmith'

const GiftsApp = () => {
  return <div>
    <FlagsmithProvider 
        options={{
            environmentID: "fNhFSkuPyvtndEw35sLcWs",
        }} 
        flagsmith={flagsmith}
    >
        <Homepage />
    </FlagsmithProvider>
  </div>;
};

export default GiftsApp;

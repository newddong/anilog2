import React, {createContext } from 'react';

export default SearchContext = createContext({
   isInput:false,
   setInput:()=>{console.log('default')},
   releaseInput:()=>{console.log('default')},
});

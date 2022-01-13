import {createContext } from 'react';

export default ProfileContext = createContext({
   user:'',
   setUser:(user)=>{}
});

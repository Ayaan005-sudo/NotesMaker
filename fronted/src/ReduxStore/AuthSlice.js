import { createSlice } from '@reduxjs/toolkit'


const initialState={
    status:false,
    userData:null,
    accessToken:null,
    checkingauth:true,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   login:(state,action)=>{
    state.status=true;
    state.userData=action.payload.userData;       
  state.accessToken = action.payload.accessToken;
  
   },
   logout: (state)=>{
    state.status=false;
    state.userData=null;
    state.accessToken=null;
    

   },
   setCheckingAuth: (state, action) => {
  state.checkingauth = action.payload;
}

  },
})


export const {login , logout ,setCheckingAuth} = AuthSlice.actions

export default AuthSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
        const responset = await fetch('https://web.ics.purdue.edu/~severg/profile-app/logout.php');
        const data = await responset.json();
        if (data.message){
            return true
        }else{
            return rejectWithValue(data.error)
        }
    }catch(error){
        return rejectWithValue(error.message)
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: localStorage.getItem('isLogin') === "true"? true : false,
    error: "",
    status: "idle",
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
      localStorage.setItem('isLogin', 'true');
    },
    logout: (state) => {
      state.isLogin = false;
      localStorage.setItem('isLogin', 'false');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },

});
export const { login } = authSlice.actions;
export default authSlice.reducer;
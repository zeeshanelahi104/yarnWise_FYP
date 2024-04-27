// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//       status: 'idle',
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       // Login reducers
//       builder.addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.status = 'succeeded';
//       });
//       builder.addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       });
//       builder.addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
  
//       // Logout reducers
//       builder.addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.accessToken = null;
//         state.refreshToken = null;
//       });
  
//       // Refresh token reducers
//       builder.addCase(refreshToken.fulfilled, (state, action) => {
//         state.accessToken = action.payload.accessToken;
//         state.status = 'succeeded';
//       });
//       builder.addCase(refreshToken.pending, (state) => {
//         state.status = 'loading';
//       });
//       builder.addCase(refreshToken.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//     },
//   });
  
//   export default authSlice.reducer;
  
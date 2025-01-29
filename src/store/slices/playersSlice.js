import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: [],
  reducers: {
    addPlayer: (state, action) => {
      state.push({
        id: Date.now(),
        name: action.payload,
        score: 0,
      });
    },
    removePlayer: (state, action) => {
      return state.filter((player) => player.id !== action.payload);
    },
    updateScore: (state, action) => {
      const player = state.find((player) => player.id === action.payload.id);
      if (player) player.score = action.payload.score;
    },
  },
});

export const { addPlayer, removePlayer, updateScore } = playersSlice.actions;
export default playersSlice.reducer;

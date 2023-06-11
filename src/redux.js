import { configureStore, createSlice } from "@reduxjs/toolkit";

const LS_BACKLOG = 'backlog'
const SLICE_BACKLOG_NAME = 'backlog'

// ----------------- BACKLOG ------------------------ //
// définit par défaut avec la valeur du localStorage
const backlogSlice = createSlice({
  name: SLICE_BACKLOG_NAME,
  initialState: localStorage.getItem(LS_BACKLOG)
    ? JSON.parse(localStorage.getItem(LS_BACKLOG))
    : [],
  reducers: {
    addGame: (state, action) => {
      const newGame = {
        id: action.payload.id,
        name: action.payload.name,
        genres: action.payload.genres?.map((genre) => genre.name).join(", "),
        platforms: action.payload.platforms
          ?.map((platform) => platform.abbreviation)
          .join(", "),
        status: 1
      };

      state.push(newGame);
    },
    modifyGame: (state, action) => {
      const game = state.find(game => game.id === action.payload.game.id)

      game.status = action.payload.value
    },    
    deleteGame: (state, action) => {
      return state.filter((game) => game.id !== action.payload);
    },
  },
});

export const { addGame, deleteGame, modifyGame } = backlogSlice.actions;

// ----------------- SEARCH ------------------------ //
const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    setSearchResults: (state, action) => {
      return action.payload.results
    }
  }
})

export const { setSearchResults } = searchSlice.actions;

export const store = configureStore({
  reducer: {
    backlog: backlogSlice.reducer,
    search: searchSlice.reducer
  },
});


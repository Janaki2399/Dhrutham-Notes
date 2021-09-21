import React, { createContext, Reducer, useContext, useReducer } from "react";
import { notesReducer } from "../reducers/notes/notesReducer";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    labelsList: [],
  });

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};

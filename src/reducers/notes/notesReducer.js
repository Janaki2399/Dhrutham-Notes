export const notesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return {
        ...state,
        notes: action.payload.noteList,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: state.notes.concat(action.payload.note),
      };

    case "CHANGE_PIN_STATE":
      console.log(action.payload);
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload.id
            ? { ...note, isPinned: !note.isPinned }
            : note
        ),
      };

    default:
      return state;
  }
};

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
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload.id
            ? { ...note, isPinned: !note.isPinned }
            : note
        ),
      };
    case "ADD_LABEL":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload.noteId
            ? {
                ...note,
                labelList: note.labelList.concat(action.payload.label),
              }
            : note
        ),
        labelsList: state.labelsList.concat(action.payload.label),
      };
    default:
      return state;
  }
};

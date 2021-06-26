export const notesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return {
        ...state,
        notes: action.payload.noteList,
      };
    case "LOAD_LABELS":
      return {
        ...state,
        labelsList: action.payload.labelsList,
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
    case "CHANGE_COLOR":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload.id
            ? { ...note, color: action.payload.color }
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
    case "ADD_LABEL_FROM_LIST_TO_NOTE":
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
      };

    case "REMOVE_LABEL_FROM_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload.noteId
            ? {
                ...note,
                labelList: note.labelList.filter(
                  (label) => label._id !== action.payload.labelId
                ),
              }
            : note
        ),
      };
    default:
      return state;
  }
};

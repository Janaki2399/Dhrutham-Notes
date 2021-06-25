import { useNotes } from "../contexts/notes-context";
import axios from "axios";
import { useAuth } from "../contexts/auth-context";

export function LabelCheckBox({ item, index, videoId, setCheckBox }) {
  const { dispatch, state } = useNotes();
  const { token } = useAuth();

  const handleToggle = (i) => {
    setCheckBox((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addToListAndServer = async () => {
    try {
      // showToast(`Adding to ${toastItem}`);
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${item.id}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch({
          type: "APPEND_TO_PLAYLIST",
          payload: { playlistId: item.id, videoId: videoId },
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const removeFromListAndServer = async () => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${item.id}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({
          type: "REMOVE_ITEM_FROM_PLAYLIST",
          payload: { playlistId: item.id, videoId: videoId },
        });
        if (state.selectedCategory._id === item.id) {
          dispatch({
            type: "REMOVE_ITEM_FROM_SELECTED_PLAYLIST",
            payload: videoId,
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  const toggleCheckBox = (event) => {
    handleToggle(index);
    if (event.target.checked) {
      addToListAndServer();
    } else {
      removeFromListAndServer();
    }
  };
  return (
    <div className="flex-horizontal margin-top cursor-pointer">
      <input
        type="checkbox"
        id={item.id}
        className="margin-right checkbox-size"
        checked={item.checked}
        onChange={toggleCheckBox}
      />
      <label className="full-width font-size-5" for={item.id}>
        {item.name}
      </label>
    </div>
  );
}

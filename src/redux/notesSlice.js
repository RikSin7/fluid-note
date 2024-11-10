import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;
      const existingNote = state.notes.find(
        (n) => n.title.toLowerCase() === note.title.toLowerCase()
      );

      if (existingNote) {
        toast.error("note already exists!", {
          style: { backgroundColor: "#121212", color: "#fff" },
          icon: "❗",
          duration: 1000,
        });
        return;
      } else {
        state.notes.push(note);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note created.", {
          style: { backgroundColor: "#121212", color: "#fff" },
          icon: "✍️",
          duration: 1000,
        });
      }
    },
    updateToNotes: (state, action) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((n) => n._id === updatedNote._id);

      if (index !== -1) {
        if (updatedNote.title.trim() || updatedNote.description.trim()) {
          state.notes[index] = updatedNote;
          localStorage.setItem("notes", JSON.stringify(state.notes));
          toast.success("Note updated.", {
            style: { backgroundColor: "#121212", color: "#fff" },
            icon: "✍️",
            duration: 1000,
          });
        } else {
          toast.error("Please fill in all fields.", {
            style: { backgroundColor: "#121212", color: "#fff" },
            icon: "❗",
            duration: 1000,
          });
        }
      }
    },
    removeFromNotes: (state, action) => {
      const removeNoteId = action.payload
      const filteredNotes = state.notes.filter(
        (n) => n._id !== removeNoteId._id
      );
      state.notes = filteredNotes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note removed.", {
        style: { backgroundColor: "#121212", color: "#fff" },
        icon: "🚀",
        duration: 1000,
      });
    },
    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem(state.notes);
      toast.success("Notes reset", {
        style: { backgroundColor: "#121212", color: "#fff" },
        icon: "🚀",
        duration: 1000,
      });
    },
  },
});

export const { addToNotes, updateToNotes, removeFromNotes, resetAllNotes } =
  notesSlice.actions;

export default notesSlice.reducer;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../redux/notesSlice";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const noteId = searchParams.get("noteId");
  const allNotes = useSelector((state) => state.note.notes);

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((n) => n._id === noteId);
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [noteId]);

  const createNote = () => {
    const note = {
      title: title,
      description: description,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      }),
    };
    if (title.trim() && description.trim()) {
      noteId ? dispatch(updateToNotes(note)) : dispatch(addToNotes(note));
      setTitle("");
      setDescription("");
      setSearchParams({});
    } else {
      toast.error("Please fill in all fields.", {
        duration: 1000,
        icon: "❗",
        style: {
          backgroundColor: "#121212",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div className="">
      <h1 className="text-[#646464] flex flex-col items-center ~mt-8/12 text-[clamp(1rem,_5vw,_3rem)] font-semibold text-center">
        Welcome, Guest!
      </h1>
      <div className="inp flex sm:flex-row flex-col sm:justify-around items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled note..."
          className="sm:~mt-8/12 ~mt-8/10 outline-none bg-[#202020] p-fluid-sm sm:w-[30vw]  rounded-full text-white w-[85vw] hover:scale-[0.98] transform transition-transform duration-300 "
        />
        <button
          className="sm:~mt-8/12 ~mt-4/10 p-fluid-sm sm:w-[30vw] rounded-full text-white w-[85vw] outline-none bg-[#202020] hover:scale-[0.98] transform transition-transform duration-300"
          onClick={createNote}
        >
          {noteId ? "Update Note" : "Create Note"}
        </button>
      </div>
      <div className="textArea flex justify-center w-full">
        <textarea
          placeholder="Note description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="10"
          cols="10"
          className="outline-none bg-[#202020] p-fluid-sm text-white sm:w-[80vw] w-[85vw] ~h-60/72 sm:~mt-8/12 ~mt-8/10 rounded-lg hover:scale-[0.99] transform transition-transform duration-300 "
        ></textarea>
      </div>
    </div>
  );
}

export default Home;

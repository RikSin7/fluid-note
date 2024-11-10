import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromNotes,
  resetAllNotes,
  updateToNotes,
} from "../redux/notesSlice";
import { NavLink } from "react-router-dom";

function Notes() {
  const [value, setValue] = useState("");
  const allNotes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();

  const filteredNotes = allNotes.filter((n) =>
    n.title.toLowerCase().includes(value.toLowerCase())
  );
  const handleEdit = (note) => {
    dispatch(updateToNotes(note));
  };
  const handleDelete = (note) => {
    dispatch(removeFromNotes(note));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all notes?")) {
      dispatch(resetAllNotes());
    }
  };
  return (
    <div className="text-white flex flex-col items-center w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search note..."
        className="sm:~mt-8/12 ~mt-8/10 outline-none bg-[#202020] p-fluid-sm sm:w-96 rounded-full text-white w-[60vw] hover:scale-[0.98] transform transition-transform duration-300 min-w-32
          "
      />
      <div className="heading bg-[#202020] w-full ~h-12/16  flex items-center ~mt-8/12 mb-8">
        <h1 className="~mx-2/4 text-[clamp(1.5rem,_3vw,_3rem)] text-nowrap font-semibold  text-[#a8a8a8]">
          All Notes
        </h1>
      </div>
      {filteredNotes.length > 0
        ? filteredNotes.map((note, index) => (
            <ul className="bg-[#212121] w-full ~min-h-20/32 mt-1" key={index}>
              <div className="flex w-full flex-wrap">
                <li className="text-[clamp(2rem,_4vw,_3rem)] ~mx-2/4 font-semibold text-[#dedede] ">
                  {note.title}
                </li>
                <div className="controls flex justify-end w-full font-semibold my-2">
                  <span
                    className={`~w-62/80 text-white xs:w-[57vw] hover:scale-[0.98] transform transition-transform duration-300 min-w-32 xs:gap-2 ~gap-2/4 rounded-full mr-4 bg-[#444444] ~h-10/12  flex xs:overflow-x-auto px-fluid-lg justify-center`}
                  >
                    <button
                      className="edit xs:ml-4"
                      onClick={() => handleEdit(note._id)}
                    >
                      <NavLink to={`/?noteId=${note._id}`}>Edit</NavLink>
                    </button>
                    <button className="view">View</button>
                    <button className="copy">Copy</button>
                    <button className="share">Share</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(note)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
              <div className="text-[clamp(1rem,_3vw,_1.6rem)] ~mx-2/4 mb-2 text-[#a8a8a8] flex flex-wrap">
                {note.description}
              </div>
            </ul>
          ))
        : "No match found."}
      {filteredNotes.length > 1 && (
        <button
          className="reset sm:~mt-8/12 ~mt-8/10 outline-none bg-[#202020] p-fluid-sm sm:w-96 rounded-full text-white w-[60vw] hover:scale-[0.98] transform transition-transform duration-300 min-w-32"
          onClick={handleReset}
        >
          Reset notes
        </button>
      )}
    </div>
  );
}

export default Notes;

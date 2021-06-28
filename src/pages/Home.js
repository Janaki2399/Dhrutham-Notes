import { LabelList } from "../components/LabelList";
import { NotesInput } from "../components/NotesInput";
import { Notes } from "../components/Notes";
import { HashRouter } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
export const Home = () => {
  return (
    <main className="flex">
      <LabelList />
      <div className="w-full md:ml-60 m-3">
        <NotesInput />
        <Notes />
      </div>
    </main>
  );
};

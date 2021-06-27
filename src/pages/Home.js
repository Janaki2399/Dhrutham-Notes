import { LabelList } from "../components/LabelList";
import { NotesInput } from "../components/NotesInput";
import { Notes } from "../components/Notes";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
export const Home = () => {
  return (
    <main className="flex">
      <LabelList />
      <div className="ml-60">
        <NotesInput />
        <Notes />
      </div>
    </main>
  );
};

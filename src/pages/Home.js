import { LabelList } from "../components/LabelList";
import { NotesInput } from "../components/NotesInput";
import { Notes } from "../components/Notes";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
export const Home = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  return (
    <main className="flex">
      <LabelList setSelectedLabel={setSelectedLabel} />
      <div>
        <NotesInput selectedLabel={selectedLabel} />
        <Notes selectedLabel={selectedLabel} />
      </div>
    </main>
  );
};

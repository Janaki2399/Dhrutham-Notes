import { LabelList } from "../components/LabelList";
import { NotesInput } from "../components/NotesInput";
import { Notes } from "../components/Notes";
import { NavBar } from "../components/NavBar";
export const Home = () => {
  return (
    <main className="flex">
      <LabelList />
      <div>
        <NotesInput />
        <Notes />
      </div>
    </main>
  );
};

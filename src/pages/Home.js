import { LabelList } from "../components/LabelList";
import { NotesInput } from "../components/NotesInput";
import { Notes } from "../components/Notes";

export const Home = ({ isLabelListOpen }) => {
  return (
    <main className="flex">
      <LabelList isLabelListOpen={isLabelListOpen} />
      <div className="w-full md:ml-60 m-3 mt-20">
        <NotesInput />
        <Notes />
      </div>
    </main>
  );
};

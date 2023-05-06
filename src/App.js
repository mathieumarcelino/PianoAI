// ----- IMPORT -----
import './App.css';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import Piano from './Components/Piano/Piano';
import Note from './Components/Note/Note';
// ------------------

function App() {
  return (
    <div>
      <Header />
      <Content text={"C D G2 F3 E A B F2 D G A B2 C A B M4 C D G2 F3 E A B F2 D G A B2 C A B M4 C D G2 F3 E A B F2 D G A B2 C A B M4"} />
      <Piano />
      <Note />
    </div>
  );
}

export default App;

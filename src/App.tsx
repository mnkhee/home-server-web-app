import Navbar from "./layout/Navbar";
import { Hero } from "./sections/Hero"
import { Catalogue } from "./sections/Catalogue"

function App() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar/>
      <main>
        <Hero/>
        <Catalogue/>
      </main>
    </div>
  );
}

export default App;


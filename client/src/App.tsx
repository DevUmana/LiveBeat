import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Outlet /> {/* This renders the children components */}
      </main>
    </div>
  );
}

export default App;



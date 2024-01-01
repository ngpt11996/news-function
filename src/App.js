import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <LoadingBar
        color='red'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home category="General" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/home" element={<Home category="General" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/general" element={<Home category="General" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/business" element={<Home category="Business" pageSize="20"setProgress={setProgress}/>} />
        <Route exact path="/entertainment" element={<Home category="Entertainment" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/health" element={<Home category="Health" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/sports" element={<Home category="Sports" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/science" element={<Home category="Science" pageSize="20" setProgress={setProgress}/>} />
        <Route exact path="/technology" element={<Home category="Technology" pageSize="20" setProgress={setProgress}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

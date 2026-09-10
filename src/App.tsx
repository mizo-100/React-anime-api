import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { DetailPage } from './features/anime/routes/DetailPage';
import { GenrePage } from './features/anime/routes/GenrePage';
import { IndexPage } from './features/anime/routes/IndexPage';
import { SignupPage } from './features/auth/SignupPage';
import { MyPage } from './features/user/MyPage';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<SignupPage/>} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/genre" element={<GenrePage />} />
      </Routes>
    </Router>
  );
}

export default App

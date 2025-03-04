import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResumeList from './pages/ResumeList';
import ResumeEditor from './pages/ResumeEditor';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/resumes"
                element={
                  <PrivateRoute>
                    <ResumeList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resumes/new"
                element={
                  <PrivateRoute>
                    <ResumeEditor />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resumes/:id"
                element={
                  <PrivateRoute>
                    <ResumeEditor />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

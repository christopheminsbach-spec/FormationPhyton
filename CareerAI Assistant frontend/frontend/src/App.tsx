import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import InterviewAI from "./pages/InterviewAI";
import Matching from "./pages/ Matching";
import Documents from "./pages/ Documents";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profil" element={<Profile />} />

          <Route path="/applications" element={<Applications />} />

          <Route path="/interview" element={<InterviewAI />} />

          <Route path="/matching" element={<Matching />} />

          <Route path="/documents" element={<Documents />} />

          <Route path="/settings" element={<Settings />} />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}

export default App;
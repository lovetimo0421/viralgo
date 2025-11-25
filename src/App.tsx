import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sources } from "./components/Sources";
import { Home } from "./components/Home";
import { GameDashboard } from "./components/GameDashboard";
import { Insights } from "./components/Insights";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/games" element={<GameDashboard />} />
        <Route path="/dashboard" element={<GameDashboard />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

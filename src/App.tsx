import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BlockchainTraceability from './pages/BlockchainTraceability';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import OCRSystem from './pages/OCRSystem';
import RiskAssessment from './pages/RiskAssessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/ocr" element={<OCRSystem />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/blockchain" element={<BlockchainTraceability />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 
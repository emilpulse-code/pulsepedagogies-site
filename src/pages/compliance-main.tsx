import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import CompliancePage from './CompliancePage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CompliancePage />
  </StrictMode>,
);

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import PortfolioPage from './PortfolioPage.tsx';
import '../index.css';
import './portfolio.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioPage />
  </StrictMode>,
);

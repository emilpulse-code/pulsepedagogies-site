import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import SignetPage from './SignetPage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignetPage />
  </StrictMode>,
);

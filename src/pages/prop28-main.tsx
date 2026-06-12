import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Prop28Page from './Prop28Page.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Prop28Page />
  </StrictMode>,
);

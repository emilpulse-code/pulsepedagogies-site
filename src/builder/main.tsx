import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ProjectBuilder from './ProjectBuilder.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectBuilder />
  </StrictMode>,
);

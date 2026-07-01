import { createRoot } from 'react-dom/client';
import Caltalyze from './app.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Caltalyze />);
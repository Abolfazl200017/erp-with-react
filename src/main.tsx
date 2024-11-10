import { createRoot } from 'react-dom/client';
import RootComponent from './RootComponent';

console.log(process.env.NODE_ENV + 'mode')

createRoot(document.getElementById('root')!).render(<RootComponent />);

import ReactDOM from 'react-dom/client';
import startMockServer from '@/mockApiServer';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

startMockServer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

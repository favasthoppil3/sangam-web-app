import './App.css';
import Routes from './routes';
import AppProvider from './providers/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;

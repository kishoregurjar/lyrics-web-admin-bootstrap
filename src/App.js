import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { Zoom, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer
        stacked
        closeOnClick
        position="top-center"
        autoClose="2000"
        theme="colored"
        transition={Zoom}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

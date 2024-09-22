import { ToastContainer } from 'react-toastify'
import LatestRates from './components/LatestRates/LatestRates'
import 'react-toastify/dist/ReactToastify.css';
import HistoricalRates from './components/HistoricalRates/HistoricalRates';
import ConvertRates from './components/ConvertRates/ConvertRates';

function App() {

  return (
    <>
      <ToastContainer 
        position="top-center" 
        autoClose={1500} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
      />
      <LatestRates />
      <ConvertRates />
      <HistoricalRates />
    </>
  )
}

export default App

import {Routes, Route} from "react-router-dom"
import Countries from "./components/Countries"
import CountryDetail from "./components/CountryDetail"


function App() {
 
  return (
    <>
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 transition-colors">
 
    <Routes>
    <Route path="/" element={<Countries />} />
    <Route path="/country/:code" element={<CountryDetail />} />  
    </Routes>
    </div>
    </>
  )
}

export default App

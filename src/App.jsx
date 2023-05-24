import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Videogames from "./pages/Videogames"
import Consoles from "./pages/Consoles"
import ContextProvider from "./components/utils/ContextGlobal"
import Playstation from "./pages/Playstation"
import Xbox from "./pages/Xbox"
import Orders from "./pages/Orders"
import { Toaster } from 'react-hot-toast';
import Purchase from "./pages/Purchase"
import Detail from "./pages/Detail"

function App() {

  return (
    <>
      <ContextProvider>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videogames" element={<Videogames />} />
          <Route path="/videogames/playstation" element={<Playstation />} />
          <Route path="/videogames/xbox" element={<Xbox />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/consoles" element={<Consoles />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
        <Footer />
      </ContextProvider>
    </>
  )
}

export default App

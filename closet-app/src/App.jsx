import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./components/Home"
import ClothingForm from "./components/ClothingForm"
import ClothingDetails from "./components/ClothingDetails"

function App() {
  return (
    <BrowserRouter>

      <div className="page-container">

        <header className="header">

          <div className="logo">
            <img className="hanger-icon" src="/icons/clothes-hanger.png" alt="Galge" />
            <strong>Klädgarderob</strong>
          </div>

          <nav>
            <Link to="/" className="active">Hem</Link>
            <Link to="/">Alla plagg</Link>
            <Link to="#">Outfits</Link>
            <Link to="#">Kategorier</Link>
          </nav>

          <Link to="/clothes/new" className="add-button">
            + Lägg till plagg
          </Link>

        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothes/new" element={<ClothingForm />} />
          <Route path="/clothes/:id" element={<ClothingDetails />} />
        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App
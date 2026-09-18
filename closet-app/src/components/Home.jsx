import { useEffect, useState } from "react"
import ClothingCard from "./ClothingCard"

function Home() {
  const [clothes, setClothes] = useState([])

  useEffect(() => {
    fetch("/api/clothes")
      .then((response) => response.json())
      .then(data => {
        const shuffledClothes = [...data].sort(() => Math.random() - 0.5)
        setClothes(shuffledClothes)
      })
      .catch((error) => console.error("Kunde inte hämta kläder:", error))
  }, [])

  return (
    <main>

      <h1>Välkommen till din klädgarderob
        <img className="stars-icon" src="/icons/stars.png" alt="Stjärnor" />
      </h1>

      <p className="intro">
        Här kan du hålla koll på alla dina plagg, skapa outfits och< br/>
        organisera din garderob.
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Sök bland dina plagg..."
        />

        <button>Sök</button>
      </div>

      <h2>Dina plagg</h2>

      <div className="clothing-grid">
        {clothes.map((clothing) => (
          <ClothingCard
            key={clothing.id}
            clothing={clothing}
          />
        ))}
      </div>

    </main>
  )
}

export default Home
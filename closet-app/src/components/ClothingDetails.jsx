import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Pencil, Trash } from "lucide-react"

function ClothingDetails() {
  const { id } = useParams()
  const [clothing, setClothing] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/clothes/${id}`)
      .then(response => response.json())
      .then(data => setClothing(data))
      .catch(error => console.error(error))
  }, [id])

  const handleDelete = () => {
  fetch(`http://localhost:3000/api/clothes/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        window.location.href = "/"
      }
    })
}

  if (!clothing) {
    return <p>Laddar...</p>
  }

  return (
    <main className="clothing-details">

      <Link to="/" className="back-link">
        ← Tillbaka till garderoben
      </Link>

      <div className="details-top">

        <div className="details-image">
          <img
            src={clothing.image}
            alt={clothing.name}
          />
        </div>

        <div className="details-info">

          <span className="category-bubble">
            {clothing.category}
          </span>

          <h1>{clothing.name}</h1>

          <p className="details-brand">
            {clothing.color} · {clothing.brand}
          </p>

          <p className="details-description">
            {clothing.description}
          </p>

        <div className="details-buttons">
            <button><Pencil size={14} /> Redigera</button>

            <button onClick={handleDelete}><Trash size={14} /> Radera</button>
        </div>

        </div>

      </div>

      <div className="details-box">
        <h2>Detaljer</h2>

        <p>
          <span>Kategori</span>
          {clothing.category}
        </p>

        <p>
          <span>Färg</span>
          {clothing.color}
        </p>

        <p>
          <span>Storlek</span>
          {clothing.size}
        </p>

        <p>
          <span>Märke</span>
          {clothing.brand}
        </p>

        <p>
          <span>Material</span>
          {clothing.material}
        </p>

      </div>

    </main>
  )
}

export default ClothingDetails
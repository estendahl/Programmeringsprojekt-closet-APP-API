import { Link } from "react-router-dom"
import { useState } from "react"

function ClothingCard({ clothing }) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = () => {
    fetch(`/api/clothes/${clothing.id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          setDeleted(true)
        }
      })
  }

  if (deleted) {
    return null
  }

  return (
    <div className="clothing-card">

      <div className="clothing-image">
        <Link to={`/clothes/${clothing.id}`}>
          <img
            src={clothing.image}
            alt={clothing.name}
          />
        </Link>

        <span className="category-bubble">
          {clothing.category}
        </span>
      </div>

      <div className="clothing-info">
        <h2>{clothing.name}</h2>
        <p>{clothing.color} · {clothing.brand}</p>
      </div>

    </div>
  )
}

export default ClothingCard
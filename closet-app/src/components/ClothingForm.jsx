import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ClothingForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [brand, setBrand] = useState("")
  const [material, setMaterial] = useState("")
  const [image, setImage] = useState("")

  const navigate = useNavigate()

  const handleSubmt = (event) => {
    event.preventDefault()

    fetch("/api/clothes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category: category,
        color: color,
        size: size,
        brand: brand,
        material: material,
        image: image
      })
    })
      .then(response => {
        console.log("Status:", response.status)
        return response.json()
      })
      .then(() => {
        navigate("/")
      })
  }

  return (
    <main className="form-page">

      <div className="form-header">
        <h1>Nytt plagg ✨</h1>
        <p>Lägg till ett nytt plagg i din garderob.</p>
      </div>

      <form className="clothing-form" onSubmit={handleSubmt}>

        <div className="form-row">

          <label>
            Namn
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            Kategori
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </label>

        </div>

        <div className="form-row">

          <label>
            Färg
            <input
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </label>

          <label>
            Märke
            <input
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </label>

        </div>

        <div className="form-row">

          <label>
            Storlek
            <input
              type="text"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
          </label>

          <label>
            Material
            <input
              type="text"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            />
          </label>

        </div>

        <label>
          Beskrivning
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label>
          Bild
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="Klistra in bildens URL"
          />
        </label>

        <button type="submit" className="submit-button">
          Lägg till
        </button>

      </form>

    </main>
  )
}

export default ClothingForm
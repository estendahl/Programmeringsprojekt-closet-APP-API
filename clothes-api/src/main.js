const cors = require("cors");
const express = require("express");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

// VISA ALLA KLÄDER (GET)
app.get("/api/clothes", (req, res) => {
    const clothes = db.prepare("SELECT * FROM clothes").all();

    res.status(200).json(clothes);
});

// VISA ETT PLAGG (GET)
app.get("/api/clothes/:id", (req, res) => {
    const clothes = db
        .prepare("SELECT * FROM clothes WHERE id = ?")
        .get(req.params.id);

    if (!clothes) {
        return res.status(404).send();
}

    res.status(200).json(clothes);
});

// SKAPA PLAGG (POST)
app.post("/api/clothes", (req, res) => {
    const { name,
            description,
            category,
            color,
            size,
            brand,
            material,
            image
    } = req.body;

    if (
        typeof name !== "string" ||
        name.length < 2 ||
        name.length > 25
    ) {
        return res.status(400).json({
            error: "name should be a string between 2 and 25 characters"
        });
    }

    const result = db
        .prepare(`
            INSERT INTO clothes
            (name, description, category, color, size, brand, material, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
            name,
            description,
            category,
            color,
            size,
            brand,
            material,
            image
        );

    const clothes = db
            .prepare("SELECT * FROM clothes WHERE id = ?")
            .get(result.lastInsertRowid);

    res.status(201).json(clothes);
});

// UPPDATERA ETT PLAGG (PUT)
app.put("/api/clothes/:id", (req, res) => {
    const {
        name,
        description,
        category,
        color,
        size,
        brand,
        material,
        image
    } = req.body;

     if (
        typeof name !== "string" ||
        name.length < 2 ||
        name.length > 25
    ) {
        return res.status(400).json({
            error: "name should be a string between 2 and 25 characters"
        });
    }

    const result = db
        .prepare(`
            UPDATE clothes
            SET
                name = ?,
                description = ?,
                category = ?,
                color = ?,
                size = ?,
                brand = ?,
                material = ?,
                image = ?
            WHERE id = ?
        `)
        .run(
            name,
            description,
            category,
            color,
            size,
            brand,
            material,
            image,
            req.params.id
        );

    if (result.changes === 0) {
        return res.status(404).send();
    }

    res.status(204).send();
});

// TA BORT ETT PLAGG (DELETE)
app.delete("/api/clothes/:id", (req, res) => {
    const result = db
        .prepare("DELETE FROM clothes WHERE id = ?")
        .run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).send();
    }

    res.status(204).send();
});

// STARTA SERVERN
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");

});
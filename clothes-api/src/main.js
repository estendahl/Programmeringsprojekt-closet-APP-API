const path = require("path");
const cors = require("cors");
const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// React-appens filer
app.use(express.static(path.join(__dirname, "../dist")));

// API - VISA ALLA KLÄDER
app.get("/api/clothes", (req, res) => {
    const clothes = db.prepare("SELECT * FROM clothes").all();

    res.status(200).json(clothes);
});

// API - VISA ETT PLAGG
app.get("/api/clothes/:id", (req, res) => {
    const clothes = db
        .prepare("SELECT * FROM clothes WHERE id = ?")
        .get(req.params.id);

    if (!clothes) {
        return res.status(404).send();
    }

    res.status(200).json(clothes);
});

// API - SKAPA PLAGG
app.post("/api/clothes", (req, res) => {
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

// API - UPPDATERA PLAGG
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

// API - TA BORT PLAGG
app.delete("/api/clothes/:id", (req, res) => {
    const result = db
        .prepare("DELETE FROM clothes WHERE id = ?")
        .run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).send();
    }

    res.status(204).send();
});

// VISA REACT-APPEN
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// STARTA SERVERN
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
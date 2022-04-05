import { setsController } from "../controller/sets.js";
import express from "express";
var setsRouter = express.Router();

setsRouter.post("/", async function (req, res) {
  let sets = await req.body;
  try {
    let newSets = await setsController.create(sets);

    if (newSets) {
      res.status(201).json(newSets);
    } else {
      res.status(400).json({ message: "Could not create sets" });
    }
  } catch (err) {
    console.log("Error at create sets", err);
  }
});

setsRouter.get("/:id", async function (req, res) {
  let id = req.params.id;

  let sets = await setsController.readAllById(id);
  if (sets) {
    res.status(200).json(sets);
  } else {
    res.status(400).json({ message: "Could not get sets" });
  }
});

setsRouter.get("/", async function (req, res) {
  let sets = await setsController.readAll();

  if (sets.length > 0) {
    res.status(200).json({ data: sets });
  } else {
    res.status(400).json({ message: "Could not get sets" });
  }
});

setsRouter.put("/:id", async function (req, res) {
  let set = req.body;
  let id = req.params.id;

  let updatedsets = await setsController.update(id, set);

  if (updatedsets) {
    res.status(202).json(updatedsets);
  } else {
    res.status(400).json({ message: "Failed to update sets" });
  }
});

setsRouter.delete("/:id", async function (req, res) {
  let id = req.params.id;

  let getCurrsets = await setsController.readAll();

  let sets = await setsController.delete(id);

  try {
    res.status(202).json(sets);
  } catch {
    res.status(400).json({ message: "Failed to delete sets" });
  }
});

export { setsRouter };

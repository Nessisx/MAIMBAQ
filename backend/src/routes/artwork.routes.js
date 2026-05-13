const { Router } = require('express');
const mongoose = require('mongoose');

const Artwork = require('../models/artwork.model');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json({ items: artworks });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const artwork = await Artwork.findById(id);

    if (!artwork) {
      throw new AppError('Obra no encontrada.', 404);
    }

    res.json({ item: artwork });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const artwork = await Artwork.create(req.body);
    res.status(201).json({ item: artwork });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const artwork = await Artwork.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artwork) {
      throw new AppError('Obra no encontrada.', 404);
    }

    res.json({ item: artwork });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const artwork = await Artwork.findByIdAndDelete(id);

    if (!artwork) {
      throw new AppError('Obra no encontrada.', 404);
    }

    res.status(204).send();
  })
);

module.exports = router;

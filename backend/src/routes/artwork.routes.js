const { Router } = require('express');
const mongoose = require('mongoose');

const Artwork = require('../models/artwork.model');
const {
  createArtwork,
  deleteArtworkById,
  findArtworkById,
  listArtworks,
  updateArtworkById,
} = require('../utils/localStore');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');
const { validateArtworkPayload } = require('../utils/artworkValidation');

const useMemoryStore = () => process.env.DB_MODE === 'memory';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (useMemoryStore()) {
      const artworks = await listArtworks();
      return res.json({ items: artworks });
    }

    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json({ items: artworks });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!useMemoryStore() && !mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const artwork = useMemoryStore()
      ? await findArtworkById(id)
      : await Artwork.findById(id);

    if (!artwork) {
      throw new AppError('Obra no encontrada.', 404);
    }

    res.json({ item: artwork });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = validateArtworkPayload(req.body);

    const artwork = useMemoryStore()
      ? await createArtwork(payload)
      : await Artwork.create(payload);

    res.status(201).json({ item: artwork });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!useMemoryStore() && !mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const payload = validateArtworkPayload(req.body, true);

    const artwork = useMemoryStore()
      ? await updateArtworkById(id, payload)
      : await Artwork.findByIdAndUpdate(id, payload, {
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

    if (!useMemoryStore() && !mongoose.isValidObjectId(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const artwork = useMemoryStore()
      ? await deleteArtworkById(id)
      : await Artwork.findByIdAndDelete(id);

    if (!artwork) {
      throw new AppError('Obra no encontrada.', 404);
    }

    res.status(204).send();
  })
);

module.exports = router;

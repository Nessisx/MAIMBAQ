const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    style: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    emoji: {
      type: String,
      trim: true,
      maxlength: 12,
      default: '🎨',
    },
    status: {
      type: String,
      enum: ['draft', 'processing', 'ready', 'published'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;

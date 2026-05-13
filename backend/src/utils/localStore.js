const clone = (value) => JSON.parse(JSON.stringify(value));

let artworks = [];
let sequence = 1;

const createArtwork = async (data) => {
  const now = new Date().toISOString();
  const artwork = {
    _id: String(sequence++),
    title: data.title,
    artist: data.artist,
    style: data.style || '',
    description: data.description || '',
    imageUrl: data.imageUrl || '',
    emoji: data.emoji || '🎨',
    status: data.status || 'draft',
    isFeatured: Boolean(data.isFeatured),
    createdAt: now,
    updatedAt: now,
  };

  artworks = [artwork, ...artworks];
  return clone(artwork);
};

const listArtworks = async () => clone(artworks);

const findArtworkById = async (id) => {
  const artwork = artworks.find((item) => item._id === id);
  return artwork ? clone(artwork) : null;
};

const updateArtworkById = async (id, updates) => {
  const index = artworks.findIndex((item) => item._id === id);

  if (index === -1) {
    return null;
  }

  const current = artworks[index];
  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  artworks[index] = updated;
  return clone(updated);
};

const deleteArtworkById = async (id) => {
  const index = artworks.findIndex((item) => item._id === id);

  if (index === -1) {
    return null;
  }

  const [removed] = artworks.splice(index, 1);
  return clone(removed);
};

module.exports = {
  createArtwork,
  deleteArtworkById,
  findArtworkById,
  listArtworks,
  updateArtworkById,
};
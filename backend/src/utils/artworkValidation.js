const { AppError } = require('./AppError');

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const validateArtworkPayload = (payload, partial = false) => {
  const errors = [];

  if (!partial && !payload.title) {
    errors.push('El campo title es obligatorio.');
  }

  if (!partial && !payload.artist) {
    errors.push('El campo artist es obligatorio.');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join(' '), 400);
  }

  if (partial) {
    const updates = {};

    if (hasOwn(payload, 'title')) updates.title = payload.title;
    if (hasOwn(payload, 'artist')) updates.artist = payload.artist;
    if (hasOwn(payload, 'style')) updates.style = payload.style;
    if (hasOwn(payload, 'description')) updates.description = payload.description;
    if (hasOwn(payload, 'imageUrl')) updates.imageUrl = payload.imageUrl;
    if (hasOwn(payload, 'emoji')) updates.emoji = payload.emoji;
    if (hasOwn(payload, 'status')) updates.status = payload.status;
    if (hasOwn(payload, 'isFeatured')) updates.isFeatured = Boolean(payload.isFeatured);

    return updates;
  }

  return {
    title: payload.title,
    artist: payload.artist,
    style: payload.style || '',
    description: payload.description || '',
    imageUrl: payload.imageUrl || '',
    emoji: payload.emoji || '🎨',
    status: payload.status || 'draft',
    isFeatured: Boolean(payload.isFeatured),
  };
};

module.exports = { validateArtworkPayload };
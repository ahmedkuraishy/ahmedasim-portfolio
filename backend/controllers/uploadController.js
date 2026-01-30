exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const host = req.get('host');
  const imageUrl = `http://${host}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};

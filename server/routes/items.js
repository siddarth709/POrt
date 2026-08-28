const express = require('express');
const SiteContent = require('../models/SiteContent');
const auth = require('../middleware/auth');

const router = express.Router();
const ARRAY_SECTIONS = ['education', 'experience', 'certifications', 'projects', 'chronicles'];

async function getContent() {
  let content = await SiteContent.findOne({});
  if (!content) content = await SiteContent.create({});
  return content;
}

function checkSection(section, res) {
  if (!ARRAY_SECTIONS.includes(section)) {
    res.status(400).json({ message: 'Unknown section' });
    return false;
  }
  return true;
}

// POST /api/items/:section - add a new item (e.g. a new project/cert/chronicle/edu/exp entry)
router.post('/:section', auth, async (req, res) => {
  const { section } = req.params;
  if (!checkSection(section, res)) return;
  try {
    const content = await getContent();
    content[section].items.push(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/items/:section/:itemId - update one item
router.put('/:section/:itemId', auth, async (req, res) => {
  const { section, itemId } = req.params;
  if (!checkSection(section, res)) return;
  try {
    const content = await getContent();
    const item = content[section].items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    Object.assign(item, req.body);
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/items/:section/:itemId
router.delete('/:section/:itemId', auth, async (req, res) => {
  const { section, itemId } = req.params;
  if (!checkSection(section, res)) return;
  try {
    const content = await getContent();
    content[section].items.id(itemId)?.deleteOne();
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

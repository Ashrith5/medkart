const Category = require("../../models/categoryModel");
const multer = require("multer");
const path = require("path");

// Set up disk storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

// Create category
exports.createCategory = async (req, res) => {
  try {
    upload.single('icon')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { name, related, sortOrder } = req.body;
      const iconPath = req.file ? `/uploads/${req.file.filename}` : null;

      if (!iconPath) {
        return res.status(400).json({ error: "No image file provided." });
      }

      const category = await Category.create({ name, icon: iconPath, related, sortOrder });
      res.status(201).json(category);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [["sortOrder", "ASC"]] });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category with file upload
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, related, sortOrder } = req.body;

    let updateData = { name, related, sortOrder };
    
    // Check if a new file was uploaded
    if (req.file) {
      updateData.icon = `/uploads/${req.file.filename}`;
    }

    const [updated] = await Category.update(
      updateData,
      { where: { id } }
    );

    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });

    if (deleted) {
      res.json({ success: true, message: "Category deleted" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reorder categories
exports.reorderCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    if (!Array.isArray(categories)) {
      return res.status(400).json({ error: "Invalid categories format" });
    }

    for (const item of categories) {
      await Category.update(
        { sortOrder: item.sortOrder },
        { where: { id: item.id } }
      );
    }

    res.json({ success: true, message: "Categories reordered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Category = require('../models/Category.model');

// Controller để tạo mới một danh mục
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller để lấy tất cả các danh mục
const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller để lấy một danh mục theo ID
const findOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller để cập nhật một danh mục theo ID
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller để xóa một danh mục theo ID
const deleteOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }
    res.json({ message: 'Đã xóa danh mục thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller để xóa tất cả các danh mục
const deleteAllCategories = async (req, res) => {
  try {
    await Category.deleteMany();
    res.json({ message: 'Đã xóa tất cả danh mục thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  findAllCategories,
  findOneCategory,
  updateCategory,
  deleteOneCategory,
  deleteAllCategories,
};

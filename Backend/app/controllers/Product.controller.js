const Product = require('../models/Product.model');
const path_lib = require("path");
const POSITION_CUT_LINK_IMAGE = 21;
const createError = require("http-errors");
const fs = require("fs");
const createProduct = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  } else {
    const { path } = req.file;
    const imgUrl = path.slice(4, path.length);
    const images = `http://localhost:3000/${imgUrl}`;
    console.log(images);

    const newProduct = {
      ...req.body,
      images: images,
    };

    try {
      console.log(newProduct);

      // Use 'Product' as the model, not as a variable to store the result
      const createdProduct = await Product.create(newProduct);

      return res.status(200).json({
        msg: createdProduct ? "Thêm sản phẩm thành công" : "Thêm sản phẩm thất bại",
        error: createdProduct ? false : true,
        document: createdProduct,
      });
    } catch (error) {
      console.log(error);
      return next(createError(500, error.message));
    }
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const findOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// const updateProduct = async (req, res) => {
//   try {
//     if (!req.file) {
//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );
//       if (!updatedProduct) {
//         res.status(404).json({ message: 'Sản phẩm không tồn tại' });
//         return;
//       }
//       res.status(200).json(updatedProduct);
//     } else {
//       const { path } = req.file;
//       const imgUrl = path.slice(4, path.length);
//       const images = `http://localhost:3000/${imgUrl}`;
      
//       // Include the updated images field in req.body
//       req.body.images = images;

//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );

//       if (!updatedProduct) {
//         res.status(404).json({ message: 'Sản phẩm không tồn tại' });
//         return;
//       }

//       res.status(200).json(updatedProduct);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const deleteOneProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }
    res.status(200).json({ message: 'Sản phẩm đã bị xóa thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: 'Tất cả sản phẩm đã bị xóa thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!req.file) {
      const newProduct = { ...req.body };

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: newProduct },
        { new: true }
      );

      return res.status(200).json({
        msg: updatedProduct
          ? "Sửa thông tin sản phẩm thành công!!"
          : "Ko tìm thấy thông tin sản phẩm để sửa!!",
        error: updatedProduct ? false : true,
        document: updatedProduct,
      });
    } else {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      const linkImage = Array.isArray(product.images) ? product.images[0] : product.images;
      const imagePath = path_lib.join(__dirname, "../", linkImage);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Deleted image fail", err);
        } else {
          console.log("Deleted image successfully");
        }
      });

      const { path } = req.file;
      const imgUrl = path.slice(4, path.length);
      const images = `http://localhost:3000/${imgUrl}`;

      const newProduct = {
        ...req.body,
        images: images,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: newProduct },
        { new: true }
      );

      return res.status(200).json({
        msg: updatedProduct
          ? "Sửa thông tin sản phẩm thành công!!"
          : "Không tìm thấy dử liệu để sửa!!",
        error: updatedProduct ? false : true,
        document: updatedProduct,
      });
    }
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports = {
  createProduct,
  findAllProducts,
  findOneProduct,
  // updateProduct,
  deleteOneProduct,
  deleteAllProducts,
  update
};

const Account = require("../models/Account.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const create = async (req, res, next) => {
  try {
    const newAccount = new Account(req.body);
    const savedAccount = await newAccount.save();
    return res
      .status(201)
      .json({ message: "Tạo tài khoản thành công", account: savedAccount });
  } catch (error) {
    return res.status(500).json({ error: "Không thể tạo tài khoản." });
  }
};
const findAll = async (req, res, next) => {
  try {
    const accounts = await Account.find()
      .populate({
        path: "customerId", // Trường trong mô hình "Account" chứa ObjectId tham chiếu đến khách hàng
        model: "Customer", // Tên mô hình "Customer"
      })
      .populate({
        path: "roleId",
        model: "Role",
      })
      .exec();

    return res
      .status(200)
      .json({
        message: "Danh sách tài khoản với thông tin khách hàng",
        accounts,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Không thể lấy danh sách tài khoản." });
  }
};
const findOne = async (req, res, next) => {
  try {
    const searchCriteria = req.params.criteria;
    const account = await Account.findOne({
      $or: [{ username: searchCriteria }, { _id: searchCriteria }],
    })
      // .populate('customerId');
      .populate({
        path: "customerId", // Trường trong mô hình "Account" chứa ObjectId tham chiếu đến khách hàng
        model: "Customer", // Tên mô hình "Customer"
      })
      .populate({
        path: "roleId",
        model: "Role",
      });

    if (!account) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản." });
    }

    return res.status(200).json({ message: "Thông tin tài khoản", account });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể tìm kiếm tài khoản." });
  }
};
const update = async (req, res, next) => {
  try {
    const accountId = req.params.id; // Lấy ID của tài khoản cần cập nhật từ tham số URL
    const updatedData = req.body; // Dữ liệu cập nhật từ yêu cầu

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true }
    );

    if (!updatedAccount) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy tài khoản để cập nhật." });
    }

    return res
      .status(200)
      .json({
        message: "Cập nhật tài khoản thành công",
        account: updatedAccount,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể cập nhật tài khoản." });
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body; // nhận username, pass

    const user = await Account.findOne({ username: username }) // tìm username
      .populate('roleId')
      .populate('customerId');

    // níu user k tồn tại or pass sai
    if (!user || password !== user.password) {
      return res.status(401).json({
        error: true,
        message: 'Invalid username or password',
      });
    }
    //tạo token = JWT
    const secretKey = 'mysecretkey'; // Replace with a strong secret key
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    // trả về token và thông tin của user
    return res.status(200).json({
      error: false,
      token: token,
      user: {
        customerId: user.customerId._id,
        username: user.username,
        name: user.customerId.name, // Include the name of the customer
        roleId: user.roleId._id, // Include the role name
        role: user.roleId.name
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
module.exports = { create, findAll, findOne, update, login };

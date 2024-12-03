const Role = require("../models/role");

exports.addRole = async (req, res) => {
  try {
    const createRole = new Role({ id: req.userId, name: req.body.name });
    const savedRole = await createRole.save();
    res.status(200).json({ status: true, content: { data: { savedRole } } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getsRoles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const totalRolesCount = await Role.countDocuments({
      name: "Community Admin",
    });
    const totalRoles = await Role.find({ name: "Community Admin" })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalRolesCount,
          pages: Math.ceil(totalRolesCount / pageSize),
          page: page,
        },
        data: { totalRoles },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

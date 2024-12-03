const Member = require("../models/member");
const Role = require("../models/role");

exports.addMember = async (req, res) => {
  try {
    const isAdminRole = await Role.findOne({ _id: req.body.role });
    console.log(isAdminRole);
    if (isAdminRole && isAdminRole.name === "Community Admin") {
      const createMember = new Member({
        community: req.body.community,
        user: req.body.user,
        role: req.body.role,
      });

      const savedMember = await createMember.save();

      res
        .status(200)
        .json({ status: true, content: { data: { savedMember } } });
    } else {
      throw new Error("Not_Allowed_Access");
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.deleteOne({ _id: req.params.id });

    if (deletedMember.deletedCount > 0) {
      res.status(200).json({
        status: true,
        content: { message: "Member deleted successfully" },
      });
    } else {
      res.status(404).json({ status: false, error: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

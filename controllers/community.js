const Community = require("../models/community");
const User = require("../models/user");
const Member = require("../models/member");
const Role = require("../models/role");
const { ObjectId } = require("mongoose").Types;

// create community
exports.addCommunity = async (req, res) => {
  try {
    const createCommunity = new Community({
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, "-").toLowerCase(),
      owner: req.userId,
    });
    const savedCommunity = await createCommunity.save();
    res.status(200).json({ status: true, content: { data: savedCommunity } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// get's owner community
exports.getsCommunity = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const totalRolesCount = await Community.countDocuments();
    const totalRoles = await Community.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const result = await Promise.all(
      totalRoles.map(async (community) => {
        const userinfo = await User.findOne({ _id: community.owner });
        return {
          ...community.toObject(),
          owner: {
            id: community.owner,
            name: userinfo ? userinfo.name : "Unknown",
          },
        };
      })
    );
    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalRolesCount,
          pages: Math.ceil(totalRolesCount / pageSize),
          page: page,
        },
        data: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get owner Joined Community
exports.getOwnedMember = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const totalMemberCount = await Member.countDocuments({ user: req.userId });
    const totalMember = await Community.find({ user: req.userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalMemberCount,
          pages: Math.ceil(totalMemberCount / pageSize),
          page: page,
        },
        data: totalMember,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// owner community
exports.getOwnedCommunity = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const totalRolesCount = await Community.countDocuments({
      owner: req.userId,
    });
    const totalRoles = await Community.find({ owner: req.userId })
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
        data: totalRoles,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get All Members
exports.getAllMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    // Validate if req.params.id is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid community ID" });
    }

    const totalMemberCounts = await Member.countDocuments({
      community: new ObjectId(req.params.id),
    });

    const totalMembers = await Member.find({
      community: new ObjectId(req.params.id),
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const result = await Promise.all(
      totalMembers.map(async (member) => {
        const userinfo = await User.findOne({ _id: member.user });
        const roleinfo = await Role.findOne({ _id: member.role });

        return {
          ...member.toObject(),
          user: {
            id: userinfo._id,
            name: userinfo ? userinfo.name : "Unknown",
          },
          role: {
            id: roleinfo._id,
            name: roleinfo ? roleinfo.name : "Unknown",
          },
        };
      })
    );

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalMemberCounts,
          pages: Math.ceil(totalMemberCounts / pageSize),
          page: page,
        },
        data: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

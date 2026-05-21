const router = require("express").Router();
const Work = require("../models/Work");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const newWork = new Work(req.body);
  try {
    await newWork.save();
    return res.status(200).json("WORKを保存しました。");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/get", async (req, res) => {
  try {
    const hasPaginationQuery = req.query.page || req.query.limit;

    if (hasPaginationQuery) {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 12);
      const skip = (page - 1) * limit;
      const query = Work.find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "adminId tag title thumbnail descriptionImage createdAt updatedAt",
        )
        .lean();
      const [works, total] = await Promise.all([query, Work.countDocuments()]);

      return res.status(200).json({
        works,
        page,
        limit,
        total,
        hasMore: skip + works.length < total,
      });
    }

    const works = await Work.find();
    return res.status(200).json(works);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json("WORKは存在しません。");
    }
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const adminId = req.id;
    const workId = req.params.id;
    const { tag, title, thumbnail, descriptionImage } = req.body;
    const work = await Work.findOneAndUpdate(
      { _id: workId, adminId: adminId },
      {
        $set: {
          tag,
          title,
          thumbnail,
          descriptionImage,
        },
      },
      {
        runValidators: true,
      },
    );

    if (!work) {
      return res.status(404).json("WORKは存在しません。");
    }
    return res.status(200).json("WORKを更新しました。");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

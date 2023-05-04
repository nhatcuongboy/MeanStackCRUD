import Equipment from "@/models/Equipment.model";

// Add Equipment
const createEquipment = (req, res, next) => {
  Equipment.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// List Equipment
const listEquipment = (req, res) => {
  // Equipment.find((error, data) => {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     res.json(data);
  //   }
  // });
  Equipment.aggregate([
    { $sort: { name: 1 } },
    // { $limit: 2 },
    // { $unwind: "$assign" },
  ]).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single Equipment
const getEquipmentById = (req, res) => {
  Equipment.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Assignment (ID of user)
const getEquipmentByAssignment = (req, res) => {
  Equipment.find({ assign: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Equipment
const updateEquipment = (req, res, next) => {
  Equipment.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
};

// Delete Equipment
const deleteEquipment = (req, res, next) => {
  Equipment.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

export default {
  createEquipment,
  listEquipment,
  getEquipmentById,
  getEquipmentByAssignment,
  updateEquipment,
  deleteEquipment,
};

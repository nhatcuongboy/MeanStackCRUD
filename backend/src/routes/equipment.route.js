import express from "express";
import EquipmentController from "@/controllers/equipment.controller";

const equipmentRoute = express.Router();

// Add Equipment
equipmentRoute
  .route("/equipment/create")
  .post(EquipmentController.createEquipment);

// List Equipment
equipmentRoute.route("/equipment/list").get(EquipmentController.listEquipment);

// Get single Equipment
equipmentRoute
  .route("/equipment/read/:id")
  .get(EquipmentController.getEquipmentById);

// Assignment (ID of user)
equipmentRoute
  .route("/equipment/assignment/:id")
  .get(EquipmentController.getEquipmentByAssignment);

// Update Equipment
equipmentRoute
  .route("/equipment/update/:id")
  .put(EquipmentController.updateEquipment);

// Delete Equipment
equipmentRoute
  .route("/equipment/delete/:id")
  .delete(EquipmentController.deleteEquipment);

module.exports = equipmentRoute;

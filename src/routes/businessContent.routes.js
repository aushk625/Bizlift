import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/businessContent.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/business-content/{businessId}:
 *   post:
 *     summary: Add item to business
 *     tags: [Business Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               content:
 *                 type: object
 *     responses:
 *       201:
 *         description: Item added successfully
 */

router.post("/:businessId", authMiddleware, addItem);

/**
 * @swagger
 * /api/business-content/{businessId}:
 *   get:
 *     summary: Get all items of a business
 *     tags: [Business Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of items
 */

router.get("/:businessId", authMiddleware, getItems);

/**
 * @swagger
 * /api/business-content/{businessId}/{itemId}:
 *   put:
 *     summary: Update item
 *     tags: [Business Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated item
 */

router.put("/:businessId/:itemId", authMiddleware, updateItem);

/**
 * @swagger
 * /api/business-content/{businessId}/{itemId}:
 *   delete:
 *     summary: Delete item
 *     tags: [Business Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 */

router.delete("/:businessId/:itemId", authMiddleware, deleteItem);

export default router;

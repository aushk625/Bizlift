import express from "express";

import {
  createWebsite,
  getPublicWebsite,
  getWebsiteByBusinessId,
  updateLayout,
} from "../controllers/website.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Website
 *   description: Website management APIs
 */

/**
 * @swagger
 * /api/websites:
 *   post:
 *     summary: Create a website
 *     tags: [Website]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessId
 *               - layoutId
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: 6854a1b2c3d4e5f678901234
 *               layoutId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Website created successfully
 */
router.post("/", createWebsite);

/**
 * @swagger
 * /api/websites/uuid/{uuid}/layout:
 *   patch:
 *     summary: Update website layout using UUID
 *     tags: [Website]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 8033ff95-6554-48d9-b9b9-39d44f8cbc74
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - layoutId
 *             properties:
 *               layoutId:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 2
 *     responses:
 *       200:
 *         description: Layout updated successfully
 *       404:
 *         description: Website not found
 */
router.patch("/uuid/:uuid/layout", updateLayout);

/**
 * @swagger
 * /api/websites/business/{businessId}:
 *   get:
 *     summary: Get website data by Business ID
 *     tags: [Website]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6854a1b2c3d4e5f678901234
 *     responses:
 *       200:
 *         description: Website data fetched successfully
 *       404:
 *         description: No website available
 */
router.get("/business/:businessId", getWebsiteByBusinessId);

/**
 * @swagger
 * /api/websites/public/{uuid}:
 *   get:
 *     summary: Get public website data
 *     tags: [Website]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 8033ff95-6554-48d9-b9b9-39d44f8cbc74
 *     responses:
 *       200:
 *         description: Website data fetched successfully
 *       404:
 *         description: Website not found
 */
router.get("/public/:uuid", getPublicWebsite);

export default router;
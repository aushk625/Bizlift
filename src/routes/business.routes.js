import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createBusiness,
  getMyBusinesses,
   updateBusiness,
  deleteBusiness
} from "../controllers/business.controller.js";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business management APIs
 */

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create business for logged-in user
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - category
 *               - phone
 *               - address
 *             properties:
 *               businessName:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               establishedYear:
 *                 type: number
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               whatsappNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               country:
 *                 type: string
 *               logo:
 *                 type: string
 *               themeColor:
 *                 type: string
 *               socialLinks:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   instagram:
 *                     type: string
 *                   youtube:
 *                     type: string
 *     responses:
 *       201:
 *         description: Business created successfully
 */

router.post("/", authMiddleware, createBusiness);



/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all businesses of logged-in user
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of businesses
 */

router.get("/", authMiddleware, getMyBusinesses);

/**
 * @swagger
 * /api/business/{id}:
 *   put:
 *     summary: Update business by ID
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               establishedYear:
 *                 type: number
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               whatsappNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               country:
 *                 type: string
 *               logo:
 *                 type: string
 *               themeColor:
 *                 type: string
 *               socialLinks:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   instagram:
 *                     type: string
 *                   youtube:
 *                     type: string
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       404:
 *         description: Business not found
 */
router.put("/:id", authMiddleware, updateBusiness);


/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     summary: Delete business by ID
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Business deleted
 */
router.delete("/:id", authMiddleware, deleteBusiness);

export default router;

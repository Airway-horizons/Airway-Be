/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - name
 *         - content
 *         - images
 *         - duration
 *         - destination
 *         - services
 *         - tags
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the tour
 *         content:
 *           type: string
 *           description: Detailed description of the tour
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *           description: Array of image URLs for the tour
 *         duration:
 *           type: string
 *           description: Duration of the tour (e.g., "7 days")
 *         destination:
 *           type: string
 *           description: The destination of the tour
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of services included in the tour
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags related to the tour
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           description: Status of the tour (e.g., "draft" or "published")
 */

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Get list of tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *         description: The list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 */

/**
 * @swagger
 * /api/tours/add:
 *   post:
 *     summary: Add a new tour
 *     tags: [Tours]
 *     security:  # Specify that this endpoint requires authentication
 *       - BearerAuth: []  # Reference the security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Tour added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tours/delete/{id}:
 *   delete:
 *     summary: Delete a tour by ID
 *     tags: [Tours]
 *     security:  # Specify that this endpoint requires authentication
 *       - BearerAuth: []  # Reference the security scheme
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tours/update/{id}:
 *   patch:
 *     summary: Update a tour by ID
 *     tags: [Tours]
 *     security:  # Specify that this endpoint requires authentication
 *       - BearerAuth: []  # Reference the security scheme
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tours/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     tags: [Tours]
 *     security:  # Specify that this endpoint requires authentication
 *       - BearerAuth: []  # Reference the security scheme
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour fetched successfully
 *       404:
 *         description: Tour not found
 *       401:
 *         description: Unauthorized
 */

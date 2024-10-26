/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the tour
 *         description:
 *           type: string
 *           description: Detailed description of the tour
 *         location:
 *           type: string
 *           description: The location of the tour
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
 */

/**
 * @swagger
 * /api/tours/delete/{id}:
 *   delete:
 *     summary: Delete a tour by ID
 *     tags: [Tours]
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
 */

/**
 * @swagger
 * /api/tours/update/{id}:
 *   patch:
 *     summary: Update a tour by ID
 *     tags: [Tours]
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
 */

/**
 * @swagger
 * /api/tours/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     tags: [Tours]
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
 */

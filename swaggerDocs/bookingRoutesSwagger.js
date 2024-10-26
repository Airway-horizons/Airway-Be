/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - fromDate
 *         - toDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the booking
 *         name:
 *           type: string
 *           description: Name of the person making the booking
 *         email:
 *           type: string
 *           description: Email of the person making the booking
 *         phone:
 *           type: string
 *           description: Optional phone number
 *         adults:
 *           type: integer
 *           description: Number of adults
 *         ladies:
 *           type: integer
 *           description: Number of ladies
 *         kids:
 *           type: integer
 *           description: Number of kids
 *         fromDate:
 *           type: string
 *           format: date
 *           description: Start date of the booking
 *         toDate:
 *           type: string
 *           format: date
 *           description: End date of the booking
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         phone: "1234567890"
 *         adults: 2
 *         ladies: 1
 *         kids: 0
 *         fromDate: 2024-10-01
 *         toDate: 2024-10-05
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get list of bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /api/bookings/add:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/bookings/delete/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/bookings/update/{id}:
 *   patch:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking fetched successfully
 *       404:
 *         description: Booking not found
 */

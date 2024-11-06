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
 *           description: Start date of the booking in YYYY-MM-DD format
 *         toDate:
 *           type: string
 *           format: date
 *           description: End date of the booking in YYYY-MM-DD format
 *         packageId:
 *           type: string
 *           description: ID of the tour package
 *         customerId:
 *           type: string
 *           description: ID of the user making the booking
 *         status:
 *           type: string
 *           enum: [Pending, Confirmed, Cancelled, Paid]
 *           description: Payment or booking status
 *         numberOfPeople:
 *           type: integer
 *           description: Total number of people included in the booking
 *         payment:
 *           type: object
 *           properties:
 *             paymentId:
 *               type: string
 *               description: Unique payment ID associated with the booking
 *             paymentStatus:
 *               type: string
 *               enum: [Pending, Completed, Failed]
 *               description: Status of the payment
 *             paymentMethod:
 *               type: string
 *               enum: [CreditCard, DebitCard, BankTransfer, Cash]
 *               description: Payment method used
 *             paymentAmount:
 *               type: integer
 *               description: Total amount paid
 *             paymentDate:
 *               type: string
 *               format: date
 *               description: Date of payment in YYYY-MM-DD format
 *             currency:
 *               type: string
 *               description: Currency code (e.g., USD, INR)
 *         image:
 *           type: string
 *           format: binary
 *           description: Optional image file for booking confirmation
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         phone: "1234567890"
 *         adults: 2
 *         ladies: 1
 *         kids: 0
 *         fromDate: 2024-10-01
 *         toDate: 2024-10-05
 *         packageId: "1"
 *         customerId: "1"
 *         status: "Paid"
 *         numberOfPeople: 4
 *         payment:
 *           paymentId: "12345"
 *           paymentStatus: "Completed"
 *           paymentMethod: "CreditCard"
 *           paymentAmount: 500
 *           paymentDate: "2024-10-01"
 *           currency: "USD"
 *         image: "image binary data"
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               adults:
 *                 type: integer
 *               ladies:
 *                 type: integer
 *               kids:
 *                 type: integer
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *               packageId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               status:
 *                 type: string
 *               numberOfPeople:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *               payment:
 *                 $ref: '#/components/schemas/Booking/properties/payment'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               adults:
 *                 type: integer
 *               ladies:
 *                 type: integer
 *               kids:
 *                 type: integer
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *               packageId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               status:
 *                 type: string
 *               numberOfPeople:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *               payment:
 *                 $ref: '#/components/schemas/Booking/properties/payment'
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

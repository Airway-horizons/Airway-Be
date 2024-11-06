import {
  collectionNameBooking,
  collectionNameUser,
} from "../../utils/helper.js";
import {
  deleteDocument,
  getByIdDocument,
  getDocument,
  insertDocument,
  updateDocument,
} from "../../db/dbService.js";
import { errorResponse, successResponse } from "../../utils/responseHelper.js";
import { ObjectId } from "mongodb";

export const getAllBooking = async (req, res) => {
  try {
    const tour = await getDocument(collectionNameBooking);
    return successResponse(res, "Successfully fetched Booking", tour);
  } catch (error) {
    return errorResponse(res, "Failed to fetch Booking", error);
  }
};

export const postBooking = async (req, res) => {
  try {
    const user = await getByIdDocument(collectionNameUser, req.userData.id);

    const bookingDocument = {
      customerId: new ObjectId(user?._id),
      packageId: req?.validatedBody?.packageId,
      bookingDate: new Date(),
      specialRequests: req?.validatedBody?.specialRequests,
      status: "pending", // pending, confirmed, cancelled
      adults: req?.validatedBody?.adults ?? 0,
      ladies: req?.validatedBody?.ladies ?? 0,
      kids: req?.validatedBody?.kids ?? 0,
      fromDate: req?.validatedBody?.fromDate ?? "",
      toDate: req?.validatedBody?.toDate ?? "",
      name: req?.validatedBody?.name ?? user?.name,
      email: req?.validatedBody?.email ?? user?.email,
      phone: req?.validatedBody?.phone ?? user?.phone,
      payment: {
        paymentId: "",
        paymentStatus: "pending",
        paymentMethod: "",
        paymentAmount: 0.0,
        paymentDate: null,
        currency: null,
      },
      itinerary: [],
      cancellationPolicy: "Free cancellation within 24 hours of booking.",
    };

    await insertDocument(collectionNameBooking, bookingDocument);
    return successResponse(res, "Successfully added Booking");
  } catch (error) {
    return errorResponse(res, "Failed to add Booking", error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const result = await deleteDocument(collectionNameBooking, req.params.id);
    if (result.deletedCount === 0) {
      return errorResponse(res, "Booking not found", 404);
    }
    return successResponse(res, "Successfully delete Booking");
  } catch (error) {
    return errorResponse(res, "Failed to delete Booking", error);
  }
};

export const patchBooking = async (req, res) => {
  const { id } = req.params; // Get id from the URL parameter
  const body = req.body; // Get update data from the request body

  try {
    const result = await updateDocument(collectionNameBooking, id, body);
    if (result.modifiedCount === 0) {
      errorResponse(res, "No document found to update or no changes made", 402);
    }
    return successResponse(res, "Successfully updated Booking", body);
  } catch (error) {
    return errorResponse(res, "Failed to delete Booking", error);
  }
};

export const getByIdBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdDocument(collectionNameBooking, id);
    return successResponse(res, "Successfully get Booking", result);
  } catch (error) {
    return errorResponse(res, "Failed to get Booking", error);
  }
};

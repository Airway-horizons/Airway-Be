import { collectionNameTour } from "../../utils/helper.js";
import {
  deleteDocument,
  getByIdDocument,
  getDocument,
  insertDocument,
  updateDocument,
} from "../../db/dbService.js";
import { errorResponse, successResponse } from "../../utils/responseHelper.js";

export const getTour = async (req, res) => {
  try {
    const tour = await getDocument(collectionNameTour);
    return successResponse(res, "Successfully fetched tour", tour);
  } catch (error) {
    return errorResponse(res, "Failed to fetch tour", error);
  }
};

export const postTour = async (req, res) => {
  try {
    const tourAddSchema = {
      name: req.validatedBody?.name ?? "",
      content: req.validatedBody?.content ?? "",
      images: req.validatedBody?.images ?? [],
      duration: req.validatedBody?.duration ?? "",
      destination: req.validatedBody?.destination ?? "",
      services: req.validatedBody?.services ?? [],
      tags: req.validatedBody?.tags ?? [],
      status: "published", // "draft" or "published"
    };
    await insertDocument(collectionNameTour, tourAddSchema);
    return successResponse(res, "Successfully added tour");
  } catch (error) {
    return errorResponse(res, "Failed to add tour", error);
  }
};

export const deleteTour = async (req, res) => {
  try {
    const result = await deleteDocument(collectionNameTour, req.params.id);
    if (result.deletedCount === 0) {
      return errorResponse(res, "Tour not found", 404);
    }
    return successResponse(res, "Successfully delete tour");
  } catch (error) {
    return errorResponse(res, "Failed to delete tour", error);
  }
};

export const patchTour = async (req, res) => {
  const { id } = req.params; // Get id from the URL parameter
  const body = req.body; // Get update data from the request body

  try {
    const result = await updateDocument(collectionNameTour, id, body);
    if (result.modifiedCount === 0) {
      errorResponse(res, "No document found to update or no changes made", 402);
    }
    return successResponse(res, "Successfully updated tour", body);
  } catch (error) {
    return errorResponse(res, "Failed to delete tour", error);
  }
};

export const getByIdTour = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getByIdDocument(collectionNameTour, id);
    return successResponse(res, "Successfully get tour", result);
  } catch (error) {
    return errorResponse(res, "Failed to get tour", error);
  }
};

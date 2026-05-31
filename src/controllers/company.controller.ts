import { Hono } from "hono";
import { container } from "@cores/container";
import { TYPES } from "@cores/types";
import type { CompanyServiceInterface } from "@services/company/company.service.interface";
import { AppError } from "@cores/errors";


const companyController = new Hono();

const getService = () => container.get<CompanyServiceInterface>(TYPES.CompanyServiceInterface);

companyController.get("/", async (c) => {
  const companies = await getService().findAll();
  return c.json({
    success: true,
    data: companies,
    message: "Companies retrieved successfully",
  });
});

// ── New: GET /companies/:id ──
companyController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const company = await getService().findById(id);

    if (!company) {
      return c.json({
        success: false,
        data: null,
        message: "Company not found",
      }, 404);
    }

    return c.json({
      success: true,
      data: company,
      message: "Company retrieved successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        data: null,
        message: error.message,
      }, error.statusCode);
    }
    throw error;
  }
});

// ── New: POST /companies ──
companyController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const company = await getService().create(body);

    return c.json({
      success: true,
      data: company,
      message: "Company created successfully",
    }, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        data: null,
        message: error.message,
      }, error.statusCode);
    }
    throw error;
  }
});

// ── New: PUT /companies/:id ──
companyController.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const company = await getService().update(id, body);

    return c.json({
      success: true,
      data: company,
      message: "Company updated successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        data: null,
        message: error.message,
      }, error.statusCode);
    }
    throw error;
  }
});

// ── New: DELETE /companies/:id (soft delete) ──
companyController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await getService().delete(id);

    return c.json({
      success: true,
      data: null,
      message: "Company deleted successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        data: null,
        message: error.message,
      }, error.statusCode);
    }
    throw error;
  }
});

export default companyController;

import { Hono } from "hono";
import { container } from "@cores/container";
import { AppError } from "@cores/errors";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type ServiceActions = {
  findAll(): Promise<unknown[]>;
  findById(id: string): Promise<unknown | null>;
  create(data: unknown): Promise<unknown>;
  update(id: string, data: unknown): Promise<unknown>;
  delete(id: string): Promise<void>;
};

export function createController(
  serviceKey: symbol,
  entityLabel: string,
  entityLabelPlural: string,
): Hono {
  const ctrl = new Hono();
  const getService = () => container.get<ServiceActions>(serviceKey);

  ctrl.get("/", async (c) => {
    const items = await getService().findAll();
    return c.json({
      success: true,
      data: items,
      message: `${capitalize(entityLabelPlural)} retrieved successfully`,
    });
  });

  ctrl.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const item = await getService().findById(id);
      if (!item) {
        return c.json(
          { success: false, data: null, message: `${capitalize(entityLabel)} not found` },
          404,
        );
      }
      return c.json({
        success: true,
        data: item,
        message: `${capitalize(entityLabel)} retrieved successfully`,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          { success: false, data: null, message: error.message },
          error.statusCode,
        );
      }
      throw error;
    }
  });

  ctrl.post("/", async (c) => {
    try {
      const body = await c.req.json();
      const item = await getService().create(body);
      return c.json(
        { success: true, data: item, message: `${capitalize(entityLabel)} created successfully` },
        201,
      );
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          { success: false, data: null, message: error.message },
          error.statusCode,
        );
      }
      throw error;
    }
  });

  ctrl.put("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const item = await getService().update(id, body);
      return c.json({
        success: true,
        data: item,
        message: `${capitalize(entityLabel)} updated successfully`,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          { success: false, data: null, message: error.message },
          error.statusCode,
        );
      }
      throw error;
    }
  });

  ctrl.delete("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      await getService().delete(id);
      return c.json({
        success: true,
        data: null,
        message: `${capitalize(entityLabel)} deleted successfully`,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          { success: false, data: null, message: error.message },
          error.statusCode,
        );
      }
      throw error;
    }
  });

  return ctrl;
}

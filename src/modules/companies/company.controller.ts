import { injectable, inject } from "inversify";
import type { Context } from "hono";
import { TYPES } from "../../di/identifiers";
import type { ICompanyService } from "./interfaces/ICompanyService";

@injectable()
export class CompanyController {
  constructor(
    @inject(TYPES.ICompanyService) private readonly service: ICompanyService,
  ) {}

  findAll() {
    return async (c: Context) => {
      const companies = await this.service.findAll();

      return c.json({
        success: true,
        data: companies,
        message: "Companies retrieved successfully",
      });
    };
  }
}

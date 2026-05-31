import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeWarningResponseDto,
  CreateEMployeeWarningSchema,
  CreateEMployeeWarningDto,
  UpdateEMployeeWarningSchema,
  UpdateEMployeeWarningDto,
} from "@dtos/employeeWarning.dto";
import type { EmployeeWarningRepositoryInterface } from "@repositories/employeeWarnings/employeeWarnings.repository.interface";
import type { EmployeeWarningServiceInterface } from "./employeeWarnings.service.interface";

@injectable()
export class EmployeeWarningService
  extends BaseService<EMployeeWarningResponseDto, CreateEMployeeWarningDto, UpdateEMployeeWarningDto, EmployeeWarningRepositoryInterface>
  implements EmployeeWarningServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeWarningRepositoryInterface) repository: EmployeeWarningRepositoryInterface,
  ) {
    super(repository, CreateEMployeeWarningSchema, UpdateEMployeeWarningSchema, "EmployeeWarning");
  }
}

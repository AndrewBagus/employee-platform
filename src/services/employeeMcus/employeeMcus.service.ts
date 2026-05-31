import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeMcuResponseDto,
  CreateEMployeeMcuSchema,
  CreateEMployeeMcuDto,
  UpdateEMployeeMcuSchema,
  UpdateEMployeeMcuDto,
} from "@dtos/employeeMcu.dto";
import type { EmployeeMcuRepositoryInterface } from "@repositories/employeeMcus/employeeMcus.repository.interface";
import type { EmployeeMcuServiceInterface } from "./employeeMcus.service.interface";

@injectable()
export class EmployeeMcuService
  extends BaseService<EMployeeMcuResponseDto, CreateEMployeeMcuDto, UpdateEMployeeMcuDto, EmployeeMcuRepositoryInterface>
  implements EmployeeMcuServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeMcuRepositoryInterface) repository: EmployeeMcuRepositoryInterface,
  ) {
    super(repository, CreateEMployeeMcuSchema, UpdateEMployeeMcuSchema, "EmployeeMcu");
  }
}

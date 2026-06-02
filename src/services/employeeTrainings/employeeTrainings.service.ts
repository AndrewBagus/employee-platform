import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EmployeeTrainingResponseDto,
  CreateEmployeeTrainingSchema,
  CreateEmployeeTrainingDto,
  UpdateEmployeeTrainingSchema,
  UpdateEmployeeTrainingDto,
} from "@dtos/employeeTraining.dto";
import type { EmployeeTrainingRepositoryInterface } from "@repositories/employeeTrainings/employeeTrainings.repository.interface";
import type { EmployeeTrainingServiceInterface } from "./employeeTrainings.service.interface";

@injectable()
export class EmployeeTrainingService
  extends BaseService<EmployeeTrainingResponseDto, CreateEmployeeTrainingDto, UpdateEmployeeTrainingDto, EmployeeTrainingRepositoryInterface>
  implements EmployeeTrainingServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeTrainingRepositoryInterface) repository: EmployeeTrainingRepositoryInterface,
  ) {
    super(repository, CreateEmployeeTrainingSchema, UpdateEmployeeTrainingSchema, "EmployeeTraining");
  }
}

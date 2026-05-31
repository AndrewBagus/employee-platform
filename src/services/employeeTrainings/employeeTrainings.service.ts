import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeTrainingResponseDto,
  CreateEMployeeTrainingSchema,
  CreateEMployeeTrainingDto,
  UpdateEMployeeTrainingSchema,
  UpdateEMployeeTrainingDto,
} from "@dtos/employeeTraining.dto";
import type { EmployeeTrainingRepositoryInterface } from "@repositories/employeeTrainings/employeeTrainings.repository.interface";
import type { EmployeeTrainingServiceInterface } from "./employeeTrainings.service.interface";

@injectable()
export class EmployeeTrainingService
  extends BaseService<EMployeeTrainingResponseDto, CreateEMployeeTrainingDto, UpdateEMployeeTrainingDto, EmployeeTrainingRepositoryInterface>
  implements EmployeeTrainingServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeTrainingRepositoryInterface) repository: EmployeeTrainingRepositoryInterface,
  ) {
    super(repository, CreateEMployeeTrainingSchema, UpdateEMployeeTrainingSchema, "EmployeeTraining");
  }
}

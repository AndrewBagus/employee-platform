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
import type { EmployeeTrainingRepository } from "@repositories/employeeTrainings/employeeTrainings.repository";

@injectable()
export class EmployeeTrainingService extends BaseService<
  EMployeeTrainingResponseDto,
  CreateEMployeeTrainingDto,
  UpdateEMployeeTrainingDto,
  EmployeeTrainingRepository
> {
  constructor(
    @inject(TYPES.EmployeeTrainingRepositoryInterface) repository: EmployeeTrainingRepository,
  ) {
    super(repository, CreateEMployeeTrainingSchema, UpdateEMployeeTrainingSchema, "EmployeeTraining");
  }
}

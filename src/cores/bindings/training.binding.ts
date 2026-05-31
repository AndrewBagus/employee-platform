import { Container } from "inversify";
import { TYPES } from "../types";
import { TrainingTypeRepository } from "@repositories/trainingTypes/trainingTypes.repository";
import { TrainingTypeService } from "@services/trainingTypes/trainingTypes.service";
import { TrainingRepository } from "@repositories/trainings/trainings.repository";
import { TrainingService } from "@services/trainings/trainings.service";
import { TrainingScheduleRepository } from "@repositories/trainingSchedules/trainingSchedules.repository";
import { TrainingScheduleService } from "@services/trainingSchedules/trainingSchedules.service";

export function registerTrainingBindings(container: Container) {
  container.bind(TYPES.TrainingTypeRepositoryInterface).to(TrainingTypeRepository);
  container.bind(TYPES.TrainingTypeServiceInterface).to(TrainingTypeService);
  container.bind(TYPES.TrainingRepositoryInterface).to(TrainingRepository);
  container.bind(TYPES.TrainingServiceInterface).to(TrainingService);
  container.bind(TYPES.TrainingScheduleRepositoryInterface).to(TrainingScheduleRepository);
  container.bind(TYPES.TrainingScheduleServiceInterface).to(TrainingScheduleService);
}

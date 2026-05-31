import { Container } from "inversify";
import { TYPES } from "../types";
import { WorkingZoneRepository } from "@repositories/workingZones/workingZones.repository";
import { WorkingZoneService } from "@services/workingZones/workingZones.service";

export function registerZoneBindings(container: Container) {
  container.bind(TYPES.WorkingZoneRepositoryInterface).to(WorkingZoneRepository);
  container.bind(TYPES.WorkingZoneServiceInterface).to(WorkingZoneService);
}

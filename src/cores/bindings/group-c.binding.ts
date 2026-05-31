import { Container } from "inversify";
import { TYPES } from "../types";
import { EmployeeRepository } from "@repositories/employees/employees.repository";
import { EmployeeService } from "@services/employees/employees.service";

export function registerGroupCBindings(container: Container) {
  container.bind(TYPES.EmployeeRepositoryInterface).to(EmployeeRepository);
  container.bind(TYPES.EmployeeServiceInterface).to(EmployeeService);
}

import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { log } from "@cores/logger";
import companyController from "./controllers/company.controller";
import countryController from "./controllers/country.controller";
import religionController from "./controllers/religion.controller";
import gradeController from "./controllers/grade.controller";
import costCenterController from "./controllers/costCenter.controller";
import projectController from "./controllers/project.controller";
import departmentController from "./controllers/department.controller";
import positionController from "./controllers/position.controller";
import allowanceController from "./controllers/allowance.controller";
import warningGradeController from "./controllers/warningGrade.controller";
import warningController from "./controllers/warning.controller";
import trainingTypeController from "./controllers/trainingType.controller";
import trainingController from "./controllers/training.controller";
import trainingScheduleController from "./controllers/trainingSchedule.controller";
import workingZoneController from "./controllers/workingZone.controller";
import employeeController from "./controllers/employee.controller";
import employeeAddressController from "./controllers/employeeAddress.controller";
import employeeContractController from "./controllers/employeeContract.controller";
import employeeContractAdvisorController from "./controllers/employeeContractAdvisor.controller";
import employeeLeaveAdvisorController from "./controllers/employeeLeaveAdvisor.controller";
import employeeMcuController from "./controllers/employeeMcu.controller";
import employeeProjectController from "./controllers/employeeProject.controller";
import employeeTrainingController from "./controllers/employeeTraining.controller";
import employeeWarningController from "./controllers/employeeWarning.controller";
import employeeWorkZoneController from "./controllers/employeeWorkZone.controller";

const app = new Hono();

// Request logging
app.use("*", async (c, next) => {
  const start = performance.now();
  await next();
  const ms = (performance.now() - start).toFixed(2);
  log.info(`${c.req.method} ${c.req.path} → ${c.res.status} (${ms}ms)`);
});

app.get("/health", (c) => {
  return c.json({
    status: "oke",
    timestamp: DateTime.now().setZone("Asia/Jakarta").toISO(),
    service: "employee-service",
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
// Register domain routes
app.route("/companies", companyController);
app.route("/countries", countryController);
app.route("/religions", religionController);
app.route("/grades", gradeController);
app.route("/cost-centers", costCenterController);
app.route("/projects", projectController);

app.route("/departments", departmentController);
app.route("/positions", positionController);
app.route("/allowances", allowanceController);
app.route("/warning-grades", warningGradeController);
app.route("/warnings", warningController);
app.route("/training-types", trainingTypeController);
app.route("/trainings", trainingController);
app.route("/training-schedules", trainingScheduleController);
app.route("/working-zones", workingZoneController);
app.route("/employees", employeeController);
app.route("/employee-addresses", employeeAddressController);
app.route("/employee-contracts", employeeContractController);
app.route("/employee-contract-advisors", employeeContractAdvisorController);
app.route("/employee-leave-advisors", employeeLeaveAdvisorController);
app.route("/employee-mcus", employeeMcuController);
app.route("/employee-projects", employeeProjectController);
app.route("/employee-trainings", employeeTrainingController);
app.route("/employee-warnings", employeeWarningController);
app.route("/employee-work-zones", employeeWorkZoneController);
export default app;

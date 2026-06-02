import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { log } from "@cores/logger";
import seedController from "./controllers/seed.controller";
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
app.route("/company", companyController);
app.route("/country", countryController);
app.route("/religion", religionController);
app.route("/grade", gradeController);
app.route("/cost-center", costCenterController);
app.route("/project", projectController);

app.route("/department", departmentController);
app.route("/position", positionController);
app.route("/allowance", allowanceController);
app.route("/warning-grade", warningGradeController);
app.route("/warning", warningController);
app.route("/training-type", trainingTypeController);
app.route("/training", trainingController);
app.route("/training-schedule", trainingScheduleController);
app.route("/working-zone", workingZoneController);
app.route("/employee", employeeController);
app.route("/employee-address", employeeAddressController);
app.route("/employee-contract", employeeContractController);
app.route("/employee-contract-advisor", employeeContractAdvisorController);
app.route("/employee-leave-advisor", employeeLeaveAdvisorController);
app.route("/employee-mcu", employeeMcuController);
app.route("/employee-project", employeeProjectController);
app.route("/employee-training", employeeTrainingController);
app.route("/employee-warning", employeeWarningController);
app.route("/employee-work-zone", employeeWorkZoneController);
app.route("/api", seedController);
export default app;

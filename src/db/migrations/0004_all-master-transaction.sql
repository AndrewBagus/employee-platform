CREATE TYPE "public"."training_status" AS ENUM('PASS', 'FAILED', 'REGISTERED', 'NOTATTEND');--> statement-breakpoint
CREATE TYPE "public"."warning_status" AS ENUM('PERMANENT', 'TEMPORARY');--> statement-breakpoint
CREATE TYPE "public"."mcu_status" AS ENUM('PASS', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."employee_status" AS ENUM('PERMANENT', 'CONTRACT');--> statement-breakpoint
CREATE TYPE "public"."employee_type" AS ENUM('STAFF', 'WORKER');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('M', 'W');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('SINGLE', 'MARRIED', 'DIVORCED');--> statement-breakpoint
CREATE TABLE "employee_projects" (
	"employee_id" uuid,
	"project_id" uuid,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone,
	CONSTRAINT "employee_projects_employee_id_project_id_pk" PRIMARY KEY("employee_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "employee_trainings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"training_date" date,
	"training_status" "training_status" DEFAULT 'REGISTERED',
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "warnings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"warning_grade_id" uuid,
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_warnings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"warning_start_date" date,
	"warning_end_date" date,
	"warning_status" "warning_status",
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "working_zones" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cost_centers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sap_code" varchar(15),
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "training_schedules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"training_date" date,
	"training_time" time,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "religion" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(20),
	"description" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_leave_advisors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"order" smallint,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"address" text,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_contracts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"start_date" date,
	"end_date" date,
	"termination_date" date,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "allowances" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"currency_id" uuid,
	"name" varchar(255),
	"nominal" numeric(12, 2),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "trainings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "warning_grades" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "training_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_mcus" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"mcu_date" date,
	"mcu_end_date" date,
	"mcu_status" "mcu_status",
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "grades" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(15),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_work_zones" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"working_zone_id" uuid,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employee_contract_advisors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"order" smallint,
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"department_id" uuid,
	"position_id" uuid,
	"supervisor_id" uuid,
	"finger_id" varchar(30),
	"first_name" varchar(255),
	"middle_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"phone" varchar(255),
	"mobile" varchar(255),
	"birth_date" date,
	"birth_place" varchar(255),
	"gender" "gender" DEFAULT 'M',
	"marital_status" "marital_status" DEFAULT 'SINGLE',
	"employee_type" "employee_type" DEFAULT 'STAFF',
	"employee_status" "employee_status" DEFAULT 'CONTRACT',
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sap_code" varchar(15),
	"name" varchar(255),
	"remark" text,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "employee_projects" ADD CONSTRAINT "employee_projects_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_projects" ADD CONSTRAINT "employee_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_trainings" ADD CONSTRAINT "employee_trainings_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warnings" ADD CONSTRAINT "warnings_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warnings" ADD CONSTRAINT "warnings_warning_grade_id_warning_grades_id_fk" FOREIGN KEY ("warning_grade_id") REFERENCES "public"."warning_grades"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_warnings" ADD CONSTRAINT "employee_warnings_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "working_zones" ADD CONSTRAINT "working_zones_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_schedules" ADD CONSTRAINT "training_schedules_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_leave_advisors" ADD CONSTRAINT "employee_leave_advisors_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_addresses" ADD CONSTRAINT "employee_addresses_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_contracts" ADD CONSTRAINT "employee_contracts_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allowances" ADD CONSTRAINT "allowances_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allowances" ADD CONSTRAINT "allowances_currency_id_countries_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."countries"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warning_grades" ADD CONSTRAINT "warning_grades_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_types" ADD CONSTRAINT "training_types_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_mcus" ADD CONSTRAINT "employee_mcus_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_work_zones" ADD CONSTRAINT "employee_work_zones_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_work_zones" ADD CONSTRAINT "employee_work_zones_working_zone_id_working_zones_id_fk" FOREIGN KEY ("working_zone_id") REFERENCES "public"."working_zones"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_contract_advisors" ADD CONSTRAINT "employee_contract_advisors_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_supervisor_id_employees_id_fk" FOREIGN KEY ("supervisor_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
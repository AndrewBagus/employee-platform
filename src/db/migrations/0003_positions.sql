CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"department_id" uuid,
	"name" varchar(100),
	"is_hod" boolean DEFAULT false,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE restrict ON UPDATE no action;
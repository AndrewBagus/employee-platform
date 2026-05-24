CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_id" uuid,
	"name" varchar(100),
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;
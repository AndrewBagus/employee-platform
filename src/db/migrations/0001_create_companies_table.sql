CREATE TYPE "public"."companyType" AS ENUM('GROUP', 'CLIENT', 'SUBCON');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"country_id" uuid,
	"name" varchar(100),
	"name_short" varchar(10),
	"type" "companyType",
	"have_worker_employee" boolean DEFAULT false,
	"is_ldap" boolean DEFAULT false,
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE restrict ON UPDATE no action;
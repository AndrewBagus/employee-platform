CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(10),
	"currency" varchar(10),
	"flag" varchar(100),
	"sts_active" boolean DEFAULT true,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"created_by" varchar(50),
	"updated_at" timestamp (6) with time zone,
	"updated_by" varchar(50),
	"deleted_at" timestamp (6) with time zone
);

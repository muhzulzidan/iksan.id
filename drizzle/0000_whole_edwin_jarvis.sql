-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"celeryId" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DownloadIksanId" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"fileName" text NOT NULL,
	"downloadDate" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email" text NOT NULL,
	"fullname" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CustomerIksanId" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phoneNumber" text
);
--> statement-breakpoint
CREATE TABLE "CustomerOrder" (
	"id" serial PRIMARY KEY NOT NULL,
	"total" double precision NOT NULL,
	"status" text NOT NULL,
	"customerId" integer NOT NULL,
	"xenditId" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"paidAt" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "CustomerDownloadLink" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerIksanId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DownloadLink" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"customerDownloadLinkId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" double precision NOT NULL,
	"status" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"orderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OrderItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL,
	"orderId" integer NOT NULL,
	"productSlug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."CustomerIksanId"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DownloadLink" ADD CONSTRAINT "DownloadLink_customerDownloadLinkId_fkey" FOREIGN KEY ("customerDownloadLinkId") REFERENCES "public"."CustomerDownloadLink"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."CustomerOrder"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."CustomerOrder"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "User_celeryId_key" ON "User" USING btree ("celeryId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_customerId_key" ON "User" USING btree ("customerId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_username_key" ON "User" USING btree ("username" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "CustomerIksanId_email_key" ON "CustomerIksanId" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "CustomerOrder_xenditId_key" ON "CustomerOrder" USING btree ("xenditId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "DownloadLink_link_key" ON "DownloadLink" USING btree ("link" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment" USING btree ("orderId" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "OrderItem_orderId_productSlug_key" ON "OrderItem" USING btree ("orderId" int4_ops,"productSlug" int4_ops);
*/
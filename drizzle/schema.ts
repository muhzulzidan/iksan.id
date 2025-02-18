import { pgTable, varchar, timestamp, text, integer, uniqueIndex, serial, foreignKey, doublePrecision } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	customerId: text().notNull(),
	celeryId: text().notNull(),
	phoneNumber: text().notNull(),
	email: text().notNull(),
	username: text().notNull(),
}, (table) => [
	uniqueIndex("User_celeryId_key").on(table.celeryId),
	uniqueIndex("User_customerId_key").on(table.customerId),
	uniqueIndex("User_email_key").on(table.email),
	uniqueIndex("User_username_key").on(table.username),
]);

export const downloadIksanId = pgTable("DownloadIksanId", {
	id: serial().primaryKey().notNull(),
	userId: text().notNull(),
	fileName: text().notNull(),
	downloadDate: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	email: text().notNull(),
	fullname: text().notNull(),
});

export const customerIksanId = pgTable("CustomerIksanId", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phoneNumber: text(),
}, (table) => [
	uniqueIndex("CustomerIksanId_email_key").on(table.email),
]);

export const customerOrder = pgTable("CustomerOrder", {
	id: serial().primaryKey().notNull(),
	total: doublePrecision().notNull(),
	status: text().notNull(),
	customerId: integer().notNull(),
	xenditId: text(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	paidAt: timestamp({ precision: 3, mode: 'string' }),
}, (table) => [
	uniqueIndex("CustomerOrder_xenditId_key").on(table.xenditId),
	foreignKey({
		columns: [table.customerId],
		foreignColumns: [customerIksanId.id],
		name: "CustomerOrder_customerId_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
]);

export const customerDownloadLink = pgTable("CustomerDownloadLink", {
	id: serial().primaryKey().notNull(),
	customerIksanId: integer().notNull(),
});

export const downloadLink = pgTable("DownloadLink", {
	id: serial().primaryKey().notNull(),
	link: text().notNull(),
	customerDownloadLinkId: integer().notNull(),
}, (table) => [
	uniqueIndex("DownloadLink_link_key").on(table.link),
	foreignKey({
		columns: [table.customerDownloadLinkId],
		foreignColumns: [customerDownloadLink.id],
		name: "DownloadLink_customerDownloadLinkId_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
]);

export const payment = pgTable("Payment", {
	id: serial().primaryKey().notNull(),
	amount: doublePrecision().notNull(),
	status: text().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	orderId: integer().notNull(),
}, (table) => [
	uniqueIndex("Payment_orderId_key").on(table.orderId),
	foreignKey({
		columns: [table.orderId],
		foreignColumns: [customerOrder.id],
		name: "Payment_orderId_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
]);

export const orderItem = pgTable("OrderItem", {
	id: serial().primaryKey().notNull(),
	quantity: integer().notNull(),
	price: doublePrecision().notNull(),
	orderId: integer().notNull(),
	productSlug: text().notNull(),
}, (table) => [
	uniqueIndex("OrderItem_orderId_productSlug_key").on(table.orderId, table.productSlug),
	foreignKey({
		columns: [table.orderId],
		foreignColumns: [customerOrder.id],
		name: "OrderItem_orderId_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
]);
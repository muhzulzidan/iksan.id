import { relations } from "drizzle-orm/relations";
import { customerIksanId, customerOrder, customerDownloadLink, downloadLink, payment, orderItem } from "./schema";

export const customerOrderRelations = relations(customerOrder, ({one, many}) => ({
	customerIksanId: one(customerIksanId, {
		fields: [customerOrder.customerId],
		references: [customerIksanId.id]
	}),
	payments: many(payment),
	orderItems: many(orderItem),
}));

export const customerIksanIdRelations = relations(customerIksanId, ({many}) => ({
	customerOrders: many(customerOrder),
}));

export const downloadLinkRelations = relations(downloadLink, ({one}) => ({
	customerDownloadLink: one(customerDownloadLink, {
		fields: [downloadLink.customerDownloadLinkId],
		references: [customerDownloadLink.id]
	}),
}));

export const customerDownloadLinkRelations = relations(customerDownloadLink, ({many}) => ({
	downloadLinks: many(downloadLink),
}));

export const paymentRelations = relations(payment, ({one}) => ({
	customerOrder: one(customerOrder, {
		fields: [payment.orderId],
		references: [customerOrder.id]
	}),
}));

export const orderItemRelations = relations(orderItem, ({one}) => ({
	customerOrder: one(customerOrder, {
		fields: [orderItem.orderId],
		references: [customerOrder.id]
	}),
}));
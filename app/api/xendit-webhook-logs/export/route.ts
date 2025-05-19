// import { NextResponse } from "next/server";
// import { db } from '@/drizzle/db';
// import { xenditWebhookLog } from '@/drizzle/schema';
// import * as XLSX from "xlsx";

// export async function GET() {
//     const logs = await db.select().from(xenditWebhookLog).orderBy(xenditWebhookLog.receivedAt, 'desc').execute();

//     // Prepare data for Excel
//     const data = logs.map(log => ({
//         ID: log.id,
//         "Received At": log.receivedAt?.toString(),
//         "Event Type": log.eventType,
//         Amount: log.amount,
//         Payload: JSON.stringify(log.payload),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

//     const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

//     return new NextResponse(buffer, {
//         status: 200,
//         headers: {
//             "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             "Content-Disposition": "attachment; filename=xendit-webhook-logs.xlsx",
//         },
//     });
// }

console.log('Xendit Webhook Logs Export Route Loaded');

// page examples placholder




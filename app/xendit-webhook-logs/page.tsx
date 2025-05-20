// import { db } from '@/drizzle/db';
// import { xenditWebhookLog } from '@/drizzle/schema';

// export default async function XenditWebhookLogsPage() {
//     // Fetch all logs, newest first
//     const logs = await db.select().from(xenditWebhookLog).orderBy(xenditWebhookLog.receivedAt, 'desc').execute();

//     return (
//         <div>
//             <h1>Xendit Webhook Logs</h1>
//             <a
//                 href="/api/xendit-webhook-logs/export"
//                 download
//                 style={{
//                     display: "inline-block",
//                     marginBottom: 16,
//                     padding: "8px 16px",
//                     background: "#0070f3",
//                     color: "#fff",
//                     borderRadius: 4,
//                     textDecoration: "none"
//                 }}
//             >
//                 Download as Excel
//             </a>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Received At</th>
//                         <th>Event Type</th>
//                         <th>Amount</th>
//                         <th>Payload</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map(log => (
//                         <tr key={log.id}>
//                             <td>{log.id}</td>
//                             <td>{log.receivedAt?.toString()}</td>
//                             <td>{log.eventType}</td>
//                             <td>{log.amount}</td>
//                             <td>
//                                 <pre style={{ maxWidth: 400, overflowX: 'auto', fontSize: 12 }}>
//                                     {JSON.stringify(log.payload, null, 2)}
//                                 </pre>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

export default function XenditWebhookLogsPage() {
    return <div>Placeholder: Xendit Webhook Logs Page</div>;
  }
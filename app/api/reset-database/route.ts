import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm/sql';
import { db } from '@/drizzle/db'; // Adjust the path to your database configuration

export async function POST(req: NextRequest) {
    try {
        // Drop all tables
        await db.execute(sql`DROP SCHEMA public CASCADE`);
        await db.execute(sql`CREATE SCHEMA public`);

        // Run migrations to recreate the schema
        // await migrate(db, { migrationsFolder: './migrations' });

        return NextResponse.json({ message: 'Database reset successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error resetting database:', error);
        return NextResponse.json({ message: 'Error resetting database' }, { status: 500 });
    }
}
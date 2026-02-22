import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { leads, insertLeadSchema } from "../../shared/schema";
import { z } from "zod";

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const input = insertLeadSchema.parse(body);
    
    // In Cloudflare Pages, env vars are in context.env
    const databaseUrl = context.env.DATABASE_URL;
    if (!databaseUrl) {
      return new Response(JSON.stringify({ message: "DATABASE_URL not configured" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const sql = neon(databaseUrl);
    const db = drizzle(sql);
    
    const [lead] = await db.insert(leads).values(input).returning();
    
    return new Response(JSON.stringify(lead), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify({
        message: err.errors[0].message,
        field: err.errors[0].path?.join('.')
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: String(err) }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

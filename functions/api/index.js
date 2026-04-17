/*
Name: Serverside Password Manager (JS)
Author: xksqs
Version: 0.1
*/

const bcrypt = require("bcryptjs");

async function add_to_table(username, password_hash) {
    await env.DB.prepare(
        "INSERT INTO users (username, password) VALUES (?, ?)"
    )
    .bind(username, password_hash)
    .run();
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function onRequestPost({ request, env }) {
    try {
        const data = await request.json();

        if (!data.password || !data.username) {
            return new Response(JSON.stringify({ error: "Missing parameters" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const hash = await hashPassword(data.password);

        const existing = await env.DB.prepare(
        "SELECT 1 FROM users WHERE username = ?"
        )
        .bind(data.username)
        .first();

        if (existing) {
            return Response.json({ error: "Username already taken" });
        } else {
            add_to_table(data.username, hash)
        }

        return new Response(JSON.stringify({ status: "OK" }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            error: err.message
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function onRequestGet({ env }) {
  return new Response(JSON.stringify({
    keys: Object.keys(env || {})
  }));
}
/*
Name: Serverside Password Manager (JS)
Author: xksqs
Version: 0.1
*/

const bcrypt = require("bcryptjs");

async function add_to_table(env, username, password_hash) {
    return await env.DB.prepare(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)"
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
            return Response.json(
                { error: "Missing parameters" },
                { status: 400 }
            );
        }

        const existing = await env.DB.prepare(
            "SELECT 1 FROM users WHERE username = ?"
        )
        .bind(data.username)
        .first();

        if (existing) {
            return Response.json(
                { error: "Username already taken" },
                { status: 409 }
            );
        }

        const hash = await hashPassword(data.password);

        await add_to_table(env, data.username, hash);

        return Response.json({ status: "OK" });

    } catch (err) {
        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        "SELECT username FROM users"
    ).all();

    return Response.json({ users: results });
}
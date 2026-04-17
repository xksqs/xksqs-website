const bcrypt = require("bcryptjs");

export async function onRequestPost({ request }) {
    try {
        const data = await request.json();

        if (!data.password || !data.username) {
            return new Response(JSON.stringify({ error: "Missing parameters" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const hash = await hashPassword(data.password);

        return new Response(JSON.stringify({
            status: "OK"
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            error: "Invalid JSON or server error"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function onRequestGet() {
    return new Response(JSON.stringify({
        message: "Send a POST request"
    }), {
        headers: { "Content-Type": "application/json" }
    });
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
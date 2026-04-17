/*

Name: Serverside Password Manager (JS)
Author: xksqs
Version: 0.1

*/

const bcrypt = require("bcryptjs");

let password;

export async function onRequestPost({ request }) {
    const data = await request.json();

    password = data

    return new Response(
        JSON.stringify({
            received: await hashPassword(data),
            status: "OK"
        }),
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
    );
}

export async function onRequestGet() {
    return new Response("Send a POST request to use this API", {
        status: 200,
        headers: {
            "Content-Type": "text/plain"
        }
    });
}

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
 
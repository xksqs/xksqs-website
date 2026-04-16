export async function onRequestPost({ request }) {
    const data = await request.json();

    return new Response(
        JSON.stringify({
            received: data,
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
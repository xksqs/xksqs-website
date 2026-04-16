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
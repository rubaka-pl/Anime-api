export async function GET(request, { params }) {
    const { category } = params;
    console.log("CATEGORY: ", category);

    try {
        const apiResponse = await fetch(`
        https://api.jikan.moe/v4/top/anime?filter=${category}`);

        if (!apiResponse.ok) {
            throw new Error(
                `Failed to fetch from Jikan API: ${apiResponse}`
            );
        }

        const { data } = await apiResponse.json();

        return new Response(JSON.stringify({ message: "Success", data: data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error fetching data: ", error.message);

        return new Response(JSON.stringify({ message: "Error", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

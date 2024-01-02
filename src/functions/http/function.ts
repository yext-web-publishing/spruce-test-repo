export async function main() {
    return {
        statusCode: 200,
        headers: {
            "test-header": "test",
        },
        body: "test"
    }
}
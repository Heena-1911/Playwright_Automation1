import { expect, test } from "@playwright/test";

//Fetching User (GET Request)
test.only("get user", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users"); // Use GET method
    expect(response.status()).toBe(200); // Check for a successful response

    const responseBody = await response.json();
    console.log(responseBody); // Log the response properly
});
//Creating a User (POST Request)
test("create user", async ({ request }) => {
    const response = await request.post("https://reqres.in/api/users", {
        data: {
            name: "John Doe",
            job: "QA Engineer"
        },
    });

    expect(response.status()).toBe(201); // Status for successful creation

    const responseBody = await response.json();
    console.log(responseBody); // Log the response properly
});


//Updating a User (PUT Request)

test("Update user", async ({ request }) => {
    const response = await request.put("https://reqres.in/api/users/2", {
        data: {
            name: "John Updated",
            job: "Senior QA Engineer"
        },
    });

    expect(response.status()).toBe(200); // Check for successful update

    const responseBody = await response.json();
    console.log(responseBody); // Log response data
});

//Deleting a User (DELETE Request)

test("Delete user", async ({ request }) => {
    const response = await request.delete("https://reqres.in/api/users/2");

    expect(response.status()).toBe(204); // 204 means No Content (successful deletion)
    console.log("User deleted successfully");
});


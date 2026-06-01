import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import User from "../models/User.js";

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {

  // Register Success
  test("should register a new user successfully", async () => {

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    console.log(res.body);

    expect(res.status).toBe(201);

  });

  // Existing Email
  test("should fail to register with existing email", async () => {

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Existing User",
        email: "existing@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Another User",
        email: "existing@example.com",
        password: "password123",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");

  });

  // Missing Fields
  test("should fail with missing required fields", async () => {

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Incomplete User",
      });

    expect(res.status).toBe(400);

  });

  // Login Success
  test("should login successfully with correct credentials", async () => {

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Login User",
        email: "login@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "password123",
      });

    console.log(res.body);

    expect(res.status).toBe(200);

  });

  // Wrong Password
  test("should fail login with wrong password", async () => {

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Wrong Password User",
        email: "wrong@example.com",
        password: "correctpassword",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);

  });

});
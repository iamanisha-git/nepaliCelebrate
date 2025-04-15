import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertEventSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Get all events
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getAllEvents();
    res.json(events);
  });

  // Get single event
  app.get("/api/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.json(event);
  });

  // Create event (protected, provider only)
  app.post("/api/events", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isProvider) {
      return res.status(403).send("Only providers can create events");
    }

    const eventData = insertEventSchema.parse({
      ...req.body,
      providerId: req.user.id,
    });
    const event = await storage.createEvent(eventData);
    res.status(201).json(event);
  });

  // Verify Khalti Payment
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { token, amount } = req.body;

      if (!token || !amount) {
        return res.status(400).json({ error: "Missing token or amount" });
      }

      const response = await fetch("https://khalti.com/api/v2/payment/verify/", {
        method: "POST",
        headers: {
          "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          amount,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(400).json(error);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });

  // Create booking (protected)
  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Authentication required");
    }

    const bookingData = insertBookingSchema.parse({
      ...req.body,
      userId: req.user.id,
    });

    const event = await storage.getEvent(bookingData.eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    if (bookingData.guestCount > event.capacity) {
      return res.status(400).send("Exceeds event capacity");
    }

    const booking = await storage.createBooking(bookingData);
    res.status(201).json(booking);
  });

  const httpServer = createServer(app);
  return httpServer;
}
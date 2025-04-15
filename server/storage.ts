import { Event, User, Booking, InsertUser, InsertEvent } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Event operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Booking operations
  createBooking(booking: Booking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private bookings: Map<number, Booking>;
  
  sessionStore: session.Store;
  
  private userCounter: number;
  private eventCounter: number;
  private bookingCounter: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.bookings = new Map();
    
    this.userCounter = 1;
    this.eventCounter = 1;
    this.bookingCounter = 1;

    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });

    // Add sample events for testing
    this.initializeSampleEvents();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Event operations
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCounter++;
    const event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Booking operations
  async createBooking(booking: Booking): Promise<Booking> {
    const id = this.bookingCounter++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }

  // Initialize sample events
  private initializeSampleEvents() {
    const sampleEvents: InsertEvent[] = [
      {
        title: "Traditional Nepali Wedding Ceremony",
        description: "Experience a beautiful traditional Nepali wedding with all customs and rituals. Package includes venue decoration, catering, and traditional music.",
        imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
        price: "150000",
        capacity: 200,
        date: "2024-06-15",
        location: "Kathmandu Banquet Hall",
        providerId: 1,
        category: "Wedding",
      },
      {
        title: "Modern Fusion Reception",
        description: "A perfect blend of modern and traditional elements for your reception. Features international cuisine and contemporary entertainment.",
        imageUrl: "https://images.unsplash.com/photo-1516477485464-abbcea8f9b1f",
        price: "120000",
        capacity: 150,
        date: "2024-07-20",
        location: "The Everest Hotel",
        providerId: 1,
        category: "Reception",
      },
      {
        title: "Corporate Event Package",
        description: "Complete corporate event solution with professional AV setup, business-class catering, and dedicated event management.",
        imageUrl: "https://images.unsplash.com/photo-1543860856-79e478a9452b",
        price: "80000",
        capacity: 100,
        date: "2024-05-30",
        location: "Yak & Yeti Hotel",
        providerId: 1,
        category: "Corporate",
      },
      {
        title: "Traditional Food Festival",
        description: "Experience authentic Nepali cuisine with live cooking stations, cultural performances, and traditional ambiance.",
        imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
        price: "50000",
        capacity: 300,
        date: "2024-08-10",
        location: "Bhaktapur Durbar Square",
        providerId: 1,
        category: "Cultural",
      },
      {
        title: "Birthday Celebration Package",
        description: "Complete birthday party solution with themed decoration, cake, entertainment, and catering services.",
        imageUrl: "https://images.unsplash.com/photo-1530077471762-3cef45f920cd",
        price: "35000",
        capacity: 50,
        date: "2024-09-05",
        location: "Fun City Events",
        providerId: 1,
        category: "Birthday",
      },
    ];

    sampleEvents.forEach((event) => {
      const id = this.eventCounter++;
      this.events.set(id, { ...event, id });
    });
  }
}

export const storage = new MemStorage();
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative h-[600px] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/attached_assets/image_1740818077884.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Celebrate Your Special Moments with Nepali Traditions
          </h1>
          <p className="text-xl mb-8 opacity-90">
            From sacred ceremonies to joyous festivals, experience the rich cultural heritage
            of Nepal through our carefully curated events and celebrations.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={() => setLocation("/auth")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Browse Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { HistoricalEvent } from "@shared/schema";

export default function Timeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>("pre-revolution");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const eventsQuery = useQuery<HistoricalEvent[]>({
    queryKey: ["/api/events"],
  });

  if (eventsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (!eventsQuery.data) {
    return null;
  }

  const events = eventsQuery.data.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dot-pattern">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://source.unsplash.com/random/1920x1080?vietnam,revolution')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Dòng thời gian Cách mạng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Khám phá các sự kiện quan trọng trong tiến trình Cách mạng Tháng Tám năm 1945
          </motion.p>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-2">
            <div className="flex gap-2">
              <CategoryButton
                active={selectedCategory === "pre-revolution"}
                onClick={() => setSelectedCategory("pre-revolution")}
              >
                Bối cảnh trước Cách mạng
              </CategoryButton>
              <CategoryButton
                active={selectedCategory === "revolution"}
                onClick={() => setSelectedCategory("revolution")}
              >
                Diễn biến Cách mạng
              </CategoryButton>
              <CategoryButton
                active={selectedCategory === "post-revolution"}
                onClick={() => setSelectedCategory("post-revolution")}
              >
                Sau Cách mạng
              </CategoryButton>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Date Marker */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
                />

                {/* Event Card */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="group border-2 border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-primary mb-3">
                        <CalendarDays className="h-5 w-5" />
                        <span className="font-medium">{event.date}</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <AnimatePresence>
                        {expandedEvent === event.id ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <p className="text-muted-foreground mb-4">{event.description}</p>
                            {event.imageUrl && (
                              <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                              />
                            )}
                          </motion.div>
                        ) : (
                          <p className="text-muted-foreground line-clamp-2 mb-4">
                            {event.description}
                          </p>
                        )}
                      </AnimatePresence>

                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => setExpandedEvent(
                          expandedEvent === event.id ? null : event.id
                        )}
                      >
                        <span>{expandedEvent === event.id ? "Thu gọn" : "Xem thêm"}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedEvent === event.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryButton({ children, active, onClick }: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`text-lg relative ${active ? "" : "hover:text-primary"}`}
      onClick={onClick}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 bg-primary opacity-20 rounded-md"
        />
      )}
    </Button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-40 w-full mb-8" />
      <div className="space-y-8">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
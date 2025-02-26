import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Maximize2, Plus, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { HistoricalEvent } from "@shared/schema";

interface TimelineEventProps {
  event: HistoricalEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-primary/20">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary via-primary/80 to-primary/60" />
        <div className="absolute top-0 left-0 h-full w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card Content */}
        <CardHeader className="grid grid-cols-[auto,1fr] gap-6 items-start p-6">
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
            >
              <CalendarDays className="h-6 w-6 text-primary" />
            </motion.div>
            <div className="text-sm font-medium text-primary text-center">{event.date}</div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground/90 group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="pl-24 pr-6 pb-6">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {event.description}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full bg-card hover:bg-primary/5 border-2 border-primary/20 text-primary hover:text-primary flex items-center justify-center gap-2"
              >
                <span>Xem chi tiết</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ZoomIn className="w-4 h-4" />
                </motion.div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {event.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image Section with Zoom Feature */}
                {event.imageUrl && (
                  <div 
                    className={`relative overflow-hidden transition-all duration-500 rounded-lg ${
                      isZoomed ? 'h-[70vh]' : 'aspect-video'
                    }`}
                  >
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        ...(isZoomed && { scale: 1.5 })
                      }}
                      transition={{ duration: 0.5 }}
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                    <motion.button
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      onClick={() => setIsZoomed(!isZoomed)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}

                {/* Event Details with Animations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-5 w-5" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">Việt Nam</span>
                  </div>
                </motion.div>

                {/* Description with Fade-in Animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-lg max-w-none"
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>

                {/* Historical Context Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-primary/5 rounded-lg p-6 border-2 border-primary/10"
                >
                  <h4 className="text-lg font-semibold mb-3">Bối cảnh lịch sử</h4>
                  <p className="text-muted-foreground">
                    Sự kiện này là một phần quan trọng trong tiến trình Cách mạng Tháng Tám, 
                    đánh dấu bước ngoặt trong lịch sử dân tộc Việt Nam.
                  </p>
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
}
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HistoricalEvent } from "@shared/schema";

interface TimelineEventProps {
  event: HistoricalEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
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
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
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
                className="w-full bg-card hover:bg-primary/5 border-2 border-primary/20 text-primary hover:text-primary"
              >
                <span>Xem chi tiết</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {event.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image Section */}
                {event.imageUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-5 w-5" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">Việt Nam</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Additional Details */}
                <div className="bg-primary/5 rounded-lg p-6 border-2 border-primary/10">
                  <h4 className="text-lg font-semibold mb-3">Ý nghĩa lịch sử</h4>
                  <p className="text-muted-foreground">
                    Sự kiện này là một phần quan trọng trong tiến trình Cách mạng Tháng Tám, 
                    đánh dấu bước ngoặt trong lịch sử dân tộc Việt Nam.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
}
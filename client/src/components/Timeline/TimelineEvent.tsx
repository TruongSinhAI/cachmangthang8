import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import type { HistoricalEvent } from "@shared/schema";

interface TimelineEventProps {
  event: HistoricalEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
      <div className="absolute top-0 left-0 h-full w-1.5 bg-primary" />
      <div className="absolute top-0 left-0 h-full w-1.5 bg-primary/30 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

      <CardHeader className="grid grid-cols-[auto,1fr] gap-6 items-center">
        <div className="flex items-center gap-2 text-primary">
          <CalendarDays className="h-5 w-5" />
          <span className="font-medium">{event.date}</span>
        </div>
        <h3 className="text-2xl font-bold text-foreground/90">{event.title}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-lg text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
          {event.description}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white hover:bg-white/90 border-2 border-primary/20 text-primary hover:text-primary/90"
            >
              Xem chi tiết
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">
                {event.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {event.imageUrl && (
                  <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-5 w-5" />
                <span className="font-medium">{event.date}</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
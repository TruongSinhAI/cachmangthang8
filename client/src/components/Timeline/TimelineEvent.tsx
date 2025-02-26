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
import type { HistoricalEvent } from "@shared/schema";

interface TimelineEventProps {
  event: HistoricalEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
      
      <CardHeader className="grid grid-cols-[auto,1fr] gap-4 items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <h3 className="text-xl font-semibold">{event.title}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Xem chi tiết
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{event.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-muted-foreground">
                {event.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  MapPin,
  Maximize2,
  Plus,
  ZoomIn,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { HistoricalEvent } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimelineEventProps {
  event: HistoricalEvent;
  theme?: "light" | "dark";
}

export default function TimelineEvent({ event, theme }: TimelineEventProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-primary/20">
        {/* Enhanced Interactive Gradient Bars */}
        <motion.div
          className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary via-primary/80 to-primary/60"
          whileHover={{ width: "4px" }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{ width: "4px" }}
        />
        {/* Enhanced Card Header */}
        <CardHeader className="grid grid-cols-[auto,1fr] gap-6 items-start p-6">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <CalendarDays className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.div
              className="text-sm font-medium text-primary text-center"
              whileHover={{ scale: 1.1 }}
            >
              {event.date.split("-").reverse().join("-")}
            </motion.div>
          </div>
          <div>
            <motion.h3
              className="text-2xl font-bold text-foreground/90 group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 10 }}
            >
              {event.title}
            </motion.h3>
          </div>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="pl-24 pr-6 pb-6">
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {event.description.slice(0, 100)}...
              </motion.p>

              <div className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-card hover:bg-primary/5 border-2 border-primary/20 text-primary hover:text-primary flex items-center gap-2"
                    >
                      <span>Chi tiết</span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-7xl max-h-[80vh] ">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-primary">
                        {event.title}
                      </DialogTitle>
                    </DialogHeader>

                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* Interactive Image Section */}
                      {event.imageUrl && (
                        <div
                          className={`h-25 w-auto overflow-hidden rounded-lg `}
                        >
                          {/* <motion.img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-1/2 h-full  object-cover "
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                              ...(isZoomed && { scale: 1.5 })
                            }}
                            transition={{ duration: 0.5 }}
                          /> */}
                        </div>
                      )}

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                          className="flex items-center gap-2 text-primary"
                          whileHover={{ scale: 1.05 }}
                        >
                          <CalendarDays className="h-5 w-5" />
                          <span className="font-medium">{event.date.split("-").reverse().join("-")}</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-2 text-primary"
                          whileHover={{ scale: 1.05 }}
                        >
                          <MapPin className="h-5 w-5" />
                          <span className="font-medium">Việt Nam</span>
                        </motion.div>
                      </div>

                      {/* Interactive Content Sections */}
                      <ScrollArea className="h-[700px] rounded-lg bg-primary/5 p-6">
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">
                              Mô tả chi tiết
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">
                              Bối cảnh lịch sử
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.context}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">
                              Ý nghĩa
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.significant}
                            </p>
                          </motion.div>
                        </div>
                      </ScrollArea>
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

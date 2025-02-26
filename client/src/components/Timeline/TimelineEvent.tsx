import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Maximize2, Plus, ZoomIn, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { HistoricalEvent } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimelineEventProps {
  event: HistoricalEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-primary/20">
        {/* Interactive Gradient Bar */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary via-primary/80 to-primary/60"
          whileHover={{ width: "4px" }}
        />
        <motion.div 
          className="absolute top-0 left-0 h-full w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{ width: "4px" }}
        />

        {/* Card Content */}
        <CardHeader className="grid grid-cols-[auto,1fr] gap-6 items-start p-6">
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"
            >
              <CalendarDays className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.div 
              className="text-sm font-medium text-primary text-center"
              whileHover={{ scale: 1.1 }}
            >
              {event.date}
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
                {showDetails ? event.description : `${event.description.slice(0, 150)}...`}
              </motion.p>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2"
                >
                  {showDetails ? "Thu gọn" : "Xem thêm"}
                  <motion.div
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Button>

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

                  <DialogContent className="max-w-4xl">
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
                            whileHover={{ scale: isZoomed ? 1.6 : 1.1 }}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          className="flex items-center gap-2 text-primary"
                          whileHover={{ scale: 1.05 }}
                        >
                          <CalendarDays className="h-5 w-5" />
                          <span className="font-medium">{event.date}</span>
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
                      <ScrollArea className="h-[300px] rounded-lg bg-primary/5 p-6">
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">Mô tả chi tiết</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">Bối cảnh lịch sử</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              Sự kiện này là một phần quan trọng trong tiến trình Cách mạng Tháng Tám, 
                              đánh dấu bước ngoặt trong lịch sử dân tộc Việt Nam.
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <h3 className="text-lg font-semibold mb-3">Ý nghĩa</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              Sự kiện này có ý nghĩa quan trọng trong việc thúc đẩy tiến trình 
                              cách mạng và góp phần vào thắng lợi chung của cuộc Cách mạng Tháng Tám.
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
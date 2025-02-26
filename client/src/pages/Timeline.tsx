import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown, ZoomIn, ZoomOut, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { HistoricalEvent } from "@shared/schema";
import TimelineEvent from "@/components/Timeline/TimelineEvent";
import BackgroundMusic from "@/components/BackgroundMusic";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Timeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>("pre-revolution");
  const [zoom, setZoom] = useState(1);
  const controls = useAnimation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.6]);

  const eventsQuery = useQuery<HistoricalEvent[]>({
    queryKey: ["/api/events"],
  });

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (eventsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (!eventsQuery.data) {
    return null;
  }

  const events = eventsQuery.data.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dot-pattern" ref={containerRef}>
      <BackgroundMusic />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 w-1 h-full bg-primary/20 z-50"
        style={{ opacity: progressOpacity }}
      >
        <motion.div 
          className="w-full bg-primary"
          style={{ height: progressHeight }}
        />
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg z-50"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/historical-background.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.1
        }} />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 font-serif">
              Dòng thời gian
              <span className="block text-primary mt-4" style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}>
                Cách mạng Tháng Tám
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-24 h-1 bg-primary mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Khám phá các sự kiện quan trọng trong tiến trình Cách mạng Tháng Tám năm 1945
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Category Navigation */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <ScrollArea className="w-full md:w-auto">
                <nav className="flex flex-nowrap md:flex-wrap gap-2 md:gap-4 p-1">
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
                </nav>
              </ScrollArea>

              {!isMobile && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                    disabled={zoom <= 0.5}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div className="w-20 text-center text-sm">
                    {Math.round(zoom * 100)}%
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}
                    disabled={zoom >= 1.5}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="relative"
          style={{ 
            scale: isMobile ? 1 : zoom,
            transformOrigin: "center top"
          }}
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
            />
          </div>

          {/* Events */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="space-y-12"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`relative flex flex-col ${isMobile ? "" : "md:flex-row"} items-start gap-8 ${
                    !isMobile && index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Date Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/20"
                  />

                  {/* Event Card */}
                  <div className={`w-full ${isMobile ? "pl-8" : "md:w-1/2"} ${
                    !isMobile && index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}>
                    <TimelineEvent event={event} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
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
      className={`relative text-sm md:text-lg font-medium whitespace-nowrap ${
        active ? "bg-primary text-primary-foreground" : "hover:text-primary"
      }`}
      onClick={onClick}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 rounded-md"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-[40vh] w-full mb-8 rounded-xl" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
      <div className="space-y-8">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
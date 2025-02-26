import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineEvent from "@/components/Timeline/TimelineEvent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import type { HistoricalEvent } from "@shared/schema";

export default function Timeline() {
  const eventsQuery = useQuery<HistoricalEvent[]>({
    queryKey: ["/api/events"],
  });

  if (eventsQuery.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!eventsQuery.data) {
    return null;
  }

  const preRevolutionEvents = eventsQuery.data.filter(e => e.category === "pre-revolution");
  const revolutionEvents = eventsQuery.data.filter(e => e.category === "revolution");
  const postRevolutionEvents = eventsQuery.data.filter(e => e.category === "post-revolution");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="pt-6">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-4">
                Hành trình Cách mạng Tháng Tám
              </h1>
              <p className="text-lg text-muted-foreground">
                Khám phá các sự kiện lịch sử quan trọng trong tiến trình Cách mạng Tháng Tám năm 1945
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="pre-revolution" className="space-y-6">
          <Card className="border-2 border-primary/20 p-2">
            <TabsList className="w-full justify-start gap-2">
              <TabsTrigger value="pre-revolution" className="text-lg">
                Bối cảnh trước Cách mạng
              </TabsTrigger>
              <TabsTrigger value="revolution" className="text-lg">
                Diễn biến Cách mạng
              </TabsTrigger>
              <TabsTrigger value="post-revolution" className="text-lg">
                Sau Cách mạng
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="pre-revolution">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {preRevolutionEvents.map((event) => (
                <motion.div key={event.id} variants={item}>
                  <TimelineEvent event={event} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="revolution">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {revolutionEvents.map((event) => (
                <motion.div key={event.id} variants={item}>
                  <TimelineEvent event={event} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="post-revolution">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {postRevolutionEvents.map((event) => (
                <motion.div key={event.id} variants={item}>
                  <TimelineEvent event={event} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
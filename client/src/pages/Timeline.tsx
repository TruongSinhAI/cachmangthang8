import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineEvent from "@/components/Timeline/TimelineEvent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Hành trình Cách mạng Tháng Tám
          </h1>
          <p className="text-muted-foreground">
            Khám phá các sự kiện lịch sử quan trọng trong tiến trình Cách mạng Tháng Tám năm 1945
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="pre-revolution" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="pre-revolution">Bối cảnh trước Cách mạng</TabsTrigger>
          <TabsTrigger value="revolution">Diễn biến Cách mạng</TabsTrigger>
          <TabsTrigger value="post-revolution">Sau Cách mạng</TabsTrigger>
        </TabsList>

        <TabsContent value="pre-revolution" className="space-y-4">
          {preRevolutionEvents.map((event) => (
            <TimelineEvent key={event.id} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="revolution" className="space-y-4">
          {revolutionEvents.map((event) => (
            <TimelineEvent key={event.id} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="post-revolution" className="space-y-4">
          {postRevolutionEvents.map((event) => (
            <TimelineEvent key={event.id} event={event} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

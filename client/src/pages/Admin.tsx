import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { HistoricalEvent, InsertEvent, HistoricalContent, InsertContent } from "@shared/schema";
import { insertEventSchema, insertContentSchema } from "@shared/schema";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("events");
  const [editingEvent, setEditingEvent] = useState<HistoricalEvent | null>(null);
  const [editingContent, setEditingContent] = useState<HistoricalContent | null>(null);
  const { toast } = useToast();

  // Event Queries and Mutations
  const eventsQuery = useQuery<HistoricalEvent[]>({
    queryKey: ["/api/events"],
  });

  const createEventMutation = useMutation({
    mutationFn: (data: InsertEvent) =>
      apiRequest("/api/events", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Thành công",
        description: "Đã thêm sự kiện mới",
      });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: InsertEvent }) =>
      apiRequest(`/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Thành công",
        description: "Đã cập nhật sự kiện",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/events/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Thành công",
        description: "Đã xóa sự kiện",
      });
    },
  });

  // Content Queries and Mutations
  const contentsQuery = useQuery<HistoricalContent[]>({
    queryKey: ["/api/contents"],
  });

  const createContentMutation = useMutation({
    mutationFn: (data: InsertContent) =>
      apiRequest("/api/contents", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contents"] });
      toast({
        title: "Thành công",
        description: "Đã thêm nội dung mới",
      });
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: InsertContent }) =>
      apiRequest(`/api/contents/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contents"] });
      toast({
        title: "Thành công",
        description: "Đã cập nhật nội dung",
      });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/contents/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contents"] });
      toast({
        title: "Thành công",
        description: "Đã xóa nội dung",
      });
    },
  });

  // Forms
  const eventForm = useForm<InsertEvent>({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      title: "",
      date: "",
      description: "",
      imageUrl: "",
      category: "revolution",
      order: 1,
    },
  });

  const contentForm = useForm<InsertContent>({
    resolver: zodResolver(insertContentSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "context",
      imageUrl: "",
      order: 1,
    },
  });

  function onSubmitEvent(data: InsertEvent) {
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, data });
    } else {
      createEventMutation.mutate(data);
    }
    eventForm.reset();
    setEditingEvent(null);
  }

  function onSubmitContent(data: InsertContent) {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent.id, data });
    } else {
      createContentMutation.mutate(data);
    }
    contentForm.reset();
    setEditingContent(null);
  }

  if (eventsQuery.isLoading || contentsQuery.isLoading) {
    return <div>Đang tải...</div>;
  }

  const events = eventsQuery.data || [];
  const contents = contentsQuery.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Quản lý Nội dung</h1>
            <TabsList>
              <TabsTrigger value="events">Timeline Sự kiện</TabsTrigger>
              <TabsTrigger value="contents">Nội dung Tổng quan</TabsTrigger>
            </TabsList>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm {selectedTab === "events" ? "Sự kiện" : "Nội dung"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedTab === "events" 
                    ? (editingEvent ? "Chỉnh sửa Sự kiện" : "Thêm Sự kiện Mới")
                    : (editingContent ? "Chỉnh sửa Nội dung" : "Thêm Nội dung Mới")
                  }
                </DialogTitle>
              </DialogHeader>
              {selectedTab === "events" ? (
                <Form {...eventForm}>
                  <form onSubmit={eventForm.handleSubmit(onSubmitEvent)} className="space-y-4">
                    <FormField
                      control={eventForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiêu đề</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={eventForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày tháng</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={eventForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô tả</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={eventForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Hình ảnh</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={eventForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pre-revolution">
                                Bối cảnh trước Cách mạng
                              </SelectItem>
                              <SelectItem value="revolution">
                                Diễn biến Cách mạng
                              </SelectItem>
                              <SelectItem value="post-revolution">
                                Sau Cách mạng
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={eventForm.control}
                      name="order"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thứ tự</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          eventForm.reset();
                          setEditingEvent(null);
                        }}
                      >
                        Hủy
                      </Button>
                      <Button type="submit">
                        {editingEvent ? "Cập nhật" : "Thêm"}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Form {...contentForm}>
                  <form onSubmit={contentForm.handleSubmit(onSubmitContent)} className="space-y-4">
                    <FormField
                      control={contentForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiêu đề</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contentForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nội dung</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-[200px]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contentForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại nội dung</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại nội dung" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="context">
                                Bối cảnh lịch sử
                              </SelectItem>
                              <SelectItem value="process">
                                Diễn biến
                              </SelectItem>
                              <SelectItem value="significance">
                                Ý nghĩa
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contentForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Hình ảnh</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contentForm.control}
                      name="order"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thứ tự</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          contentForm.reset();
                          setEditingContent(null);
                        }}
                      >
                        Hủy
                      </Button>
                      <Button type="submit">
                        {editingContent ? "Cập nhật" : "Thêm"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="events" className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Ngày: {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Danh mục:{" "}
                      {event.category === "pre-revolution"
                        ? "Bối cảnh trước Cách mạng"
                        : event.category === "revolution"
                        ? "Diễn biến Cách mạng"
                        : "Sau Cách mạng"}
                    </p>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingEvent(event);
                        eventForm.reset(event);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa sự kiện này không?"
                          )
                        ) {
                          deleteEventMutation.mutate(event.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contents" className="space-y-4">
          {contents.map((content) => (
            <Card key={content.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Loại nội dung:{" "}
                      {content.type === "context"
                        ? "Bối cảnh lịch sử"
                        : content.type === "process"
                        ? "Diễn biến"
                        : "Ý nghĩa"}
                    </p>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {content.content}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingContent(content);
                        contentForm.reset(content);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa nội dung này không?"
                          )
                        ) {
                          deleteContentMutation.mutate(content.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
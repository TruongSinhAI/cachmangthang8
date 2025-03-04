import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bg_img from "@/public/assets/images/im_bg.jpg";
import { Badge } from "@/components/ui/badge";

// Import tab-specific components
import Boicanh from "../components/Content/Boicanh";
import Chuanbi from "../components/Content/Chuanbi";
import Dienbien from "../components/Content/Dienbien";
import Tinhchat from "../components/Content/Tinhchat";
import Baihoc from "../components/Content/Baihoc";
import Ynghia from "../components/Content/Ynghia";

// TabButton Component for Navigation
function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`relative text-base md:text-lg font-medium whitespace-nowrap transition-all duration-300 ${
        active
          ? "hover:text-primary/90 text-white shadow-lg"
          : "hover:text-primary/90 text-white/70 hover:bg-primary/20"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 rounded-md bg-primary/20"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Button>
  );
}

// Main Content Component
export default function Content() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const [selectedTab, setSelectedTab] = useState("boicanh");

  // Tab components mapping
  const tabComponents = {
    boicanh: Boicanh,
    chuanbi: Chuanbi,
    dienbien: Dienbien,
    tinhchat: Tinhchat,
    baihoc: Baihoc,
    ynghia: Ynghia
  };


  // Dynamically render the selected tab component
  const SelectedTabComponent = tabComponents[selectedTab as keyof typeof tabComponents];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${bg_img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            opacity: 0.15
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl font-bold text-white mb-6 font-serif tracking-tight"
          >
            Tìm hiểu Cách mạng
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-32 h-1 bg-gradient-to-r from-primary/80 to-primary mx-auto my-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Khám phá chi tiết về bối cảnh, diễn biến và ý nghĩa của Cách mạng
            Tháng Tám
          </motion.p>
        </div>
      </section>

      {/* Navigation Tab */}
      <div className="container mx-auto px-4 -mt-10">
        <Card className="border-2 border-primary/30 backdrop-blur-xl shadow-xl bg-background/95">
          <CardContent className="p-3">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <ScrollArea className="w-full md:w-auto">
                <nav className="flex flex-nowrap items-center justify-center md:flex-wrap gap-3 md:gap-5 p-2">
                  <TabButton
                    active={selectedTab === "boicanh"}
                    onClick={() => setSelectedTab("boicanh")}
                  >
                    Bối cảnh thế giới
                  </TabButton>
                  <TabButton
                    active={selectedTab === "chuanbi"}
                    onClick={() => setSelectedTab("chuanbi")}
                  >
                    Bối cảnh và sự chuẩn bị của ta
                  </TabButton>
                  <TabButton
                    active={selectedTab === "dienbien"}
                    onClick={() => setSelectedTab("dienbien")}
                  >
                    Diễn biến chi tiết
                  </TabButton>
                  <TabButton
                    active={selectedTab === "tinhchat"}
                    onClick={() => setSelectedTab("tinhchat")}
                  >
                    Tính chất của cuộc cách mạng
                  </TabButton>
                  <TabButton
                    active={selectedTab === "baihoc"}
                    onClick={() => setSelectedTab("baihoc")}
                  >
                    Bài học
                  </TabButton>
                  <TabButton
                    active={selectedTab === "ynghia"}
                    onClick={() => setSelectedTab("ynghia")}
                  >
                    Ý nghĩa
                  </TabButton>
                </nav>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8"
          >
            <SelectedTabComponent />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary/90 hover:bg-primary text-white shadow-lg z-50 backdrop-blur-sm border border-primary/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
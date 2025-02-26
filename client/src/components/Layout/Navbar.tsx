import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              Cách mạng Tháng Tám
            </a>
          </Link>

          <div className="flex gap-8">
            <Link href="/timeline">
              <a className={cn(
                "relative font-medium hover:text-primary transition-colors",
                location === "/timeline" && "text-primary"
              )}>
                {location === "/timeline" && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.5px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
                Timeline
              </a>
            </Link>
            <Link href="/content">
              <a className={cn(
                "relative font-medium hover:text-primary transition-colors",
                location === "/content" && "text-primary"
              )}>
                {location === "/content" && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.5px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
                Nội dung
              </a>
            </Link>
            <button 
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
              className="relative font-medium hover:text-primary transition-colors"
            >
              Trợ lý AI
            </button>
            <Link href="/admin">
              <a className={cn(
                "relative font-medium hover:text-primary transition-colors flex items-center gap-2",
                location === "/admin" && "text-primary"
              )}>
                {location === "/admin" && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.5px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
                <Lock className="w-4 h-4" />
                Quản trị
              </a>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
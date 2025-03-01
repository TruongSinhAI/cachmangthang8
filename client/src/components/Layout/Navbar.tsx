import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={cn(
        "bg-background/60 backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300",
        scrolled && "shadow-md bg-background/80"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors font-serif">
              Cách mạng Tháng Tám
            </a>
          </Link>

          <div className="flex gap-8">
            {[
              { href: "/timeline", label: "Timeline" },
              { href: "/content", label: "Nội dung" },
              { href: "/game", label: "Trò chơi"},
              { href: "/chatbot", label: "Trợ lý AI" }
            ].map(({ href, label}) => (
              <Link key={href} href={href}>
                <a className={cn(
                  "relative font-medium hover:text-primary transition-colors flex items-center gap-2 py-1",
                  location === href && "text-primary"
                )}>
                  {location === href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[1.5px] left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", bounce: 0.25 }}
                    />
                  )}
                  {label}
                </a>
              </Link>
            ))}
            {/* <button
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
              className="relative font-medium hover:text-primary transition-colors"
            >
              Trợ lý AI
            </button> */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
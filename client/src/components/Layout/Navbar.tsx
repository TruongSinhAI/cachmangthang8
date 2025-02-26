import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold">Cách mạng Tháng Tám</a>
          </Link>
          
          <div className="flex gap-6">
            <Link href="/timeline">
              <a className="hover:text-yellow-300 transition-colors">
                Timeline
              </a>
            </Link>
            <Link href="/content">
              <a className="hover:text-yellow-300 transition-colors">
                Nội dung
              </a>
            </Link>
            <a 
              href="#" 
              className="hover:text-yellow-300 transition-colors"
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
            >
              Trợ lý AI
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

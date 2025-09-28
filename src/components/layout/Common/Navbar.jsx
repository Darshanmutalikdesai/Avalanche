import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Heart,
  MessageCircle,
  Twitter,
  Zap,
  UserPlus,
  Code2,
  CalendarDays,
  LogIn,
} from "lucide-react";
import { Link } from "wouter"; // ✅ Wouter Link

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const canvasRef = useRef(null);
  const puffsCanvasRef = useRef(null);

  // Load Titillium Web font dynamically
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  // Animated background dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const dots = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        ctx.fillStyle = `rgba(64, 191, 191, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Animated glowing puffs
  useEffect(() => {
    const canvas = puffsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const puffs = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 120 + 60,
      opacity: Math.random() * 0.1 + 0.02,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      puffs.forEach((puff) => {
        puff.x += puff.vx;
        puff.y += puff.vy;
        if (puff.x < -puff.radius || puff.x > canvas.width + puff.radius)
          puff.vx *= -1;
        if (puff.y < -puff.radius || puff.y > canvas.height + puff.radius)
          puff.vy *= -1;

        const gradient = ctx.createRadialGradient(
          puff.x,
          puff.y,
          0,
          puff.x,
          puff.y,
          puff.radius
        );
        gradient.addColorStop(0, `rgba(64, 191, 191, ${puff.opacity})`);
        gradient.addColorStop(1, "rgba(64, 191, 191, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const Frame = ({ children, className = "" }) => (
    <div
      className={`relative border border-cyan-400/30 bg-cyan-900/10 backdrop-blur-sm ${className}`}
      style={{ fontFamily: "'Titillium Web', sans-serif" }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
      {children}
    </div>
  );

  const navItems = [
    { name: "Event Registration", href: "/event-registration", icon: UserPlus },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Login", href: "/auth", icon: LogIn },
  ];

  const NavigationModal = () => (
    <div
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center p-4 ${
        isNavigationOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      />
      <canvas
        ref={puffsCanvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.25 }}
      />

      <Frame className="w-full max-w-md sm:max-w-lg p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="bg-gradient-to-b from-cyan-900/20 to-cyan-900/5 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative">
          <button
            onClick={() => setIsNavigationOpen(false)}
            className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 transition-colors p-1"
          >
            <X size={28} />
          </button>

          <nav className="flex flex-col items-center justify-center space-y-6 mb-8 mt-6 w-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsNavigationOpen(false)}
                className="flex items-center space-x-3 p-3 rounded transition-all duration-200 w-full justify-center text-cyan-400/90 hover:text-cyan-300 hover:bg-cyan-400/10 text-2xl font-light"
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-cyan-400/30 pt-4 w-full flex justify-center">
            <div className="flex justify-center flex-wrap gap-6">
              {[
                { icon: Heart, href: "#sponsor", label: "Sponsor" },
                { icon: Github, href: "#github", label: "GitHub" },
                { icon: MessageCircle, href: "#discord", label: "Discord" },
                { icon: Twitter, href: "#twitter", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={() => setIsNavigationOpen(false)}
                  className="text-cyan-400/80 hover:text-cyan-300 transition-colors p-2"
                  title={social.label}
                >
                  <social.icon size={26} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );

  return (
    <header className="relative z-10 w-full">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <Zap size={16} className="text-black" />
          </div>
          <span className="text-cyan-400 text-lg sm:text-xl font-light tracking-wider">
            AVALANCHE
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 text-base text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <item.icon size={18} />
              <span className="font-light">{item.name}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsNavigationOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <NavigationModal />
    </header>
  );
};

export default NavigationBar;

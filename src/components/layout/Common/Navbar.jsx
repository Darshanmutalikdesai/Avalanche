import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Github, Heart, MessageCircle, Twitter, 
  FileText, Grid3X3, Play, Gauge, Zap 
} from 'lucide-react';

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const canvasRef = useRef(null);

  // Load Titillium Web font dynamically
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, []);

  // Animated background dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dots = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        ctx.fillStyle = `rgba(64, 191, 191, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const Frame = ({ children, className = "" }) => (
    <div className={`relative border border-cyan-400/30 bg-cyan-900/10 backdrop-blur-sm ${className}`} style={{ fontFamily: "'Titillium Web', sans-serif" }}>
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
      {children}
    </div>
  );

  const NavigationModal = () => (
    <div className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center p-4 ${
      isNavigationOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`} style={{ fontFamily: "'Titillium Web', sans-serif" }}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      />
      
      <Frame className="w-full max-w-md sm:max-w-lg p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="bg-gradient-to-b from-cyan-900/20 to-cyan-900/5 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-cyan-400 text-xl font-light tracking-wide">Navigate</h2>
            <button
              onClick={() => setIsNavigationOpen(false)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
          
          <hr className="border-cyan-400/30 mb-6" />
          
          <nav className="space-y-3 mb-8">
            {[
              { name: 'Docs', icon: FileText, href: '#docs' },
              { name: 'Samples', icon: Grid3X3, href: '#samples', active: true },
              { name: 'Play', icon: Play, href: '#play' },
              { name: 'Perf', icon: Gauge, href: '#perf' },
            ].map((item) => (
              <div key={item.name} className="flex items-center">
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded transition-all duration-200 w-full ${
                    item.active 
                      ? 'bg-cyan-400/20 text-cyan-300 border-l-2 border-cyan-400' 
                      : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-400/10'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-light">{item.name}</span>
                </a>
                {item.name === 'Docs' && (
                  <button className="ml-auto text-cyan-400/60 hover:text-cyan-300 p-2">
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            ))}
          </nav>
          
          <div className="border-t border-cyan-400/30 pt-4">
            <div className="flex justify-center flex-wrap gap-4 mb-4">
              {[
                { icon: Heart, href: '#sponsor', label: 'Sponsor' },
                { icon: Github, href: '#github', label: 'GitHub' },
                { icon: MessageCircle, href: '#discord', label: 'Discord' },
                { icon: Twitter, href: '#twitter', label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-cyan-400/80 hover:text-cyan-300 transition-colors p-2"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );

  return (
    <header className="relative z-10 w-full" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="text-cyan-400 text-lg sm:text-xl font-light tracking-wider">AVALANCHE</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-3 sm:space-x-6">
            {[
              { name: 'Docs', icon: FileText },
              { name: 'Samples', icon: Grid3X3, active: true },
              { name: 'Play', icon: Play },
              { name: 'Perf', icon: Gauge },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className={`flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 text-sm sm:text-base ${
                  item.active 
                    ? 'text-cyan-300 bg-cyan-400/20 border border-cyan-400/30' 
                    : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-400/10'
                }`}
              >
                <item.icon size={16} />
                <span className="font-light">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop Social */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            {[
              { icon: Heart, href: '#sponsor' },
              { icon: Github, href: '#github' },
              { icon: MessageCircle, href: '#discord' },
              { icon: Twitter, href: '#twitter' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-cyan-400/80 hover:text-cyan-300 transition-colors p-1 sm:p-2"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsNavigationOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Modal */}
      <NavigationModal />
    </header>
  );
};

export default NavigationBar;


import React, { useState, useEffect } from 'react';

const ArwesOAuthSignup = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProvider, setActiveProvider] = useState(null);
  const [animateGlow, setAnimateGlow] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const glowInterval = setInterval(() => {
      setAnimateGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(glowInterval);
  }, []);

  const oauthProviders = [
    { 
      name: 'Google', 
      icon: '🌐',
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-400',
      shadowColor: 'shadow-blue-400/50'
    },
    { 
      name: 'GitHub', 
      icon: '⚡',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-400',
      shadowColor: 'shadow-gray-400/50'
    },
    { 
      name: 'Discord', 
      icon: '🎮',
      color: 'from-indigo-400 to-purple-600',
      borderColor: 'border-indigo-400',
      shadowColor: 'shadow-indigo-400/50'
    },
    { 
      name: 'Microsoft', 
      icon: '🔷',
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'border-blue-500',
      shadowColor: 'shadow-blue-500/50'
    }
  ];

  const handleOAuthLogin = (provider) => {
    setActiveProvider(provider);
    setTimeout(() => {
      alert(`Initiating ${provider} OAuth flow...`);
      setActiveProvider(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900 z-0">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(38, 218, 253, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(38, 218, 253, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-8 md:py-0">
        <div className={`
          max-w-md w-full transform transition-all duration-1000 ease-out
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}>
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8">
            <div className={`
              inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-4
              bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg
              shadow-lg shadow-cyan-500/50
              ${animateGlow ? "shadow-cyan-500/80 scale-110" : "shadow-cyan-500/50 scale-100"}
              transition-all duration-500
            `}>
              <span className="text-xl md:text-2xl">🚀</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono tracking-wider">
              <span className="text-cyan-400">ARWES</span> AUTH
            </h1>

            <p className="text-cyan-200 text-xs md:text-sm uppercase tracking-widest">
              NEURAL INTERFACE ACCESS
            </p>

            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          </div>

          {/* Main Panel */}
          <div className="relative">
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>

            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-400/30 p-4 md:p-8 relative overflow-hidden shadow-lg shadow-cyan-500/10">
              {/* Background circuit pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    d="M20,20 L80,20 L80,50 L50,50 L50,80 L80,80"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                  <circle cx="80" cy="20" r="2" fill="currentColor" />
                  <circle cx="50" cy="50" r="2" fill="currentColor" />
                  <circle cx="50" cy="80" r="2" fill="currentColor" />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 text-center font-mono">
                  SELECT AUTHENTICATION PROTOCOL
                </h2>

                {/* OAuth Providers */}
                <div className="space-y-3 md:space-y-4">
                  {oauthProviders.map((provider, index) => (
                    <button
                      key={provider.name}
                      onClick={() => handleOAuthLogin(provider.name)}
                      disabled={activeProvider === provider.name}
                      className={`
                        w-full p-3 md:p-4 border-2 ${provider.borderColor} bg-gray-800/50 
                        text-white font-semibold text-left flex items-center justify-between
                        transition-all duration-300 group hover:bg-gray-700/50
                        hover:shadow-lg hover:${provider.shadowColor}
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transform hover:scale-[1.02] active:scale-[0.98]
                        ${activeProvider === provider.name ? "animate-pulse" : ""}
                      `}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                      }}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className={`
                          w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r ${provider.color} 
                          flex items-center justify-center text-lg md:text-xl
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          {provider.icon}
                        </div>
                        <span className="font-mono tracking-wide text-sm md:text-base">
                          {activeProvider === provider.name
                            ? "CONNECTING..."
                            : `CONNECT WITH ${provider.name.toUpperCase()}`}
                        </span>
                      </div>

                      <div className={`
                        w-3 h-3 border-2 border-current rounded-full
                        ${activeProvider === provider.name ? "animate-spin border-t-transparent" : ""}
                      `}></div>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center my-6 md:my-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                  <span className="px-4 text-cyan-400 text-xs font-mono">OR</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                </div>

                {/* Manual Entry Option */}
                <button
                  className="w-full p-3 md:p-4 border-2 border-amber-400 bg-amber-900/20 text-amber-200 font-semibold transition-all duration-300 hover:bg-amber-800/30 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-[1.02] active:scale-[0.98] font-mono"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-lg md:text-xl">⚠️</span>
                    <span className="text-sm md:text-base">MANUAL CREDENTIAL INPUT</span>
                  </div>
                </button>

                {/* Footer */}
                <div className="mt-6 md:mt-8 text-center">
                  <p className="text-gray-400 text-xs font-mono mb-2">
                    SECURE CONNECTION ESTABLISHED
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i} ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-22px); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes float-7 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-24px); }
        }
        @keyframes float-8 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-9 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-28px); }
        }
        @keyframes float-10 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float-11 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-26px); }
        }
        @keyframes float-12 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-19px); }
        }
        @keyframes float-13 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-21px); }
        }
        @keyframes float-14 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-17px); }
        }
      `}</style>
    </div>
  );
};

export default ArwesOAuthSignup;


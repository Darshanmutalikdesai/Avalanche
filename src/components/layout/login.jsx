import React, { useState, useEffect } from 'react';

import background from "../../assets/backround1.mp4"

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
      glowColor: 'rgba(59, 130, 246, 0.6)',
    },
    { 
      name: 'GitHub', 
      icon: '⚡',
      color: 'from-gray-400 to-gray-600',
      glowColor: 'rgba(107, 114, 128, 0.6)',
    },
    { 
      name: 'Discord', 
      icon: '🎮',
      color: 'from-indigo-400 to-purple-600',
      glowColor: 'rgba(99, 102, 241, 0.6)',
    },
    { 
      name: 'Microsoft', 
      icon: '🔷',
      color: 'from-blue-500 to-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.6)',
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
    <div className="fixed inset-0 bg-[#000f1e] overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={background} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-8">
        <div className={`
          max-w-md w-full transform transition-all duration-1000 ease-out
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}>
          
          {/* Main Authentication Panel */}
          <div className="
            group relative text-center
            bg-[rgba(0,15,30,0.85)]
            border border-[#00f7ff]
            rounded-xl
            shadow-[0_0_20px_rgba(0,247,255,0.3)]
            transition-all duration-300 ease-in-out
            hover:shadow-[0_0_25px_#00f7ff,0_0_40px_#00f7ff]
            px-6 pt-20 pb-8
            overflow-visible
          ">
            
            {/* Floating Auth Icon */}
            <div className={`
              absolute -top-16 left-1/2 -translate-x-1/2 
              transition-all duration-700 ease-in-out
              ${animateGlow ? "scale-110" : "scale-100"}
            `}>
              <div className="
                w-32 h-32
                rounded-full 
                bg-gradient-to-br from-[#00f7ff] to-[#0066cc]
                shadow-[0_0_25px_rgba(0,247,255,0.6)]
                border-2 border-[#00f7ff40]
                flex items-center justify-center
                transition-transform duration-600 ease-in-out
                group-hover:scale-[1.08]
              ">
                <span className="text-4xl">🚀</span>
              </div>
            </div>

            {/* Header */}
            <div className="mt-8 mb-8">
              <h1 className="
                text-2xl md:text-3xl font-semibold text-[#ffcc00] mb-2 
                drop-shadow-[0_0_10px_#ffcc00]
              ">
                AVALANCHE AUTH
              </h1>
              <p className="
                text-sm text-[#cfcfcf] mb-4 
                min-h-[20px]
              ">
                Select your authentication protocol
              </p>
            </div>

            {/* OAuth Provider Cards */}
            <div className="space-y-4 mb-6">
              {oauthProviders.map((provider, index) => (
                <div
                  key={provider.name}
                  className="
                    group/card relative text-left
                    bg-[rgba(0,15,30,0.9)]
                    border border-[#00f7ff]
                    rounded-lg
                    shadow-[0_0_15px_rgba(0,247,255,0.2)]
                    transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_20px_rgba(0,247,255,0.5)]
                    overflow-hidden
                  "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <button
                    onClick={() => handleOAuthLogin(provider.name)}
                    disabled={activeProvider === provider.name}
                    className="
                      w-full p-4 text-white font-semibold flex items-center justify-between
                      transition-all duration-300
                      hover:bg-[rgba(0,247,255,0.1)]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-[1.02] active:scale-[0.98]
                    "
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-10 h-10 rounded-full bg-gradient-to-r ${provider.color} 
                        flex items-center justify-center text-xl
                        shadow-[0_0_15px_${provider.glowColor}]
                        group-hover/card:scale-110 transition-transform duration-300
                      `}>
                        {provider.icon}
                      </div>
                      <span className="text-[#cfcfcf] tracking-wide">
                        {activeProvider === provider.name
                          ? "Connecting..."
                          : `Connect with ${provider.name}`}
                      </span>
                    </div>

                    <div className={`
                      w-6 h-6 border-2 border-[#00f7ff] rounded-full flex items-center justify-center
                      ${activeProvider === provider.name ? "animate-spin" : ""}
                    `}>
                      {activeProvider === provider.name ? (
                        <div className="w-2 h-2 bg-[#00f7ff] rounded-full"></div>
                      ) : (
                        <div className="w-1 h-1 bg-[#00f7ff] rounded-full"></div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent opacity-50"></div>
              <span className="px-4 text-[#00f7ff] text-xs font-bold tracking-widest">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent opacity-50"></div>
            </div>

            {/* Manual Entry Button */}
            <div className="
              group/manual relative text-center
              bg-[rgba(255,204,0,0.1)]
              border border-[#ffcc00]
              rounded-lg
              shadow-[0_0_15px_rgba(255,204,0,0.3)]
              transition-all duration-300 ease-in-out
              hover:shadow-[0_0_20px_rgba(255,204,0,0.5)]
              overflow-hidden
            ">
              <button className="
                w-full p-4 text-[#ffcc00] font-semibold transition-all duration-300
                hover:bg-[rgba(255,204,0,0.1)]
                transform hover:scale-[1.02] active:scale-[0.98]
                flex items-center justify-center space-x-3
              ">
                <span className="text-xl">⚠️</span>
                <span className="tracking-wide">Manual Credential Input</span>
              </button>
            </div>

            {/* Footer Status */}
            <div className="mt-6 text-center">
              <p className="text-[#00f7ff] text-xs font-bold mb-2 tracking-widest">
                SECURE CONNECTION ACTIVE
              </p>
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"
                    style={{ 
                      animationDelay: `${i * 300}ms`,
                      boxShadow: '0_0_10px_rgba(0,255,0,0.8)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ArwesOAuthSignup;
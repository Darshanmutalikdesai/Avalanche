import{r as s,u as v,j as e}from"./index-DDyKt_DV.js";import{N as j,m as o,L as N}from"./Navbar-BcaL3dAo.js";import{S as k}from"./star-DkUumd8N.js";const A="/assets/R2D2-BPFrEAcC.png",E=({onClick:n})=>{const[i,l]=s.useState(!1);return e.jsxs("button",{onClick:n,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),className:`
        relative px-4 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base text-white font-semibold
        bg-gradient-to-r from-purple-600 to-pink-600
        rounded-lg shadow-lg
        transition-all duration-300 font-['Nasalization']
        ${i?"shadow-pink-500/60 shadow-2xl":""}
      `,children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-700 ${i?"opacity-20":""}`,style:{transform:i?"translateX(100%)":"translateX(-100%)",transition:"transform 0.7s, opacity 0.7s"}}),e.jsxs("div",{className:"flex items-center gap-2 relative z-10",children:[e.jsx(k,{className:`transition-all duration-500 ${i?"rotate-180 scale-110 fill-white":""}`,size:18}),e.jsx("span",{children:"Explore"})]})]})};function I(){const n=s.useRef(null),i=v(),[l,g]=s.useState(!1),[b,c]=s.useState(!1),[m,x]=s.useState([]),[d,h]=s.useState(""),u=()=>{d.trim()&&(x([...m,{sender:"user",text:d}]),h(""),setTimeout(()=>{x(t=>[...t,{sender:"bot",text:"Beep boop! R2-D2 at your service 🤖"}])},600))},y=t=>{t.key==="Enter"&&u()};s.useEffect(()=>{const a=document.getElementById("star-container");if(a){a.innerHTML="";for(let f=0;f<120;f++){const r=document.createElement("div");r.className="star",r.style.top=Math.random()*100+"%",r.style.left=Math.random()*100+"%",r.style.animationDelay=Math.random()*5+"s";const p=Math.random()*2+1;r.style.width=p+"px",r.style.height=p+"px",a.appendChild(r)}}},[]),s.useEffect(()=>{n.current&&(n.current.style.backgroundColor="rgba(0, 0, 0, 0.4)",requestAnimationFrame(()=>{n.current.style.transition="background-color 2s ease-in-out",n.current.style.backgroundColor="rgba(0, 0, 0, 0.2)"}))},[]);const w=()=>{g(!0),setTimeout(()=>{i("/auth")},1500)};return e.jsxs("div",{className:"relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth",style:{background:"radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)"},children:[e.jsx("div",{id:"star-container",className:"stars absolute w-full h-full"}),e.jsx("div",{ref:n,className:"absolute top-0 left-0 w-full h-full z-[5]"}),e.jsx("div",{className:"relative z-[60]",children:e.jsx(j,{})}),e.jsxs("div",{className:`
          relative z-[10] flex flex-col items-center 
          justify-start sm:justify-center md:justify-center lg:justify-center
          min-h-screen text-center 
          px-4 sm:px-6 md:px-8 lg:px-16
          pt-[25%] sm:pt-6 md:pt-0
        `,children:[e.jsx(o.img,{src:N,alt:"Avalanche Logo",className:"w-40 xs:w-44 sm:w-40 md:w-56 lg:w-72 xl:w-80 mb-2",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:1.2,ease:"easeOut"}}),e.jsx(o.h1,{className:"text-4xl xs:text-5xl sm:text-3xl md:text-5xl lg:text-9xl text-white drop-shadow-lg font-nasal font-bold mt-2 sm:-mt-6",initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:1,delay:.3,ease:"easeOut"},children:e.jsx("b",{children:"A V A L A N C H E '25"})}),e.jsx(o.p,{className:"text-lg xs:text-xl sm:text-base md:text-lg lg:text-2xl text-white drop-shadow-md mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl font-orbitron",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:1,delay:.6,ease:"easeOut"},children:e.jsx("b",{children:"DISCOVER THE INFINITE"})}),e.jsx(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:1,delay:.9,ease:"easeOut"},children:e.jsx(E,{onClick:w})}),e.jsx("div",{className:"absolute inset-x-0 bottom-[20%] sm:bottom-10 md:bottom-8 flex justify-center z-20",children:e.jsx("div",{className:"animate-slide",children:e.jsx("img",{src:A,alt:"R2-D2",className:`h-32 sm:h-40 w-auto drop-shadow-lg cursor-pointer 
                       hover:scale-110 transition-transform 
                       animate-float animate-wiggle animate-glow`,onClick:()=>c(!0)})})})]}),e.jsxs("section",{id:"about",className:"relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-black/60 backdrop-blur-md border-t border-white/10",children:[e.jsx("h2",{className:"text-4xl md:text-5xl text-white font-bold mb-6",children:"About Avalanche"}),e.jsx("p",{className:"text-gray-300 text-lg max-w-3xl font-orbitron mx-auto leading-relaxed",children:"Avalanche is a tech and cultural fest celebrating innovation, creativity, and collaboration. Each year, thousands of brilliant minds gather to showcase their ideas and ignite the spark of the future. From robotics to art, from AI to design — Avalanche unites them all."})]}),e.jsxs("section",{id:"glances",className:"relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-gradient-to-b from-gray-900 to-black border-t border-white/10",children:[e.jsx("h2",{className:"text-4xl md:text-5xl text-white font-bold mb-10",children:"Avalanche '24 Glances"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:["Hackathon Highlights","Robowars Showdown","Gaming Arena","Cultural Extravaganza","Tech Talks & Panels","Award Ceremony"].map((t,a)=>e.jsxs(o.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:a*.1},className:"bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg hover:shadow-pink-500/40 transition-all",children:[e.jsx("h3",{className:"text-xl font-semibold font-orbitron mb-2",children:t}),e.jsx("p",{className:"text-gray-300 text-sm",children:"A glimpse into one of the most exciting events of Avalanche ‘24."})]},a))})]}),e.jsx("footer",{className:"bg-black/70 border-t border-white/10 text-center py-6 text-gray-400 text-sm",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," Avalanche. All rights reserved | Tech team of KLS GIT"]})}),b&&e.jsxs("div",{className:"fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden",children:[e.jsxs("div",{className:"bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold",children:"R2"}),e.jsx("span",{className:"font-semibold",children:"R2-D2 Assistant"})]}),e.jsx("button",{onClick:()=>c(!1),className:"text-white hover:text-gray-200 text-xl font-bold",children:"×"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-4 space-y-3",children:m.map((t,a)=>e.jsx("div",{className:`flex ${t.sender==="user"?"justify-end":"justify-start"}`,children:e.jsx("div",{className:`max-w-xs px-4 py-2 rounded-lg ${t.sender==="user"?"bg-blue-600 text-white":"bg-gray-200 text-gray-800"}`,children:t.text})},a))}),e.jsx("div",{className:"p-4 border-t border-gray-200",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{type:"text",value:d,onChange:t=>h(t.target.value),onKeyPress:y,placeholder:"Type a message...",className:"flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"}),e.jsx("button",{onClick:u,className:"bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition",children:"Send"})]})})]}),e.jsx("style",{children:`
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          max-width: 100vw;
        }
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 3s infinite alternate, drift 20s linear infinite;
        }
        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(20px, 20px); }
        }
        @keyframes slide {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); }
          50% { filter: drop-shadow(0 0 16px #2563eb); }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `})]})}export{I as H};

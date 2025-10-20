import{r as l,u as v,j as e}from"./index-DDyKt_DV.js";const k=()=>{const[i,c]=l.useState(["","","","","",""]),[x,f]=l.useState(!1),[p,d]=l.useState(""),[r,u]=l.useState(!1),o=l.useRef([]),h=v();l.useEffect(()=>{var t;(t=o.current[0])==null||t.focus()},[]);const m=(t,s)=>{var n;if(s&&!/^\d$/.test(s))return;const a=[...i];a[t]=s,c(a),d(""),s&&t<5&&((n=o.current[t+1])==null||n.focus())},y=(t,s)=>{var a;s.key==="Backspace"&&!i[t]&&t>0&&((a=o.current[t-1])==null||a.focus())},g=t=>{var n;t.preventDefault();const s=t.clipboardData.getData("text").slice(0,6);if(!/^\d+$/.test(s))return;const a=s.split("");c([...a,...Array(6-a.length).fill("")]),(n=o.current[Math.min(s.length,5)])==null||n.focus()},b=()=>{const t=i.join("");if(t.length!==6){d("Please enter all 6 digits");return}u(!0),setTimeout(()=>{alert(`OTP Verified: ${t}`),h("/auth")},500)},j=()=>{var t;c(["","","","","",""]),d(""),u(!1),(t=o.current[0])==null||t.focus(),alert("OTP has been resent!")};return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1929] to-[#051320] flex items-center justify-center p-4",style:{fontFamily:"Nasalization, sans-serif"},children:[e.jsx("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[...Array(50)].map((t,s)=>e.jsx("div",{className:"absolute w-1 h-1 bg-[#00f7ff] rounded-full opacity-30",style:{top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,animation:`float ${3+Math.random()*4}s ease-in-out infinite`,animationDelay:`${Math.random()*2}s`}},s))}),e.jsx("style",{jsx:!0,children:`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}),e.jsx("div",{className:"relative w-full max-w-md",onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:e.jsxs("div",{className:`
            relative w-full
            bg-gradient-to-br from-[#0a1929] to-[#051320]
            p-8 sm:p-10
            transition-all duration-500 ease-out
            ${x?"shadow-[0_0_40px_rgba(0,247,255,0.6)]":"shadow-[0_0_20px_rgba(0,247,255,0.3)]"}
          `,style:{clipPath:"polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)"},children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsx("div",{className:`
                w-24 h-24 rounded-full
                bg-[#00f7ff]
                border-4 border-[#00f7ff]
                shadow-[0_0_20px_rgba(0,247,255,0.6)]
                flex items-center justify-center
                transition-all duration-500
                ${x?"scale-110 shadow-[0_0_30px_rgba(0,247,255,0.9)]":"scale-100"}
              `,children:e.jsx("svg",{className:"w-12 h-12 text-[#051320]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})})}),e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-[#00f7ff] drop-shadow-[0_0_15px_rgba(0,247,255,0.8)] mb-2",children:"VERIFY OTP"}),e.jsx("p",{className:"text-sm text-[#b0f7ff] opacity-80",children:"Enter the 6-digit code sent to your device"})]}),e.jsx("div",{className:"flex justify-center gap-2 sm:gap-3 mb-6",children:i.map((t,s)=>e.jsx("input",{ref:a=>o.current[s]=a,type:"text",maxLength:1,value:t,onChange:a=>m(s,a.target.value),onKeyDown:a=>y(s,a),onPaste:g,className:`
                  w-12 h-14 sm:w-14 sm:h-16
                  text-center text-2xl font-bold
                  bg-[rgba(0,247,255,0.05)]
                  border-2 ${r?"border-[#25D366]":"border-[#00f7ff]"}
                  rounded-lg
                  text-[#00f7ff]
                  focus:outline-none focus:border-[#ffcc00] focus:shadow-[0_0_15px_rgba(255,204,0,0.6)]
                  transition-all duration-300
                  ${r?"shadow-[0_0_15px_rgba(37,211,102,0.6)]":""}
                `},s))}),p&&e.jsx("div",{className:"text-center mb-4",children:e.jsx("p",{className:"text-red-400 text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",children:p})}),r&&e.jsx("div",{className:"text-center mb-4",children:e.jsx("p",{className:"text-[#25D366] text-sm drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]",children:"✓ OTP Verified Successfully!"})}),e.jsx("button",{onClick:b,disabled:r,className:`
              w-full py-3 mb-4
              bg-gradient-to-r from-[#00f7ff] to-[#00c4cc]
              text-[#051320] font-bold text-lg
              rounded-lg
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(0,247,255,0.8)]
              hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              ${r?"opacity-50":""}
            `,children:r?"VERIFIED":"VERIFY OTP"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{onClick:j,className:"text-[#ffcc00] text-sm font-semibold hover:text-[#ffd700] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]",children:"Didn't receive code? RESEND"})}),e.jsx("div",{className:"absolute inset-0 pointer-events-none",style:{clipPath:"polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)",boxShadow:"inset 0 0 0 2px #00f7ff"}}),e.jsxs("svg",{className:"absolute top-0 left-0 w-full h-full pointer-events-none",style:{overflow:"visible"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"goldGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",style:{stopColor:"#ffcc00",stopOpacity:1}}),e.jsx("stop",{offset:"100%",style:{stopColor:"#ff9900",stopOpacity:1}})]})}),e.jsx("line",{x1:"0",y1:"20",x2:"20",y2:"0",stroke:"url(#goldGradient)",strokeWidth:"3"}),e.jsx("line",{x1:"0",y1:"20",x2:"0",y2:"5",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"20",y1:"0",x2:"5",y2:"0",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"100%",y1:"20",x2:"calc(100% - 20px)",y2:"0",stroke:"url(#goldGradient)",strokeWidth:"3"}),e.jsx("line",{x1:"100%",y1:"20",x2:"100%",y2:"5",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"calc(100% - 20px)",y1:"0",x2:"calc(100% - 5px)",y2:"0",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"0",y1:"calc(100% - 20px)",x2:"20",y2:"100%",stroke:"url(#goldGradient)",strokeWidth:"3"}),e.jsx("line",{x1:"0",y1:"calc(100% - 20px)",x2:"0",y2:"calc(100% - 5px)",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"20",y1:"100%",x2:"5",y2:"100%",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"100%",y1:"calc(100% - 20px)",x2:"calc(100% - 20px)",y2:"100%",stroke:"url(#goldGradient)",strokeWidth:"3"}),e.jsx("line",{x1:"100%",y1:"calc(100% - 20px)",x2:"100%",y2:"calc(100% - 5px)",stroke:"url(#goldGradient)",strokeWidth:"2"}),e.jsx("line",{x1:"calc(100% - 20px)",y1:"100%",x2:"calc(100% - 5px)",y2:"100%",stroke:"url(#goldGradient)",strokeWidth:"2"})]})]})})]})};export{k as default};

import{r as o,j as e}from"./index-DDyKt_DV.js";import{N as l}from"./Navbar-BcaL3dAo.js";const c=()=>{const t=o.useRef(null);return o.useEffect(()=>{const r=s=>{const n=s.target.closest(".page");if(!n)return;const a=parseInt(n.style.getPropertyValue("--page-number"));n.classList.contains("past")?(n.classList.remove("past"),a===0&&window.innerWidth>768&&t.current&&(t.current.style.transform="translateZ(-700px) rotateY(24deg)")):(n.classList.add("past"),a===0&&window.innerWidth>768&&t.current&&(t.current.style.transform="translateZ(-700px) rotateY(24deg) translateX(200px)"))},i=t.current;return i&&i.addEventListener("click",r),()=>{i&&i.removeEventListener("click",r)}},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        *, *:before, *:after {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        .book-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          perspective: 2500px;
          transform-style: preserve-3d;
          width: 100%;
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        }
        
        .book {
          display: block;
          background: radial-gradient(#1a1a2e, #0f0f1e);
          position: relative;
          height: 80vmin;
          width: 70vmin;
          perspective: 1900px;
          perspective-origin: center;
          transform: translateZ(-700px) rotateY(24deg);
          transform-style: preserve-3d;
          transition: 0.5s transform cubic-bezier(.17,.84,.44,1);
          counter-reset: x -1;
          cursor: pointer;
          top: 50px;
        }
        
        .book:hover, .book:active {
          transform: translateZ(-700px) rotateY(0deg) scale(0.85);
        }
        
        .page {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(rgba(255,255,255,.97), rgba(215,215,225,.97));
          box-shadow: inset 0 0 64px rgba(0,0,0,0.2);
          transform-origin: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          transform: rotateY(calc(calc(var(--total-pages) * -0.5deg) + calc(var(--page-number) * 0.5deg)));
          padding: 3vmin 6vmin;
          z-index: calc(var(--total-pages) - var(--page-number));
          outline: 1px solid transparent;
          perspective: inherit;
          backface-visibility: visible;
          transform-style: preserve-3d;
          transition: 0.5s transform cubic-bezier(.45,.05,.55,.95);
          font-size: 3.5vmin;
          line-height: 1.6;
        }
        
        .page.past {
          transform: rotateY(calc(-178deg + calc(var(--page-number) * 2deg)));
          z-index: calc(1 + var(--total-pages) + var(--page-number));
          transition: 0.4s transform cubic-bezier(.45,.05,.55,.95);
        }
        
        .page::before {
          content: counter(x)'.';
          counter-increment: x 1;
          position: absolute;
          bottom: 2vmin;
          right: 3vmin;
          font-size: 3vmin;
          color: #666;
        }
        
        .page:after {
          content: "";
          display: block;
          position: absolute;
          transform: translateZ(-1px) rotateX(180deg);
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: rgba(230,235,240,.9);
          backface-visibility: hidden;
          outline: solid 1px transparent;
        }
        
        .cover {
          background: radial-gradient(55% 75% at 50% 30%, #1a4d8f, #0d2647);
          display: flex;
          flex-direction: column;
          color: white;
          box-shadow: inset 0 0 0 2vmin #0d2647, inset 0 0 0 2.4vmin rgba(26, 77, 143, 0.4);
          align-items: center;
          justify-content: center;
        }
        
        .cover h1 {
          font-size: min(2.8em, 5.6vmin);
          line-height: 1.2;
          text-align: center;
          text-shadow: 1px -2px 2px rgba(20,0,0,.5);
          margin: 0;
        }
        
        .logo-placeholder {
          width: 15vmin;
          height: 15vmin;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3vmin;
          font-size: 6vmin;
        }
        
        .book-spine {
          text-align: center;
          background: #0d2647;
          padding: 1vmin;
          font-size: 5vmin;
          transform: rotateZ(90deg) rotateX(-84deg);
          transform-origin: left top;
          width: 80vmin;
          color: white;
          outline: solid 1px transparent;
          font-weight: bold;
        }
        
        .page p {
          margin: 0 0 2vmin 0;
          color: #333;
        }
        
        .page h2 {
          color: #1a4d8f;
        }
        
        .download-btn {
          display: inline-block;
          padding: 1.5vmin 3vmin;
          background: linear-gradient(135deg, #1a4d8f, #0d2647);
          color: white;
          text-decoration: none;
          border-radius: 0.5vmin;
          font-weight: bold;
          font-size: 3vmin;
          margin-top: 2vmin;
          transition: all 0.3s ease;
          box-shadow: 0 0.5vmin 1vmin rgba(26, 77, 143, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .download-btn:hover {
          transform: translateY(-0.3vmin);
          box-shadow: 0 1vmin 2vmin rgba(26, 77, 143, 0.5);
          background: linear-gradient(135deg, #2361b8, #1a4d8f);
        }
      `}),e.jsx("div",{className:"book-wrapper",children:e.jsxs("div",{ref:t,className:"book",style:{"--total-pages":"6","--book-offset":"6deg"},children:[e.jsxs("section",{className:"page cover",style:{"--page-number":"0"},children:[e.jsx("div",{className:"logo-placeholder",children:"🌠"}),e.jsxs("h1",{children:["AVALANCHE 2025",e.jsx("br",{}),"Rulebook"]}),e.jsx("p",{style:{marginTop:"2vmin",fontSize:"3vmin",opacity:.9},children:"by Tech Team"})]}),e.jsxs("section",{className:"page",style:{"--page-number":"1"},children:[e.jsx("h2",{style:{fontSize:"4.5vmin",marginBottom:"2vmin"},children:"Introduction"}),e.jsx("p",{children:"Welcome to AVALANCHE 2025, the premier technical and cultural fest organized by KLS GIT."}),e.jsx("p",{children:"This rulebook contains all the guidelines and regulations for participating in various events throughout the fest."})]}),e.jsxs("section",{className:"page",style:{"--page-number":"2"},children:[e.jsx("h2",{style:{fontSize:"4.5vmin",marginBottom:"2vmin"},children:"General Rules"}),e.jsx("p",{children:"• All participants must register before the event begins."}),e.jsx("p",{children:"• Valid student ID cards must be presented upon request."}),e.jsx("p",{children:"• Participants must adhere to the code of conduct at all times."})]}),e.jsxs("section",{className:"page",style:{"--page-number":"3"},children:[e.jsx("h2",{style:{fontSize:"4.5vmin",marginBottom:"2vmin"},children:"Technical Events"}),e.jsx("p",{children:"Technical competitions will test your coding, innovation, and problem-solving abilities."}),e.jsx("p",{children:"Teams must consist of 2-4 members unless otherwise specified."})]}),e.jsxs("section",{className:"page",style:{"--page-number":"4"},children:[e.jsx("h2",{style:{fontSize:"4.5vmin",marginBottom:"2vmin"},children:"Cultural Events"}),e.jsx("p",{children:"Showcase your artistic talents in dance, music, drama, and more."}),e.jsx("p",{children:"Registration for cultural events closes 24 hours before the performance."})]}),e.jsxs("section",{className:"page",style:{"--page-number":"5"},children:[e.jsx("h2",{style:{fontSize:"4.5vmin",marginBottom:"2vmin"},children:"Contact Us"}),e.jsx("p",{children:"For queries and support, reach out to the organizing committee."}),e.jsxs("p",{children:["Email: avalanche@klsgit.edu",e.jsx("br",{}),"Phone: +91 1234567890"]}),e.jsx("a",{href:"https://drive.google.com/file/d/1GUH-qzU-dZKmMdTWaK7i5mRaZ62UQQNA/view?usp=sharing",target:"_blank",rel:"noopener noreferrer",className:"download-btn",children:"📄 Download Official Rulebook"}),e.jsx("p",{style:{marginTop:"3vmin",fontStyle:"italic",opacity:.8,fontSize:"2.8vmin"},children:"Click on any page to flip through the book!"})]}),e.jsx("div",{className:"book-spine",children:"KLS GIT AVALANCHE 2025"})]})})]})},p=()=>e.jsxs("div",{className:"flex flex-col items-start relative bg-white overflow-hidden",children:[e.jsx("div",{className:"w-full",children:e.jsx(l,{})}),e.jsx("div",{className:"w-full",children:e.jsx(c,{})})]});export{p as default};

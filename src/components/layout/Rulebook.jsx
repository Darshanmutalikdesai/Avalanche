import React, { useEffect, useRef } from "react";




const RulebookComponent = () => {
  const bookRef = useRef(null);

  useEffect(() => {
    const handlePageClick = (e) => {
      const page = e.target.closest(".page");
      if (!page) return;

      const pageNumber = parseInt(page.style.getPropertyValue("--page-number"));

      if (page.classList.contains("past")) {
        page.classList.remove("past");
        if (pageNumber === 0 && window.innerWidth > 768 && bookRef.current) {
          bookRef.current.style.transform = "translateZ(-700px) rotateY(24deg)";
        }
      } else {
        page.classList.add("past");
        if (pageNumber === 0 && window.innerWidth > 768 && bookRef.current) {
          bookRef.current.style.transform = "translateZ(-700px) rotateY(24deg) translateX(200px)";
        }
      }
    };

    const book = bookRef.current;
    if (book) {
      book.addEventListener("click", handlePageClick);
    }

    return () => {
      if (book) {
        book.removeEventListener("click", handlePageClick);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Nasalization';
          src: url('./assets/fonts/Nasalization.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        *, *:before, *:after {
          box-sizing: border-box;
          font-family: 'Nasalization', sans-serif; /* Apply font everywhere */
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Nasalization', sans-serif;
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
      `}</style>


      <div className="book-wrapper">
        <div
          ref={bookRef}
          className="book"
          style={{
            "--total-pages": "6",
            "--book-offset": "6deg"
          }}
        >
          {/* All pages remain unchanged */}
          <section className="page cover" style={{ "--page-number": "0" }}>
            <div className="logo-placeholder">🌠</div>
            <h1>AVALANCHE 2025<br/>Rulebook</h1>
            <p style={{ marginTop: '2vmin', fontSize: '3vmin', opacity: 0.9 }}>by Tech Team</p>
          </section>

          <section className="page" style={{ "--page-number": "1" }}>
            <h2>Introduction</h2>
            <p>Welcome to AVALANCHE 2025, the premier technical and fest organized by KLS GIT.</p>
            <p>This rulebook contains all the guidelines and regulations for participating in various events throughout the fest.</p>
          </section>

          <section className="page" style={{ "--page-number": "2" }}>
            <h2>General Rules</h2>
            <p>• All participants must register before the event begins.</p>
            <p>• Valid student ID cards must be presented upon request.</p>
            <p>• Participants must adhere to the code of conduct at all times.</p>
          </section>

          <section className="page" style={{ "--page-number": "3" }}>
            <h2>Technical Events</h2>
            <p>Technical competitions will test your coding, innovation, and problem-solving abilities.</p>
            <p>Teams must consist of 2-4 members unless otherwise specified.</p>
          </section>

          <section className="page" style={{ "--page-number": "4" }}>
            <h2>Contact Us</h2>
            <p>For queries and support, reach out to the organizing committee.</p>
            <p>Email: avalanche25@git.edu</p>
            <a 
              href="https://drive.google.com/file/d/1oWkK9UpXc3IxNcH9M6UzvEn6iR05KAx-/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="download-btn"
            >
              📄 Download Official Rulebook
            </a>
            <p style={{ marginTop: '3vmin', fontStyle: 'italic', opacity: 0.8, fontSize: '2.8vmin' }}>
              Click on any page to flip through the book!
            </p>
          </section>

          <div className="book-spine">KLS GIT AVALANCHE 2025</div>
        </div>
      </div>

      
    </>
  );
};

export default RulebookComponent;

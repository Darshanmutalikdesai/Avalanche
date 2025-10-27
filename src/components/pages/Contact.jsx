import React from "react";
import { useEffect } from "react";
import NavigationBar from "../layout/Common/Navbar";
import ProfileCard from "../ui/ProfileCard";
import GSProfileCard from "../ui/GSprofilecard";
import shraddha from "../../assets/shraddha.png";
import srushti from "../../assets/srushti.png";
import shreya from "../../assets/shreya.png";
import nishanth from "../../assets/nishanth.png";
import Footer from "../../components/layout/Common/footer";


const Contact = () => {
  
    const Conveynors_Data = [
      {
        id: 1,
        name: "Dr. Vaibhav Chate",
        dept: "Dept. of Civil Engineering",
        image: "https://git.edu/wp-content/uploads/2024/02/DSC_6952-1-scaled-e1742281730699.jpg"
      },
      {
        id: 2,
        name: "Prof. Jyoti S Patil",
        dept: "Dept. of Architecture",
        image: "https://git.edu/wp-content/uploads/2024/02/jspDSC_7093-scaled.jpg"
      }
    ]
    const Faculty_Data = [{
      id: 1,
      name: "Dr. Shweta R Patil",
      dept: "Dept. of Civil Engineering",
      image: "https://git.edu/wp-content/uploads/2024/12/DSC_6963-scaled-e1742281078661-768x863.jpg"
    },
    {
        id: 2,
        name: "Prof. Shruti R. Mutkekar",
        dept: "Dept. of Architecture",
        image: "https://git.edu/wp-content/uploads/2024/02/srmDSC_7924-scaled.jpg"
    }];
      useEffect(() => {
        const numStars = 480;
        const container = document.getElementById("star-container");
        if (!container) return;
        container.innerHTML = "";
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement("div");
          star.className = "star";
          star.style.top = Math.random() * 100 + "%";
          star.style.left = Math.random() * 100 + "%";
          star.style.animationDelay = Math.random() * 5 + "s";
          const size = Math.random() * 4 + 1;
          star.style.width = size + "px";
          star.style.height = size + "px";
          container.appendChild(star);
        }
      }, []);

    const Secretaries_Data = [
        {
            id: 1,
            name: "Aditya Math",
            designation: "General secretary",
            phone: "9538920050",
            linkedin: "https://www.linkedin.com/in/aditya-math-2817b4291/",
            image: "https://media.licdn.com/dms/image/v2/D4E03AQF11XkPfqRhEw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1694801221225?e=1762992000&v=beta&t=Uo1YFMndg503WlVpqWPE8yRCyLbpJZfFdXlkm7uAGJg"
        },
        {
            id: 2,
            name: "Nishanth S",
            designation: "General secretary",
            phone: "6362990994",
            linkedin: "https://www.linkedin.com/in/nishanth-s-40215a234/",
            image: nishanth
        },
        {
            id: 3,
            name: "Shraddha Naik",
            designation: "General secretary",
            phone: "8105193555",
            linkedin: "https://www.linkedin.com/in/shraddha-naik-29b49026b/",
            image: shraddha
        },
        {
            id: 4,
            name: "Srushti Kadalgi",
            designation: "General secretary",
            phone: "8073587935",
            linkedin: "https://www.linkedin.com/in/contactsrushtikadalagi/",
            image: srushti
        },
        {
            id: 5,
            name: "Shreya Patil",
            designation: "Cultural secretary",
            phone: "7676929810",
            linkedin: "https://www.linkedin.com/in/shreyapatil06/",
            image: shreya
        },
        {
            id: 6,
            name: "Koushal S Kedari",
            designation: "Technical secretary",
            phone: "9663362250",
            linkedin: "https://www.linkedin.com/in/koushal-kedari/",
            image: "https://media.licdn.com/dms/image/v2/D5603AQGFeQsVpYBQkg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706472933559?e=1762992000&v=beta&t=PZWVbeNnBS8Q8xbT4Or9qVghsz2wmfeHBV_QKy_XYM8"
        }
    ];
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>

        <div className="relative z-[60]">
            <NavigationBar />
        </div>
        <section
            id="about"
            className="z-20 py-10 pt-40 px-8 text-center">
            <h1 className="text-8xl pb-10 text-[#00eafa] font-nasal font-bold text-center">
                About KLS GIT
            </h1>
            <div className="flex flex-col md:flex-row px-16 items-center justify-center gap-5 text-left">
            <h2 className="text-gray-100 text-2xl max-w-5xl font-orbitron mx-auto md:ml-10">
                KLS Gogte Institute of Technology (KLS GIT), the flagship Institute of Karnataka Law Society, Belagavi was incepted in the year 1979. <br />
                <br />
                KLS GIT is approved by AICTE and UGC and is an Autonomous Institution under Visvesvarya Technological University, Belagavi. The Institute also carries the distinction of getting A+ Accreditation from NAAC in the first and second cycle and conferred with NBA accreditation in 2004, 2008, 2015, 2021 and 2023
            </h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/K8g1peDIR04?si=jk_XqfPmLeOHNT4E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className="rounded-xl shadow-lg"></iframe>
            </div>
        </section>
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-5xl text-center font-nasal text-[#00eafa] font-bold mt-16 mb-8">
          Avalanche Faculty Conveynors
        </h2>
        <p className="text-center text-2xl text-gray-100 font-orbitron mb-2">
          Our dedicated faculty convenors play a crucial role in organizing and overseeing the Avalanche event, ensuring its success and smooth execution.
        </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 pt-16 max-w-7xl mx-auto px-4 pb-20">
          {Conveynors_Data.map((Profile) => (
            <ProfileCard
              key={Profile.id}
              name={Profile.name}
              Dept={Profile.dept}
              image={Profile.image}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-5xl text-center text-[#00eafa] font-nasal font-bold mt-16 mb-8">
          Meet Our Faculty Coordinators
        </h2>
        <p className="text-center text-2xl text-gray-100 font-orbitron mb-2">
          Our esteemed faculty members are the backbone of KLS GIT, guiding and inspiring students to reach their full potential.
        </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 pt-16 max-w-7xl mx-auto px-4 pb-20">
          {Faculty_Data.map((Profile) => (
            <ProfileCard
              key={Profile.id}
              name={Profile.name}
              Dept={Profile.dept}
              image={Profile.image}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-5xl text-center text-[#00eafa] font-nasal font-bold mt-16 mb-8">
            Our Secretaries
          </h2>
          <p className="text-center text-2xl text-gray-100 font-orbitron mb-2">
            Our Student Secretaries play a vital role in ensuring the smooth functioning of KLS GIT, managing various activities and initiatives and representing our students actively.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 pt-16 max-w-7xl mx-auto px-4 pb-20">
          {Secretaries_Data.map((Profile) => (
            <GSProfileCard
              key={Profile.id}
              name={Profile.name}
              designation={Profile.designation}
              phone={Profile.phone}
              linkedin={Profile.linkedin}
              image={Profile.image}
            />
          ))}
        </div>

          <Footer/>

      <style>{`
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          max-width: 100vw;
        }
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 1;
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
      `}</style>
    </div>
  );
};

export default Contact;

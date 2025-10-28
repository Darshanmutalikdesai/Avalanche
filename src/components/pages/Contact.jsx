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

const SectionHeader = ({ title, description }) => (
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-6">
    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-nasal text-[#00eafa] font-bold mt-10 mb-4 leading-tight">
      {title}
    </h2>
    <p className="text-center text-base sm:text-lg md:text-2xl text-gray-100 font-orbitron mb-2 px-2 sm:px-10">
      {description}
    </p>
  </div>
);



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
<div
  className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
  style={{
    background: "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
  }}
>
  {/* Star Background */}
  <div id="star-container" className="stars absolute w-full h-full"></div>

  {/* Navbar */}
  <div className="relative z-[60]">
    <NavigationBar />
  </div>

  {/* About Section */}
  <section
    id="about"
    className="z-20 py-10 pt-32 sm:pt-40 px-4 sm:px-8 text-center"
  >
    <h1 className="text-4xl sm:text-6xl lg:text-8xl pb-6 sm:pb-10 text-[#00eafa] font-nasal font-bold text-center leading-tight">
      About KLS GIT
    </h1>

    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-left max-w-7xl mx-auto">
      <h2 className="text-gray-100 text-lg sm:text-xl md:text-2xl leading-relaxed font-orbitron text-center md:text-left max-w-4xl">
        KLS Gogte Institute of Technology (KLS GIT), the flagship Institute of
        Karnataka Law Society, Belagavi was incepted in the year 1979.
        <br />
        <br />
        KLS GIT is approved by AICTE and UGC and is an Autonomous Institution
        under Visvesvaraya Technological University, Belagavi. The Institute
        also carries the distinction of getting A+ Accreditation from NAAC in
        the first and second cycle and conferred with NBA accreditation in 2004,
        2008, 2015, 2021, and 2023.
      </h2>

      {/* Responsive YouTube Video */}
      <div className="w-full max-w-md sm:max-w-lg aspect-video">
        <iframe
          src="https://www.youtube.com/embed/K8g1peDIR04?si=jk_XqfPmLeOHNT4E"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-xl shadow-lg w-full h-full"
        ></iframe>
      </div>
    </div>
  </section>

  {/* Faculty Convenors */}
  <SectionHeader
    title="Avalanche Faculty Convenors"
    description="Our dedicated faculty convenors play a crucial role in organizing and overseeing the Avalanche event, ensuring its success and smooth execution."
  />

  <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-16 sm:gap-y-24 pt-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
    {Conveynors_Data.map((Profile) => (
      <ProfileCard
        key={Profile.id}
        name={Profile.name}
        Dept={Profile.dept}
        image={Profile.image}
      />
    ))}
  </div>

  {/* Faculty Coordinators */}
  <SectionHeader
    title="Meet Our Faculty Coordinators"
    description="Our esteemed faculty members are the backbone of KLS GIT, guiding and inspiring students to reach their full potential."
  />

  <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-16 sm:gap-y-24 pt-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
    {Faculty_Data.map((Profile) => (
      <ProfileCard
        key={Profile.id}
        name={Profile.name}
        Dept={Profile.dept}
        image={Profile.image}
      />
    ))}
  </div>

  {/* Secretaries */}
  <SectionHeader
    title="Our Secretaries"
    description="Our Student Secretaries play a vital role in ensuring the smooth functioning of KLS GIT, managing various activities and initiatives and representing our students actively."
  />

  <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-16 sm:gap-y-24 pt-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
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

  <Footer />

  {/* Custom CSS Animations */}
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

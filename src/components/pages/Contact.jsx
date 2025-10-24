import React from "react";
import BackgroundVideo from "../../assets/backround1.mp4";
import NavigationBar from "../layout/Common/Navbar";
import ProfileCard from "../ui/ProfileCard";
import GSProfileCard from "../ui/GSprofilecard";
import shraddha from "../../assets/shraddha.png";
import srushti from "../../assets/srushti.png";
import shreya from "../../assets/shreya.png";
import nishanth from "../../assets/nishanth.png";

const Contact = () => {
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
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto font-['Orbitron',sans-serif] text-[#00f7ff]">
          {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>

    
        {/* Dark overlay */}
        <div className="relative z-[60]">
            <NavigationBar />
        </div>
        <div className="relative z-10 h-1000 w-800 flex items-center pt-24 justify-center">
          <img src="src/assets/gitHeader.png" alt="Profile Header" />
        </div>
        <section
            id="about"
            className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-black/50 border-t border-white/10"
        >
            <h2 className="text-gray-300 text-2xl max-w-6xl font-orbitron mx-auto">
                KLS Gogte Institute of Technology (KLS GIT), the flagship Institute of Karnataka Law Society, Belagavi was incepted in the year 1979. <br />
                <br />
                KLS GIT is approved by AICTE and UGC and is an Autonomous Institution under Visvesvarya Technological University, Belagavi. The Institute also carries the distinction of getting A+ Accreditation from NAAC in the first and second cycle and conferred with NBA accreditation in 2004, 2008, 2015, 2021 and 2023
            </h2>
        </section>
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-5xl text-center font-nasal font-bold mt-16 mb-8">
          Meet Our Faculty
        </h2>
        <p className="text-center text-2xl text-gray-300 font-orbitron mb-2">
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
          <h2 className="text-5xl text-center font-nasal font-bold mt-16 mb-8">
            Our Secretaries
          </h2>
          <p className="text-center text-2xl text-gray-300 font-orbitron mb-2">
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

    </div>
  );
};

export default Contact;

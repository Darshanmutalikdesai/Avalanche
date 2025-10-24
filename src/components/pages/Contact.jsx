import React from "react";
import BackgroundVideo from "../../assets/backround1.mp4";
import NavigationBar from "../layout/Common/Navbar";
import ProfileCard from "../ui/ProfileCard";

const Contact = () => {
    const Faculty_Data = [{
      id: 1,
      name: "John Doe",
      phoneNo: "123-456-7890",
      linkedin: "https://www.linkedin.com/in/johndoe",
      phone: "123-456-7890",
      image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        name: "Jane Smith",
        phoneNo: "987-654-3210",
        linkedin: "https://www.linkedin.com/in/janesmith",
        phone: "987-654-3210",
        image: "https://via.placeholder.com/150"
    }];
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
        <section
            id="about"
            className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-black/50 border-t border-white/10"
        >

            <h2 className="text-6xl md:text-5xl text-white font-nasal font-bold mb-6">
                About KLS GIT
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl font-orbitron mx-auto leading-relaxed">
                KLS GIT is a premier engineering college dedicated to fostering
                innovation, creativity, and collaboration among students. Each year,
                we bring together brilliant minds to showcase their ideas and ignite
                the spark of the future.
                From robotics to art, 
            </p>
        </section>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 pt-16 max-w-7xl mx-auto px-4 pb-20">
          {Faculty_Data.map((Profile) => (
            <ProfileCard
              key={Profile.id}
              name={Profile.name}
              phoneNo={Profile.phoneNo}
              linkedin={Profile.linkedin}
              phone={Profile.phone}
              image={Profile.image}
            />
          ))}
        </div>


    </div>
  );
};

export default Contact;

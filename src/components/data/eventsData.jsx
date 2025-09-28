import React from "react";
import image1 from "../../assets/central_image.jpg";
import image2 from "../../assets/dept_image.jpg";
import image3 from "../../assets/puc_image.jpg"
const eventsData = [
  {
    id: 1,
    title: "Tadpole Galaxy",
    description: "Department of Architecture",
    image: image1,
    path: "/central-events",  
  },
  {
    id: 2,
    title: "Andromeda Galaxy",
    description: "Department of Civil Engineering",
    image: image2,
    path: "/department-events", 
  },
  {
    id: 3,
    title: "Blinking Galaxy",
    description: "Department of Information Science",
    image: image3,
    path: "/puc-events",
  },
];

export default eventsData;

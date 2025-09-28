// src/data/centralEventsData.js
import React from "react";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg"
import image3 from "../../assets/debate_image.jpg"
const centralEventsData = [
  {
    id: 1,
    title: "Treasure Hunt",
    description: "A thrilling hunt across campus!",
    image: image1,
    instructions: "1. Register online.\n2. Teams of 4.\n3. Bring college ID.\n4. Follow the clues to win.",
  },
  {
    id: 2,
    title: "Hackathon",
    description: "Show your coding skills in 24 hours.",
    image: image2,
    instructions: "1. Teams of max 3.\n2. Bring laptops.\n3. Internet will be provided.\n4. Judges' decision is final.",
  },
  {
    id: 3,
    title: "Quiz Mania",
    description: "Test your knowledge and win exciting prizes.",
    image: image3,
    instructions: "1. Individual participation.\n2. 3 rounds.\n3. No mobiles allowed.\n4. Top 3 win certificates.",
  },
];

export default centralEventsData;

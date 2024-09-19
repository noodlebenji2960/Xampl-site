import "./TeamMembers.css"
import React, { useState } from 'react';
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import profile5 from "../assets/profile5.png";
import profile6 from "../assets/profile6.png";
import profile7 from "../assets/profile7.png";
import profile8 from "../assets/profile8.png";

const TeamMembers = () => {
  // State to track the active team member
  const [activeMember, setActiveMember] = useState(null);

  // Function to handle member click
  const handleClick = (index) => {
    setActiveMember(index);
  };

  // Array of team members to map through for cleaner code
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      img: profile2,
      description: "Jane is the visionary behind our company. With over 20 years of experience in the industry, she leads with passion and expertise."
    },
    {
      name: "John Smith",
      role: "Chief Technology Officer",
      img: profile1,
      description: "John brings cutting-edge technology solutions to the table. His innovative mindset drives our tech advancements."
    },
    {
      name: "Emily Johnson",
      role: "Marketing Director",
      img: profile3,
      description: "Emily's strategic marketing approach helps us reach new heights. She excels at crafting impactful campaigns and brand strategies."
    },
    {
      name: "Michael Brown",
      role: "Lead Designer",
      img: profile4,
      description: "Michael's creative vision and attention to detail ensure our design standards are top-notch. He is the mastermind behind our visual identity."
    },
    {
      name: "Sarah Lee",
      role: "Product Manager",
      img: profile5,
      description: "Sarah's expertise in product development ensures our offerings are always aligned with market needs and customer expectations."
    },
    {
      name: "David Wilson",
      role: "Customer Success Manager",
      img: profile7,
      description: "David's dedication to customer satisfaction drives our client success initiatives, helping clients achieve their goals."
    },
    {
      name: "Lisa Brown",
      role: "Lead Developer",
      img: profile6,
      description: "Lisa's technical skills and problem-solving abilities are crucial to our development team, ensuring high-quality solutions."
    },
    {
      name: "Tom Harris",
      role: "Operations Manager",
      img: profile8,
      description: "Tom's expertise in operations ensures smooth and efficient processes across the company, driving overall productivity."
    },
  ];

  return (
    <>
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-member ${activeMember === index ? 'active' : ''}`} // Add class 'active' if this is the clicked member
            onClick={() => handleClick(index)} // Call handleClick on click
          >
            <img src={member.img} alt={member.name} className="team-photo" />
            <h3>{member.name}</h3>
            <p className="job-role">{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamMembers;

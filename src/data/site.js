export const site = {
  name: "TechStar Innovation Hub",
  shortName: "TechStar",
  tagline: "We are the future of STEM and Math education in Tanzania's rural and underserved communities.",
  url: "https://techstar-innovation-hub.onrender.com",
  logo: "/assets/img/logo1.jpg",
  logoMark: "/assets/img/logo4.png",
  email: "techstarhub@gmail.com",
  phones: ["+255 655 157 101", "+255 763 773 932"],
  whatsapp: "255655157101",
  locations: ["Dar es Salaam", "Mtwara Municipal, Mtwara Region"],
  address: "Mtwara Municipal, Mtwara Region, Tanzania",
  mapEmbed:
    "https://www.google.com/maps?q=Mtwara%20Municipal%2C%20Mtwara%2C%20Tanzania&output=embed",
};

export const socials = [
  {
    label: "X (Twitter)",
    href: "https://x.com/techStarhubtz?t=xw3CBnannnGdQU8ddhf3EA&s=08",
    icon: "twitter",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61562270747821&mibextid=ZbWKwL",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/techstarhub?igsh=cW94cWh0b2FrMWVm",
    icon: "instagram",
  },
];

/** Backend that powers the live course catalogue and the newsletter form. */
export const api = {
  courses: "https://techstar-admin.onrender.com/courses/api/fetch-courses/",
  courseDetail: "https://techstar-admin.onrender.com/api/course-details/",
  newsletter: "https://techstar-admin.onrender.com/forms/newsletter",
};

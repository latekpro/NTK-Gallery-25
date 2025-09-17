// Mock speakers data for testing the gallery layout
const mockSpeakers = [
  {
    id: "speaker-1",
    name: "Matej Černe",
    title: "UL, Ekonomska fakulteta",
    bio: "Dr. Matej Černe je redni profesor za področje managementa in organizacije na Ekonomski fakulteti Univerze v Ljubljani.",
    imageUrl: "https://via.placeholder.com/300x300/667eea/ffffff?text=MC",
    talks: [
      {
        id: "talk-1",
        title: "Management in Leadership",
        abstract: "Exploring modern approaches to management and leadership in organizations.",
        dateTime: "2024-01-15T10:00:00",
        location: "Main Hall",
        duration: "45 min",
        track: "Leadership"
      }
    ],
    tags: ["Leadership", "Management", "Academia"],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/matejcerne" }
    ]
  },
  {
    id: "speaker-2",
    name: "Igor Verstovšek",
    title: "Cosylab d.d",
    bio: "Soustanovitelj Cosylaba Igor Verstovšek je danes Chief AI Officer. Po izobrazbi fizik je pri 23. letih...",
    imageUrl: "https://via.placeholder.com/300x300/764ba2/ffffff?text=IV",
    talks: [
      {
        id: "talk-2",
        title: "Artificial Intelligence in Industry",
        abstract: "How AI is transforming industrial processes and automation.",
        dateTime: "2024-01-15T11:00:00",
        location: "Tech Hall",
        duration: "60 min",
        track: "Technology"
      }
    ],
    tags: ["AI", "Technology", "Industry"],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/igorverstorsek" }
    ]
  },
  {
    id: "speaker-3",
    name: "Ana Novak",
    title: "Software Engineer",
    bio: "Passionate about frontend development and user experience design. Leading development teams for over 8 years.",
    imageUrl: "https://via.placeholder.com/300x300/f093fb/ffffff?text=AN",
    talks: [
      {
        id: "talk-3",
        title: "Modern Frontend Architecture",
        abstract: "Building scalable and maintainable frontend applications with React and modern tools.",
        dateTime: "2024-01-15T14:00:00",
        location: "Dev Room",
        duration: "45 min",
        track: "Frontend"
      }
    ],
    tags: ["Frontend", "React", "UX"],
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/ananovak" },
      { type: "website", url: "https://ananovak.dev" }
    ]
  },
  {
    id: "speaker-4",
    name: "Peter Kranjc",
    title: "Data Scientist",
    bio: "Expert in machine learning and data analytics. PhD in Computer Science with focus on AI applications.",
    imageUrl: "https://via.placeholder.com/300x300/28a745/ffffff?text=PK",
    talks: [
      {
        id: "talk-4",
        title: "Machine Learning in Practice",
        abstract: "Real-world applications of machine learning algorithms and best practices for implementation.",
        dateTime: "2024-01-15T15:30:00",
        location: "Data Lab",
        duration: "50 min",
        track: "Data Science"
      }
    ],
    tags: ["Data Science", "Machine Learning", "AI"],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/peterkranjc" }
    ]
  },
  {
    id: "speaker-5",
    name: "Maja Zorman",
    title: "UX Designer",
    bio: "Creative UX designer with extensive experience in designing user-centered digital products and services.",
    imageUrl: "https://via.placeholder.com/300x300/ffc107/ffffff?text=MZ",
    talks: [
      {
        id: "talk-5",
        title: "Design Thinking Workshop",
        abstract: "Interactive workshop on design thinking methodology and user-centered design principles.",
        dateTime: "2024-01-16T10:00:00",
        location: "Design Studio",
        duration: "90 min",
        track: "Design"
      }
    ],
    tags: ["Design", "UX", "Workshop"],
    socialLinks: [
      { type: "website", url: "https://majazorman.com" },
      { type: "linkedin", url: "https://linkedin.com/in/majazorman" }
    ]
  },
  {
    id: "speaker-6",
    name: "Tomaž Štih",
    title: "DevOps Engineer",
    bio: "DevOps specialist focused on cloud infrastructure, automation, and continuous integration/delivery practices.",
    imageUrl: "https://via.placeholder.com/300x300/dc3545/ffffff?text=TS",
    talks: [
      {
        id: "talk-6",
        title: "Cloud Infrastructure as Code",
        abstract: "Managing cloud infrastructure using Infrastructure as Code principles and tools.",
        dateTime: "2024-01-16T11:30:00",
        location: "Cloud Room",
        duration: "45 min",
        track: "DevOps"
      }
    ],
    tags: ["DevOps", "Cloud", "Automation"],
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/tomaz_stih" }
    ]
  },
  {
    id: "speaker-7",
    name: "Luka Horvat",
    title: "Blockchain Developer",
    bio: "Blockchain technology enthusiast and developer working on decentralized applications and smart contracts.",
    imageUrl: "https://via.placeholder.com/300x300/6c757d/ffffff?text=LH",
    talks: [
      {
        id: "talk-7",
        title: "Decentralized Applications",
        abstract: "Building and deploying DApps on various blockchain platforms.",
        dateTime: "2024-01-16T13:00:00",
        location: "Crypto Hall",
        duration: "60 min",
        track: "Blockchain"
      }
    ],
    tags: ["Blockchain", "DApps", "Cryptocurrency"],
    socialLinks: [
      { type: "website", url: "https://lukahorvat.tech" }
    ]
  },
  {
    id: "speaker-8",
    name: "Eva Kos",
    title: "Product Manager",
    bio: "Experienced product manager specializing in digital transformation and agile product development methodologies.",
    imageUrl: "https://via.placeholder.com/300x300/343a40/ffffff?text=EK",
    talks: [
      {
        id: "talk-8",
        title: "Agile Product Development",
        abstract: "Implementing agile methodologies for successful product development and team management.",
        dateTime: "2024-01-16T14:30:00",
        location: "Product Room",
        duration: "45 min",
        track: "Product"
      }
    ],
    tags: ["Product Management", "Agile", "Strategy"],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/evakos" }
    ]
  }
];

module.exports = mockSpeakers;
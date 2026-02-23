
export const STRINGS = {
  general: {
    brandName: "W",
    brandNameHighlight: "Quicks",
    fullBrandName: "WQuicks",
    location: "Regina, SK, Canada",
    phoneDisplay: "+1 (306) 990-2404",
    phoneValue: "+13069902404",
    email: "wquicksolution@gmail.com",
  },
  nav: {
    about: "Our Story",
    services: "Solutions",
    process: "Method",
    portfolio: "Work",
    contact: "Inquiry",
  },
  hero: {
    badge: "Regina's Digital Excellence",
    titleLine1: "Regina's Premier",
    titleLine2: "Web & App Agency",
    description: "WQuicks delivers high-performance web and mobile solutions with the precision of Canadian engineering. Your vision, expertly built in the heart of Regina, Saskatchewan.",
    ctaPrimary: "Start My Project",
    ctaSecondary: "View Regina Portfolio",
  },
  about: {
    badge: "The WQuicks Philosophy",
    title: "Canadian Heritage, Global Standards",
    description1: "Founded in the heart of the Canadian prairies, WQuicks was born from a desire to blend rugged reliability with sophisticated digital craftsmanship. We don't just write code; we build digital legacies that stand up to the harshest market climates.",
    description2: "Our Regina-based team brings a unique perspective to technology—prioritizing clarity over noise, and resilience over trends. We serve local innovators and global enterprises with equal dedication.",
    stats: [
      { label: "Projects Delivered", value: "5+" },
      { label: "Canadian Offices", value: "1" },
      { label: "Client Retention", value: "98%" },
      { label: "Years of Excellence", value: "7+" }
    ]
  },
  services: {
    badge: "Expertise",
    title: "Thoughtful Engineering",
    subtitle: "We believe in building software that is as reliable as it is beautiful. From Regina to the world.",
    items: [
      {
        title: 'Bespoke Web Systems',
        description: 'High-performance React architectures designed for stability and effortless scalability.',
        icon: 'Code'
      },
      {
        title: 'Mobile Craftsmanship',
        description: 'Native-feel iOS and Android applications built with React Native for a seamless user journey.',
        icon: 'Smartphone'
      },
      {
        title: 'Strategic Growth',
        description: 'Intelligent SEO and analytics that provide clarity and measurable results for your business.',
        icon: 'BarChart'
      },
      {
        title: 'Cloud Architecture',
        description: 'Resilient, high-availability infrastructure on AWS and GCP, managed with care.',
        icon: 'Server'
      },
      {
        title: 'Interface Design',
        description: 'Clean, accessible, and attractive UI/UX design that focuses on clarity and user joy.',
        icon: 'Layout'
      },
      {
        title: 'Digital Resilience',
        description: 'Rigorous security standards and maintenance to ensure your digital assets are always protected.',
        icon: 'Shield'
      }
    ]
  },
  process: {
    badge: "Our Method",
    title: "How We Build",
    steps: [
      {
        id: "01",
        title: "Discovery & Strategy",
        description: "We dive deep into your business goals, target audience, and the technical landscape to chart a precise course."
      },
      {
        id: "02",
        title: "Architectural Design",
        description: "User flows and technical blueprints are crafted to ensure a foundation that is both intuitive and unbreakable."
      },
      {
        id: "03",
        title: "Agile Development",
        description: "Our engineers build in sprints, providing transparent updates and frequent builds for your feedback."
      },
      {
        id: "04",
        title: "Launch & Evolution",
        description: "We deploy with zero-downtime strategies and provide ongoing support to help your product grow."
      }
    ]
  },
  portfolio: {
    titlePrefix: "Canadian Built,",
    titleHighlight: "Global Impact",
    subtitle: "A selection of our most successful collaborations and digital transformations.",
    items: [
      {
        id: 1,
        title: 'Lenovo Partner Portal',
        category: 'Enterprise Web',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/1024px-Lenovo_logo_2015.svg.png',
        isLogo: true
      },
      {
        id: 2,
        title: 'ICICI Bank Credit Flows',
        category: 'FinTech Architecture',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
        isLogo: true
      },
      {
        id: 3,
        title: 'Media Utility App',
        category: 'SaaS Platform',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png',
        isLogo: true
      },
      {
        id: 4,
        title: 'Ecommerce Ecosystems',
        category: 'Scalable Commerce',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pfizer_logo.svg',
        isLogo: true
      }
    ]
  },
  // Added missing testimonials property to satisfy Testimonials component requirements
  testimonials: {
    badge: "Client Stories",
    title: "Kind Words from Our Partners",
    items: [
      {
        text: "WQuicks transformed our digital presence with a level of precision we haven't found elsewhere in the prairies. Their technical depth is unmatched.",
        author: "Sarah Jenkins",
        role: "CTO",
        location: "AgriTech Solutions"
      },
      {
        text: "The team's ability to take complex requirements and turn them into a seamless mobile experience was incredible. Truly world-class engineering.",
        author: "Markus Chen",
        role: "Founder",
        location: "Prairie Mobile"
      },
      {
        text: "Working with WQuicks felt like having an elite engineering team right in our backyard. They are reliable, transparent, and exceptionally skilled.",
        author: "David Miller",
        role: "Operations Director",
        location: "Northern Logistics"
      }
    ]
  },
  faq: {
    badge: "Transparency",
    title: "Common Inquiries",
    items: [
      {
        question: "Where is the WQuicks team based?",
        answer: "We are proudly headquartered in Regina, Saskatchewan, with a secondary creative studio in Vancouver, British Columbia."
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer: "Yes, we provide Digital Resilience packages that include security monitoring, hosting management, and regular feature updates."
      },
      {
        question: "How long does a typical project take?",
        answer: "Timelines vary depending on complexity. A bespoke web system typically takes 8-12 weeks, while smaller MVP launches can be achieved in 4-6 weeks."
      },
      {
        question: "Can you help with existing legacy code?",
        answer: "We specialize in modernizing legacy architectures, ensuring they are brought up to current performance and security standards without disrupting service."
      }
    ]
  },
  contact: {
    badge: "Connect",
    title: "Start a Conversation",
    subtitle: "We're here to help you navigate your next digital leap. Reach out to our Regina office.",
    infoBoxTitle: "Contact Details",
    labels: {
      email: "Email Address",
      phone: "Phone Number",
      office: "Canadian HQ",
      officeAddressLines: ["Regina, Saskatchewan", "Canada"],
      nameField: "Full Name",
      emailField: "Business Email",
      phoneField: "Phone Number",
      messageField: "Project Summary",
    },
    placeholders: {
      name: "How should we address you?",
      email: "email@company.com",
      phone: "+1 (555) 000-0000",
      message: "Tell us about the challenges you're looking to solve...",
    },
    validation: {
      nameTooShort: "Name must be at least 2 characters.",
      emailInvalid: "Please enter a valid email address.",
      phoneInvalid: "Please enter a valid phone number (at least 10 digits).",
      messageTooShort: "Message must be at least 10 characters.",
    },
    buttons: {
      submit: "Send Message",
      loading: "Preparing...",
      back: "Back",
    },
    success: {
      title: "Thank You, {name}!",
      message: "Your inquiry has been successfully received by our team. We've initiated a review of your project requirements and will reach out to you within the next 24 business hours.",
    },
    helper: "Secure submission powered by WQuicks Backend Systems.",
    emailTemplate: {
      subjectPrefix: "New Project Inquiry:",
      bodyPrefix: "Client Name:",
      bodyEmail: "Contact Email:",
      bodyPhone: "Client Phone:",
      bodyMessage: "Project Details:",
    }
  },
  footer: {
    description: "Empowering businesses through thoughtful technology and elegant design. Proudly Canadian.",
    headers: {
      contact: "Reach Us",
      social: "Follow",
    },
    copyright: "© 2025 WQuicks Web Solutions. Built with pride in Saskatchewan, Canada.",
    aria: {
      github: "GitHub",
      linkedin: "LinkedIn",
    }
  },
  accessibility: {
    logo: "WQuicks Official Logo",
    toggleTheme: "Switch Theme Mode",
  }
};

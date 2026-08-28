// Run once (npm run seed) to create the single owner account from .env values.
// Safe to run again - it will update the password and populate starter content if empty.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const SiteContent = require('./models/SiteContent');

(async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  let user = await User.findOne({});
  if (user) {
    user.email = email;
    user.password = hash;
    await user.save();
    console.log('Existing admin updated:', email);
  } else {
    await User.create({ email, password: hash });
    console.log('Admin created:', email);
  }

  // Ensure SiteContent document exists with rich starter showcase items
  let existing = await SiteContent.findOne({});
  
  const starterContent = {
    hero: {
      name: 'N S Siddarth',
      tagline: 'AIML Undergrad & Full-Stack Developer crafting intelligent web applications.',
      image: existing?.hero?.image || '',
      socials: [
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
    about: {
      heading: 'Engineering Intelligent Systems & High-Craft Web Apps',
      bio: 'I am an Artificial Intelligence & Machine Learning undergraduate with a focus on Deep Learning, NLP, and scalable full-stack development.\n\nI enjoy building products that blend cutting-edge AI models with polished, user-first interfaces.',
      image: existing?.about?.image || '',
      resumeUrl: existing?.about?.resumeUrl || '',
    },
    education: {
      visible: true,
      items: (existing?.education?.items?.length) ? existing.education.items : [
        {
          degree: 'B.Tech in Artificial Intelligence & Machine Learning',
          institution: 'School of Engineering & Technology',
          year: '2022 - 2026',
          description: 'Specializing in Deep Learning, Neural Networks, Computer Vision, Algorithms, and Cloud Systems.',
        },
      ],
    },
    experience: {
      visible: true,
      items: (existing?.experience?.items?.length) ? existing.experience.items : [
        {
          role: 'AI / ML Developer Intern',
          company: 'Tech Innovations Studio',
          duration: '2024 - Present',
          description: 'Developed transformer-based embedding pipelines and deployed high-concurrency microservices with sub-50ms latency.',
        },
      ],
    },
    certifications: {
      visible: true,
      items: (existing?.certifications?.items?.length) ? existing.certifications.items : [
        {
          title: 'Deep Learning Specialization',
          issuer: 'DeepLearning.AI / Coursera',
          date: '2024',
          image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
          order: 0,
        },
        {
          title: 'AWS Certified Machine Learning - Specialty',
          issuer: 'Amazon Web Services',
          date: '2024',
          image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
          order: 1,
        },
        {
          title: 'TensorFlow Developer Certificate',
          issuer: 'Google',
          date: '2023',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
          order: 2,
        },
      ],
    },
    projects: {
      visible: true,
      items: (existing?.projects?.items?.length) ? existing.projects.items : [
        {
          title: 'NeuroVision - Real-Time Object Detection & Tracking',
          shortDescription: 'High-speed computer vision model pipeline built with PyTorch and YOLO with real-time video stream analytics.',
          details: 'Architected an end-to-end computer vision platform designed for real-time edge devices.\n\nFeatures include custom dataset augmentation, quantized model deployment, and a React + WebSocket dashboard for live stream analytics.',
          techStack: ['PyTorch', 'OpenCV', 'Python', 'FastAPI', 'React', 'Tailwind'],
          image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
          gallery: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'],
          githubUrl: 'https://github.com',
          liveUrl: 'https://example.com',
          order: 0,
        },
        {
          title: 'SmartDocs - AI Document Intelligence & Retrieval',
          shortDescription: 'RAG pipeline powering semantic search across thousands of enterprise documents with citation tracking.',
          details: 'Built using LangChain, Vector Embeddings (Pinecone), and OpenAI/Llama models.\n\nSupports PDF, DOCX, and scanned image OCR parsing with multi-turn conversational memory.',
          techStack: ['LangChain', 'Vector DB', 'Node.js', 'React', 'FastAPI'],
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com',
          liveUrl: 'https://example.com',
          order: 1,
        },
      ],
    },
    chronicles: {
      visible: true,
      items: (existing?.chronicles?.items?.length) ? existing.chronicles.items : [
        {
          title: 'National AI Summit & Hackathon Finalist',
          description: 'Engineered an autonomous multi-agent disaster response planner in 36 hours and pitched to industry leaders.',
          date: 'Oct 2024',
          location: 'Bangalore, India',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
          order: 0,
        },
        {
          title: 'Keynote Speaker - Developer Student Club',
          description: 'Delivered an interactive hands-on workshop on Fine-Tuning Open Source LLMs to over 150+ students.',
          date: 'Aug 2024',
          location: 'Main Auditorium',
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
          order: 1,
        },
      ],
    },
    contact: {
      heading: "Let's Build Something Great",
      email: email,
      phone: '+91 (Available via Email)',
      socials: [
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
  };

  if (!existing) {
    await SiteContent.create(starterContent);
    console.log('Initial site content document created with complete sections.');
  } else {
    // Update fields while preserving any custom images
    Object.keys(starterContent).forEach((k) => {
      existing[k] = starterContent[k];
    });
    await existing.save();
    console.log('Site content document updated with complete showcase sections.');
  }

  process.exit(0);
})();


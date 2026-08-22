export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  intro: string;
  image: string;
  accent: string;
  overview: string[];
  process: string[];
  benefits: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
};

const sharedFaq = {
  question: "Is this treatment right for everyone?",
  answer:
    "Suitability depends on your oral health, goals, and clinical assessment. Dr Bushra will explain appropriate options after examining you.",
};

export const services: Service[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    shortTitle: "Implants",
    category: "Restorative Dentistry",
    description: "Restore missing teeth with modern implant-based solutions.",
    intro:
      "A carefully planned, long-term option for replacing missing teeth with stability, function, and a natural appearance.",
    image: "/images/services/dental-implants.png",
    accent: "01",
    overview: [
      "Dental implants replace a missing tooth root with a biocompatible fixture that can support a custom-made crown.",
      "Every plan begins with a detailed examination and evaluation of bone, gums, bite, and overall health.",
    ],
    process: [
      "Consultation and imaging",
      "Personal treatment plan",
      "Implant placement",
      "Healing period",
      "Final restoration",
    ],
    benefits: [
      "Stable tooth replacement",
      "Natural-looking result",
      "Supports comfortable chewing",
      "Helps preserve surrounding teeth",
    ],
    aftercare: [
      "Follow written cleaning guidance",
      "Attend scheduled reviews",
      "Avoid smoking during healing",
      "Contact the clinic if discomfort increases",
    ],
    faqs: [
      sharedFaq,
      {
        question: "How long does treatment take?",
        answer:
          "Timelines vary with healing and whether preparatory care is needed. Your written plan will set out the expected stages.",
      },
    ],
  },
  {
    slug: "zirconia-crowns",
    title: "Zirconia Crowns",
    shortTitle: "Crowns",
    category: "Restorative Dentistry",
    description:
      "Natural-looking restorations designed for strength and aesthetics.",
    intro:
      "Precision-made restorations created to strengthen and refine teeth while respecting your natural smile.",
    image: "/images/clinic/treatment-room.png",
    accent: "02",
    overview: [
      "A crown covers and protects a prepared tooth.",
      "Zirconia is selected for its strength, biocompatibility, and natural-looking finish.",
    ],
    process: [
      "Assessment",
      "Tooth preparation",
      "Digital or physical impression",
      "Temporary protection",
      "Final fitting",
    ],
    benefits: [
      "Strong and durable",
      "Natural appearance",
      "Custom shade and shape",
      "Metal-free option",
    ],
    aftercare: [
      "Brush and clean between teeth daily",
      "Avoid using teeth to open objects",
      "Wear a night guard if advised",
      "Keep routine reviews",
    ],
    faqs: [
      sharedFaq,
      {
        question: "Will the crown match my teeth?",
        answer:
          "The shade and form are selected to complement the surrounding teeth and your bite.",
      },
    ],
  },
  {
    slug: "invisible-braces",
    title: "Invisible Braces",
    shortTitle: "Aligners",
    category: "Orthodontic Care",
    description: "A discreet approach to improving tooth alignment.",
    intro:
      "A sequence of clear, removable aligners planned to move teeth gradually and discreetly.",
    image: "/images/hero/consultation.png",
    accent: "03",
    overview: [
      "Clear aligners can address selected alignment and bite concerns.",
      "Digital planning allows you to understand the proposed movement before treatment.",
    ],
    process: [
      "Smile and bite assessment",
      "Digital scan",
      "Treatment simulation",
      "Aligner wear",
      "Retention",
    ],
    benefits: [
      "Nearly invisible",
      "Removable for meals",
      "Easy oral hygiene",
      "Planned progress reviews",
    ],
    aftercare: [
      "Wear aligners as prescribed",
      "Clean them gently",
      "Remove for food and hot drinks",
      "Use retainers after treatment",
    ],
    faqs: [
      sharedFaq,
      {
        question: "How many hours should aligners be worn?",
        answer:
          "Most plans require consistent daily wear. Your specific instructions will be provided with your aligners.",
      },
    ],
  },
  {
    slug: "cosmetic-veneers",
    title: "Cosmetic Veneers",
    shortTitle: "Veneers",
    category: "Cosmetic Dentistry",
    description: "Improve tooth shape, shade and overall smile appearance.",
    intro:
      "Individually designed restorations that can refine tooth proportion, colour, and symmetry with a conservative mindset.",
    image: "/images/services/cosmetic-veneers.png",
    accent: "04",
    overview: [
      "Veneers are thin restorations bonded to the front surface of selected teeth.",
      "Planning considers your face, smile line, bite, and preference for a natural result.",
    ],
    process: [
      "Cosmetic consultation",
      "Smile planning",
      "Trial or preview",
      "Minimal preparation where needed",
      "Final bonding",
    ],
    benefits: [
      "Refined shape and shade",
      "Natural translucency",
      "Custom smile design",
      "Conservative options available",
    ],
    aftercare: [
      "Use a non-abrasive toothpaste",
      "Clean daily between teeth",
      "Avoid biting very hard objects",
      "Attend periodic reviews",
    ],
    faqs: [
      sharedFaq,
      {
        question: "Do veneers look natural?",
        answer:
          "They are designed around natural proportions, surface texture, and shade rather than a one-size-fits-all appearance.",
      },
    ],
  },
  {
    slug: "laser-whitening",
    title: "Laser Whitening",
    shortTitle: "Whitening",
    category: "Cosmetic Dentistry",
    description: "Professional teeth-whitening options for a brighter smile.",
    intro:
      "Clinically supervised whitening designed to lift stains while protecting gums and monitoring sensitivity.",
    image: "/images/services/cosmetic-veneers.png",
    accent: "05",
    overview: [
      "Professional whitening uses controlled materials after the teeth and gums have been checked.",
      "The response varies with the type and depth of staining.",
    ],
    process: [
      "Dental health check",
      "Shade record",
      "Gum protection",
      "Whitening application",
      "Aftercare plan",
    ],
    benefits: [
      "Clinically supervised",
      "Efficient appointment",
      "Tailored to sensitivity",
      "Documented shade change",
    ],
    aftercare: [
      "Limit deeply coloured foods initially",
      "Follow sensitivity advice",
      "Do not overuse whitening products",
      "Maintain regular cleaning",
    ],
    faqs: [
      sharedFaq,
      {
        question: "Can whitening cause sensitivity?",
        answer:
          "Temporary sensitivity can occur. We assess risk and tailor the approach to keep you comfortable.",
      },
    ],
  },
  {
    slug: "dental-extractions",
    title: "Dental Extractions",
    shortTitle: "Extractions",
    category: "Oral Surgery",
    description:
      "Professional evaluation and treatment for teeth requiring extraction.",
    intro:
      "Careful assessment, clear explanations, and a comfort-led approach when removal of a tooth is clinically appropriate.",
    image: "/images/clinic/treatment-room.png",
    accent: "06",
    overview: [
      "Extraction is considered only after examining whether a tooth can be predictably restored.",
      "The procedure and recovery guidance are explained before consent.",
    ],
    process: [
      "Examination and imaging",
      "Discuss options",
      "Local anaesthesia",
      "Careful extraction",
      "Recovery review if needed",
    ],
    benefits: [
      "Relieves the source of pain",
      "Protects nearby tissues",
      "Comfort-focused technique",
      "Clear replacement planning",
    ],
    aftercare: [
      "Bite on gauze as directed",
      "Avoid rinsing vigorously on day one",
      "Choose soft foods",
      "Call for persistent bleeding or increasing pain",
    ],
    faqs: [
      sharedFaq,
      {
        question: "What happens after removal?",
        answer:
          "We discuss healing and, where appropriate, options for replacing the missing tooth.",
      },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

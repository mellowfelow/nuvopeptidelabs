// Centralized configuration for Nuvo Peptide Labs
// Every brand fact, contact, product, category, and SEO parameter reads from this file.

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  longDescription: string;
  badge: string;
  image: string; // Will use a clean 4:3 canvas containing a white background
  purity: string;
  casNumber: string;
  sequence: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  name: "Nuvo Peptide Labs",
  tagline: "Premium Quality Lab-Tested Peptides, Shipped Discreetly Across the UK",
  domain: "nuvopeptidelabs.com", // Will display as DOMAIN.com if pending, but we hardcode this in site config for relative exports or use dynamic relative resolution
  pendingDomain: true, // We will output DOMAIN.com on the live files while pending is true
  primaryKeyword: "retatrutide uk",
  currency: {
    code: "GBP",
    symbol: "£"
  },
  contact: {
    email: "support@nuvopeptidelabs.com",
    ordersEmail: "orders@nuvopeptidelabs.com",
    wholesaleEmail: "wholesale@nuvopeptidelabs.com",
    phone: "+447838207659",
    whatsapp: "447838207659",
    location: "Manchester, UK",
    hqAddress: "Nuvo Peptide Labs, Manchester, United Kingdom"
  },
  business: {
    foundedYear: 2022,
    differentiator: "lab-tested and clean products with focus on discreet and prompt delivery",
    milestones: "collaborations with national and international research and medical labs",
    brandEntitySentence: "Nuvo Peptide Labs is a Manchester-based supplier of high-quality tested peptides, established in 2022, offering pure and clean products with a focus on discreet and fast delivery across the UK."
  },
  orderRules: {
    minOrder: 250,
    freeShippingOver: 500,
    flatShippingFee: 25,
    paymentMethods: ["Bank Transfer"],
    paymentDiscount: "None",
    checkoutStyle: "form-based",
    web3FormsKey: "pending" // Placeholder, user will provide
  },
  categories: [
    "Weight Loss Peptides",
    "Bodybuilding Peptides",
    "Recovery Peptides",
    "Anti-Aging Peptides",
    "Skin and Hair Peptides",
    "Cognitive Peptides",
    "Sexual Health Peptides",
    "Immune Peptides",
    "Gut Health Peptides",
    "Cardiac Peptides",
    "Liver Support Peptides",
    "Research Peptides",
    "Injectable Blends & Combinations"
  ],
  products: [
    {
      id: "retatrutide-5mg",
      name: "Retatrutide 5mg",
      price: 85,
      category: "Weight Loss Peptides",
      description: "Premium Retatrutide UK. Thoroughly tested for absolute purity and quality.",
      longDescription: "Retatrutide is a premium-grade peptide studied for metabolic pathways and energy levels. Our Retatrutide UK is made to the highest standards, with a purity of over 99% verified by strict quality checks.",
      badge: "Verified 99.4% Purity",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=600",
      purity: "99.4%",
      casNumber: "2381089-83-2",
      sequence: "Tyr-Aib-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Gln-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2"
    },
    {
      id: "tirzepatide-10mg",
      name: "Tirzepatide 10mg",
      price: 120,
      category: "Weight Loss Peptides",
      description: "Premium Tirzepatide. Thoroughly tested for absolute purity and consistency.",
      longDescription: "Tirzepatide is a high-grade peptide studied for metabolism and balance. This compound is manufactured under clean laboratory guidelines, delivering a pure, stable powder that dissolves easily.",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      purity: "99.2%",
      casNumber: "2023788-19-2",
      sequence: "Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys(AEEAc-AEEAc-γ-Glu-CO-(CH2)18-CO2H)-Ala-Phe-Val-Gln-Trp-Leu-Met-Asn-Thr-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2"
    },
    {
      id: "semaglutide-5mg",
      name: "Semaglutide 5mg",
      price: 65,
      category: "Weight Loss Peptides",
      description: "Premium Semaglutide. Fully tested for purity and high performance.",
      longDescription: "Semaglutide is a stable and long-lasting peptide. It is widely used for studying insulin pathways and body chemistry models. Each batch is carefully tested to ensure maximum purity.",
      badge: "Certified Pure",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
      purity: "99.1%",
      casNumber: "910463-68-2",
      sequence: "His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-γ-Glu-octadecanedioyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly"
    },
    {
      id: "bpc157-5mg",
      name: "BPC-157 5mg",
      price: 45,
      category: "Recovery Peptides",
      description: "Premium BPC-157. Formulated for high stability and purity.",
      longDescription: "BPC-157 is a peptide comprising 15 amino acids. It is popular for studying cellular recovery and muscle or tissue support. Our BPC-157 is pure, salt-free, and powder-stabilized for maximum shelf life.",
      badge: "High Purity",
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
      purity: "99.6%",
      casNumber: "137525-51-0",
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val"
    },
    {
      id: "tb500-2mg",
      name: "TB-500 2mg (Thymosin Beta-4)",
      price: 40,
      category: "Recovery Peptides",
      description: "Premium TB-500. Created for cell support and research consistency.",
      longDescription: "TB-500 is a peptide consisting of 43 amino acids. It is studied for cell support, muscle recovery, and tissue repair. Provided in sealed vials for clean and safe handling.",
      badge: "99% Purity",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
      purity: "99.3%",
      casNumber: "77591-33-4",
      sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser"
    },
    {
      id: "melanotan-2-10mg",
      name: "Melanotan II 10mg",
      price: 35,
      category: "Skin and Hair Peptides",
      description: "Premium Melanotan II. Perfect for studying pigmentation and skin science.",
      longDescription: "Melanotan II is a high-grade peptide studied for skin tanning processes and defense models. Produced using top-tier synthesis methods to ensure clean, consistent quality.",
      badge: "Top Quality",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
      purity: "99.5%",
      casNumber: "121062-08-6",
      sequence: "Ac-Nle-asp-His-D-Phe-Arg-Trp-Lys-NH2 (Cyclic 2-7)"
    },
    {
      id: "epitalon-10mg",
      name: "Epitalon 10mg",
      price: 60,
      category: "Anti-Aging Peptides",
      description: "Premium Epitalon. Designed for healthy aging and longevity studies.",
      longDescription: "Epitalon is a simple peptide studied for longevity, cell health, and sleep cycle normalization. It dissolves easily in sterile water for clean preparation.",
      badge: "Purity Verified",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
      purity: "99.0%",
      casNumber: "307297-39-8",
      sequence: "Ala-Glu-Asp-Gly"
    },
    {
      id: "cjc-1295-ipamorelin-blend",
      name: "CJC-1295 (No DAC) + Ipamorelin 10mg (5mg/5mg Blend)",
      price: 95,
      category: "Injectable Blends & Combinations",
      description: "Premium blended peptides for maximum synergy and results.",
      longDescription: "This blend combines CJC-1295 and Ipamorelin. The combination is popular for studying growth pathway processes smoothly without unwanted side effects. Provided as a single, uniform powder.",
      badge: "Best Synergistic Blend",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
      purity: "99.3% / 99.4%",
      casNumber: "Mixed (863288-34-0 / 170851-70-4)",
      sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2 / Aib-His-D-2-Nal-D-Phe-Lys-NH2"
    }
  ] as Product[],
  blog: [
    {
      id: "retatrutide-molecular-pathways",
      title: "Exploring the Molecular Pathways of Retatrutide in Weight Regulation Studies",
      slug: "retatrutide-molecular-pathways-study",
      excerpt: "An in-depth analysis of Retatrutide's triple-agonist mechanism (GLP-1, GIP, and glucagon receptors) and its scientific implications in weight loss peptides research in the UK.",
      date: "May 12, 2026",
      author: "Dr. Elizabeth Vance",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
      content: `### Retatrutide: A New Frontier in Triple-Agonist Peptide Research

Retatrutide represents a significant advancement in multi-receptor targeting. Unlike single-agonist peptide sequences (such as Semaglutide) or dual-agonists (such as Tirzepatide), Retatrutide (LY3437943) acts simultaneously on three distinct receptors:
1. **GIP** (Glucose-dependent Insulinotropic Polypeptide)
2. **GLP-1** (Glucagon-Like Peptide-1)
3. **Glucagon**

This unique triple-target profile creates a highly synchronized metabolic response that researchers throughout the UK are investigating. By binding to these three pathways, Retatrutide triggers coordinated cellular signaling that maximizes lipolysis while conserving lean tissue profiles under fasting stress.

#### The Triple Agonist Action Mechanism

The synthesis of GIP, GLP-1, and glucagon receptor affinity in a single sequence of 39 amino acids represents a massive achievement in solid-phase peptide synthesis. The GIP action promotes insulin secretion under high-glucose states and aids adipocyte lipid handling. The GLP-1 action modulates gastric motility and suppresses central nervous appetite signaling. Crucially, the Glucagon action increases energy expenditure directly via thermogenesis and promotes hepatic lipid beta-oxidation.

When researching **retatrutide uk** standards, scientists should monitor changes in thermal outputs, mitochondrial respiration in adipose tissues, and glycogen turnover rates.

#### Storage and Stability in Research Labs

For in-vitro research, peptide integrity is paramount. Like all high-purity peptides, Retatrutide should be stored at -20°C in its lyophilized powder form to prevent hydrolysis. Once reconstituted with bacteriostatic water, the peptide is highly sensitive to temperature and mechanical agitation. It must be kept at 2°C to 8°C and utilized within 14 days to prevent gradual degradation of the fragile triple-agonist amino acid string.`
    },
    {
      id: "peptide-handling-storage-guide",
      title: "Best Practices: Handling, Reconstitution, and Storage of Research Peptides",
      slug: "peptide-handling-storage-guide",
      excerpt: "A comprehensive laboratory protocol guide covering proper reconstitution techniques, sterile handling, and cold-chain temperature preservation of delicate peptides.",
      date: "June 20, 2026",
      author: "Nuvo Lab Research Group",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=600",
      content: `### Protecting Peptide Integrity in Scientific Studies

Peptides are highly delicate sequences of amino acids joined together by peptide bonds. Exposure to high temperatures, mechanical shock, or incorrect pH balances can cause denaturation, leaving your research assays inconsistent and invalid. To assist research laboratories throughout the UK, Nuvo Peptide Labs has assembled this standard laboratory protocol.

#### 1. Temperature Preservation (The Cold-Chain)

Lyophilized peptides arrive vacuum-sealed and are highly stable at room temperature for short-term shipping (up to 4 weeks). However, for long-term storage:
- **Unopened Vials:** Store at -20°C (stable for up to 24 months) or -80°C for absolute preservation. Avoid self-defrosting freezers as temperature fluctuations trigger micro-condensation.
- **Reconstituted Solutions:** Store at 2°C to 8°C. Do not re-freeze reconstituted peptides, as ice-crystal formation shears the molecular structures.

#### 2. Reconstitution Protocols

Reconstitution should occur in a sterile laminar flow hood. 
- **Solvent Selection:** In most cases, sterile Bacteriostatic Water (0.9% benzyl alcohol) is preferred because it prevents bacterial growth during multi-draw research profiles.
- **The Reconstitution Process:**
  1. Allow the peptide vial to reach room temperature before adding the solvent. This prevents condensation inside the vial.
  2. Clean the rubber stopper with an isopropyl alcohol wipe.
  3. Gently trickle the bacteriostatic water down the inside glass wall of the vial. Do not spray directly onto the lyophilized powder cake.
  4. Swirl the vial gently in a circular motion. **NEVER shake the vial.** Shaking introduces air bubbles and physical shear forces that can damage complex tertiary peptide folding structures.`
    },
    {
      id: "verify-purity-hplc-ms",
      title: "Understanding Peptide Purity: HPLC and Mass Spectrometry Analysis",
      slug: "verify-purity-hplc-ms",
      excerpt: "Why 99%+ peptide purity matters in biochemical research. Learn how to interpret analytical data to safeguard your experimental models.",
      date: "July 05, 2026",
      author: "Dr. Marcus Thorne",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      content: `### Purity as a Scientific Baseline

In quantitative biological assays, the presence of even 2% impurities can introduce uncontrolled variables, leading to false-positive readings or receptor toxicity in cell culture models. High-purity research peptides are characterized using two primary analytical standards: High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS).

#### High-Performance Liquid Chromatography (HPLC)

HPLC is used to measure peptide purity (expressed as a percentage). This analytical technique separates compounds within a mixture based on their hydrophobic interactions.
- **The Chromatogram:** A visual trace displaying peaks as compounds pass the detector.
- **Purity Calculation:** The 'Area Under the Curve' (AUC) of the main peptide peak compared to all secondary peaks combined.
- At Nuvo Peptide Labs, our production batches are rejected if the HPLC purity drops below 99.0%.

#### Mass Spectrometry (MS)

While HPLC tells you how pure the mixture is, Mass Spectrometry confirms the *identity* of the compound. It measures the mass-to-charge ratio of the ionized peptide.
- **Molecular Weight Verification:** The MS profile must exhibit a peak matching the theoretical molecular weight of the peptide sequence exactly.
- If a supplier displays HPLC data without matching MS reports, there is no verification that the pure substance is actually the peptide you ordered.`
    }
  ] as BlogPost[],
  faqs: [
    {
      question: "What is your minimum order amount and shipping fee?",
      answer: "We maintain a minimum order requirement of £250. Orders below this amount cannot be processed. For orders between £250 and £500, a flat shipping fee of £25 is applied. Orders of £500 or more receive free express shipping."
    },
    {
      question: "How are orders paid for and processed?",
      answer: "We accept payment via direct bank transfer (BACS / Faster Payments). Once you submit an order, you will receive our business bank transfer coordinates. Orders are held in queue and dispatched promptly within 24 hours of funds clearing. Your order is packaged securely and discreetly."
    },
    {
      question: "Where are you located and which regions do you ship to?",
      answer: "Nuvo Peptide Labs is established and located in Manchester, United Kingdom. We ship exclusively to addresses within the United Kingdom. All shipments are dispatched using tracked, signed-for, and discreet express carrier services."
    },
    {
      question: "How do you guarantee the purity and quality of your peptides?",
      answer: "Every peptide batch undergoes strict analytical testing. We verify compound identity using Mass Spectrometry (MS) and measure batch purity using High-Performance Liquid Chromatography (HPLC). We maintain a hard threshold of >99% purity for all our research compounds, ensuring consistent and reproducible results for UK researchers."
    },
    {
      question: "Can I make a wholesale or custom inquiry?",
      answer: "Yes, we welcome inquiries from universities, pharmaceutical research facilities, and medical laboratories looking for bulk or custom peptide synthesis. Please use our Wholesale form or email wholesale@nuvopeptidelabs.com directly."
    }
  ] as FAQItem[]
};

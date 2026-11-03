// Data types for BCT Website with complete source provenance tracking

export interface SourceProvenance {
  sourceDocument: "كتيب التقديم.pdf" | "Bct Ai....pdf" | "Official BCT Registry";
  sourcePage?: number | string;
  asOf?: string;
  needsReview?: boolean;
}

export interface CompanyInfo extends SourceProvenance {
  nameAr: string;
  nameEn: string;
  tagline: string;
  description: string;
  commercialReg: string;
  taxNumber: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  addressDetailed: string;
  landmark: string;
  officialBrochureWebsite: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
  };
}

export interface ServiceItem extends SourceProvenance {
  id: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  icon: string;
  targetAudience: string;
}

export interface UniversityProfile extends SourceProvenance {
  id: string;
  nameAr: string;
  nameEn: string;
  establishedYear: number;
  governorate: string;
  city: string;
  tier: "major" | "regional";
  overview: string;
  rankingBadge?: string;
  hospitalsAndTraining: string;
  studentLife: string;
  housingAndTransport: string;
  internationalAccreditations: string;
  strengths: string[];
  featuredFaculties: {
    facultyName: string;
    minScoreHistorical: string;
    notes?: string;
  }[];
}

export interface AdmissionStep extends SourceProvenance {
  stepNumber: number;
  title: string;
  description: string;
  actionItems: string[];
  criticalWarnings?: string[];
  estimatedTime?: string;
  feesRequired?: string;
}

export interface CertificateRequirement extends SourceProvenance {
  id: string;
  certificateName: string;
  country: string;
  batchesCovered: string;
  electronicSubmissionDocs: string[];
  physicalFileDocs: string[];
  specialConditions: string[];
}

export interface FeeItem extends SourceProvenance {
  id: string;
  serviceOrFee: string;
  amountUsd: number | string;
  payableTo: string;
  timing: string;
  notes: string;
  isMandatory: boolean;
}

export interface ThresholdItem extends SourceProvenance {
  facultyName: string;
  majorUniversitiesMin: string;
  regionalUniversitiesMin: string;
  category: "medical" | "engineering" | "humanities" | "scientific";
}

export interface FAQItem extends SourceProvenance {
  id: string;
  category: "admissions" | "residency" | "fees" | "transfer" | "housing";
  question: string;
  answer: string;
}

export interface SchemeDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  eligibility: {
    age?: string;
    income?: string;
    employment?: string;
    maritalStatus?: string;
    other?: string[];
  };
  documents: {
    name: string;
    required: boolean;
    description: string;
  }[];
  applicationSteps: {
    step: number;
    title: string;
    description: string;
    duration?: string;
  }[];
  interestRate: number;
  minInvestment: number;
  maxInvestment: number;
  tenure: { min: number; max: number };
  online: boolean;
  onlineLink?: string;
  offlineLocations?: string[];
  popular: boolean;
  benefits: string[];
}

export const schemesData: Record<string, SchemeDetails> = {
  "sukanya-samriddhi": {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    category: "Savings",
    description: "Government-backed savings scheme for girl child education and marriage expenses with tax benefits.",
    overview: "Sukanya Samriddhi Yojana (SSY) is a small savings scheme launched by the Government of India as a part of the 'Beti Bachao, Beti Padhao' campaign. It aims to encourage parents to save for the future education and marriage expenses of their girl child. The scheme offers one of the highest interest rates among government savings schemes and provides tax benefits under Section 80C.",
    eligibility: {
      age: "Girl child below 10 years of age",
      income: "No income limit",
      employment: "Not applicable",
      other: ["Only for Indian residents", "Maximum 2 accounts per family", "Account can be opened by natural or legal guardian"]
    },
    documents: [
      { name: "Birth Certificate", required: true, description: "Original birth certificate of the girl child" },
      { name: "Aadhaar Card", required: true, description: "Aadhaar card of the girl child" },
      { name: "Parent's ID Proof", required: true, description: "Aadhaar/PAN/Voter ID of parent or guardian" },
      { name: "Parent's Address Proof", required: true, description: "Utility bill, passport, or bank statement" },
      { name: "Passport Size Photos", required: true, description: "2 recent photographs of parent and child" },
      { name: "Medical Certificate", required: false, description: "Required if multiple births (twins/triplets)" }
    ],
    applicationSteps: [
      { step: 1, title: "Visit Bank or Post Office", description: "Go to any authorized bank branch or post office near you with all required documents.", duration: "Same day" },
      { step: 2, title: "Fill Application Form", description: "Request and fill out the SSY account opening form. Provide accurate details of the girl child and guardian.", duration: "15-20 minutes" },
      { step: 3, title: "Submit Documents", description: "Attach photocopies of all required documents along with the application form.", duration: "5 minutes" },
      { step: 4, title: "Make Initial Deposit", description: "Deposit the minimum amount of ₹250 (or up to ₹1.5 lakh) to activate the account.", duration: "10 minutes" },
      { step: 5, title: "Receive Passbook", description: "Collect your SSY passbook which contains account details and transaction records.", duration: "1-2 days" }
    ],
    interestRate: 8.2,
    minInvestment: 250,
    maxInvestment: 150000,
    tenure: { min: 21, max: 21 },
    online: true,
    onlineLink: "https://www.india.gov.in/sukanya-samriddhi-yojana",
    offlineLocations: ["Post Office", "SBI", "ICICI Bank", "HDFC Bank", "Axis Bank"],
    popular: true,
    benefits: [
      "Highest interest rate among all small savings schemes",
      "Tax deduction under Section 80C up to ₹1.5 lakh",
      "Interest earned is completely tax-free",
      "Account can be transferred anywhere in India",
      "Partial withdrawal allowed for higher education after 18 years"
    ]
  },
  "mahila-samman": {
    id: "mahila-samman",
    name: "Mahila Samman Savings Certificate",
    category: "Savings",
    description: "Special one-time savings scheme exclusively for women offering higher interest rates.",
    overview: "Mahila Samman Savings Certificate is a new small savings scheme launched in 2023 exclusively for women and girls. It offers a fixed interest rate of 7.5% per annum with a 2-year tenure. This scheme was introduced to promote financial independence among women and encourage them to save.",
    eligibility: {
      age: "Women of any age",
      income: "No income limit",
      employment: "Not applicable",
      maritalStatus: "Any",
      other: ["Must be an Indian resident", "Minors can open through guardian", "Multiple accounts allowed up to ₹2 lakh total"]
    },
    documents: [
      { name: "Aadhaar Card", required: true, description: "Aadhaar card of the applicant" },
      { name: "PAN Card", required: true, description: "PAN card for investments above ₹50,000" },
      { name: "Address Proof", required: true, description: "Utility bill, passport, or bank statement" },
      { name: "Passport Size Photo", required: true, description: "Recent photograph of the applicant" },
      { name: "Guardian's Documents", required: false, description: "Required if opening for a minor" }
    ],
    applicationSteps: [
      { step: 1, title: "Choose Location", description: "Visit any authorized post office or bank branch that offers MSSC.", duration: "Same day" },
      { step: 2, title: "Complete Application", description: "Fill out the Mahila Samman Savings Certificate application form with personal details.", duration: "10-15 minutes" },
      { step: 3, title: "Submit KYC Documents", description: "Provide photocopies of Aadhaar, PAN, and address proof.", duration: "5 minutes" },
      { step: 4, title: "Make Investment", description: "Deposit minimum ₹1,000 or any amount up to ₹2 lakh.", duration: "10 minutes" },
      { step: 5, title: "Receive Certificate", description: "Get your savings certificate as proof of investment.", duration: "Same day" }
    ],
    interestRate: 7.5,
    minInvestment: 1000,
    maxInvestment: 200000,
    tenure: { min: 2, max: 2 },
    online: true,
    onlineLink: "https://www.indiapost.gov.in",
    offlineLocations: ["Post Office", "Select Public Sector Banks"],
    popular: true,
    benefits: [
      "Higher interest rate than regular FDs",
      "Exclusively designed for women empowerment",
      "Flexible investment from ₹1,000 to ₹2 lakh",
      "Partial withdrawal up to 40% after 1 year",
      "Simple and quick account opening process"
    ]
  },
  "mudra-yojana": {
    id: "mudra-yojana",
    name: "Pradhan Mantri Mudra Yojana",
    category: "Entrepreneurship",
    description: "Collateral-free loans up to ₹10 lakh for women entrepreneurs to start or expand businesses.",
    overview: "Pradhan Mantri Mudra Yojana (PMMY) provides collateral-free loans to micro and small enterprises. The scheme has three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5,00,001 to ₹10 lakh). Women entrepreneurs get priority under this scheme with special interest rates.",
    eligibility: {
      age: "18 years and above",
      income: "No income restrictions",
      employment: "Self-employed or aspiring entrepreneurs",
      other: ["Must have a viable business plan", "No collateral required", "Women get priority processing"]
    },
    documents: [
      { name: "Aadhaar Card", required: true, description: "Government-issued identity proof" },
      { name: "PAN Card", required: true, description: "For loan amounts above ₹50,000" },
      { name: "Business Plan", required: true, description: "Detailed plan for new or existing business" },
      { name: "Address Proof", required: true, description: "Proof of residence and business address" },
      { name: "Bank Statements", required: true, description: "Last 6 months bank statements" },
      { name: "Business Registration", required: false, description: "If business is already registered" },
      { name: "Quotations", required: false, description: "For machinery/equipment purchases" }
    ],
    applicationSteps: [
      { step: 1, title: "Prepare Business Plan", description: "Create a detailed business plan including projected income and expenses.", duration: "1-3 days" },
      { step: 2, title: "Visit Bank Branch", description: "Go to any bank, NBFC, or MFI that offers Mudra loans.", duration: "Same day" },
      { step: 3, title: "Submit Application", description: "Fill the Mudra loan application form and attach all documents.", duration: "30 minutes" },
      { step: 4, title: "Document Verification", description: "Bank verifies your documents and assesses business viability.", duration: "3-7 days" },
      { step: 5, title: "Loan Sanction", description: "Upon approval, loan amount is disbursed to your account.", duration: "7-14 days" }
    ],
    interestRate: 8.5,
    minInvestment: 50000,
    maxInvestment: 1000000,
    tenure: { min: 3, max: 5 },
    online: true,
    onlineLink: "https://www.mudra.org.in",
    offlineLocations: ["All Nationalized Banks", "Private Banks", "NBFCs", "MFIs"],
    popular: true,
    benefits: [
      "No collateral or guarantor required",
      "Lower interest rates for women",
      "Flexible repayment options",
      "Mudra Card for working capital needs",
      "Free accident insurance coverage"
    ]
  },
  "stand-up-india": {
    id: "stand-up-india",
    name: "Stand Up India",
    category: "Entrepreneurship",
    description: "Bank loans for SC/ST and women entrepreneurs to set up greenfield enterprises.",
    overview: "Stand Up India scheme facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, or trading sectors.",
    eligibility: {
      age: "18 years and above",
      income: "No income limit",
      employment: "First-time entrepreneurs only",
      other: ["Must be SC/ST or woman", "Greenfield enterprises only", "51% ownership required"]
    },
    documents: [
      { name: "Identity Proof", required: true, description: "Aadhaar, PAN, Voter ID, or Passport" },
      { name: "Caste Certificate", required: false, description: "Required for SC/ST category" },
      { name: "Business Project Report", required: true, description: "Detailed project report with financials" },
      { name: "Address Proof", required: true, description: "Residence and proposed business address" },
      { name: "Bank Statements", required: true, description: "Last 6-12 months statements" },
      { name: "ITR/Income Proof", required: true, description: "Income tax returns if applicable" }
    ],
    applicationSteps: [
      { step: 1, title: "Register Online", description: "Create account on Stand Up India portal and fill initial application.", duration: "1 day" },
      { step: 2, title: "Prepare Project Report", description: "Develop comprehensive business project report with assistance if needed.", duration: "1-2 weeks" },
      { step: 3, title: "Visit Bank Branch", description: "Approach any bank branch with your application and documents.", duration: "Same day" },
      { step: 4, title: "Application Processing", description: "Bank processes application and may request additional information.", duration: "2-4 weeks" },
      { step: 5, title: "Loan Disbursement", description: "Upon approval, loan is disbursed as per project requirements.", duration: "1-2 weeks" }
    ],
    interestRate: 9.0,
    minInvestment: 1000000,
    maxInvestment: 10000000,
    tenure: { min: 5, max: 7 },
    online: false,
    offlineLocations: ["All Scheduled Commercial Banks"],
    popular: false,
    benefits: [
      "Large loan amount for business establishment",
      "Margin money through convergence with other schemes",
      "Hand-holding support available",
      "Credit guarantee coverage",
      "Working capital included in loan"
    ]
  },
  "matritva-vandana": {
    id: "matritva-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana",
    category: "Maternity",
    description: "Direct cash transfer of ₹11,000 to pregnant and lactating mothers for first child.",
    overview: "Pradhan Mantri Matru Vandana Yojana (PMMVY) is a maternity benefit program that provides cash incentive of ₹11,000 for the first living child in three installments to pregnant and lactating mothers to improve health and nutrition during pregnancy.",
    eligibility: {
      age: "19 years and above",
      income: "No income limit",
      employment: "Not employed in government sector",
      maritalStatus: "Pregnant or lactating",
      other: ["First living child only", "Not receiving maternity benefits from employer", "Must register pregnancy early"]
    },
    documents: [
      { name: "Aadhaar Card", required: true, description: "Aadhaar card of the beneficiary" },
      { name: "Bank Account Details", required: true, description: "Aadhaar-linked bank account" },
      { name: "MCP Card", required: true, description: "Mother and Child Protection card" },
      { name: "Registration Form", required: true, description: "PMMVY registration form" },
      { name: "Husband's Aadhaar", required: false, description: "If applicable" }
    ],
    applicationSteps: [
      { step: 1, title: "Register Pregnancy", description: "Register pregnancy at nearest Anganwadi center or health facility.", duration: "Same day" },
      { step: 2, title: "Fill Registration Form", description: "Complete Form 1-A for registration and first installment.", duration: "15 minutes" },
      { step: 3, title: "Attend Health Check-ups", description: "Complete at least one ANC visit for first installment.", duration: "As per schedule" },
      { step: 4, title: "Submit Subsequent Forms", description: "Submit Form 1-B and 1-C for second and third installments.", duration: "Post childbirth" },
      { step: 5, title: "Receive Benefits", description: "Amount credited directly to bank account in installments.", duration: "2-4 weeks each" }
    ],
    interestRate: 0,
    minInvestment: 0,
    maxInvestment: 11000,
    tenure: { min: 1, max: 1 },
    online: true,
    onlineLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
    offlineLocations: ["Anganwadi Centers", "Public Health Centers", "Sub-district Hospitals"],
    popular: true,
    benefits: [
      "Direct cash benefit of ₹11,000",
      "Promotes institutional delivery",
      "Encourages early registration of pregnancy",
      "Linked to health and nutrition services",
      "Additional ₹1,000 for hospital delivery"
    ]
  },
  "atal-pension": {
    id: "atal-pension",
    name: "Atal Pension Yojana",
    category: "Pension",
    description: "Guaranteed pension scheme for unorganized sector workers with government co-contribution.",
    overview: "Atal Pension Yojana (APY) is a government-backed pension scheme primarily targeted at workers in the unorganized sector. It provides a guaranteed minimum pension of ₹1,000 to ₹5,000 per month after the age of 60, based on the contribution amount and age of joining.",
    eligibility: {
      age: "18 to 40 years",
      income: "No income limit",
      employment: "Primarily for unorganized sector",
      other: ["Must have savings bank account", "Aadhaar linked to bank account", "Mobile number linked to bank"]
    },
    documents: [
      { name: "Aadhaar Card", required: true, description: "For KYC and linking with bank account" },
      { name: "Bank Account", required: true, description: "Active savings bank account" },
      { name: "Mobile Number", required: true, description: "Registered with bank account" },
      { name: "Nominee Details", required: true, description: "Spouse details (for married) or other nominee" }
    ],
    applicationSteps: [
      { step: 1, title: "Visit Bank Branch", description: "Go to your bank branch where you have a savings account.", duration: "Same day" },
      { step: 2, title: "Fill APY Form", description: "Complete the APY registration form with personal and nominee details.", duration: "10 minutes" },
      { step: 3, title: "Choose Pension Amount", description: "Select desired pension amount (₹1,000 to ₹5,000 per month).", duration: "5 minutes" },
      { step: 4, title: "Auto-Debit Mandate", description: "Provide auto-debit mandate for monthly contributions.", duration: "5 minutes" },
      { step: 5, title: "Receive PRAN", description: "Get your Permanent Retirement Account Number.", duration: "1-2 days" }
    ],
    interestRate: 8.0,
    minInvestment: 42,
    maxInvestment: 210,
    tenure: { min: 20, max: 42 },
    online: true,
    onlineLink: "https://www.npscra.nsdl.co.in/scheme-details.php",
    offlineLocations: ["All Banks", "Post Offices"],
    popular: false,
    benefits: [
      "Guaranteed pension of ₹1,000-5,000 per month",
      "Government co-contribution for eligible subscribers",
      "Spouse continues to receive pension after death",
      "Return of corpus to nominee",
      "Tax benefits under Section 80CCD"
    ]
  }
};

export const getSchemeById = (id: string): SchemeDetails | undefined => {
  return schemesData[id];
};

export const getAllSchemes = (): SchemeDetails[] => {
  return Object.values(schemesData);
};

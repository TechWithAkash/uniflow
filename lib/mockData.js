// ─── Mock Profile Data ───────────────────────────────────────────────────────
export const mockProfile = {
  academic: {
    college: "Don Bosco Institute of Technology",
    degree: "B.E. Computer Engineering",
    branch: "Computer Engineering",
    year: 4,
    cgpa: 8.2,
    attendance: 78,
    certificates: [
      { name: "AWS Cloud Practitioner", date: "2025-08-15", issuer: "Amazon" },
      { name: "Google Data Analytics", date: "2025-03-20", issuer: "Google" },
    ],
    achievements: [
      { title: "Hackathon Winner – HackIITB 2025", date: "2025-10-12" },
      { title: "Best Project Award – DBIT TechFest", date: "2025-02-05" },
    ],
    cgpaHistory: [
      { semester: 1, cgpa: 7.4 }, { semester: 2, cgpa: 7.8 },
      { semester: 3, cgpa: 7.9 }, { semester: 4, cgpa: 8.0 },
      { semester: 5, cgpa: 8.1 }, { semester: 6, cgpa: 8.2 },
      { semester: 7, cgpa: 8.2 },
    ],
  },
  health: {
    status: "good",
    bloodGroup: "B+",
    conditions: [],
    allergies: ["Penicillin"],
    lastCheckup: "2025-12-10",
    certificateExpiry: "2026-06-15",
    doctorVisits: [
      { date: "2025-12-10", reason: "Annual checkup", prescription: "None" },
      { date: "2025-09-05", reason: "Viral fever", prescription: "Paracetamol" },
    ],
  },
  career: {
    skills: ["React", "Node.js", "Python", "MongoDB", "TypeScript", "Docker", "AWS"],
    projects: [
      { name: "UniFlow", description: "AI-powered student life platform", techStack: ["Next.js", "Node.js", "Python", "MongoDB"], url: "#" },
      { name: "AgroVision", description: "Computer vision for crop disease detection", techStack: ["Python", "OpenCV", "Flask"], url: "#" },
      { name: "MedAssist", description: "RAG-based prescription analysis system", techStack: ["Python", "Neo4j", "PaddleOCR"], url: "#" },
    ],
    internships: [
      { company: "TechCorp India", role: "SWE Intern", duration: "3 months", year: 2025 },
    ],
    resumeUrl: "#",
    resumeUpdated: "2026-02-10",
    linkedinUrl: "#",
    applicationsCount: 4,
    targetRole: "Software Engineer",
  },
  finance: {
    scholarships: [
      { name: "HDFC Badhte Kadam", amount: 50000, status: "eligible", deadline: "2026-03-21" },
      { name: "Inspire Scholarship", amount: 80000, status: "applied", deadline: "2026-04-01" },
    ],
    bankAccountLinked: true,
    loanStatus: "none",
    feeStatus: "paid",
  },
  integrations: {
    digilocker: { connected: true, lastSync: "2026-03-10" },
    abha: { connected: true, lastSync: "2026-03-10" },
    apaar: { connected: false, lastSync: null },
  },
};

// ─── Readiness Score ────────────────────────────────────────────────────────
export const mockReadiness = {
  score: 74,
  breakdown: {
    academic: 82,
    career: 70,
    health: 90,
    finance: 65,
    identity: 60,
  },
  missing: [
    { domain: "identity", item: "APAAR ID not connected", priority: "high" },
    { domain: "career", item: "No target company research documented", priority: "medium" },
    { domain: "finance", item: "Income proof not uploaded", priority: "medium" },
    { domain: "career", item: "Resume not updated in 30+ days", priority: "low" },
  ],
  recommendations: [
    "Connect your APAAR ID to boost identity score by +15 points",
    "Upload income proof to unlock scholarship applications",
    "Update your resume — it hasn't been touched in 34 days",
  ],
  history: [
    { score: 56, recordedAt: "2025-10-01" },
    { score: 61, recordedAt: "2025-11-01" },
    { score: 65, recordedAt: "2025-12-01" },
    { score: 68, recordedAt: "2026-01-01" },
    { score: 71, recordedAt: "2026-02-01" },
    { score: 74, recordedAt: "2026-03-01" },
  ],
};

// ─── Documents ───────────────────────────────────────────────────────────────
export const mockDocuments = [
  { id: "d1", name: "Degree Certificate", type: "degree_cert", fileType: "pdf", fileSize: 245000, verified: true, verifiedBy: "Mumbai University", expiryDate: null, uploadedAt: "2025-06-01" },
  { id: "d2", name: "CGPA Transcript", type: "cgpa_transcript", fileType: "pdf", fileSize: 180000, verified: true, verifiedBy: "DBIT", expiryDate: null, uploadedAt: "2025-06-01" },
  { id: "d3", name: "Aadhaar Card", type: "id_proof", fileType: "pdf", fileSize: 95000, verified: true, verifiedBy: "DigiLocker", expiryDate: null, uploadedAt: "2025-05-10" },
  { id: "d4", name: "Health Certificate", type: "health_cert", fileType: "pdf", fileSize: 120000, verified: true, verifiedBy: "system", expiryDate: "2026-06-15", uploadedAt: "2025-12-10" },
  { id: "d5", name: "Income Proof", type: "income_proof", fileType: null, fileSize: null, verified: false, verifiedBy: null, expiryDate: null, uploadedAt: null, missing: true },
  { id: "d6", name: "Bank Statement", type: "other", fileType: "pdf", fileSize: 310000, verified: false, verifiedBy: null, expiryDate: null, uploadedAt: "2026-01-15" },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications = [
  { id: "n1", type: "opportunity", priority: "high", title: "Scholarship deadline in 5 days", message: "You qualify for HDFC Badhte Kadam (₹50,000). Deadline: March 21.", actionUrl: "/bundle?purpose=scholarship", read: false, createdAt: "2026-03-16T00:00:00Z" },
  { id: "n2", type: "risk", priority: "high", title: "Attendance alert", message: "Your attendance is at 78%. Minimum required is 75%. Maintain it carefully.", actionUrl: "/dashboard", read: false, createdAt: "2026-03-15T10:00:00Z" },
  { id: "n3", type: "expiry", priority: "medium", title: "Health certificate expiring in 91 days", message: "Your health certificate expires June 15. Renew it to maintain your readiness score.", actionUrl: "/documents", read: false, createdAt: "2026-03-14T09:00:00Z" },
  { id: "n4", type: "completion", priority: "low", title: "Complete your skills section", message: "Add 2 more skills to unlock new job recommendations from your AI advisor.", actionUrl: "/dashboard", read: true, createdAt: "2026-03-13T08:00:00Z" },
  { id: "n5", type: "deadline", priority: "medium", title: "Resume not updated", message: "Your resume hasn't been updated in 34 days. Recruiters prefer recently updated profiles.", actionUrl: "/dashboard", read: true, createdAt: "2026-03-12T07:00:00Z" },
];

// ─── Consent Requests ─────────────────────────────────────────────────────────
export const mockConsentRequests = [
  { id: "c1", institutionName: "Infosys Ltd.", documentsRequested: ["degree_cert", "cgpa_transcript", "id_proof"], purpose: "Job Application – Graduate Hire 2026", status: "pending", requestedAt: "2026-03-15T14:30:00Z" },
  { id: "c2", institutionName: "TCS Digital", documentsRequested: ["degree_cert", "cgpa_transcript"], purpose: "Campus Placement Verification", status: "approved", requestedAt: "2026-03-10T11:00:00Z", respondedAt: "2026-03-10T15:30:00Z", expiresAt: "2026-03-17T15:30:00Z" },
  { id: "c3", institutionName: "State Bank of India", documentsRequested: ["id_proof", "income_proof", "cgpa_transcript"], purpose: "Educational Loan Application", status: "denied", requestedAt: "2026-03-01T09:00:00Z", respondedAt: "2026-03-02T10:00:00Z" },
];

// ─── Bundle Templates ─────────────────────────────────────────────────────────
export const bundleTemplates = {
  job_application:   { docs: ["degree_cert", "cgpa_transcript", "id_proof", "health_cert"], label: "Job Application" },
  scholarship:       { docs: ["cgpa_transcript", "income_proof", "id_proof"], label: "Scholarship" },
  college_admission: { docs: ["degree_cert", "cgpa_transcript", "id_proof", "health_cert"], label: "College Admission" },
  bank_loan:         { docs: ["id_proof", "income_proof", "cgpa_transcript"], label: "Bank Loan" },
};

// ─── Chat History (AI Advisor) ────────────────────────────────────────────────
export const mockChatHistory = [
  {
    role: "assistant",
    content: "👋 Hi Akash! I'm your UniFlow AI Career Advisor. I have full access to your profile — CGPA 8.2, 7 skills, 3 projects, 1 internship. What would you like to discuss today?",
  },
];

// ─── AI Responses (mock) ──────────────────────────────────────────────────────
export const mockAIResponses = {
  default: `Based on your profile (CGPA: 8.2, Skills: React, Node.js, Python, MongoDB), here's my assessment:

**Strengths:**
- Strong CGPA puts you in the top 20% of applicants at most tech companies
- Your full-stack profile (React + Node.js + Python) is highly sought after
- 3 projects with real-world impact demonstrate practical ability

**Immediate Actions This Week:**
- Update your resume with your UniFlow and AgroVision projects
- Apply to at least 5 companies — you currently have only 4 applications
- Connect your APAAR ID to boost your readiness score by 15 points

**For Google specifically:** Your CGPA is competitive. You need stronger DSA preparation. I recommend LeetCode Medium problems focused on Graphs and DP for 30 days before applying.`,

  google: `For a **Google SWE role**, here's a targeted plan based on your profile:

**What you have ✅**
- CGPA 8.2 meets Google's minimum threshold (~7.5+)
- Python skills are strong — Google uses Python extensively
- Project diversity shows versatility

**What you're missing ❌**
- No competitive programming track record on your profile
- System design experience not documented
- No open-source contributions listed

**30-Day Plan:**
1. Week 1-2: LeetCode — 2 Medium problems/day (Arrays, Trees, Graphs)
2. Week 3: System Design — study Grokking the System Design Interview
3. Week 4: Mock interviews on Pramp or Interviewing.io
4. Apply through Google's campus recruitment portal immediately`,
  
  skills: `Missing skills for **top-tier product companies** based on your current profile:

**High Priority Gaps:**
- System Design fundamentals (not documented in your profile)
- Data Structures & Algorithms practice (no competitive profile linked)
- Kubernetes / container orchestration (companies expect this at SWE-2 level)

**Medium Priority:**
- GraphQL (increasingly preferred over REST)
- Redis / caching strategies
- CI/CD pipeline experience

**Your strength:** Your ML exposure (AgroVision, MedAssist) gives you an edge for ML-adjacent SWE roles that most CS graduates lack. Lean into this.`,
};

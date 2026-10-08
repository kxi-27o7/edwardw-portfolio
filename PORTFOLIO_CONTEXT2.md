# Portfolio Specification: Digital Space Concept

## Profile Overview
- **Name**: Edward Wibowo
- **Role**: Software Engineer & Machine Learning Developer
- **University**: Bina Nusantara (BINUS) University Alam Sutera
- **GPA**: 3.97 / 4.00
- **Contact**: edwardwibo270@gmail.com | github.com/kxi-27o7 | linkedin.com/in/edward-wibowo

---

## Design System & Aesthetic: Digital Space

### Visual Identity & Canvas
- **Base Environment**: Deep Void Dark Canvas (`#05070C` to `#0A0E17`).
- **Background Layering**:
  - **Starry Particle Field**: Persistently rendered canvas with slow-moving particles running smoothly across the entire viewport.
  - **Digital Terrain / Wireframe Mesh**: Reactive ambient gradient mesh (cyan, violet, indigo) anchored beneath the hero section that fades into the dark void upon scrolling.
- **Border Architecture & Framing**:
  - Structural 1.5px glassmorphic framed cards (`border-white/10` or `border-neutral-800/80`).
  - Dynamic hover transitions shifting border glow and drop-shadows to match individual project theme colors.
- **Hero Entrance Accent (One-Time Warp-Jump Line Animation)**:
  - Multi-length glowing horizontal line vectors beneath/around the Hero container.
  - On initial page load, lines expand laterally from center out (duration ~0.6s–0.8s, `ease-out`) with an indigo glow to simulate entering space, settling into clean static divider borders. Does not repeat on scrolling or other sections.

---

## Page Architecture & Layout Breakdown

### 1. Navigation Bar (Floating Glass Capsule)
- **Position**: Fixed floating pill centered at top (`top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl`).
- **Style**: Semi-transparent dark glass backdrop (`bg-[#05070C]/70 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.12)]`).
- **Left**: `EdW.` monospace brand logo
- **Center**: Quick-scroll anchors (`01. Projects`, `02. Experience`, `03. Stack`).
- **Right**: High-contrast pill button `[Resume.pdf ↗]` + framed social icon links (`GitHub`, `LinkedIn`).

---

### 2. Hero Section (Digital Space Interactive Above-the-Fold)
- **Top System Badge**:
  - `BINUS UNIVERSITY • GPA 3.97 / 4.00 • S.KOM CANDIDATE`
- **Interactive Developer Identity (Syntax-Highlighted Monospace JSON)**:
  - Formatted in a clean glassmorphic terminal container with dark syntax highlighting (`JetBrains Mono` or `Fira Code`):
  ```json
  {
    "developer": "Edward Wibowo",
    "role": "Software Engineer & Machine Learning Developer",
    "location": "Jakarta, ID",
    "status": "Available for Internships"
  }

---

### 3. About & Core Focus Grid (Directly Below Hero)
- **Section Heading**: `// 01. ABOUT & CORE FOCUS`
- **Compact Narrative Bio**:
  "Computer Science student at BINUS University focused on building intelligent systems to solve real-world problems. I work across both traditional Machine Learning and Deep Learning—engineering models that draw insights from complex data and solve practical challenges.
  
  Beyond AI development, I architect the full-stack software needed to bring models into production. Whether crafting responsive frontends, designing secure backend APIs, or training intelligent pipelines, I enjoy turning complex technical problems into clean, reliable software."

- **3-Column Glass Card Focus Grid**:
  1. **AI Engineering**: ML + Deep Learning Systems
  2. **Product Delivery**: Full-stack Product Architecture 
  3. **Research Mindset**: Robust, explainable, deployable solutions

---

### 4. Featured Projects (3-Column Direct-Impact Breakdown)
- **Section Heading**: `// 02. Case Studies - Selected product work`

#### Universal Project Card Specs:
- **Card Top Bar**: Category Pill Tag + Direct Actions (`[GitHub Repo]` & `[Live Demo / Paper]`).
- **Card Subhead**: Project Title, Role, and Timeline Tag separated by interpunct dots (`•`).
- **3-Column Technical Breakdown Grid** (`grid-cols-1 lg:grid-cols-3 gap-4`):
  - <span style="color:#EF4444">●</span> **THE CHALLENGE** (Problem statement & bottleneck)
  - <span style="color:#3B82F6">●</span> **ENGINEERING APPROACH** (Architecture, algorithms & pipelines)
  - <span style="color:#10B981">●</span> **MEASURABLE IMPACT** (Metrics, accuracy scores, latency gains)
- **Card Bottom**: Monospaced tech pill tags (glow-highlight on hover).

#### Project Entries:

1. **Collabra — Project Management Platform**
   - **Theme**: Indigo (`#6366F1`) | Glow: `rgba(99, 102, 241, 0.15)`
   - **Tech**: FastAPI, SQLModel, PostgreSQL, JavaScript, Docker, Render
   - **PROBLEM**: Software teams need real-time task tracking without complex setup or loose permission management across members.
   - **SOLUTION**: Engineered a modular REST API with custom RBAC middleware (owner/member levels) and containerized deployment.
   - **IMPACT**: Delivered low-latency query execution with relational PostgreSQL schemas on Render.

2. **BankGuard — Mobile Banking Fraud Detection**
   - **Theme**: Emerald (`#10B981`) | Glow: `rgba(16, 185, 129, 0.15)`
   - **Tech**: Python, Flask, Scikit-Learn, Pandas, MongoDB, Vercel
   - **PROBLEM**: Mobile transaction fraud requires real-time detection on imbalanced datasets, where standard accuracy metrics fail.
   - **SOLUTION**: Built an end-to-end inference pipeline featuring dynamic rolling stats and a threshold-tuned Random Forest model.
   - **IMPACT**: Processed 1.67M+ rows, achieving ~97.3% fraud recall on test evaluations with sub-second API latency on Vercel.

3. **SeeFlood — Flood Severity Classification System**
   - **Theme**: Sky Blue (`#0EA5E9`) | Glow: `rgba(14, 165, 233, 0.15)`
   - **Tech**: Python, PyTorch, Torchvision, EfficientNet-B0, Scikit-Learn, NumPy
   - **PROBLEM**: Disaster assessment needs rapid flood severity classification, where standard multi-class models ignore continuous progression.
   - **SOLUTION**: Fine-tuned EfficientNet-B0 in PyTorch using image augmentation and an ordinal regression loss formulation.
   - **IMPACT**: Validated performance via MAE and confusion matrices for reliable disaster response metrics.

---

### 5. Experience Matrix (Asymmetric Bento Grid) - Personal & Professional Growth
- **Section Heading**: `// 03. MILESTONES & EXPERIENCE`

- **Featured Top Card (Spans 2 rows)**:
  - **BNCC Praetorian C Instructor** *(Sep 2025 – Feb 2026)*
  - **Role**: Course Instructor
  - **Highlights**: Taught 13-session C programming curriculum, conducted code reviews, and managed KPI benchmarks.
- **Top Card (1 Row)**:
  - **Samsung Innovation Campus — Team KYGE** *(Jan 2025 – May 2025)*
  - **Role**: Solution Designer
  - **Highlights**: Advanced to Stage 4 (Top 320 out of 10,000+ candidates). Designed IoT monitoring architecture and Generative AI integration frameworks.
- **Bottom Card (1 Row)**:
  - **ElevAIte Hackathon 2025** *(May 2025 – June 2025)*
  - **Role**: UI/UX Designer & Prototyper
  - **Highlights**: Architected user flows and interactive Figma component systems for an AI product concept.

---

### 6. Technical Stack Grid & Interactive Mapping
- **Section Heading**: `// 04. TECHNICAL STACK`
- **Categorized Pill Containers**:
  - **Languages**: C/C++, Python, SQL, JavaScript
  - **Frameworks & Libraries**: PyTorch, Scikit-Learn, OpenCV, Flask, FastAPI, React, HTML/CSS, Tailwind CSS
  - **Tools & Infra**: Git, Docker, PostgreSQL, MongoDB, OAuth2/JWT, Render, Vercel, Figma

---

### 7. Footer
- **Left**: `© 2026 Edward Wibowo. Built with Next.js, Tailwind CSS & Vercel.`
- **Right**: Back to top button `[↑ SYS.TOP]` + direct contact email link.
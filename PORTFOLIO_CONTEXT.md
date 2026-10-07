# Portfolio Context & Specification

## Profile Overview
- **Name**: Edward Wibowo
- **Role**: Computer Science Undergraduate
- **University**: Bina Nusantara (BINUS) University Alam Sutera
- **GPA**: 3.97 / 4.00
- **Contact**: edwardwibo270@gmail.com | github.com/kxi-27o7 | linkedin.com/in/edward-wibowo

## Project Registry & Color Themes

1. **Collabra — Project Management Platform**
   - **Category**: Backend & Full Stack
   - **Tech**: FastAPI, SQLModel, PostgreSQL, JavaScript, Docker, Render
   - **Theme**: 
     - Primary: `#6366F1` (Indigo)
     - Accent: `#818CF8`
     - Glow: `rgba(99, 102, 241, 0.15)`
   - **Summary**: Full-stack project collaboration app with role-based authorization, real-time status tracking, and containerized API deployment.
   - **3-Column Purpose & Impact Breakdown**:
     - **PROBLEM**: Software teams need real-time task tracking without complex setup or loose permission management across project members.
     - **SOLUTION**: Built a modular REST API using FastAPI and SQLModel with custom middleware for role-based authorization (owner/member levels) and Dockerized deployment.
     - **IMPACT**: Delivered a robust backend API with relational PostgreSQL schemas, achieving low-latency query execution and containerized delivery on Render.

2. **BankGuard — Mobile Banking Fraud Detection**
   - **Category**: Machine Learning & Security
   - **Tech**: Python, Flask, Scikit-Learn, Pandas, MongoDB, Vercel
   - **Theme**: 
     - Primary: `#10B981` (Emerald)
     - Accent: `#34D399`
     - Glow: `rgba(16, 185, 129, 0.15)`
   - **Summary**: Flask-based mobile banking prototype that evaluates real-time transaction features against a trained Random Forest model to flag potential fraud and persist prediction data.
   - **3-Column Purpose & Impact Breakdown**:
     - **PROBLEM**: Mobile transaction fraud requires real-time detection on heavily imbalanced datasets, where standard accuracy metrics fail to capture high-risk fraudulent behavior.
     - **SOLUTION**: Engineered a end-to-end inference pipeline featuring dynamic transaction feature generation (rolling stats & balance shifts), threshold-tuned Random Forest evaluation, and Flask REST API integration with MongoDB persistence.
     - **IMPACT**: Processed and prepared over 1.67M dataset rows, achieving ~97.3% fraud recall on test set evaluations while establishing a sub-second model deployment workflow on Vercel.

3. **SeeFlood — Flood Severity Classification System**
   - **Category**: Computer Vision & Deep Learning
   - **Tech**: Python, PyTorch, Torchvision, EfficientNet-B0, Scikit-Learn, NumPy
   - **Theme**: 
     - Primary: `#0EA5E9` (Sky Blue)
     - Accent: `#38BDF8`
     - Glow: `rgba(14, 165, 233, 0.15)`
   - **Summary**: Deep learning computer vision pipeline engineered to classify flood image severity into four ordered levels—no flood, light, moderate, and severe—using fine-tuned convolutional architectures.
   - **3-Column Purpose & Impact Breakdown**:
     - **PROBLEM**: Disaster assessment requires rapid, accurate flood severity categorization from visual data, where standard classification ignores the continuous, ordered nature of flood progression.
     - **SOLUTION**: Built an end-to-end computer vision workflow in PyTorch, fine-tuning an ImageNet-pretrained EfficientNet-B0 with image augmentation, ordinal regression loss formulation, and structured train/val/test evaluation.
     - **IMPACT**: Successfully engineered dataset preprocessing and multi-class evaluation routines, validating model performance using Mean Absolute Error (MAE), confusion matrices, and detailed error distribution reviews.


## Design & Layout Specification

### Visual Identity & Aesthetic
- **Theme**: Monolithic Dark Mode (`#0A0E17` base background).
- **Border Architecture**: 
  - **Defined Framed Canvas**: Standard state uses clean, structural 2px borders (`border-2 border-neutral-800`).
  - **Dynamic Theme Accent**: On hover/focus, card borders dynamically transition to the project's primary accent color (e.g., Indigo for Collabra, Emerald for BankGuard, Sky Blue for SeeFlood, Purple for ElevAIte).
- **Typography & Details**: Crisp monospace tags for tech stacks, bold modern sans-serif headings, high-contrast white action buttons.

### Page Layout Architecture (Single-Column Executive View)

#### 1. Hero & Personal Introduction
- **Header Badge**: `BINUS UNIVERSITY • GPA 3.97 / 4.00 • S.Kom. Candidate`
- **Primary Title**: `Edward Wibowo — Software Engineer & Machine Learning Developer`
- **Introduction Paragraph**:
"Hi, I’m Edward Wibowo.

I’m a Computer Science student at BINUS University focused on building intelligent systems to solve real-world problems. I work across both traditional Machine Learning and Deep Learning—engineering models that draw insights from complex data and solve practical challenges.

Beyond AI development, I architect the full-stack software needed to bring models into production. Whether crafting responsive frontends, designing secure backend APIs, or training intelligent pipelines, I enjoy turning complex technical problems into clean, reliable software."

- **Action Toolbar**:
  - `[Download Resume PDF]` (Solid primary button)
  - `[GitHub]` `[LinkedIn]` `[Email]` (Framed icon buttons with hover borders)

#### 2. Core Project Architecture (Deep-Dive Case Studies)
- **Direct-Impact Feature Cards**: Concise, problem-focused showcase format optimized for immediate scanning:
  - **Top Bar**: Project Category Pill + Primary Actions (`[GitHub]` and `[Live Demo / Paper]`).
  - **Middle Spec**: Title, Role & Timeline Tag (separated by interpunct dots `•`), and Short System Summary.
  - **3-Column Purpose & Impact Breakdown**:
    - **PROBLEM**: Why the software or model was built (the core bottleneck or real-world friction).
    - **SOLUTION**: What was engineered to solve it (system architecture or pipeline design).
    - **IMPACT**: Measurable outcome, individual contribution, or benchmark performance.
  - **Bottom Tech Matrix**: Enclosed, bordered **pill badges** for technologies, languages, and frameworks used.
- **Dynamic CSS Variable Integration**: Hovering over any card smooth-shifts root CSS accent variables (`--accent-color`, `--glow-color`) to match the project's theme.

#### 3. Milestones & Experience Matrix (Bento Layout)
A 2-column compact grid designed to show impact without needing dozens of entries:
- **BNCC Praetorian C Instructor (Sep 2025 – Feb 2026)**: Taught 13-session C curriculum, conducted algorithm code reviews, and managed performance metrics.
- **Samsung Innovation Campus — Team KYGE (Jan 2025 – May 2025)**: Advanced to Stage 4 (Top 320 out of 10,000+ candidates) in smart IoT & GenAI solution architecture.
- **ElevAIte Hackathon 2025**: Designed UI/UX component systems and high-fidelity interactive prototypes in Figma.

#### 4. Technical Stack Grid
Categorized pill tags divided into distinct framed boxes:
- **Languages**: C/C++, Python, SQL, JavaScript, HTML/CSS
- **Frameworks & Libraries**: PyTorch, Scikit-Learn, OpenCV, Flask, FastAPI, React, Tailwind CSS
- **Tools & Infra**: Git, Docker, PostgreSQL, OAuth2/JWT, Render, Figma
# BIGF Frontend

The frontend application for **BIGF**, a food brand platform that combines product discovery, customer engagement, social-media campaigns, challenges, community participation, and Pioneer Member experiences.

BIGF is positioned as a **food brand first**. The challenge and community systems are designed to support product awareness, customer engagement, social sharing, and brand growth.

---

## 📌 Overview

The BIGF frontend provides the user-facing experience for:

* BIGF brand discovery
* Product and flavor discovery
* Product promotion
* Current campaign/challenge discovery
* Challenge participation
* TikTok submission
* Challenge voting
* Community interaction
* User profiles
* Pioneer Member experiences
* Social sharing

The frontend communicates with the BIGF Flask backend through a REST API.

---

## 🎯 BIGF Customer Journey

The primary customer journey is:

```text
Discover BIGF
      ↓
Understand BIGF
      ↓
Discover Products
      ↓
Explore Flavors
      ↓
Build Trust
      ↓
Purchase / Try BIGF
      ↓
Discover Current Challenge
      ↓
Create Content
      ↓
Post on TikTok
      ↓
Submit TikTok URL
      ↓
Community Voting
      ↓
Win Rewards
      ↓
Become a Pioneer Member
```

The website should therefore feel like a **BIGF food brand website**, not simply a challenge or social-media platform.

---

# 🏠 Homepage Strategy

The homepage follows this priority:

```text
1. BIGF Brand
2. BIGF Products
3. Flavors
4. Trust
5. Purchase / Product CTA
6. Current Challenge
7. How to Participate
8. Social Proof
9. Community
10. Pioneer Members
```

The challenge is important, but it should not overpower the actual BIGF product.

---

# 🍜 Products

Products are a central part of the frontend.

The product experience can include:

* Product image
* Product name
* Flavor
* Description
* Product information
* Price
* Availability
* Purchase CTA

The frontend should make it easy for visitors to understand what BIGF sells before asking them to participate in a challenge.

---

# 📱 QR Code Campaign Experience

BIGF packaging can direct customers to the website using QR codes.

The intended journey is:

```text
BIGF PRODUCT
     ↓
SCAN QR CODE
     ↓
BIGF WEBSITE
     ↓
UNDERSTAND CAMPAIGN
     ↓
SEE PRODUCT
     ↓
SEE CURRENT CHALLENGE
     ↓
PARTICIPATE
```

The QR landing experience should be optimized for mobile users.

---

# 🔥 Challenge System

Challenges are marketing campaigns built around BIGF products.

A challenge page can contain:

* Challenge title
* Challenge description
* BIGF product
* Campaign artwork
* Rules
* Prize
* Deadline
* Participation instructions
* Submit button
* Challenge submissions
* Voting
* Leaderboard/ranking where applicable

The challenge should feel like a **BIGF campaign**, rather than a separate social network.

---

# 🎵 TikTok Challenge Submission

The current BIGF challenge workflow is designed around TikTok.

Users do **not** upload their video directly to the BIGF website.

Instead:

```text
Create BIGF Challenge Video
          ↓
Post Video on TikTok
          ↓
Copy TikTok URL
          ↓
Open BIGF
          ↓
Paste TikTok URL
          ↓
Submit Challenge Entry
          ↓
Voting
```

The frontend therefore provides a TikTok URL submission interface rather than a local video-upload system.

---

# 🗳️ Challenge Voting

Once submissions are available, users can browse challenge entries and vote.

A submission can display:

* Participant
* TikTok content/link
* Submission information
* Vote count
* Vote action

The frontend sends voting requests to the backend API.

```text
Challenge
    ↓
Submissions
    ↓
User selects submission
    ↓
Vote
    ↓
Backend validates vote
    ↓
Updated vote count
```

---

# 👤 User Profiles

Authenticated users can have profiles containing:

* Username
* Profile information
* Followers
* Following
* Posts
* Recipes
* Challenge submissions
* Achievements
* Pioneer Member status

The profile experience should complement the BIGF brand rather than turn the entire website into a generic social network.

---

# 👥 Community

The community functionality can support:

* Posts
* Recipes
* Likes
* Comments
* Following
* Saved recipes
* Reshares
* Achievements
* Challenge participation

Community features are designed to increase customer engagement and long-term BIGF loyalty.

---

# ⭐ Pioneer Members

Pioneer Members represent highly engaged BIGF customers and community participants.

The frontend can highlight:

* Pioneer Member status
* Achievements
* Challenge participation
* Rewards
* Community contributions
* Special campaigns

The Pioneer Member system is intended to encourage long-term participation in the BIGF ecosystem.

---

# 🎨 Visual Direction

The BIGF frontend should communicate:

* Food
* Flavor
* Energy
* Youth
* Fun
* Competition
* Community
* Brand confidence

The primary visual direction should use BIGF's food-oriented colors:

* Orange
* Red
* Yellow
* Food photography
* Strong product imagery
* Bold typography

Green can be used as a supporting color but should not dominate the overall BIGF food-brand identity.

---

# 🛠️ Technology Stack

The frontend is built using:

* React
* Vite
* JavaScript
* CSS
* REST API

Backend:

* Flask
* PostgreSQL

Architecture:

```text
React / Vite
     ↓
Frontend API Services
     ↓
Flask REST API
     ↓
PostgreSQL
```

---

# 📁 Project Structure

The frontend is maintained separately from the BIGF backend.

A typical structure is:

```text
BIGF-FRONTEND/
│
├── public/
│   └── ...
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ChallengeCard.jsx
│   │   ├── PostCard.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Challenges.jsx
│   │   ├── ChallengeDetails.jsx
│   │   ├── SubmitChallenge.jsx
│   │   ├── Community.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── context/
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── ...
│   │
│   ├── styles/
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> The structure above represents the intended organization. Update it if the actual project structure differs.

---

# 🚀 Installation

Clone the frontend repository:

```bash
git clone <frontend-repository-url>
```

Enter the frontend directory:

```bash
cd BIGF-FRONTEND
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Frontend

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Typically:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

# 🔐 Environment Variables

Create a `.env` file in the frontend root directory.

Example:

```env
VITE_API_URL=http://127.0.0.1:5000
```

The API URL should point to the running BIGF backend.

Do not commit private credentials or secrets to Git.

---

# 🔌 Backend Connection

The frontend is designed to communicate with the separate BIGF backend.

```text
BIGF-FRONTEND
      │
      │ REST API
      ↓
BIGF-BACKEND
      │
      ↓
PostgreSQL
```

API requests should preferably be centralized inside the frontend API/service layer.

For example:

```text
src/services/api.js
```

This makes it easier to change the backend URL or API implementation without modifying every component.

---

# 🔑 Authentication

The frontend supports authenticated functionality such as:

* Registration
* Login
* Profile access
* Challenge participation
* Challenge submissions
* Voting
* Community actions
* Shopping

The backend provides JWT authentication.

The frontend sends the authentication token when accessing protected API endpoints.

Example:

```http
Authorization: Bearer <access_token>
```

---

# 📱 Responsive Design

The BIGF frontend should work across:

* Mobile phones
* Tablets
* Laptops
* Desktop computers

Mobile optimization is especially important because BIGF users may arrive through:

* QR codes
* TikTok
* Instagram
* Facebook
* WhatsApp
* Mobile browsers

The challenge and product experience should therefore work well on small screens.

---

# 🌐 Social Media

BIGF can use social platforms as part of its marketing strategy.

Supported promotional channels can include:

* TikTok
* Instagram
* Facebook
* WhatsApp

For the current challenge system, TikTok is the primary submission platform.

The website does not attempt to replace these platforms.

Instead, BIGF uses them to generate external reach and user-generated content.

---

# 🧩 Frontend Development Principles

### Brand First

BIGF should always be recognizable as a food brand.

### Product First

Products and flavors should be easy to discover.

### Challenge as a Growth Tool

Challenges should encourage customers to interact with BIGF products.

### Social First

Customers should be encouraged to create and share content on existing social platforms.

### Mobile First for Campaign Traffic

QR codes and social media will generate significant mobile traffic.

### Community for Loyalty

Community functionality should help turn customers into long-term BIGF participants.

---

# 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🏗️ Production Build

Before deployment:

```bash
npm run build
```

The production files are generated by Vite.

The production frontend must be configured to communicate with the production BIGF backend.

---

# 🚀 Deployment

Before deploying:

* Configure the production API URL
* Verify backend CORS
* Test authentication
* Test product pages
* Test challenge pages
* Test TikTok submission
* Test voting
* Test profiles
* Test community functionality
* Test mobile layouts
* Test QR-code landing pages
* Run the production build

---

# ✅ Frontend Checklist

Before considering the frontend ready for production:

* [ ] Homepage communicates BIGF clearly
* [ ] Products are easy to discover
* [ ] Product information is clear
* [ ] Product CTAs work
* [ ] Current challenge is visible
* [ ] Challenge participation works
* [ ] TikTok URL submission works
* [ ] Challenge voting works
* [ ] Authentication works
* [ ] Profiles work
* [ ] Community features work
* [ ] Pioneer Member experience works
* [ ] Mobile layout works
* [ ] QR-code landing experience works
* [ ] Backend API connection works
* [ ] Production environment variables are configured
* [ ] Production build succeeds

---

# 🔮 Future Frontend Improvements

Potential future features include:

* Advanced product catalog
* Product ordering
* Product reviews
* Customer rewards
* Pioneer Member dashboard
* Challenge leaderboards
* Challenge analytics
* Notifications
* Personalized content feeds
* Referral system
* QR campaign analytics
* Promotional landing pages
* Advanced social sharing
* Customer loyalty features
* Admin dashboard

---

# 📌 Project Status

**Project:** BIGF
**Component:** Frontend
**Framework:** React + Vite
**Backend:** Separate Flask REST API
**Database:** PostgreSQL through backend API
**Status:** Active Development

---

## BIGF Product Philosophy

The frontend follows the core BIGF strategy:

```text
        BIGF BRAND
            ↓
         PRODUCTS
            ↓
         CUSTOMER
            ↓
        EXPERIENCE
            ↓
          CONTENT
            ↓
       SOCIAL MEDIA
            ↓
         CHALLENGE
            ↓
        COMMUNITY
            ↓
     PIONEER MEMBER
```

**BIGF is the brand.**

**Products are the core business.**

**Challenges drive engagement and social growth.**

**Community builds long-term customer loyalty.**

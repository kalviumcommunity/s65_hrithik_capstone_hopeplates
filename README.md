# HopePlates

## Capstone Project Title
**HopePlates: A Food & Essentials Redistribution Platform**

**Feontend:https://s65-hrithik-capstone-hopeplates-e6wm.onrender.com**


**Backend:https://s65-hrithik-capstone-hopeplates.onrender.com**

## Overview
**HopePlates** is a social impact platform designed to reduce food waste and provide essential resources to those in need. It connects donors (restaurants, event organizers, households) with NGOs and volunteers to distribute surplus food, books, and clothes to underprivileged communities. Additionally, HopePlates enables monetary donations to verified NGOs via UPI.

## Key Features
- **Food, Books, and Clothes Donation:** Donors can list surplus food, books, and clothes for pickup by NGOs or volunteers.
- **Real-Time Matching:** Matches donors with nearby NGOs/volunteers based on location.
- **Home-Based Food Donations:** Individuals can donate home-cooked or surplus food to be distributed to needy people on the streets.
- **NGO Verification:** Admin verifies NGO profiles to ensure legitimacy and prevent misuse.
- **Pickup Scheduling & Tracking:** Volunteers can schedule pickups, and real-time tracking ensures timely distribution.
- **Monetary Donations:** Users can contribute funds to verified NGOs via UPI.

## Tech Stack
- **Frontend:** React.js (Next.js for better performance & SEO)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth
- **Geolocation API:** Google Maps API for location-based matching
- **Hosting:** Vercel (Frontend), Render (Backend)

## Capstone Project Plan
### **Week 1: Research & Planning**
- Finalize project requirements and scope.
- Design wireframes and system architecture.
- Set up GitHub repository and project structure.

### **Week 2: Backend Development**
- Initialize Express.js server and configure MongoDB.
- Develop authentication system (JWT & Google OAuth).
- Create API endpoints for food, books, and clothes donations.
- Implement NGO verification and monetary donation APIs.

### **Week 3: Frontend Development (Part 1)**
- Set up Next.js frontend.
- Develop user authentication pages.
- Create forms for listing donations.

### **Week 4: Frontend Development (Part 2)**
- Implement real-time matching UI for donors and NGOs.
- Develop pickup scheduling and tracking interface.
- Integrate Google Maps API for geolocation-based matching.

### **Week 5: Testing & Debugging**
- Perform unit and integration testing on backend APIs.
- Conduct UI testing and bug fixes on the frontend.
- Optimize performance and security.

### **Week 6: Deployment & Finalization**
- Deploy the backend on Render and the frontend on Vercel.
- Set up production database and finalize API integrations.
- Perform final testing and quality assurance.
- Prepare project documentation and submit final report.

## Installation & Setup
### Backend Setup
```sh
cd backend
npm install
npm run dev
```
### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## API Endpoints
- `POST /api/donate/food` – Add a food donation listing
- `POST /api/donate/books` – Add a book donation listing
- `POST /api/donate/clothes` – Add a clothes donation listing
- `POST /api/donate/money` – Donate money to an NGO via UPI
- `GET /api/ngos` – Fetch list of verified NGOs
- `POST /api/ngo/verify` – Admin verifies an NGO

## Contributing
We welcome contributions! Feel free to open issues and pull requests to improve HopePlates.



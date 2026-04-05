# 🚀 Professional Job Scraper & Portal

A comprehensive, full-stack Job Scraper and Portal application designed with modern aesthetics and a seamless user experience. This project automates the process of finding and applying for jobs from multiple sources, presenting them in a beautiful, high-end "Glassmorphism" interface.

![Modern UI Design](https://img.shields.io/badge/UI-Modern%20Glass-3b82f6?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%20%7C%20MongoDB-blue?style=for-the-badge)

## ✨ Features

- **💡 Intelligent Job Scraping:** Automated engine that pulls real-time job listings from 50+ job boards.
- **🛡️ Secure Authentication:** Full Login and Registration flow with protected dashboard routes.
- **🔍 Advanced Search:** Filter jobs by keywords, company, and location (including an Indian states autocomplete).
- **💼 Unified Application Flow:** Apply to multiple roles through a streamlined interface with a dedicated success confirmation page.
- **🎨 Premium UI/UX:**
    - **Vibrant Blue Theme:** High-contrast professional aesthetic.
    - **Realistic Background:** High-quality professional workspace backdrop.
    - **Glassmorphism Panels:** Modern translucent cards and navigation.
- **💾 Distributed Storage:** A hybrid database architecture for maximum performance.
    - **SQLite:** Handles relational data like Users and Saved Job IDs.
    - **MongoDB:** Powers the high-speed search and storage for thousands of job listings.

## 🛠️ Tech Stack

### Backend
- **Framework:** Django (Python)
- **Database (Hybrid):** 
    - **SQLite:** Standard relational storage for Auth/Users.
    - **MongoDB:** NoSQL storage for flexible, high-volume job data.
- **Architecture:** RESTful API with Token Authentication
- **Scraping Tools:** Python-based custom scraping management commands.

### Frontend
- **Framework:** React 19 (via Vite)
- **Navigation:** React Router 7
- **Icons:** Lucide-React
- **Styling:** Custom Vanilla CSS with a focus on CSS Variables and Glassmorphism.
- **API Client:** Axios

## 🚀 Getting Started

### 1. Database Prerequisites
- Ensure **MongoDB** is installed and running locally on the default port `27017`.
- Default Database Name: `job_scraper_db`

### 2. Clone the Repository
```bash
git clone https://github.com/Mohanapriyap978/Job-Scraper.git
cd Job-Scraper
```

### 3. Backend Setup
```bash
# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies (Standard Django + MongoDB Setup)
pip install django djangorestframework django-cors-headers pymongo requests beautifulsoup4

# Run migrations (for SQLite components)
cd backend
python manage.py migrate

# Seed initial data (Populates MongoDB)
python manage.py seed_data

# Start the server
python manage.py runserver
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
├── backend/            # Django project and apps
│   ├── auth_app/       # User authentication and management
│   ├── scraper/        # Job scraping engine and API
│   └── backend/        # Core settings and configuration
├── frontend/           # React application (Vite-based)
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, JobCard, etc.)
│   │   ├── pages/      # Full-page views (Dashboard, Home, Login, etc.)
│   │   └── context/    # State management (AuthContext)
└── .gitignore          # Repository git ignore rules
```

---

*Built with ❤️ for job seekers everywhere. Join thousands who find their next career move with ease!*
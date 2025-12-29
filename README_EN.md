# 🌱 EcoTrade - Sustainable Exchange Platform for International Students

## 🌐 Live Application

**EcoTrade is now deployed and available online!**

- 🖥️ **Frontend (Vercel)**: [https://eco-trade-one.vercel.app/](https://eco-trade-one.vercel.app/)
- ⚙️ **Backend API (Render)**: [https://ecotrade-wzl2.onrender.com](https://ecotrade-wzl2.onrender.com)

You can create an account, browse available products, and publish your own listings right now!

## 📖 About the Project

**EcoTrade** is a full-stack web application for circular economy designed to address a critical sustainability challenge faced by exchange students at INSA Lyon and similar institutions worldwide.

## 🎯 Project Objectives

### Main Objective
Create a digital platform that facilitates the **reuse and sharing of items** between successive generations of international students, transforming the "buy-throw-rebuy" cycle into a sustainable circular economy model.

### Specific Objectives

1. **Environmental** 🌍
   - Drastically reduce waste generated during semester student turnovers
   - Decrease carbon footprint related to production and transportation of new goods
   - Promote a culture of reuse and sustainability

2. **Economic** 💰
   - Reduce setup costs for incoming students (€200-500 savings)
   - Allow outgoing students to recover part of their investment
   - Create a local and solidarity-based economic ecosystem

3. **Social** 🤝
   - Facilitate integration of new students
   - Create connections between student cohorts
   - Build a community based on mutual aid and sustainability

4. **Practical** ⚡
   - Centralize offers and demands on a single platform
   - Simplify the buying/selling process between students
   - Ensure transparency and traceability of transactions

### 🎯 The Problem

Every semester, thousands of international students arrive and depart from academic institutions. This constant rotation creates significant environmental and economic challenges:

- **Massive waste generation**: Students leaving their exchange programs often discard perfectly functional items (furniture, kitchenware, electronics, textbooks) because they cannot transport them home
- **High costs for newcomers**: Incoming exchange students must purchase all these same items, creating unnecessary expenses of €500 to €1000
- **Environmental impact**: Perfectly usable goods end up in landfills, contributing to waste and resource depletion
- **Lack of coordination**: No centralized platform exists to connect departing students with arriving ones
- **Systemic waste**: The cycle repeats every semester, generating considerable cumulative impact

### 💡 The EcoTrade Solution

EcoTrade bridges this gap by creating a **peer-to-peer marketplace** specifically designed for the exchange student lifecycle:

- 🔄 **Circular Economy**: Items remain in circulation within the student community instead of being discarded
- 💰 **Affordable**: Incoming students can purchase quality second-hand items at reduced prices
- 🌍 **Sustainable**: Reduces waste and carbon footprint associated with manufacturing and shipping new products
- 🤝 **Community-driven**: Facilitates connections between departing and arriving students
- ⚡ **Simple and Fast**: Intuitive French interface for easy adoption

## ✨ Implemented Features

### Frontend (React)
- ✅ **Home page** with gallery of all available products
- ✅ **Authentication system**: User registration and login
- ✅ **Dynamic interface**: Conditional display based on login status
- ✅ **Product addition**: Complete form to publish listings
- ✅ **Product cards**: Attractive display with price, description, usage time, and owner
- ✅ **Responsive design**: Compatible with mobile, tablet, and desktop
- ✅ **French interface**: Adapted to INSA Lyon context

### Backend (Spring Boot)
- ✅ **Complete RESTful API** for users and products
- ✅ **PostgreSQL database** hosted on Supabase
- ✅ **DTOs** to avoid circular references
- ✅ **Validation** and error handling
- ✅ **MVC Architecture**: Models, Services, Repositories, Controllers

## 🛠️ Complete Technology Stack

### Backend
- **Java 25** with **Spring Boot 4.0.1**
- **Spring Data JPA** for database operations
- **PostgreSQL** via **Supabase** for cloud hosting
- **RESTful API** architecture
- **Maven** for dependency management
- **DTOs** for response optimization

### Frontend
- **React 19** with **Hooks** (useState, useEffect)
- **Vite** for fast build and development
- **Axios** for HTTP requests
- **CSS3** with animations and modern design
- **LocalStorage** for session persistence

### Infrastructure
- **Supabase**: PostgreSQL cloud database
- **CORS** configured for frontend-backend communication
- **Git** for version control

### Database Schema
```
Users (id, created_at, name, email, nationality, password)
   |
   | 1:N
   |
Products (id, created_at, name, price, description, use_time, user_id)
```

## 🚀 Installation and Setup

### Backend

1. **Prerequisites**
   - Java 25 or higher
   - Maven 3.6+

2. **Configuration**
   ```bash
   cd backend
   cp src/main/resources/application.properties.example application.properties
   # Edit application.properties with your Supabase credentials
   ```

3. **Run the backend**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   Server starts on `http://localhost:8080`

### Frontend

1. **Prerequisites**
   - Node.js 18+
   - npm or yarn

2. **Installation**
   ```bash
   cd frontend/ecotrade-frontend
   npm install
   ```

3. **Run the frontend**
   ```bash
   npm run dev
   ```
   Application opens on `http://localhost:5173`

### Complete Startup
```bash
# Terminal 1 - Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend/ecotrade-frontend && npm run dev
```

## 📡 API Endpoints

### Users
- `GET /api/users` - List all users
- `GET /api/users/{id}` - User details
- `GET /api/users/email/{email}` - Search by email
- `POST /api/users` - Create account
- `PUT /api/users/{id}` - Update profile
- `DELETE /api/users/{id}` - Delete account

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Product details
- `GET /api/products/user/{userId}` - User's products
- `POST /api/products/user/{userId}` - Publish product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## 🌍 Estimated Environmental Impact

### At INSA Lyon (~500 exchange students/year)

- **Waste reduction**: 10-15 tons of reusable goods saved from landfills annually
- **Financial savings**: €100,000 to €250,000 collectively saved per year
- **CO2 reduction**: Equivalent to ~20-30 tons of CO2 avoided (manufacturing + transport)
- **Items reused**: 500-1000 articles put back into circulation per year

### Potential Impact (National Deployment)

If deployed in 50+ host institutions in France:
- **2500+ tons** of waste avoided per year
- **€15-20 million** saved by students
- **Social impact**: 25,000+ students helped annually

## 💭 Personal Motivation

### The Story Behind EcoTrade

I arrived at INSA Lyon in September 2024 as part of a **dual degree program**, and I quickly observed a recurring problem among my exchange student friends.

At the end of each semester, the same scene repeated itself: students didn't know what to do with their belongings before returning home. Conversations revolved around questions like:

- *"I can't take my microwave on the plane, what should I do?"*
- *"I bought all this furniture, but I have nowhere to store it..."*
- *"I'll have to throw away my desk lamp that works perfectly"*

My peers' solutions were often the same:
- 🗑️ **Throw in the trash**: Perfectly functional items ended up in the waste
- 📦 **Abandon on the street**: Leave things outside hoping someone would take them
- 🤷 **Do nothing**: Leave everything in the room for the next occupant without coordination

### The Trigger

It was by seeing this situation repeat itself semester after semester that the idea of **EcoTrade** was born. I thought to myself:

> *"There must be a better solution. What if we could connect students who are leaving with those who are arriving?"*

This observation pushed me to create a platform that:
- ✅ Gives a **second life** to objects instead of throwing them away
- ✅ Allows departing students to **recover part of their investment**
- ✅ Helps newcomers **get equipped at lower cost**
- ✅ Reduces the **environmental impact** of student turnover
- ✅ Creates a **supportive community** between generations of students

EcoTrade is not just a technical project, it's a **concrete answer** to a real problem I experienced and observed daily.

## 🎓 Context and Skills Demonstration

This project was developed as a **personal initiative** to address a real need observed at INSA Lyon. It demonstrates:

### Technical Skills
- ✅ **Full-Stack** development (Java Backend + React Frontend)
- ✅ **RESTful** and **MVC** architecture
- ✅ **Relational database** management
- ✅ **Cloud** integration (Supabase)
- ✅ **Version control** with Git
- ✅ **Responsive design** and modern UX

### Soft Skills
- 🎯 **Problem identification**: Observation of a real need
- 💡 **Innovation**: Technological solution to a social challenge
- 🌍 **Environmental awareness**: Application of circular economy principles
- 📊 **Impact analysis**: Quantification of environmental and economic benefits
- 🚀 **Initiative**: Project carried out autonomously from A to Z

## 📝 Future Improvements

### Short Term
- [ ] Image upload for products
- [ ] Advanced search and filter system
- [ ] User profile with history

### Medium Term
- [ ] Integrated messaging between buyers and sellers
- [ ] Rating and review system
- [ ] Email notifications
- [ ] Dark mode

### Long Term
- [ ] Mobile application (iOS/Android)
- [ ] Integration with INSA authentication
- [ ] Reservation system
- [ ] Analytics and impact statistics
- [ ] Extension to other universities

## 👤 Author

**Josue Vega**
- 🎓 Student at INSA Lyon
- 🌱 Passionate about sustainable technological solutions
- 💻 Full-Stack Developer
- 🌍 Committed to circular economy

## 📄 License

This project is open-source and available for educational purposes.

## 🙏 Contribution

This project is open to contributions! Feel free to:
- Report bugs
- Propose new features
- Improve documentation
- Share your feedback

---

*Building a more sustainable future, one exchange student at a time* 🌱

**EcoTrade** - Circular Economy • Social Innovation • Environmental Impact

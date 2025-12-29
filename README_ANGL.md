# 🌱 EcoTrade - Sustainable Exchange Platform for International Students

## 📖 About the Project

**EcoTrade** is a circular economy web application designed to address a critical sustainability challenge faced by exchange students at INSA Lyon and similar institutions worldwide.

### 🎯 The Problem

Every semester, thousands of international students arrive and depart from academic institutions. This constant rotation creates significant environmental and economic challenges:

- **Massive waste generation**: Students leaving their exchange programs often discard perfectly functional items (furniture, kitchenware, electronics, textbooks) because they cannot transport them home
- **High costs for newcomers**: Incoming exchange students must purchase all these same items, creating unnecessary expenses
- **Environmental impact**: Perfectly usable goods end up in landfills, contributing to waste and resource depletion
- **Lack of coordination**: No centralized platform exists to connect departing students with arriving ones

### 💡 The Solution

EcoTrade bridges this gap by creating a **peer-to-peer marketplace** specifically designed for the exchange student lifecycle:

- 🔄 **Circular Economy**: Items remain in circulation within the student community instead of being discarded
- 💰 **Affordable**: Incoming students can purchase quality second-hand items at reduced prices
- 🌍 **Sustainable**: Reduces waste and the carbon footprint associated with manufacturing and shipping new products
- 🤝 **Community-driven**: Facilitates connections between departing and arriving students

## ✨ Key Features

- **User Management**: Registration and authentication system for students
- **Product Listings**: Students can list items with details (name, price, description, usage time)
- **Search & Filter**: Find exactly what you need quickly
- **User Profiles**: Track your listings and purchase history
- **Ownership Transfer**: Clear transfer of items from one student to another

## 🛠️ Technology Stack

### Backend
- **Java 25** with **Spring Boot 4.0.1**
- **Spring Data JPA** for database operations
- **PostgreSQL** via **Supabase** for cloud database hosting
- **RESTful API** architecture
- **Maven** for dependency management

### Database Schema
- **Users Table**: id, created_at, name, email, nationality, password
- **Products Table**: id, created_at, name, price, description, use_time, user_id
- **Relationship**: One-to-Many (One user can have multiple products)

## 🚀 Getting Started

### Prerequisites
- Java 25 or higher
- Maven 3.6+
- PostgreSQL (via Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecotrade.git
   cd ecotrade/backend
   ```

2. **Configure the database**
   - Copy `src/main/resources/application.properties.example` to `application.properties`
   - Add your Supabase database credentials

3. **Build and run**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

4. **Access the API**
   - Base URL: `http://localhost:8080`
   - API Documentation: Available at `/api/*`

## 📡 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/email/{email}` - Get user by email
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/user/{userId}` - Get products by user
- `POST /api/products/user/{userId}` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## 🌍 Environmental Impact

By implementing EcoTrade at a single institution like INSA Lyon with ~500 exchange students per year:

- **Estimated waste reduction**: 10-15 tons of reusable goods saved from landfills annually
- **Cost savings for students**: €200-500 per student on average
- **CO2 reduction**: Significant decrease in manufacturing and transportation emissions
- **Community building**: Stronger connections between student cohorts

## 🎓 Project Context

This project was developed as a **personal initiative** to address a real-world sustainability challenge observed within the exchange student community. It demonstrates:

- Full-stack development capabilities
- Problem-solving with technology
- Commitment to sustainability and social impact
- Understanding of circular economy principles
- Ability to identify and solve community needs

## 📝 Future Enhancements

- [ ] Frontend web interface (React/Angular)
- [ ] Mobile application (iOS/Android)
- [ ] Image upload for product listings
- [ ] Rating and review system
- [ ] In-app messaging between users
- [ ] Email notifications for new listings
- [ ] Multi-language support
- [ ] Integration with university authentication systems

## 👤 Author

**Josue Vega**
- Student at INSA Lyon
- Passionate about sustainable technology solutions
- [LinkedIn](#) | [GitHub](#)

## 📄 License

This project is open-source and available for educational purposes.

---

*Building a more sustainable future, one exchange student at a time* 🌱

# Pizzaria Ponto & Virgula  
A full-stack system for managing a pizzeria, from product registration to order processing.

This project showcases my ability to design and implement a full-stack solution that handles user management, product categorization, and order processing efficiently.

# Overview

In this application, you can:

- User Management: Create new users to access the system.
- Product Categories: Create and delete product categories (deletion is only allowed if no products are linked to the category).
- Products: Register products with images and assign them to categories. Products can also be deleted.
- Order Processing:
    - Open new orders by specifying the customer name and table number.
    - Add, remove, and update products in an order.
    - Send orders to the kitchen for preparation.
    - After preparation, finalize and close orders.

# Technologies used

During this project, I explored several technologies that helped optimize the development and functionality of the system.

- **Backend**:  
  - **Language/Framework**: TypeScript, Node.js, Express.js  
  - **Authentication**: JSON Web Tokens (jsonwebtoken), bcryptjs  
  - **File Management**: Multer for image uploads  
  - **Server Configuration**: Docker & Docker Compose for containerization, Nginx as a reverse proxy, and Let's Encrypt for SSL/TLS certificates

- **Database**:  
  - MySQL, managed with Prisma ORM  

- **Frontend**:  
  - Next.js 15 (React 19)
  - UI & Styling: Sass for styles, Lucide React for icons
  - Notifications: Sonner for real-time alerts

# Prerequisites
- **Node.js** 22.12.0 
- **MySQL** 8.0+
- **Git** to clone the project (use the command git clone https://github.com/devrianmendes/pizzaria.git)   
- **Environment Variables**
  - Create a file '.env' in the root with the following variables:
    - DATABASE_URL: Database url conection
    - JWT_SECRET: Secret key for JWT token generation

# Local dependencies
After cloning the project, run the command **npm install** in the root directory to install all dependencies

You can check the application [here](https://pizzaria-mauve.vercel.app/)
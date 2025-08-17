# Nutrition App

A full-stack web application to track and analyze your daily nutrient intake with search, filtering, and authentication.

## Features
1. **Nutrient Filtering** – Enter a nutrient name and amount, then filter food items based on:
   - Less than and equal to, and
   - Greater than the given nutrient amount
2. **Food Item Lookup** – Enter the name of a food item to view all its nutritional details (fat, sugar, protein, carbs, calories, cholesterol, etc.).
3. **Daily Intake Summary** – Select the day and the items eaten; the app calculates the total of all nutrient fields for that day and shows the result.
4. **Authentication** – Secure login/signup system with password hashing and Google OAuth login.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating**: Handlebars (HBS)
- **Authentication**: Passport.js with Local Strategy & Google OAuth 2.0

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/simransh05/Nutrition-App.git
cd Nutrition-App
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a ```.env``` file 
Create a file named .env in the root folder and add the following values:
```env
MONGO_URL=your_mongodb_url
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=redirect_uri
```

### 4. Start the server
```bash
node app.js
```
Then open http://localhost:4000 in your browser.

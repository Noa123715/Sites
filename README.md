# Sites Project

## Overview
The **Sites** project is a full-stack application that allows users to manage a list of websites. It includes a **Node.js + Express server** connected to a **MongoDB** database, and a simple **client-side interface** (Vanilla JS or React) to display and interact with the data.

Each website entry includes the following fields:
- **name**: The name of the website
- **url**: The website link
- **image**: A direct URL to the website image/logo
- **score**: A numeric score (0–10)

The project implements full **CRUD operations**:
- **Create** (POST): Add a new site
- **Read** (GET): Retrieve all sites or a site by ID
- **Update** (PUT): Edit an existing site by ID
- **Delete** (DELETE): Remove a site by ID

---

## Installation

1. **Clone the repository**
```bash
    git clone https://github.com/Noa123715/Sites.git
```

```bash
    cd Sites
```


2. **Install server dependencies**
```bash
    cd server
```

```bash
    npm install
```


3. **Configure environment variables**
- Create a `.env` file inside `server/` and add:
```bash
    MONGODB_URI=your_mongodb_connection_string 
    PORT=3000
```

4. **Seed the database (optional)**

```bash
    node seed/seedSites.js
```

This will insert 5–6 example sites into the database.

5. **Start the server**

```bash
    npm run dev
```

---

## Usage

### API Endpoints

| Method | Endpoint         | Description                    |
|--------|-----------------|--------------------------------|
| GET    | /sites           | Retrieve all sites             |
| GET    | /sites/:id       | Retrieve a single site by ID   |
| POST   | /sites           | Add a new site (requires JSON) |
| PUT    | /sites/:id       | Update a site by ID            |
| DELETE | /sites/:id       | Delete a site by ID            |

### Example JSON for POST/PUT
```
    {
    "name": "Google",
    "url": "https://www.google.com
    ",
    "image": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png
    ",
    "score": 10
    }
```


---

## Screenshots

**App view:**
<img src="https://github.com/noa123715/Sites/blob/main/screenshot/sites.png"> 

---

## Notes
- Make sure all image URLs are direct links to image files for proper display.
- Joi validation is implemented on `POST` and `PUT` to ensure data integrity.
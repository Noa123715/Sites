# SITES Project

## Overview
The **SITES** project is a full-stack application that allows users to manage a list of websites. It includes a **Node.js + Express server** connected to a **MongoDB** database, and a simple **client-side interface** (Vanilla JS or React) to display and interact with the data.

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
```git clone https://github.com/Noa123715/Sites.git ```

``` cd Sites ```


2. **Install server dependencies**
```cd server ```

``` npm install```


3. **Configure environment variables**
- Create a `.env` file inside `server/` and add:
``` MONGODB_URI=your_mongodb_connection_string PORT=3000 ```

- If you are using **local MongoDB**, you can leave `MONGODB_URI` as:
``` MONGODB_URI=mongodb://127.0.0.1:27017/sitesDB```


4. **Seed the database (optional)**

``` node seed/seedSites.js```

This will insert 5–6 example sites into the database.

5. **Start the server**

``` npm run dev```


6. **Client**
- If you use Vanilla JS: open `SERVER/public/index.html` in your browser.
- If you use React: go to `CLIENT/`, run `npm install` and `npm start`. Make sure the React client fetches data from the correct server port.

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

**Example client table view:**

![Sites Table](./screenshot.png)

---

## Notes
- Make sure all image URLs are direct links to image files for proper display.
- Joi validation is implemented on `POST` and `PUT` to ensure data integrity.
- The project works both with **local MongoDB** or **MongoDB Atlas**.

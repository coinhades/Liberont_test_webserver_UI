# Frontend Setup Guide

This project is a frontend application. 
---

## Prerequisites

- Node.js (v22.19+ or v20.12+)
- npm (comes with Node.js)

---

## Setup Instructions

1. **Create Environment File**
   ( * For local development ignore this step * )
   Copy the sample environment file and rename it:

   ```bash
   cp .env.sample .env 

   VITE_API_BASE=http://{server-ip}:8080/api/v1

   Replace {server-ip} to your running web server IP address.

2. npm install

3. npm run dev

4. running on http://localhost:5173/
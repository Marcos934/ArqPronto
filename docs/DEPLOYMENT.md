# Deployment Guide

## Frontend Deployment (Netlify)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 16+

3. Set environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. Enable automatic deployments

## Backend Deployment

1. Set up a Node.js server (e.g., DigitalOcean, AWS, etc.)
2. Install required dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASS=your_db_password
   JWT_SECRET=your_jwt_secret
   PORT=3001
   CORS_ORIGIN=your_frontend_url
   ```

4. Set up PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   ```

5. Configure Nginx as reverse proxy:
   ```nginx
   server {
     listen 80;
     server_name api.arqpronto.com;

     location / {
       proxy_pass http://localhost:3001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. Set up SSL with Let's Encrypt

## Database Deployment

1. Set up MySQL server
2. Create database and user:
   ```sql
   CREATE DATABASE arqpronto;
   CREATE USER 'arqpronto'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON arqpronto.* TO 'arqpronto'@'%';
   FLUSH PRIVILEGES;
   ```

3. Import schema:
   ```bash
   mysql -u arqpronto -p arqpronto < SCHEMA.sql
   ```

4. Import initial data:
   ```bash
   mysql -u arqpronto -p arqpronto < MOCK_DATA.sql
   ```

5. Configure backups:
   ```bash
   # Add to crontab
   0 0 * * * mysqldump -u arqpronto -p arqpronto > /backup/arqpronto_$(date +\%Y\%m\%d).sql
   ```

## Supabase Setup

1. Create new Supabase project
2. Configure storage bucket for images
3. Set up storage policies
4. Configure CORS settings
5. Get API keys and update environment variables
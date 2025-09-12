# 🔒 HTTPS Setup Guide

This guide will help you set up HTTPS for the Qiskit Fall Fest 2024 website.

## Quick Start

### Windows
```bash
# Run the HTTPS server (auto-generates certificates)
start-https.bat
```

### Linux/macOS
```bash
# Make executable and run
chmod +x start-https.sh
./start-https.sh
```

### Manual Setup
```bash
# 1. Generate SSL certificates
node generate-certs.js

# 2. Start HTTPS server
node server-https.js
```

## URLs

After starting the HTTPS server, your site will be available at:

- **Local**: `https://localhost:3443`
- **Network**: `https://YOUR_IP:3443`

## Browser Security Warning

Since we're using self-signed certificates, browsers will show a security warning:

1. Click **"Advanced"** or **"Show Details"**
2. Click **"Proceed to localhost (unsafe)"** or **"Accept the Risk"**
3. The site will load normally

## Configuration

### Environment Variables

Add to your `.env` file:

```env
# HTTPS Configuration
HTTPS_PORT=3443
```

### Custom Port

To use a different port:

```env
HTTPS_PORT=8443
```

## Files Created

- `certs/server.key` - Private key
- `certs/server.crt` - SSL certificate
- `server-https.js` - HTTPS server
- `generate-certs.js` - Certificate generator

## Troubleshooting

### "SSL certificates not found"
- Run `node generate-certs.js` first
- Make sure OpenSSL is installed

### "Port already in use"
- Change `HTTPS_PORT` in `.env`
- Or kill the process using that port

### OpenSSL not found
- **Windows**: Download from https://slproweb.com/products/Win32OpenSSL.html
- **macOS**: `brew install openssl`
- **Linux**: `sudo apt-get install openssl`

## Production Deployment

For production, replace self-signed certificates with real SSL certificates from:
- Let's Encrypt (free)
- Cloudflare
- Your domain provider

## Security Notes

- Self-signed certificates are for development only
- Never use self-signed certificates in production
- The private key (`server.key`) should be kept secure


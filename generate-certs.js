// Script to generate self-signed SSL certificates for HTTPS
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔐 Generating SSL certificates for HTTPS...\n');

// Create certs directory if it doesn't exist
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

try {
    // Generate private key
    console.log('📝 Generating private key...');
    execSync(`openssl genrsa -out ${path.join(certsDir, 'server.key')} 2048`, { stdio: 'inherit' });
    
    // Generate certificate signing request
    console.log('📝 Generating certificate signing request...');
    execSync(`openssl req -new -key ${path.join(certsDir, 'server.key')} -out ${path.join(certsDir, 'server.csr')} -subj "/C=IN/ST=Assam/L=Guwahati/O=IITG/OU=QFF2024/CN=localhost"`, { stdio: 'inherit' });
    
    // Generate self-signed certificate
    console.log('📝 Generating self-signed certificate...');
    execSync(`openssl x509 -req -days 365 -in ${path.join(certsDir, 'server.csr')} -signkey ${path.join(certsDir, 'server.key')} -out ${path.join(certsDir, 'server.crt')}`, { stdio: 'inherit' });
    
    // Clean up CSR file
    fs.unlinkSync(path.join(certsDir, 'server.csr'));
    
    console.log('\n✅ SSL certificates generated successfully!');
    console.log('📁 Certificates saved in: ./certs/');
    console.log('   • server.key (private key)');
    console.log('   • server.crt (certificate)');
    console.log('\n🚀 You can now run the HTTPS server with: node server-https.js');
    
} catch (error) {
    console.error('\n❌ Error generating certificates:');
    console.error('Make sure OpenSSL is installed on your system.');
    console.error('\n📋 Installation instructions:');
    console.error('   Windows: Download from https://slproweb.com/products/Win32OpenSSL.html');
    console.error('   macOS: brew install openssl');
    console.error('   Linux: sudo apt-get install openssl');
    process.exit(1);
}


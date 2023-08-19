const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pingIP(ip: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const platform = process.platform;
    let pingCommand = '';

    if (platform === 'win32') {
      pingCommand = `ping -n 1 ${ip}`;
    } else if (platform === 'linux' || platform === 'darwin') {
      pingCommand = `ping -c 1 ${ip} -t 3`;
    } else {
      throw new Error('Unsupported platform');
    }

    exec(pingCommand, (error: string, stdout: string) => {
      if (error) {
        resolve(false);
      } else {
        // Check the stdout for success indicators (specific to each platform)
        if (platform === 'win32') {
          resolve(stdout.includes('Received = 1'));
        } else if (platform === 'linux' || platform === 'darwin') {
          resolve(!stdout.includes('Request timeout for'));
        } else {
          resolve(false);
        }
      }
    });
  });
}

async function scanIPRange(startIP: string, endIP: string) {
  const startParts = startIP.split('.').map(Number);
  const endParts = endIP.split('.').map(Number);

  for (let i = startParts[3]; i <= endParts[3]; i++) {
    const ip = `${startParts[0]}.${startParts[1]}.${startParts[2]}.${i}`;
    const isReachable = await pingIP(ip);
    if (isReachable) {
      console.log(`${ip} is reachable`);
    } else {
      console.log(`${ip} is not reachable`);
    }
  }
}


module.exports = (startIP:any, endIP:any)=>{
  scanIPRange(startIP, endIP).catch((error) => console.error(error));
}

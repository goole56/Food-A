import fs from 'fs';
import path from 'path';

function replaceGradients(content) {
  return content
    .replace(/bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400/g, 'text-brand-text')
    .replace(/bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300/g, 'text-brand-text')
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const updatedContent = replaceGradients(content);
      if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src/pages');
processDirectory('./src/components');

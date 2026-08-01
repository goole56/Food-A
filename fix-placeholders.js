import fs from 'fs';
import path from 'path';

function replacePlaceholders(content) {
  return content
    .replace(/placeholder-slate-500/g, 'placeholder-brand-text-muted/60')
    .replace(/placeholder-slate-400/g, 'placeholder-brand-text-muted/60')
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
      const updatedContent = replacePlaceholders(content);
      if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src/pages');
processDirectory('./src/components');

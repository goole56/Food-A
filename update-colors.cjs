const fs = require('fs');
const path = require('path');

function replaceColors(content) {
  return content
    // Backgrounds
    .replace(/bg-slate-950\/80/g, 'bg-black/50')
    .replace(/bg-slate-900\/50/g, 'bg-brand-card')
    .replace(/bg-slate-900\/80/g, 'bg-brand-bg')
    .replace(/bg-slate-900/g, 'bg-brand-card')
    .replace(/bg-slate-800\/80/g, 'bg-brand-bg')
    .replace(/bg-slate-800\/50/g, 'bg-brand-bg')
    .replace(/bg-slate-800/g, 'bg-brand-bg')
    .replace(/bg-slate-700/g, 'bg-brand-border')
    
    // Text colors
    .replace(/text-slate-300/g, 'text-brand-text')
    .replace(/text-slate-400/g, 'text-brand-text-muted')
    .replace(/text-slate-500/g, 'text-brand-text-muted')
    .replace(/text-white/g, 'text-brand-text') 
    // Fix text-white inside brand-pink backgrounds manually if needed
    
    // Borders
    .replace(/border-slate-800/g, 'border-brand-border')
    .replace(/border-slate-700/g, 'border-brand-border')
    
    // Brand pink
    .replace(/text-orange-500/g, 'text-brand-pink')
    .replace(/text-orange-400/g, 'text-brand-pink')
    .replace(/bg-orange-500\/10/g, 'bg-brand-pink/10')
    .replace(/bg-orange-500\/20/g, 'bg-brand-pink/20')
    .replace(/bg-orange-500/g, 'bg-brand-pink')
    .replace(/border-orange-500/g, 'border-brand-pink')
    .replace(/ring-orange-500/g, 'ring-brand-pink')
    .replace(/shadow-orange-500\/20/g, 'shadow-brand-pink/20')
    .replace(/shadow-orange-500\/40/g, 'shadow-brand-pink/40')
    .replace(/from-slate-900/g, 'from-brand-card')
    
    // Additional scrollbar
    .replace(/scrollbar-thumb-slate-700/g, 'scrollbar-thumb-brand-border')
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      if (fullPath.includes('Layout.tsx') || fullPath.includes('Button3D.tsx') || fullPath.includes('Card3D.tsx')) {
         // Maybe skip some? No let's apply and fix after. Actually we already edited Layout.
         if (fullPath.includes('Layout.tsx')) continue;
      }
      const content = fs.readFileSync(fullPath, 'utf-8');
      const updatedContent = replaceColors(content);
      if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src/pages');
processDirectory('./src/components');

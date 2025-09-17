#!/usr/bin/env node

/**
 * Hero Image Generator for Blog Posts
 *
 * This script generates hero images for blog posts using OpenAI's DALL-E 3 API
 *
 * Setup:
 *   1. Set your OpenAI API key: export OPENAI_API_KEY="your-api-key-here"
 *   2. Run: npm run generate-hero-images
 *
 * Or run directly: node generate-hero-images.js
 */

/* eslint-env node */
/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
  console.error('Please set your OpenAI API key:');
  console.error('export OPENAI_API_KEY="your-api-key-here"');
  process.exit(1);
}

// Image specifications for each blog post
const imageSpecs = [
  {
    filename: 'slime-evolution-hero.png',
    prompt: 'A modern, professional illustration showing the evolution of game development. Feature multiple colorful slime enemies (green, blue, pink) with visible animation frames and physics collision boundaries. Include elements suggesting programming like code snippets, sprite sheets, and game development tools. Use a tech-focused color palette with blues and greens. Style should be clean, minimalist, and suitable for a technical blog header.',
    blogPost: 'Game Development - Slime Evolution'
  },
  {
    filename: 'attack-animations-hero.png',
    prompt: 'A dynamic, professional illustration depicting enemy AI and attack animations in game development. Show animated sprite sequences, collision detection systems, and attack patterns with geometric shapes representing hitboxes. Include elements like state machines, animation timelines, and game programming concepts. Use vibrant colors suggesting action and movement. Style should be technical yet engaging, perfect for a game development blog post.',
    blogPost: 'Attack Animations Implementation'
  },
  {
    filename: 'adaptive-learning-hero.png',
    prompt: 'A clean, educational technology illustration showing adaptive learning systems. Feature mathematical formulas, progress charts, learning paths, and student engagement metrics. Include elements like level progression, badges, and educational interfaces. Use professional blues and greens with accents of orange for learning progress. Style should be modern, approachable, and suitable for an education technology blog.',
    blogPost: 'Adaptive Learning Platform'
  },
  {
    filename: 'educational-software-refinement-hero.png',
    prompt: 'A minimalist, professional illustration representing software refinement and user experience optimization. Show before/after interfaces, simplified user flows, and clean design elements. Include subtle references to bug fixes, code optimization, and UX improvements. Use a sophisticated color palette with blues, grays, and subtle accent colors. Style should emphasize clarity, simplicity, and professional software development.',
    blogPost: 'Educational Software UX Refinement'
  },
  {
    filename: 'visual-storytelling-hero.png',
    prompt: 'A modern, artistic illustration representing visual storytelling and blog design. Feature elements like hero images, blog layouts, typography, and visual hierarchy. Include subtle references to AI image generation, content creation, and digital publishing. Use a creative color palette with rich blues, purples, and gold accents. Style should be sophisticated and suitable for a blog about content creation and design.',
    blogPost: 'Visual Storytelling - Hero Images'
  }
];

/**
 * Generate a single image using OpenAI DALL-E 3
 */
async function generateImage(spec) {
  console.log(`Generating image for: ${spec.blogPost}`);

  const requestData = JSON.stringify({
    model: "dall-e-3",
    prompt: spec.prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "natural"
  });

  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Length': Buffer.byteLength(requestData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          resolve(response.data[0].url);
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

/**
 * Download image from URL and save to file
 */
async function downloadImage(imageUrl, filename) {
  const filePath = path.join(__dirname, 'public', 'assets', filename);

  // Ensure the directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    https.get(imageUrl, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Saved: ${filename}`);
        resolve(filePath);
      });
    }).on('error', (error) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(error);
    });
  });
}

/**
 * Main function to generate all hero images
 */
async function generateAllImages() {
  console.log('🎨 Starting hero image generation...\n');

  try {
    for (const spec of imageSpecs) {
      console.log(`📝 Prompt: ${spec.prompt.substring(0, 100)}...`);

      // Generate image
      const imageUrl = await generateImage(spec);
      console.log(`🖼️  Generated image URL: ${imageUrl}`);

      // Download and save
      await downloadImage(imageUrl, spec.filename);

      console.log(''); // Add spacing between images

      // Add a small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('🎉 All hero images generated successfully!');
    console.log('\nGenerated files:');
    imageSpecs.forEach(spec => {
      console.log(`  ✅ /public/assets/${spec.filename}`);
    });

  } catch (error) {
    console.error('❌ Error generating images:', error.message);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllImages();
}

export { generateAllImages, imageSpecs };
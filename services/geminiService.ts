import { GoogleGenAI, Chat } from "@google/genai";
import { Product } from '../types';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API_KEY is not set. Gemini features will be disabled.");
    }
  }
  return aiClient;
};

// Create a context string from our product data so the AI knows what we sell
const getProductContext = (products: Product[]) => {
  const productList = products.map(p => 
    `- ${p.name} (ID: ${p.id}): ₹${p.price}. Category: ${p.category}. Features: ${p.features.join(', ')}`
  ).join('\n');
  
  return `
    You are a helpful shopping assistant for BV MART, an Indian e-commerce site.
    Your goal is to help users find products, explain features, and compare items from our inventory.
    
    Here is our current product catalog:
    ${productList}
    
    Rules:
    1. If a user asks for a product recommendation, pick from the list above.
    2. Be polite, concise, and helpful.
    3. If the user asks about shipping, say "We offer free delivery on orders above ₹500."
    4. If the user asks about returns, say "Easy 7-day returns on most items."
    5. Format prices in Indian Rupees (₹).
  `;
};

export const createShoppingChat = (products: Product[]): Chat | null => {
  const client = getClient();
  if (!client) return null;

  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getProductContext(products),
      thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
    }
  });
};
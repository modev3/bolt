import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDp9gmJvaJuEnr6iWAN4Wnx0jdId2aHd5A');

export interface AnalysisOptions {
  includeMarketSize?: boolean;
  includeCompetitors?: boolean;
  includeMonetization?: boolean;
  includeDemographics?: boolean;
  customPrompt?: string;
  language?: 'en' | 'fr';
}

export async function analyzeTrend(topic: string, options: AnalysisOptions = {}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const basePrompt = options.language === 'fr' 
    ? `Analysez le sujet suivant et identifiez les tendances du marché, les opportunités et les niches potentielles : ${topic}\n\n`
    : `Analyze the following topic and identify market trends, opportunities, and potential niches: ${topic}\n\n`;

  let prompt = basePrompt;

  // Add optional analysis sections based on options
  if (options.includeMarketSize) {
    prompt += options.language === 'fr'
      ? "- Taille du marché actuelle et projections de croissance\n"
      : "- Current market size and growth projections\n";
  }

  if (options.includeCompetitors) {
    prompt += options.language === 'fr'
      ? "- Analyse détaillée des principaux concurrents\n"
      : "- Detailed competitor analysis\n";
  }

  if (options.includeMonetization) {
    prompt += options.language === 'fr'
      ? "- Stratégies de monétisation potentielles\n"
      : "- Potential monetization strategies\n";
  }

  if (options.includeDemographics) {
    prompt += options.language === 'fr'
      ? "- Analyse démographique du public cible\n"
      : "- Target audience demographics analysis\n";
  }

  // Add standard sections
  prompt += options.language === 'fr'
    ? `
1. Tendances actuelles du marché
2. Opportunités potentielles
3. Marchés de niche
4. Niveau de concurrence
5. Potentiel de croissance

${options.customPrompt || ''}

Formatez la réponse de manière claire et structurée.`
    : `
1. Current market trends
2. Potential opportunities
3. Niche markets
4. Competition level
5. Growth potential

${options.customPrompt || ''}

Format the response in a clear, structured way.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
// src/ia/services/ia.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      this.logger.error('GEMINI_API_KEY não configurada');
      throw new Error('GEMINI_API_KEY não configurada no ambiente');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // Usar any para contornar a tipagem que ainda não suporta googleSearch
    const config: any = {
      model: 'gemini-2.0-flash',
      tools: [{ googleSearch: {} }]
    };
    
    this.model = this.genAI.getGenerativeModel(config, { apiVersion: 'v1beta' });
    
    this.logger.log('IA Service inicializado com suporte a Google Search');
  }

  async processarMensagem(mensagem: string, empresaId?: number): Promise<string> {
    this.logger.log(`Processando mensagem: ${mensagem}`);
    this.logger.log(`Empresa ID: ${empresaId}`);

    if (!mensagem || mensagem.trim() === '') {
      throw new Error('Mensagem não pode ser vazia');
    }

    const prompt = this.buildPrompt(mensagem, empresaId);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Tentar extrair fontes da resposta
      const sources = this.extractSourcesFromResponse(response);
      
      this.logger.log('Resposta gerada com sucesso');
      
      if (sources) {
        return `${text}\n\n📚 **Fontes consultadas:**\n${sources}`;
      }
      
      return text;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      this.logger.error(`Erro ao processar mensagem: ${errorMessage}`);
      
      // Retorna mensagem amigável para o usuário
      if (errorMessage.includes('429') || errorMessage.includes('quota')) {
        return `🔍 **Sua pergunta:** "${mensagem}"

⚠️ **O serviço de busca está temporariamente indisponível.** (Limite de requisições excedido)

📌 **Alternativas:**
1. Aguarde alguns minutos e tente novamente
2. Pesquise diretamente no Google: 
   https://www.google.com/search?q=${encodeURIComponent(mensagem)}

💡 O PeopleCore com Gemini Search trará respostas atualizadas com fontes quando a API estiver disponível.`;
      }
      
      return `❌ **Erro ao processar sua solicitação.**

**Sua pergunta:** "${mensagem}"

**Erro:** ${errorMessage}

Tente novamente em alguns instantes.`;
    }
  }

  private extractSourcesFromResponse(response: any): string | null {
    try {
      // Tentar acessar o grounding metadata de diferentes formas
      const candidates = response?.candidates;
      if (candidates && candidates[0]) {
        // Verificar se há groundingMetadata
        const groundingMetadata = candidates[0].groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
          const sources = new Set<string>();
          for (const chunk of groundingMetadata.groundingChunks) {
            if (chunk.web?.uri) {
              sources.add(chunk.web.uri);
            }
          }
          if (sources.size > 0) {
            return Array.from(sources).map((url, i) => `${i + 1}. ${url}`).join('\n');
          }
        }
        
        // Verificar se há citationSources
        if (candidates[0].citationSources?.length) {
          const sources = new Set<string>();
          for (const source of candidates[0].citationSources) {
            if (source.uri) {
              sources.add(source.uri);
            }
          }
          if (sources.size > 0) {
            return Array.from(sources).map((url, i) => `${i + 1}. ${url}`).join('\n');
          }
        }
      }
      return null;
    } catch (error) {
      this.logger.debug('Não foi possível extrair fontes da resposta');
      return null;
    }
  }

  private buildPrompt(mensagem: string, empresaId?: number): string {
    return `Você é o Assistente PeopleCore, especialista em RH, SST e legislação trabalhista brasileira.

**IMPORTANTE:** Você TEM ACESSO ao Google Search. Use-o para buscar informações atualizadas SEMPRE que precisar de:
- Legislação trabalhista atual (CLT, NRs, leis, decretos, portarias)
- Cálculos (férias, 13º, rescisão, hora extra, INSS, IRRF)
- Valores atualizados (salário mínimo, teto do INSS, taxas, prazos)
- Mudanças recentes na legislação
- Jurisprudência e decisões judiciais

**Contexto da empresa:** ${empresaId ? 'Usuário logado em uma empresa específica' : 'Acesso geral do sistema'}

**Pergunta do usuário:** ${mensagem}

**Instruções de resposta:**
1. Responda de forma clara, objetiva e profissional
2. SEMPRE pesquise no Google para confirmar informações atuais
3. Cite as fontes das suas informações (URLs quando disponíveis)
4. Para cálculos, mostre a fórmula e um exemplo prático
5. Se a pergunta for sobre datas, valores ou leis, pesquise primeiro

Responda em português brasileiro.`;
  }
}
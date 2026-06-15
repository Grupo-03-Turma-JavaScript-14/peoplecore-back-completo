// gemini.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly apiKey = process.env.GEMINI_API_KEY ?? '';
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private readonly httpService: HttpService) {}

  async gerarResposta(mensagem: string, historico: any[] = [], contexto?: string): Promise<string> {
    // Converte o histórico para o formato da Gemini
    const contents = [
      // Adiciona contexto do sistema
      {
        parts: [{ text: `Você é um assistente especialista em RH, SST e gestão empresarial. ${contexto || ''} Responda de forma clara, objetiva e profissional.` }],
        role: 'user'
      },
      ...historico.map(msg => ({
        parts: [{ text: msg.texto }],
        role: msg.autor === 'usuario' ? 'user' : 'model'
      })),
      {
        parts: [{ text: mensagem }],
        role: 'user'
      }
    ];

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}?key=${this.apiKey}`, {
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.95,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE'
            }
          ]
        })
      );

      const data = response.data;
      const textoResposta = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textoResposta) {
        throw new Error('Resposta vazia da Gemini');
      }
      
      return textoResposta;
    } catch (error: any) {
      this.logger.error('Erro ao chamar Gemini:', error.response?.data || error.message);
      throw new Error(`Erro na API Gemini: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async gerarRespostaJson(prompt: string): Promise<any> {
    const texto = await this.gerarResposta(prompt, [], 'Responda apenas com JSON válido.');
    try {
      const jsonMatch = texto.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: texto };
    } catch {
      return { raw: texto };
    }
  }
}
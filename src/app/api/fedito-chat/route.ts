import { NextRequest, NextResponse } from 'next/server';
import { aiFeditoChat } from '@/ai/flows/ai-fedito-chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje no válido' },
        { status: 400 }
      );
    }

    // Formatear historial para el prompt
    const historyText = conversationHistory
      .slice(-6)
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n');

    const result = await aiFeditoChat({
      message,
      conversationHistory: historyText,
    });

    return NextResponse.json({
      response: result.response,
    });
  } catch (error) {
    console.error('Error en Fedito Chat API:', error);
    return NextResponse.json(
      {
        error: 'Lo siento, he tenido un problema. ¿Puedes repetir la pregunta?',
      },
      { status: 500 }
    );
  }
}

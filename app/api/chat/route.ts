import { StreamingTextResponse } from 'ai';
import { ChatMessage, MessageContent, OpenAI, TogetherLLM, MessageType } from 'llamaindex';
import { NextRequest, NextResponse } from 'next/server';
import { createChatEngine } from './engine';
import { LlamaIndexStream } from './llamaindex-stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: 'text',
      text: textMessage,
    },
    {
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

// const maskPII = async (text: string): Promise<string> => {
//   try {
//     const response = await fetch('https://barristerbotmasking.vercel.app/mask', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       return data.masked_text;
//     } else {
//       console.error('Error masking text:', data.error);
//       return text;
//     }
//   } catch (error) {
//     console.error('Error making request to mask PII:', error);
//     return text;
//   }
// };

export async function POST(request: NextRequest) {
  console.log('got a request')
  try {
    const body = await request.json();
    const { messages, data }: { messages: ChatMessage[]; data: any } = body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== 'user') {
      return NextResponse.json(
        {
          error:
            'messages are required in the request body and the last message must be from the user',
        },
        { status: 400 }
      );
    }

    const llm = new TogetherLLM({
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
      maxTokens: 512,
      apiKey: process.env.TOGETHER_API_KEY,
    });

    const chatEngine = await createChatEngine(llm);

    // Define system prompt with correct type
    const systemPrompt: ChatMessage = {
      role: 'system' as MessageType,
      content: `You are a NLP based chatbot for the University of Haripur name "Uni-Bot", ensuring accuracy and briefness.  
      You always follow these guidelines: 
      -If the answer isn't available within the context, then say I am not trained to answer that questions
      -Otherwise, answer to your best capability
      -Only use examples if explicitly requested
      -Do not introduce examples outside of the context
      -Do not answer if context is absent
      -Limit responses to three or four paragraphs for clarity and conciseness
      -If you are asked about who created you. Then Answer that I am developed by Hunain Adil and Fahad Ali as a FYP Under the supervision of Dr. Mehm0od Ahmed.
      -You should give reference at the end`
    };

    // Insert system prompt at the beginning of the messages array
    messages.unshift(systemPrompt);

    // Mask PII in the user's message
    // const maskedUserMessageContent = await maskPII(userMessage.content);

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent = convertMessageContent(
      userMessage.content,
      data?.imageUrl
    );

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessageContent,
      chatHistory: messages,
      stream: true,
    });

    // Transform LlamaIndex stream to Vercel/AI format
    const { stream, data: streamData } = LlamaIndexStream(response, {
      parserOptions: {
        image_url: data?.imageUrl,
      },
    });

    // Return a StreamingTextResponse, which can be consumed by the Vercel/AI client
    return new StreamingTextResponse(stream, {}, streamData);
  } catch (error) {
    console.error('[LlamaIndex]', error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BedrockMessage {
  role: "user" | "assistant";
  content: { text: string }[];
}

export async function getLLMResponse(
  systemPrompt: string,
  userPrompt: string,
  conversationHistory: Message[] = [],
): Promise<string> {
  try {
    // Convert conversation history to Bedrock format
    // Always include system prompt context
    let messages: BedrockMessage[] = [];

    // If there's conversation history, prepend system prompt to first user message
    if (conversationHistory.length > 0) {
      // Format the history
      const formattedHistory: BedrockMessage[] = conversationHistory.map(
        (msg, index) => {
          // Add system prompt to the very first user message
          if (index === 0 && msg.role === "user") {
            return {
              role: msg.role,
              content: [{ text: `${systemPrompt}\n\nUser: ${msg.content}` }],
            };
          }
          return {
            role: msg.role,
            content: [{ text: msg.content }],
          };
        },
      );

      // Add current message
      const currentMessage: BedrockMessage = {
        role: "user",
        content: [{ text: userPrompt }],
      };

      messages = [...formattedHistory, currentMessage];
    } else {
      // First message - include system prompt
      messages = [
        {
          role: "user",
          content: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
        },
      ];
    }

    const requestBody = {
      inferenceConfig: {
        max_new_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      },
      messages: messages,
    };

    const command = new InvokeModelCommand({
      modelId: "amazon.nova-lite-v1:0", // Using Nova Lite as requested
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(requestBody),
    });

    console.log("Request to Bedrock:", JSON.stringify(requestBody, null, 2));

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log(
      "Response from Bedrock:",
      JSON.stringify(responseBody, null, 2),
    );

    // Extract the response text
    const llmResponse =
      responseBody?.output?.message?.content?.[0]?.text ||
      "I apologize, but I couldn't generate a response. Please try again.";

    console.log("LLM Response:", llmResponse);

    return llmResponse;
  } catch (error) {
    console.error("Error calling Bedrock:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("credentials")) {
        throw new Error(
          "AWS credentials not configured properly. Please check your environment variables.",
        );
      }
      if (error.message.includes("model")) {
        throw new Error(
          "Model access error. Please ensure you have access to Amazon Nova Lite in your AWS account.",
        );
      }
    }

    throw new Error(
      "Failed to get response from AI model. Please try again later.",
    );
  }
}

// Helper function to trim conversation history if it gets too long
export function trimConversationHistory(
  history: Message[],
  maxMessages: number = 10,
): Message[] {
  // Keep only the last N messages to avoid token limits
  if (history.length <= maxMessages) {
    return history;
  }

  // Always keep the first message (for context) and the last N-1 messages
  const firstMessage = history[0];
  const recentMessages = history.slice(-(maxMessages - 1));

  return [firstMessage, ...recentMessages];
}

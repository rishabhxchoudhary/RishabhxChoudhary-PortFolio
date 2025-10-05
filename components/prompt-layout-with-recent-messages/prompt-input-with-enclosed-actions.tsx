"use client";
import type { TextAreaProps } from "@nextui-org/react";

import React from "react";
import { Button, Tooltip, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import PromptInput from "./prompt-input";
import axios from "axios";

export interface Message {
  role: "user" | "assistant";
  message: string;
  suggestedActions?: string[];
}

interface ComponentProps extends TextAreaProps {
  classNames?: Record<
    "button" | "buttonIcon" | "input" | "innerWrapper",
    string
  >;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setChatStart: (isChatStart: boolean) => void;
}

// Quick action suggestions for users
const QUICK_PROMPTS = [
  {
    text: "What is your experience and background in development?",
    icon: "solar:briefcase-linear",
  },
  {
    text: "Can you provide examples of past projects?",
    icon: "solar:folder-linear",
  },
  {
    text: "What are your rates and payment terms?",
    icon: "solar:money-bag-linear",
  },
  {
    text: "What is your availability and timeline?",
    icon: "solar:calendar-linear",
  },
];

// Action button handlers
const ACTION_HANDLERS: Record<string, () => void> = {
  "View Projects": () => {
    const projectSection = document.getElementById("projects");
    projectSection?.scrollIntoView({ behavior: "smooth" });
  },
  "Download Resume": () => {
    window.open("/resume.pdf", "_blank");
  },
  "LinkedIn Profile": () => {
    window.open("https://linkedin.com/in/rishabhxchoudhary/", "_blank");
  },
  "GitHub Profile": () => {
    window.open("https://github.com/rishabhxchoudhary", "_blank");
  },
  "Send Email": () => {
    window.location.href = "mailto:rishabh26072003@gmail.com";
  },
  "Send Email for Resume": () => {
    window.location.href =
      "mailto:rishabh26072003@gmail.com?subject=Request%20for%20Resume&body=Hi%20Rishabh,%0A%0AI%20would%20like%20to%20request%20your%20resume.%20Could%20you%20please%20send%20it%20to%20me?%0A%0AThank%20you!";
  },
  "See Project Examples": () => {
    const projectSection = document.getElementById("projects");
    projectSection?.scrollIntoView({ behavior: "smooth" });
  },
};

export default function Component(props: ComponentProps) {
  const [prompt, setPrompt] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState(false);

  // Convert messages to format expected by API
  const formatMessagesForAPI = (messages: Message[]) => {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.message,
    }));
  };

  // Handle action button clicks
  const handleActionClick = (action: string) => {
    const handler = ACTION_HANDLERS[action];
    if (handler) {
      handler();
    } else {
      // If no specific handler, send as a message
      handleSubmit(action);
    }
  };

  // Handle quick prompt clicks
  const handleQuickPrompt = (promptText: string) => {
    // Don't set prompt since we're passing it directly to handleSubmit
    // This prevents double setting and potential race conditions
    handleSubmit(promptText);
  };

  // Function to handle form submission
  const handleSubmit = async (messageOverride?: string) => {
    const messageToSend = messageOverride || prompt.trim();

    if (props.loading || !messageToSend) return;

    props.setLoading(true);
    props.setChatStart(true);
    setIsTyping(true);

    console.log("Sending message:", messageToSend);

    // Add user message to the conversation
    const newUserMessage: Message = {
      role: "user",
      message: messageToSend,
    };

    props.setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      newUserMessage,
    ]);

    // Clear input immediately for better UX
    if (!messageOverride) {
      setPrompt("");
    }

    try {
      // Format conversation history for the API
      const conversationHistory = formatMessagesForAPI(props.messages);

      console.log("Sending with intent detection...");

      const res = await axios.post("/api/rishabhAi", {
        query: messageToSend,
        conversationHistory: conversationHistory,
      });

      const reply = res.data.message;
      const suggestedActions = res.data.suggestedActions;

      // Add assistant response to the conversation
      props.setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        {
          role: "assistant",
          message:
            reply ||
            "I apologize, but I couldn't generate a response. Please try again.",
          suggestedActions: suggestedActions,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);

      let errorMessage =
        "I'm having trouble connecting right now. Please try again in a moment.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.code === "ECONNABORTED") {
          errorMessage =
            "The request took too long. Please try again with a shorter message.";
        } else if (!error.response) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        }
      }

      props.setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        {
          role: "assistant",
          message: errorMessage,
        },
      ]);
    } finally {
      props.setLoading(false);
      setIsTyping(false);
    }
  };

  // Function to handle key down events in the input
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Clear conversation history
  const clearConversation = React.useCallback(() => {
    props.setMessages([]);
    props.setChatStart(false);
    setPrompt("");
  }, [props]);

  // Get the latest message for suggested actions
  const latestAssistantMessage = [...props.messages]
    .reverse()
    .find((msg) => msg.role === "assistant");

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Quick prompts for new conversations */}
      {props.messages.length === 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {QUICK_PROMPTS.map((quickPrompt, index) => (
            <Chip
              key={index}
              startContent={<Icon icon={quickPrompt.icon} width={16} />}
              variant="bordered"
              className="cursor-pointer hover:bg-default-100 transition-colors"
              onClick={() => {
                if (!props.loading) {
                  handleQuickPrompt(quickPrompt.text);
                }
              }}
            >
              {quickPrompt.text}
            </Chip>
          ))}
        </div>
      )}

      {/* Suggested actions from AI */}
      {latestAssistantMessage?.suggestedActions &&
        latestAssistantMessage.suggestedActions.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {latestAssistantMessage.suggestedActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="flat"
                color="primary"
                onClick={() => handleActionClick(action)}
                startContent={
                  <Icon
                    icon={
                      action.includes("Download")
                        ? "solar:download-linear"
                        : action.includes("LinkedIn")
                          ? "mdi:linkedin"
                          : action.includes("GitHub")
                            ? "mdi:github"
                            : action.includes("Email")
                              ? "solar:letter-linear"
                              : action.includes("Project")
                                ? "solar:folder-linear"
                                : "solar:arrow-right-linear"
                    }
                    width={16}
                  />
                }
              >
                {action}
              </Button>
            ))}
          </div>
        )}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex items-center gap-2 text-sm text-default-500 px-2">
          <Icon
            icon="solar:chat-dots-linear"
            width={16}
            className="animate-pulse"
          />
          <span>Rishabh is typing...</span>
        </div>
      )}

      {/* Main input form */}
      <form
        className="flex w-full items-start gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <PromptInput
          {...props}
          classNames={{
            innerWrapper: cn("items-center", props.classNames?.innerWrapper),
            input: cn(
              "text-medium data-[has-start-content=true]:ps-0 data-[has-start-content=true]:pe-0",
              props.classNames?.input,
            ),
          }}
          endContent={
            <div className="flex gap-2">
              {/* Clear conversation button */}
              {props.messages.length > 0 && (
                <Tooltip showArrow content="Clear conversation">
                  <Button
                    isIconOnly
                    className="text-default-500"
                    radius="full"
                    variant="flat"
                    onClick={clearConversation}
                    isDisabled={props.loading}
                  >
                    <Icon
                      className="text-default-500"
                      icon="solar:trash-bin-minimalistic-linear"
                      width={20}
                    />
                  </Button>
                </Tooltip>
              )}

              {/* Send message button */}
              <Tooltip
                showArrow
                content={
                  props.loading
                    ? "Processing..."
                    : !prompt.trim()
                      ? "Type a message"
                      : "Send message"
                }
              >
                <Button
                  isIconOnly
                  className={props?.classNames?.button || ""}
                  color={
                    !prompt.trim() || props.loading ? "default" : "primary"
                  }
                  isDisabled={!prompt.trim() || props.loading}
                  radius="full"
                  variant={!prompt.trim() || props.loading ? "flat" : "solid"}
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  <Icon
                    className={cn(
                      "[&>path]:stroke-[2px]",
                      !prompt.trim() || props.loading
                        ? "text-default-500"
                        : "text-primary-foreground",
                      props?.classNames?.buttonIcon || "",
                      props.loading ? "animate-spin" : "",
                    )}
                    icon={
                      props.loading
                        ? "solar:hourglass-line-linear"
                        : "solar:arrow-up-linear"
                    }
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          startContent={
            <Tooltip showArrow content="Attach file (coming soon)">
              <Button
                isIconOnly
                className="p-[10px] opacity-50 cursor-not-allowed"
                radius="full"
                variant="light"
                disabled={true}
              >
                <Icon
                  className="text-default-500"
                  icon="solar:paperclip-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          }
          value={prompt}
          onValueChange={setPrompt}
          onKeyDown={handleKeyDown}
          disabled={props.loading}
          placeholder={
            props.loading
              ? "Processing your message..."
              : props.messages.length === 0
                ? "Ask me about my experience, projects, or skills..."
                : "Continue our conversation..."
          }
        />
      </form>

      {/* Conversation tips */}
      {props.messages.length === 0 && (
        <p className="text-xs text-default-400 text-center mt-2">
          💡 Tip: I can discuss my technical experience, projects, skills, and
          availability for opportunities
        </p>
      )}
    </div>
  );
}

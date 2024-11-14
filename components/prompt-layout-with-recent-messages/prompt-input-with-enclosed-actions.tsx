"use client";
import type { TextAreaProps } from "@nextui-org/react";

import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import PromptInput from "./prompt-input";
import axios from "axios";

export interface Message {
  role: string;
  message: string;
}

interface ComponentProps extends TextAreaProps {
  classNames?:Record<"button" | "buttonIcon" | "input" | "innerWrapper", string>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setChatStart: (isChatStart: boolean) => void; // Adjust if necessary
}

export default function Component(props: ComponentProps) {
  const [prompt, setPrompt] = React.useState<string>("");

  // Function to handle form submission
  const handleSubmit = async () => {
    if (props.loading) return; // Prevent multiple submissions
    props.setLoading(true);
    props.setChatStart(true);
    console.log("Form submitted with: ", prompt);

    props.setMessages((prevItems: Message[]) => [
      ...prevItems,
      {
        role: "user",
        message: prompt,
      },
    ]);

    try {
      const res = await axios.post("/api/rishabhAi", {
        query: prompt
      });
      setPrompt('');
      const reply = res.data.message;
      props.setMessages((prevItems: Message[]) => [
        ...prevItems,
        {
          role: "assistant",
          message: reply=="undefined"? "Server Overloaded. Please wait for some time and try again." : reply,
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally handle error state here
    } finally {
      props.setLoading(false);
    }
  };

  // Function to handle key down events in the input
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default to stop the newline character
      handleSubmit();
    }
  };

  return (
    <form className="flex w-full items-start gap-2" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
            <Tooltip showArrow content="Send message">
              <Button
                isIconOnly
                className={props?.classNames?.button || ""}
                color={!prompt || props.loading ? "default" : "primary"}
                isDisabled={!prompt || props.loading}
                radius="full"
                variant={!prompt || props.loading ? "flat" : "solid"}
                onClick={handleSubmit}
              >
                <Icon
                  className={cn(
                    "[&>path]:stroke-[2px]",
                    !prompt || props.loading ? "text-default-500" : "text-primary-foreground",
                    props?.classNames?.buttonIcon || "",
                  )}
                  icon="solar:arrow-up-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          </div>
        }
        startContent={
          <Tooltip showArrow content="Add file">
            <Button isIconOnly className="p-[10px]" radius="full" variant="light">
              <Icon className="text-default-500" icon="solar:paperclip-linear" width={20} />
            </Button>
          </Tooltip>
        }
        value={prompt}
        onValueChange={setPrompt}
        onKeyDown={handleKeyDown}
        disabled={props.loading} // Disable input while loading
      />
    </form>
  );
}

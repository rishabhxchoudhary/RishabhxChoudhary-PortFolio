"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {Card, CardHeader, CardBody} from "@nextui-org/react";

import SidebarContainer from "./sidebar-with-clear-with-toggle-button";

import PromptInputWithEnclosedActions from "./prompt-input-with-enclosed-actions";

const messages = [
  {
    key: "message1",
    description: "What is your experience and background in development?",
    icon: <Icon className="text-primary-700" icon="solar:notebook-square-bold" width={24} />,
  },
  {
    key: "message2",
    description: "Can you provide examples of past projects similar to ours?",
    icon: <Icon className="text-danger-600" icon="solar:chat-square-like-bold" width={24} />,
  },
  {
    key: "message3",
    description: "What are your rates and payment terms?",
    icon: <Icon className="text-warning-600" icon="solar:user-id-bold" width={24} />,
  },
  {
    key: "message4",
    description: "What is your availability and estimated timeline for a project like this?",
    icon: <Icon className="text-success-600" icon="solar:gameboy-bold" width={24} />,
  },
];

export default function Component() {
  return (
    <div id="ask" className="h-full max-w-6xl">
      <SidebarContainer
        classNames={{
          header: "min-h-[40px] h-[40px] py-[12px] justify-center overflow-hidden",
        }}
        header={
          <Dropdown className="bg-content1">
            <DropdownTrigger>
              <Button
                disableAnimation
                className="items-center text-default-400 data-[hover=true]:bg-[unset]"
                endContent={
                  <Icon
                    className="text-default-400"
                    height={20}
                    icon="solar:alt-arrow-down-linear"
                    width={20}
                  />
                }
                variant="light"
              >
                Rishabh v4
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Rishabh model version" className="p-0 pt-2" variant="faded">
              <DropdownSection
                classNames={{
                  heading: "text-tiny px-[10px]",
                }}
                title="Model"
              >
                <DropdownItem
                  key="Rishabh-v4"
                  className="text-default-500 data-[hover=true]:text-default-500"
                  classNames={{
                    description: "text-default-500 text-tiny",
                  }}
                  description="Knows basic thing about Rishabh Kumar"
                  endContent={
                    <Icon
                      className="text-default-foreground"
                      height={24}
                      icon="solar:check-circle-bold"
                      width={24}
                    />
                  }
                  startContent={
                    <Icon
                      className="text-default-400"
                      height={24}
                      icon="solar:star-rings-linear"
                      width={24}
                    />
                  }
                >
                  Rishabh v4
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        }
      >
        <div className=" flex h-full flex-col px-6">
          <div className="flex h-full flex-col items-center justify-center gap-10">
            <div className="flex rounded-full bg-foreground"> 
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              {messages.map((message) => (
                <Card
                  key={message.key}
                  className="h-auto bg-default-100 px-[20px] py-[16px]"
                  shadow="none"
                >
                  <CardHeader className="p-0 pb-[9px]">{message.icon}</CardHeader>
                  <CardBody className="p-0 text-small text-default-400">
                    {message.description}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-auto flex max- flex-col gap-2">
            <PromptInputWithEnclosedActions
              classNames={{
                button:
                  "bg-default-foreground opacity-100 w-[30px] h-[30px] self-center",
                buttonIcon: "text-background",
                input: "placeholder:text-default-500",
              }}
              placeholder="Send a message to RishabhAI"
            />
            <p className="px-2 text-center text-small font-medium leading-5 text-default-500">
              Have any small queries? You can ask Rishabh AI about me.
            </p>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
}

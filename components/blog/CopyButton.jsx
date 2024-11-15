// components/CopyButton.js
import React, { useState } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { CheckIcon, CopyIcon } from '@heroicons/react/solid';

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <Tooltip content={copied ? 'Copied!' : 'Copy'} placement="top">
      <Button
        size="sm"
        onPress={handleCopy}
        className="absolute top-2 right-2 bg-background-dark text-text-default hover:bg-background-dark"
        auto
        flat
        color="primary"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <CopyIcon className="h-4 w-4 text-primary-light" />
        )}
      </Button>
    </Tooltip>
  );
};

export default CopyButton;

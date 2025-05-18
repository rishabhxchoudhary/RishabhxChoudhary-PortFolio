---
title: "Serverless Math: $f(x) = x^2 + x$ with AWS Fargate & Step Functions"
date: "18 May 2025"
category: "Cloud Computing & Programming"
tags: ["AWS", "Fargate", "Step Functions", "Serverless", "TypeScript", "Docker", "S3", "Tutorial"]
# coverImage: "/images/fargate-stepfunctions-math/cover.webp" # Optional: Add a relevant cover image path
about: "Learn how to build a robust, serverless application on AWS to perform calculations like $f(x) = x^2 + x$. This step-by-step tutorial guides you through using TypeScript, Docker, AWS Fargate for container execution, S3 for storage, and AWS Step Functions for workflow orchestration, including automated retries for resilience. Perfect for beginners and those looking to combine these powerful AWS services."
---
# AWS Fargate and Step Functions Tutotial Workflow
## Introduction

Imagine you have a special math problem you need to solve, say, calculating the value of a function $f(x) = x^2 + x$. Simple enough for a pocket calculator, right? But what if you needed to do this calculation thousands of times, ensure it always works, and get a notification if it fails? What if you wanted this calculation to happen automatically in the cloud without worrying about managing servers?

Welcome to the world of serverless computing on AWS! In this tutorial, we'll build a robust, automated system to perform exactly this calculation. We'll write our math function in TypeScript, package it up like a pro using Docker, run it on demand using AWS Fargate (think of it as a "container-as-a-service" offering), and manage the whole process with AWS Step Functions, our trusty workflow conductor.

This journey will take us through some core AWS services, and by the end, you'll have a working example of a resilient, serverless application. Whether you're new to AWS or looking to combine these services in a new way, this guide is for you!

## Why This Stack? The "Superpowers" Explained

We're using a specific set of tools, and each brings its own superpower to our project:

*   **TypeScript:** It's JavaScript with "superpowers" (static typing!). This helps us catch errors early and write more maintainable code for our calculator.
*   **AWS S3 (Simple Storage Service):** Think of S3 as infinitely scalable cloud storage. It's our "digital mailbox" where we'll drop off the input number `x` and pick up the calculated result.
*   **Docker:** This is like a magical shipping container for our code. We package our TypeScript application and all its needs (like Node.js) into a Docker image. This "container" can then run consistently anywhere – on our laptop or in AWS Fargate.
*   **AWS ECR (Elastic Container Registry):** Once we have our Docker "shipping container," ECR is the secure port where we store it in the cloud, ready for Fargate to use.
*   **AWS Fargate:** This is where the magic of "serverless containers" happens. We give Fargate our Docker image, and it runs our calculator without us ever needing to pick a server, patch an operating system, or worry about scaling. It just runs!
*   **AWS Step Functions:** If Fargate runs our calculator, Step Functions is the "manager" or "conductor" of the entire operation. It defines the workflow: "First, run the calculator. If it succeeds, great! If it fails, try again a couple of times. If it still fails, then report an error." It gives us visibility and control over multi-step processes.
*   **AWS IAM (Identity and Access Management):** The "security guard" of AWS. IAM ensures that each part of our system only has the permissions it absolutely needs to do its job, and no more.

Together, these services allow us to build a powerful, automated, and resilient system for our math calculation (and much more complex tasks too!).

## Our Math Mission: Defining the Task

Our goal is to calculate the function $f(x) = x^2 + x$. The overall process will look like this:

1.  **Input:** We'll provide the number $x$ in a JSON file (e.g., `{"x": 5}`) and upload this file to an S3 bucket (our input mailbox).
2.  **Trigger:** We will manually trigger our AWS Step Function.
3.  **Orchestration:** The Step Function will kick off the process. Its main job is to tell AWS Fargate to run our calculator.
4.  **Calculation:** Our Fargate task (running the TypeScript code packaged in Docker) will:
    *   Read which S3 bucket and file contains the input $x$.
    *   Download and read the JSON file from S3 to get the value of $x$.
    *   Perform the calculation: $y = x^2 + x$.
    *   Write the result (e.g., `{"input_x": 5, "result_fx": 30}`) into a new JSON file in a different S3 bucket (our output mailbox).
5.  **Resilience:** If our Fargate task encounters an error (maybe the input file is missing, or there's a temporary hiccup), the Step Function will automatically tell Fargate to try running the calculator again. We'll configure it for a maximum of 2 retries.
6.  **Outcome:** The Step Function will report whether the overall process succeeded or failed after all attempts.

Let's start building!

## Part 1: Crafting Our Calculator (The TypeScript Function)

First, we need the code that actually does the math.

### Project Setup

1.  On your computer, create a new project folder (e.g., `fargate-math-function`) and navigate into it using your terminal.
2.  Initialize a Node.js project:
    ```bash
    npm init -y
    ```
3.  Install necessary packages: TypeScript, Node.js types, and the AWS SDK v3 for S3.
    ```bash
    npm install typescript @types/node --save-dev
    npm install @aws-sdk/client-s3
    ```
4.  Create a `tsconfig.json` file in your project root. This file tells TypeScript how to compile our code.
    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```
    Key bits here: `outDir: "./dist"` means compiled JavaScript goes into a `dist` folder, and `rootDir: "./src"` means our TypeScript source code will live in a `src` folder.

5.  Add `build` and `start` scripts to your `package.json`:
    ```json
    "scripts": {
      "build": "tsc",
      "start": "node dist/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

### The Calculator Code (`src/index.ts`)

Create a folder named `src` and inside it, a file named `index.ts`. This is where our calculator's brain lives.

```typescript
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize the S3 client. In Fargate, it will automatically pick up
// the region and credentials from its environment and assigned IAM role.
const s3Client = new S3Client({});

// Helper function to convert a readable stream (like S3 object body) to a string
async function streamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    });
}

// Our main function
async function calculateAndStore() {
    console.log("Calculator function started.");

    // These values will be passed as environment variables to our Fargate task
    // The Step Function will provide these values when it runs the task.
    const inputBucket = process.env.INPUT_S3_BUCKET;
    const inputKey = process.env.INPUT_S3_KEY;
    const outputBucket = process.env.OUTPUT_S3_BUCKET;
    const outputKey = process.env.OUTPUT_S3_KEY;

    if (!inputBucket || !inputKey || !outputBucket || !outputKey) {
        console.error("Critical error: Missing S3 configuration environment variables!");
        // This error will cause the Fargate task to exit with a non-zero code,
        // signaling failure to Step Functions, which will then trigger a retry.
        throw new Error("Missing S3 configuration environment variables!");
    }

    console.log(`Input: s3://${inputBucket}/${inputKey}`);
    console.log(`Output: s3://${outputBucket}/${outputKey}`);

    try {
        // 1. Get the input file from S3
        console.log("Fetching input from S3...");
        const getObjectParams = { Bucket: inputBucket, Key: inputKey };
        const getObjectCommand = new GetObjectCommand(getObjectParams);
        const s3Object = await s3Client.send(getObjectCommand);

        if (!s3Object.Body) {
            throw new Error("S3 object body is empty or undefined.");
        }

        const bodyContents = await streamToString(s3Object.Body);
        const inputData = JSON.parse(bodyContents);
        const x: number = inputData.x;

        if (typeof x !== 'number') {
            throw new Error(`Input 'x' is not a number or is missing. Received: ${x}`);
        }
        console.log(`Received x = ${x}`);

        // 2. Do the math: f(x) = x^2 + x
        const result = (x * x) + x; // Or Math.pow(x, 2) + x
        console.log(`Calculation: f(${x}) = ${x}^2 + ${x} = ${result}`);

        // 3. Prepare the output data
        const outputData = {
            input_x: x,
            function_expression: "f(x) = x^2 + x",
            result_fx: result,
            calculatedAt: new Date().toISOString(),
        };

        // 4. Write the output file to S3
        console.log("Writing output to S3...");
        const putObjectParams = {
            Bucket: outputBucket,
            Key: outputKey,
            Body: JSON.stringify(outputData, null, 2), // Pretty print JSON
            ContentType: "application/json",
        };
        const putObjectCommand = new PutObjectCommand(putObjectParams);
        await s3Client.send(putObjectCommand);

        console.log("Successfully processed and stored the result!");
        // If we reach here, everything is good. The task will exit with code 0 (success).

    } catch (error) {
        console.error("Error during calculation or S3 operation:", error);
        // Re-throw the error. This ensures the Fargate task exits with a non-zero code,
        // which signals to Step Functions that this attempt failed.
        throw error;
    }
}

// Run the main function and ensure proper exit codes for Fargate
calculateAndStore()
    .then(() => {
        console.log("Function execution completed successfully. Exiting with code 0.");
        process.exit(0); // Success
    })
    .catch((err) => {
        console.error("Function execution failed. Exiting with code 1.", err);
        process.exit(1); // Failure
    });

```

A few key things about this code:

It reads S3 bucket and key names from environment variables (process.env.VAR_NAME). This is how our Fargate task will know where to find its input and where to put its output.

It uses the AWS SDK v3 for JavaScript to interact with S3.

Crucially for retries: If anything goes wrong (e.g., file not found, input x is not a number), it throws an error. calculateAndStore() is wrapped in a .then().catch() that calls process.exit(1) on error. This non-zero exit code tells Fargate (and thus Step Functions) that this attempt failed. A process.exit(0) signals success.

Compile the Code

Now, compile your TypeScript into JavaScript:

npm run build
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

This will create a dist folder containing index.js.

Part 2: Packaging Our Calculator (Docker & ECR)

Our TypeScript code needs an environment to run in (Node.js) and needs to be packaged up so Fargate can use it. That's where Docker comes in.

The Dockerfile

Create a file named Dockerfile (no extension) in your project root:
```
# Use an official Node.js runtime as a parent image
# Using a slim version to keep the image size small
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
# This step leverages Docker's layer caching. If these files don't change,
# Docker won't re-run npm install unless absolutely necessary.
COPY package*.json ./

# Install app dependencies for production
RUN npm install --only=production

# Bundle app source (the compiled JavaScript from the 'dist' folder)
COPY dist ./dist

# Environment variables that our script uses.
# These are default/example values. The actual values will be injected
# by AWS Fargate, based on what AWS Step Functions passes to it.
ENV INPUT_S3_BUCKET="your-input-bucket-name"
ENV INPUT_S3_KEY="input/data.json"
ENV OUTPUT_S3_BUCKET="your-output-bucket-name"
ENV OUTPUT_S3_KEY="output/result.json"
ENV AWS_REGION="your-aws-region" # e.g., us-east-1

# Command to run the application when the container starts
CMD [ "node", "dist/index.js" ]
```

This Dockerfile tells Docker:

Start with a basic Node.js 18 environment.

Set up a working directory inside the container.

Copy package.json and install only production dependencies (we don't need TypeScript inside the running container, just the compiled JavaScript).

Copy our compiled dist folder into the container.

Define some environment variables (these will be overridden later).

Specify the command to run when the container starts: node dist/index.js.

Build and Push to ECR (Elastic Container Registry)

ECR is AWS's private Docker image registry.

Create an ECR Repository:

Go to the AWS ECR console.

Click "Create repository."

Choose "Private."

Repository name: fargate-math-calculator.

Click "Create repository."

Once created, select your repository and click "View push commands." These are super helpful!

Follow ECR Push Commands:
Open your terminal in the fargate-math-function project directory. The commands will look similar to this (replace 123456789012 with your AWS Account ID and your-aws-region with the region you're working in, e.g., us-east-1):

Authenticate Docker to your ECR registry:

aws ecr get-login-password --region your-aws-region | docker login --username AWS --password-stdin 123456789012.dkr.ecr.your-aws-region.amazonaws.com
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Build your Docker image:

docker build -t fargate-math-calculator .
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Tag your image for ECR:

docker tag fargate-math-calculator:latest 123456789012.dkr.ecr.your-aws-region.amazonaws.com/fargate-math-calculator:latest
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Push the image to ECR:

docker push 123456789012.dkr.ecr.your-aws-region.amazonaws.com/fargate-math-calculator:latest
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Now your calculator is packaged and stored safely in AWS!

Part 3: Setting the Stage in AWS - The Infrastructure

With our code ready, we need to set up the AWS environment.

1. S3 Buckets (Our Mailboxes)

Create two S3 buckets in your chosen AWS region. Bucket names must be globally unique.

An input bucket (e.g., my-fargate-math-input-yourname-date).

An output bucket (e.g., my-fargate-math-output-yourname-date).

2. IAM Roles (The Security Guards)

Our services need permissions to interact. We'll create three IAM roles:

A. FargateMathTaskRole (for the code inside the Fargate container):

Go to IAM console -> Roles -> Create role.

Trusted entity: "AWS service," Use case: "Elastic Container Service Task."

Permissions:

AmazonS3FullAccess (For a production app, you'd restrict this to only your input/output buckets).

CloudWatchLogsFullAccess (or a more restrictive policy allowing log creation and writing to a specific log group).

Name it FargateMathTaskRole.

B. MyECSTaskExecutionRole (for Fargate service itself):
This role allows ECS/Fargate to pull images from ECR and write logs. AWS often has a default ecsTaskExecutionRole. If it exists and has the AmazonECSTaskExecutionRolePolicy attached, you can use it. Otherwise, create it:

Trusted entity: "AWS service," Use case: "Elastic Container Service Task."

Permissions: Attach the AWS managed policy AmazonECSTaskExecutionRolePolicy.

Name it MyECSTaskExecutionRole (or note the name of your existing ecsTaskExecutionRole).

C. StepFunctionsFargateMathRole (for the Step Function state machine):
This role allows Step Functions to start Fargate tasks and pass the other roles to it.

Trusted entity: "AWS service," Use case: "Step Functions."

Permissions: Create a new inline policy or a customer-managed policy. Click "Create policy," choose JSON, and paste this (replace YOUR_AWS_ACCOUNT_ID and YOUR_AWS_REGION):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ecs:RunTask",
            "Resource": [
                "arn:aws:ecs:YOUR_AWS_REGION:YOUR_AWS_ACCOUNT_ID:task-definition/fargate-math-task:*",
                "arn:aws:ecs:YOUR_AWS_REGION:YOUR_AWS_ACCOUNT_ID:cluster/*" // To specify cluster on RunTask
            ]
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": [
                "arn:aws:iam::YOUR_AWS_ACCOUNT_ID:role/FargateMathTaskRole",
                "arn:aws:iam::YOUR_AWS_ACCOUNT_ID:role/MyECSTaskExecutionRole" 
                // Ensure these role names match what you created/are using
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecs:StopTask",
                "ecs:DescribeTasks"
            ],
            "Resource": "*" // For .sync integration, it needs to describe any task it started.
        },
        {
            "Effect": "Allow",
            "Action": [
               "events:PutTargets",
               "events:PutRule",
               "events:DescribeRule"
            ],
            "Resource": ["arn:aws:events:YOUR_AWS_REGION:YOUR_AWS_ACCOUNT_ID:rule/StepFunctionsGetEventsForECSTaskRule"]
         }
    ]
}
```

Name this policy something like StepFunctionsFargateMathPolicy and attach it to the role.
Also, attach CloudWatchLogsFullAccess to this role so the Step Function itself can log its execution.

Name the role StepFunctionsFargateMathRole.

3. ECS Cluster (The Playground for Fargate)

An ECS Cluster is a logical grouping of tasks or services.

Go to the ECS console -> "Create cluster."

Cluster name: math-cluster.

Networking: Choose your default VPC and its subnets.

Infrastructure: Select "AWS Fargate (serverless)."

Click "Create."

4. ECS Task Definition (The Blueprint for our Fargate Task)

This tells Fargate exactly how to run our calculator.

In ECS console -> "Task Definitions" -> "Create new task definition."

Task definition family: fargate-math-task.

Launch type: "AWS Fargate."

Operating system/Architecture: Linux/X86_64.

CPU: 0.25 vCPU, Memory: 0.5 GB (smallest, fine for this).

Task role: Select the FargateMathTaskRole you created.

Task execution role: Select the MyECSTaskExecutionRole (or your ecsTaskExecutionRole).

Container details - Click "Add container":

Name: math-calculator-container (this name is referenced in the Step Function).

Image URI: The URI of your ECR image (e.g., 123456789012.dkr.ecr.your-aws-region.amazonaws.com/fargate-math-calculator:latest).

Environment variables: This is important! We'll add placeholders. The Step Function will override these with actual values during runtime.

Key: INPUT_S3_BUCKET, Value: placeholder_input_bucket

Key: INPUT_S3_KEY, Value: placeholder_input_key

Key: OUTPUT_S3_BUCKET, Value: placeholder_output_bucket

Key: OUTPUT_S3_KEY, Value: placeholder_output_key

Key: AWS_REGION, Value: your-aws-region (e.g., us-east-1)

Log collection: Ensure "AWS CloudWatch Logs" is enabled.

Click "Add" for the container, then "Create" for the task definition.

Phew! That's the infrastructure. Now for the conductor!

Part 4: The Conductor - AWS Step Functions

AWS Step Functions lets us define a workflow (a state machine) visually or with JSON.

Create the State Machine

Go to the Step Functions console -> "Create state machine."

Choose "Write your workflow in code."

Type: "Standard."

Definition (paste this JSON, carefully replacing placeholders like YOUR_AWS_ACCOUNT_ID, YOUR_AWS_REGION, your subnet IDs, and ensuring the cluster name math-cluster and task definition family fargate-math-task are correct):

```json
{
  "Comment": "Workflow to run a Fargate task for math calculation f(x) = x^2 + x with retries",
  "StartAt": "RunFargateMathTask",
  "States": {
    "RunFargateMathTask": {
      "Type": "Task",
      "Resource": "arn:aws:states:::ecs:runTask.sync",
      "Parameters": {
        "LaunchType": "FARGATE",
        "Cluster": "arn:aws:ecs:YOUR_AWS_REGION:YOUR_AWS_ACCOUNT_ID:cluster/math-cluster",
        "TaskDefinition": "fargate-math-task", /* Uses the latest active revision */
        "NetworkConfiguration": {
          "AwsvpcConfiguration": {
            "Subnets": [
              "subnet-xxxxxxxxxxxxxxxxx", /* Replace with one of your public Subnet IDs */
              "subnet-yyyyyyyyyyyyyyyyy"  /* Replace with another public Subnet ID in a different AZ for resilience */
            ],
            "AssignPublicIp": "ENABLED" /* Required for Fargate tasks in public subnets to pull images from ECR and access S3 if no NAT Gateway */
          }
        },
        "Overrides": {
          "ContainerOverrides": [
            {
              "Name": "math-calculator-container", /* Must match container name in Task Definition */
              "Environment": [
                { "Name": "INPUT_S3_BUCKET",  "Value.$": "$.inputDetails.bucket" },
                { "Name": "INPUT_S3_KEY",     "Value.$": "$.inputDetails.key" },
                { "Name": "OUTPUT_S3_BUCKET", "Value.$": "$.outputDetails.bucket" },
                { "Name": "OUTPUT_S3_KEY",    "Value.$": "$.outputDetails.key" },
                { "Name": "AWS_REGION",       "Value": "YOUR_AWS_REGION" } /* Hardcode your region or pass it in */
              ]
            }
          ]
        }
      },
      "Retry": [
        {
          "ErrorEquals": [ "States.TaskFailed", "States.Permissions" ], /* Retry if Fargate task fails for any reason or permissions issues */
          "IntervalSeconds": 15,
          "MaxAttempts": 2,       /* 1 initial attempt + 2 retries = 3 total attempts */
          "BackoffRate": 1.5      /* Wait 15s, then 15*1.5=22.5s */
        }
      ],
      "Catch": [
        {
          "ErrorEquals": ["States.ALL"], /* Catch any error not handled by Retry */
          "Next": "CalculationFailedNotification",
          "ResultPath": "$.errorInfo"
        }
      ],
      "Next": "CalculationSucceeded"
    },
    "CalculationSucceeded": {
      "Type": "Succeed",
      "Comment": "The math calculation was successful."
    },
    "CalculationFailedNotification": {
      "Type": "Pass",
      "Result": {
          "status": "FAILED",
          "message": "The math calculation Fargate task failed after retries."
      },
      "ResultPath": "$.notificationPayload",
      "Next": "CalculationFailedFinal"
    },
    "CalculationFailedFinal": {
      "Type": "Fail",
      "Comment": "The math calculation failed after retries.",
      "Error": "CalculationJobFailedError",
      "Cause": "The Fargate task for math calculation failed. Check $.errorInfo and $.notificationPayload for details."
    }
  }
}
```

Key aspects of this definition:

Resource: "arn:aws:states:::ecs:runTask.sync": This tells Step Functions to run an ECS task and wait for it to complete before moving to the next state.

Parameters.Overrides.ContainerOverrides.Environment: This is crucial. We use Value.$: "$.inputDetails.bucket" to take a value from the Step Function's input JSON and pass it as an environment variable to our Fargate container. This makes our workflow dynamic. (I've nested input under inputDetails and outputDetails for better organization of the Step Function input.)

Retry: If the RunFargateMathTask state fails (e.g., our script exits with code 1, or there's an ECS issue), it will retry up to 2 times, with increasing delays.

Catch: If all retries fail, it goes to a failure path. I've added a Pass state CalculationFailedNotification just to show how you might shape a notification payload before a final Fail state.

Click "Next."

State machine name: FargateMathWorkflow.

Permissions: Choose "Choose an existing role" and select the StepFunctionsFargateMathRole you created.

Logging: Configure CloudWatch Logs (recommended).

Click "Create state machine."

Let's Run It! (The Grand Finale)

Time to see our creation in action!

1. Prepare Input Data in S3

Create a JSON file named data-for-5.json on your computer:
```
{
  "x": 5
}
```

Upload this file to your S3 input bucket. For example, you might upload it as input/data-for-5.json. So, the S3 key would be input/data-for-5.json.

2. Manually Start the Step Function

In the Step Functions console, select your FargateMathWorkflow.

Click "Start execution."

In the "Input - optional" box, paste the following JSON. Replace with your actual S3 bucket names, the input key you just uploaded, and desired output key.

```json
{
  "inputDetails": {
    "bucket": "my-fargate-math-input-yourname-date",
    "key": "input/data-for-5.json"
  },
  "outputDetails": {
    "bucket": "my-fargate-math-output-yourname-date",
    "key": "output/result-for-5.json"
  }
}
```

Click "Start execution."

3. Monitor and Check Results

Step Function Graph: You'll see the execution progress. The RunFargateMathTask state will turn blue while running, then green for success or red for failure.

ECS Task Logs: If you click on the RunFargateMathTask step in the graph, then the "Details" tab, you'll find a link to the ECS Task under "Resource." Click this, then go to the "Logs" tab for that task. Here you'll see all the console.log messages from your index.ts script! This is invaluable for debugging.

S3 Output: If the Step Function completes successfully (all green), navigate to your S3 output bucket. You should find the file output/result-for-5.json (or whatever output key you specified). Download it. It should contain:

```json
{
  "input_x": 5,
  "function_expression": "f(x) = x^2 + x",
  "result_fx": 30, // Because 5*5 + 5 = 25 + 5 = 30
  "calculatedAt": "..."
}
```

Success! Our cloud calculator worked! For 
𝑥
=
5
x=5
, 
𝑓
(
5
)
=
5
2
+
5
=
25
+
5
=
30
f(5)=5
2
+5=25+5=30
.

Testing the Resilience: What if Things Go Wrong?

Let's see those retries in action.

Start a new execution of the Step Function.

This time, in the input JSON, provide an inputDetails.key that doesn't exist in your S3 input bucket (e.g., input/nonexistent-file.json).

Observe the Step Function execution. The RunFargateMathTask will likely fail. You should see it turn red, then go back to blue/orange as it retries. Check the "Events" tab for details on each attempt.

After the configured retries, it should follow the Catch path and end in the CalculationFailedFinal state.

Check the Fargate task logs in CloudWatch for the failed attempts. You'll see errors from our script (e.g., "S3 object not found" or "NoSuchKey").

This demonstrates the resilience built into our workflow thanks to Step Functions!

Conclusion

We've successfully built a serverless system on AWS to execute a TypeScript function inside a Fargate container, orchestrated by a Step Function! Our system takes input from S3, performs a calculation 
𝑓
(
𝑥
)
=
𝑥
2
+
𝑥
f(x)=x
2
+x
, writes the output back to S3, and even retries automatically in case of failures.

This pattern is incredibly powerful. You can adapt it for:

More complex mathematical modeling or data processing tasks.

Image or video processing.

Running batch jobs.

Integrating machine learning inference endpoints.

Potential Next Steps:

Automated Triggers: Instead of manual execution, trigger the Step Function automatically when a new file is uploaded to the S3 input bucket (using S3 Event Notifications and possibly an AWS Lambda function or EventBridge).

Notifications: Add an AWS SNS (Simple Notification Service) topic to send email or SMS notifications on success or failure.

CI/CD: Set up a CI/CD pipeline (e.g., using AWS CodePipeline, GitHub Actions) to automatically build your Docker image and update your Fargate task definition whenever you push changes to your TypeScript code.

Parameter Store/Secrets Manager: For more sensitive configuration than S3 bucket names, use AWS Systems Manager Parameter Store or AWS Secrets Manager.

The combination of Fargate's serverless container execution and Step Functions' orchestration capabilities opens up a vast range of possibilities for building robust and scalable applications on AWS. Happy building!

Further Reading

AWS Step Functions Developer Guide

AWS Fargate User Guide

AWS SDK for JavaScript v3 - S3 Client

Dockerizing a Node.js web app (General Docker concepts)
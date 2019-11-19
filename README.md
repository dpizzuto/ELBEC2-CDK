# EC2 - ELB deploy using Cloud Development Kit (CDK)
The following experiment aims to show some feature of  [Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/home.html). 
Typescript is used for the example while CDK, at the date, supports: Python, JavaScript, .NET and Java. 

# Goal
Deploy Two EC2 within a private subnet of a VPC, served by a ELB.

# What you need
* Your fav IDE
* Node.js 
* cdk 
* AWS Account *(if you want to deploy your stack)
* aws-cli (configured with a role that allows to run CloudFormation stack and create resources)

# Getting started
[Here](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) you can find the start guide to CDK.
In case you want to start from scratch, you have to initialize a new cdk project in your favourite directory, trhough:

`cdk init --language typescript`

# Generate CloudFormation from Source Code
Once you write your code following the CDK API Reference, you can generate your CloudFormation stack through a simple command:

`npm run build`

and then 

`cdk synth`

In particular the last command will produce the CloudFormation JSON within ~/youp-roject/cdk.out/prjName.template.json

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy `      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

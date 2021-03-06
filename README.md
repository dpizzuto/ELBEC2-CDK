# EC2 - ELB deploy using Cloud Development Kit (CDK)
The following experiment aims to show some feature of  [Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/home.html). 
Typescript is used for the example while CDK, at the date, also supports: Python, JavaScript, .NET and Java. 

<img src="https://docs.aws.amazon.com/cdk/latest/guide/images/AppStacks.png" width="70%" display="block" margin-left="auto" margin-right="auto" />


# Goal
Deploy three EC2 within private subnets of a VPC, served by a ELB as shown below. 
<img src="./resources/high-level-architecture_v3.png" width="70%" display="block" margin-left="auto" margin-right="auto" />

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

# Note
If you want to use all AZs within a region to create High Available and Fault Tolerant application, you have to specify Region and Account in **bin/elb-ec2-monitoring.ts** file. 
Here the example:

```Typescript
new ElbEc2MonitoringStack(app, 'ElbEc2MonitoringStack',{
    env:{
        region: "XXX", //example: eu-west-1
        account: "YYY",//Insert your account here, if you want a correct Subnet creation per each AZ in the region
    }
});
```

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy `      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

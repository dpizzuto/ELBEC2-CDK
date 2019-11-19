import cdk = require('@aws-cdk/core');
import s3 = require("@aws-cdk/aws-s3");
import ec2 = require("@aws-cdk/aws-ec2");
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
import { InstanceType, UserData, SubnetType } from '@aws-cdk/aws-ec2';
import { Stack } from '@aws-cdk/core';

export class ElbEc2MonitoringStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    //Create a VPC
    const vpc = new ec2.Vpc(this, 'ELBEC2_VPC',{
      maxAzs: 3
    });
    
    // define user data for EC2 instance: it will install HTTPD and setup a simple index.html 
    const ud = UserData.forLinux();
    ud.addCommands(
      "mkdir -p /var/www/html",
      "yum update -y",
      "yum install -y httpd",
      "usermod -a -G apache ec2-user",
      "chown -R ec2-user:apache /var/www",
      "chmod 2775 /var/www",
      "echo \"<html> <p>Hello from Your AWSome EC2 - ElbEc2MonitoringStack</p></html>\" > /var/www/html/index.html",
      "service httpd start");

      //Define a Security Group for EC2
      const sg = new ec2.SecurityGroup(this, "ELBEC2_ec2-SG",{
        vpc,
        allowAllOutbound: true,
      })
      
      const vpcPrivateSubnetSelection = vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE
     });

      // Define Instance 1 
      const instance1 = new ec2.Instance(this, "myEc2Elb_1",{
        vpc,
        instanceType: new InstanceType("t2.micro"),
        machineImage: new ec2.AmazonLinuxImage(),
        keyName: "kp-ec2-cloudwatch",
        userData: ud,
        securityGroup: sg,
        //WARNING -> Not a great way and recommended way to do things, just as experiment
        availabilityZone: vpcPrivateSubnetSelection.availabilityZones[0], 
      });
      instance1.instance.tags.setTag("Region",Stack.of(this).region);

      // Define Instance 2
      const instance2 = new ec2.Instance(this, "myEc2Elb_2",{
        vpc,
        instanceType: new InstanceType("t2.micro"),
        machineImage: new ec2.AmazonLinuxImage(),
        keyName: "kp-ec2-cloudwatch",
        userData: ud,
        securityGroup: sg,
        //WARNING -> Not a great way and recommended way to do things, just as experiment
        availabilityZone: vpcPrivateSubnetSelection.availabilityZones[1], //NTH
      });
      instance2.instance.tags.setTag("Region",Stack.of(this).region);

      //Define a Load Balancer and listener
      const loadBalancer = new elbv2.ApplicationLoadBalancer(this, "LoadBalancer", {
        vpc,
        internetFacing: true
      });
      const lbListener = loadBalancer.addListener("listener",{
        port: 80,
        open: true
      });
      
      //Allow Incoming traffic from Security Group of Load Balancer on EC2
      sg.connections.allowFrom(lbListener.connections, ec2.Port.allTraffic());

      //Setup Load Balancer Targets
      const instTarget1 = new elbv2.InstanceTarget(instance1.instanceId,80);
      const instTarget2 = new elbv2.InstanceTarget(instance2.instanceId,80);
      lbListener.addTargets("",{
        port: 80,
        targets:[instTarget1, instTarget2]
      })

      //Define Load Balancer's Security Group
      const lbSg = new ec2.SecurityGroup(this, "ELBEC2_elb-SG",{
        vpc,
        allowAllOutbound: true
      })
      lbSg.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.allTraffic());
      lbListener.connections.addSecurityGroup(lbSg);
  }
}

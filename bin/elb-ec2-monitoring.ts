#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ElbEc2MonitoringStack } from '../lib/elb-ec2-monitoring-stack';

const app = new cdk.App();
new ElbEc2MonitoringStack(app, 'ElbEc2MonitoringStack',{
    env:{
        region: "eu-west-1",
        account: "XXXXXX",//Insert your account here, if you want a correct Subnet creation per each AZ in the region
    }
});

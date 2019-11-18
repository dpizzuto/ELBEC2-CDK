#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ElbEc2MonitoringStack } from '../lib/elb-ec2-monitoring-stack';

const app = new cdk.App();
new ElbEc2MonitoringStack(app, 'ElbEc2MonitoringStack');

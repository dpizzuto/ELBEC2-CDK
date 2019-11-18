import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import ElbEc2Monitoring = require('../lib/elb-ec2-monitoring-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ElbEc2Monitoring.ElbEc2MonitoringStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
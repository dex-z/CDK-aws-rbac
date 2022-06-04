import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class CdkAwsRbacStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Admin User and group
    const adminRole = new iam.Role(this, 'admin', {
      assumedBy: new iam.AnyPrincipal(),
      description: 'Admin role',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AdministratorAccess',
        ),
      ]
    });  

    const adminGroup = new iam.Group(this, 'adminGroup', {
      groupName: 'AdminGroup',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AdministratorAccess', 
        ),
      ]
    });
    //adminGroup.addUser(adminUser);

    const adminUser = new iam.User(this, 'adminUser', {
      // id: 'adminUser',
      // password: secretsmanager.Secret.fromSecretAttributes
      // groups: adminGroup,
    });
    adminUser.addToGroup(adminGroup);

    //Power User    
    const poweruserGroup = new iam.Group(this, 'poweruserGroup', {
      groupName: 'PowerUserGroup',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'PowerUserAccess',
        ),
      ],
    });

    poweruserGroup?.attachInlinePolicy(new iam.Policy(this, 'poweruserPolicy', {
      statements: [new iam.PolicyStatement({
        notActions: [
          'cloudtrail:Delete*',
          'cloudtrail:Stop*',
          'cloudtrail:Update*',
          'cloudtrail:Put*',
          'iam:AddUserToGroup',
          'iam:AttachUserPolicy',
          'iam:ChangePassword',
          'iam:CreateAccountAlias',
          'iam:CreateGroup',
          'iam:CreateInstanceProfile',
          'iam:CreateLoginProfile',
          'iam:CreateOpenIDConnectProvider',
          'iam:CreateSAMLProvider',
          'iam:CreateServiceLinkedRole',
          'iam:CreateServiceSpecificCredenial',
          'iam:CreateUser',
          'iam:DeleteAccountAlias',
          'iam:DeleteAccountPasswordPolicy',
          'iam:DeleteSAMLProvider',
          'iam:DeleteUser',
          'iam:PassRole',
          'iam:PutGroupPolicy',
          'iam:PutRolePermissionsBoundary',
          'iam:PutRolePolicy',
          'iam:PutUserPermissionsBoundary',
          'iam:PutUserPolicy',
          'iam:UpdateAccountPasswordPolicy',
          'iam:UpdateAssumeRolePolicy',
          'iam:UpdateLoginProfile',
          'iam:UpdateRole',
          'iam:UpdateSAMLProvider',
          //add s3 bucket arn
          's3:DeleteObject',
        ],
        resources: ['*'],
      })],
    }));

    const powerUser = new iam.User(this, 'powerUser', {
      // id: 'adminUser',
      // password: secretsmanager.Secret.fromSecretAttributes
      // groups: adminGroup,
    });
    powerUser.addToGroup(poweruserGroup);

    // //Developer

    const developerGroup = new iam.Group(this, 'developerGroup', {
      groupName: 'developerGroup',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonEC2FullAccess'
        ),
      ]
    });
    //adminGroup.addUser(adminUser);

    const developerUser = new iam.User(this, 'developerUser', {
      // id: 'adminUser',
      // password: secretsmanager.Secret.fromSecretAttributes
      // groups: adminGroup,
    });
    developerUser.addToGroup(developerGroup);

    // //Readonly
    // //Admin User and group
    // const readonlyRole = new iam.Role(this, 'readonly', {
    //   assumedBy: new iam.AnyPrincipal(),
    //   description: 'Readonly role',
    //   managedPolicies: [
    //     iam.ManagedPolicy.fromAwsManagedPolicyName(
    //       'AdministratorAccess',
    //     ),
    //   ]
    // });

    const readonlyGroup = new iam.Group(this, 'readonlyGroup', {
      groupName: 'ReadonlyGroup',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'ReadOnlyAccess',
        ),
      ]
    });
    // adminGroup.addUser(adminUser);

    const readonlyUser = new iam.User(this, 'readonlyUser', {
      // id: 'adminUser',
      // password: secretsmanager.Secret.fromSecretAttributes
      // groups: adminGroup,
    });
    readonlyUser.addToGroup(readonlyGroup);

  }
}

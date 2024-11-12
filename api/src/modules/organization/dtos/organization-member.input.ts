import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationMemberInput {
  @Field(() => ID)
  public profileId: string;

  @Field(() => ID)
  public organizationId: string;

  @Field({ defaultValue: false })
  public isAdmin: boolean;
}

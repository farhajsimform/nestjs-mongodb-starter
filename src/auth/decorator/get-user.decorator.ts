import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//Custom decorator
interface IRequest extends Express.Request {
  user: any;
}
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: IRequest = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);

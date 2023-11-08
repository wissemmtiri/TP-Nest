import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = await this.extractToken(request);
        if (!token) {
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.SECRET_KEY
                }
            )
            const UserId = payload["UserId"];
            request["UserId"] = UserId;
        } catch {
            throw new HttpException(
                'Access Not Authorized!',
                HttpStatus.UNAUTHORIZED
            )
        }
        return true;
    }

    async extractToken(request: Request): Promise<string | undefined> {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
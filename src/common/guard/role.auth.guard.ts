import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 在这里取metadata中的no-auth，得到的会是一个bool
        const noAuthMethod = this.reflector.get<boolean>('no-auth', context.getHandler());
        const noAuthClass = this.reflector.get<boolean>('no-auth', context.getClass());

        console.log('noAuthClass :' + noAuthClass + ', noAuthMethod: ' + noAuthMethod);

        const guard = RoleAuthGuard.getAuthGuard(noAuthClass || noAuthMethod);

        // 执行所选策略Guard的canActivate方法
        return guard.canActivate(context);
    }

    // 根据NoAuth的t/f选择合适的策略Guard
    private static getAuthGuard(noAuth: boolean): IAuthGuard {
        if (noAuth) {
            return new (AuthGuard('local'))();
        } else {
            return new (AuthGuard('jwt'))();
        }
    }
}
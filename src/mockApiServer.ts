// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Response } from 'miragejs';
import ApiUrls from '@/config/apiUrls';
import { Users } from '@/mock/users';
import { LoginRequest, LoginResponse, User } from '@/types/Auth';
import { ErrorDescripion } from '@/api/base/types';

function startMockServer() {
  createServer({
    seeds(server) {
      server.db.createCollection('users', Users);
    },
    routes() {
      this.post(ApiUrls.LoginUrl, (schema, request) => {
        const loginReq = JSON.parse(request.requestBody) as LoginRequest;
        const matchingUsers = schema.db.users.where(
          (x: any) => x.name === loginReq.username && x.password === window.btoa(loginReq.password)
        );

        if (matchingUsers && matchingUsers.length > 0) {
          const userObj = matchingUsers[0];
          const userDto: User = {
            id: userObj.id,
            name: userObj.name,
            displayName: userObj.displayName,
            roles: userObj.roles,
          };

          const loginResponse: LoginResponse = { accesstoken: window.btoa(JSON.stringify(userDto)), user: userDto };
          return new Response(200, {}, loginResponse);
        }
        const errorDescription: ErrorDescripion = {
          errorCode: '401 - Unauthorized',
          errorMessage: 'Username or Password is invalid',
        };
        return new Response(401, {}, errorDescription);
      });
    },
  });
}

export default startMockServer;

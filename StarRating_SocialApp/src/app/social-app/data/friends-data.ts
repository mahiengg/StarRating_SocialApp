import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  getStatusText,
  InMemoryDbService,
  ResponseOptions,
  STATUS,
  RequestInfo,
} from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Friend } from "../types/friend";
import data from "./data.json";

@Injectable({
  providedIn: "root",
})
export class FriendsData implements InMemoryDbService {
  createDb() {
    const friends: Friend[] = [];
    data.forEach((friend) => {
      friends.push({
        ...friend,
      });
    });
    return { friends };
  }
  patch(requestInfo: RequestInfo): Observable<Response> {
    const currentFriends = requestInfo.collection as Friend[];

    //currentFriends get undefined so find method is not working so i added ? to check it. 
    const foundFriend = currentFriends?.find(
      (friend) => friend.id === requestInfo.id
    );

    if (!foundFriend || requestInfo.url.includes("not_found")) {
      return requestInfo.utils.createResponse$(() => {
        return {
          url: requestInfo.url,
          body: `server error at ${requestInfo.url}`,
          status: STATUS.BAD_REQUEST,
          statusText: getStatusText(STATUS.BAD_REQUEST),
        };
      });
    }

    const reqBody = (requestInfo.req as any).body;
    const propertyUpdates: any = {};
    if (reqBody.name) {
      propertyUpdates.name = reqBody.name;
      foundFriend.name = reqBody.name;
    }
    if (reqBody.likeCount) {
      propertyUpdates.likeCount = reqBody.likeCount;
      foundFriend.likeCount = reqBody.likeCount;
    }
    const responseOptions: ResponseOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      url: requestInfo.url,
      body: reqBody,
      status: STATUS.OK,
      statusText: getStatusText(STATUS.OK),
    };
    return requestInfo.utils.createResponse$(() => responseOptions);
  }
}

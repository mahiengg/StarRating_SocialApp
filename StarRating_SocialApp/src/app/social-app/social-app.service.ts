import { Inject, Injectable, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Friend } from "./types/friend";
import data from "./data/data.json";

@Injectable()
export class SocialAppService {
  private friendsURL = this.simulateLoadError
    ? "api/friends_not_found"
    : "api/friends";
  private friendsUpdateURL = this.simulateUpdateError
    ? "api/friends_not_found"
    : "api/friends";

  constructor(
    private httpClient: HttpClient,
    @Inject("simulateLoadError")
    @Optional()
    private simulateLoadError: boolean,
    @Inject("simulateUpdateError")
    @Optional()
    private simulateUpdateError: boolean
  ) {}

  public getFriends() {
    return this.httpClient.get<Friend[]>(this.friendsURL);
  }

  public addFriendLike(id: number) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.friendsUpdateURL}/${id}`;

    // in a production environment, this would be handled in the back end and would actually increment properly with locks
    const newLikeCount = this.getNewLikeCount(id);

    return this.httpClient.patch<Friend>(
      url,
      { likeCount: newLikeCount },
      { headers }
    );
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getNewLikeCount(id: number) {
    const currentFriend = data.find((friend) => friend.id === id);
    if (!currentFriend) {
      throw new Error(`invalid friend id of ${id}`);
    }
    // adding the base like count to ensure it is always different from initial load
    // also min is 15 so that the first like will always be the highest number in list
    const newLikeCount = this.getRandomInt(15, 50) + currentFriend.likeCount;
    return newLikeCount;
  }
}

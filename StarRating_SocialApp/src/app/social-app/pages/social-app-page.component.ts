import { Component, SimpleChanges } from "@angular/core";
import data from "../data/data.json";
import { SocialAppService } from "../social-app.service";
import { Friend } from "../types/friend";

@Component({
  selector: "app-social-app-page",
  templateUrl: "./social-app-page.component.html",
  styleUrls: ["./social-app-page.component.css"],
})
export class SocialAppPageComponent {
  constructor(private socialAppService: SocialAppService) {}

  public friends: Friend[];
  likeError: boolean = false;
  fetchingData: boolean = false;

  ngOnInit() {
    this.likeError = false;
    setTimeout(
      () =>
        this.socialAppService.getFriends().subscribe({
          next: (res) => {
            this.fetchingData = false;
            this.friends = this.sortUsersByLikeCount(res);
          },
          error: () => {
            this.fetchingData = true;
          },
        }),
      1000
    );
  }

  addFriendLike(id: number): void {
    this.socialAppService.addFriendLike(id).subscribe({
      next: (res) => {
        this.likeError = false;
        const newLikedFriend = res;

        this.friends.find((friend) => {
          if (friend.id === id) {
            friend.likeCount = newLikedFriend["likeCount"];
          }
        });
        //this change will trigger the ngOnChanges(changes:SimpleChanges) of child
        //Depends on Requirement we add the functionality in ngOnChanges of child
        this.friends = [...this.sortUsersByLikeCount(this.friends)];
      },
      error: () => {
        this.likeError = true;
      },
    });
  }

  sortUsersByLikeCount(friend: Friend[]) {
    return friend.sort((a, b) =>
      a.likeCount === b.likeCount ? -1 : b.likeCount - a.likeCount
    );
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Friend } from "../../types/friend";

@Component({
  selector: "app-friend-list",
  templateUrl: "./friend-list.component.html",
  styleUrls: ["./friend-list.component.css"],
})
export class FriendListComponent {
  @Input() friends: Friend[];

  @Output() likedId = new EventEmitter<number>();
  likeButton: boolean;

  likeFriend(friend: any) {
    this.likeButton = true;
    this.likedId.emit(friend.id);
  }

  //trackBy is a Angular 8 directive that we can use optionally with ngFor.
  //So that the Angular to detect the specific node element that needs to change or be added instead of rebuilding the whole array.
  trackByLikeCount(index: number, friend: any) {
    return friend.likeCount;
  }
}

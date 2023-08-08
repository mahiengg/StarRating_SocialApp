import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { By } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DebugElement } from "@angular/core";
import { SocialAppPageComponent } from "./social-app-page.component";
import { FriendsData } from "../data/friends-data";
import { FriendListComponent } from "../components/friend-list/friend-list.component";
import { SocialAppService } from "../social-app.service";
import data from "../data/data.json";

describe("SocialAppPageComponent", () => {
  let component: SocialAppPageComponent;
  let fixture: ComponentFixture<SocialAppPageComponent>;
  let compiledComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FriendsData, {
          dataEncapsulation: false,
          delay: 0,
        }),
        CommonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      declarations: [SocialAppPageComponent, FriendListComponent],
      providers: [
        { provide: "simulateLoadError", useValue: false },
        { provide: "simulateUpdateError", useValue: false },
        SocialAppService,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SocialAppPageComponent);
    component = fixture.componentInstance;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it("SocialAppPage Component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("SocialAppPage component renders data from API call correctly", () => {
    const liTags = compiledComponent.queryAll(By.css("li"));
    const spanTags = compiledComponent.queryAll(By.css("span"));
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(liTags.length).toBe(5);
    expect(spanTags.length).toBe(5);
    expect(buttonTags.length).toBe(5);
  });

  it("SocialAppPage component renders data in correct order", () => {
    const spanTags = compiledComponent.queryAll(By.css("span"));
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(buttonTags[0].nativeElement.textContent.trim()).toBe(
      `Like ${data[0].likeCount}`
    );
    expect(spanTags[0].nativeElement.textContent.trim()).toBe(
      `${data[0].name}`
    );
    expect(buttonTags[1].nativeElement.textContent.trim()).toBe(
      `Like ${data[2].likeCount}`
    );
    expect(spanTags[1].nativeElement.textContent.trim()).toBe(
      `${data[2].name}`
    );
    expect(buttonTags[2].nativeElement.textContent.trim()).toBe(
      `Like ${data[4].likeCount}`
    );
    expect(spanTags[2].nativeElement.textContent.trim()).toBe(
      `${data[4].name}`
    );
  });

  it("SocialAppPage component updates like after addFriendLike is called", () => {
    component.addFriendLike(1);
    fixture.detectChanges();
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    const previousLike = `Like ${data[0].likeCount}`;
    const newLike = buttonTags[0].nativeElement.textContent.trim();
    const doesMatch = previousLike === newLike;
    expect(doesMatch).toEqual(false);
  });

  it("SocialAppPage component updates like order addFriendLike is called", () => {
    component.addFriendLike(3);
    fixture.detectChanges();
    const spanTags = compiledComponent.queryAll(By.css("span"));
    const firstPerson = spanTags[0].nativeElement.textContent.trim();
    expect(firstPerson).toEqual(data[2].name);
  });

  it("SocialAppPage component renders page with all like buttons enabled", () => {
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(buttonTags[0].nativeElement.disabled).toBeFalsy();
  });

  it("SocialAppPage component updates like button to disabled after clicked", () => {
    component.addFriendLike(1);
    fixture.detectChanges();
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    console.log("ffff",buttonTags);
    expect(buttonTags[0].nativeElement.disabled).toBeTruthy();
  });

  it("SocialAppPage component does not show error message if there is no error", () => {
    const errorMessage = compiledComponent.query(
      By.css(".error")
    )?.nativeElement;
    expect(errorMessage).toBeFalsy();
  });
});

describe("SocialAppPageComponent Loading Errors", () => {
  let component: SocialAppPageComponent;
  let fixture: ComponentFixture<SocialAppPageComponent>;
  let compiledComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FriendsData, {
          dataEncapsulation: false,
          delay: 0,
        }),
        CommonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      declarations: [SocialAppPageComponent, FriendListComponent],
      providers: [
        { provide: "simulateLoadError", useValue: true },
        { provide: "simulateUpdateError", useValue: false },
        SocialAppService,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SocialAppPageComponent);
    component = fixture.componentInstance;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it("SocialAppPage Component should be created even when loading error happens", () => {
    expect(component).toBeTruthy();
  });

  it("SocialAppPage component shows error message if loading error occurs", () => {
    const errorMessage = compiledComponent.query(
      By.css(".error")
    ).nativeElement;
    expect(errorMessage?.textContent).toBe("Fetching friends has failed");
  });

  it("SocialAppPage component does not display friends if loading error occurs", () => {
    const liTags = compiledComponent.queryAll(By.css("li"));
    const spanTags = compiledComponent.queryAll(By.css("span"));
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(liTags.length).toBe(0);
    expect(spanTags.length).toBe(0);
    expect(buttonTags.length).toBe(0);
  });
});

describe("SocialAppPageComponent Like Button Errors", () => {
  let component: SocialAppPageComponent;
  let fixture: ComponentFixture<SocialAppPageComponent>;
  let compiledComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FriendsData, {
          dataEncapsulation: false,
          delay: 0,
        }),
        CommonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      declarations: [SocialAppPageComponent, FriendListComponent],
      providers: [
        { provide: "simulateLoadError", useValue: false },
        { provide: "simulateUpdateError", useValue: true },
        SocialAppService,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SocialAppPageComponent);
    component = fixture.componentInstance;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it("SocialAppPage component shows error message if error occurs when 'addFriendLike' method is called", () => {
    component.addFriendLike(3);
    fixture.detectChanges();
    const errorMessage = compiledComponent.query(
      By.css(".error")
    ).nativeElement;
    expect(errorMessage?.textContent).toBe("Liking friend has failed");
  });

  it("SocialAppPage component does not update like button to disabled when error occurs on 'addFriendLike' method", () => {
    component.addFriendLike(1);
    fixture.detectChanges();
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(buttonTags[0].nativeElement.disabled).toBeFalsy();
  });
});

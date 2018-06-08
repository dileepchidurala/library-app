import { Component } from "@angular/core";
import { Router } from "@angular/router";

//for svgicon
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      "teradata",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/teradata.svg")
    );
  }
  title = "app";
  routes = [
    "Home",
    "Books",
    "AddBooks",
    "Remove Book",
    "Reinstate",
    "Feedback"
  ];
}

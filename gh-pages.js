import { publish } from "gh-pages";

publish(
  "build",
  {
    branch: "gh-pages",
    repo: "https://github.com/lverno/aruco-web.git",
    user: {
      name: "lverno",
      email: "lverno321@gmail.com",
    },
    dotfiles: true,
  },
  () => {
    console.log("Deploy complete!");
  },
);

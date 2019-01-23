workflow "Build and Lint on push" {
  on = "push"
  resolves = [
    "docker://node:10",
    "Build",
  ]
}

action "Install" {
  uses = "docker://node:10"
  args = "yarn install"
}

action "Build" {
  uses = "docker://node:10"
  needs = ["Install"]
  args = "yarn build"
}

action "docker://node:10" {
  uses = "docker://node:10"
  needs = ["Install"]
  args = "yarn lint"
}

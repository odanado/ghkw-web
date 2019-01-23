workflow "Build and Lint on push" {
  on = "push"
  resolves = ["Lint"]
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

action "Lint" {
  uses = "docker://node:10"
  needs = ["Build"]
  args = "yarn lint"
}

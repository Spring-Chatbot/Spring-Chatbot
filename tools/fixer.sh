#!/bin/sh

[ "$(basename "$(pwd)")" = "tools" ] && echo "Run in root of project" && exit

npx eslint "src/**" --fix

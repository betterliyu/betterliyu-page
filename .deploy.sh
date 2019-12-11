  #!/bin/bash 
  git config --global user.email "liyu@betterliyu.site"
  git config --global user.name "betterliyu" 
  mkdir ./publish 
  cd ./publish
  git init 
  git remote add origin https://betterliyu:$1@github.com/betterliyu/betterliyu.github.io.git
  git fetch origin
  git checkout -b master origin/master
  cd ..
  find ./publish/ | grep -v .git | grep -v . | grep -v .. | xargs rm -rf
  echo "copy dist to publish..." 
  cp -r ./dist/. ./publish
  cd ./publish
  if [ -z "$(git status --porcelain)" ] then
      echo "nothing to update."
  else
      git add .
      git commit -m "Update `date -u +'%Y-%m-%dT%H:%M:%SZ'`" -a
      git push origin master -f
  fi
  exit 0
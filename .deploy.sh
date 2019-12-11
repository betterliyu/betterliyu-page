#!/bin/bash 
# ./.deploy.sh remote_url remote_branch
author="$1"
email="$2"
remote_url="$3"
remote_branch="$4"
cname="$5"
echo "author: $author"
echo "email: $email"
echo "dest repo: $remote_url"
echo "dest branch: $remote_branch"
echo "site: $cname"
git config --global user.email $email
git config --global user.name $author
mkdir ./.publish 
cd ./.publish
git init 
git remote add origin $remote_url
git fetch origin
git checkout -b $remote_branch origin/$remote_branch
cd ..
echo "clear publish folder..."
find ./.publish/ | grep -v .git | grep -v . | grep -v .. | xargs rm -rf
echo "copy dist to publish..." 
cp -r ./dist/. ./.publish
cd ./.publish
echo "create CNAME..." 
rm -f CNAME
echo "$5" > CNAME 
git status
if [ -z "$(git status --porcelain)" ] 
then
    echo "nothing to update."
else
    git add .
    git commit -m "Update `date -u +'%Y-%m-%dT%H:%M:%S.%3NZ'`" -a
    git push origin $remote_branch -f
fi
exit 0

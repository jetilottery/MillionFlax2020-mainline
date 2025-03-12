#!/usr/bin/env bash
echo --copying skin files for $1---
cp -f ./src/colours/splash/$1/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/desktop/splash/LoaderTitlePortrait.png;
cp -f ./src/colours/splash/$1/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/desktop/splash/LoaderTitleLandscape.png;
cp -f ./src/colours/splash/$1/backgroundFill.jpg ./src/main/webapp/assetPacks/desktop/images/backgroundFill.jpg;

cp -f ./src/colours/splash/$1/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/mobile/splash/LoaderTitlePortrait.png;
cp -f ./src/colours/splash/$1/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/mobile/splash/LoaderTitleLandscape.png;
cp -f ./src/colours/splash/$1/backgroundFill.jpg ./src/main/webapp/assetPacks/mobile/images/backgroundFill.jpg;

cp -f ./src/colours/splash/$1/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/tablet/splash/LoaderTitlePortrait.png;
cp -f ./src/colours/splash/$1/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/tablet/splash/LoaderTitleLandscape.png;
cp -f ./src/colours/splash/$1/backgroundFill.jpg ./src/main/webapp/assetPacks/tablet/images/backgroundFill.jpg;

cp -f ./src/colours/splash/$1/splash.html ./src/main/webapp/splash.html;

cp -af ./src/colours/bitmapFonts/$1/. ./src/main/webapp/assetPacks/
cp -af ./src/colours/sprites/$1/. ./src/main/webapp/assetPacks

cp -af ./src/colours/infoPage/$1/. ./src/main/js/game/components/infoPage/

cp -af ./src/colours/custom/$1/. ./src/main/js/game/custom/

cp -af ./src/colours/pom/$1/. ./

cp -af ./src/colours/gameMetainfo/$1/gameMetainfo.json ./src/main/webapp/gameMetainfo.json
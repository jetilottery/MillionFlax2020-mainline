#!/usr/bin/env bash
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch0" ./ch0/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch1" ./ch1/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch2" ./ch2/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch3" ./ch3/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch4" ./ch4/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch5" ./ch5/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch6" ./ch6/*.wav;
audiosprite -f "howler" -e "webm,mp3,ogg", -o "ch10" ./ch10/*.wav;
rm -f ../main/webapp/assetPacks/desktop/sounds/*.json
rm -f ../main/webapp/assetPacks/desktop/sounds/*.mp3
rm -f ../main/webapp/assetPacks/desktop/sounds/*.ogg
rm -f ../main/webapp/assetPacks/desktop/sounds/*.webm
rm -f ../main/webapp/assetPacks/mobile/sounds/*.json
rm -f ../main/webapp/assetPacks/mobile/sounds/*.mp3
rm -f ../main/webapp/assetPacks/mobile/sounds/*.ogg
rm -f ../main/webapp/assetPacks/mobile/sounds/*.webm
rm -f ../main/webapp/assetPacks/tablet/sounds/*.json
rm -f ../main/webapp/assetPacks/tablet/sounds/*.mp3
rm -f ../main/webapp/assetPacks/tablet/sounds/*.ogg
rm -f ../main/webapp/assetPacks/tablet/sounds/*.webm
cp ./*.json ../main/webapp/assetPacks/desktop/sounds/
cp ./*.mp3 ../main/webapp/assetPacks/desktop/sounds/
cp ./*.ogg ../main/webapp/assetPacks/desktop/sounds/
cp ./*.webm ../main/webapp/assetPacks/desktop/sounds/
cp ./*.json ../main/webapp/assetPacks/mobile/sounds/
cp ./*.mp3 ../main/webapp/assetPacks/mobile/sounds/
cp ./*.ogg ../main/webapp/assetPacks/mobile/sounds/
cp ./*.webm ../main/webapp/assetPacks/mobile/sounds/
cp ./*.json ../main/webapp/assetPacks/tablet/sounds/
cp ./*.mp3 ../main/webapp/assetPacks/tablet/sounds/
cp ./*.ogg ../main/webapp/assetPacks/tablet/sounds/
cp ./*.webm ../main/webapp/assetPacks/tablet/sounds/
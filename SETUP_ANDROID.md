# Buildar para o android:

- rode os comandos para instalar os requirimentos e buildar no android a partir do linux com o cordova 12

```

//cordova platform rm android && cordova platform add android <- rode na pasta do cordova para remover e adicionar novamente o android.
// keystore está localizada no /home/inovia/Documents/projects/controleonline/controle-online/src-pwa/
sudo su
export ANDROID_HOME=/home/inovia/Android/Sdk/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools/

export PATH=${PATH}:/opt/gradle/gradle-7.2/bin/gradle
alias gradle=/opt/gradle/gradle-7.2/bin/gradle
export GRADLE_PATH=/opt/gradle/gradle-7.2/bin/gradle
[root@inovia src-cordova]# export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https\://services.gradle.org/distributions/gradle-7.2-all.zip"

yay -Sy jre11-openjdk
sudo archlinux-java set java-11-openjdk

source ~/.bashrc
//javac -version <-- em caso de erros cheque se o javac está instalado

//sudo npx quasar build -m android
//or
sudo npx quasar build -m android -- -- --packageType=apk
//para gerar apk: npx quasar build -m android -- -- --packageType=apk

export PWD=/home/inovia/Documents/projects/controleonline/controle-online/pwd

jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "$PWD/keystore/controleonline.keystore" "$PWD/app-release-unsigned.apk" "controleonline-alias" -storepass "controleonline" -keypass "controleonline"


```

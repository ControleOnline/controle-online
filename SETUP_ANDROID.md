# Buildar para o android:

- rode os comandos para instalar os requirimentos e buildar no android a partir do linux com o cordova 12

```

//cordova platform rm android && cordova platform add android <- rode na pasta do cordova para atualizar as configurações do android
// inicie como sudo
sudo su

//export os seguintes locais:
export ANDROID_HOME=/home/inovia/Android/Sdk/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools/
export PATH=${PATH}:/opt/gradle/gradle-7.2/bin/gradle
alias gradle=/opt/gradle/gradle-7.2/bin/gradle
export GRADLE_PATH=/opt/gradle/gradle-7.2/bin/gradle
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https\://services.gradle.org/distributions/gradle-7.2-all.zip"

pacman -Sy jre8-openjdk
sudo archlinux-java set java-8-openjdk

source ~/.bashrc
//javac -version <-- em caso de erros cheque se o javac 1.8.0 está instalado


npx quasar build --mode cordova --target android --buildConfig -- --  --packageType=apk

- Abrir a ide:
npx quasar dev -m android --ide



```

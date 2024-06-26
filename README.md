Görev 1: Login Sayfasında UX Geliştirmesi
Kullanıcıları sürekli login tutmak güvenlik sorunları oluşturabiliyor. Sürekli login olmalarını istemek de kullanıclar tarafından beğenilmiyor.

Kullanıcı deneyimini(UX) iyileştirmek ve güvenlik sorununu yol açmamak için:

kayıtlı olan kullanıcının email adresini localStorage'da tutabiliriz. (password değil dikkat!).
input alanlarının autoFocus attribute'unu kullanarak, doldurulacak input alanına mouse ile tıklamadan direk yazmaya başlamalarını sağlayabiliriz.
Örnek: Kullanıcı sayfaya ilk kez giriş yapacak ise autoFocus email input'unda form açılabilir. Eğer, kullanıcı daha önce giriş yapmış ve email adresi localStorage'da kayıtlı ise email alanı bu email ile dolu gelebilir, autoFocus password alanında iken form açılabilir.

Daha önce yaptığın alışveriş sitesinde bunu uygulamak istiyorsun. Hem emaili localStorage'da tutacaksın hem de kayıtlı email'e göre autoFocus'u email veya password input'una alacaksın.

[ ] öncelikle başarılı login işleminde localStorage'a email key'i ile email adresini kaydetmelisin.
[ ] sayfa yüklenirken initialForm bilgileri boş string. eğer localStorage'da email key'ine karşılık gelen bir değer varsa email alanını bu bilgi ile başlatabilirsin.
[ ] hem email, hem de password alanına autoFocus attibute'u ekleyebilir, bunların true veya false olmasını localStorage'daki email key'inin değerine bağlı oluşmasını sağlayabilirsin.

İpucu: input alanlarındaki autofocus attribute'una w3schools'dan bakabilirsin.
Çalışma dosyaları: src/components-1/Login.jsx

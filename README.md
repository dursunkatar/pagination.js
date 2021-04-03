# pagination.js

![pagination](https://github.com/dursunkatar/pagination.js/blob/main/screenshot.png)

### Kullanımı

```js
var pagination = Pagination.SetConfig(function (config) {
    config.TotalItemCount = 19; // Toplam Kayıt Sayısı
    config.PageShowItemSize = 7; // Sayfada Toplam Gösterilecek Kayıt
    config.MaxShowButtonSize = 3; // Pagination Buton Sayısı
    config.ArrowLeftHtml = '<a href="{0}"><div class="icon icon-arrow-left"></div></a>';
    config.ArrowRightHtml = '<a href="{0}"><div class="icon icon-arrow-right"></div></a>';
    config.Url = '/blog';
    config.ParentDivId = 'pag';
});
pagination.Invoke(6);
```





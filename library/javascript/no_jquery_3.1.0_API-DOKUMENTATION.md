# API-Dokumentation nojquery 3.1.0

## StorageManager
```js
nj.storage.local.set("profil", {name:"Olaf"});
const p = nj.storage.local.get("profil", {});
nj.storage.session.set("scroll", 500);
nj.storage.set("token", "abc", {scope:"local", ttl:1800000});
nj.storage.update("count", v => (v||0)+1);
```
Methoden: `get`, `set`, `save`, `load`, `has`, `remove`, `clear`, `keys`, `size`, `update`. Bereiche: `nj.storage.local` und `nj.storage.session`.

## NavigationManager
```js
nj.navigation.setActive("faecher");
nj.navigation.restore("start");
nj.navigation.scrollSpy("main section[id]");
nj.navigation.breadcrumbs("#breadcrumb", [
 {label:"Start",href:"index.html"},
 {label:"Physik",current:true}
]);
```
HTML-Links benötigen `data-nav-section="faecher"`.

## SidebarManager
```js
nj.sidebar.init();
nj.sidebar.open();
nj.sidebar.close();
nj.sidebar.scroll(300);
nj.sidebar.savePosition();
nj.sidebar.restorePosition();
```
Standardselektoren: `.sidebar`, `.sidebar-scroll-window`, `.menu-toggle`, `.sidebar-scroll-button--up`, `.sidebar-scroll-button--down`.

## AccordionManager
```js
nj.accordion.init({selector:".subject-accordion", single:false});
nj.accordion.open("#thema");
nj.accordion.closeAll();
```

## ThemeManager
```js
nj.theme.set("leipzig-blau");
nj.theme.restore();
nj.theme.toggle();
```
Themen: `neon`, `dark`, `leipzig-blau`. Das Theme wird als `data-theme` auf `<html>` gesetzt.

## AnimationManager
```js
nj.animation.fadeIn("#panel");
nj.animation.slideDown("#panel");
nj.animation.pulse(".active");
nj.animation.animate(".card", [{opacity:0},{opacity:1}], {duration:400});
```

## AjaxManager
```js
nj.ajax.get("/api/data.php");
nj.ajax.post("/api/save.php", {name:"Olaf"});
nj.ajax.put("/api/item.php", {id:1});
nj.ajax.delete("/api/item.php?id=1");
nj.ajax.postForm("/upload.php", new FormData(form));
```
Optionen: `timeout`, `headers`, `responseType`.

## FormManager
```js
const data=nj.form.serialize("#kontakt");
nj.form.validate("#kontakt");
nj.form.bind("#kontakt", {url:"/kontakt.php", onSuccess:r=>console.log(r)});
```

## ModalManager
```js
const modal=nj.modal.create({id:"info",label:"Info",content:"<h2>Hinweis</h2>"});
nj.modal.open(modal);
nj.modal.close();
```
Schließen-Elemente: `data-modal-close`.

## CookieManager
```js
nj.cookie.set("theme", "leipzig-blau", 30, {sameSite:"Lax", path:"/"});
const theme=nj.cookie.get("theme", "leipzig-blau");
nj.cookie.remove("theme", {path:"/"});
```

## Eigene Manager-Instanz
```js
const storage = new nj.managers.StorageManager({namespace:"easyit"});
```

## Empfohlene Initialisierung
```js
document.addEventListener("DOMContentLoaded",()=>{
  nj.theme.restore();
  nj.navigation.restore("start");
  nj.navigation.scrollSpy("main section[id]");
  nj.sidebar.init();
  nj.accordion.init({selector:"details"});
});
```

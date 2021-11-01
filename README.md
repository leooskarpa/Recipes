# Recipes
Ovo je projekt koji se radi u sklopu kolegija na fakultetu, Otvoreno računarstvo.

**Licenca**: MIT License
**Autor**: Leo Škarpa
**Verzija**: 1.0
Jezik u kojem se nalaze podaci je *engleski*.

U bazi se nalaze dvije tablice: *country* i *recipe.*
**Country** je pomoćna tablica koja se sastoji samo od id-a (integer) i name(varchar).
**Recipe** je glavna tablica sa puno atributa:
- id (int)
- name (string)
- ingredients (array of strings)
- steps (array of strings)
- preptime (int) -> *in minutes*
- cooktime (int) -> *in minutes*
- servings (int)
- type (string) -> *breakfast, lunch, dinner, ...*
- description (string)
- countryId (int) -> *foreign key (country) for cuisine*

Poanta ovih podataka je okupiti sve open recepte na jedno mjesto, te smanjiti količinu vremena provedenu na internetu tražeći pravi recept.
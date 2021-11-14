# Recipes

Ovo je projekt koji se radi u sklopu kolegija na fakultetu, Otvoreno računarstvo.

**Licenca**: MIT License
**Autor**: Leo Škarpa
**Verzija**: 1.0
Jezik u kojem se nalaze podaci je _engleski_.

U bazi se nalaze dvije tablice: _country_ i _recipe._
**Country** je pomoćna tablica koja se sastoji samo od id-a (integer) i name(varchar).
**Recipe** je glavna tablica sa puno atributa:

- id (int)
- name (string)
- ingredients (array of strings)
- steps (array of strings)
- preptime (int) -> _in minutes_
- cooktime (int) -> _in minutes_
- servings (int)
- type (string) -> _breakfast, lunch, dinner, ..._
- description (string)
- countryId (int) -> _foreign key (country) for cuisine_

Poanta ovih podataka je okupiti sve open recepte na jedno mjesto, te smanjiti količinu vremena provedenu na internetu tražeći pravi recept.

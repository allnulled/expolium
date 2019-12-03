# Guía para expolium



## Manejo de errores a nivel de desarrollo

La carpeta bajo `src/core/error` tiene:

  - la clase `BasicError`, clase padre de los nuevos errors que queramos declarar.
  - la clase `ErrorManager`, con la que:
  	- se registran los demás ficheros `*Error.js` de su misma carpeta como nuevos errores bajo sí mismo, en: `ErrorManager.classes.{MyNewError}`.


# core.rest

## Regenerar el módulo `core.rest`

Con este comando regenerarás modelos, controladores, una colección `postman` con tu API, etc:

`$ do update:rest`

## Usar la HTTP REST API del módulo `core.rest`

El `core.rest` provee de 11 endpoints por cada tabla, cada uno con su función:

**Operation name**|**HTTP method**|**HTTP mimetype**|**Controller method**|**Controller endpoint**
:-----:|:-----:|:-----:|:-----:|:-----:
GET SCHEMA|GET|application/json|~.schema|/api/v1/{table}/@
GET ONE|GET|application/json|~.getOne|/api/v1/{table}/{id}
GET MANY|GET|application/json|~.getMany|/api/v1/{table}
POST ONE|POST|application/json|~.postOne|/api/v1/{table}
PUT ONE|PUT|application/json|~.putOne|/api/v1/{table}/{id}
DELETE ONE|DELETE|application/json|~.deleteOne|/api/v1/{table}/{id}
GET VIEW ONE|GET|text/html|~.viewOne|/api/v1/{table}/@/view
GET VIEW MANY|GET|text/html|~.viewMany|/api/v1/{table}/@/view/{id}
GET ADD ONE|GET|text/html|~.addOne|/api/v1/{table}/@/add
GET ADD ONE INHERITED|GET|text/html|~.addOne|/api/v1/{table}/@/add/{id}
GET EDIT ONE|GET|text/html|~.editOne|/api/v1/{table}/@/edit/{id}

El método `~.getMany()` soporta`los siguientes parámetros:
```
fields:~.id,~.id_user,~.id_community
sort:~.id_user@desc
group:~.id_community,~.id_user
where:[["~.id_community","=",25],["~.id_user",">",5]]
limit:2
page:0
```

Donde `~` se refiere a la tabla central de cada controlador.
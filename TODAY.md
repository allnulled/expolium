# TODAY


[ ] Make checkboxes sync with db.
[ ] Make enum fields syn with db.
[ ] Multer POST y PUT: files. Store files dynamically to: 
	- /core/upload/rest/file/{table}/{column}/{file}.{extension}
[ ] File controller to download any file: 
	- /api/v1/@/file/download?table={TABLE}&column={COLUMN}&id={ID}
[ ] Create button to download file on blobs in /@/view/{id} and /@/edit/{id}.
[ ] Endpoint to import csvs to rest api:
	- /api/v1/{model}/@/add-csv
	- usable on /@/view (many)
[ ] Pagination for referenced table form input type.
[ ] Make notification on referenced table disappear.
[ ] Make referenced table rows selectable and hiders.

AUTH REST:

[ ] /auth/v1/login 		[POST]
[ ] /auth/v1/logout 	[POST] [AUTHENTICATED]
[ ] /auth/v1/register 	[POST]
[ ] /auth/v1/unregister [POST] [AUTHENTICATED]
[ ] /auth/v1/forgot 	[POST]
[ ] /auth/v1/change 	[POST] [AUTHENTICATED]
[ ] /auth/v1/confirm 	[POST]
[ ] /auth/v1/refresh 	[POST] [AUTHENTICATED]
[ ] /auth/v1/status 	[POST] [AUTHENTICATED]


AUTH REST UI:

[ ] /auth/v1/login 		[GET]
[ ] /auth/v1/logout 	[GET] [AUTHENTICATED]
[ ] /auth/v1/register 	[GET]
[ ] /auth/v1/confirm 	[GET]
[ ] /auth/v1/unregister [GET] [AUTHENTICATED]
[ ] /auth/v1/forgot 	[GET]
[ ] /auth/v1/change 	[GET] [AUTHENTICATED]
[ ] /auth/v1/refresh 	[GET] [AUTHENTICATED]
[ ] /auth/v1/status 	[GET] [AUTHENTICATED]

AUTH MIDDLEWARE: 

/logged.js
/authorized.js
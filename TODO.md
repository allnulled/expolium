# TODO

Version 1.0

[ ] ----------------------------------------------------------------------------------------------------------------
[x] - represent model attributes by column/table in Sequelize.
[ ] - 6 methods for restcontroller + modelcontroller: schema, getone, getmany, postone, putone, deleteone.
	[x] - getschema: get the schema of the column.
	[ ] - getone: get one instance by id.
		[ ] - join: tables to be joined with the main model.
		[ ] - fields: columns to be shown (included the columns of joined tables).
	[ ] - getmany: get many instances...
		[ ] - applying filters by permission for the operation in each query. PENDING ON THE AUTHENTICATION SYSTEM.
		[ ] - make parameters work:
			[ ] - where: filters applied to the query [["subject","=operator","object"]].
			[ ] - fields: columns to be shown (included the columns of joined tables).
			[ ] - join: tables to be joined with the main model. from joined columns too.
			[ ] - limit: items per page
			[ ] - page: page. pass 0 to get all items in 1. set 1 to get the first page.
			[ ] - group: group results by common column (or joined column) values.
			[ ] - sort: criteria to order the items.
		[ ] - applying filters by community in each query. PENDING ON THE AUTHENTICATION SYSTEM.
	[ ] - postone: post one instance...
		[ ] - applying filters by permission for the operation in each query. PENDING ON THE AUTHENTICATION SYSTEM.
		[ ] - save instance passing attributes.
		[ ] - applying filters by community in each query. PENDING ON THE AUTHENTICATION SYSTEM.
	[ ] - putone: put one instance...
		[ ] - applying filters by permission for the operation in each query. PENDING ON THE AUTHENTICATION SYSTEM.
		[ ] - retrieve instance.
		[ ] - save instance passing attributes.
		[ ] - applying filters by community in each query. PENDING ON THE AUTHENTICATION SYSTEM.
	[ ] - deleteone: delete one instance...
		[ ] - applying filters by permission for the operation in each query. PENDING ON THE AUTHENTICATION SYSTEM.
		[ ] - retrieve instance.
		[ ] - delete instance.
		[ ] - applying filters by community in each query. PENDING ON THE AUTHENTICATION SYSTEM.
[ ] ---------------------------------------------------------------------------------------------------------

Sin backoffice:

[ ] - auth/v1/...

[ ] - api/v1/...
[ ] - api/v1/@view
[ ] - api/v1/{table}/@find
[ ] - api/v1/{table}/@view
[ ] - api/v1/{table}/@edit
[ ] - api/v1/{table}/@add

[ ] - ui/v1/:type(.subtype)*/:id + { query | body } parameters
[ ] - 
[ ] - 
[ ] - 
[ ] - 
[ ] - 
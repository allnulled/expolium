

(function() {

	const axios = window.axios;

	class RestClient {

		static get DEFAULT_DATA() {
			return {
  "forms": {
    "community": {
      "table": "community",
      "model": "Community",
      "endpoint": "/community",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"community\".",
          "table": "community",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "name": {
          "type": "string",
          "label": "Name",
          "description": "Unit of \"string\" describing the \"name\" field of an instance of \"community\".",
          "table": "community",
          "column": "name",
          "maxString": 50,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "UNI",
              "boundConstraint": "UNIQUE_name"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"community\".",
          "table": "community",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"community\".",
          "table": "community",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "ejemplos": {
      "table": "ejemplos",
      "model": "Ejemplos",
      "endpoint": "/ejemplos",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "col1": {
          "type": "integer",
          "label": "Col1",
          "description": "Unit of \"integer\" describing the \"col1\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col1",
          "maxString": "null",
          "maxNumber": 3,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col2": {
          "type": "integer",
          "label": "Col2",
          "description": "Unit of \"integer\" describing the \"col2\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col2",
          "maxString": "null",
          "maxNumber": 5,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col3": {
          "type": "bigint",
          "label": "Col3",
          "description": "Unit of \"bigint\" describing the \"col3\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col3",
          "maxString": "null",
          "maxNumber": 7,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col4": {
          "type": "integer",
          "label": "Col4",
          "description": "Unit of \"integer\" describing the \"col4\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col4",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col5": {
          "type": "bigint",
          "label": "Col5",
          "description": "Unit of \"bigint\" describing the \"col5\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col5",
          "maxString": "null",
          "maxNumber": 19,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col6": {
          "type": "boolean",
          "label": "Col6",
          "description": "Unit of \"boolean\" describing the \"col6\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col6",
          "maxString": "null",
          "maxNumber": 1,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col7": {
          "type": "float",
          "label": "Col7",
          "description": "Unit of \"float\" describing the \"col7\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col7",
          "maxString": "null",
          "maxNumber": 12,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col8": {
          "type": "double",
          "label": "Col8",
          "description": "Unit of \"double\" describing the \"col8\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col8",
          "maxString": "null",
          "maxNumber": 22,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col9": {
          "type": "decimal",
          "label": "Col9",
          "description": "Unit of \"decimal\" describing the \"col9\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col9",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col10": {
          "type": "string",
          "label": "Col10",
          "description": "Unit of \"string\" describing the \"col10\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col10",
          "maxString": 1,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col11": {
          "type": "string",
          "label": "Col11",
          "description": "Unit of \"string\" describing the \"col11\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col11",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col12": {
          "type": "text",
          "label": "Col12",
          "description": "Unit of \"text\" describing the \"col12\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col12",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col13": {
          "type": "text",
          "label": "Col13",
          "description": "Unit of \"text\" describing the \"col13\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col13",
          "maxString": 16777215,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col14": {
          "type": "text",
          "label": "Col14",
          "description": "Unit of \"text\" describing the \"col14\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col14",
          "maxString": 4294967295,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col15": {
          "type": "json",
          "label": "Col15",
          "description": "Unit of \"json\" describing the \"col15\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col15",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col18": {
          "type": "blob",
          "label": "Col18",
          "description": "Unit of \"blob\" describing the \"col18\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col18",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col19": {
          "type": "blob",
          "label": "Col19",
          "description": "Unit of \"blob\" describing the \"col19\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col19",
          "maxString": 65535,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col20": {
          "type": "blob",
          "label": "Col20",
          "description": "Unit of \"blob\" describing the \"col20\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col20",
          "maxString": 16777215,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col21": {
          "type": "blob",
          "label": "Col21",
          "description": "Unit of \"blob\" describing the \"col21\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col21",
          "maxString": 4294967295,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col22": {
          "type": "date",
          "label": "Col22",
          "description": "Unit of \"date\" describing the \"col22\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col22",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col23": {
          "type": "time",
          "label": "Col23",
          "description": "Unit of \"time\" describing the \"col23\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col23",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col24": {
          "type": "integer",
          "label": "Col24",
          "description": "Unit of \"integer\" describing the \"col24\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col24",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col25": {
          "type": "datetime",
          "label": "Col25",
          "description": "Unit of \"datetime\" describing the \"col25\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col25",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col26": {
          "type": "datetime",
          "label": "Col26",
          "description": "Unit of \"datetime\" describing the \"col26\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col26",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col36": {
          "type": "enum",
          "label": "Col36",
          "description": "Unit of \"enum\" describing the \"col36\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col36",
          "maxString": 1,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "col38": {
          "type": "enum",
          "label": "Col38",
          "description": "Unit of \"enum\" describing the \"col38\" field of an instance of \"ejemplos\".",
          "table": "ejemplos",
          "column": "col38",
          "maxString": 5,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "membership": {
      "table": "membership",
      "model": "Membership",
      "endpoint": "/membership",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "id_user": {
          "type": "referenced-table",
          "label": "Id user",
          "description": "Unit of \"referenced-table\" describing the \"id user\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "id_user",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_membership_user",
              "referencedTable": "user",
              "referencedColumn": "id"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_user_per_community"
            }
          ]
        },
        "id_community": {
          "type": "referenced-table",
          "label": "Id community",
          "description": "Unit of \"referenced-table\" describing the \"id community\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "id_community",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_user_per_community"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_membership_community",
              "referencedTable": "community",
              "referencedColumn": "id"
            }
          ]
        },
        "id_role": {
          "type": "referenced-table",
          "label": "Id role",
          "description": "Unit of \"referenced-table\" describing the \"id role\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "id_role",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_membership_role",
              "referencedTable": "role",
              "referencedColumn": "id"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"membership\".",
          "table": "membership",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "permission": {
      "table": "permission",
      "model": "Permission",
      "endpoint": "/permission",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"permission\".",
          "table": "permission",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "id_community": {
          "type": "referenced-table",
          "label": "Id community",
          "description": "Unit of \"referenced-table\" describing the \"id community\" field of an instance of \"permission\".",
          "table": "permission",
          "column": "id_community",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_permission_name_community"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_permission_community",
              "referencedTable": "community",
              "referencedColumn": "id"
            }
          ]
        },
        "name": {
          "type": "string",
          "label": "Name",
          "description": "Unit of \"string\" describing the \"name\" field of an instance of \"permission\".",
          "table": "permission",
          "column": "name",
          "maxString": 50,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_permission_name_community"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"permission\".",
          "table": "permission",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"permission\".",
          "table": "permission",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "permission_per_role": {
      "table": "permission_per_role",
      "model": "PermissionPerRole",
      "endpoint": "/permission-per-role",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"permission_per_role\".",
          "table": "permission_per_role",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "id_permission": {
          "type": "referenced-table",
          "label": "Id permission",
          "description": "Unit of \"referenced-table\" describing the \"id permission\" field of an instance of \"permission_per_role\".",
          "table": "permission_per_role",
          "column": "id_permission",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_permission_per_role"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_permission_per_role_permission",
              "referencedTable": "permission",
              "referencedColumn": "id"
            }
          ]
        },
        "id_role": {
          "type": "referenced-table",
          "label": "Id role",
          "description": "Unit of \"referenced-table\" describing the \"id role\" field of an instance of \"permission_per_role\".",
          "table": "permission_per_role",
          "column": "id_role",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_permission_per_role"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_permission_per_role_role",
              "referencedTable": "role",
              "referencedColumn": "id"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"permission_per_role\".",
          "table": "permission_per_role",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"permission_per_role\".",
          "table": "permission_per_role",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "role": {
      "table": "role",
      "model": "Role",
      "endpoint": "/role",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"role\".",
          "table": "role",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "id_community": {
          "type": "referenced-table",
          "label": "Id community",
          "description": "Unit of \"referenced-table\" describing the \"id community\" field of an instance of \"role\".",
          "table": "role",
          "column": "id_community",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_role_name_community"
            },
            {
              "columnKey": "MUL",
              "boundConstraint": "FK_role_community",
              "referencedTable": "community",
              "referencedColumn": "id"
            }
          ]
        },
        "name": {
          "type": "string",
          "label": "Name",
          "description": "Unit of \"string\" describing the \"name\" field of an instance of \"role\".",
          "table": "role",
          "column": "name",
          "maxString": 50,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "MUL",
              "boundConstraint": "UNIQUE_role_name_community"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"role\".",
          "table": "role",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"role\".",
          "table": "role",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "session": {
      "table": "session",
      "model": "Session",
      "endpoint": "/session",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"session\".",
          "table": "session",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "id_user": {
          "type": "referenced-table",
          "label": "Id user",
          "description": "Unit of \"referenced-table\" describing the \"id user\" field of an instance of \"session\".",
          "table": "session",
          "column": "id_user",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "UNI",
              "boundConstraint": "FK__user",
              "referencedTable": "user",
              "referencedColumn": "id"
            },
            {
              "columnKey": "UNI",
              "boundConstraint": "UNIQUE_user_per_session"
            }
          ]
        },
        "secret_token": {
          "type": "string",
          "label": "Secret token",
          "description": "Unit of \"string\" describing the \"secret token\" field of an instance of \"session\".",
          "table": "session",
          "column": "secret_token",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "recovery_token": {
          "type": "string",
          "label": "Recovery token",
          "description": "Unit of \"string\" describing the \"recovery token\" field of an instance of \"session\".",
          "table": "session",
          "column": "recovery_token",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"session\".",
          "table": "session",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"session\".",
          "table": "session",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    },
    "user": {
      "table": "user",
      "model": "User",
      "endpoint": "/user",
      "columns": {
        "id": {
          "type": "integer",
          "label": "Id",
          "description": "Unit of \"integer\" describing the \"id\" field of an instance of \"user\".",
          "table": "user",
          "column": "id",
          "maxString": "null",
          "maxNumber": 10,
          "required": "false",
          "unsigned": true,
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "PRI",
              "boundConstraint": "PRIMARY"
            }
          ]
        },
        "name": {
          "type": "string",
          "label": "Name",
          "description": "Unit of \"string\" describing the \"name\" field of an instance of \"user\".",
          "table": "user",
          "column": "name",
          "maxString": 50,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "UNI",
              "boundConstraint": "UNIQUE_user_name"
            }
          ]
        },
        "password": {
          "type": "string",
          "label": "Password",
          "description": "Unit of \"string\" describing the \"password\" field of an instance of \"user\".",
          "table": "user",
          "column": "password",
          "maxString": 255,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "email": {
          "type": "string",
          "label": "Email",
          "description": "Unit of \"string\" describing the \"email\" field of an instance of \"user\".",
          "table": "user",
          "column": "email",
          "maxString": 100,
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null",
          "columnConstraints": [
            {
              "columnKey": "UNI",
              "boundConstraint": "UNIQUE_user_mail"
            }
          ]
        },
        "created_at": {
          "type": "datetime",
          "label": "Created at",
          "description": "Unit of \"datetime\" describing the \"created at\" field of an instance of \"user\".",
          "table": "user",
          "column": "created_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        },
        "updated_at": {
          "type": "datetime",
          "label": "Updated at",
          "description": "Unit of \"datetime\" describing the \"updated at\" field of an instance of \"user\".",
          "table": "user",
          "column": "updated_at",
          "maxString": "null",
          "maxNumber": "null",
          "required": "false",
          "unsigned": "false",
          "defaultValue": "null"
        }
      }
    }
  }
};
		}

		static get DEFAULT_SETTINGS() {
			return {
				baseUrl: "/api/v1"
			};
		}

		static generateCrudByTable(tableData, client) {
			return {
				schema: () => {
					return client.api.get(tableData.endpoint + "/@");
				},
				find: (parameters = {}, options = {}) => {
					return client.api.get(tableData.endpoint, parameters, options);
				},
				get: (id, parameters = {}, options = {}) => {
					return client.api.get(tableData.endpoint + "/" + id, parameters, options);
				},
				post: (parameters = {}, options = {}) => {
					return client.api.post(tableData.endpoint, parameters, options);
				},
				put: (id, parameters = {}, options = {}) => {
					return client.api.put(tableData.endpoint + "/" + id, parameters, options);
				},
				putFaked: (id, parameters = {}, options = {}) => {
					return client.api.post(tableData.endpoint + "/" + id, parameters, options);
				},
				delete: (id, parameters = {}, options = {}) => {
					return client.api.delete(tableData.endpoint + "/" + id, parameters, options);
				},
				search: () => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/view";
				},
				view: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/view/" + id;
				},
				add: () => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/add";
				},
				clone: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/add/" + id;
				},
				edit: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/edit/" + id;
				}

			}
		}

		static initialize(data, client) {
			if ("forms" in data) {
				for (let table in data.forms) {
					const tableData = data.forms[table];
					client[tableData.model] = this.generateCrudByTable(tableData, client);
				}
			}
			client.overview = () => {
					window.location.href = client.settings.baseUrl + "/@/view";
			};
			client.schema = () => {
					return client.api.get("/");
			};
			return client;
		}

		initialize() {
			// initialize this.api at your convenience here.
			this.api = this.axios.create({
				baseURL: this.settings.baseUrl
			});
			// this.api.defaults.headers.common["Authorization"] = "Bearer XXX";
		}

		constructor(data = this.constructor.DEFAULT_DATA, settings = this.constructor.DEFAULT_SETTINGS) {
			this.data = data;
			this.settings = settings;
			this.axios = axios;
			this.api = undefined; // this is an axios instance
			this.constructor.initialize(this.data, this);
			this.initialize();
		}



	}

	window.RestClient = RestClient;

})();
/*///////////////////////////////*/

/*
(async (baseUrl) => {
	const client = new RestClient();
	const api = await client.api(baseUrl);
	const instance = await api.Community.getOne(2);
	const putResult = await api.Community.putOne(instance.id, instance);
	const deleteResult = await api.Community.deleteOne(instance.id);
})("");
//*/
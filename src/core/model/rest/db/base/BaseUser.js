const Sequelize = require("sequelize");
const { Model } = Sequelize;

class UserDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "User";
    }

    static get table() {
        return "user";
    }

    static get columns() {
        return {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER(10),
                field: "id",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Id",
                __form_description: 'Unit of "integer" describing the "id" field of an instance of "user".',
                __form_table: "user",
                __form_column: "id",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            name: {
                type: Sequelize.STRING(50),
                field: "name",
                allowNull: false,
                defaultValue: null,
                maxCharacters: 50,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.STRING(50)",
                __full_type: "varchar(50)",
                __type_label: "string",

                __form_type: "string",
                __form_label: "Name",
                __form_description: 'Unit of "string" describing the "name" field of an instance of "user".',
                __form_table: "user",
                __form_column: "name",
                __form_max_string: 50,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            password: {
                type: Sequelize.STRING(255),
                field: "password",
                allowNull: false,
                defaultValue: null,
                maxCharacters: 255,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.STRING(255)",
                __full_type: "varchar(255)",
                __type_label: "string",

                __form_type: "string",
                __form_label: "Password",
                __form_description: 'Unit of "string" describing the "password" field of an instance of "user".',
                __form_table: "user",
                __form_column: "password",
                __form_max_string: 255,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            email: {
                type: Sequelize.STRING(100),
                field: "email",
                allowNull: false,
                defaultValue: null,
                maxCharacters: 100,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.STRING(100)",
                __full_type: "varchar(100)",
                __type_label: "string",

                __form_type: "string",
                __form_label: "Email",
                __form_description: 'Unit of "string" describing the "email" field of an instance of "user".',
                __form_table: "user",
                __form_column: "email",
                __form_max_string: 100,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            created_at: {
                type: Sequelize.DATE,
                field: "created_at",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE",
                __full_type: "timestamp",
                __type_label: "datetime",

                __form_type: "datetime",
                __form_label: "Created at",
                __form_description: 'Unit of "datetime" describing the "created at" field of an instance of "user".',
                __form_table: "user",
                __form_column: "created_at",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            updated_at: {
                type: Sequelize.DATE,
                field: "updated_at",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP"),
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE",
                __full_type: "timestamp",
                __type_label: "datetime",

                __form_type: "datetime",
                __form_label: "Updated at",
                __form_description: 'Unit of "datetime" describing the "updated at" field of an instance of "user".',
                __form_table: "user",
                __form_column: "updated_at",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            }
        };
    }

    static get innerRelationships() {
        return [
            {
                table: "user",
                column: "id",
                constraint: "PRIMARY"
            },
            {
                table: "user",
                column: "name",
                constraint: "UNIQUE_user_name"
            },
            {
                table: "user",
                column: "email",
                constraint: "UNIQUE_user_mail"
            }
        ];
    }

    static get outerRelationships() {
        return [
            {
                table: "membership",
                column: "id_user",
                constraint: "FK_membership_user",
                referencedTable: "user",
                referencedColumn: "id"
            },
            {
                table: "session",
                column: "id_user",
                constraint: "FK__user",
                referencedTable: "user",
                referencedColumn: "id"
            }
        ];
    }

    static get allRelationships() {
        return [...this.innerRelationships, ...this.outerRelationships];
    }

    static getPublicColumns() {
        return Object.keys(this.columns).reduce((result, column) => {
            if (this.columns[column].__hidden === true || this.columns[column].__shown === false) {
                //
            } else {
                result[column] = this.columns[column];
            }
            return result;
        }, {});
    }

    static getPublicColumnNames() {
        return Object.keys(this.getPublicColumns());
    }

    static getPublicDefinition() {
        return {
            table: this.table,
            name: this.name,
            columns: this.getPublicColumns(),
            innerRelationships: this.innerRelationships,
            outerRelationships: this.outerRelationships
        };
    }

    static isMainTable() {
        return false;
    }

    static getAttachedModelBoundaries() {
        return {};
    }

    static get primaryKeyColumn() {
        return "id";
    }
}

class BaseUser extends Model {
    static get definition() {
        return UserDefinition;
    }
}

module.exports = BaseUser;

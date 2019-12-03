const Sequelize = require("sequelize");
const { Model } = Sequelize;

class PermissionPerRoleDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "PermissionPerRole";
    }

    static get table() {
        return "permission_per_role";
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
                __form_description: 'Unit of "integer" describing the "id" field of an instance of "permission_per_role".',
                __form_table: "permission_per_role",
                __form_column: "id",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            id_permission: {
                type: Sequelize.INTEGER(10),
                field: "id_permission",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "referenced-table",

                __form_type: "referenced-table",
                __form_label: "Id permission",
                __form_description: 'Unit of "referenced-table" describing the "id permission" field of an instance of "permission_per_role".',
                __form_table: "permission_per_role",
                __form_column: "id_permission",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            id_role: {
                type: Sequelize.INTEGER(10),
                field: "id_role",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "referenced-table",

                __form_type: "referenced-table",
                __form_label: "Id role",
                __form_description: 'Unit of "referenced-table" describing the "id role" field of an instance of "permission_per_role".',
                __form_table: "permission_per_role",
                __form_column: "id_role",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
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
                __form_description: 'Unit of "datetime" describing the "created at" field of an instance of "permission_per_role".',
                __form_table: "permission_per_role",
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
                __form_description: 'Unit of "datetime" describing the "updated at" field of an instance of "permission_per_role".',
                __form_table: "permission_per_role",
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
                table: "permission_per_role",
                column: "id",
                constraint: "PRIMARY"
            },
            {
                table: "permission_per_role",
                column: "id_permission",
                constraint: "UNIQUE_permission_per_role"
            },
            {
                table: "permission_per_role",
                column: "id_permission",
                constraint: "FK_permission_per_role_permission",
                referencedTable: "permission",
                referencedColumn: "id"
            },
            {
                table: "permission_per_role",
                column: "id_role",
                constraint: "UNIQUE_permission_per_role"
            },
            {
                table: "permission_per_role",
                column: "id_role",
                constraint: "FK_permission_per_role_role",
                referencedTable: "role",
                referencedColumn: "id"
            }
        ];
    }

    static get outerRelationships() {
        return [];
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

class BasePermissionPerRole extends Model {
    static get definition() {
        return PermissionPerRoleDefinition;
    }
}

module.exports = BasePermissionPerRole;

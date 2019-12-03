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
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer"
            },
            id_permission: {
                type: Sequelize.INTEGER(10),
                field: "id_permission",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer"
            },
            id_role: {
                type: Sequelize.INTEGER(10),
                field: "id_role",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer"
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
                __type_label: "date",
                __hidden: true
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
                __type_label: "date",
                __hidden: true
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

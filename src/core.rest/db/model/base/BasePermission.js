const Sequelize = require("sequelize");
const { Model } = Sequelize;

class PermissionDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "Permission";
    }

    static get table() {
        return "permission";
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
                __type_label: "integer",
                __bound_to_community_by: [["#", "id_community", "@", "@"]],
                __main_table: true,
                __allowed_joins: {}
            },
            id_community: {
                type: Sequelize.INTEGER(10),
                field: "id_community",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer"
            },
            name: {
                type: Sequelize.STRING(50),
                field: "name",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.STRING(50)",
                __full_type: "varchar(50)",
                __type_label: "string"
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
                table: "permission",
                column: "id",
                constraint: "PRIMARY"
            },
            {
                table: "permission",
                column: "id_community",
                constraint: "UNIQUE_permission_name_community"
            },
            {
                table: "permission",
                column: "id_community",
                constraint: "FK_permission_community",
                referencedTable: "community",
                referencedColumn: "id"
            },
            {
                table: "permission",
                column: "name",
                constraint: "UNIQUE_permission_name_community"
            }
        ];
    }

    static get outerRelationships() {
        return [
            {
                table: "permission_per_role",
                column: "id_permission",
                constraint: "FK_permission_per_role_permission",
                referencedTable: "permission",
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

    static getCommunityBoundaries() {
        return [["#", "id_community", "@", "@"]];
    }

    static isMainTable() {
        return true;
    }

    static getAttachedModelBoundaries() {
        return {};
    }

    static get primaryKeyColumn() {
        return "id";
    }
}

class BasePermission extends Model {
    static get definition() {
        return PermissionDefinition;
    }
}

module.exports = BasePermission;

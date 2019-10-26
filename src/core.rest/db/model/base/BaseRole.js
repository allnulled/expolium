const Sequelize = require("sequelize");
const { Model } = Sequelize;

class RoleDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "Role";
    }

    static get table() {
        return "role";
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
                __typeCode: "Sequelize.INTEGER(10)",
                __fulltype: "int(10) unsigned",
                __typeLabel: "integer"
            },
            id_community: {
                type: Sequelize.INTEGER(10),
                field: "id_community",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.INTEGER(10)",
                __fulltype: "int(10) unsigned",
                __typeLabel: "integer"
            },
            name: {
                type: Sequelize.STRING(50),
                field: "name",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.STRING(50)",
                __fulltype: "varchar(50)",
                __typeLabel: "string"
            },
            created_at: {
                type: Sequelize.DATE,
                field: "created_at",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "timestamp",
                __typeLabel: "date",
                __hidden: true
            },
            updated_at: {
                type: Sequelize.DATE,
                field: "updated_at",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP"),
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "timestamp",
                __typeLabel: "date",
                __hidden: true
            }
        };
    }

    static get innerRelationships() {
        return [
            {
                table: "role",
                column: "id",
                constraint: "PRIMARY"
            },
            {
                table: "role",
                column: "id_community",
                constraint: "UNIQUE_role_name_community"
            },
            {
                table: "role",
                column: "id_community",
                constraint: "FK_role_community",
                referencedTable: "community",
                referencedColumn: "id"
            },
            {
                table: "role",
                column: "name",
                constraint: "UNIQUE_role_name_community"
            }
        ];
    }

    static get outerRelationships() {
        return [
            {
                table: "membership",
                column: "id_role",
                constraint: "FK_membership_role",
                referencedTable: "role",
                referencedColumn: "id"
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

    static get allRelationships() {
        return [...this.innerRelationships, ...this.outerRelationships];
    }

    static getPublicColumns() {
        return Object.keys(this.columns).reduce((result, column) => {
            if (this.columns[column]._hidden === true) {
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
}

class BaseRole extends Model {
    static get definition() {
        return RoleDefinition;
    }
}

module.exports = BaseRole;
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
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer",
                __main_table: true,
                __allowed_joins: {}
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
            password: {
                type: Sequelize.STRING(255),
                field: "password",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.STRING(255)",
                __full_type: "varchar(255)",
                __type_label: "string"
            },
            email: {
                type: Sequelize.STRING(100),
                field: "email",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.STRING(100)",
                __full_type: "varchar(100)",
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

class BaseUser extends Model {
    static get definition() {
        return UserDefinition;
    }
}

module.exports = BaseUser;

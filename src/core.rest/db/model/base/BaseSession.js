const Sequelize = require("sequelize");
const { Model } = Sequelize;

class SessionDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "Session";
    }

    static get table() {
        return "session";
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
            id_user: {
                type: Sequelize.INTEGER(10),
                field: "id_user",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.INTEGER(10)",
                __fulltype: "int(10) unsigned",
                __typeLabel: "integer"
            },
            secret_token: {
                type: Sequelize.STRING(255),
                field: "secret_token",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.STRING(255)",
                __fulltype: "varchar(255)",
                __typeLabel: "string"
            },
            recovery_token: {
                type: Sequelize.STRING(255),
                field: "recovery_token",
                allowNull: false,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.STRING(255)",
                __fulltype: "varchar(255)",
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
                table: "session",
                column: "id",
                constraint: "PRIMARY"
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

    static get outerRelationships() {
        return [];
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

class BaseSession extends Model {
    static get definition() {
        return SessionDefinition;
    }
}

module.exports = BaseSession;

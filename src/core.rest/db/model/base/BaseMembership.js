const Sequelize = require("sequelize");
const { Model } = Sequelize;

class MembershipDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "Membership";
    }

    static get table() {
        return "membership";
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
            id_role: {
                type: Sequelize.INTEGER(10),
                field: "id_role",
                allowNull: false,
                defaultValue: null,
                unsigned: true,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.INTEGER(10)",
                __fulltype: "int(10) unsigned",
                __typeLabel: "integer"
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
                table: "membership",
                column: "id",
                constraint: "PRIMARY"
            },
            {
                table: "membership",
                column: "id_user",
                constraint: "UNIQUE_user_per_community"
            },
            {
                table: "membership",
                column: "id_user",
                constraint: "FK_membership_user",
                referencedTable: "user",
                referencedColumn: "id"
            },
            {
                table: "membership",
                column: "id_role",
                constraint: "FK_membership_role",
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

class BaseMembership extends Model {
    static get definition() {
        return MembershipDefinition;
    }
}

module.exports = BaseMembership;

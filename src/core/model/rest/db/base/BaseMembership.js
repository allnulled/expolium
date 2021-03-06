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
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(10)",
                __full_type: "int(10) unsigned",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Id",
                __form_description: 'Unit of "integer" describing the "id" field of an instance of "membership".',
                __form_table: "membership",
                __form_column: "id",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            id_user: {
                type: Sequelize.INTEGER(10),
                field: "id_user",
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
                __form_label: "Id user",
                __form_description: 'Unit of "referenced-table" describing the "id user" field of an instance of "membership".',
                __form_table: "membership",
                __form_column: "id_user",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            id_community: {
                type: Sequelize.INTEGER(10),
                field: "id_community",
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
                __form_label: "Id community",
                __form_description: 'Unit of "referenced-table" describing the "id community" field of an instance of "membership".',
                __form_table: "membership",
                __form_column: "id_community",
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
                __form_description: 'Unit of "referenced-table" describing the "id role" field of an instance of "membership".',
                __form_table: "membership",
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
                __form_description: 'Unit of "datetime" describing the "created at" field of an instance of "membership".',
                __form_table: "membership",
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
                __form_description: 'Unit of "datetime" describing the "updated at" field of an instance of "membership".',
                __form_table: "membership",
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
                table: "membership",
                column: "id",
                constraint: "PRIMARY"
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
                column: "id_user",
                constraint: "UNIQUE_user_per_community"
            },
            {
                table: "membership",
                column: "id_community",
                constraint: "UNIQUE_user_per_community"
            },
            {
                table: "membership",
                column: "id_community",
                constraint: "FK_membership_community",
                referencedTable: "community",
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

class BaseMembership extends Model {
    static get definition() {
        return MembershipDefinition;
    }
}

module.exports = BaseMembership;

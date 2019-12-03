const Sequelize = require("sequelize");
const { Model } = Sequelize;

class EjemplosDefinition {
    static get database() {
        return "bM90APIyMv";
    }

    static get databaseConnection() {
        return "db";
    }

    static get name() {
        return "Ejemplos";
    }

    static get table() {
        return "ejemplos";
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
                __form_description: 'Unit of "integer" describing the "id" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "id",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: true,
                __form_default_value: null
            },
            col1: {
                type: Sequelize.INTEGER(4),
                field: "col1",
                allowNull: true,
                defaultValue: null,
                maxDigits: 3,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(4)",
                __full_type: "tinyint(4)",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Col1",
                __form_description: 'Unit of "integer" describing the "col1" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col1",
                __form_max_string: null,
                __form_max_number: 3,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col2: {
                type: Sequelize.INTEGER("small"),
                field: "col2",
                allowNull: true,
                defaultValue: null,
                maxDigits: 5,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER('small')",
                __full_type: "smallint(6)",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Col2",
                __form_description: 'Unit of "integer" describing the "col2" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col2",
                __form_max_string: null,
                __form_max_number: 5,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col3: {
                type: Sequelize.BIGINT(9),
                field: "col3",
                allowNull: true,
                defaultValue: null,
                maxDigits: 7,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BIGINT(9)",
                __full_type: "mediumint(9)",
                __type_label: "bigint",

                __form_type: "bigint",
                __form_label: "Col3",
                __form_description: 'Unit of "bigint" describing the "col3" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col3",
                __form_max_string: null,
                __form_max_number: 7,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col4: {
                type: Sequelize.INTEGER(11),
                field: "col4",
                allowNull: true,
                defaultValue: null,
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.INTEGER(11)",
                __full_type: "int(11)",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Col4",
                __form_description: 'Unit of "integer" describing the "col4" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col4",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col5: {
                type: Sequelize.BIGINT(20),
                field: "col5",
                allowNull: true,
                defaultValue: null,
                maxDigits: 19,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BIGINT(20)",
                __full_type: "bigint(20)",
                __type_label: "bigint",

                __form_type: "bigint",
                __form_label: "Col5",
                __form_description: 'Unit of "bigint" describing the "col5" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col5",
                __form_max_string: null,
                __form_max_number: 19,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col6: {
                type: Sequelize.BOOLEAN(1),
                field: "col6",
                allowNull: true,
                defaultValue: null,
                maxDigits: 1,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BOOLEAN(1)",
                __full_type: "bit(1)",
                __type_label: "boolean",

                __form_type: "boolean",
                __form_label: "Col6",
                __form_description: 'Unit of "boolean" describing the "col6" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col6",
                __form_max_string: null,
                __form_max_number: 1,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col7: {
                type: Sequelize.FLOAT,
                field: "col7",
                allowNull: true,
                defaultValue: null,
                maxDigits: 12,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.FLOAT",
                __full_type: "float",
                __type_label: "float",

                __form_type: "float",
                __form_label: "Col7",
                __form_description: 'Unit of "float" describing the "col7" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col7",
                __form_max_string: null,
                __form_max_number: 12,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col8: {
                type: Sequelize.DOUBLE,
                field: "col8",
                allowNull: true,
                defaultValue: null,
                maxDigits: 22,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DOUBLE",
                __full_type: "double",
                __type_label: "double",

                __form_type: "double",
                __form_label: "Col8",
                __form_description: 'Unit of "double" describing the "col8" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col8",
                __form_max_string: null,
                __form_max_number: 22,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col9: {
                type: Sequelize.DECIMAL(10, 0),
                field: "col9",
                allowNull: true,
                defaultValue: null,
                maxDigits: 10,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DECIMAL(10,0)",
                __full_type: "decimal(10,0)",
                __type_label: "decimal",

                __form_type: "decimal",
                __form_label: "Col9",
                __form_description: 'Unit of "decimal" describing the "col9" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col9",
                __form_max_string: null,
                __form_max_number: 10,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col10: {
                type: Sequelize.STRING(1),
                field: "col10",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 1,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.STRING(1)",
                __full_type: "char(1)",
                __type_label: "string",

                __form_type: "string",
                __form_label: "Col10",
                __form_description: 'Unit of "string" describing the "col10" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col10",
                __form_max_string: 1,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col11: {
                type: Sequelize.STRING(255),
                field: "col11",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 255,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.STRING(255)",
                __full_type: "varchar(255)",
                __type_label: "string",

                __form_type: "string",
                __form_label: "Col11",
                __form_description: 'Unit of "string" describing the "col11" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col11",
                __form_max_string: 255,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col12: {
                type: Sequelize.TEXT("tiny"),
                field: "col12",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 255,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.TEXT('tiny')",
                __full_type: "tinytext",
                __type_label: "text",

                __form_type: "text",
                __form_label: "Col12",
                __form_description: 'Unit of "text" describing the "col12" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col12",
                __form_max_string: 255,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col13: {
                type: Sequelize.TEXT("medium"),
                field: "col13",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 16777215,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.TEXT('medium')",
                __full_type: "mediumtext",
                __type_label: "text",

                __form_type: "text",
                __form_label: "Col13",
                __form_description: 'Unit of "text" describing the "col13" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col13",
                __form_max_string: 16777215,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col14: {
                type: Sequelize.TEXT("long"),
                field: "col14",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 4294967295,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.TEXT('long')",
                __full_type: "longtext",
                __type_label: "text",

                __form_type: "text",
                __form_label: "Col14",
                __form_description: 'Unit of "text" describing the "col14" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col14",
                __form_max_string: 4294967295,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col15: {
                type: Sequelize.JSON,
                field: "col15",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.JSON",
                __full_type: "json",
                __type_label: "json",

                __form_type: "json",
                __form_label: "Col15",
                __form_description: 'Unit of "json" describing the "col15" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col15",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col18: {
                type: Sequelize.BLOB("tiny"),
                field: "col18",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 255,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BLOB('tiny')",
                __full_type: "tinyblob",
                __type_label: "blob",

                __form_type: "blob",
                __form_label: "Col18",
                __form_description: 'Unit of "blob" describing the "col18" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col18",
                __form_max_string: 255,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col19: {
                type: Sequelize.BLOB,
                field: "col19",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 65535,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BLOB",
                __full_type: "blob",
                __type_label: "blob",

                __form_type: "blob",
                __form_label: "Col19",
                __form_description: 'Unit of "blob" describing the "col19" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col19",
                __form_max_string: 65535,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col20: {
                type: Sequelize.BLOB("medium"),
                field: "col20",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 16777215,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BLOB('medium')",
                __full_type: "mediumblob",
                __type_label: "blob",

                __form_type: "blob",
                __form_label: "Col20",
                __form_description: 'Unit of "blob" describing the "col20" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col20",
                __form_max_string: 16777215,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col21: {
                type: Sequelize.BLOB("long"),
                field: "col21",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 4294967295,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.BLOB('long')",
                __full_type: "longblob",
                __type_label: "blob",

                __form_type: "blob",
                __form_label: "Col21",
                __form_description: 'Unit of "blob" describing the "col21" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col21",
                __form_max_string: 4294967295,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col22: {
                type: Sequelize.DATE,
                field: "col22",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE",
                __full_type: "date",
                __type_label: "date",

                __form_type: "date",
                __form_label: "Col22",
                __form_description: 'Unit of "date" describing the "col22" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col22",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col23: {
                type: Sequelize.TIME,
                field: "col23",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.TIME",
                __full_type: "time",
                __type_label: "time",

                __form_type: "time",
                __form_label: "Col23",
                __form_description: 'Unit of "time" describing the "col23" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col23",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col24: {
                type: Sequelize.DATE(4),
                field: "col24",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE(4)",
                __full_type: "year(4)",
                __type_label: "integer",

                __form_type: "integer",
                __form_label: "Col24",
                __form_description: 'Unit of "integer" describing the "col24" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col24",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col25: {
                type: Sequelize.DATE,
                field: "col25",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE",
                __full_type: "datetime",
                __type_label: "datetime",

                __form_type: "datetime",
                __form_label: "Col25",
                __form_description: 'Unit of "datetime" describing the "col25" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col25",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col26: {
                type: Sequelize.DATE,
                field: "col26",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.DATE",
                __full_type: "timestamp",
                __type_label: "datetime",

                __form_type: "datetime",
                __form_label: "Col26",
                __form_description: 'Unit of "datetime" describing the "col26" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col26",
                __form_max_string: null,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col36: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col36",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 1,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.ENUM('a','b','c')",
                __full_type: "enum('a','b','c')",
                __type_label: "enum",

                __form_enum_list: ["a", "b", "c"],

                __form_type: "enum",
                __form_label: "Col36",
                __form_description: 'Unit of "enum" describing the "col36" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col36",
                __form_max_string: 1,
                __form_max_number: null,
                __form_required: false,
                __form_unsigned: false,
                __form_default_value: null
            },
            col38: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col38",
                allowNull: true,
                defaultValue: null,
                maxCharacters: 5,
                timestamps: false,
                underscored: true,

                __type_code: "Sequelize.ENUM('a','b','c')",
                __full_type: "set('a','b','c')",
                __type_label: "enum",

                __form_enum_list: ["a", "b", "c"],

                __form_type: "enum",
                __form_label: "Col38",
                __form_description: 'Unit of "enum" describing the "col38" field of an instance of "ejemplos".',
                __form_table: "ejemplos",
                __form_column: "col38",
                __form_max_string: 5,
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
                table: "ejemplos",
                column: "id",
                constraint: "PRIMARY"
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

class BaseEjemplos extends Model {
    static get definition() {
        return EjemplosDefinition;
    }
}

module.exports = BaseEjemplos;

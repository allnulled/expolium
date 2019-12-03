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
            col1: {
                type: Sequelize.INTEGER(4),
                field: "col1",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(4)",
                __full_type: "tinyint(4)",
                __type_label: "integer"
            },
            col2: {
                type: Sequelize.BLOB("medium"),
                field: "col2",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BLOB('medium')",
                __full_type: "smallint(6)",
                __type_label: "blob"
            },
            col3: {
                type: Sequelize.BIGINT(9),
                field: "col3",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BIGINT(9)",
                __full_type: "mediumint(9)",
                __type_label: "bigint"
            },
            col4: {
                type: Sequelize.INTEGER(11),
                field: "col4",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.INTEGER(11)",
                __full_type: "int(11)",
                __type_label: "integer"
            },
            col5: {
                type: Sequelize.BIGINT(20),
                field: "col5",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BIGINT(20)",
                __full_type: "bigint(20)",
                __type_label: "bigint"
            },
            col6: {
                type: Sequelize.BOOLEAN(1),
                field: "col6",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BOOLEAN(1)",
                __full_type: "bit(1)",
                __type_label: "boolean"
            },
            col7: {
                type: Sequelize.FLOAT,
                field: "col7",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.FLOAT",
                __full_type: "float",
                __type_label: "float"
            },
            col8: {
                type: Sequelize.DOUBLE,
                field: "col8",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.DOUBLE",
                __full_type: "double",
                __type_label: "double"
            },
            col9: {
                type: Sequelize.DECIMAL(10, 0),
                field: "col9",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.DECIMAL(10,0)",
                __full_type: "decimal(10,0)",
                __type_label: "decimal"
            },
            col10: {
                type: Sequelize.STRING(1),
                field: "col10",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.STRING(1)",
                __full_type: "char(1)",
                __type_label: "string"
            },
            col11: {
                type: Sequelize.STRING(255),
                field: "col11",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.STRING(255)",
                __full_type: "varchar(255)",
                __type_label: "string"
            },
            col12: {
                type: Sequelize.TEXT("tiny"),
                field: "col12",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.TEXT('tiny')",
                __full_type: "tinytext",
                __type_label: "text"
            },
            col13: {
                type: Sequelize.TEXT("medium"),
                field: "col13",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.TEXT('medium')",
                __full_type: "mediumtext",
                __type_label: "text"
            },
            col14: {
                type: Sequelize.TEXT("long"),
                field: "col14",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.TEXT('long')",
                __full_type: "longtext",
                __type_label: "text"
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
                __type_label: "json"
            },
            col18: {
                type: Sequelize.BLOB("tiny"),
                field: "col18",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BLOB('tiny')",
                __full_type: "tinyblob",
                __type_label: "blob"
            },
            col19: {
                type: Sequelize.BLOB,
                field: "col19",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BLOB",
                __full_type: "blob",
                __type_label: "blob"
            },
            col20: {
                type: Sequelize.BLOB("medium"),
                field: "col20",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BLOB('medium')",
                __full_type: "mediumblob",
                __type_label: "blob"
            },
            col21: {
                type: Sequelize.BLOB("long"),
                field: "col21",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.BLOB('long')",
                __full_type: "longblob",
                __type_label: "blob"
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
                __type_label: "date"
            },
            col23: {
                type: Sequelize.DATE,
                field: "col23",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.DATE",
                __full_type: "time",
                __type_label: "date"
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
                __type_label: "date"
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
                __type_label: "date"
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
                __type_label: "date"
            },
            col30: {
                type: Sequelize.GEOMETRY,
                field: "col30",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.GEOMETRY",
                __full_type: "geometry",
                __type_label: "geometry"
            },
            col36: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col36",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.ENUM('a','b','c')",
                __full_type: "enum('a','b','c')",
                __type_label: "enum"
            },
            col38: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col38",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __type_code: "Sequelize.ENUM('a','b','c')",
                __full_type: "set('a','b','c')",
                __type_label: "enum"
            }
        };
    }

    static get innerRelationships() {
        return [];
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

class BaseEjemplos extends Model {
    static get definition() {
        return EjemplosDefinition;
    }
}

module.exports = BaseEjemplos;

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
                __typeCode: "Sequelize.INTEGER(4)",
                __fulltype: "tinyint(4)",
                __typeLabel: "integer"
            },
            col2: {
                type: Sequelize.BLOB("medium"),
                field: "col2",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BLOB('medium')",
                __fulltype: "smallint(6)",
                __typeLabel: "blob"
            },
            col3: {
                type: Sequelize.BIGINT(9),
                field: "col3",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BIGINT(9)",
                __fulltype: "mediumint(9)",
                __typeLabel: "bigint"
            },
            col4: {
                type: Sequelize.INTEGER(11),
                field: "col4",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.INTEGER(11)",
                __fulltype: "int(11)",
                __typeLabel: "integer"
            },
            col5: {
                type: Sequelize.BIGINT(20),
                field: "col5",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BIGINT(20)",
                __fulltype: "bigint(20)",
                __typeLabel: "bigint"
            },
            col6: {
                type: Sequelize.BOOLEAN(1),
                field: "col6",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BOOLEAN(1)",
                __fulltype: "bit(1)",
                __typeLabel: "boolean"
            },
            col7: {
                type: Sequelize.FLOAT,
                field: "col7",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.FLOAT",
                __fulltype: "float",
                __typeLabel: "float"
            },
            col8: {
                type: Sequelize.DOUBLE,
                field: "col8",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DOUBLE",
                __fulltype: "double",
                __typeLabel: "double"
            },
            col9: {
                type: Sequelize.DECIMAL(10, 0),
                field: "col9",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DECIMAL(10,0)",
                __fulltype: "decimal(10,0)",
                __typeLabel: "decimal"
            },
            col10: {
                type: Sequelize.STRING(1),
                field: "col10",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.STRING(1)",
                __fulltype: "char(1)",
                __typeLabel: "string"
            },
            col11: {
                type: Sequelize.STRING(255),
                field: "col11",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.STRING(255)",
                __fulltype: "varchar(255)",
                __typeLabel: "string"
            },
            col12: {
                type: Sequelize.TEXT("tiny"),
                field: "col12",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.TEXT('tiny')",
                __fulltype: "tinytext",
                __typeLabel: "text"
            },
            col13: {
                type: Sequelize.TEXT("medium"),
                field: "col13",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.TEXT('medium')",
                __fulltype: "mediumtext",
                __typeLabel: "text"
            },
            col14: {
                type: Sequelize.TEXT("long"),
                field: "col14",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.TEXT('long')",
                __fulltype: "longtext",
                __typeLabel: "text"
            },
            col15: {
                type: Sequelize.JSON,
                field: "col15",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.JSON",
                __fulltype: "json",
                __typeLabel: "json"
            },
            col18: {
                type: Sequelize.BLOB("tiny"),
                field: "col18",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BLOB('tiny')",
                __fulltype: "tinyblob",
                __typeLabel: "blob"
            },
            col19: {
                type: Sequelize.BLOB,
                field: "col19",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BLOB",
                __fulltype: "blob",
                __typeLabel: "blob"
            },
            col20: {
                type: Sequelize.BLOB("medium"),
                field: "col20",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BLOB('medium')",
                __fulltype: "mediumblob",
                __typeLabel: "blob"
            },
            col21: {
                type: Sequelize.BLOB("long"),
                field: "col21",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.BLOB('long')",
                __fulltype: "longblob",
                __typeLabel: "blob"
            },
            col22: {
                type: Sequelize.DATE,
                field: "col22",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "date",
                __typeLabel: "date"
            },
            col23: {
                type: Sequelize.DATE,
                field: "col23",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "time",
                __typeLabel: "date"
            },
            col24: {
                type: Sequelize.DATE(4),
                field: "col24",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE(4)",
                __fulltype: "year(4)",
                __typeLabel: "date"
            },
            col25: {
                type: Sequelize.DATE,
                field: "col25",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "datetime",
                __typeLabel: "date"
            },
            col26: {
                type: Sequelize.DATE,
                field: "col26",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.DATE",
                __fulltype: "timestamp",
                __typeLabel: "date"
            },
            col30: {
                type: Sequelize.GEOMETRY,
                field: "col30",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.GEOMETRY",
                __fulltype: "geometry",
                __typeLabel: "geometry"
            },
            col36: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col36",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.ENUM('a','b','c')",
                __fulltype: "enum('a','b','c')",
                __typeLabel: "enum"
            },
            col38: {
                type: Sequelize.ENUM("a", "b", "c"),
                field: "col38",
                allowNull: true,
                defaultValue: null,
                timestamps: false,
                underscored: true,
                __typeCode: "Sequelize.ENUM('a','b','c')",
                __fulltype: "set('a','b','c')",
                __typeLabel: "enum"
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

class BaseEjemplos extends Model {
    static get definition() {
        return EjemplosDefinition;
    }
}

module.exports = BaseEjemplos;

import { DataTypes, Model } from "sequelize";

class Events extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            start_date: DataTypes.DATEONLY,
            end_date: DataTypes.DATEONLY,
            zip_code: DataTypes.STRING,
            location_name: DataTypes.STRING,
            registration_deadline: DataTypes.DATEONLY,
            max_participants: DataTypes.INTEGER,
            diocese_id: DataTypes.INTEGER,
            event_type_id: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: "events",
            schema: "rcc",
            underscored: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.TypeEvents, {
            foreignKey: "event_type_id",
            as: "event_type",
        });
        this.belongsTo(models.Diocese, {
            foreignKey: "diocese_id",
            as: "diocese",
        });
    }
}


class TypeEvents extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize,
            tableName: "event_types",
            schema: "rcc",
            underscored: true,
        })
    }

    static associate(models) {
        this.hasMany(models.Events, {
            foreignKey: "event_type_id",
            as: "events",
        });
    }

}
 

export {Events, TypeEvents};
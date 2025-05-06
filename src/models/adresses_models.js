import { DataTypes, Model } from "sequelize";


class Adress extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type_adress: {
                type: DataTypes.ENUM('events', 'users'),
                allowNull: false
            },
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zip_code: DataTypes.STRING,
            complement: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "adresses",
            schema: "rcc",
            underscored: true,
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "users"
        });
        this.belongsTo(models.Events, {
            foreignKey: "event_id",
            as: "event"
        });
     }

}

export default Adress;
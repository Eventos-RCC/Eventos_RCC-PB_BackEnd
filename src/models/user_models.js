import { DataTypes, Model } from "sequelize";

class User extends Model { 
    static init(connection) {
        super.init({
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            birth_date: DataTypes.DATEONLY,
        }, {
            sequelize: connection,
            tableName: "users",
            schema: "rcc",
            underscored: true,
        });
    }

    static associate(models) {
        this.belongsTo(models.Diocese, {
            foreignKey: "diocese_id",
            as: "diocese"
        });
    }
}

export default User;
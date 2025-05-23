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
            level_user: {
                type: DataTypes.ENUM,
                values: ["master", "admin", "user"],
                defaultValue: "user",
            },
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
        this.hasMany(models.Events, {
            foreignKey: "created_by_user_id",
            as: "events",
        });
        this.hasMany(models.Adress, {
            foreignKey: "user_id",
            as: "adresses"
        });
    }
}

export default User;
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
        this.hasMany(models.Events, {
            foreignKey: "created_by_user_id",
            as: "events",
        });
        this.hasMany(models.Adress, {
            foreignKey: "user_id",
            as: "adresses"
        });
        this.belongsToMany(models.Ministery, {
            through: 'user_ministeries',
            foreignKey: "user_id",
            as: "ministeries"
        });
        this.belongsToMany(models.Roles, {
            through: 'users_roles',
            foreignKey: "user_id", // Chave em UserRole que aponta para User
            outherKey: "role_id", // Chave em UserRole que aponta para Role
            as: "roles"
        })
    }
}

export default User;